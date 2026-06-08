"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

/* ──────────────────────────────────────────────
   DATA & TYPES
────────────────────────────────────────────── */
interface Artista {
  id: string;
  nombre: string;
  disciplina: string;
  anio: string;
  origen: string;
  img: string;
}

interface Categoria {
  id: string;
  index: string;
  titulo: string;
  artistas: Artista[];
}

// Pool de imágenes (Unsplash, uso libre)
const IMG_POOL = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=900&q=80",
];

const ORIGENES = ["Praga", "Turín", "Viena", "Lyon", "Lisboa", "Berlín", "Nápoles", "Génova", "Venecia", "Oslo"];
const ANIOS = ["2021", "2022", "2023", "2024"];

function build(catId: string, disciplina: string, nombres: string[]): Artista[] {
  return nombres.map((nombre, i) => ({
    id: `${catId}-${i}`,
    nombre,
    disciplina,
    anio: ANIOS[i % ANIOS.length],
    origen: ORIGENES[i % ORIGENES.length],
    img: IMG_POOL[i % IMG_POOL.length],
  }));
}

const CATEGORIAS: Categoria[] = [
  {
    id: "revelacion",
    index: "01",
    titulo: "Mejor Artista Revelación",
    artistas: build("rev", "Revelación", [
      "LA DAMA SIN ROSTRO", "EL DOMADOR PÁLIDO", "MADAME CARMÍN", "EL HOMBRE DE CERA",
      "SEÑORITA EBONY", "EL CANTOR MUDO", "NIÑA ESPEJO", "EL ÚLTIMO AUGUR",
      "DOÑA PENUMBRA", "EL FUNÁMBULO CIEGO",
    ]),
  },
  {
    id: "trapecio",
    index: "02",
    titulo: "Mejor Trapecista",
    artistas: build("tra", "Trapecio", [
      "LAS HERMANAS VÉRTIGO", "ÍCARO GRIS", "LA GOLONDRINA ROTA", "EL VUELO NEGRO",
      "MADAME ALTURA", "EL ÁNGEL CAÍDO", "LA SOMBRA VOLADORA",
    ]),
  },
  {
    id: "ceremonias",
    index: "03",
    titulo: "Mejor Maestro de Ceremonias",
    artistas: build("cer", "Ceremonias", [
      "EL SEÑOR DE MEDIANOCHE", "DON ESCARLATA", "LA VOZ DEL ABISMO",
      "EL HERALDO PÁLIDO", "MADAME PROTOCOLO", "EL NARRADOR DE CENIZAS",
    ]),
  },
  {
    id: "ilusionismo",
    index: "04",
    titulo: "Mejor Acto de Ilusionismo",
    artistas: build("ilu", "Ilusionismo", [
      "EL GRAN VACÍO", "MANOS DE HUMO", "LA CARTA QUEMADA", "EL DESVANECIDO",
      "PROFESOR ENIGMA", "LA CAJA SIN FONDO", "EL ESPEJO MENTIROSO", "MADAME TRUCO",
    ]),
  },
  {
    id: "espectaculo",
    index: "05",
    titulo: "Mejor Espectáculo Oscuro",
    artistas: build("esp", "Espectáculo", [
      "EL CARRUSEL ROTO", "NOCHE DE CENIZA", "LOS HERMANOS SOMBRA",
      "REQUIEM DE FERIA", "EL DESFILE FÚNEBRE",
    ]),
  },
  {
    id: "contorsion",
    index: "06",
    titulo: "Mejor Contorsionista",
    artistas: build("con", "Contorsión", [
      "LA MUJER IMPOSIBLE", "HUESO DE GOMA", "EL NUDO HUMANO", "SERPENTINA",
      "LA ARAÑA DE SEDA", "EL PLIEGUE", "DOÑA ELÁSTICA",
    ]),
  },
  {
    id: "payaso",
    index: "07",
    titulo: "Mejor Payaso Trágico",
    artistas: build("pay", "Payaso", [
      "EL LLANTO BLANCO", "RISA AMARGA", "EL BUFÓN DE LUTO", "PIERROT CENIZO",
      "LA SONRISA ROTA", "EL ÚLTIMO CHISTE",
    ]),
  },
];

// Umbral: a partir de cuántos nominados se ofrece el modal "Ver todos"
const UMBRAL_VER_TODOS = 8;

/* ──────────────────────────────────────────────
   Icono check sutil (voto sellado)
────────────────────────────────────────────── */
function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  );
}

/* Filtros SVG ink bleed */
function InkFilters() {
  return (
    <svg className="pointer-events-none absolute h-0 w-0" aria-hidden="true">
      <defs>
        <filter id="ink-bleed" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.5" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8" result="goo" />
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" result="noise" />
          <feDisplacementMap in="goo" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="ink-bleed-strong" x="-25%" y="-25%" width="150%" height="150%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.7" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9" result="goo" />
          <feTurbulence type="fractalNoise" baseFrequency="0.7 0.85" numOctaves="3" seed="3" result="noise" />
          <feDisplacementMap in="goo" in2="noise" scale="3.5" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-t border-[#FFF8DC]/15 py-1.5">
      <span className="font-[family-name:var(--font-space-mono)] text-[10px] uppercase tracking-[0.2em] text-[#FFF8DC]/40">
        {label}
      </span>
      <span className="font-[family-name:var(--font-space-mono)] text-[10px] uppercase tracking-[0.15em] text-[#FFF8DC]/80">
        {value}
      </span>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Tarjeta de votación - Estilo póster de circo vintage
────────────────────────────────────────────── */
function VotingCard({
  artista,
  selected,
  onVote,
  usePosterFrame = false,
  posterImage,
}: {
  artista: Artista;
  selected: boolean;
  onVote: () => void;
  usePosterFrame?: boolean;
  posterImage?: string;
}) {
  if (usePosterFrame && posterImage) {
    // Versión con póster PNG superpuesto - SIN textos superpuestos
    return (
      <div className="group flex h-full flex-col">
        <div className="relative w-full overflow-hidden bg-[#0a0204]">
          {/* Contenedor con aspect ratio */}
          <div className="relative aspect-[3/4]">
            {/* Imagen del artista de fondo */}
            <img
              src={artista.img}
              alt={artista.nombre}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover grayscale-[35%] contrast-110 transition-transform duration-700 ease-out group-hover:scale-105"
            />
            
            {/* Viñeta sobre la foto */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(circle at center, transparent 25%, rgba(90,0,26,0.4) 65%, rgba(10,2,4,0.8) 100%)" }}
            />
            
            {/* Marco de póster PNG superpuesto */}
            <img
              src={posterImage}
              alt="Marco de circo"
              className="absolute inset-0 h-full w-full object-cover pointer-events-none z-10"
            />
            
            {/* Badge de voto sellado */}
            {selected && (
              <>
                <div className="absolute right-2 top-2 bg-[#FF3300] px-2 py-1 z-20 sm:right-2.5 sm:top-2.5 sm:px-2.5" style={{ transform: 'rotate(-3deg)' }}>
                  <span className="font-[family-name:var(--font-space-mono)] text-[7px] font-bold uppercase tracking-widest text-black sm:text-[8px]">
                    ★ VOTADO ★
                  </span>
                </div>
                <div className="pointer-events-none absolute inset-0 z-20" style={{ boxShadow: "inset 0 0 0 3px #FF3300" }} />
              </>
            )}
          </div>
        </div>

        {/* Metadata con estilo ticket vintage */}
        <div className="mt-2.5 border border-[#8B4513]/20 bg-[#1a0a0a] px-2.5 py-2 sm:mt-3 sm:px-3">
          <div className="flex items-center justify-between border-b border-[#8B4513]/15 pb-1.5">
            <span className="font-[family-name:var(--font-space-mono)] text-[9px] uppercase tracking-[0.25em] text-[#C9A227]/60">
              Año
            </span>
            <span className="font-[family-name:var(--font-space-mono)] text-[9px] uppercase tracking-[0.2em] text-[#FFF8DC]/80">
              {artista.anio}
            </span>
          </div>
          <div className="flex items-center justify-between pt-1.5">
            <span className="font-[family-name:var(--font-space-mono)] text-[9px] uppercase tracking-[0.25em] text-[#C9A227]/60">
              Origen
            </span>
            <span className="font-[family-name:var(--font-space-mono)] text-[9px] uppercase tracking-[0.2em] text-[#FFF8DC]/80">
              {artista.origen}
            </span>
          </div>
        </div>

        {/* Botón de votar - estilo ticket con perforación */}
        <Button
          onClick={onVote}
          className={`relative mt-2.5 h-auto w-full overflow-visible border-0 py-2.5 font-[family-name:var(--font-archivo)] text-xs font-black uppercase tracking-[0.15em] transition-all duration-200 sm:mt-3 sm:py-3 sm:text-sm sm:tracking-[0.2em] ${
            selected 
              ? "bg-[#FF3300] text-black hover:bg-[#FF3300] shadow-[0_0_20px_rgba(255,51,0,0.3)]" 
              : "bg-[#FFF8DC] text-black hover:bg-white hover:shadow-[0_4px_12px_rgba(255,248,220,0.2)]"
          }`}
          style={{
            clipPath: 'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)',
            borderRadius: '0'
          }}
        >
          {/* Perforaciones en esquinas superiores */}
          <div className="absolute -top-1 left-2 h-2 w-2 rounded-full bg-black" />
          <div className="absolute -top-1 right-2 h-2 w-2 rounded-full bg-black" />
          
          {/* Perforaciones en esquinas inferiores */}
          <div className="absolute -bottom-1 left-2 h-2 w-2 rounded-full bg-black" />
          <div className="absolute -bottom-1 right-2 h-2 w-2 rounded-full bg-black" />
          
          {selected && <CheckIcon className="size-3.5 sm:size-4 relative z-10 mr-1.5" />}
          <span className="relative z-10">{selected ? "★ VOTADO ★" : "VOTAR AHORA"}</span>
        </Button>
      </div>
    );
  }

  // Versión original con marcos CSS
  return (
    <div className="group flex h-full flex-col">
      {/* Contenedor principal con borde ornamental */}
      <div className="relative w-full overflow-hidden bg-[#0a0204]">
        {/* Marco decorativo exterior - estilo póster vintage */}
        <div className="absolute inset-0 border-4 border-[#8B4513]/40 pointer-events-none z-10" 
             style={{ 
               boxShadow: 'inset 0 0 0 1px rgba(255,248,220,0.1), inset 0 0 0 8px rgba(0,0,0,0.8)' 
             }} 
        />
        
        {/* Esquinas decorativas art déco */}
        <svg className="absolute top-0 left-0 w-16 h-16 pointer-events-none z-10" viewBox="0 0 100 100" fill="none">
          <path d="M0 0 L30 0 L15 15 L0 30 Z" fill="rgba(255,248,220,0.15)" />
          <path d="M0 0 L20 0 L10 10 L0 20 Z" fill="rgba(139,69,19,0.3)" />
        </svg>
        <svg className="absolute top-0 right-0 w-16 h-16 pointer-events-none z-10 rotate-90" viewBox="0 0 100 100" fill="none">
          <path d="M0 0 L30 0 L15 15 L0 30 Z" fill="rgba(255,248,220,0.15)" />
          <path d="M0 0 L20 0 L10 10 L0 20 Z" fill="rgba(139,69,19,0.3)" />
        </svg>
        <svg className="absolute bottom-0 left-0 w-16 h-16 pointer-events-none z-10 -rotate-90" viewBox="0 0 100 100" fill="none">
          <path d="M0 0 L30 0 L15 15 L0 30 Z" fill="rgba(255,248,220,0.15)" />
          <path d="M0 0 L20 0 L10 10 L0 20 Z" fill="rgba(139,69,19,0.3)" />
        </svg>
        <svg className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none z-10 rotate-180" viewBox="0 0 100 100" fill="none">
          <path d="M0 0 L30 0 L15 15 L0 30 Z" fill="rgba(255,248,220,0.15)" />
          <path d="M0 0 L20 0 L10 10 L0 20 Z" fill="rgba(139,69,19,0.3)" />
        </svg>

        {/* Marco interior con padding */}
        <div className="relative aspect-3/4 m-3">
          {/* Imagen del artista */}
          <img
            src={artista.img}
            alt={artista.nombre}
            loading="lazy"
            className="h-full w-full object-cover grayscale-[35%] contrast-110 transition-transform duration-700 ease-out group-hover:scale-105"
          />
          
          {/* Textura de papel envejecido */}
          <div 
            className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-40"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='paper'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='5' seed='2'/%3E%3CfeColorMatrix values='0 0 0 0 0.7, 0 0 0 0 0.6, 0 0 0 0 0.4, 0 0 0 0.5 0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23paper)'/%3E%3C/svg%3E")`,
            }}
          />
          
          {/* Viñeta circular intensa */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(circle at center, transparent 20%, rgba(90,0,26,0.6) 60%, rgba(10,2,4,0.95) 100%)" }}
          />
          
          {/* Gradiente inferior para texto */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/80 to-transparent" />
          
          {/* Textos del artista - estilo letrero de circo */}
          <div className="absolute inset-x-0 bottom-0 px-4 pb-4 sm:px-5 sm:pb-5">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-[family-name:var(--font-space-mono)] text-[8px] uppercase tracking-[0.4em] text-[#C9A227] sm:text-[9px]">
                {artista.disciplina}
              </span>
              {/* Ornamento decorativo pequeño */}
              <span className="text-[#8B4513] text-xs">◆</span>
            </div>
            <h3
              className="font-[family-name:var(--font-archivo)] text-lg font-black uppercase leading-[0.85] tracking-tight text-[#FFF8DC] sm:text-xl"
              style={{ 
                filter: "url(#ink-bleed)",
                textShadow: "2px 2px 0 rgba(139,69,19,0.3), -1px -1px 0 rgba(139,69,19,0.2)"
              }}
            >
              {artista.nombre}
            </h3>
            {/* Línea decorativa */}
            <div className="mt-2 flex items-center gap-2">
              <div className="h-px flex-1 bg-gradient-to-r from-[#8B4513]/50 to-transparent" />
              <span className="text-[#8B4513] text-[8px]">★</span>
              <div className="h-px flex-1 bg-gradient-to-l from-[#8B4513]/50 to-transparent" />
            </div>
          </div>
          
          {/* Badge de voto sellado */}
          {selected && (
            <>
              <div className="absolute right-2 top-2 bg-[#FF3300] px-2 py-1 sm:right-2.5 sm:top-2.5 sm:px-2.5" style={{ transform: 'rotate(-3deg)' }}>
                <span className="font-[family-name:var(--font-space-mono)] text-[7px] font-bold uppercase tracking-widest text-black sm:text-[8px]">
                  ★ VOTADO ★
                </span>
              </div>
              <div className="pointer-events-none absolute inset-0 m-3" style={{ boxShadow: "inset 0 0 0 3px #FF3300" }} />
            </>
          )}
        </div>
      </div>

      {/* Metadata con estilo ticket vintage */}
      <div className="mt-2.5 border border-[#8B4513]/20 bg-[#1a0a0a] px-2.5 py-2 sm:mt-3 sm:px-3">
        <div className="flex items-center justify-between border-b border-[#8B4513]/15 pb-1.5">
          <span className="font-[family-name:var(--font-space-mono)] text-[9px] uppercase tracking-[0.25em] text-[#C9A227]/60">
            Año
          </span>
          <span className="font-[family-name:var(--font-space-mono)] text-[9px] uppercase tracking-[0.2em] text-[#FFF8DC]/80">
            {artista.anio}
          </span>
        </div>
        <div className="flex items-center justify-between pt-1.5">
          <span className="font-[family-name:var(--font-space-mono)] text-[9px] uppercase tracking-[0.25em] text-[#C9A227]/60">
            Origen
          </span>
          <span className="font-[family-name:var(--font-space-mono)] text-[9px] uppercase tracking-[0.2em] text-[#FFF8DC]/80">
            {artista.origen}
          </span>
        </div>
      </div>

      {/* Botón de votar - estilo ticket con perforación */}
      <Button
        onClick={onVote}
        className={`relative mt-2.5 h-auto w-full overflow-visible border-0 py-2.5 font-[family-name:var(--font-archivo)] text-xs font-black uppercase tracking-[0.15em] transition-all duration-200 sm:mt-3 sm:py-3 sm:text-sm sm:tracking-[0.2em] ${
          selected 
            ? "bg-[#FF3300] text-black hover:bg-[#FF3300] shadow-[0_0_20px_rgba(255,51,0,0.3)]" 
            : "bg-[#FFF8DC] text-black hover:bg-white hover:shadow-[0_4px_12px_rgba(255,248,220,0.2)]"
        }`}
        style={{
          clipPath: 'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)',
          borderRadius: '0'
        }}
      >
        {/* Perforaciones en esquinas superiores */}
        <div className="absolute -top-1 left-2 h-2 w-2 rounded-full bg-black" />
        <div className="absolute -top-1 right-2 h-2 w-2 rounded-full bg-black" />
        
        {/* Perforaciones en esquinas inferiores */}
        <div className="absolute -bottom-1 left-2 h-2 w-2 rounded-full bg-black" />
        <div className="absolute -bottom-1 right-2 h-2 w-2 rounded-full bg-black" />
        
        {selected && <CheckIcon className="size-3.5 sm:size-4 relative z-10 mr-1.5" />}
        <span className="relative z-10">{selected ? "★ VOTADO ★" : "VOTAR AHORA"}</span>
      </Button>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Modal "Ver todos" (grid + buscador local)
────────────────────────────────────────────── */
function VerTodosDialog({
  categoria,
  votoActual,
  onVote,
  open,
  onOpenChange,
  posterImage,
}: {
  categoria: Categoria;
  votoActual: string | null;
  onVote: (id: string) => void;
  open: boolean;
  onOpenChange: (v: boolean) => void;
  posterImage?: string;
}) {
  const [q, setQ] = useState("");
  const filtrados = categoria.artistas.filter((a) =>
    a.nombre.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton
        className="max-w-6xl gap-0 rounded-none border-[#5A001A] bg-black p-0 text-[#FFF8DC]"
      >
        <DialogHeader className="border-b border-[#5A001A] px-6 py-5 sm:px-8 sm:py-6">
          <DialogTitle className="font-[family-name:var(--font-archivo)] text-2xl font-extrabold uppercase tracking-tight text-[#FFF8DC] sm:text-3xl lg:text-4xl">
            {categoria.titulo}
          </DialogTitle>
          <div className="mt-4">
            <Input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar nominado en esta categoría…"
              className="h-11 rounded-none border-[#FFF8DC]/20 bg-transparent font-[family-name:var(--font-space-mono)] text-sm text-[#FFF8DC] placeholder:text-[#FFF8DC]/30 focus-visible:border-[#FF3300] focus-visible:ring-0 sm:h-12"
            />
          </div>
        </DialogHeader>

        <ScrollArea className="h-[70vh] px-6 py-8 sm:px-8 sm:py-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filtrados.map((a) => (
              <VotingCard
                key={a.id}
                artista={a}
                selected={votoActual === a.id}
                onVote={() => onVote(a.id)}
                usePosterFrame={!!posterImage}
                posterImage={posterImage}
              />
            ))}
          </div>
          {filtrados.length === 0 && (
            <p className="py-20 text-center font-[family-name:var(--font-space-mono)] text-xs uppercase tracking-[0.3em] text-[#FFF8DC]/40">
              Sin resultados
            </p>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

/* ──────────────────────────────────────────────
   Fila de categoría (carrusel horizontal)
────────────────────────────────────────────── */
function CategoriaRow({
  categoria,
  voto,
  onVote,
  registerRef,
}: {
  categoria: Categoria;
  voto: string | null;
  onVote: (id: string) => void;
  registerRef: (id: string, el: HTMLElement | null) => void;
}) {
  const [verTodos, setVerTodos] = useState(false);
  const mostrarVerTodos = categoria.artistas.length >= UMBRAL_VER_TODOS;

  // Mapeo de categorías a pósters - distribuyendo los 4 pósters entre las 7 categorías
  const posterMap: Record<string, string> = {
    "revelacion": "/votacion-circo/cartel1.png",
    "trapecio": "/votacion-circo/cartel2.png",
    "ceremonias": "/votacion-circo/cartel3.png",
    "ilusionismo": "/votacion-circo/cartel4.png",
    "espectaculo": "/votacion-circo/cartel1.png",
    "contorsion": "/votacion-circo/cartel2.png",
    "payaso": "/votacion-circo/cartel3.png",
  };
  
  const posterImage = posterMap[categoria.id];
  const usePoster = !!posterImage;

  return (
    <section
      id={categoria.id}
      ref={(el) => registerRef(categoria.id, el)}
      className="scroll-mt-24 px-4 pb-12 sm:scroll-mt-28 sm:px-6 sm:pb-16 lg:scroll-mt-32 lg:pb-20 lg:pr-52"
    >
      <div className="mx-auto max-w-6xl">
        {/* Header de la categoría */}
        <div className="mb-6 flex flex-col gap-3 border-b border-[#5A001A] pb-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between sm:gap-4 sm:pb-5">
          <div className="flex flex-wrap items-baseline gap-2 sm:gap-3 lg:gap-4">
            <span className="font-[family-name:var(--font-space-mono)] text-[10px] text-[#FF3300] sm:text-xs">{categoria.index}</span>
            <h2
              className="font-[family-name:var(--font-archivo)] text-xl font-extrabold uppercase leading-tight tracking-tight text-[#FFF8DC] sm:text-2xl lg:text-3xl xl:text-4xl"
              style={{ filter: "url(#ink-bleed-strong)" }}
            >
              {categoria.titulo}
            </h2>
          </div>
          <div className="flex shrink-0 items-center gap-3 sm:gap-4">
            <span className="font-[family-name:var(--font-space-mono)] text-[9px] uppercase tracking-[0.3em] text-[#FFF8DC]/40 sm:text-[10px]">
              {categoria.artistas.length} nominados
            </span>
            {mostrarVerTodos && (
              <button
                onClick={() => setVerTodos(true)}
                className="border border-[#FFF8DC]/20 px-2.5 py-1.5 font-[family-name:var(--font-space-mono)] text-[9px] uppercase tracking-widest text-[#FFF8DC]/70 transition-colors hover:border-[#FF3300] hover:text-[#FF3300] sm:px-3 sm:text-[10px]"
              >
                Ver todos
              </button>
            )}
          </div>
        </div>

        {/* Carrusel */}
        <Carousel opts={{ align: "start", dragFree: true }} className="px-0">
          <CarouselContent className="-ml-3 sm:-ml-4 lg:-ml-5 xl:-ml-6">
            {categoria.artistas.map((a) => {
              return (
                <CarouselItem key={a.id} className="basis-[85%] pl-3 xs:basis-[70%] sm:basis-1/2 sm:pl-4 lg:basis-1/3 lg:pl-5 xl:basis-1/4 xl:pl-6">
                  <VotingCard 
                    artista={a} 
                    selected={voto === a.id} 
                    onVote={() => onVote(a.id)}
                    usePosterFrame={usePoster}
                    posterImage={posterImage}
                  />
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="hidden rounded-none border-[#FFF8DC]/20 bg-black text-[#FFF8DC] hover:bg-[#5A001A] hover:text-[#FFF8DC] lg:flex" />
          <CarouselNext className="hidden rounded-none border-[#FFF8DC]/20 bg-black text-[#FFF8DC] hover:bg-[#5A001A] hover:text-[#FFF8DC] lg:flex" />
        </Carousel>
      </div>

      <VerTodosDialog
        categoria={categoria}
        votoActual={voto}
        onVote={(id) => { onVote(id); }}
        open={verTodos}
        onOpenChange={setVerTodos}
        posterImage={posterImage}
      />
    </section>
  );
}

/* ──────────────────────────────────────────────
   Página
────────────────────────────────────────────── */
export default function VotacionCircoPage() {
  // votos: { [categoriaId]: artistaId }
  const [votos, setVotos] = useState<Record<string, string>>({});
  const [activeCat, setActiveCat] = useState(CATEGORIAS[0].id);
  const [search, setSearch] = useState(false);
  const [catMenuOpen, setCatMenuOpen] = useState(false);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const totalCategorias = CATEGORIAS.length;
  const totalVotos = Object.keys(votos).length;

  const registerRef = (id: string, el: HTMLElement | null) => {
    sectionRefs.current[id] = el;
  };

  const vote = (categoriaId: string, artistaId: string) => {
    setVotos((v) => ({ ...v, [categoriaId]: artistaId }));
  };

  const scrollToCat = (id: string) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
    setCatMenuOpen(false);
  };

  // Scroll-spy
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveCat(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    Object.values(sectionRefs.current).forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Atajo ⌘K / Ctrl+K
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearch((s) => !s);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Lista plana para la búsqueda global
  const flat = useMemo(
    () => CATEGORIAS.flatMap((c) => c.artistas.map((a) => ({ ...a, catId: c.id, catTitulo: c.titulo }))),
    []
  );

  return (
    <main
      className="relative min-h-screen pb-32 text-[#FFF8DC] sm:pb-28 lg:pb-24"
      style={{
        backgroundImage:
          "radial-gradient(circle at 50% 0%, rgba(90,0,26,0.18), transparent 55%), url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
      }}
    >
      <InkFilters />

      {/* ===== VIDEO DE FONDO (silenciado · loop · opacidad baja) ===== */}
      <div className="fixed inset-0 -z-10 bg-black">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="h-full w-full object-cover opacity-40"
        >
          <source src="/votacion-circo/fondo.mp4" type="video/mp4" />
          <source src="/votacion-circo/fondo.webm" type="video/webm" />
        </video>
        {/* Capa oscura para mantener la vibra y la legibilidad */}
        <div className="absolute inset-0 bg-black/50" />
        {/* Viñeta sutil burdeos */}
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(120% 90% at 50% 0%, rgba(90,0,26,0.15), transparent 60%)" }}
        />
      </div>

      {/* ===== HEADER ===== */}
      <header className="sticky top-0 z-50 border-b-2 border-[#FF3300]/60 bg-black/90 backdrop-blur-md shadow-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="font-[family-name:var(--font-archivo)] text-sm font-extrabold uppercase tracking-tight text-[#FFF8DC] sm:text-base lg:text-lg">
              CIRCVS<span className="text-[#FF3300]">.</span>
            </span>

            {/* Dropdown de categorías — móvil y tablet */}
            <div className="relative lg:hidden">
              <button
                onClick={() => setCatMenuOpen(!catMenuOpen)}
                className="flex items-center gap-1.5 border border-[#FFF8DC]/20 px-2.5 py-1.5 font-[family-name:var(--font-space-mono)] text-[9px] uppercase tracking-widest text-[#FFF8DC]/70 transition-colors hover:border-[#FF3300] hover:text-[#FFF8DC] sm:gap-2 sm:px-3 sm:py-2 sm:text-[10px]"
              >
                <span className="hidden sm:inline">Categorías</span>
                <span className="sm:hidden">Cat</span>
                <ChevronDown className={`size-3 transition-transform sm:size-3.5 ${catMenuOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Dropdown menu */}
              {catMenuOpen && (
                <>
                  {/* Overlay para cerrar */}
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setCatMenuOpen(false)}
                  />
                  {/* Menu */}
                  <div className="absolute left-0 top-full z-50 mt-2 w-64 border border-[#5A001A] bg-black/98 backdrop-blur-md shadow-2xl sm:w-72">
                    <div className="max-h-[70vh] overflow-y-auto [scrollbar-width:thin] [scrollbar-color:#5A001A_transparent]">
                      {CATEGORIAS.map((c) => (
                        <button
                          key={c.id}
                          onClick={() => scrollToCat(c.id)}
                          className={`flex w-full items-center justify-between border-b border-[#5A001A]/40 px-4 py-3 text-left transition-colors last:border-b-0 hover:bg-[#5A001A]/30 sm:px-5 sm:py-3.5 ${
                            activeCat === c.id ? "bg-[#5A001A]/20" : ""
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="font-[family-name:var(--font-space-mono)] text-[10px] text-[#FF3300]">
                              {c.index}
                            </span>
                            <span className="font-[family-name:var(--font-archivo)] text-xs font-bold uppercase tracking-tight text-[#FFF8DC] sm:text-sm">
                              {c.titulo}
                            </span>
                          </div>
                          {votos[c.id] && (
                            <span className="text-[10px] text-[#FF3300]">●</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <button
            onClick={() => setSearch(true)}
            className="flex items-center gap-1.5 border border-[#FFF8DC]/20 px-2.5 py-1.5 font-[family-name:var(--font-space-mono)] text-[9px] uppercase tracking-widest text-[#FFF8DC]/50 transition-colors hover:border-[#FF3300] hover:text-[#FFF8DC] sm:gap-2 sm:px-3 sm:py-2 sm:text-[10px] lg:gap-3 lg:px-4 lg:text-[11px]"
          >
            <Search className="size-3 sm:size-3.5" />
            <span className="hidden sm:inline">Buscar</span>
            <span className="hidden rounded-sm border border-[#FFF8DC]/20 px-1.5 py-0.5 text-[9px] lg:inline">⌘K</span>
          </button>
        </div>
      </header>

      {/* ===== ÍNDICE VERTICAL LATERAL DERECHO (scroll-spy) — desktop ===== */}
      <nav className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-2.5 lg:flex">
        {CATEGORIAS.map((c) => {
          const active = activeCat === c.id;
          const voted = !!votos[c.id];
          return (
            <button
              key={c.id}
              onClick={() => scrollToCat(c.id)}
              className="group flex items-center justify-end gap-3"
            >
              <span
                className={`font-[family-name:var(--font-space-mono)] text-[10px] uppercase tracking-widest transition-all duration-300 ${
                  active
                    ? "text-[#FFF8DC]"
                    : "text-[#FFF8DC]/35 group-hover:text-[#FFF8DC]/70"
                }`}
              >
                {c.titulo}
              </span>
              {voted && <span className="text-[8px] text-[#FF3300]">●</span>}
              <span
                className={`h-px transition-all duration-300 ${
                  active ? "w-8 bg-[#FF3300]" : "w-4 bg-[#FFF8DC]/25 group-hover:w-6"
                }`}
              />
            </button>
          );
        })}
      </nav>

      {/* ===== HERO ===== */}
      <section className="px-4 pt-12 pb-10 text-center sm:px-6 sm:pt-16 sm:pb-14 lg:pt-20 lg:pb-16 lg:pr-52 xl:pt-24">
        <span className="font-[family-name:var(--font-space-mono)] text-[9px] uppercase tracking-[0.35em] text-[#C9A227] sm:text-[10px] sm:tracking-[0.4em] lg:text-xs">
          Gala anual · Edición IV
        </span>
        <h1
          className="mx-auto mt-4 max-w-5xl font-[family-name:var(--font-archivo)] text-3xl font-black uppercase leading-[0.9] tracking-tight text-[#FFF8DC] sm:mt-5 sm:text-5xl md:text-6xl lg:mt-6 lg:text-7xl xl:text-8xl"
          style={{ filter: "url(#ink-bleed-strong)" }}
        >
          Vota a las
          <br />
          leyendas del circo
        </h1>
        <p className="mx-auto mt-5 max-w-xl px-4 text-xs font-light leading-relaxed tracking-wide text-[#FFF8DC]/60 sm:mt-6 sm:px-0 sm:text-sm lg:mt-8 lg:text-base xl:text-lg">
          Elige a tu favorito en cada categoría y sella tu voto.
        </p>
      </section>

      {/* ===== CATEGORÍAS ===== */}
      {CATEGORIAS.map((c) => (
        <CategoriaRow
          key={c.id}
          categoria={c}
          voto={votos[c.id] ?? null}
          onVote={(artistaId) => vote(c.id, artistaId)}
          registerRef={registerRef}
        />
      ))}

      {/* ===== BARRA STICKY "MI VOTO" ===== */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t-2 border-[#FF3300]/60 bg-black/90 backdrop-blur-md shadow-[0_-4px_20px_rgba(255,51,0,0.15)]">
        <div className="mx-auto flex max-w-7xl flex-col items-stretch justify-between gap-3 px-4 py-3 sm:flex-row sm:items-center sm:gap-4 sm:px-6 sm:py-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="font-[family-name:var(--font-space-mono)] text-[9px] uppercase tracking-[0.25em] text-[#FFF8DC]/50 sm:text-[10px] sm:tracking-[0.3em]">
              Mi voto
            </span>
            <div className="flex flex-1 gap-1 sm:flex-none">
              {CATEGORIAS.map((c) => (
                <span
                  key={c.id}
                  title={c.titulo}
                  className={`h-1.5 w-full sm:w-6 ${votos[c.id] ? "bg-[#FF3300]" : "bg-[#FFF8DC]/15"}`}
                />
              ))}
            </div>
            <span className="font-[family-name:var(--font-space-mono)] text-xs text-[#C9A227] sm:text-sm">
              {totalVotos}/{totalCategorias}
            </span>
          </div>

          <Button
            disabled={totalVotos === 0}
            className="h-auto w-full rounded-none border-0 bg-[#FFF8DC] px-4 py-2.5 font-[family-name:var(--font-archivo)] text-xs font-extrabold uppercase tracking-[0.15em] text-black hover:bg-white disabled:opacity-40 sm:w-auto sm:px-6 sm:py-3 sm:text-sm sm:tracking-[0.2em]"
          >
            {totalVotos === totalCategorias ? "Confirmar votos" : "Sellar votos"}
          </Button>
        </div>
      </div>

      {/* ===== BÚSQUEDA GLOBAL ⌘K ===== */}
      <CommandDialog
        open={search}
        onOpenChange={setSearch}
        title="Buscar artista"
        description="Encuentra a tu nominado favorito"
        className="!bg-black !text-[#FFF8DC] rounded-none border-[#5A001A] [&_[cmdk-group-heading]]:font-[family-name:var(--font-space-mono)] [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.3em] [&_[cmdk-group-heading]]:text-[#FF3300] [&_[cmdk-group]]:border-t [&_[cmdk-group]]:border-[#5A001A]/40 [&_[cmdk-group]]:first:border-t-0 [&_[data-slot=command-input-wrapper]]:border-[#5A001A]/40 [&_[data-slot=command-input-wrapper]]:h-14 [&_[data-slot=command-input-wrapper]_svg]:text-[#FFF8DC]/50 [&_[data-slot=command]]:!bg-black"
      >
        <CommandInput 
          placeholder="Escribe el nombre de un artista…" 
          className="h-14 font-[family-name:var(--font-space-mono)] text-sm !text-[#FFF8DC] placeholder:!text-[#FFF8DC]/30"
        />
        <CommandList className="max-h-[60vh] !bg-black [scrollbar-width:thin] [scrollbar-color:#5A001A_transparent]">
          <CommandEmpty className="py-12 font-[family-name:var(--font-space-mono)] text-xs uppercase tracking-[0.3em] !text-[#FFF8DC]/40">
            Sin resultados.
          </CommandEmpty>
          {CATEGORIAS.map((c) => (
            <CommandGroup key={c.id} heading={c.titulo} className="px-3 py-2">
              {flat
                .filter((a) => a.catId === c.id)
                .map((a) => (
                  <CommandItem
                    key={a.id}
                    value={`${a.nombre} ${a.catTitulo}`}
                    onSelect={() => {
                      vote(a.catId, a.id);
                      setSearch(false);
                      setTimeout(() => scrollToCat(a.catId), 80);
                    }}
                    className="gap-3 rounded-none border-b border-[#5A001A]/20 px-3 py-3 last:border-b-0 data-[selected=true]:!bg-[#5A001A]/30 data-[selected=true]:!text-[#FFF8DC]"
                  >
                    <span className="flex-1 font-[family-name:var(--font-archivo)] text-sm font-bold uppercase leading-tight tracking-tight !text-[#FFF8DC]">
                      {a.nombre}
                    </span>
                    <span className="font-[family-name:var(--font-space-mono)] text-[9px] uppercase tracking-[0.2em] !text-[#FFF8DC]/50">
                      {a.disciplina}
                    </span>
                    {votos[a.catId] === a.id && (
                      <span className="text-[10px] text-[#FF3300]">●</span>
                    )}
                  </CommandItem>
                ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </main>
  );
}

// Force rebuild 2026-06-07 22:25:46
