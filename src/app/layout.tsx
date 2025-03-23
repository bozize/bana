import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";

export const metadata: Metadata = {
  title: "SereniGo: Explore the Best Safaris & Tours in Kenya and Tanzania",
  description:
    "Discover breathtaking safaris and unforgettable tours in Kenya and Tanzania with SereniGo. Plan your adventure, explore top-rated national parks, book guided tours, and experience African wildlife like never before.",
  icons: {
    icon: [{ url: "/images/fav.png" }], // Corrected path
    apple: [{ url: "/images/fav.png" }], // Corrected path
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/fav.png" /> {/* Corrected path */}
        <link rel="apple-touch-icon" href="/images/fav.png" /> {/* Corrected path */}
      </head>
      <body>
        <ClientBody>{children}</ClientBody>
      </body>
    </html>
  );
}







