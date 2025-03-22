import Link from 'next/link';
import { Button } from './ui/button';
import Image from "next/image";
import vectorImage from "@/images/vector.svg";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="tripadvisor-container py-2">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image src={vectorImage} alt="SereniGo" width={110} height={110} />
          </Link>

          {/* Navigation Links (Now in place of Desktop Nav) */}
          <nav className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="text-gray-700 font-medium">
              <Link href="/hotels">Hotels</Link>
            </Button>
            <Button variant="ghost" className="text-gray-700 font-medium">
              <Link href="/things-to-do">Things to Do</Link>
            </Button>
            <Button variant="ghost" className="text-gray-700 font-medium">
              <Link href="/flights">Flights</Link>
            </Button>
            <Button variant="ghost" className="text-gray-700 font-medium">
              <Link href="/vacation-rentals">Vacation Rentals</Link>
            </Button>
            <Button variant="ghost" className="text-gray-700 font-medium">
              <Link href="/rental-cars">Rental Cars</Link>
            </Button>
            <Button variant="ghost" className="text-gray-700 font-medium">
              <Link href="/forums">Visa Help</Link>
            </Button>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" className="text-gray-700 font-medium hidden md:inline-flex">
              USD
            </Button>
            <Button className="bg-black text-white hover:bg-gray-800 rounded-full">
              Sign in
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

