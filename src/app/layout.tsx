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
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }, // iOS touch icon
    ],
  },
  manifest: "/site.webmanifest", // Link to the web manifest
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
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
<link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* No need for manual <link> tags; metadata handles it */}
      </head>
      <body>
        <ClientBody>{children}</ClientBody>
      </body>
    </html>
  );
}







