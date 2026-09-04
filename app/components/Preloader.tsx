"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterTextRef = useRef<HTMLParagraphElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const centerBoxRef = useRef<HTMLDivElement>(null);
  const bottomSectionRef = useRef<HTMLDivElement>(null);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Disable scroll while preloader is active
    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const counterObj = { value: 0 };
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "";
          setIsDone(true);
          onComplete?.();
        },
      });

      // 1. Count up to 100 and fill progress bar
      tl.to(
        counterObj,
        {
          value: 100,
          duration: 2.0,
          ease: "power2.inOut",
          onUpdate: () => {
            if (counterTextRef.current) {
              const val = Math.floor(counterObj.value);
              counterTextRef.current.textContent =
                val === 100 ? "100" : String(val).padStart(2, "0");
              const scale = 1 + (counterObj.value / 100) * 0.2;

              gsap.set(counterTextRef.current, {
                scale,
              });
            }
          },
        },
        0
      );

      tl.to(
        progressFillRef.current,
        {
          scaleX: 1,
          duration: 2.0,
          ease: "power2.inOut",
        },
        0
      );

      // 2. Hide counter and progress bar
      tl.to(
        bottomSectionRef.current,
        {
          opacity: 0,
          y: 30,
          duration: 0.4,
          ease: "power2.in",
        },
        "+=0.1"
      );

      // 3. Reveal center preview box
      tl.fromTo(
        centerBoxRef.current,
        {
          opacity: 0,
          scale: 0.8,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.1"
      );

      // Small pause to enjoy the center preview
      tl.to({}, { duration: 0.3 });

      // 4. Expand center box to full screen
      tl.to(centerBoxRef.current, {
        width: "100vw",
        height: "100vh",
        borderRadius: "0px",
        duration: 0.9,
        ease: "power4.inOut",
      });

      // 5. Fade out preloader overlay to reveal underlying hero & page
      tl.to(
        containerRef.current,
        {
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.3"
      );
    }, containerRef);

    return () => {
      document.body.style.overflow = "";
      ctx.revert();
    };
  }, [onComplete]);

  if (isDone) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] bg-[#0c0c0b] text-white flex flex-col justify-between p-8 md:p-16 overflow-hidden select-none pointer-events-auto"
    >
      {/* Center expanding card */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div
          ref={centerBoxRef}
          className="relative w-[300px] h-[190px] sm:w-[420px] sm:h-[260px] md:w-[540px] md:h-[340px] overflow-hidden opacity-0 shadow-2xl border border-white/10"
        >
          <Image
            src="/bg.png"
            alt="Preview"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-linear-to-b from-[#0c0c0b]/40 via-transparent to-[#0c0c0b]/60" />
        </div>
      </div>

      {/* Top Bar Label */}
      <div className="relative z-20 flex justify-between items-center text-xs font-mono uppercase tracking-widest text-gray-400">
        <span className="text-secondary font-bold">&gt; touch portfolio.txt</span>
      </div>

      {/* Bottom Counter and Progress */}
      <div ref={bottomSectionRef} className="relative z-20 flex flex-col gap-6">
        <div className="flex items-baseline">
          <p
            ref={counterTextRef}
            className="text-[20vw] sm:text-[18vw] md:text-[15vw] font-pixel-grid font-bold leading-none tracking-tighter"
          >
            00
          </p>
        </div>

        {/* Progress Bar Line */}
        <div className="w-full h-[2px] bg-white/10 relative overflow-hidden">
          <div
            ref={progressFillRef}
            className="absolute inset-0 bg-secondary origin-left scale-x-0 shadow-[0_0_12px_#ff3b3b]"
          />
        </div>
      </div>
    </div>
  );
}
