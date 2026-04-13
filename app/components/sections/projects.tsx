import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import Project from "../project";
export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo(
      ".projects-image",
      {
        rotate: 10,
        scale: 1.2,
      },
      {
        scrollTrigger: {
          trigger: ".projects-image",
          start: "top bottom-=100",
          end: "center top",
          scrub: true,
        },
        rotate: 0,
        scale: 1,
      },
    );
    const getScrollAmount = () => {
      if (!containerRef.current) return 0;
      const containerWidth = containerRef.current.scrollWidth;
      return -(containerWidth - window.innerWidth);
    };

    gsap.to(containerRef.current, {
      x: getScrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: ".projects",
        start: "top top",
        end: () => `+=${getScrollAmount() * -1}`,
        scrub: 1.6,
        pin: true,
        invalidateOnRefresh: true,
      },
    });
  }, []);
  return (
    <section className="projects relative ">
      <div className="h-screen">
        <div
          ref={containerRef}
          className="projects-container flex h-full w-max"
        >
          <div className="projects-image relative w-screen shrink-0">
            <Image
              src="/demo.png"
              alt="demo"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <Project />
          <Project />
          <Project />
        </div>
      </div>
    </section>
  );
}
