export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6">
      <h1 className="text-foreground text-4xl font-bold tracking-tight">
        Team Autotech
      </h1>
      <p className="text-muted">Root layout token check — T0.2</p>
      <div className="border-border bg-surface rounded-lg border px-6 py-4">
        <p className="text-foreground">
          This card uses <span className="text-accent">bg-surface</span> and{' '}
          <span className="text-accent">border-border</span>
        </p>
      </div>
      <button className="bg-accent hover:bg-accent-hover rounded-full px-5 py-2.5 font-medium text-white transition-colors">
        Accent button
      </button>
    </div>
  );
}
