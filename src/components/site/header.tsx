import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight text-black">
          Undangan<span className="text-amber-500">.id</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-black/70">
          <Link href="/templates" className="transition-colors hover:text-black">
            Katalog Template
          </Link>
          <Link
            href="/buat"
            className="rounded-full bg-black px-4 py-2 text-white transition-colors hover:bg-black/80"
          >
            Buat Undangan
          </Link>
        </nav>
      </div>
    </header>
  );
}
