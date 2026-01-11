"use client";

import { useContext, useEffect } from "react";
import { GeolocationContext } from "./contexts/GeolocationContext";
import { useRouter } from "next/navigation";
import { MapPin } from "lucide-react";

export default function Home() {
  const { location, error, loading, requestLocation, setMockLocation } =
    useContext(GeolocationContext);
  const router = useRouter();

  useEffect(() => {
    if (location) {
      router.push("/browse");
    }
  }, [location, loading]);

  return (
    <main className="h-dvh flex w-screen flex-col items-center justify-center bg-black p-8 text-center font-sans text-white">
      <div className="flex max-w-md flex-col items-center gap-2">
        <div className="relative h-32 w-32">
          <div className="absolute left-0 top-0 flex h-32 w-32 animate-pulse items-center justify-center rounded-full bg-emerald-500/20">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-emerald-500/20"></div>
          </div>
          <div className="absolute left-0 top-0 flex h-32 w-32 items-center justify-center">
            <MapPin className="h-12 w-12 text-emerald-400" />
          </div>
        </div>

        <h1 className="font-serif text-4xl font-bold">Whisper</h1>
        <p className="text-neutral-400">
          Anonymous confessions from your community
        </p>

        <p className="mt-4 text-sm text-neutral-400">
          Enable location access to discover nearby communities and share your
          secrets anonymously.
        </p>

        <button
          className="mt-4 w-full cursor-pointer rounded-lg bg-emerald-400 px-4 py-3 text-sm font-medium text-black transition-colors hover:bg-emerald-500"
          onClick={() => {
            requestLocation();
          }}
        >
          Enable location
        </button>

        <p className="mt-4 text-xs text-neutral-400">
          Your location is never stored or shared. It's only used to find nearby
          communities.
        </p>
      </div>
    </main>
  );
}
