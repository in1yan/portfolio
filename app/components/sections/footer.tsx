"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import ScrambleImage from "../ScrambleImage";
import RetroButton from "../RetroButton";

export default function Footer() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftHandRef = useRef<HTMLDivElement>(null);
  const rightHandRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Set initial positions: hands retracted to their respective sides
      gsap.set(leftHandRef.current, { xPercent: -50, opacity: 0.7 });
      gsap.set(rightHandRef.current, { xPercent: 50, opacity: 0.7 });
      gsap.set(contentRef.current, { opacity: 0, y: 40 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=150%",
          scrub: 1.2,
          pin: true,
        },
      });

      // Left hand slides in towards center
      tl.to(
        leftHandRef.current,
        {
          xPercent: -40,
          opacity: 1,
          ease: "power2.out",
        },
        0
      );

      // Right hand slides in towards center
      tl.to(
        rightHandRef.current,
        {
          xPercent: 40,
          opacity: 1,
          ease: "power2.out",
        },
        0
      );

      // Contact text and buttons reveal as hands come close
      tl.to(
        contentRef.current,
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
        },
        0.2
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="footer contact-section relative w-full bg-[#0c0c0b] text-white overflow-hidden"
    >
      <div className="h-screen w-full relative flex flex-col justify-between p-6 sm:p-10 md:p-14 select-none">
        {/* Top subtitle header */}
        <div className="relative z-30 flex justify-between items-center text-xs font-mono uppercase tracking-widest text-gray-400">
          <p className="text-secondary font-mono uppercase text-sm">
            / tail portfolio.txt / contact / 006
          </p>
        </div>

        {/* Center Hands: Creation of Adam animation */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-auto overflow-hidden z-10">
          <div className="relative w-full max-w-7xl h-[65vh] sm:h-[75vh] md:h-[85vh] flex items-center justify-center">
            {/* Left Hand */}
            <div
              ref={leftHandRef}
              className="w-1/2 h-full relative overflow-hidden will-change-transform"
            >
              <ScrambleImage
                imageSrc="/contact-left.png"
                altText="Adam's Creation - Left Hand"
                className="relative w-full h-full overflow-hidden"
                imageClassName="object-contain object-right grayscale-20 select-none"
                sizes="50vw"
              />
            </div>

            {/* Right Hand */}
            <div
              ref={rightHandRef}
              className="w-1/2 h-full relative overflow-hidden will-change-transform"
            >
              <ScrambleImage
                imageSrc="/contact-right.png"
                altText="Adam's Creation - Right Hand"
                className="relative w-full h-full overflow-hidden"
                imageClassName="object-contain object-left grayscale-20 select-none"
                sizes="50vw"
              />
            </div>
          </div>
        </div>

        {/* Foreground Content: Title & Interactive Links */}
        <div
          ref={contentRef}
          className="relative z-30 flex flex-col items-center justify-center my-auto pointer-events-none"
        >
          <h2 className="text-4xl sm:text-6xl md:text-8xl font-black uppercase font-pixel-grid tracking-tight mix-blend-difference text-center text-white">
            LET&apos;S CREATE
          </h2>

          {/* Social / Action buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-4 pointer-events-auto">
            <RetroButton Label="GITHUB" href="https://github.com/in1yan" target="_blank" />
            <RetroButton Label="LINKEDIN" href="https://linkedin.com/in/in1y4n" target="_blank" />
            <RetroButton Label="MAIL" href="mailto:viniyan563@gmail.com" target="_blank" />
            <RetroButton Label="RESUME" href="/_resume.pdf" target="_blank" />
          </div>
        </div>

        {/* Bottom Status Bar */}
        <div className="relative z-30 flex justify-between items-center text-xs font-mono uppercase tracking-widest text-gray-500 pt-4 border-t border-white/10">
          <span>© 2026 INIYAN — END OF FILE</span>
        </div>
      </div>
    </section>
  );
}
