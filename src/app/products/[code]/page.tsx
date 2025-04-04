import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ProductImageGallery } from '@/components/ProductImageGallery';
import Link from 'next/link';
import { 
  Star, 
  MapPin, 
  Clock, 
  Calendar, 
  Utensils, 
  Hotel, 
  Check, 
  X, 
  Bus, 
  Plane, 
  Car, 
  Ship,
  Baby,
  Train,
  User,
  Accessibility
} from 'lucide-react';

// Interfaces based on the API response
interface ImageVariant {
  height: number;
  width: number;
  url: string;
}
interface AdditionalInfo {
  type: string;
  description: string;
}

interface Image {
  imageSource: string;
  caption: string;
  isCover: boolean;
  variants: ImageVariant[];
}

interface PricingDetail {
  pricingPackageType: string;
  minTravelers: number;
  maxTravelers: number;
  ageBand: string;
  price: {
    original: {
      recommendedRetailPrice: number;
    };
  };
}

interface PricingRecord {
  daysOfWeek: string[];
  pricingDetails: PricingDetail[];
}

interface Season {
  startDate: string;
  endDate?: string;
  pricingRecords: PricingRecord[];
  operatingHours?: Array<{
    dayOfWeek: string;
    operatingHours: Array<{ opensAt: string; closesAt: string }>;
  }>;
}

interface BookableItem {
  productOptionCode: string;
  seasons: Season[];
}

interface PricingInfo {
  productCode: string;
  bookableItems: BookableItem[];
  currency: string;
  summary: { fromPrice: number };
}

interface Address {
  street: string;
  state: string;
  country: string;
  countryCode: string;
  postcode: string;
}

interface Location {
  provider?: string;
  reference: string;
  providerReference?: string;
  name?: string;
  address?: Address;
  center?: {
    latitude: number;
    longitude: number;
  };
}

interface TravelerPickupLocation {
  location: Location;
  pickupType: string;
}

interface TravelerPickup {
  pickupOptionType: string;
  allowCustomTravelerPickup: boolean;
  locations: TravelerPickupLocation[];
  minutesBeforeDepartureTimeForPickup: number;
  additionalInfo?: string;
}

interface ItineraryItem {
  pointOfInterestLocation?: {
    location: Location;
  };
  duration: {
    fixedDurationInMinutes: number;
  };
  description: string;
}

interface ItineraryDay {
  title: string;
  dayNumber: number;
  items: ItineraryItem[];
  accommodations?: Array<{ description: string }>;
  foodAndDrinks?: Array<{ type: string; description: string }>;
}

interface Inclusion {
  categoryDescription: string;
  type: string;
  otherDescription?: string;
  description?: string;
}

interface Exclusion {
  categoryDescription: string;
  type: string;
  otherDescription?: string;
  description?: string;
}

interface CancellationPolicy {
  description: string;
}

interface ReviewCount {
  rating: number;
  count: number;
}

interface Reviews {
  totalReviews: number;
  combinedAverageRating: number;
  reviewCountTotals: ReviewCount[];
}

interface ProductOption {
  productOptionCode: string;
  description: string;
  title: string;
}

interface Product {
  productCode: string;
  additionalInfo?: AdditionalInfo[];
  title: string;
  description: string;
  images: Image[];
  thumbnailURL: string;
  thumbnailHiResURL?: string;
  pricingInfo?: PricingInfo;
  reviews?: Reviews;
  productOptions?: ProductOption[];
  logistics?: {
    travelerPickup: TravelerPickup;
  };
  itinerary?: {
    itineraryType: string;
    days: ItineraryDay[];
    duration: { fixedDurationInMinutes: number };
  };
  inclusions?: Inclusion[];
  exclusions?: Exclusion[];
  cancellationPolicy?: CancellationPolicy;
  productUrl?: string;
}

async function fetchProduct(code: string): Promise<Product> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/product/${code}`, {
    cache: 'no-store',
  });
  if (!res.ok) {
    const errorText = await res.text();
    console.error(`Failed to fetch product ${code}: ${res.status} - ${errorText}`);
    throw new Error('Failed to fetch product');
  }
  return res.json();
}

function formatLocationName(location?: Location): string {
  if (!location) return 'Various Locations';
  if (location.name) return location.name;
  
  switch(location.reference) {
    case 'CONTACT_SUPPLIER_LATER':
      return 'Contact Supplier';
    case 'MEET_AT_DEPARTURE_POINT':
      return 'Departure Point';
    default:
      if (location.reference.startsWith('LOC-')) {
        return location.address 
          ? [location.address.street, location.address.state, location.address.country].filter(Boolean).join(', ') 
          : 'Designated Location';
      }
      return location.reference;
  }
}
function getAdditionalInfoIcon(type: string) {
  switch(type) {
    case 'WHEELCHAIR_ACCESSIBLE':
    case 'TRANSPORTATION_WHEELCHAIR_ACCESSIBLE':
    case 'SURFACES_WHEELCHAIR_ACCESSIBLE':
      return <Accessibility className="w-4 h-4" />;
    case 'STROLLER_ACCESSIBLE':
      return <Baby className="w-4 h-4" />;
    case 'PUBLIC_TRANSPORTATION_NEARBY':
      return <Train className="w-4 h-4" />;
    case 'INFANTS_MUST_SIT_ON_LAPS':
      return <User className="w-4 h-4" />;
    case 'PHYSICAL_EASY':
      return <Accessibility className="w-4 h-4" />;
    default:
      return <Check className="w-4 h-4" />;
  }
}


function getLocationDetails(location?: Location): { title: string; subtitle?: string } {
  if (!location) return { title: 'Various Locations' };
  
  if (location.name) {
    return {
      title: location.name,
      subtitle: location.address ? [
        location.address.street,
        location.address.state,
        location.address.country
      ].filter(Boolean).join(', ') : undefined
    };
  }
  
  switch(location.reference) {
    case 'CONTACT_SUPPLIER_LATER':
      return { title: 'Contact Supplier for Location' };
    case 'MEET_AT_DEPARTURE_POINT':
      return { title: 'Meet at Departure Point' };
    default:
      if (location.address) {
        return {
          title: 'Designated Location',
          subtitle: [
            location.address.street,
            location.address.state,
            location.address.country
          ].filter(Boolean).join(', ')
        };
      }
      return { title: 'Designated Location' };
  }
}

function formatTransportationType(type: string): string {
  switch(type) {
    case 'PRIVATE_TRANSPORTATION':
      return 'Private Transport';
    case 'PUBLIC_TRANSPORTATION':
      return 'Public Transport';
    case 'PICKUP_AND_MEET_AT_START_POINT':
      return 'Pickup at Start Point';
    case 'AIRPORT':
      return 'Airport Transfer';
    case 'HOTEL':
      return 'Hotel Transfer';
    case 'PORT':
      return 'Port Transfer';
    default:
      return type.split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
  }
}

function getTransportIcon(type: string) {
  switch(type) {
    case 'AIRPORT':
    case 'FLIGHT':
      return <Plane className="w-4 h-4" />;
    case 'BUS':
      return <Bus className="w-4 h-4" />;
    case 'CAR':
      return <Car className="w-4 h-4" />;
    case 'CRUISE':
    case 'FERRY':
    case 'PORT':
      return <Ship className="w-4 h-4" />;
    case 'HOTEL':
      return <Hotel className="w-4 h-4" />;
    default:
      return <Bus className="w-4 h-4" />;
  }
}

export default async function ProductDetails({ params }: { params: { code: string } }) {
  const { code } = params;
  let product: Product | null = null;
  let error: string | null = null;

  try {
    product = await fetchProduct(code);
  } catch (err) {
    error = (err as Error).message;
  }

  if (error || !product) {
    return <div className="container mx-auto py-12 text-red-500">{error || 'Product not found'}</div>;
  }

  const averageRating = product.reviews?.combinedAverageRating || 0;
  const reviewCount = product.reviews?.totalReviews || 0;
  const priceFrom = product.pricingInfo?.summary?.fromPrice || 0;
  const durationHours = product.itinerary?.duration ? Math.round(product.itinerary.duration.fixedDurationInMinutes / 60) : 0;

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">{product.title}</h1>
        
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center bg-teal-100 px-3 py-1 rounded-full">
            <Star className="w-4 h-4 fill-teal-600 text-teal-600 mr-1" />
            <span className="text-teal-800 font-medium">
              {averageRating.toFixed(1)} ({reviewCount} reviews)
            </span>
          </div>
          
          {product.itinerary?.days && (
            <div className="flex items-center text-gray-700">
              <Calendar className="w-4 h-4 mr-1" />
              <span>{product.itinerary.days.length} days</span>
            </div>
          )}
          
          {durationHours > 0 && (
            <div className="flex items-center text-gray-700">
              <Clock className="w-4 h-4 mr-1" />
              <span>{durationHours} hours</span>
            </div>
          )}
        </div>
      </div>

      {/* Image Gallery and Booking Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
      <div className="lg:col-span-2">
  <ProductImageGallery 
    mainImage={product.thumbnailHiResURL || product.thumbnailURL}
    images={product.images}
    title={product.title}
  />
</div>
        
        {/* Booking Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm h-fit sticky top-4">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-black mb-2">Price Details</h3>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-teal-600">${priceFrom.toFixed(2)}</span>
              <span className="text-gray-600 mb-1">per person</span>
            </div>
          </div>
          
          {product.productUrl && (
            <Button
              asChild
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-3"
            >
              <Link href={product.productUrl} target="_blank" rel="noopener noreferrer">
                Book Now
              </Link>
            </Button>
          )}
          
          {product.productOptions && product.productOptions.length > 0 && (
            <div className="mt-6">
              <h4 className="font-semibold text-black mb-3">Available Options</h4>
              <div className="space-y-3">
                {product.productOptions.map((option: ProductOption) => (
                  <div key={option.productOptionCode} className="p-3 border border-gray-200 rounded-lg">
                    <h5 className="font-medium text-black">{option.title}</h5>
                    <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* About Section */}
      <section className="mb-12">
        <h2 className="text-4xl font-bold text-black mb-6 pb-2 border-b border-gray-200">Overview</h2>
        <div className="max-w-full text-black text-lg leading-relaxed whitespace-pre-line">
  <p>{product.description}</p>
</div>


      </section>

      {/* Itinerary Section */}
      {product.itinerary?.days && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-black mb-6 pb-2 border-b border-gray-200">Itinerary</h2>
          <div className="space-y-4">
            {product.itinerary.days.map((day: ItineraryDay) => (
              <div key={day.dayNumber} className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-50 p-4 border-b border-gray-200">
                  <h3 className="text-xl font-semibold text-black">
                    Day {day.dayNumber}: {day.title}
                  </h3>
                </div>
                <div className="p-4">
                  <ul className="space-y-4">
                    {day.items.map((item: ItineraryItem, index: number) => {
                      const locationInfo = getLocationDetails(item.pointOfInterestLocation?.location);
                      return (
                        <li key={index} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center">
                              <span className="text-teal-600 font-medium text-sm">{index + 1}</span>
                            </div>
                            {index < day.items.length - 1 && (
                              <div className="w-0.5 h-full bg-gray-200"></div>
                            )}
                          </div>
                          <div className="flex-1 pb-4">
                            <div className="flex items-center gap-2 mb-1">
                              <MapPin className="w-4 h-4 text-teal-600" />
                              <h4 className="font-medium text-black">
                                {locationInfo.title}
                              </h4>
                            </div>
                            <p className="text-black mb-2 font-semibold">{item.description}</p>
                            {locationInfo.subtitle && (
                              <p className="text-gray-500 text-sm mb-2">{locationInfo.subtitle}</p>
                            )}
                            <div className="flex items-center gap-3 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {item.duration.fixedDurationInMinutes / 60} hours
                              </span>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                  
                  {(day.foodAndDrinks?.length > 0 || day.accommodations?.length > 0) && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      {day.foodAndDrinks?.length > 0 && (
                        <div className="flex items-start gap-2 mb-2">
                          <Utensils className="w-4 h-4 text-teal-600 mt-0.5" />
                          <div>
                            <h5 className="font-medium text-black">Meals Included</h5>
                            <p className="text-gray-600">
                              {day.foodAndDrinks.map(fd => fd.type).join(', ')}
                            </p>
                          </div>
                        </div>
                      )}
                      {day.accommodations?.length > 0 && (
                        <div className="flex items-start gap-2">
                          <Hotel className="w-4 h-4 text-teal-600 mt-0.5" />
                          <div>
                            <h5 className="font-medium text-black">Accommodation</h5>
                            <p className="text-gray-600">
                              {day.accommodations.map(a => a.description).join(', ')}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Logistics Section */}
      {product.logistics?.travelerPickup && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-black mb-6 pb-2 border-b border-gray-200">Pickup Information</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-black mb-3">Pickup Details</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center">
                    {getTransportIcon(product.logistics.travelerPickup.pickupOptionType)}
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Pickup Type</p>
                    <p className="font-medium text-black">
                      {formatTransportationType(product.logistics.travelerPickup.pickupOptionType)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-teal-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Pickup Time</p>
                    <p className="font-medium text-black">
                      {product.logistics.travelerPickup.minutesBeforeDepartureTimeForPickup} minutes before departure
                    </p>
                  </div>
                </div>
                {product.logistics.travelerPickup.additionalInfo && (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-teal-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Additional Info</p>
                      <p className="font-medium text-black">
                        {product.logistics.travelerPickup.additionalInfo}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            
          </div>
        </section>
      )}

      {/* Inclusions & Exclusions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {product.inclusions && product.inclusions.length > 0 && (
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-black mb-4">What's Included</h3>
            <ul className="space-y-3">
              {product.inclusions.map((item: Inclusion, index: number) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{item.otherDescription || item.description || item.type}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {product.exclusions && product.exclusions.length > 0 && (
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-black mb-4">What's Not Included</h3>
            <ul className="space-y-3">
              {product.exclusions.map((item: Exclusion, index: number) => (
                <li key={index} className="flex items-start gap-3">
                  <X className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{item.otherDescription || item.description || item.type}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
       {/* Additional Information Section */}
       {product.additionalInfo && product.additionalInfo.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-black mb-6 pb-2 border-b border-gray-200">Additional Information</h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <ul className="space-y-4">
              {product.additionalInfo.map((info: AdditionalInfo, index: number) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center mt-0.5 flex-shrink-0">
                    {getAdditionalInfoIcon(info.type)}
                  </div>
                  <div>
                    <p className="text-gray-700">{info.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Reviews Section */}
      {product.reviews?.reviewCountTotals && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-black mb-6 pb-2 border-b border-gray-200">Customer Reviews</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-4xl font-bold text-black">{averageRating.toFixed(1)}</div>
                <div>
                  <div className="flex items-center mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < Math.round(averageRating) ? 'fill-teal-600 text-teal-600' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <div className="text-sm text-gray-600">Based on {reviewCount} reviews</div>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-2">
              <div className="space-y-4">
                {[5, 4, 3, 2, 1].map((rating) => {
                  const ratingCount =
                    product.reviews?.reviewCountTotals.find((r: ReviewCount) => r.rating === rating)?.count || 0;
                  const percentage = reviewCount ? (ratingCount / reviewCount) * 100 : 0;
                  return (
                    <div key={rating} className="flex items-center">
                      <span className="w-8 flex items-center gap-1">
                        <span className="text-black">{rating}</span>
                        <Star className="w-4 h-4 fill-teal-600 text-teal-600" />
                      </span>
                      <div className="flex-1 mx-2 h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-full bg-teal-600 rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="w-8 text-right text-sm text-gray-600">{ratingCount}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Cancellation Policy */}
      {product.cancellationPolicy && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-black mb-6 pb-2 border-b border-gray-200">Cancellation Policy</h2>
          <div className="prose max-w-none text-gray-700">
            <p dangerouslySetInnerHTML={{ __html: product.cancellationPolicy.description }} />
          </div>
        </section>
      )}

      {/* Final CTA */}
      {product.productUrl && (
        <div className="text-center">
          <Button
            asChild
            className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-8"
            size="lg"
          >
            <Link href={product.productUrl} target="_blank" rel="noopener noreferrer">
              Book Now
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}