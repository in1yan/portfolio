
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import Table from "../Table";
export default function Accomplishments() {
  const tech = [
    ["PRODUCTS", "Launched multiple production apps used by thousands"],
    ["OPEN SOURCE", "Authored and contributed to several OSS libraries"],
    ["SPEAKING", "Presented talks and workshops at industry events"],
    ["LEADERSHIP", "Led cross-functional teams to deliver measurable impact"],
    ["PATENTS", "Filed patents related to sync and rendering optimizations"],
    ["EDUCATION", "M.S. Computer Science — relevant coursework"],
  ];
  const titleRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".acc",
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
    <section className="acc relative ">
      <div className="h-screen">
        <div className="acc-container flex flex-col h-full w-full pr-10 items-end">
          {/*subtitle*/}
          <div className="mt-20 w-full">
            <p className="uppercase text-secondary text-sm pr-10 font-mono text-right">
              / Accomplishments / 004
            </p>
          </div>
          {/*Large headings*/}
          <div className="mr-28 mt-10 w-full">
            <p className="text-xs tracking-[0.5em] uppercase text-secondary pr-10 text-right">
              HIGHLIGHTS
            </p>

            <h1
              ref={titleRef}
              className="mt-10 text-[7rem] leading-[0.9] font-black uppercase text-right"
            >
              <div className="overflow-hidden">
                <span className="block">WHAT</span>
              </div>

              <div className="overflow-hidden">
                <span className="block">I'VE DONE</span>
              </div>
            </h1>
            <div ref={tableRef} className="ml-250 mt-10 w-[700px]">
              {tech.map(([title, value]) => (
                <Table key={title} title={title} value={value} />
              ))}
            </div>xt-right8
          </div>
        </div>
      </div>
      
    </section>
  );
}
