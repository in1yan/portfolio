
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import Table from "../Table";
export default function Accomplishments() {
  const tech = [
    [
      "SIH '25 WINNER",
      "IoT cotton-picking machine — Selected top team of 100k+ across India",
    ],
    [
      "DEVFEST WINNER",
      "Shipped 3 full-featured React Native apps within a 24-hour sprint",
    ],
    [
      "CTF RUNNER-UP",
      "Placed 10th of 50+ teams in Root@localhost CTF (Web & Cryptography)",
    ],
    [
      "IIT TIRUPATI",
      "Intern @ Navavishkar I-Hub GNSS Division (LoRa mesh protocols R&D)",
    ],
    [
      "DEVS SOCIETY",
      "Technical Member — Co-led private OTT platform for 1000+ students",
    ],
    [
      "EDUCATION",
      "B.E. Computer Science @ REC (Expected 2028, CGPA: 8.15)",
    ],
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
    <section id="accomplishments" className="acc relative w-full overflow-hidden">
      <div className="h-screen">
        <div className="acc-container flex flex-col h-full w-full px-6 sm:px-12 md:pr-10 items-end">
          {/*subtitle*/}
          <div className="mt-16 sm:mt-20 w-full">
            <p className="uppercase text-secondary text-sm md:pr-10 font-mono text-right">
              / Accomplishments / 004
            </p>
          </div>
          {/*Large headings*/}
          <div className="mr-0 sm:mr-6 md:mr-28 mt-6 sm:mt-10 w-full flex flex-col items-end">
            <p className="text-xs tracking-[0.3em] sm:tracking-[0.5em] uppercase text-secondary md:pr-10 text-right">
              HIGHLIGHTS
            </p>

            <h1
              ref={titleRef}
              className="mt-4 sm:mt-10 text-5xl sm:text-7xl md:text-[7rem] leading-[0.9] font-black uppercase text-right"
            >
              <div className="overflow-hidden">
                <span className="block">WHAT</span>
              </div>

              <div className="overflow-hidden">
                <span className="block">I&apos;VE DONE</span>
              </div>
            </h1>
            <div ref={tableRef} className="mt-6 sm:mt-10 w-full max-w-[850px] mr-0 md:mr-10 lg:mr-20 pl-4 sm:pl-0">
              {tech.map(([title, value]) => (
                <Table key={title} title={title} value={value} align="left" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
