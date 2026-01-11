"use client";

import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { GeolocationContext } from "../contexts/GeolocationContext";
import { useRouter } from "next/navigation";
import { Header } from "../components/Header";
import { getDistance } from "geolib";
import { ChevronRight, MapPin, Plus, X } from "lucide-react";
import { Portal } from "../components/Portal";
import {
  AdvancedMarker,
  APIProvider,
  InfoWindow,
  Map,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";

export default function Browse() {
  const { location, error, loading, requestLocation, setMockLocation } =
    useContext(GeolocationContext);
  const router = useRouter();

  useEffect(() => {
    if (!location) {
      router.push("/");
    }
  }, [location, loading]);

  const [communities, setCommunities] = useState([]);
  useEffect(() => {
    if (location) {
      fetch(`/api/communities?lat=${location.lat}&lng=${location.lng}`)
        .then((res) => res.json())
        .then((data) => setCommunities(data.communities));
    }
  }, []);

  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [communityName, setCommunityName] = useState("");
  const [communityDescription, setCommunityDescription] = useState("");
  const [createLoading, setCreateLoading] = useState(false);
  const handleCreateCommunity = () => {
    if (!communityName || !communityDescription)
      return alert("Please fill all fields.");
    setCreateLoading(true);
    fetch("/api/communities", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: communityName,
        description: communityDescription,
        location,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setCommunities((prev) => [...prev, data.community]);
      })
      .finally(() => {
        setCreateModalVisible(false);
        setCommunityName("");
        setCommunityDescription("");
        setCreateLoading(false);
      });
  };

  const [camera, setCamera] = useState({
    center: location || { lat: 0, lng: 0 },
    zoom: 13,
  });

  const [mapTweenId, setMapTweenId] = useState(0);

  return (
    location && (
      <>
        <main className="h-dvh flex w-screen flex-col bg-black font-sans text-white">
          <Header />

          <div className="flex items-start justify-between p-8 pb-4">
            <div>
              <p className="text-2xl font-medium">Browse nearby communities</p>
              <p className="text-sm text-neutral-400">
                {communities.length} communities found
              </p>
            </div>

            <button
              className="flex cursor-pointer items-center gap-1 rounded-lg bg-emerald-400 px-4 py-3 text-sm font-medium text-black transition-colors hover:bg-emerald-500"
              onClick={() => {
                setCreateModalVisible(true);
              }}
            >
              <Plus size={16} /> Create
            </button>
          </div>

          <div className="grid grow grid-rows-2 sm:grid-cols-2 sm:grid-rows-1">
            <div className="overflow-hidden sm:m-4 sm:rounded-lg">
              <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
                <Map
                  mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID}
                  renderingType="VECTOR"
                  colorScheme="DARK"
                  {...camera}
                  onCameraChanged={(e) => setCamera(e.detail)}
                  disableDefaultUI={true}
                  keyboardShortcuts={false}
                >
                  {communities.map(
                    ({
                      _id,
                      location: communityLocation,
                      name,
                      description,
                    }) => (
                      <CustomMarker
                        key={_id}
                        id={_id}
                        position={communityLocation}
                        name={name}
                        description={description}
                      />
                    ),
                  )}
                </Map>
              </APIProvider>
            </div>

            <div className="mt-4 flex flex-col items-stretch gap-2 overflow-y-auto p-8 pt-4">
              {communities.map(
                ({ _id, name, description, location: communityLocation }) => (
                  <button
                    key={_id}
                    id={`community-${_id}`}
                    className="flex cursor-pointer items-center justify-between rounded-lg border border-neutral-800 bg-neutral-900 p-4 text-left transition-colors hover:border-emerald-500"
                    onClick={() => {
                      router.push(`/community/${_id}`);
                    }}
                    onMouseEnter={() => {
                      document
                        .querySelectorAll("[id^='community-']")
                        .forEach((el) => {
                          el.style.borderColor = "";
                        });

                      const id = mapTweenId;
                      setMapTweenId(mapTweenId + 1);
                      const l = () => {
                        if (mapTweenId - id > 1) return;
                        setCamera((c) => {
                          const cur = c.center;
                          const dx = communityLocation.lat - cur.lat;
                          const dy = communityLocation.lng - cur.lng;
                          const dist = Math.hypot(dx, dy);

                          const dz = 13 - c.zoom;

                          if (dist <= 0.01 && Math.abs(dz) <= 0.01) {
                            return {
                              ...c,
                              center: communityLocation,
                              zoom: 13,
                            };
                          }

                          const t = Math.min(0.25, dist * 0.1); // ease out pos
                          const zt = 0.12; // ease out zoom

                          requestAnimationFrame(l);

                          return {
                            ...c,
                            center: {
                              lat: cur.lat + dx * t,
                              lng: cur.lng + dy * t,
                            },
                            zoom: c.zoom + dz * zt,
                          };
                        });
                      };
                      l();
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
          </div>
        </main>
        <Portal>
          {createModalVisible && (
            <div
              className="fixed bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-black/50 font-sans text-white"
              onClick={() => setCreateModalVisible(false)}
            >
              <div
                className="sm:w-md w-full border border-neutral-700 bg-neutral-900 sm:rounded-lg"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between border-b border-neutral-700 px-4 py-3">
                  <p className="text-lg font-semibold">Create a community</p>
                  <button className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-neutral-800">
                    <X size={20} onClick={() => setCreateModalVisible(false)} />
                  </button>
                </div>

                <div className="flex flex-col gap-1 border-b border-neutral-700 p-4">
                  <p>Community name</p>
                  <input
                    type="text"
                    className="rounded-lg border border-neutral-700 bg-black px-3 py-2 outline-none transition-colors focus:border-emerald-500"
                    placeholder="Enter a name for your community"
                    value={communityName}
                    onChange={(e) => setCommunityName(e.target.value)}
                  />

                  <p className="mt-4">Description</p>
                  <input
                    type="text"
                    className="rounded-lg border border-neutral-700 bg-black px-3 py-2 outline-none transition-colors focus:border-emerald-500"
                    placeholder="What is your community about?"
                    value={communityDescription}
                    onChange={(e) => setCommunityDescription(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 p-4">
                  <button
                    className="btn-secondary px-4 py-2"
                    onClick={() => {
                      setCreateModalVisible(false);
                      setCommunityName("");
                      setCommunityDescription("");
                    }}
                    disabled={createLoading}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn-primary px-4 py-2"
                    onClick={handleCreateCommunity}
                    disabled={createLoading}
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          )}
        </Portal>
      </>
    )
  );
}

const CustomMarker = ({ position, id, name, description }) => {
  const [markerRef, marker] = useAdvancedMarkerRef();

  const [infoWindowShown, setInfoWindowShown] = useState(false);

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={position}
        onMouseEnter={() => setInfoWindowShown(true)}
        onMouseLeave={() => setInfoWindowShown(false)}
        onClick={() => {
          document.querySelectorAll("[id^='community-']").forEach((el) => {
            el.style.borderColor = "";
          });
          const el = document.getElementById(`community-${id}`);
          if (el) {
            el.style.borderColor = "#00bc7d";
            el.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }}
      />

      {infoWindowShown && (
        <InfoWindow
          anchor={marker}
          headerDisabled={true}
          minWidth={200}
          style={{
            color: "#171717",
          }}
        >
          <h2 className="text-lg font-semibold">{name}</h2>
          <p>{description}</p>
        </InfoWindow>
      )}
    </>
  );
};
