import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";

export const metadata: Metadata = {
  title: "SereniGo: Explore the Best Safaris & Tours in Kenya and Tanzania",
  description:
    "Discover breathtaking safaris and unforgettable tours in Kenya and Tanzania with SereniGo. Plan your adventure, explore top-rated national parks, book guided tours, and experience African wildlife like never before.",
  icons: {
    icon: [{ url: "/fav.png" }], // Updated to reflect the path inside public folder
    apple: [{ url: "/fav.png" }],
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
        <link rel="icon" href="/fav.png" /> {/* Updated to match path */}
        <link rel="apple-touch-icon" href="/fav.png" />
      </head>
      <body>
        <ClientBody>{children}</ClientBody>
      </body>
    </html>
  );
}







