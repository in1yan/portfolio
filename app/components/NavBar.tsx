import Link from "next/link";

type NavBarType = {
  location: string;
  href: string;
};

type Props = {
  items: NavBarType[];
};

export default function NavBar({ items }: Props) {
  return (
    <div className="flex justify-center pointer-events-none px-4">
      <nav className="pointer-events-auto flex items-center gap-3 sm:gap-6 md:gap-10 py-2.5 sm:py-3 px-4 sm:px-6 rounded-full bg-black/60 backdrop-blur-md border border-zinc-800/80 shadow-lg max-w-[95vw] overflow-x-auto scrollbar-none">
        {items.map((data, i) => {
          const isExternal =
            data.href.startsWith("http") || data.href.endsWith(".pdf");
          return (
            <Link
              key={i}
              href={data.href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              className="relative font-pixel-line tracking-widest text-xs sm:text-sm uppercase text-gray-200 hover:text-white transition-colors duration-300 group whitespace-nowrap shrink-0"
            >
              {data.location}
              <span className="absolute -bottom-1.5 left-1/2 w-0 h-0.5 bg-[#ff3b3b] -translate-x-1/2 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
