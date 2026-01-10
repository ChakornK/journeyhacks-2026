"use client";

import { Lora, Work_Sans } from "next/font/google";
import "./globals.css";
import { GeolocationContext } from "./contexts/GeolocationContext";
import { useGeolocation } from "./hooks/useGeolocation";

const lora = Lora({
  variable: "--font-serif",
  subsets: ["latin"],
});

const workSans = Work_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const { location, error, loading, requestLocation, setMockLocation } =
    useGeolocation();

  return (
    <html lang="en">
      <body
        className={`${lora.variable} ${workSans.variable}${" "}antialiased`}
      >
        <GeolocationContext
          value={{ location, error, loading, requestLocation, setMockLocation }}
        >
          {children}
        </GeolocationContext>
      </body>
    </html>
  );
}
