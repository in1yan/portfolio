"use client";
import Image from "next/image";
import gsap from "gsap";
import { useEffect } from "react";
import RetroButton from "./components/RetroButton";
export default function Home() {
  useEffect(() => {
    gsap.fromTo(
      ".cursor",
      {
        opacity: 1,
      },
      {
        opacity: 0,
        repeat: -1,
        duration: 0.6,
        yoyo: true,
        ease: "power2.inOut",
      },
    );
  }, []);
  return (
    <div className=" bg-[#0c0c0b] text-white px-6 md:px-16 py-10 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 items-center justify-items-center gap-5">
          <div className="flex flex-col">
            <div className="flex items-center  gap-5">
              <p className="text-9xl font-pixel-grid">Iniyan</p>
              <div className="cursor w-10 h-25 bg-secondary -mt-5"></div>
            </div>
            <p className="text-secondary text-2xl font-bold font-pixel-line">
              ./ FULL STACK DEVELOPER : )
            </p>
            <p className="text-gray-200 pt-10 text-xl">
              I build systems software, AI applications, and experimental tools.
            </p>
            <RetroButton Label="VIEW PROJECTS" />
          </div>
        </div>
      </div>
    </div>
  );
}
