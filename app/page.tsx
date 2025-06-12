// app/page.tsx
"use client";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded) {
      router.push(isSignedIn ? "/dashboard" : "/sign-in");
    }
  }, [isSignedIn, isLoaded]);

  return null; // Or show a loading spinner
}
