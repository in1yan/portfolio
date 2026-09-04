import Link from "next/link";
import ScrambleImage from "./ScrambleImage";
import { ArrowUpRightIcon } from "lucide-react";
interface ProjectProps {
  title: string;
  subtitle: string;
  description: React.ReactNode;
  imageSrc: string;
  tags: string[];
  githubUrl?: string;
  projectUrl?: string;
  isFirst?: boolean;
}

export default function Project({
  title,
  subtitle,
  description,
  imageSrc,
  tags,
  githubUrl,
  projectUrl,
  isFirst,
}: ProjectProps) {
  return (
    <div
      className={`relative w-screen h-full shrink-0 ${isFirst ? "projects-image" : "panel"}`}
    >
      <ScrambleImage imageSrc={imageSrc} altText={title} />

      <div className="absolute z-10 text-white inset-0 flex flex-col justify-end pb-8 md:pb-12 bg-linear-to-t from-black/95 via-black/60 to-transparent pointer-events-none">
        <div className="flex flex-col relative w-full">
          <p className="title text-[14vh] sm:text-[18vh] md:text-[22vh] px-6 sm:px-10 md:px-20 font-extrabold uppercase leading-none mix-blend-difference select-none">
            {title}
          </p>
          <p className="text-xl sm:text-2xl pt-4 sm:pt-6 px-6 sm:px-10 md:px-20 font-bold uppercase text-secondary">
            {subtitle}
          </p>
          <div className="text-xs sm:text-sm px-6 sm:px-10 md:px-20 max-w-xl md:max-w-2xl lg:max-w-3xl text-gray-300 leading-relaxed font-mono pt-2">
            {description}
          </div>
          <div className="flex flex-wrap px-6 sm:px-10 md:px-20 pt-4 sm:pt-6 gap-2 sm:gap-3 max-w-[calc(100vw-18rem)] md:max-w-2xl lg:max-w-3xl">
            {tags.map((tag, index) => (
              <div key={index} className="bg-white pointer-events-auto shadow-sm">
                <p className="text-black font-mono uppercase font-bold px-2.5 py-1 text-xs sm:text-sm whitespace-nowrap">
                  {tag}
                </p>
              </div>
            ))}
          </div>

          <div className="absolute bottom-0 right-6 sm:right-10 md:right-20 flex flex-col gap-2 pointer-events-auto">
            {projectUrl && (
              <Link
                href={projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-secondary font-mono text-lg sm:text-xl md:text-2xl uppercase font-bold hover:text-white transition-colors"
              >
                View Project
                <ArrowUpRightIcon className="w-5 h-5" />
              </Link>
            )}
            {githubUrl && (
              <Link
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-secondary font-mono text-lg sm:text-xl md:text-2xl uppercase font-bold hover:text-white transition-colors"
              >
                View Code
                <ArrowUpRightIcon className="w-5 h-5" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
