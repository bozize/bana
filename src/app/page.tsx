import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import safari from "@/images/vector.svg";
import { Buildings, Check, Airplane, House, Car, ChatTeardropDots } from '@phosphor-icons/react/dist/ssr';
import ExperienceCard from './components/ExperienceCard';
import Hero from './components/Hero';

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

async function fetchTopTours(country: string): Promise<Product[]> {
  console.log(`fetchTopTours: Starting fetch for ${country}`);
  const query = `${country} Luxury Safaris tours`;
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/search?query=${encodeURIComponent(query)}&count=10`;
  console.log('fetchTopTours: URL:', url);

  const res = await fetch(url, { next: { revalidate: 86400 } });
  console.log('fetchTopTours: Response status:', res.status);

  if (!res.ok) {
    const errorText = await res.text();
    console.log('fetchTopTours: Error response:', errorText);
    throw new Error(`Failed to fetch top tours: ${res.status} - ${errorText}`);
  }

  const data = await res.json();
  console.log('fetchTopTours: Fetched data:', data);
  const tours = data.data || [];
  console.log('fetchTopTours: Returning tours:', tours.length);
  return tours;
}

export default async function Home() {
  let tanzaniaTours: Product[] = [];
  let kenyaTours: Product[] = [];
  let error: string | null = null;

  console.log('Home: Starting');
  try {
    // Fetch both Kenya and Tanzania tours in parallel
    const [tanzaniaResults, kenyaResults] = await Promise.all([
      fetchTopTours('tanzania'),
      fetchTopTours('kenya')
    ]);
    
    tanzaniaTours = tanzaniaResults;
    kenyaTours = kenyaResults;
    console.log('Home: Tours fetched - Tanzania:', tanzaniaTours.length, 'Kenya:', kenyaTours.length);
  } catch (err) {
    error = (err as Error).message;
    console.error('Home: Error:', error);
  }

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
      Book unforgettable safaris and tours across East Africa's wild heartlands.
    </p>
    <div className="max-w-3xl mx-auto">
    <nav className="flex md:hidden items-center space-x-6 mb-6 overflow-x-auto flex-nowrap px-4 snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
  <a
    href="https://trip.tp.st/CL8wSZ5f"
    target="_blank"
    rel="noopener noreferrer"
    className="text-white font-medium hover:bg-white/20 rounded-full transition-colors px-4 py-2 inline-flex items-center space-x-2"
  >
    <Buildings className="w-5 h-5" />
    <span>Hotels</span>
  </a>

  <a
    href="https://www.example.com/things-to-do"
    target="_blank"
    rel="noopener noreferrer"
    className="text-white font-medium hover:bg-white/20 rounded-full transition-colors px-4 py-2 inline-flex items-center space-x-2"
  >
    <Check className="w-5 h-5" />
    <span>Things to Do</span>
  </a>

  <a
    href="https://www.example.com/flights"
    target="_blank"
    rel="noopener noreferrer"
    className="text-white font-medium hover:bg-white/20 rounded-full transition-colors px-4 py-2 inline-flex items-center space-x-2"
  >
    <Airplane className="w-5 h-5" />
    <span>Flights</span>
  </a>

  <a
    href="https://www.example.com/vacation-rentals"
    target="_blank"
    rel="noopener noreferrer"
    className="text-white font-medium hover:bg-white/20 rounded-full transition-colors px-4 py-2 inline-flex items-center space-x-2"
  >
    <House className="w-5 h-5" />
    <span>Vacation Rentals</span>
  </a>

  <a
    href="https://www.example.com/rental-cars"
    target="_blank"
    rel="noopener noreferrer"
    className="text-white font-medium hover:bg-white/20 rounded-full transition-colors px-4 py-2 inline-flex items-center space-x-2"
  >
    <Car className="w-5 h-5" />
    <span>Rental Cars</span>
  </a>

  {/* Keep this as a Next.js Link for internal navigation */}
  <Button variant="ghost" className="text-white font-medium hover:bg-white/20 rounded-full transition-colors">
    <Link href="/forums" className="flex items-center space-x-2">
      <ChatTeardropDots className="w-5 h-5" />
      <span>Visa Help</span>
    </Link>
  </Button>
</nav>
      <Hero />
    </div>
  </div>
</section>

      {/* 
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
*/}


      {/* Kenya Luxury Safaris Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-8">Kenya Luxury Safari Experiences</h2>
          {error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : kenyaTours.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {kenyaTours.map((product) => (
                <ExperienceCard key={product.productCode} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-center">No Kenya tours available at the moment.</p>
          )}
        </div>
      </section>

      {/* Tanzania Luxury Safaris Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-8">Tanzania Luxury Safari Experiences</h2>
          {error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : tanzaniaTours.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {tanzaniaTours.map((product) => (
                <ExperienceCard key={product.productCode} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-center">No Tanzania tours available at the moment.</p>
          )}
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
              {/* Optional content can go here */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function SafariCard({ image, title }: { image: string; title: string }) {
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