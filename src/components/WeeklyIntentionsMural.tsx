import React, { useState } from 'react'
import {
  Sparkles,
  Heart,
  Calendar,
  Plus,
  History,
  ChevronDown,
  ChevronUp,
  Check,
} from 'lucide-react'
import { useGame } from '@/context/GameContext'

const INTENTION_SUGGESTIONS = [
  'Calma & Presença',
  'Gentileza comigo',
  'Fios soltos e livres',
  'Pausa consciente',
  'Brilho autêntico',
  'Menos pressa',
  'Autocuidado sagrado',
  'Confiança de salão',
]

export const WeeklyIntentionsMural: React.FC = () => {
  const { journey, setWeeklyIntention } = useGame()
  const [inputText, setInputText] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [showHistory, setShowHistory] = useState(false)

  const intentionsList = journey.weeklyIntentions || []
  const currentIntention = intentionsList[0]

  const handleSave = (customText?: string) => {
    const textToSave = (customText !== undefined ? customText : inputText).trim()
    if (!textToSave) return
    setWeeklyIntention(textToSave)
    setInputText('')
    setIsEditing(false)
  }

  const handleSelectSuggestion = (suggestion: string) => {
    setInputText(suggestion)
    handleSave(suggestion)
  }

  return (
    <section
      id="mural-intencoes-section"
      aria-labelledby="weekly-intentions-heading"
      className="rounded-3xl border border-[#D4AF37]/50 bg-gradient-to-br from-[#1F1A12] via-[#161411] to-[#111111] p-4 sm:p-5 shadow-[0_4px_24px_rgba(212,175,55,0.12)] space-y-3.5 relative overflow-hidden scroll-mt-20"
    >
      {/* Luz ambiente suave de fundo */}
      <div className="absolute top-0 right-0 w-40 h-28 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none" />

      {/* Cabeçalho do Mural */}
      <div className="flex items-center justify-between gap-2 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/35 flex items-center justify-center text-[#D4AF37] shrink-0">
            <Heart className="w-4 h-4 fill-current text-[#D4AF37]" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2
                id="weekly-intentions-heading"
                className="font-serif text-sm sm:text-base font-bold text-white"
              >
                Mural de Intenções da Semana
              </h2>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-[#D4AF37] text-black font-extrabold uppercase">
                Semanal
              </span>
            </div>
            <p className="text-[11px] text-[#A0A0A0]">
              Escolha uma palavra ou propósito de carinho para guiar seus dias
            </p>
          </div>
        </div>

        {intentionsList.length > 1 && (
          <button
            type="button"
            onClick={() => setShowHistory(!showHistory)}
            className="text-[11px] font-semibold text-[#D4AF37] hover:underline flex items-center gap-1 shrink-0"
            aria-expanded={showHistory}
          >
            <History className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Histórico</span>
            {showHistory ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        )}
      </div>

      {/* Intenção Ativa ou Convite */}
      <div className="relative z-10">
        {currentIntention && !isEditing ? (
          <div className="rounded-2xl border border-[#D4AF37]/40 bg-[#251F14]/70 p-4 space-y-2 text-left relative group">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] font-mono tracking-wider uppercase text-[#D4AF37] font-bold flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>Semana: {currentIntention.weekLabel}</span>
              </span>

              <button
                type="button"
                onClick={() => {
                  setInputText(currentIntention.intention)
                  setIsEditing(true)
                }}
                className="text-[11px] text-[#D4AF37] hover:text-white font-medium underline transition-colors"
              >
                Trocar / Editar
              </button>
            </div>

            <p className="font-serif text-lg sm:text-xl font-bold text-white tracking-wide flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>“{currentIntention.intention}”</span>
            </p>

            <p className="text-[11px] text-[#C4B79A]">
              Lembre-se dessa intenção ao pentear os fios, aplicar seu leave-in ou respirar fundo.
            </p>
          </div>
        ) : (
          /* Formulário de Nova Intenção */
          <div className="space-y-3 pt-1">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    handleSave()
                  }
                }}
                maxLength={40}
                placeholder="Ex.: calma, presença, gentileza comigo..."
                className="flex-1 min-h-[44px] px-3.5 rounded-xl border border-[#D4AF37]/40 bg-[#161616] text-white placeholder-white/40 text-xs focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                aria-label="Digite sua intenção da semana"
              />
              <button
                type="button"
                onClick={() => handleSave()}
                disabled={!inputText.trim()}
                className="min-h-[44px] px-4 rounded-xl bg-[#D4AF37] hover:bg-[#B8962E] disabled:opacity-40 disabled:cursor-not-allowed text-black font-bold text-xs flex items-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer shrink-0"
              >
                <Check className="w-4 h-4 stroke-[2.5]" />
                <span>{currentIntention ? 'Salvar' : 'Definir'}</span>
              </button>
              {isEditing && (
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="min-h-[44px] px-3 rounded-xl border border-white/10 bg-transparent text-white/70 hover:text-white text-xs"
                >
                  Cancelar
                </button>
              )}
            </div>

            {/* Chips de Sugestões de Intenções Rápidas */}
            <div className="space-y-1.5 text-left">
              <span className="text-[10px] uppercase font-bold text-[#A0A0A0] tracking-wider block">
                Inspirações para você tocar e escolher:
              </span>
              <div
                className="flex flex-wrap gap-1.5"
                role="list"
                aria-label="Sugestões de intenções"
              >
                {INTENTION_SUGGESTIONS.map((sug) => (
                  <button
                    key={sug}
                    type="button"
                    onClick={() => handleSelectSuggestion(sug)}
                    className="min-h-[32px] px-2.5 py-1 rounded-full border border-white/10 bg-[#1E1E1E] hover:border-[#D4AF37] hover:bg-[#D4AF37]/15 hover:text-[#F1E5C8] text-white/80 text-[11px] font-medium transition-all active:scale-95 flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3 text-[#D4AF37]" />
                    <span>{sug}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Histórico Simples Desdobrável de Intenções Passadas */}
      {showHistory && intentionsList.length > 1 && (
        <div className="pt-2 border-t border-white/10 space-y-2 text-left animate-fade-in relative z-10">
          <span className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-wider block">
            Semanas Anteriores
          </span>
          <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
            {intentionsList.slice(1).map((item) => (
              <div
                key={item.id}
                className="p-2.5 rounded-xl border border-white/5 bg-[#171717] flex items-center justify-between text-xs"
              >
                <div>
                  <p className="font-semibold text-white">“{item.intention}”</p>
                  <p className="text-[10px] text-[#888888]">Semana: {item.weekLabel}</p>
                </div>
                <span className="text-[10px] text-[#A0A0A0] font-mono">{item.createdAt}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
