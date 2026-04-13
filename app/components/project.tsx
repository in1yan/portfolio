import ScrambleImage from "./ScrambleImage";

interface ProjectProps {
  title: string;
  subtitle: string;
  description: React.ReactNode;
  imageSrc: string;
  tags: string[];
  isFirst?: boolean;
}

export default function Project({
  title,
  subtitle,
  description,
  imageSrc,
  tags,
  isFirst,
}: ProjectProps) {
  return (
    <div
      className={`relative w-screen h-full ${isFirst ? "projects-image" : "panel"}`}
    >
      <ScrambleImage imageSrc={imageSrc} altText={title} />

      <div className="absolute z-10 text-white top-110 inset-0 bg-linear-to-t from-black/90 to-transparent pointer-events-none">
        <div className="flex flex-col">
          <p className="title text-[25vh] pl-15 font-extrabold uppercase leading-none">
            {title}
          </p>
          <p className="text-2xl pt-10 pl-20 font-bold uppercase text-secondary">
            {subtitle}
          </p>
          <p className="text-sm pl-20 text-gray-400">{description}</p>
          <div className="flex pl-20 pt-7 flex-row gap-5">
            {tags.map((tag, index) => (
              <div key={index} className="bg-white pointer-events-auto">
                <p className="text-black font-mono uppercase font-bold p-1 text-sm">
                  {tag}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
