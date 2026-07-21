import Link from "next/link";

export default function NotFound() {
  return (
    <section className="grid min-h-[70vh] place-items-center px-6">
      <div className="text-center">
        <p className="font-mono text-sm text-accent">404</p>
        <h1 className="mt-3 text-3xl font-semibold">This page drifted out of reach.</h1>
        <p className="mt-3 text-muted">The link may be broken or the page moved.</p>
        <Link href="/" className="btn-accent mt-8">
          Back home
        </Link>
      </div>
    </section>
  );
}
