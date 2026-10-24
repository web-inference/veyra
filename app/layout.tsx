import type { Metadata, Viewport } from "next";
import { Geist, Instrument_Serif } from "next/font/google";
import { SmoothScroll } from "@/components/SmoothScroll";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const title = "Veyra — Find Your Perfect Stay at the Best Price";
const description =
  "Handpicked hotels, cabins and resorts from city escapes to beachside retreats. Compare trusted prices and book your perfect stay in minutes.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "Veyra",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: "Glass villa on a still lake at blue hour" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/images/og-image.jpg"] },
};

export const viewport: Viewport = { themeColor: "#071a20" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: the inline script adds the "js" class before React hydrates.
    <html lang="en" className={`${geist.variable} ${instrument.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
