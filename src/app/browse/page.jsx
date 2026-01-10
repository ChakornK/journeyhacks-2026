"use client";

import { useContext, useEffect, useState } from "react";
import { GeolocationContext } from "../contexts/GeolocationContext";
import { useRouter } from "next/navigation";
import { Header } from "../components/Header";
import { getDistance } from "geolib";
import { ChevronRight, MapPin, Plus } from "lucide-react";

export default function Home() {
  const { location, error, loading, requestLocation, setMockLocation } =
    useContext(GeolocationContext);
  const router = useRouter();

  useEffect(() => {
    if (!location) {
      router.push("/");
    }
  }, [location, loading]);

  const [communities, setCommunities] = useState([
    {
      _id: "1",
      name: "Sample Community",
      description: "This is a sample community.",
      location: { lat: 0, lng: 0 },
    },
    {
      _id: "2",
      name: "Sample Community",
      description: "This is a sample community.",
      location: { lat: 0, lng: 0 },
    },
    {
      _id: "3",
      name: "Sample Community",
      description: "This is a sample community.",
      location: { lat: 0, lng: 0 },
    },
  ]);
  // useEffect(() => {
  //   fetch("/api/communities")
  //     .then((res) => res.json())
  //     .then((data) => setCommunities(data.communities));
  // }, []);

  return (
    location && (
      <main className="h-dvh flex w-screen flex-col bg-black p-8 font-sans text-white">
        <Header />

        <div className="flex items-start justify-between">
          <div>
            <p className="text-2xl font-medium">Browse nearby communities</p>
            <p className="text-sm text-neutral-400">
              {communities.length} communities found
            </p>
          </div>

          <button className="flex cursor-pointer items-center gap-1 rounded-lg bg-emerald-400 px-4 py-3 text-sm font-medium text-black transition-colors hover:bg-emerald-500">
            <Plus size={16} /> Create
          </button>
        </div>

        <div className="flex flex-col items-stretch gap-1">
          {communities.map(
            ({ _id, name, description, location: communityLocation }) => (
              <button
                key={_id}
                className="mt-4 flex cursor-pointer items-center justify-between rounded-lg border border-neutral-800 bg-neutral-900 p-4 text-left hover:border-emerald-500"
                onClick={() => {
                  router.push(`/community/${_id}`);
                }}
              >
                <div className="flex flex-col">
                  <p className="text-lg font-medium">{name}</p>
                  <p className="text-sm text-neutral-400">{description}</p>
                  <div className="mt-1 flex items-center gap-1 text-xs text-neutral-400">
                    <MapPin size={16} />
                    <p>
                      {Math.ceil(
                        getDistance(
                          {
                            latitude: communityLocation.lat,
                            longitude: communityLocation.lng,
                          },
                          {
                            latitude: location.lat,
                            longitude: location.lng,
                          },
                        ) / 1000,
                      )}{" "}
                      km away
                    </p>
                  </div>
                </div>

                <ChevronRight size={24} className="text-neutral-400" />
              </button>
            ),
          )}
        </div>
      </main>
    )
  );
}
