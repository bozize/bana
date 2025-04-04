import NodeCache from 'node-cache';
import { NextResponse } from 'next/server';

const cache = new NodeCache({ stdTTL: 3600 }); // Cache for 1 hour

interface Product {
  productCode: string;
  title: string;
  description: string;
  thumbnailHiResURL?: string;
  thumbnailURL: string;
  rating: number;
  reviewCount: number;
  pricing: {
    summary: {
      fromPriceFormatted: string;
      fromPrice: number;
      fromPriceBeforeDiscount: number;
    };
  };
  webURL: string;
  duration?: { fixedDurationInMinutes: number };
  tags: number[];
  flags: string[];
  destinations: { ref: string; primary: boolean }[];
}

// Define interfaces for Viator API response
interface ImageVariant {
  height: number;
  width: number;
  url: string;
}

interface Image {
  isCover: boolean;
  variants: ImageVariant[];
}

interface Reviews {
  combinedAverageRating: number;
  totalReviews: number;
}

interface PricingSummary {
  fromPrice?: number;
  fromPriceBeforeDiscount?: number;
}

interface ViatorProduct {
  productCode: string;
  title: string;
  description: string;
  images: Image[];
  reviews?: Reviews;
  pricing?: { summary: PricingSummary };
  productUrl: string;
  duration?: { fixedDurationInMinutes: number };
  tags?: number[];
  flags?: string[];
  destinations?: { ref: string; primary: boolean }[];
}

interface ViatorResponse {
  products: {
    results: ViatorProduct[];
  };
}

const fetchWithTimeout = async (url: string, options: RequestInit, timeout = 80000) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  
  const response = await fetch(url, {
    ...options,
    signal: controller.signal
  });
  
  clearTimeout(id);
  return response;
};

const processImages = async (images: Image[]) => {
  const coverImage = images.find((img) => img.isCover) || images[0];
  if (!coverImage) return { thumbnailURL: 'https://placehold.co/200x150?text=No+Image', thumbnailHiResURL: undefined };

  const [thumbnailURL, thumbnailHiResURL] = await Promise.all([
    coverImage.variants.find((v) => v.height === 200)?.url || 'https://placehold.co/200x150?text=No+Image',
    coverImage.variants.find((v) => v.height >= 400)?.url
  ]);

  return { thumbnailURL, thumbnailHiResURL };
};

export async function GET(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query') || '';
  const count = Math.min(parseInt(searchParams.get('count') || '10', 10), 50);

  const cacheKey = `search_${query}_${count}_top_rated`;
  const cachedResults = cache.get<Product[]>(cacheKey);
  if (cachedResults) {
    return NextResponse.json({ data: cachedResults });
  }

  try {
    const body = {
      searchTerm: query,
      searchTypes: [{
        searchType: 'PRODUCTS',
        pagination: { start: 1, count }
      }],
      currency: 'USD',
    };

    const response = await fetchWithTimeout(
      'https://api.viator.com/partner/search/freetext',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json;version=2.0',
          'Accept-Language': 'en-US',
          'exp-api-key': process.env.VIATOR_API_KEY || '',
        },
        body: JSON.stringify(body),
      },
      10000
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const viatorData: ViatorResponse = await response.json();
    
    const toursPromises = viatorData.products.results.map(async (tour: ViatorProduct) => {
      const { thumbnailURL, thumbnailHiResURL } = await processImages(tour.images);

      return {
        productCode: tour.productCode,
        title: tour.title,
        description: tour.description,
        thumbnailHiResURL,
        thumbnailURL,
        rating: tour.reviews?.combinedAverageRating || 0,
        reviewCount: tour.reviews?.totalReviews || 0,
        pricing: {
          summary: {
            fromPriceFormatted: tour.pricing?.summary?.fromPrice
              ? `$${tour.pricing.summary.fromPrice.toFixed(2)}`
              : 'N/A',
            fromPrice: tour.pricing?.summary?.fromPrice || 0,
            fromPriceBeforeDiscount: tour.pricing?.summary?.fromPriceBeforeDiscount || 0,
          },
        },
        webURL: tour.productUrl,
        duration: tour.duration ? { fixedDurationInMinutes: tour.duration.fixedDurationInMinutes } : undefined,
        tags: tour.tags || [],
        flags: tour.flags || [],
        destinations: tour.destinations || [],
      };
    });

    const tours = await Promise.all(toursPromises);
    
    // Sort tours by rating (descending) first, then by review count (descending)
    const sortedTours = tours.sort((a, b) => {
      // First compare ratings
      if (b.rating !== a.rating) {
        return b.rating - a.rating;
      }
      // If ratings are equal, compare review counts
      return b.reviewCount - a.reviewCount;
    });

    cache.set(cacheKey, sortedTours, 3600);
    return NextResponse.json({ data: sortedTours });
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json({ error: 'Failed to fetch search results' }, { status: 500 });
  }
}

