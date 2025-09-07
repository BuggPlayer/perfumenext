import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers/Providers";

const lato = Lato({ subsets: ["latin"], weight: ["300","400","700","900"] });

export const metadata: Metadata = {
  title: "PerfumeLux - Premium Fragrances",
  description: "Discover the world’s finest fragrances from luxury brands. Find your perfect perfume and make every moment unforgettable.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lato.className} bg-[var(--color-background)] text-[var(--color-text)]`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
