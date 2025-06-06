import NodeCache from 'node-cache';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const cache = new NodeCache({ stdTTL: 3600 });

// Interfaces (unchanged)
interface Location {
  provider?: string;
  reference: string;
  providerReference?: string;
  name?: string;
  address?: {
    street: string;
    state: string;
    country: string;
    countryCode: string;
    postcode: string;
  };
  center?: {
    latitude: number;
    longitude: number;
  };
}

interface ProductLocation {
  ref: string;
}

interface PickupLocation {
  location?: ProductLocation;
}

interface ItineraryItem {
  pointOfInterestLocation?: {
    location?: ProductLocation;
  };
}

interface Day {
  items?: ItineraryItem[];
}

interface ProductData {
  logistics?: {
    travelerPickup?: {
      locations: PickupLocation[];
    };
  };
  itinerary?: {
    days: Day[];
  };
  images?: Image[];
  pricingInfo?: unknown;
  locations?: Location[];
  thumbnailURL?: string;
  thumbnailHiResURL?: string;
}

interface ImageVariant {
  width: number;
  height: number;
  url: string;
}

interface Image {
  variants?: ImageVariant[];
  imageSource?: string;
  isCover?: boolean;
  bestVariant?: ImageVariant;
  mediumVariant?: ImageVariant;
}

async function fetchLocations(locationRefs: string[]): Promise<Location[]> {
  try {
    const response = await fetch('https://api.viator.com/partner/locations/bulk', {
      method: 'POST',
      headers: {
        'exp-api-key': process.env.VIATOR_API_KEY || '',
        'Content-Type': 'application/json',
        'Accept': 'application/json;version=2.0',
        'Accept-Language': 'en-US',
      },
      body: JSON.stringify({ locations: locationRefs }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Location fetch failed: ${errorText}`);
    }

    const data = (await response.json()) as { locations: Location[] };
    return data.locations || [];
  } catch (error) {
    console.error('Error fetching locations:', error);
    return [];
  }
}

function extractLocationRefs(productData: ProductData): string[] {
  const locationRefs = new Set<string>();

  if (productData.logistics?.travelerPickup?.locations) {
    productData.logistics.travelerPickup.locations.forEach((loc: PickupLocation) => {
      if (loc.location?.ref) {
        locationRefs.add(loc.location.ref);
      }
    });
  }

  if (productData.itinerary?.days) {
    productData.itinerary.days.forEach((day: Day) => {
      day.items?.forEach((item: ItineraryItem) => {
        if (item.pointOfInterestLocation?.location?.ref) {
          locationRefs.add(item.pointOfInterestLocation.location.ref);
        }
      });
    });
  }

  return Array.from(locationRefs);
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  if (!code) {
    return NextResponse.json({ error: 'Missing code parameter' }, { status: 400 });
  }

  const cacheKey = `product_${code}`;
  const cachedProduct = cache.get<ProductData>(cacheKey);
  if (cachedProduct) {
    return NextResponse.json(cachedProduct);
  }

  try {
    if (!process.env.VIATOR_API_KEY) {
      throw new Error('VIATOR_API_KEY is not set in environment variables');
    }

    const productResponse = await fetch(
      `https://api.viator.com/partner/products/${code}`,
      {
        headers: {
          'exp-api-key': process.env.VIATOR_API_KEY,
          'Content-Type': 'application/json',
          'Accept': 'application/json;version=2.0',
          'Accept-Language': 'en-US',
        },
      }
    );

    if (!productResponse.ok) {
      const errorText = await productResponse.text();
      throw new Error(`Product fetch failed: ${errorText}`);
    }

    const productData: ProductData = await productResponse.json();

    const availabilityResponse = await fetch(
      `https://api.viator.com/partner/availability/schedules/${code}`,
      {
        headers: {
          'exp-api-key': process.env.VIATOR_API_KEY,
          'Content-Type': 'application/json',
          'Accept': 'application/json;version=2.0',
          'Accept-Language': 'en-US',
        },
      }
    );

    if (!availabilityResponse.ok) {
      const errorText = await availabilityResponse.text();
      console.error(`Availability fetch failed: ${availabilityResponse.status} - ${errorText}`);
    } else {
      const availabilityData = await availabilityResponse.json();
      productData.pricingInfo = availabilityData.pricingInfo || availabilityData;
    }

    if (productData.images && productData.images.length > 0) {
      productData.images = productData.images.map((img: Image) => {
        if (img.variants && img.variants.length > 0) {
          const sortedVariants = [...img.variants].sort(
            (a, b) => b.width * b.height - a.width * a.height
          );
          return {
            ...img,
            bestVariant: sortedVariants[0],
            mediumVariant: sortedVariants.find((v) => v.width >= 400) || sortedVariants[0],
          };
        }
        return img;
      });

      const coverImage =
        productData.images.find((img: Image) => img.isCover) || productData.images[0];
      productData.thumbnailURL = coverImage?.bestVariant?.url || coverImage?.imageSource;
      productData.thumbnailHiResURL = coverImage?.bestVariant?.url || coverImage?.imageSource;
    }

    const locationRefs = extractLocationRefs(productData);
    if (locationRefs.length > 0) {
      console.log('Fetching locations:', locationRefs);
      const locations = await fetchLocations(locationRefs);
      productData.locations = locations;
    }

    cache.set(cacheKey, productData);
    return NextResponse.json(productData);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';