const CARDS = [
  { offsetX: -120, z: 0, rotate: "-rotate-12", from: "from-[#f4ecd8]", to: "to-[#d4af6a]", label: "Pernikahan", float: "animate-float-slow" },
  { offsetX: 0, z: 40, rotate: "", from: "from-[#0f3d2e]", to: "to-[#d4af37]", label: "Khitanan", float: "animate-float-slower" },
  { offsetX: 120, z: 0, rotate: "rotate-12", from: "from-[#c9789a]", to: "to-[#fde08a]", label: "Ulang Tahun", float: "animate-float-slow" },
];

/**
 * Visual hero: beberapa kartu undangan mini yang melayang lembut dengan
 * depth 3D (perspective + translateZ + rotate statis per kartu),
 * mewakili beragam jenis acara -- sengaja dibuat minim (3 kartu, tanpa
 * foto) supaya tidak ramai dan tetap ringan di HP.
 *
 * Tiga lapis div dipakai dengan sengaja: lapis posisi (translateX/Z,
 * statis) tidak boleh satu elemen dengan lapis animasi melayang
 * (translate3d berosilasi) -- CSS animation menimpa `transform` inline
 * selama animasi berjalan, jadi keduanya harus dipisah di elemen
 * bersarang supaya transform-nya terkompilasi, bukan saling menimpa.
 */
export function HeroInvitationCards() {
  return (
    <div aria-hidden className="perspective-1600 relative mx-auto mt-14 h-44 max-w-md sm:h-52">
      {CARDS.map((card, i) => (
        <div
          key={card.label}
          className="preserve-3d absolute left-1/2 top-0"
          style={{ transform: `translateX(calc(-50% + ${card.offsetX}px)) translateZ(${card.z}px)`, zIndex: card.z }}
        >
          <div className={card.float} style={{ animationDelay: `${i * 0.4}s` }}>
            <div className={`flex h-36 w-24 flex-col rounded-xl bg-gradient-to-br p-3 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.35)] sm:h-44 sm:w-28 ${card.from} ${card.to} ${card.rotate}`}>
              <div className="h-2 w-8 rounded-full bg-white/70" />
              <div className="mt-2 h-1.5 w-12 rounded-full bg-white/50" />
              <div className="mt-1 h-1.5 w-9 rounded-full bg-white/50" />
              <p className="mt-auto text-[9px] font-semibold uppercase tracking-wide text-white/90">{card.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
