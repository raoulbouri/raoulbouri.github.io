"use client";

import { useEffect } from "react";

export function RedirectNow({ to }: { to: string }) {
  useEffect(() => {
    window.location.replace(to);
  }, [to]);
  return null;
}
