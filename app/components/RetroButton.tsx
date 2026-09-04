import gsap from "gsap";
import Link from "next/link";
import { useRef } from "react";

type ButtonType = {
  Label: string;
  href?: string;
  target?: string;
};

export default function RetroButton({ Label, href = "#", target }: ButtonType) {
  const bgRef = useRef(null);

  const handleHover = () => {
    gsap.to(bgRef.current, {
      scaleX: 1,
      ease: "power4.inOut",
      duration: 0.3,
    });
  };
  const handleLeave = () => {
    gsap.to(bgRef.current, {
      scaleX: 0,
      ease: "power4.inOut",
      duration: 0.3,
    });
  };
  return (
    <div className="font-pixel-triangle text-lg sm:text-2xl pt-6 sm:pt-12 md:pt-16 inline-flex items-center">
      <span className="text-xl sm:text-3xl">[</span>
      <div
        className="button-label overflow-hidden inline-block relative"
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
      >
        <div
          ref={bgRef}
          className="absolute bottom-0 left-0 w-full h-full bg-[#ff3b3b] origin-bottom scale-x-0"
        />
        <Link href={href} target={target} rel={target === "_blank" ? "noopener noreferrer" : undefined}>
          <p className="relative">{Label}</p>
        </Link>
      </div>
      <span className="text-xl sm:text-3xl">]</span>
    </div>
  );
}
