"use client";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Hero from "./components/sections/hero";
import { useEffect, useRef } from "react";
import Projects from "./components/sections/projects";
import WhoAmI from "./components/sections/whoami";
import Manifesto from "./components/sections/manifesto";
import Accomplishments from "./components/sections/accomplishments";
export default function Home() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  const xTo = useRef<((value: number) => void) | undefined>(undefined);
  const yTo = useRef<((value: number) => void) | undefined>(undefined);

  const xDotTo = useRef<((value: number) => void) | undefined>(undefined);
  const yDotTo = useRef<((value: number) => void) | undefined>(undefined);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2,
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => lenis.raf(1000 * time));
    gsap.ticker.lagSmoothing(0);

    gsap.to(".progress-bar", {
      scaleX: 1,
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });
    xTo.current = gsap.quickTo(cursorRef.current, "x", {
      duration: 0.4,
      ease: "power3",
    });
    yTo.current = gsap.quickTo(cursorRef.current, "y", {
      duration: 0.4,
      ease: "power3",
    });

    xDotTo.current = gsap.quickTo(dotRef.current, "x", {
      duration: 0.3,
      ease: "power3",
    });

    yDotTo.current = gsap.quickTo(dotRef.current, "y", {
      duration: 0.3,
      ease: "power3",
    });

    const handleMouseMove = (e: MouseEvent) => {
      xTo.current?.(e.clientX);
      yTo.current?.(e.clientY);

      xDotTo.current?.(e.clientX);
      yDotTo.current?.(e.clientY);
    };

    const handleMouseDown = () => {
      gsap.to(cursorRef.current, {
        scale: 0.7,
        duration: 0.2,
      });
    };

    const handleMouseUp = () => {
      gsap.to(cursorRef.current, {
        scale: 1,
        duration: 0.2,
      });
    };

    const handleHover = () => {
      gsap.to(cursorRef.current, {
        scale: 1.5,
        duration: 0.3,
        borderColor: "white",
      });
    };

    const handleLeave = () => {
      gsap.to(cursorRef.current, {
        scale: 1,
        duration: 0.3,
        borderColor: "#ff3b3b",
      });
    };

    document.querySelectorAll("a, button, .name").forEach((el) => {
      el.addEventListener("mouseenter", handleHover);
      el.addEventListener("mouseleave", handleLeave);
    });

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      lenis.destroy();

      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);

      document.querySelectorAll("a, button").forEach((el) => {
        el.removeEventListener("mouseenter", handleHover);
        el.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, []);

  return (
    <div className="w-full relative bg-[#0c0c0b] text-white overflow-x-hidden">
      <div
        ref={cursorRef}
        className="hidden md:block fixed w-10 h-10 bg-transparent rounded-full pointer-events-none border-2 border-secondary z-9998 -translate-x-1/2 -translate-y-1/2"
      />

      <div
        ref={dotRef}
        className="hidden md:block fixed w-2 h-2 bg-secondary rounded-full pointer-events-none z-9999 -translate-x-1/2 -translate-y-1/2"
      />

      <section className="min-h-screen flex items-center justify-center px-6 md:px-16">
        <Hero />
      </section>
      <Manifesto />
      <WhoAmI />
      <Accomplishments />
      <div className="h-90">
        <p className="uppercase text-secondary text-sm pl-10 font-mono pt-50">
          / Stuff I Built / 005
        </p>
      </div>
      <Projects />
    </div>
  );
}
