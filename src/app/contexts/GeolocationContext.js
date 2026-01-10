import { createContext } from "react";

export const GeolocationContext = createContext({
  location: null,
  error: null,
  loading: false,
  requestLocation: () => {},
  setMockLocation: () => {},
});
