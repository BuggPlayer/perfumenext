import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers/Providers";

// Typography setup for a luxury/jewelry aesthetic
// - Playfair Display (serif) for headings → elegant, high-contrast
// - DM Sans (sans-serif) for body/UI → clean and readable
// Expose them as CSS variables so Tailwind and plain CSS can both consume consistently
const headingFont = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-heading",
});

const bodyFont = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-body",
});

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
      {/*
        Attach font CSS variables to the <body> so all descendants inherit.
        - Use Tailwind utility "font-body" by default; headings can use "font-heading".
        - Colors come from CSS variables (see globals.css) to keep themeable.
      */}
      <body className={`${headingFont.variable} ${bodyFont.variable} font-body bg-[var(--bg-canvas)] text-[var(--text-primary)]`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
