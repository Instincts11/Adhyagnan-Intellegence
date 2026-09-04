"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ExoplanetSearchPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/exploration-path");
  }, [router]);
  return null;
}
