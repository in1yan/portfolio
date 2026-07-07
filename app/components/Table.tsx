type TableProps = {
  title: string;
  value: string;
};
export default function Table({ title, value }: TableProps) {
  return (
    <div className="row flex border-b border-zinc-800 py-4">
      <span className="w-28 shrink-0 text-xs uppercase tracking-[0.3em] text-secondary font-mono">
        {title}
      </span>
      <span className="font-mono text-zinc-300">{value}</span>
    </div>
  );
}
