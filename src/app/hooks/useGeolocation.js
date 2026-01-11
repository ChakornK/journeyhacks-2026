import { useState, useCallback, useEffect } from "react";

const KEY = "geo-cache";

export const useGeolocation = () => {
  const [state, setState] = useState({
    location: null,
    error: null,
    loading: false,
  });

  // useEffect(() => {
  //   const cached = localStorage.getItem(KEY);
  //   if (cached) {
  //     setState({
  //       location: JSON.parse(cached),
  //       error: null,
  //       loading: false,
  //     });
  //   }
  // }, []);

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setState({
        location: null,
        error: "geolocation not supported",
        loading: false,
      });
      return;
    }

    const cached = localStorage.getItem(KEY);
    if (cached) {
      setState({
        location: JSON.parse(cached),
        error: null,
        loading: false,
      });
    }

    setState((s) => ({ ...s, loading: true, error: null }));

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const location = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };

        localStorage.setItem(KEY, JSON.stringify(location));

        setState({
          location,
          error: null,
          loading: false,
        });
      },
      (err) => {
        setState({
          location: null,
          error: "location failed",
          loading: false,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      },
    );
  }, []);

  return { ...state, requestLocation };
};
