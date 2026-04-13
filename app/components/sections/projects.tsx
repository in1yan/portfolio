import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
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

    const panelsCount = containerRef.current?.children.length || 3;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".projects",
        start: "top top",
        end: () => `+=${window.innerWidth * panelsCount}`, // Extend scroll distance to account for pauses
        scrub: 1,
        pin: true,
        invalidateOnRefresh: true,
        snap: {
          snapTo: "labels", // Snap exactly to our defined pauses
          duration: 0.5,
          ease: "power1.inOut",
        },
      },
    });

    // Add an initial label and pause so the first image stays pinned for a bit
    tl.addLabel("panel-0");
    tl.to({}, { duration: 0.5 });

    // Loop through the rest of the panels
    for (let i = 0; i < panelsCount - 1; i++) {
      tl.to(containerRef.current, {
        x: () => -(window.innerWidth * (i + 1)),
        ease: "none",
        duration: 1, // Moving takes twice as long as pausing (1 vs 0.5)
      });
      // Add a label for snapping, and a pause (empty tween) before the next move
      tl.addLabel(`panel-${i + 1}`);
      tl.to({}, { duration: 0.5 });
    }
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

          <div className="panel relative w-screen shrink-0">
            <Image
              src="/demo.png"
              alt="demo"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>

          <div className="panel relative w-screen shrink-0">
            <Image
              src="/demo.png"
              alt="demo"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
