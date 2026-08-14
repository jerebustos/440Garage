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
  title: "440Garage - Tu Tienda de Instrumentos Musicales",
  description: "Queremos ayudarte a elegir tu instrumento inicial o dar el salto a uno profesional. Av. San Martin 519, L6300BBF Santa Rosa, La Pampa.",
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
