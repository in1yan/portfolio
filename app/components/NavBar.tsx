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
    <div className="flex flex-1 justify-center columns-1 self-center gap-3">
      {items.map((data, i) => (
        <div key={i}>
          <Link href={data.href}>{data.location}</Link>
        </div>
      ))}
    </div>
  );
}
