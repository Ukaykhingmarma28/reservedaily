import Link from "next/link";

export default function ProductNotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <h1 className="ff text-[clamp(28px,5vw,42px)] text-ink tracking-[-0.02em] leading-tight mb-4">
          Product not found
        </h1>
        <p className="text-sm text-ink-2 leading-relaxed mb-8">
          The product you&apos;re looking for doesn&apos;t exist or may have been removed.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-ink text-cream text-xs font-semibold tracking-[0.1em] uppercase no-underline transition-colors hover:bg-moss"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
