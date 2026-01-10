"use client";

import { useContext, useEffect } from "react";
import { GeolocationContext } from "../contexts/GeolocationContext";
import { useRouter } from "next/navigation";

export default function Home() {
  const { location, error, loading, requestLocation, setMockLocation } =
    useContext(GeolocationContext);
  const router = useRouter();

  useEffect(() => {
    if (!location) {
      router.push("/");
    }
  }, [location, loading]);

  return (
    <main className="h-dvh flex w-screen flex-col items-center bg-black p-8 text-center font-sans text-white">
      <p>Browse</p>
    </main>
  );
}
