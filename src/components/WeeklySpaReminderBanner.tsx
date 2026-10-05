import React from 'react'
import { Sparkles, X, ArrowRight, Heart } from 'lucide-react'
import { useGame } from '../context/GameContext'

interface WeeklySpaReminderBannerProps {
  onOpenSpa: () => void
  className?: string
}

export const WeeklySpaReminderBanner: React.FC<WeeklySpaReminderBannerProps> = ({
  onOpenSpa,
  className = '',
}) => {
  const { hasCompletedSpaThisWeek, isSpaReminderDismissedThisWeek, dismissSpaReminder } = useGame()

  // Se já concluiu o spa da semana ou já dispensou nesta semana, não exibir
  if (hasCompletedSpaThisWeek || isSpaReminderDismissedThisWeek) {
    return null
  }

  return (
    <div
      role="region"
      aria-label="Lembrança gentil do Spa da Semana"
      className={`relative overflow-hidden rounded-2xl border border-[#D4AF37]/40 bg-gradient-to-r from-[#201A10] via-[#1A1610] to-[#12110D] p-4 text-white shadow-lg ${className}`}
    >
      {/* Detalhes luminosos suaves no fundo */}
      <div
        className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-[#D4AF37]/15 blur-2xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute left-1/3 -top-6 w-20 h-20 rounded-full bg-[#D4AF37]/10 blur-xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Botão de dispensar */}
      <button
        type="button"
        onClick={dismissSpaReminder}
        className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/5 hover:bg-white/15 text-neutral-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
        aria-label="Dispensar lembrança do Spa nesta semana"
        title="Dispensar nesta semana"
      >
        <X className="w-3.5 h-3.5" />
      </button>

      <div className="flex items-start gap-3 pr-6">
        {/* Ícone Acolhedor */}
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37]/30 to-[#997B24]/20 border border-[#D4AF37]/50 flex items-center justify-center shrink-0 shadow-sm mt-0.5">
          <Sparkles className="w-5 h-5 text-[#D4AF37]" />
        </div>

        <div className="space-y-1.5 flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/30 text-[10px] font-semibold uppercase tracking-wider text-[#F1E5C8]">
              <Heart className="w-2.5 h-2.5 text-[#D4AF37] fill-[#D4AF37]" />
              Momento de Cuidado
            </span>
            <span className="text-[11px] text-[#A69980]">Sem pressa, no seu tempo</span>
          </div>

          <h3 className="font-serif text-sm font-bold text-white leading-snug">
            Uma nova semana começou 🌿
          </h3>

          <p className="text-xs text-[#E6DCB8] leading-relaxed">
            Seu spa capilar te espera quando você quiser. Reserve um respiro tranquilo com massagem,
            óleo e o carinho que seus fios merecem — sem pressões nem cobranças.
          </p>

          <div className="pt-2 flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={onOpenSpa}
              className="min-h-[38px] px-4 rounded-xl bg-[#D4AF37] hover:bg-[#B8962E] text-black font-bold text-xs inline-flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
            >
              <span>Abrir Spa da Semana</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>

            <button
              type="button"
              onClick={dismissSpaReminder}
              className="min-h-[38px] px-3 rounded-xl border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white font-medium text-xs transition-colors cursor-pointer"
            >
              Lembrar depois
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
