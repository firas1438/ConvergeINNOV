import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";

//metadata
export const metadata: Metadata = {
  title: "ConvergeINNOV",
  description: "ConvergeINNOV delivers innovative AR/VR, metaverse, and custom web/mobile solutions tailored to clients specific needs.",
};

//fonts
const geistSans = localFont({
  src: "../public/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "../public/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const cinzel = localFont({
  src: "../public/fonts/Cinzel-Regular.woff",
  variable: "--font-cinzel",
  weight: "100 900"
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"  suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} ${cinzel.variable} antialiased`}>
          <Providers>{children}</Providers>
      </body>
    </html>
  );
}