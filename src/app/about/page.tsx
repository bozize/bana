// app/about/page.tsx
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Globe, Plane, Hotel, CheckCircle, Car, Headset, Map, Shield, Leaf } from 'lucide-react';

export const metadata = {
  title: "About Us | Kenya & Tanzania Safari Experts | YourCompany",
  description: "Discover why we're the leading safari specialists for Kenya and Tanzania. We offer bespoke safaris, flight bookings, hotel reservations, visa assistance, and car rentals across East Africa.",
  keywords: "about Kenya safari company, Tanzania tour operator, East Africa travel experts, safari about us, Kenya Tanzania travel agency",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gray-900">
        <div className="absolute inset-0 overflow-hidden">
          
        </div>
        <div className="relative container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Your Trusted Safari Experts in <span className="text-amber-400">East Africa</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Crafting unforgettable safari experiences in Kenya and Tanzania
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 md:py-24 bg-white">
  <div className="container mx-auto px-4">
    <div className="flex flex-col lg:flex-row gap-12 items-center justify-center text-center lg:text-left">
     
      <div className="lg:w-1/2">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
          Our <span className="text-green-600">Story</span>
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          We created Serenigo.com to connect travelers from around the world with the most authentic, awe-inspiring, and meaningful experiences in Kenya and Tanzania. Whether it's spotting the Big Five on a sunrise game drive, exploring the culture of the Maasai and Chaga communities, or chasing waterfalls in the lush Usambara Mountains — we bring it all to one platform.
        </p>
        <p className="text-lg text-gray-600 mb-6">
          Our deep local knowledge, commitment to sustainable tourism, and personalized service have made us the preferred choice for discerning travelers seeking authentic African adventures.
        </p>
        <div className="flex flex-wrap justify-center lg:justify-start gap-4">
          <div className="bg-amber-50 px-6 py-4 rounded-lg">
            <h3 className="font-bold text-amber-700">10,000+</h3>
            <p className="text-gray-600">Happy Travelers</p>
          </div>
          <div className="bg-green-50 px-6 py-4 rounded-lg">
            <h3 className="font-bold text-green-700">500+</h3>
            <p className="text-gray-600">Safaris Organized</p>
          </div>
          <div className="bg-blue-50 px-6 py-4 rounded-lg">
            <h3 className="font-bold text-blue-700">100%</h3>
            <p className="text-gray-600">Local Experts</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


<section className="py-16 md:py-24 bg-gray-50">
  <div className="container mx-auto px-4">
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
        Comprehensive <span className="text-green-600">Travel Services</span>
      </h2>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        We offer end-to-end solutions for your East African adventure
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
        <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
          <Globe className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold mb-4 text-gray-800">Tailored Safaris</h3>
        <p className="text-gray-600 mb-6">
          Custom-designed Kenya and Tanzania safari packages including luxury lodges, private guides, and exclusive wildlife experiences.
        </p>
        <a
          href="https://www.serenigo.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-600 font-medium hover:underline"
        >
          Explore Safaris →
        </a>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
        <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
          <Plane className="w-8 h-8 text-blue-600" />
        </div>
        <h3 className="text-xl font-bold mb-4 text-gray-800">Flight Bookings</h3>
        <p className="text-gray-600 mb-6">
          Competitive international and domestic flight options to Nairobi, Kilimanjaro, and Zanzibar with our airline partners.
        </p>
        <a
          href="https://wayaway.tp.st/HCPQCDmD"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 font-medium hover:underline"
        >
          Find Flights →
        </a>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
        <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
          <Hotel className="w-8 h-8 text-amber-600" />
        </div>
        <h3 className="text-xl font-bold mb-4 text-gray-800">Hotel Reservations</h3>
        <p className="text-gray-600 mb-6">
          Curated selection of hotels, from Nairobi business hotels to Zanzibar beach resorts and safari lodges.
        </p>
        <a
          href="https://trip.tp.st/CL8wSZ5f"
          target="_blank"
          rel="noopener noreferrer"
          className="text-amber-600 font-medium hover:underline"
        >
          Browse Hotels →
        </a>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
        <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="w-8 h-8 text-purple-600" />
        </div>
        <h3 className="text-xl font-bold mb-4 text-gray-800">Visa Assistance</h3>
        <p className="text-gray-600 mb-6">
          Expert guidance for Kenya and Tanzania visa applications, including e-visa processing and requirements.
        </p>
        <Link href="/forums" className="text-purple-600 font-medium hover:underline">
          Visa Info →
        </Link>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
        <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
          <Car className="w-8 h-8 text-red-600" />
        </div>
        <h3 className="text-xl font-bold mb-4 text-gray-800">Car Rentals</h3>
        <p className="text-gray-600 mb-6">
          4x4 safari vehicles and city cars available for hire in major Kenya and Tanzania locations with full insurance.
        </p>
        <a
          href="https://trip.tp.st/UvjvZn9Q"
          target="_blank"
          rel="noopener noreferrer"
          className="text-red-600 font-medium hover:underline"
        >
          View Vehicles →
        </a>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
        <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
          <Headset className="w-8 h-8 text-teal-600" />
        </div>
        <h3 className="text-xl font-bold mb-4 text-gray-800">24/7 Support</h3>
        <p className="text-gray-600 mb-6">
          Dedicated local support team available round-the-clock during your East African travels.
        </p>
        <Link href="/contact" className="text-teal-600 font-medium hover:underline">
          Contact Us →
        </Link>
      </div>
    </div>
  </div>
</section>

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-24 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Travelers Choose Our <span className="text-amber-300">Safari Company</span>
            </h2>
            <p className="text-xl max-w-3xl mx-auto">
              What sets us apart in Kenya and Tanzania tourism
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Map className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-4">Local Expertise</h3>
              <p className="text-green-100">
                Our team lives and breathes East Africa, with guides born and raised in Kenya and Tanzania's safari regions.
              </p>
            </div>

            

            <div className="text-center p-6">
              <div className="bg-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Leaf className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-4">Sustainable Tourism</h3>
              <p className="text-green-100">
                Committed to eco-friendly practices and supporting local Maasai and Tanzanian communities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-amber-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Ready for Your <span className="text-green-600">East African</span> Adventure?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Contact our safari specialists to start planning your perfect Kenya and Tanzania itinerary
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild className="bg-black hover:bg-gray-700 text-white px-8 py-6 text-lg">
              <Link href="/contact">Get a Free Safari Quote</Link>
            </Button>
            <Button asChild variant="outline" className="border-gray-600 text-black hover:bg-green-50 px-8 py-6 text-lg">
              <Link href="tel:+254700000000">Call Our Experts</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}