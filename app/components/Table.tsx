type TableProps = {
  title: string;
  value: string;
  align?: "left" | "right";
};
export default function Table({ title, value, align = "left" }: TableProps) {
  const isRight = align === "right";
  return (
    <div
      className={`row flex border-b border-zinc-800 py-4 items-center gap-6 ${
        isRight ? "justify-end" : ""
      }`}
    >
      {isRight ? (
        <>
          <span className="font-mono text-zinc-300 max-w-[420px] text-right break-words">{value}</span>
          <span className="w-28 shrink-0 text-xs uppercase tracking-[0.3em] text-secondary font-mono text-right">
            {title}
          </span>
        </>
      ) : (
        <>
          <span className="w-28 shrink-0 text-xs uppercase tracking-[0.3em] text-secondary font-mono">
            {title}
          </span>
          <span className="font-mono text-zinc-300">{value}</span>
        </>
      )}
    </div>
  );
}
