import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import safari from "@/images/vector.svg";
import {
  BuildingOffice2Icon,
  CheckIcon,
  PaperAirplaneIcon,
  HomeIcon,
  InformationCircleIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";

// Define TypeScript interfaces for component props
interface SafariCardProps {
  image: string;
  title: string;
}

interface ExperienceCardProps {
  image: string;
  title: string;
  rating: number;
  reviews: number;
  price: number;
  isBestSeller?: boolean;
}

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
      className="relative py-16 md:py-24"
      style={{
        backgroundImage: "url('/images/ele.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "540px",
      }}
    >
      <div className="relative container mx-auto text-center text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 drop-shadow-lg text-black">
          Explore Kenya & Tanzania Safaris
        </h1>
        <p className="text-lg mb-6 drop-shadow-md text-black">
          Book unforgettable safaris and tours across East Africa’s wild heartlands.
        </p>
        <div className="max-w-3xl mx-auto">
          {/* Navigation Links */}
          <nav className="flex md:hidden items-center space-x-6 mb-6 overflow-x-auto flex-nowrap px-4 snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
  <Button variant="ghost" className="text-black font-medium hover:bg-white/20 rounded-full transition-colors">
    <Link href="/hotels" className="flex items-center space-x-2">
      <BuildingOffice2Icon className="w-5 h-5" />
      <span>Hotels</span>
    </Link>
  </Button>
  <Button variant="ghost" className="text-black font-medium hover:bg-white/20 rounded-full transition-colors">
    <Link href="/things-to-do" className="flex items-center space-x-2">
      <CheckIcon className="w-5 h-5" />
      <span>Things to Do</span>
    </Link>
  </Button>
  <Button variant="ghost" className="text-black font-medium hover:bg-white/20 rounded-full transition-colors">
    <Link href="/flights" className="flex items-center space-x-2">
      <PaperAirplaneIcon className="w-5 h-5" />
      <span>Flights</span>
    </Link>
  </Button>
  <Button variant="ghost" className="text-black font-medium hover:bg-white/20 rounded-full transition-colors">
    <Link href="/vacation-rentals" className="flex items-center space-x-2">
      <HomeIcon className="w-5 h-5" />
      <span>Vacation Rentals</span>
    </Link>
  </Button>
  <Button variant="ghost" className="text-white font-medium hover:bg-white/20 rounded-full transition-colors">
    <Link href="/rental-cars" className="flex items-center space-x-2">
      <InformationCircleIcon className="w-5 h-5" />
      <span>Rental Cars</span>
    </Link>
  </Button>
  <Button variant="ghost" className="text-white font-medium hover:bg-white/20 rounded-full transition-colors">
    <Link href="/forums" className="flex items-center space-x-2">
      <ChatBubbleLeftRightIcon className="w-5 h-5" />
      <span>Visa Help</span>
    </Link>
  </Button>
</nav>
          {/* Search Input */}
          <div className="relative">
            <Input
              type="text"
              placeholder="Search safaris, tours, or destinations in Kenya & Tanzania..."
              className="h-14 w-full pl-10 text-lg bg-white bg-opacity-90 rounded-full"
            />
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
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
                className="text-gray-500"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
            <Button
              variant="default"
              size="sm"
              className="absolute inset-y-1.5 right-2 flex items-center justify-center h-11 px-4 text-sm bg-black hover:bg-gray-700 border border-white rounded-full"
            >
              Search
            </Button>
          </div>
        </div>
      </div>
    </section>

      {/* Plan Your Safari Section */}
      <section className="py-12 bg-green-50">
        <div className="container mx-auto">
          <div className="bg-black rounded-xl overflow-hidden text-white">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Plan Your East African Adventure
                </h2>
                <p className="mb-8">
                  From the Maasai Mara to the Serengeti—craft your perfect safari or tour.
                </p>
                <Button className="bg-amber-500 hover:bg-amber-600 text-black w-fit">
                  Book Now
                </Button>
              </div>
              <div className="md:w-1/2 p-6 md:p-0 flex items-center justify-center">
                <Image
                  src="https://images.unsplash.com/photo-1519659528534-7fd733a832a0?maasai-mara"
                  alt="East African Safari"
                  width={600}
                  height={400}
                  className="rounded-lg md:rounded-none object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Destinations Section */}
      <section className="py-12">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-6">Top Safari Destinations in Kenya & Tanzania</h2>
          <p className="text-gray-600 mb-8">Discover the best of East Africa’s wilderness.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <SafariCard
              image="https://images.unsplash.com/photo-1519659528534-7fd733a832a0?maasai-mara"
              title="Maasai Mara, Kenya"
            />
            <SafariCard
              image="https://images.unsplash.com/photo-1516426122078-c23e707b9d10?serengeti"
              title="Serengeti, Tanzania"
            />
            <SafariCard
              image="https://images.unsplash.com/photo-1599950724218-6e5bcef8fbeb?ngorongoro"
              title="Ngorongoro Crater, Tanzania"
            />
            <SafariCard
              image="https://images.unsplash.com/photo-1547471080-7cc2cfc3e0c8?kilimanjaro"
              title="Mount Kilimanjaro, Tanzania"
            />
            <SafariCard
              image="https://images.unsplash.com/photo-1568051243851-f9b13be471e0?amboseli"
              title="Amboseli, Kenya"
            />
          </div>
        </div>
      </section>

      {/* Top Safari Tours Section */}
      <section className="py-12 bg-green-50">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-8">Top Safari & Tour Experiences</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <ExperienceCard
              image="https://images.unsplash.com/photo-1519659528534-7fd733a832a0?maasai-tour"
              title="3-Day Maasai Mara Safari"
              rating={4.9}
              reviews={3000}
              price={850}
              isBestSeller={true}
            />
            <ExperienceCard
              image="https://images.unsplash.com/photo-1516298773066-ad4a97737727?serengeti-tour"
              title="5-Day Serengeti Wildlife Safari"
              rating={4.8}
              reviews={2450}
              price={1200}
            />
            <ExperienceCard
              image="https://images.unsplash.com/photo-1547471080-7cc2cfc3e0c8?kilimanjaro-trek"
              title="7-Day Kilimanjaro Trek - Machame Route"
              rating={5.0}
              reviews={3200}
              price={1800}
            />
            <ExperienceCard
              image="https://images.unsplash.com/photo-1568051243851-f9b13be471e0?amboseli-tour"
              title="Amboseli Elephant Safari Day Trip"
              rating={4.7}
              reviews={1800}
              price={200}
            />
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12 bg-amber-100">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-2/3 p-6 md:p-12">
              <h2 className="text-3xl font-bold mb-4">Why Book with Us?</h2>
              <p className="text-gray-700 mb-6">
                Local expertise, seamless bookings, and authentic Kenya & Tanzania adventures.
              </p>
              <Button className="bg-black hover:bg-black text-white">
                Learn More
              </Button>
            </div>
            <div className="md:w-1/3 p-6 flex items-center justify-center">
              <Image
                src="https://images.unsplash.com/photo-1559666126-9949683b4bf4?safari-guide"
                alt="Safari Guide"
                width={160}
                height={160}
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  // Safari Card Component
  function SafariCard({ image, title }: SafariCardProps) {
    return (
      <Link href="#" className="block">
        <div className="relative rounded-lg overflow-hidden h-48 group">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
            <h3 className="text-white font-bold">{title}</h3>
          </div>
        </div>
      </Link>
    );
  }

  // Experience Card Component
  function ExperienceCard({ 
    image, 
    title, 
    rating, 
    reviews, 
    price, 
    isBestSeller = false 
  }: ExperienceCardProps) {
    return (
      <Card className="overflow-hidden h-full">
        <Link href="#" className="block">
          <div className="relative h-48">
            <Image 
              src={image} 
              alt={title} 
              fill
              className="object-cover"
            />
            {isBestSeller && (
              <div className="absolute top-2 left-2 bg-amber-500 text-black font-bold text-xs px-2 py-1 rounded">
                Best Seller
              </div>
            )}
            <button className="absolute top-2 right-2 bg-white rounded-full p-1.5">
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
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
              </svg>
            </button>
          </div>
        </Link>
        <CardContent className="p-4">
          <h3 className="font-bold text-sm mb-2 line-clamp-2">{title}</h3>
          <div className="flex items-center mb-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill={i < Math.floor(rating) ? "#00aa6c" : "none"}
                  stroke="#00aa6c"
                  className="mr-0.5"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              ))}
            </div>
            <span className="text-xs text-gray-600 ml-1">{reviews.toLocaleString()}</span>
          </div>
          <p className="text-sm">from ${price} per person</p>
        </CardContent>
      </Card>
    );
  }
}