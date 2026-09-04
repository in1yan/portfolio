import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import Table from "../Table";
export default function WhoAmI() {
  const tech = [
    ["LANGUAGES", "Python • TypeScript • Go • JavaScript • Java • C/C++"],
    ["FRAMEWORKS", "FastAPI • React • React Native • Next.js • Flask • LangChain"],
    ["DATABASES", "PostgreSQL • MongoDB • Redis • Supabase • SQLAlchemy"],
    ["DEV & CLOUD", "Docker • Linux • Git • GitHub Actions • Azure • uv"],
    ["AI SYSTEMS", "RAG Pipelines • LLM Tool Calling • LangGraph • Agents"],
    ["CONCEPTS", "Microservices • CI/CD • REST APIs • DSA • Cryptography"],
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
    <section id="whoami" className="whoami relative w-full overflow-hidden">
      <div className="h-screen">
        <div className="whoami-container flex flex-col h-full w-full px-6 sm:px-12 md:pl-10">
          {/*subtitle*/}
          <div className="mt-16 sm:mt-20">
            <p className="uppercase text-secondary text-sm md:pl-10 font-mono">
              / Who Am I / 003
            </p>
          </div>
          {/*Large headings*/}
          <div className="ml-0 sm:ml-6 md:ml-28 mt-6 sm:mt-10">
            <p className="text-xs tracking-[0.3em] sm:tracking-[0.5em] uppercase text-secondary">
              THE CODE
            </p>

            <h1
              ref={titleRef}
              className="mt-4 sm:mt-10 text-5xl sm:text-7xl md:text-[7rem] leading-[0.9] font-black uppercase"
            >
              <div className="overflow-hidden">
                <span className="block">WHAT</span>
              </div>

              <div className="overflow-hidden">
                <span className="block">I BUILD</span>
              </div>
            </h1>
            <div ref={tableRef} className="ml-0 sm:ml-4 md:ml-20 mt-6 sm:mt-10 w-full max-w-[650px] pr-4 sm:pr-0">
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
