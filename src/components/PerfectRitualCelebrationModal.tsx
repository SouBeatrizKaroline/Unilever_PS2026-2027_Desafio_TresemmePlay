import React from 'react'
import {
  Sparkles,
  Share2,
  Award,
  Heart,
  CheckCircle2,
  Wind,
  BookOpen,
  Crown,
  X,
} from 'lucide-react'

export interface PerfectRitualCelebrationModalProps {
  isOpen: boolean
  onClose: () => void
  dateDisplay: string
  onShare?: () => void
  reducedMotion?: boolean
}

export const PerfectRitualCelebrationModal: React.FC<PerfectRitualCelebrationModalProps> = ({
  isOpen,
  onClose,
  dateDisplay,
  onShare,
  reducedMotion = false,
}) => {
  if (!isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="perfect-ritual-celebration-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-3xl border border-[#D4AF37] bg-gradient-to-b from-[#241E11] via-[#181611] to-[#121212] p-5 text-white shadow-[0_0_40px_rgba(212,175,55,0.4)] text-center space-y-4 animate-scale-in relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Luz ambiente de celebração dourada (sem confetes caóticos se reducedMotion) */}
        <div
          className={`absolute top-0 left-1/2 -translate-x-1/2 w-56 h-36 bg-[#D4AF37]/25 rounded-full blur-3xl pointer-events-none ${
            reducedMotion ? '' : 'animate-pulse'
          }`}
        />

        {/* Botão fechar */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors z-10"
          aria-label="Fechar celebração de Ritual Perfeito"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Distintivo de Topo */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37] text-black text-[11px] font-black uppercase tracking-wider shadow-md relative z-10">
          <Crown className="w-3.5 h-3.5" />
          <span>Ritual Perfeito Conquistado!</span>
        </div>

        {/* Ilustração / Medalha SVG do Ritual Perfeito */}
        <div className="relative py-2 flex justify-center z-10">
          <div className="relative">
            <svg
              viewBox="0 0 120 120"
              className="w-28 h-28 relative drop-shadow-[0_0_24px_rgba(212,175,55,0.7)]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Medalha Dourada de Ritual Perfeito"
            >
              {/* Fitas do topo */}
              <path
                d="M42 8 L60 22 L78 8 L86 38 L34 38 Z"
                fill="#997B20"
                stroke="#D4AF37"
                strokeWidth="1"
              />
              <path d="M46 8 L60 18 L74 8 L80 34 L40 34 Z" fill="#D4AF37" />
              {/* Aro solar dourado */}
              <circle cx="60" cy="70" r="44" fill="#1C1810" stroke="#D4AF37" strokeWidth="3" />
              <circle
                cx="60"
                cy="70"
                r="37"
                stroke="#F1E5C8"
                strokeWidth="1.2"
                strokeDasharray="2 3"
              />
              {/* Círculo central */}
              <circle cx="60" cy="70" r="24" fill="#292014" stroke="#D4AF37" strokeWidth="1.5" />
              {/* Raios de luz e respiração */}
              <path
                d="M60 52 L60 88 M42 70 L78 70 M47 57 L73 83 M47 83 L73 57"
                stroke="#D4AF37"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.75"
              />
              <circle cx="60" cy="70" r="8" fill="#D4AF37" />
              <circle cx="60" cy="70" r="4" fill="#FFFFFF" />
              {/* Ramos dourados */}
              <path
                d="M30 72 C30 87 43 98 60 98 C77 98 90 87 90 72"
                stroke="#D4AF37"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="3 3"
              />
            </svg>
            <span className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#10B981] text-white flex items-center justify-center font-bold text-xs ring-2 ring-[#121212] shadow">
              ✓
            </span>
          </div>
        </div>

        {/* Textos da Celebração */}
        <div className="space-y-1.5 relative z-10">
          <h2
            id="perfect-ritual-celebration-title"
            className="font-serif text-xl font-bold text-white"
          >
            Tríade Completa do Dia!
          </h2>
          <p className="text-xs text-[#E6DCB8] leading-relaxed max-w-xs mx-auto">
            Você harmonizou cuidado capilar, pausa guiada de respiração e reflexão no diário no
            mesmo dia ({dateDisplay}).
          </p>
        </div>

        {/* 3 Pilares Cumpridos */}
        <div className="rounded-2xl border border-[#D4AF37]/35 bg-[#171410] p-3 space-y-2 text-left relative z-10">
          <div className="flex items-center gap-2.5 text-xs text-white">
            <span className="w-5 h-5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </span>
            <span>Ritual ou Missão capilar concluída</span>
          </div>

          <div className="flex items-center gap-2.5 text-xs text-white">
            <span className="w-5 h-5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center shrink-0">
              <Wind className="w-3.5 h-3.5" />
            </span>
            <span>Pausa consciente de respiração guiada</span>
          </div>

          <div className="flex items-center gap-2.5 text-xs text-white">
            <span className="w-5 h-5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center shrink-0">
              <BookOpen className="w-3.5 h-3.5" />
            </span>
            <span>Nota reflexiva no diário de autocuidado</span>
          </div>
        </div>

        {/* Recompensa e Ações */}
        <div className="pt-2 space-y-2 relative z-10">
          {onShare && (
            <button
              type="button"
              onClick={onShare}
              className="w-full min-h-[46px] rounded-xl bg-[#D4AF37] hover:bg-[#B8962E] text-black font-bold text-xs transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-2"
            >
              <Share2 className="w-4 h-4 stroke-[2.5]" />
              <span>Compartilhar Conquista</span>
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            className="w-full min-h-[42px] rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white font-medium text-xs transition-colors"
          >
            Continuar Cuidando de Mim
          </button>
        </div>
      </div>
    </div>
  )
}
