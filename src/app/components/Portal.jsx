"use client";

import { createPortal } from "react-dom";

export const Portal = ({ children }) => {
  return (
    typeof document !== "undefined" && createPortal(children, document.body)
  );
};
