import React from 'react'
import { Heart, Sparkles, Calendar, TrendingUp } from 'lucide-react'
import type { WeeklyIntention } from '@/types/game'

interface IntentionsStatsBlockProps {
  intentions: WeeklyIntention[]
  onOpenMural?: () => void
}

export const IntentionsStatsBlock: React.FC<IntentionsStatsBlockProps> = ({
  intentions = [],
  onOpenMural,
}) => {
  const totalWeeksWithIntention = intentions.length

  // Agrupamento por palavra/intenção (normalizando espaços e case para agrupar contagens)
  const countMap: Record<string, { label: string; count: number }> = {}
  intentions.forEach((item) => {
    const raw = item.intention.trim()
    if (!raw) return
    const key = raw.toLowerCase()
    if (!countMap[key]) {
      countMap[key] = { label: raw, count: 0 }
    }
    countMap[key].count += 1
  })

  // Lista ordenada descrescente por número de semanas
  const sortedDistribution = Object.values(countMap).sort((a, b) => b.count - a.count)
  const topIntention = sortedDistribution[0]

  return (
    <div className="rounded-2xl border border-[#D4AF37]/35 bg-[#171717] p-4 space-y-3.5 text-left relative overflow-hidden">
      {/* Luz ambiente de fundo */}
      <div className="absolute top-0 right-0 w-36 h-24 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none" />

      {/* Cabeçalho do Bloco */}
      <div className="flex items-center justify-between gap-2 relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/35 flex items-center justify-center text-[#D4AF37]">
            <Heart className="w-4 h-4 fill-current text-[#D4AF37]" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-sm text-white">Estatísticas de Intenções</h3>
            <p className="text-[11px] text-[#A0A0A0]">Propósitos e palavras que guiam seus dias</p>
          </div>
        </div>

        {totalWeeksWithIntention > 0 && (
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#F1E5C8] font-bold">
            {totalWeeksWithIntention} {totalWeeksWithIntention === 1 ? 'semana' : 'semanas'}
          </span>
        )}
      </div>

      {totalWeeksWithIntention === 0 ? (
        /* Estado vazio acolhedor */
        <div className="rounded-xl border border-dashed border-[#D4AF37]/30 bg-[#1A1813]/40 p-4 text-center space-y-2 relative z-10">
          <div className="w-10 h-10 mx-auto rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
            <Sparkles className="w-5 h-5" />
          </div>
          <p className="font-serif text-xs font-bold text-white">
            Nenhuma intenção registrada ainda
          </p>
          <p className="text-[11px] text-[#B3B3B3] leading-relaxed max-w-xs mx-auto">
            Defina sua primeira intenção no mural ou no Spa da Semana para ver a constância das suas
            palavras favoritas aqui.
          </p>
          {onOpenMural && (
            <button
              type="button"
              onClick={onOpenMural}
              className="mt-1 min-h-[32px] px-3 rounded-lg bg-[#D4AF37]/20 hover:bg-[#D4AF37]/30 text-[#F1E5C8] text-xs font-semibold inline-flex items-center gap-1 transition-colors border border-[#D4AF37]/40 cursor-pointer"
            >
              <span>Definir no Mural</span>
              <span>→</span>
            </button>
          )}
        </div>
      ) : (
        /* Estatísticas preenchidas */
        <div className="space-y-3 relative z-10">
          {/* Card Resumo: Total e Palavra mais escolhida */}
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-xl border border-white/5 bg-black/40 p-2.5 space-y-0.5">
              <span className="text-[9px] uppercase font-bold text-[#888888] tracking-wider block">
                Semanas com Intenção
              </span>
              <div className="flex items-baseline gap-1">
                <span className="font-serif text-xl font-black text-[#D4AF37]">
                  {totalWeeksWithIntention}
                </span>
                <span className="text-[10px] text-white/70">
                  {totalWeeksWithIntention === 1 ? 'semana' : 'semanas'}
                </span>
              </div>
            </div>

            <div className="rounded-xl border border-white/5 bg-black/40 p-2.5 space-y-0.5">
              <span className="text-[9px] uppercase font-bold text-[#888888] tracking-wider block">
                Mais Escolhida
              </span>
              <p className="font-serif text-xs font-bold text-[#F1E5C8] truncate">
                {topIntention ? `“${topIntention.label}”` : '—'}
              </p>
              {topIntention && (
                <p className="text-[9px] text-[#D4AF37] font-mono">
                  {topIntention.count} {topIntention.count === 1 ? 'semana' : 'semanas'}
                </p>
              )}
            </div>
          </div>

          {/* Distribuição por Palavra (Ordenada desc) */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between text-[10px] uppercase font-bold text-[#A0A0A0] tracking-wider">
              <span className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-[#D4AF37]" />
                <span>Distribuição por Palavra</span>
              </span>
              <span>Frequência</span>
            </div>

            <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
              {sortedDistribution.map((item, idx) => {
                const percent = Math.min(
                  100,
                  Math.round((item.count / totalWeeksWithIntention) * 100),
                )
                return (
                  <div
                    key={item.label}
                    className="p-2 rounded-xl border border-white/5 bg-[#141414] space-y-1 text-xs"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="w-4 h-4 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-[10px] font-bold flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <span className="font-semibold text-white truncate">“{item.label}”</span>
                      </div>
                      <span className="text-[11px] font-mono font-bold text-[#D4AF37] shrink-0">
                        {item.count} {item.count === 1 ? 'sem' : 'sems'}
                      </span>
                    </div>

                    {/* Barra de Frequência Relativa */}
                    <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F1E5C8] transition-all duration-500"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
