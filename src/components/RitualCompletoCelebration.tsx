import React from 'react'
import { Award, Sparkles, CheckCircle2, ChevronRight, Share2 } from 'lucide-react'

interface RitualCompletoCelebrationProps {
  onClose: () => void
  onShare?: () => void
}

export const RitualCompletoCelebration: React.FC<RitualCompletoCelebrationProps> = ({
  onClose,
  onShare,
}) => {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="ritual-completo-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fade-in"
    >
      {/* Confete SVG dourado de celebração máxima */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <svg className="w-full h-full" viewBox="0 0 400 600" fill="none">
          {/* Confetes circulares */}
          <circle cx="50" cy="70" r="4.5" fill="#D4AF37" opacity="0.85" />
          <circle cx="130" cy="120" r="3.5" fill="#F1E5C8" opacity="0.9" />
          <circle cx="210" cy="80" r="5" fill="#D4AF37" opacity="0.9" />
          <circle cx="290" cy="110" r="4" fill="#FFFFFF" opacity="0.8" />
          <circle cx="350" cy="65" r="3.5" fill="#D4AF37" opacity="0.85" />
          <circle cx="80" cy="180" r="3" fill="#F1E5C8" opacity="0.75" />
          <circle cx="320" cy="170" r="4" fill="#D4AF37" opacity="0.8" />
          {/* Fitas / Confetes retangulares girados */}
          <rect
            x="70"
            y="230"
            width="9"
            height="4.5"
            rx="2"
            fill="#D4AF37"
            transform="rotate(30 70 230)"
          />
          <rect
            x="320"
            y="250"
            width="9"
            height="4.5"
            rx="2"
            fill="#F1E5C8"
            transform="rotate(-25 320 250)"
          />
          <rect
            x="190"
            y="290"
            width="8"
            height="4"
            rx="2"
            fill="#D4AF37"
            transform="rotate(18 190 290)"
          />
          <rect
            x="45"
            y="340"
            width="8"
            height="4"
            rx="2"
            fill="#FFFFFF"
            transform="rotate(-35 45 340)"
          />
          <rect
            x="340"
            y="370"
            width="9"
            height="4.5"
            rx="2"
            fill="#D4AF37"
            transform="rotate(40 340 370)"
          />
        </svg>
      </div>

      <div className="w-full max-w-sm rounded-3xl border-2 border-[#D4AF37] bg-gradient-to-b from-[#1C1C1C] via-[#141414] to-[#0A0A0A] p-6 text-center text-white shadow-[0_0_50px_rgba(212,175,55,0.4)] space-y-5 animate-scale-in relative z-10">
        {/* Selo Topo */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] text-[#D4AF37] text-xs font-bold uppercase tracking-wider shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Conquista Especial Desbloqueada</span>
        </div>

        {/* Medalha SVG "Ritual Completo" */}
        <div className="relative py-2 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-28 h-28 rounded-full bg-[#D4AF37]/20 blur-xl animate-pulse" />
          </div>

          <svg
            viewBox="0 0 120 120"
            className="w-28 h-28 relative drop-shadow-[0_0_20px_rgba(212,175,55,0.6)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Medalha Ritual Completo TRESemmé"
          >
            {/* Fita superior */}
            <path
              d="M44 10 L60 26 L76 10 L84 40 L36 40 Z"
              fill="#8A6E1E"
              stroke="#D4AF37"
              strokeWidth="1"
            />
            <path d="M48 10 L60 22 L72 10 L78 36 L42 36 Z" fill="#D4AF37" />

            {/* Aro externo dourado chanfrado */}
            <circle cx="60" cy="70" r="44" fill="#1A1A1A" stroke="#D4AF37" strokeWidth="3" />
            <circle
              cx="60"
              cy="70"
              r="38"
              stroke="#F1E5C8"
              strokeWidth="1.2"
              strokeDasharray="3 3"
            />
            <circle cx="60" cy="70" r="32" fill="#242424" stroke="#D4AF37" strokeWidth="1.5" />

            {/* Coroa e estrelas da vitória */}
            <path
              d="M45 78 L49 60 L60 67 L71 60 L75 78 Z"
              fill="#D4AF37"
              stroke="#F1E5C8"
              strokeWidth="1"
            />
            <circle cx="49" cy="58" r="2.5" fill="#FFFFFF" />
            <circle cx="60" cy="65" r="3" fill="#FFFFFF" />
            <circle cx="71" cy="58" r="2.5" fill="#FFFFFF" />

            {/* Triunfo / Ramos de louro estilizados */}
            <path
              d="M32 70 C32 85 45 98 60 98 C75 98 88 85 88 70"
              stroke="#D4AF37"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="4 3"
            />
          </svg>
        </div>

        {/* Título & Descrição */}
        <div className="space-y-1.5">
          <h2 id="ritual-completo-title" className="font-serif text-2xl font-extrabold text-white">
            Ritual Completo!
          </h2>
          <p className="text-xs text-[#F1E5C8] font-medium leading-relaxed">
            Parabéns! Você concluiu todos os 3 rituais de penteado do TRESemmé Play.
          </p>
          <p className="text-[11px] text-[#A0A0A0]">
            Trança simples, Coque elegante e Ondas naturais dominados com excelência de salão.
          </p>
        </div>

        {/* Resumo dos 3 Rituais */}
        <div className="rounded-2xl border border-[#D4AF37]/30 bg-[#171717] p-3 text-left space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-[#D4AF37]">
            <span>Missões Concluídas</span>
            <span className="font-mono text-white">3 de 3</span>
          </div>
          <div className="space-y-1.5 text-xs text-[#E0E0E0]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#81C784]" />
              <span>Trança simples (+50 pts)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#81C784]" />
              <span>Coque elegante (+60 pts)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#81C784]" />
              <span>Ondas naturais (+70 pts)</span>
            </div>
          </div>
        </div>

        {/* Ações */}
        <div className="space-y-2.5 pt-1">
          {onShare && (
            <button
              type="button"
              onClick={onShare}
              className="w-full min-h-[48px] rounded-2xl bg-[#D4AF37] hover:bg-[#B8962E] text-[#0D0D0D] font-bold text-sm transition-all shadow-[0_4px_16px_rgba(212,175,55,0.3)] flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              <Share2 className="w-4 h-4 stroke-[2.5]" />
              <span>Compartilhar Conquista Máxima</span>
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            className="w-full min-h-[46px] rounded-2xl border border-white/20 bg-transparent hover:bg-white/5 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Ver no meu Perfil</span>
            <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
          </button>
        </div>
      </div>
    </div>
  )
}
