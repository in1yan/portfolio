"use client";

import Image from "next/image";
import RetroButton from "../RetroButton";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { TextPlugin } from "gsap/TextPlugin";

interface HeroProps {
  isLoaded?: boolean;
}

export default function Hero({ isLoaded = true }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(TextPlugin);

    if (!isLoaded) {
      gsap.set([".hero-name-wrap", ".role", ".bio", ".proj-button"], {
        y: 35,
        opacity: 0,
      });
      gsap.set(".name", { text: "" });
      return;
    }

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([".hero-name-wrap", ".role", ".bio", ".proj-button"], {
        y: 35,
        opacity: 0,
      });
      gsap.set(".name", { text: "" });

      // Cursor blinking animation
      gsap.fromTo(
        ".block-cursor",
        {
          opacity: 1,
        },
        {
          opacity: 0,
          repeat: -1,
          duration: 0.35,
          yoyo: true,
          ease: "power2.inOut",
        }
      );

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      // Stagger reveal hero text content elements
      tl.to(".hero-name-wrap", {
        y: 0,
        opacity: 1,
        duration: 0.8,
      })
        .to(
          ".name",
          {
            text: {
              value: "in1y4n",
              delimiter: "",
            },
            duration: 1.0,
            ease: "none",
          },
          "-=0.4"
        )
        .to(
          ".role",
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
          },
          "-=0.6"
        )
        .to(
          ".bio",
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
          },
          "-=0.4"
        )
        .to(
          ".proj-button",
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
          },
          "-=0.4"
        )
        .to({}, { duration: 0.8 })
        .to(".name", {
          text: {
            value: "",
            delimiter: "",
          },
          duration: 0.5,
          ease: "none",
        })
        .to({}, { duration: 0.2 })
        .to(".name", {
          text: {
            value: "Iniyan",
            delimiter: "",
          },
          duration: 1.0,
          ease: "none",
        });
    }, containerRef);

    return () => ctx.revert();
  }, [isLoaded]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full flex items-end justify-start px-6 sm:px-10 md:px-20 pb-12 sm:pb-16 md:pb-24 overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="/bg.png"
          alt="Hero Background"
          fill
          priority
          className="object-cover object-center pointer-events-none select-none opacity-40"
        />
        <div className="absolute inset-0 bg-linear-to-b from-[#0c0c0b]/50 via-transparent to-[#0c0c0b] pointer-events-none" />
      </div>

      <div className="relative z-10 w-full max-w-6xl pointer-events-none">
        <div className="flex flex-col items-start">
          <div className="hero-name-wrap flex items-center gap-3 sm:gap-5 min-h-[70px] sm:min-h-[100px] md:min-h-[120px] opacity-0">
            <p className="name text-5xl sm:text-7xl md:text-9xl font-pixel-grid"></p>
            <div className="block-cursor w-5 sm:w-8 md:w-10 h-12 sm:h-20 md:h-28 bg-secondary mt-0"></div>
          </div>
          <p className="role text-secondary pt-4 sm:pt-8 text-sm sm:text-xl md:text-2xl font-bold font-pixel-line opacity-0">
            ./ FULL STACK DEVELOPER & AI SYSTEMS : )
          </p>
          <p className="bio text-gray-200 pt-3 sm:pt-6 text-sm sm:text-lg md:text-xl max-w-2xl opacity-0">
            I build systems software, AI applications, and experimental tools.
          </p>
          <div className="proj-button pointer-events-auto flex flex-wrap items-center gap-4 sm:gap-6 opacity-0">
            <RetroButton Label="VIEW PROJECTS" href="#projects" />
            <RetroButton Label="VIEW RESUME" href="/_resume.pdf" target="_blank" />
          </div>
        </div>
      </div>
    </section>
  );
}
