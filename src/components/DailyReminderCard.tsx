import React from 'react'
import { Sparkles, ArrowRight, CheckCircle2, X, CalendarCheck } from 'lucide-react'

import { useGame } from '@/context/GameContext'
import { getAdaptedCareProfile } from '@/lib/adaptedCare'

interface DailyReminderCardProps {
  hasCompletedToday: boolean
  isDismissed: boolean
  onDismiss: () => void
  onGoToMissions: () => void
}

export const DailyReminderCard: React.FC<DailyReminderCardProps> = ({
  hasCompletedToday,
  isDismissed,
  onDismiss,
  onGoToMissions,
}) => {
  const { journey } = useGame()
  const careTip = React.useMemo(() => {
    return getAdaptedCareProfile(
      journey.hairTexture,
      journey.avatarId,
      journey.skinTone,
      journey.hairLength,
    )
  }, [journey.hairTexture, journey.avatarId, journey.skinTone, journey.hairLength])

  // Se o usuário dispensou hoje, não renderiza nada
  if (isDismissed) {
    return null
  }

  // Se já concluiu um ritual hoje: card celebrativo com check dourado
  if (hasCompletedToday) {
    return (
      <div
        role="region"
        aria-label="Lembrete de ritual diário concluído"
        className="relative overflow-hidden rounded-2xl border border-[#D4AF37] bg-gradient-to-r from-[#201C12] via-[#1A1813] to-[#121212] p-4 shadow-[0_4px_20px_rgba(212,175,55,0.18)] animate-fade-in"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] shrink-0 shadow-[0_0_12px_rgba(212,175,55,0.35)]">
              <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div className="space-y-0.5 text-left">
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-sm text-white">Dia Concluído</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#D4AF37] text-black font-extrabold uppercase tracking-wide">
                  Ritual de Hoje
                </span>
              </div>
              <p className="text-xs text-[#EAE0CB]">
                Você já cuidou de si hoje! Parabéns pela dedicação aos seus fios.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onDismiss}
            className="w-7 h-7 rounded-lg text-white/50 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors shrink-0"
            aria-label="Dispensar lembrete de hoje"
            title="Dispensar lembrete"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    )
  }

  // Estado convidativo: ritual ainda não realizado hoje
  return (
    <div
      role="region"
      aria-label="Lembrete diário de autocuidado"
      className="relative overflow-hidden rounded-2xl border-2 border-[#D4AF37] bg-gradient-to-br from-[#2B2313] via-[#1E1911] to-[#121212] p-4 shadow-[0_4px_24px_rgba(212,175,55,0.25)] animate-fade-in text-left"
    >
      {/* Brilho dourado decorativo */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/15 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-start justify-between gap-2 relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-[#D4AF37] text-black flex items-center justify-center shrink-0 shadow-sm">
            <Sparkles className="w-4 h-4 stroke-[2.5]" />
          </div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#F1E5C8]">
            Lembrete Diário
          </span>
        </div>

        <button
          type="button"
          onClick={onDismiss}
          className="w-7 h-7 rounded-lg text-white/60 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors"
          aria-label="Dispensar lembrete de hoje"
          title="Dispensar lembrete"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="mt-2 space-y-1.5 relative z-10">
        <h3 className="font-serif text-base font-bold text-white flex items-center gap-1.5">
          <span>Seu ritual de hoje te espera</span>
          <span className="text-[#D4AF37]">✨</span>
        </h3>
        <p className="text-xs text-[#E8DAC3] leading-relaxed">
          Reserve alguns minutos para você. Conecte-se com sua beleza, aprenda um novo acabamento e
          conquiste suas estrelas.
        </p>
        <div className="rounded-xl border border-[#D4AF37]/30 bg-black/40 p-2.5 text-left text-[11px] text-[#F1E5C8] space-y-1">
          <p className="font-bold text-[#D4AF37] flex items-center gap-1">
            <span>💡 Cuidado Personalizado ({careTip.title}):</span>
          </p>
          <p className="text-white/90 leading-snug">{careTip.stepsTip}</p>
          <p className="text-[#CBB994] text-[10px] leading-snug">
            <strong>Lavagem & Fios:</strong> {careTip.washTip}
          </p>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-[#D4AF37]/30 flex items-center justify-between relative z-10">
        <span className="text-[11px] text-[#CBB994] flex items-center gap-1">
          <CalendarCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Mantenha sua sequência ativa</span>
        </span>

        <button
          type="button"
          onClick={onGoToMissions}
          className="min-h-[38px] px-3.5 py-1.5 rounded-xl bg-[#D4AF37] hover:bg-[#B8962E] text-[#0D0D0D] font-bold text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
        >
          <span>Ir para Missões</span>
          <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
        </button>
      </div>
    </div>
  )
}
