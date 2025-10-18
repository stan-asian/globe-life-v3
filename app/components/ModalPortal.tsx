"use client";
import { useEffect, useState, ReactNode } from "react";
import { createPortal } from "react-dom";

export default function ModalPortal({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // <-- Prevents SSR mismatch

  return createPortal(children, document.body);
}
