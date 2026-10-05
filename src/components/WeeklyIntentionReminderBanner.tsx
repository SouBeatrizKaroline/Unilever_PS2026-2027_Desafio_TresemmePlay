import React from 'react'
import { Sparkles } from 'lucide-react'
import { useGame } from '@/context/GameContext'

interface WeeklyIntentionReminderBannerProps {
  className?: string
  compact?: boolean
  onClick?: () => void
}

export const WeeklyIntentionReminderBanner: React.FC<WeeklyIntentionReminderBannerProps> = ({
  className = '',
  compact = false,
  onClick,
}) => {
  const { getCurrentWeekIntention, journey } = useGame()
  const currentWeekIntention = getCurrentWeekIntention()

  if (!currentWeekIntention || !currentWeekIntention.intention.trim()) {
    return null
  }

  const { reducedMotion } = journey

  return (
    <aside
      aria-label="Lembrança da intenção da semana"
      onClick={onClick}
      className={`relative w-full overflow-hidden rounded-2xl border border-[#D4AF37]/35 bg-gradient-to-r from-[#201A10] via-[#171410] to-[#121212] px-3.5 py-2.5 shadow-sm text-left ${
        onClick ? 'cursor-pointer hover:border-[#D4AF37]/60 transition-colors' : ''
      } ${className}`}
    >
      {/* Brilho decorativo sutil de fundo (desabilitado em reduced motion) */}
      {!reducedMotion && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-[#D4AF37]/10 blur-xl"
        />
      )}

      <div className="relative z-10 flex items-center gap-2.5">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-[#D4AF37]/40 bg-[#D4AF37]/15 text-[#D4AF37]">
          <Sparkles className="h-3.5 w-3.5 fill-[#D4AF37]/20" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#D4AF37]">
              Sua intenção desta semana
            </span>
            {currentWeekIntention.weekLabel && !compact && (
              <span className="text-[9px] text-[#A0A0A0]">({currentWeekIntention.weekLabel})</span>
            )}
          </div>
          <p className="font-serif text-xs sm:text-sm font-semibold text-[#F1E5C8] truncate leading-tight mt-0.5">
            "{currentWeekIntention.intention}"
          </p>
        </div>
      </div>
    </aside>
  )
}
