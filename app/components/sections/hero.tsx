import RetroButton from "../RetroButton";
import gsap from "gsap";
import { useEffect } from "react";
import TextPlugin from "gsap/TextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
export default function Hero() {
  useEffect(() => {
    gsap.registerPlugin(TextPlugin);
    gsap.registerPlugin(ScrollTrigger);
    const tl = gsap.timeline();
    tl.to(".name", {
      text: {
        value: "in1y4n",
        delimiter: "",
      },
      duration: 1,
    })
      .to({}, { duration: 1 })
      .to(".name", {
        text: {
          value: "",
          delimiter: "",
        },
      })
      .to(".name", {
        text: {
          value: "Iniyan",
          delimiter: "",
        },
        duration: 1,
      });
    gsap.fromTo(
      ".block-cursor",
      {
        opacity: 1,
      },
      {
        opacity: 0,
        repeat: -1,
        duration: 0.3,
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
              <p className="name text-9xl font-pixel-grid"></p>
              <div className="block-cursor w-10 h-30 bg-secondary mt-0"></div>
            </div>
            <p className="role text-secondary pt-10 text-2xl font-bold font-pixel-line">
              ./ FULL STACK DEVELOPER & AI SYSTEMS : )
            </p>
            <p className="bio text-gray-200 pt-10 text-xl">
              I build systems software, AI applications, and experimental tools.
            </p>
            <div className="proj-button pointer-events-auto mt-5 flex items-center gap-6">
              <RetroButton Label="VIEW PROJECTS" href="#projects" />
              <RetroButton Label="VIEW RESUME" href="/_resume.pdf" target="_blank" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
