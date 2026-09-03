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
      className={`relative w-screen h-full ${isFirst ? "projects-image" : "panel"}`}
    >
      <ScrambleImage imageSrc={imageSrc} altText={title} />

      <div className="absolute z-10 text-white top-110 inset-0 bg-linear-to-t from-black/90 to-transparent pointer-events-none">
        <div className="flex flex-col">
          <p className="title text-[25vh] pl-15 font-extrabold uppercase leading-none mix-blend-difference">
            {title}
          </p>
          <p className="text-2xl pt-10 pl-20 font-bold uppercase text-secondary">
            {subtitle}
          </p>
          <div className="text-sm pl-20 max-w-3xl text-gray-300 leading-relaxed font-mono pt-2">{description}</div>
          <div className="flex flex-wrap pl-20 pt-7 gap-3">
            {tags.map((tag, index) => (
              <div key={index} className="bg-white pointer-events-auto">
                <p className="text-black font-mono uppercase font-bold px-2 py-1 text-xs sm:text-sm">
                  {tag}
                </p>
              </div>
            ))}
          </div>
          <div className="absolute bottom-10 right-20 flex flex-row gap-6 pointer-events-auto">
            <div className="flex flex-col gap-2">
              {projectUrl && (
                <Link
                  href={projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-secondary font-mono text-xl sm:text-2xl uppercase font-bold hover:text-white transition-colors"
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
                  className="flex items-center gap-1 text-secondary font-mono text-xl sm:text-2xl uppercase font-bold hover:text-white transition-colors"
                >
                  View Code
                  <ArrowUpRightIcon className="w-5 h-5" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
