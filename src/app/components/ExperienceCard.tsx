import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, CheckCircle, AlertTriangle, Users } from 'lucide-react';
import { playfair, inter } from '../fonts';

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
  flags?: string[];
}

export default function ExperienceCard({ product }: { product: Product }) {
  const { reviewCount = 0, rating = 0 } = product;
  const imageUrl =
    product.thumbnailHiResURL ||
    product.thumbnailURL ||
    'https://via.placeholder.com/200x150?text=No+Image';

  const formatDuration = (minutes: number) => {
    const days = Math.round(minutes / (60 * 24));
    return `${days} day${days !== 1 ? 's' : ''}`;
  };

  const relevantFlags = (product.flags || []).filter(flag =>
    ['FREE_CANCELLATION', 'LIKELY_TO_SELL_OUT', 'PRIVATE_TOUR'].includes(flag)
  );

  return (
    <Link href={`/products/${product.productCode}`} className="block h-full">
      <Card className="overflow-hidden h-full shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg">
        <div className="relative h-36">
          <Image
            src={imageUrl}
            alt={product.title || 'Tour Image'}
            fill
            className="object-cover"
          />
          <button className="absolute top-2 right-2 bg-white/90 hover:bg-white rounded-full p-1 shadow-md transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ff4444"
              strokeWidth="2"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
            </svg>
          </button>
        </div>
        <CardContent className="p-3 bg-white">
          <h3 className={`font-bold text-base mb-1 line-clamp-2 text-gray-900 ${playfair.variable}`}>
            {product.title || 'Untitled Tour'}
          </h3>
          <p className={`text-xs text-gray-600 mb-2 line-clamp-2 ${inter.variable}`}>
            {product.description || 'No description available'}
          </p>

          <div className="flex items-center mb-2">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full border-2 ${
                    i < Math.floor(rating) 
                      ? 'bg-teal-600 border-teal-600' 
                      : 'border-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className={`text-xs text-gray-500 ml-1 ${inter.variable}`}>
              ({reviewCount.toLocaleString('en-US')})
            </span>
          </div>

          <div className="mb-2">
            <span className="text-xs text-gray-500">from </span>
            <span className={`text-base font-bold text-gray-900 ${playfair.variable}`}>
              ${Math.floor(product.pricing.summary.fromPrice).toLocaleString('en-US')}
            </span>
          </div>

          {product.duration && (
            <div className="flex items-center gap-1 text-xs text-gray-600 mb-1">
              <Clock size={14} />
              <span className={inter.variable}>{formatDuration(product.duration.fixedDurationInMinutes)}</span>
            </div>
          )}

          {relevantFlags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {relevantFlags.map(flag => (
                <span
                  key={flag}
                  className="flex items-center gap-1 text-xs px-2 py-1 bg-gray-100 rounded-full"
                >
                  {flag === 'FREE_CANCELLATION' && <CheckCircle size={10} className="text-green-500" />}
                  {flag === 'LIKELY_TO_SELL_OUT' && <AlertTriangle size={10} className="text-orange-500" />}
                  {flag === 'PRIVATE_TOUR' && <Users size={10} className="text-blue-500" />}
                  <span>
                    {flag === 'FREE_CANCELLATION' ? 'Free Cancellation' :
                     flag === 'LIKELY_TO_SELL_OUT' ? 'Likely to Sell Out' :
                     'Private Tour'}
                  </span>
                </span>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
