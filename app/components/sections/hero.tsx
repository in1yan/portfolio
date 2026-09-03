import Image from "next/image";
import RetroButton from "../RetroButton";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { TextPlugin } from "gsap/TextPlugin";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(TextPlugin);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
      });

      tl.to(".name", {
        text: {
          value: "in1y4n",
          delimiter: "",
        },
        duration: 1.2,
      })
        .to({}, { duration:  1})
        .to(".name", {
          text: {
            value: "",
            delimiter: "",
          },
          duration: 0.6,
        })
        .to({}, { duration: 0.2 })
        .to(".name", {
          text: {
            value: "Iniyan",
            delimiter: "",
          },
          duration: 1.2,
        });

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
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full flex items-end justify-start px-8 md:px-20 pb-16 md:pb-24 overflow-hidden"
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
          <div className="flex items-center gap-5 min-h-[120px]">
            <p className="name text-8xl md:text-9xl font-pixel-grid">in1y4n</p>
            <div className="block-cursor w-8 md:w-10 h-20 md:h-28 bg-secondary mt-0"></div>
          </div>
          <p className="role text-secondary pt-8 text-xl md:text-2xl font-bold font-pixel-line">
            ./ FULL STACK DEVELOPER & AI SYSTEMS : )
          </p>
          <p className="bio text-gray-200 pt-6 text-lg md:text-xl max-w-2xl">
            I build systems software, AI applications, and experimental tools.
          </p>
          <div className="proj-button pointer-events-auto flex items-center gap-6">
            <RetroButton Label="VIEW PROJECTS" href="#projects" />
            <RetroButton Label="VIEW RESUME" href="/_resume.pdf" target="_blank" />
          </div>
        </div>
      </div>
    </section>
  );
}
