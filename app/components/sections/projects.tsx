import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import Project from "../project";

const project_data = [
  {
    title: "KICK",
    subtitle: "Autonomous Coding Agent (CLI)",
    description: (
      <>
        Lightweight autonomous coding agent built with Pydantic AI. Features LLM
        file-system tool calling (read, write, edit, ls, grep, glob, bash execution),
        multi-provider model support (Gemini, Groq), and packaged as an installable CLI (`uv tool install kick-agent`).
      </>
    ),
    imageSrc: "/demo.png",
    tags: ["Python", "Pydantic AI", "LLM APIs", "CLI", "uv"],
    githubUrl: "https://github.com/in1yan/kick",
    projectUrl: "https://github.com/in1yan/kick",
  },
  {
    title: "DEVS OTT",
    subtitle: "Private Video Streaming Platform",
    description: (
      <>
        Full-stack private video streaming platform for 1000+ college students hosting 20+ original short films.
        Engineered RESTful API endpoints, OAuth 2.0 authentication, and a responsive React frontend with adaptive playback.
      </>
    ),
    imageSrc: "/melouz.png",
    tags: ["FastAPI", "React", "MongoDB", "Beanie", "OAuth 2.0"],
    githubUrl: "https://github.com/in1yan",
    projectUrl: "https://github.com/in1yan",
  },
  {
    title: "HOP",
    subtitle: "Keyboard-Driven Window Switcher",
    description: (
      <>
        Lightweight Windows productivity utility enabling instant app switching in under 100 ms using global keyboard shortcuts,
        visual hint overlays, acrylic blur UI, and background idle memory under 70 MB RAM.
      </>
    ),
    imageSrc: "/ph.png",
    tags: ["Go", "Wails", "React", "Windows API"],
    githubUrl: "https://github.com/in1yan/hop",
    projectUrl: "https://github.com/in1yan/hop",
  },
  {
    title: "VENDOR HUB",
    subtitle: "Food Stall & Inventory Management",
    description: (
      <>
        Backend-heavy operational management platform tracking 30+ vendors, stalls, and inventory records for university workflows.
        Authored scalable REST APIs and relational schemas covering vendor onboarding, stock management, and reporting.
      </>
    ),
    imageSrc: "/demo.png",
    tags: ["FastAPI", "React", "PostgreSQL", "Supabase"],
    githubUrl: "https://github.com/in1yan",
    projectUrl: "https://github.com/in1yan",
  },
  {
    title: "RED WHEELS",
    subtitle: "Cross-Platform Comics Reader",
    description: (
      <>
        Cross-platform mobile application for free web-comics browsing with access to 100+ chapters across multiple titles via a custom REST API backend.
        Shipped 3 versioned releases within 2 months incorporating active user feedback.
      </>
    ),
    imageSrc: "/me.png",
    tags: ["React Native", "FastAPI", "Mobile", "REST APIs"],
    githubUrl: "https://github.com/in1yan/Red-Wheel",
    projectUrl: "https://github.com/in1yan/Red-Wheel",
  },
];
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
    <section id="projects" className="projects relative ">
      <div className="h-screen">
        <div
          ref={containerRef}
          className="projects-container flex h-full w-max"
        >
          {project_data.map((proj, index) => (
            <Project
              key={index}
              title={proj.title}
              subtitle={proj.subtitle}
              imageSrc={proj.imageSrc}
              description={proj.description}
              tags={proj.tags}
              githubUrl={proj.githubUrl}
              projectUrl={proj.projectUrl}
              isFirst={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
