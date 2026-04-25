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
    <div className="flex justify-center pointer-events-none">
      <nav className="pointer-events-auto flex items-center gap-8 sm:gap-12 py-3">
        {items.map((data, i) => (
          <Link
            key={i}
            href={data.href}
            className="relative font-pixel-line tracking-widest text-xs sm:text-sm uppercase text-gray-200 hover:text-white transition-colors duration-300 group"
          >
            {data.location}
            <span className="absolute -bottom-1.5 left-1/2 w-0 h-0.5 bg-[#ff3b3b] -translate-x-1/2 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
