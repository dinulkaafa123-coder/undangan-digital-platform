import type { ComponentType } from "react";
import type { EventData } from "@/types/event";

import RoyalGold from "./01-royal-gold";
import WhitePalace from "./02-white-palace";
import BlackDiamond from "./03-black-diamond";
import SecretGarden from "./04-secret-garden";
import IslamicMajesty from "./05-islamic-majesty";
import MoonlightRomance from "./06-moonlight-romance";
import RusticRomance from "./07-rustic-romance";
import NusantaraHeritage from "./08-nusantara-heritage";
import DiamondPalace3D from "./09-diamond-palace-3d";
import EnchantedForest from "./10-enchanted-forest";
import CrystalWedding from "./11-crystal-wedding";
import RoseCathedral from "./12-rose-cathedral";
import GoldenBallroom from "./13-golden-ballroom";
import CelestialLove from "./14-celestial-love";
import SakuraDream from "./15-sakura-dream";
import OceanPearl from "./16-ocean-pearl";
import EmeraldRoyal from "./17-emerald-royal";
import ArtDecoGatsby from "./18-art-deco-gatsby";
import GlassGarden from "./19-glass-garden";
import RoyalJavanese from "./20-royal-javanese";
import MinangRoyal from "./21-minang-royal";
import BalinesePardise from "./22-balinese-paradise";
import ArabianNights from "./23-arabian-nights";
import VintageCinema from "./24-vintage-cinema";
import LittleSultan from "./25-little-sultan";
import LittlePrince from "./26-little-prince";
import IslamicKids from "./27-islamic-kids";
import SweetCelebration from "./28-sweet-celebration";
import BirthdayLuxury from "./29-birthday-luxury";
import PartyPop from "./30-party-pop";
import GraduationElegant from "./31-graduation-elegant";
import AcademicBlue from "./32-academic-blue";
import GraduationCinema from "./33-graduation-cinema";
import CorporateBlack from "./34-corporate-black";
import CorporateGold from "./35-corporate-gold";
import ModernBusiness from "./36-modern-business";
import IslamicEmerald from "./37-islamic-emerald";
import RamadhanGold from "./38-ramadhan-gold";
import TablighAkbar from "./39-tabligh-akbar";
import InfinityMirror from "./40-infinity-mirror";
import EternalOrbit from "./41-eternal-orbit";
import LivingBloom from "./42-living-bloom";
import JavaEternal from "./43-java-eternal";
import SundaEternal from "./44-sunda-eternal";
import BatakEternal from "./45-batak-eternal";

/**
 * Registry pusat: templateId/slug -> komponen renderer, lintas SEMUA
 * jenis acara (wedding, khitanan, birthday, dst). Menambah template
 * baru cukup: buat folder baru + daftarkan di sini.
 *
 * Setiap komponen di atas punya tipe props yang KETAT sesuai jenis
 * acaranya sendiri (InvitationTemplateProps / KhitananTemplateProps /
 * BirthdayTemplateProps -- lihat `./types.ts`), jadi di dalam file
 * masing-masing tetap type-safe penuh. Registry ini sendiri sengaja
 * ditipekan longgar (`ComponentType<{ data: EventData; ... }>` lewat
 * cast) karena secara alami polymorphic: satu Record menampung
 * renderer-renderer yang masing-masing hanya menerima SATU varian dari
 * union `EventData`. Halaman yang memanggilnya (`/undangan/[slug]`)
 * yang bertanggung jawab memasangkan slug dengan eventData yang sesuai.
 */
type AnyEventTemplateComponent = ComponentType<{ data: EventData; templateSlug: string; guestName: string }>;

export const templateRegistry: Record<string, AnyEventTemplateComponent> = {
  "royal-gold": RoyalGold,
  "white-palace": WhitePalace,
  "black-diamond": BlackDiamond,
  "secret-garden": SecretGarden,
  "islamic-majesty": IslamicMajesty,
  "moonlight-romance": MoonlightRomance,
  "rustic-romance": RusticRomance,
  "nusantara-heritage": NusantaraHeritage,
  "diamond-palace-3d": DiamondPalace3D,
  "enchanted-forest": EnchantedForest,
  "crystal-wedding": CrystalWedding,
  "rose-cathedral": RoseCathedral,
  "golden-ballroom": GoldenBallroom,
  "celestial-love": CelestialLove,
  "sakura-dream": SakuraDream,
  "ocean-pearl": OceanPearl,
  "emerald-royal": EmeraldRoyal,
  "art-deco-gatsby": ArtDecoGatsby,
  "glass-garden": GlassGarden,
  "royal-javanese": RoyalJavanese,
  "minang-royal": MinangRoyal,
  "balinese-paradise": BalinesePardise,
  "arabian-nights": ArabianNights,
  "vintage-cinema": VintageCinema,
  "little-sultan": LittleSultan,
  "little-prince": LittlePrince,
  "islamic-kids": IslamicKids,
  "sweet-celebration": SweetCelebration,
  "birthday-luxury": BirthdayLuxury,
  "party-pop": PartyPop,
  "graduation-elegant": GraduationElegant,
  "academic-blue": AcademicBlue,
  "graduation-cinema": GraduationCinema,
  "corporate-black": CorporateBlack,
  "corporate-gold": CorporateGold,
  "modern-business": ModernBusiness,
  "islamic-emerald": IslamicEmerald,
  "ramadhan-gold": RamadhanGold,
  "tabligh-akbar": TablighAkbar,
  "infinity-mirror": InfinityMirror,
  "eternal-orbit": EternalOrbit,
  "living-bloom": LivingBloom,
  "java-eternal": JavaEternal,
  "sunda-eternal": SundaEternal,
  "batak-eternal": BatakEternal,
} as unknown as Record<string, AnyEventTemplateComponent>;

export function getTemplateComponent(slug: string): AnyEventTemplateComponent | undefined {
  return templateRegistry[slug];
}
