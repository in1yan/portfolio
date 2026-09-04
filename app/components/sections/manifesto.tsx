import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
export default function Manifesto() {
  const maniRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.set(maniRef.current!.querySelectorAll("span"), {
      opacity: 0.1,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".manifesto",
        start: "top top",
        end: "+=150%",
        scrub: true,
        pin: true,
      },
    });

    tl.to(".build", { opacity: 1, duration: 0.001 })
      .to(".break", { opacity: 1, duration: 0.001 })
      .to(".repeat", { opacity: 1, duration: 0.001 });
  }, []);
  return (
    <section className="manifesto relative w-full overflow-hidden">
      <div className="h-screen">
        <div className="manifesto-container flex flex-col h-full w-full px-6 sm:px-10 md:px-14">
          {/*subtitle*/}
          <div className="mt-16 sm:mt-20">
            <p className="uppercase text-secondary text-sm md:pl-10 font-mono">
              / Manifesto / 002
            </p>
          </div>

          <div
            className="flex flex-1 items-center justify-center px-4"
            ref={maniRef}
          >
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] leading-[0.9] font-black uppercase text-center">
              <div className="overflow-hidden">
                <span className="build block">BUILD</span>
              </div>

              <div className="overflow-hidden">
                <span className="break block">BREAK</span>
              </div>
              <div className="overflow-hidden">
                <span className="repeat block">REPEAT</span>
              </div>
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
