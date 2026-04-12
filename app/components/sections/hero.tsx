import RetroButton from "../RetroButton";
import gsap from "gsap";
import { useEffect } from "react";
import ScrambleTextPlugin from "gsap/ScrambleTextPlugin";
import Dither from "@/components/Dither";
export default function Hero() {
  useEffect(() => {
    gsap.registerPlugin(ScrambleTextPlugin);
    const tl = gsap.timeline();
    tl.to(".name", {
      duration: 4,
      scrambleText: "Iniyan",
    });
    tl.fromTo(
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
    <section>
      {/*<div className="absolute inset-0 opacity-30">
      <Dither
        waveColor={[1, 1, 1]}
        disableAnimation={false}
        enableMouseInteraction={true}
        mouseRadius={0.5}
        colorNum={5}
        pixelSize={7}
        waveAmplitude={0}
        waveFrequency={1}
        waveSpeed={0.01}
      />
    </div>*/}

      <div className="relative z-10 w-full max-w-7xl mx-auto pointer-events-none">
        <div className="grid md:grid-cols-2 items-center justify-items-center gap-5">
          <div className="flex flex-col">
            <div className="flex items-center  gap-5">
              <p className="name text-9xl font-pixel-grid">in1y4n</p>
              {/*block cursor*/}
              <div className="cursor w-10 h-30 bg-secondary mt-0"></div>
            </div>
            <p className="text-secondary text-2xl font-bold font-pixel-line">
              ./ FULL STACK DEVELOPER : )
            </p>
            <p className="text-gray-200 pt-10 text-xl">
              I build systems software, AI applications, and experimental tools.
            </p>
            <div className="pointer-events-auto mt-5">
              <RetroButton Label="VIEW PROJECTS" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
