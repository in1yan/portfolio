import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import Table from "../Table";
export default function WhoAmI() {
  const tech = [
    ["LANGS", "TypeScript • Swift • Kotlin"],
    ["FRONT", "React • Next.js • React Native"],
    ["BACK", "Node.js • Express • tRPC"],
    ["DATA", "MongoDB • PostgreSQL • Redis"],
    ["TOOLS", "Figma • GSAP • Three.js"],
    ["DEPLOY", "Vercel • AWS • Docker"],
  ];
  const titleRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".whoami",
        start: "top top",
        end: "+=1500",
        scrub: true,
        pin: true,
      },
    });
    gsap.set(titleRef.current!.querySelectorAll("span"), {
      yPercent: 0,
      opacity: 0,
    });

    gsap.set(tableRef.current!.querySelectorAll(".row"), {
      y: 40,
      opacity: 0,
    });
    tl.to(titleRef.current!.querySelectorAll("span"), {
      yPercent: 0,
      stagger: 1,
      opacity: 1,
      duration: 2,
      ease: "power3.out",
    });
    tl.to(tableRef.current!.querySelectorAll(".row"), {
      y: 0,
      opacity: 1,
      stagger: 1,
      duration: 1,
      ease: "power2.out",
    });
  }, []);
  return (
    <section className="whoami relative ">
      <div className="h-screen">
        <div className="whoami-container flex flex-col h-full w-full pl-10">
          {/*subtitle*/}
          <div className="mt-20">
            <p className="uppercase text-secondary text-sm pl-10 font-mono">
              / Who Am I / 003
            </p>
          </div>
          {/*Large headings*/}
          <div className="ml-28 mt-20">
            <p className="text-xs tracking-[0.5em] uppercase text-secondary">
              THE CODE
            </p>

            <h1
              ref={titleRef}
              className="mt-10 text-[7rem] leading-[0.9] font-black uppercase"
            >
              <div className="overflow-hidden">
                <span className="block">WHAT</span>
              </div>

              <div className="overflow-hidden">
                <span className="block">I BUILD</span>
              </div>
            </h1>
            <div ref={tableRef} className="ml-20 mt-10 w-[650px]">
              {tech.map(([title, value]) => (
                <Table key={title} title={title} value={value} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
