import type { Metadata } from "next";
import "./globals.css";
import ClientBody from "./ClientBody";

export const metadata: Metadata = {
  title: "SereniGo: Explore the Best Safaris & Tours in Kenya and Tanzania",
  description:
    "Discover breathtaking safaris and unforgettable tours in Kenya and Tanzania with SereniGo. Plan your adventure, explore top-rated national parks, book guided tours, and experience African wildlife like never before.",
  icons: {
    icon: [
      { url: "/favicon.ico" }, // Classic favicon
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" }, // Added for Google
      { url: "/web-app-manifest-192x192.png", sizes: "192x192", type: "image/png" }, // Renamed to match file
      { url: "/web-app-manifest-512x512.png", sizes: "512x512", type: "image/png" }, // Renamed to match file
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="VdquBXQmff25i9UP5LVpgai-IUbiMQUh6olrPpaIJxQ" />
        <meta name="apple-mobile-web-app-title" content="SereniGo" />
        <link rel="canonical" href="https://www.serenigo.com" />
        {/* Removed manual favicon tags to avoid conflicts */}
      </head>
      <body>
        <ClientBody>{children}</ClientBody>
      </body>
    </html>
  );
}








