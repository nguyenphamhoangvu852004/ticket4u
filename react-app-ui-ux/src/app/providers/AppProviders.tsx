import React from "react";
import { BrowserRouter } from "react-router-dom";

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <BrowserRouter>
      {children}
    </BrowserRouter>
  );
}
