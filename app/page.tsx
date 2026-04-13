"use client";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Hero from "./components/sections/hero";
import { useEffect } from "react";
import Projects from "./components/sections/projects";

export default function Home() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({
      duration: 1.2,
    });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(1000 * time));
    gsap.ticker.lagSmoothing(0);
  }, []);
  return (
    <div className="w-full relative bg-[#0c0c0b] text-white overflow-x-hidden">
      <section className="min-h-screen flex items-center justify-center px-6 md:px-16">
        <Hero />
      </section>
      <div className="h-60"></div>
      <Projects />
    </div>
  );
}
