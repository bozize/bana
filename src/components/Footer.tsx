import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-100 pt-8 pb-4 mt-12">
      <div className="tripadvisor-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About Tripadvisor Section */}
          <div>
            <h3 className="font-bold text-sm mb-4">About SereniGo</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-gray-600 hover:text-black">About Us</Link></li>
  
              <li><Link href="#" className="text-gray-600 hover:text-black">Contact us</Link></li>
            </ul>
          </div>

          {/* Explore Section */}
          <div>
            <h3 className="font-bold text-sm mb-4">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-gray-600 hover:text-black">Write a review</Link></li>
              
              <li><Link href="#" className="text-gray-600 hover:text-black">Community</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-black">Help</Link></li>
              
            </ul>
          </div>

          

         
        </div>

    

        {/* Bottom Section */}
        <div className="pt-6 border-t border-gray-300">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-4 md:mb-0">
              <p className="text-xs text-gray-600">© 2025 SereniGo All rights reserved.</p>
              <div className="flex flex-wrap gap-3 mt-2">
                <Link href="#" className="text-xs text-gray-600 hover:text-black">Terms of Use</Link>
                <Link href="#" className="text-xs text-gray-600 hover:text-black">Privacy and Cookies Statement</Link>
                <Link href="#" className="text-xs text-gray-600 hover:text-black">Cookie consent</Link>
                <Link href="#" className="text-xs text-gray-600 hover:text-black">Contact us</Link>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-xs text-gray-600">
                <span>$ USD</span>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </footer>
  );
}
