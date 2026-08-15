import type { Metadata } from "next";
import { Cinzel, Outfit } from "next/font/google";
import "./globals.css";
import SmoothScrolling from "@/components/SmoothScrolling";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://440garage.com'),
  title: {
    default: "440Garage | Tu Tienda de Instrumentos Musicales",
    template: "%s | 440Garage"
  },
  description: "En 440Garage te ayudamos a elegir tu instrumento inicial o dar el salto a uno profesional. Venta de guitarras, bajos, teclados, pedales y más. Av. San Martin 519, Santa Rosa, La Pampa.",
  keywords: ["guitarras", "bajos", "instrumentos musicales", "tienda de musica", "santa rosa", "la pampa", "440garage", "pedales", "audio", "baterias"],
  authors: [{ name: "440Garage" }],
  creator: "440Garage",
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "/",
    title: "440Garage | Tu Tienda de Instrumentos Musicales",
    description: "En 440Garage te ayudamos a elegir tu instrumento inicial o dar el salto a uno profesional. Descubrí nuestro catálogo.",
    siteName: "440Garage"
  },
  twitter: {
    card: "summary_large_image",
    title: "440Garage | Tu Tienda de Instrumentos Musicales",
    description: "En 440Garage te ayudamos a elegir tu instrumento inicial o dar el salto a uno profesional."
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${cinzel.variable} ${outfit.variable} antialiased`}
    >
      <body className="flex flex-col bg-black text-white relative font-sans">
        <Header />
        <SmoothScrolling>
          {children}
          <Footer />
        </SmoothScrolling>
        <WhatsAppButton />
      </body>
    </html>
  );
}
