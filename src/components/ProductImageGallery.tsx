// components/ProductImageGallery.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface ImageVariant {
  url: string;
  width: number;
  height: number;
}

interface GalleryImage {
  variants: ImageVariant[];
  imageSource: string;
  caption: string;
  bestVariant?: ImageVariant;
  mediumVariant?: ImageVariant;
}

interface ProductImageGalleryProps {
  mainImage: string;
  images: GalleryImage[];
  title: string;
}

export function ProductImageGallery({ mainImage, images, title }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<{url: string, alt: string} | null>(null);

  // Get the best available image URL for display
  const getDisplayImage = (image: GalleryImage) => {
    return {
      url: image.mediumVariant?.url || 
           image.bestVariant?.url || 
           (image.variants?.[0]?.url || image.imageSource),
      alt: image.caption || title
    };
  };

  // Get the best available image URL for lightbox
  const getLightboxImage = (image: GalleryImage) => {
    return {
      url: image.bestVariant?.url || 
           (image.variants?.[0]?.url || image.imageSource),
      alt: image.caption || title
    };
  };

  return (
    <>
      <div className="grid grid-cols-4 gap-2">
        {/* Main Image - Larger */}
        <div 
          className="col-span-3 row-span-2 relative h-64 md:h-80 rounded-lg overflow-hidden cursor-pointer"
          onClick={() => setSelectedImage(getLightboxImage({
            variants: [],
            imageSource: mainImage,
            caption: title
          }))}
        >
          <Image
            src={mainImage}
            alt={title}
            fill
            className="object-cover"
            priority
            quality={100}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        
        {/* Thumbnail Images - Smaller */}
        {images.slice(0, 4).map((image, index) => {
          const displayImage = getDisplayImage(image);
          const lightboxImage = getLightboxImage(image);
          
          return (
            <div 
              key={index}
              className="relative h-32 rounded-lg overflow-hidden cursor-pointer"
              onClick={() => setSelectedImage(lightboxImage)}
            >
              <Image
                src={displayImage.url}
                alt={displayImage.alt}
                fill
                className="object-cover"
                quality={100}
                sizes="(max-width: 768px) 25vw, 15vw"
              />
            </div>
          );
        })}
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 bg-transparent border-none">
          {selectedImage && (
            <div className="relative w-full h-full">
              <Image
                src={selectedImage.url}
                alt={selectedImage.alt}
                width={1200}
                height={800}
                className="object-contain w-full h-full"
                quality={100}
                priority
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}