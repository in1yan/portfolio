"use client";
import Hero from "./components/sections/hero";

export default function Home() {
  return (
    <div className="w-full relative bg-[#0c0c0b] text-white px-6 md:px-16 py-10 min-h-screen flex items-center justify-center overflow-hidden">
      <Hero />
    </div>
  );
}
