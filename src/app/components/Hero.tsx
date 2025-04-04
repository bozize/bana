'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Hero() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div className="flex justify-center items-center py-12">
      <div className="relative w-[500px] max-w-full">
        <Input
          type="text"
          placeholder="Search safaris, tours"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="h-16 w-full pl-10 pr-14 text-base bg-white bg-opacity-90 rounded-full text-black"
        />

        

        {/* Icon button on the right */}
        <Button
          onClick={handleSearch}
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black hover:bg-gray-700 border border-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </Button>
      </div>
    </div>
  );
}
