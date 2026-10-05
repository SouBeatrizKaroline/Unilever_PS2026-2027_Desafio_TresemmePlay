import React from 'react'
import { Award, Calendar, Layers, Lock, Sparkles, Share2 } from 'lucide-react'
import type { AchievementType } from './AchievementCelebrationModal'

export interface AchievementItem {
  id: AchievementType
  title: string
  category: string
  description: string
  requirement: string
  isUnlocked: boolean
  unlockedAt?: string
  progressText: string
  progressPercent: number
  icon: 'award' | 'calendar' | 'layers' | 'sparkles'
}

interface AchievementsSectionProps {
  achievements: AchievementItem[]
  onSelectAchievement: (type: AchievementType) => void
  onShareAchievement?: (item: AchievementItem) => void
}

export const AchievementsSection: React.FC<AchievementsSectionProps> = ({
  achievements,
  onSelectAchievement,
  onShareAchievement,
}) => {
  const unlockedTotal = achievements.filter((a) => a.isUnlocked).length

  return (
    <section aria-labelledby="achievements-heading" className="space-y-3 pt-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-[#D4AF37]" />
          <h2 id="achievements-heading" className="font-serif text-lg font-bold text-white">
            Conquistas
          </h2>
        </div>
        <span className="text-xs font-semibold text-[#D4AF37] bg-[#D4AF37]/10 px-2.5 py-0.5 rounded-full border border-[#D4AF37]/30">
          {unlockedTotal} de {achievements.length} desbloqueadas
        </span>
      </div>

      <p className="text-xs text-[#B3B3B3]">
        Marcos celebrados da sua dedicação ao autocuidado capilar, sem punições ou pressões.
      </p>

      <div className="space-y-3">
        {achievements.map((item) => {
          const isUnlocked = item.isUnlocked

          return (
            <div
              key={item.id}
              className={`rounded-2xl border p-4 transition-all ${
                isUnlocked
                  ? 'border-[#D4AF37] bg-gradient-to-br from-[#221D12] via-[#171717] to-[#121212] shadow-[0_0_24px_rgba(212,175,55,0.18)]'
                  : 'border-white/10 bg-[#141414] opacity-80'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  {/* Ícone ou Medalha */}
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${
                      isUnlocked
                        ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#D4AF37] shadow-[0_0_14px_rgba(212,175,55,0.4)]'
                        : 'bg-white/5 border-white/10 text-white/30'
                    }`}
                  >
                    {isUnlocked ? (
                      item.icon === 'award' ? (
                        <Award className="w-7 h-7 stroke-[2.2]" />
                      ) : item.icon === 'calendar' ? (
                        <Calendar className="w-6 h-6 stroke-[2.2]" />
                      ) : item.icon === 'sparkles' ? (
                        <Sparkles className="w-6 h-6 stroke-[2.2]" />
                      ) : (
                        <Layers className="w-6 h-6 stroke-[2.2]" />
                      )
                    ) : (
                      <Lock className="w-5 h-5 text-white/40" />
                    )}
                  </div>

                  <div className="space-y-0.5 text-left">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-serif font-bold text-sm text-white">{item.title}</h3>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isUnlocked
                            ? 'bg-[#D4AF37] text-[#0D0D0D]'
                            : 'bg-white/10 text-white/50 border border-white/5'
                        }`}
                      >
                        {isUnlocked ? 'Desbloqueada!' : 'Pendente'}
                      </span>
                    </div>
                    <p className="text-xs text-[#B3B3B3] leading-snug">{item.description}</p>
                    <p className="text-[11px] text-[#A0A0A0] pt-0.5 flex items-center gap-1">
                      <span className="text-[#D4AF37]">Condição:</span>
                      <span>{item.requirement}</span>
                    </p>
                  </div>
                </div>

                {isUnlocked && (
                  <div className="flex items-center gap-1.5 shrink-0">
                    {onShareAchievement && (
                      <button
                        type="button"
                        onClick={() => onShareAchievement(item)}
                        className="p-2 rounded-xl bg-[#D4AF37]/15 hover:bg-[#D4AF37] text-[#D4AF37] hover:text-black border border-[#D4AF37]/30 transition-all active:scale-95"
                        title="Compartilhar card da conquista"
                        aria-label={`Compartilhar card da conquista ${item.title}`}
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => onSelectAchievement(item.id)}
                      className="p-2 rounded-xl bg-[#D4AF37]/15 hover:bg-[#D4AF37]/25 text-[#D4AF37] transition-colors"
                      title="Ver celebração da conquista"
                      aria-label={`Ver celebração de ${item.title}`}
                    >
                      <Sparkles className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Barra de Progresso */}
              <div className="mt-3 pt-3 border-t border-white/5 space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[#888888]">Progresso</span>
                  <span
                    className={`font-semibold ${isUnlocked ? 'text-[#D4AF37]' : 'text-[#F1E5C8]'}`}
                  >
                    {item.progressText}
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ease-out ${
                      isUnlocked ? 'bg-gradient-to-r from-[#D4AF37] to-[#F1E5C8]' : 'bg-white/30'
                    }`}
                    style={{ width: `${Math.min(100, Math.max(0, item.progressPercent))}%` }}
                  />
                </div>
                {isUnlocked && item.unlockedAt && (
                  <p className="text-[10px] text-[#A0A0A0] pt-0.5">
                    Desbloqueada em: {item.unlockedAt}
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
