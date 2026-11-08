import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import { CartProvider } from "@/components/CartProvider";

export const metadata: Metadata = {
  title: "ARKECH ATELIER — Rebirth Collection | Not Made For Everyone. Made For You.",
  description:
    "ARKECH ATELIER — Rebirth Collection. Completi oversize, ricami e dettagli esclusivi elaborati personalmente da Arkech Atelier. T-shirt contemporanee in cotone biologico. Spedizione rapida in tutta Italia.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <CartProvider>
          <Header />
          {children}
          <Footer />
          <MobileBottomNav />
        </CartProvider>
      </body>
    </html>
  );
}
