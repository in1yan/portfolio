import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
export default function Projects() {
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
    gsap.to(".projects-container", {
      xPercent: -200,
      ease: "none",
      scrollTrigger: {
        trigger: ".projects",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        pin: true,
        markers: true,
      },
    });
  }, []);
  return (
    <section className="projects relative h-[300vh]">
      <div className="sticky top-0 h-screen">
        <div className="projects-container flex h-full w-[300vw]">
          <div className="projects-image relative w-screen">
            <Image
              src="/demo.png"
              alt="demo"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>

          <div className="panel relative w-screen">
            <Image
              src="/demo.png"
              alt="demo"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>

          <div className="panel relative w-screen">
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
