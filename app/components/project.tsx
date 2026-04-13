import Image from "next/image";
export default function Project() {
  return (
    <div className="panel relative w-screen">
      <Image
        src="/demo.png"
        alt="demo"
        fill
        sizes="100vw"
        className="object-cover"
      />
    </div>
  );
}
