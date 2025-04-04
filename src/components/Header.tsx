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
            <Button variant="ghost" className="text-black font-medium">
              <a
                href="https://trip.tp.st/CL8wSZ5f"
                target="_blank"
                rel="noopener noreferrer"
              >
                Hotels
              </a>
            </Button>
            <Button variant="ghost" className="text-black font-medium">
              <a
                href="https://www.serenigo.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Things To Do
              </a>
            </Button>
            <Button variant="ghost" className="text-black font-medium">
              <a
                href="https://wayaway.tp.st/HCPQCDmD"
                target="_blank"
                rel="noopener noreferrer"
              >
                Flights
              </a>
            </Button>
            <Button variant="ghost" className="text-black font-medium">
              <a
                href="https://kiwitaxi.tp.st/rHeZj7gT"
                target="_blank"
                rel="noopener noreferrer"
              >
                Airport transfers 
              </a>
            </Button>
            <Button variant="ghost" className="text-black font-medium">
              <a
                href="https://trip.tp.st/UvjvZn9Q"
                target="_blank"
                rel="noopener noreferrer"
              >
                Rental Cars
              </a>
            </Button>
            <Button variant="ghost" className="text-black font-medium">
              <Link href="/forums">
                Visa Help
              </Link>
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

