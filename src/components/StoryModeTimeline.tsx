import React, { useState } from 'react'
import { Lock, Sparkles, CheckCircle2, ChevronRight, BookOpen, Award, Calendar } from 'lucide-react'

export type StoryChapterId =
  | 'cap-boas-vindas'
  | 'cap-primeiro-passo'
  | 'cap-trio-completo'
  | 'cap-marco-100'
  | 'cap-semana-perfeita'
  | 'cap-ritual-semana'
  | 'cap-marco-300'
  | 'cap-colecionadora'
  | 'cap-mestre-ouro'

export interface StoryChapter {
  id: StoryChapterId
  title: string
  subtitle: string
  poeticText: string
  unlockedHint: string
  isUnlocked: boolean
  unlockedAt?: string
  svgType:
    | 'seed-mirror'
    | 'golden-thread'
    | 'trio-crown'
    | 'sun-sparkle'
    | 'calendar-bloom'
    | 'constellation-ribbon'
    | 'golden-chalice'
    | 'gem-chest'
    | 'gilded-palace'
}

interface StoryChapterSvgProps {
  type: StoryChapter['svgType']
  isUnlocked: boolean
  className?: string
}

export const StoryChapterSvg: React.FC<StoryChapterSvgProps> = ({
  type,
  isUnlocked,
  className = 'w-24 h-24',
}) => {
  const gold = isUnlocked ? '#D4AF37' : '#555555'
  const softGold = isUnlocked ? '#F1E5C8' : '#777777'
  const darkGold = isUnlocked ? '#8C6F1E' : '#333333'
  const light = isUnlocked ? '#FFFFFF' : '#666666'

  switch (type) {
    case 'seed-mirror':
      // Espelho da Autoestima / Boas-Vindas
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <circle cx="50" cy="45" r="28" stroke={gold} strokeWidth="3" fill="#1A1813" />
          <circle cx="50" cy="45" r="22" stroke={softGold} strokeWidth="1" strokeDasharray="3 2" />
          {/* Cabo do espelho */}
          <path d="M50 73 L50 92" stroke={gold} strokeWidth="4" strokeLinecap="round" />
          <circle cx="50" cy="94" r="3.5" fill={gold} />
          {/* Brilho no vidro */}
          <path
            d="M40 32 Q54 36 58 48"
            stroke={light}
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.8"
          />
          <circle cx="50" cy="45" r="6" fill={softGold} opacity="0.4" />
        </svg>
      )

    case 'golden-thread':
      // Fio Dourado do Primeiro Passo
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <path
            d="M20 75 C30 25 70 25 80 75"
            stroke={gold}
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M25 70 C35 32 65 32 75 70"
            stroke={softGold}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="4 2"
          />
          {/* Pingente gota de luz */}
          <circle cx="50" cy="38" r="8" fill="#1C1812" stroke={gold} strokeWidth="2" />
          <circle cx="50" cy="38" r="4" fill={gold} />
          <circle cx="48" cy="36" r="1.5" fill={light} />
          {isUnlocked && <circle cx="30" cy="50" r="2" fill={light} />}
          {isUnlocked && <circle cx="70" cy="50" r="2" fill={gold} />}
        </svg>
      )

    case 'trio-crown':
      // Coroa do Trio de Penteados
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <path
            d="M22 64 C30 52 70 52 78 64 L74 38 L58 50 L50 26 L42 50 L26 38 Z"
            fill={gold}
            stroke={softGold}
            strokeWidth="1.8"
          />
          <circle cx="50" cy="26" r="4.5" fill={light} stroke={gold} strokeWidth="1.2" />
          <circle cx="26" cy="38" r="3.5" fill={softGold} />
          <circle cx="74" cy="38" r="3.5" fill={softGold} />
          <circle cx="50" cy="56" r="3" fill="#1B1711" stroke={softGold} strokeWidth="1" />
        </svg>
      )

    case 'sun-sparkle':
      // Sol Radiante de 100 Pontos
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <circle cx="50" cy="50" r="18" fill="#221C12" stroke={gold} strokeWidth="2.5" />
          <circle cx="50" cy="50" r="10" fill={gold} />
          <circle cx="50" cy="50" r="4" fill={light} />
          {/* Raios solares */}
          <path
            d="M50 18 L50 26 M50 74 L50 82 M18 50 L26 50 M74 50 L82 50"
            stroke={gold}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M28 28 L34 34 M66 66 L72 72 M28 72 L34 66 M66 34 L72 28"
            stroke={softGold}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      )

    case 'calendar-bloom':
      // Semana Perfeita Florescendo
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          {/* Moldura de calendário */}
          <rect
            x="22"
            y="24"
            width="56"
            height="54"
            rx="10"
            fill="#1C1813"
            stroke={gold}
            strokeWidth="2.5"
          />
          <path d="M22 38 L78 38" stroke={gold} strokeWidth="2" />
          {/* Hastes superiores */}
          <line
            x1="36"
            y1="18"
            x2="36"
            y2="28"
            stroke={softGold}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <line
            x1="64"
            y1="18"
            x2="64"
            y2="28"
            stroke={softGold}
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Flor / Estrela central */}
          <circle cx="50" cy="56" r="6" fill={gold} />
          <circle cx="50" cy="56" r="2.5" fill={light} />
          <circle cx="42" cy="56" r="3" fill={softGold} />
          <circle cx="58" cy="56" r="3" fill={softGold} />
          <circle cx="50" cy="48" r="3" fill={softGold} />
          <circle cx="50" cy="64" r="3" fill={softGold} />
        </svg>
      )

    case 'constellation-ribbon':
      // Constelação de 7 dias da semana
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          {/* Linhas conectando estrelas */}
          <path
            d="M20 60 L32 38 L48 45 L62 26 L78 40 L82 68"
            stroke={darkGold}
            strokeWidth="2"
            strokeDasharray="3 2"
          />
          {/* Estrelas da constelação */}
          <circle cx="20" cy="60" r="3" fill={gold} />
          <circle cx="32" cy="38" r="3.5" fill={softGold} />
          <circle cx="48" cy="45" r="3" fill={gold} />
          <circle cx="62" cy="26" r="4.5" fill={light} stroke={gold} strokeWidth="1" />
          <circle cx="78" cy="40" r="3.5" fill={softGold} />
          <circle cx="82" cy="68" r="3" fill={gold} />
        </svg>
      )

    case 'golden-chalice':
      // Cálice de 300 Pontos
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <path d="M30 26 C30 52 70 52 70 26 Z" fill={gold} stroke={softGold} strokeWidth="2" />
          <path d="M50 52 L50 74" stroke={gold} strokeWidth="4" strokeLinecap="round" />
          <ellipse cx="50" cy="78" rx="18" ry="5" fill="#201C14" stroke={gold} strokeWidth="2" />
          <circle cx="50" cy="36" r="5" fill={light} />
          {isUnlocked && <circle cx="38" cy="22" r="2" fill={light} />}
          {isUnlocked && <circle cx="62" cy="22" r="2" fill={gold} />}
        </svg>
      )

    case 'gem-chest':
      // Baú / Cofrinho de Todas as Joias
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          {/* Baú de joias */}
          <rect
            x="22"
            y="44"
            width="56"
            height="34"
            rx="6"
            fill="#221C12"
            stroke={gold}
            strokeWidth="2.5"
          />
          <path d="M22 44 C22 30 78 30 78 44 Z" fill={gold} stroke={softGold} strokeWidth="1.5" />
          {/* Fechadura dourada */}
          <circle cx="50" cy="56" r="4.5" fill={softGold} stroke="#1A1813" strokeWidth="1" />
          <rect x="48.5" y="56" width="3" height="6" fill="#1A1813" />
          {/* Brilhos saindo */}
          <circle cx="34" cy="34" r="2.5" fill={light} />
          <circle cx="66" cy="34" r="2.5" fill={light} />
          <circle cx="50" cy="24" r="3.5" fill={gold} />
        </svg>
      )

    case 'gilded-palace':
    default:
      // Templo Dourado da Maestria
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <path d="M50 18 L20 38 L80 38 Z" fill={gold} stroke={softGold} strokeWidth="2" />
          <line
            x1="28"
            y1="38"
            x2="28"
            y2="74"
            stroke={gold}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <line
            x1="42"
            y1="38"
            x2="42"
            y2="74"
            stroke={gold}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <line
            x1="58"
            y1="38"
            x2="58"
            y2="74"
            stroke={gold}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <line
            x1="72"
            y1="38"
            x2="72"
            y2="74"
            stroke={gold}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <rect
            x="18"
            y="74"
            width="64"
            height="8"
            rx="2"
            fill="#201C14"
            stroke={gold}
            strokeWidth="2"
          />
          <circle cx="50" cy="30" r="3" fill={light} />
        </svg>
      )
  }
}

export const StoryModeTimeline: React.FC<{
  chapters: StoryChapter[]
  onOpenMission?: (missionId: string) => void
}> = ({ chapters, onOpenMission }) => {
  const [selectedChapterId, setSelectedChapterId] = useState<StoryChapterId | null>(null)

  const unlockedCount = chapters.filter((c) => c.isUnlocked).length
  const totalCount = chapters.length
  const progressPercent = Math.round((unlockedCount / totalCount) * 100)

  return (
    <div className="space-y-4 animate-fade-in text-left">
      {/* Banner de Introdução da História */}
      <div className="rounded-2xl border border-[#D4AF37]/40 bg-gradient-to-r from-[#221B10] via-[#1A1612] to-[#121212] p-4 space-y-2 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-sm font-bold text-white flex items-center gap-2">
                <span>Modo História • Diário Ilustrado</span>
              </h3>
              <p className="text-[11px] text-[#F1E5C8]/80">
                Os marcos da sua jornada revelados como capítulos poéticos
              </p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-[#D4AF37] bg-[#D4AF37]/15 px-2.5 py-1 rounded-full border border-[#D4AF37]/30">
            {unlockedCount}/{totalCount}
          </span>
        </div>

        {/* Barra de Progresso da História */}
        <div className="space-y-1 pt-1">
          <div className="flex items-center justify-between text-[10px] text-[#A0A0A0]">
            <span>Progresso da sua crônica de autocuidado</span>
            <span className="font-bold text-[#F1E5C8]">{progressPercent}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#D4AF37] to-[#F1E5C8] rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Linha do Tempo / Scroll dos Capítulos */}
      <div className="space-y-3 relative before:absolute before:top-4 before:bottom-4 before:left-[27px] before:w-0.5 before:bg-gradient-to-b before:from-[#D4AF37]/60 before:via-white/10 before:to-transparent">
        {chapters.map((cap, idx) => {
          const isSelected = selectedChapterId === cap.id
          return (
            <div
              key={cap.id}
              onClick={() => setSelectedChapterId(isSelected ? null : cap.id)}
              className={`relative pl-14 pr-3.5 py-3.5 rounded-2xl border transition-all cursor-pointer ${
                cap.isUnlocked
                  ? isSelected
                    ? 'border-[#D4AF37] bg-gradient-to-r from-[#241F16] to-[#181613] shadow-[0_0_20px_rgba(212,175,55,0.25)] ring-1 ring-[#D4AF37]'
                    : 'border-[#D4AF37]/30 bg-[#171717] hover:border-[#D4AF37]/60 hover:bg-[#1E1E1E]'
                  : 'border-white/5 bg-[#121212] opacity-75 hover:opacity-90 hover:border-white/15'
              }`}
            >
              {/* Marcador do Nó da Linha do Tempo */}
              <div
                className={`absolute left-4 top-4 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-sm ${
                  cap.isUnlocked
                    ? 'bg-[#D4AF37] text-black ring-4 ring-[#171717]'
                    : 'bg-[#2A2A2A] text-white/40 border border-white/10 ring-4 ring-[#121212]'
                }`}
              >
                {cap.isUnlocked ? (
                  <CheckCircle2 className="w-4 h-4 stroke-[3]" />
                ) : (
                  <Lock className="w-3.5 h-3.5" />
                )}
              </div>

              {/* Cabeçalho do Capítulo */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#D4AF37] font-bold">
                      Capítulo {idx + 1}
                    </span>
                    {cap.isUnlocked && cap.unlockedAt && (
                      <span className="text-[10px] text-[#A0A0A0]">• {cap.unlockedAt}</span>
                    )}
                    {!cap.isUnlocked && (
                      <span className="text-[9px] font-mono px-2 py-0.2 rounded-full bg-white/10 text-white/60">
                        Próximo capítulo
                      </span>
                    )}
                  </div>
                  <h4
                    className={`font-serif text-sm sm:text-base font-bold ${
                      cap.isUnlocked ? 'text-white' : 'text-white/60'
                    }`}
                  >
                    {cap.title}
                  </h4>
                  <p className="text-xs text-[#D4AF37]/80">{cap.subtitle}</p>
                </div>

                {/* Miniatura Ilustrada */}
                <div className="shrink-0 flex items-center justify-center p-1 rounded-xl bg-black/40 border border-white/5">
                  <StoryChapterSvg
                    type={cap.svgType}
                    isUnlocked={cap.isUnlocked}
                    className="w-12 h-12 sm:w-14 sm:h-14"
                  />
                </div>
              </div>

              {/* Conteúdo Detalhado (Texto Poético ou Dica de Bloqueio) */}
              <div className="mt-2 pt-2 border-t border-white/5 space-y-2">
                {cap.isUnlocked ? (
                  <div className="space-y-2">
                    <p className="text-xs text-[#EAE5D9] leading-relaxed italic bg-black/25 p-2.5 rounded-xl border border-[#D4AF37]/15">
                      "{cap.poeticText}"
                    </p>
                    <div className="flex items-center justify-between text-[11px] text-[#D4AF37]">
                      <span className="flex items-center gap-1 font-semibold">
                        <Sparkles className="w-3 h-3" />
                        <span>Capítulo desbloqueado no seu diário</span>
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1.5 bg-black/30 p-2.5 rounded-xl border border-white/5">
                    <div className="flex items-center gap-1.5 text-xs text-[#F1E5C8]/80 font-medium">
                      <Lock className="w-3 h-3 text-[#D4AF37]" />
                      <span>Como desbloquear este capítulo:</span>
                    </div>
                    <p className="text-xs text-[#A0A0A0] leading-snug">{cap.unlockedHint}</p>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
