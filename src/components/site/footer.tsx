import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-black/10 py-10 text-center text-sm text-black/50">
      <p>&copy; {new Date().getFullYear()} Undangan.id &mdash; Undangan Digital untuk Setiap Momen.</p>
      <nav className="mt-3 flex items-center justify-center gap-4 text-xs">
        <Link href="/privasi" className="hover:text-black/70 hover:underline underline-offset-2">
          Kebijakan Privasi
        </Link>
        <span className="text-black/20">&middot;</span>
        <Link href="/syarat-ketentuan" className="hover:text-black/70 hover:underline underline-offset-2">
          Syarat &amp; Ketentuan
        </Link>
      </nav>
    </footer>
  );
}
