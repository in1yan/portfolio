import Image from "next/image";
export default function Project() {
  return (
    <div className="panel relative w-screen">
      <Image
        src="/melouz.png"
        alt="demo"
        fill
        sizes="100vw"
        className="object-cover grayscale-20"
      />
      <div className="absolute text-white top-110 inset-0 bg-linear-to-t from-black/90 to-transparent">
        <div className="flex flex-col">
          <p className="text-[25vh] pl-15 font-extrabold uppercase leading-none">
            Project
          </p>
          <p className="text-2xl pt-10 pl-20 font-bold uppercase text-secondary">
            World saving project
          </p>
          <p className="text-sm pl-20 text-gray-400">
            This is a project written to save the world <br /> from ending in
            just 5 days.
          </p>
          <div className="flex pl-20 pt-7 flex-row gap-5">
            <div className="bg-white">
              <p className="text-black font-mono uppercase font-bold p-1 text-sm">
                NextJS
              </p>
            </div>
            <div className="bg-white">
              <p className="text-black font-mono uppercase font-bold p-1 text-sm">
                NextJS
              </p>
            </div>
            <div className="bg-white">
              <p className="text-black font-mono uppercase font-bold p-1 text-sm">
                NextJS
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
