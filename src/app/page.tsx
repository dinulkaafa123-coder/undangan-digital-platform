import Link from "next/link";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { templates, categories, getTemplatesByEventType } from "@/data/templates";
import { TemplateCard } from "@/components/catalog/template-card";
import { HeroInvitationCards } from "@/components/home/hero-invitation-cards";
import { eventTypes } from "@/types/event";

export default function HomePage() {
  const featured = templates.slice(0, 4);

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-6 py-20 text-center">
          <span className="inline-block rounded-full bg-amber-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-amber-700">
            Digital Invitation &amp; Event Platform
          </span>
          <h1 className="mx-auto mt-6 max-w-2xl text-4xl font-bold leading-tight tracking-tight text-black sm:text-5xl">
            Undangan Digital untuk Setiap Momen
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-black/60">
            Buat undangan digital yang elegan, interaktif, dan berkesan untuk berbagai acara --
            isi datanya sekali, bagikan ke semua tamu langsung dari smartphone.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/buat"
              className="rounded-full bg-black px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-black/80"
            >
              Buat Undangan
            </Link>
            <Link
              href="/templates"
              className="rounded-full border border-black/15 px-8 py-3 text-sm font-semibold text-black transition-colors hover:border-black/40"
            >
              Lihat Template
            </Link>
          </div>

          <HeroInvitationCards />
        </section>

        {/* Event types */}
        <section className="mx-auto max-w-6xl px-6 py-14">
          <h2 className="text-center text-2xl font-bold text-black">Pilih Jenis Acaramu</h2>
          <p className="mx-auto mt-2 max-w-md text-center text-sm text-black/60">
            Bukan cuma pernikahan. Pilih jenis acaramu, kami sudah siapkan template yang sesuai.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {eventTypes.map((et) => {
              const count = getTemplatesByEventType(et.id).length;
              return (
                <Link
                  key={et.id}
                  href={count > 0 ? `/templates?type=${et.id}` : `/buat?type=${et.id}`}
                  className="group flex flex-col items-center gap-3 rounded-2xl border border-black/10 p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-black/20 hover:shadow-lg"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-50 text-2xl transition-colors group-hover:bg-amber-100">
                    {et.emoji}
                  </span>
                  <p className="font-semibold text-black">{et.label}</p>
                  <p className="text-xs text-black/50">{count > 0 ? `${count} template` : "Segera hadir"}</p>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Featured templates */}
        <section className="mx-auto max-w-6xl px-6 py-14">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-black">Template Populer</h2>
            <Link href="/templates" className="text-sm font-medium text-black/70 hover:text-black">
              Lihat semua →
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        </section>

        {/* Style categories */}
        <section className="mx-auto max-w-6xl px-6 py-14">
          <h2 className="text-center text-2xl font-bold text-black">Gaya Desain</h2>
          <p className="mx-auto mt-2 max-w-md text-center text-sm text-black/60">
            Setiap gaya punya karakter visual yang benar-benar berbeda, bukan hanya beda warna.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/templates?category=${cat.id}`}
                className="rounded-xl border border-black/10 p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-black/30 hover:shadow-md"
              >
                <p className="font-semibold text-black">{cat.label}</p>
                <p className="mt-1 text-xs text-black/50">{cat.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="bg-black/[0.03] px-6 py-16">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-center text-2xl font-bold text-black">Cara Kerjanya</h2>
            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
              {[
                { step: "1", title: "Pilih Jenis Acara & Template", desc: "Pernikahan, khitanan, ulang tahun, atau lainnya -- pilih desain yang paling sesuai." },
                { step: "2", title: "Isi Data Acara", desc: "Masukkan nama, tanggal, lokasi, foto, dan detail lainnya sekali saja." },
                { step: "3", title: "Bagikan ke Tamu", desc: "Undangan siap dibagikan lewat WhatsApp, tanpa perlu cetak." },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-black text-sm font-bold text-white">
                    {item.step}
                  </div>
                  <h3 className="mt-4 font-semibold text-black">{item.title}</h3>
                  <p className="mt-2 text-sm text-black/60">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
