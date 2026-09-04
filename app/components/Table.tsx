type TableProps = {
  title: string;
  value: string;
  align?: "left" | "right";
};
export default function Table({ title, value, align = "left" }: TableProps) {
  const isRight = align === "right";
  return (
    <div
      className={`row flex border-b border-zinc-800 py-3 sm:py-4 flex-col sm:flex-row sm:items-center gap-1 sm:gap-6 ${
        isRight ? "sm:justify-end items-end text-right" : "items-start text-left"
      }`}
    >
      {isRight ? (
        <>
          <span className="font-mono text-xs sm:text-sm text-zinc-300 max-w-full sm:max-w-[480px] text-right break-words order-2 sm:order-1">
            {value}
          </span>
          <span className="w-auto sm:w-28 shrink-0 text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-secondary font-mono text-right order-1 sm:order-2">
            {title}
          </span>
        </>
      ) : (
        <>
          <span className="w-auto sm:w-28 shrink-0 text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-secondary font-mono">
            {title}
          </span>
          <span className="font-mono text-xs sm:text-sm text-zinc-300 break-words">{value}</span>
        </>
      )}
    </div>
  );
}
