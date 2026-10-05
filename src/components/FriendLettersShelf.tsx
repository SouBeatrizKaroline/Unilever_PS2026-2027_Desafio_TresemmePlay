import React, { useState } from 'react'
import { useGame } from '@/context/GameContext'
import type { ReceivedLetter, CollectibleCardItem } from '@/types/game'
import { COLLECTIBLE_CARDS_LIST } from '@/types/game'
import { WeeklyCardIllustration } from '@/components/svg/WeeklyCardIllustration'
import { CollectibleCardSvg } from '@/components/svg/CollectibleCardSvg'
import { AccessorySvg } from '@/components/svg/AccessorySvg'
import {
  Mail,
  Plus,
  Trash2,
  X,
  Sparkles,
  Heart,
  Calendar,
  Check,
  AlertCircle,
  Copy,
  Crown,
  Award,
  Layers,
  BookOpen,
  Lock,
} from 'lucide-react'

export interface FriendLettersShelfProps {
  isOpen?: boolean
  onClose?: () => void
}

export const FriendLettersShelf: React.FC<FriendLettersShelfProps> = ({ isOpen, onClose }) => {
  const {
    friendLetters,
    readLetterIds,
    markLetterAsRead,
    unlockedCollectibleCardIds,
    addLetterFromCode,
    deleteLetter,
    journey,
  } = useGame()
  const [inputCode, setInputCode] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [selectedLetter, setSelectedLetter] = useState<ReceivedLetter | null>(null)
  const [copiedCode, setCopiedCode] = useState(false)
  const [celebratingCard, setCelebratingCard] = useState<CollectibleCardItem | null>(null)
  const [activeTab, setActiveTab] = useState<'cartas' | 'colecionaveis'>('cartas')
  const reducedMotion = journey.reducedMotion ?? false

  const handleOpenLetter = (letter: ReceivedLetter) => {
    setSelectedLetter(letter)
    // Marca como lida e verifica se desbloqueia cartão colecionável a cada 4 cartas lidas
    const outcome = markLetterAsRead(letter.id)
    if (outcome.isNewCollectibleCard && outcome.newCardNumber) {
      const unlockedItem =
        COLLECTIBLE_CARDS_LIST.find((c) => c.number === outcome.newCardNumber) ||
        COLLECTIBLE_CARDS_LIST[0]
      setCelebratingCard(unlockedItem)
    }
  }

  const handleAddCode = (e: React.FormEvent) => {
    e.preventDefault()
    setFeedback(null)
    const result = addLetterFromCode(inputCode)
    if (result.success) {
      setFeedback({ type: 'success', text: 'Carta adicionada com sucesso à sua Estante! 💛' })
      setInputCode('')
      setShowAddForm(false)
    } else {
      setFeedback({ type: 'error', text: result.error || 'Código inválido.' })
    }
  }

  const handleCopyCode = async (code?: string) => {
    if (!code) return
    try {
      await navigator.clipboard.writeText(code)
      setCopiedCode(true)
      setTimeout(() => setCopiedCode(false), 2000)
    } catch {
      // ignore
    }
  }

  // Conteúdo da Estante
  const content = (
    <div className="space-y-4 text-left">
      {/* Topo / Header da Estante com Abas Cartas e Colecionáveis */}
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] shrink-0">
              <Mail className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-base sm:text-lg font-bold text-white">
                  Estante de Cartas 💌
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#D4AF37] text-black font-extrabold uppercase">
                  {friendLetters.length} {friendLetters.length === 1 ? 'carta' : 'cartas'}
                </span>
              </div>
              <p className="text-xs text-[#A0A0A0]">
                Incentivos semanais ilustrados e mensagens afetivas guardadas.
              </p>
            </div>
          </div>

          {activeTab === 'cartas' && (
            <button
              type="button"
              onClick={() => {
                setShowAddForm(!showAddForm)
                setFeedback(null)
              }}
              className="min-h-[38px] px-3 rounded-xl bg-[#D4AF37] hover:bg-[#B8962E] text-black font-bold text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>{showAddForm ? 'Fechar' : 'Guardar'}</span>
            </button>
          )}
        </div>

        {/* Abas: Minhas Cartas vs Cartões Colecionáveis */}
        <div className="flex gap-2 p-1 rounded-2xl bg-black/40 border border-white/10">
          <button
            type="button"
            onClick={() => setActiveTab('cartas')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'cartas'
                ? 'bg-[#D4AF37] text-black shadow-md'
                : 'text-white/70 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Cartas ({friendLetters.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('colecionaveis')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'colecionaveis'
                ? 'bg-[#D4AF37] text-black shadow-md'
                : 'text-white/70 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>
              Colecionáveis ({unlockedCollectibleCardIds.length}/{COLLECTIBLE_CARDS_LIST.length})
            </span>
          </button>
        </div>

        {/* Barra de progresso para o próximo cartão colecionável */}
        {(() => {
          const totalUnlocked = unlockedCollectibleCardIds.length
          const maxCards = COLLECTIBLE_CARDS_LIST.length
          const isAllCompleted = totalUnlocked >= maxCards && readLetterIds.length >= maxCards * 4
          const currentProgressInCycle = isAllCompleted ? 4 : readLetterIds.length % 4
          const nextCardIndex = Math.min(totalUnlocked, maxCards - 1)
          const nextCard = COLLECTIBLE_CARDS_LIST[nextCardIndex]

          return (
            <div className="p-3 rounded-2xl bg-gradient-to-r from-[#291F11] via-[#1C160E] to-[#120F0A] border border-[#D4AF37]/40 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#FFF1CC] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>
                    {isAllCompleted
                      ? 'Coleção de Cartões Completa! 🌟'
                      : `Próximo: ${nextCard?.title.split('•')[1]?.trim() || 'Cartão Coletável'}`}
                  </span>
                </span>
                <span className="font-mono text-[11px] text-[#D4AF37] font-bold">
                  {isAllCompleted ? '4/4 (Completo)' : `${currentProgressInCycle}/4 cartas lidas`}
                </span>
              </div>
              {/* Progresso visual */}
              <div className="w-full h-2 rounded-full bg-black/60 overflow-hidden border border-[#D4AF37]/30">
                <div
                  className="h-full bg-gradient-to-r from-[#AA8214] via-[#D4AF37] to-[#FFF1CC] transition-all duration-500 rounded-full"
                  style={{ width: `${isAllCompleted ? 100 : (currentProgressInCycle / 4) * 100}%` }}
                />
              </div>
              <p className="text-[10px] text-[#C0B392] leading-tight">
                {isAllCompleted ? (
                  <>
                    Parabéns! Você desbloqueou todos os 4 cartões da série e o acessório{' '}
                    <strong>Broche de Cartas Dourado</strong>!
                  </>
                ) : (
                  <>
                    A cada 4 cartas lidas na estante, você desbloqueia um cartão colecionável
                    exclusivo. Ao completar os 4 cartões (16 cartas lidas), você ganha o{' '}
                    <strong>Broche de Cartas Dourado</strong>! Faltam {4 - currentProgressInCycle}{' '}
                    {4 - currentProgressInCycle === 1
                      ? 'carta lida para o próximo cartão'
                      : 'cartas lidas para o próximo cartão'}
                    .
                  </>
                )}
              </p>
            </div>
          )
        })()}
      </div>

      {/* Feedback de Adição */}
      {feedback && (
        <div
          role="alert"
          className={`p-3 rounded-xl text-xs flex items-center gap-2 animate-fade-in ${
            feedback.type === 'success'
              ? 'bg-[#81C784]/20 border border-[#81C784]/40 text-[#A5D6A7]'
              : 'bg-[#E57373]/15 border border-[#E57373]/40 text-[#EF9A9A]'
          }`}
        >
          {feedback.type === 'success' ? (
            <Check className="w-4 h-4 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0" />
          )}
          <span>{feedback.text}</span>
        </div>
      )}

      {/* Formulário para colar o código simples da carta */}
      {showAddForm && (
        <form
          onSubmit={handleAddCode}
          className="p-3.5 rounded-2xl bg-[#1C1A17] border border-[#D4AF37]/50 space-y-3 animate-fade-in"
        >
          <div className="space-y-1">
            <label htmlFor="letter-code-input" className="text-xs font-semibold text-white block">
              Cole o código simples ou texto da carta recebida:
            </label>
            <p className="text-[11px] text-[#A0A0A0]">
              Alguém compartilhou uma carta com você? Cole aqui o código que começa com{' '}
              <code className="text-[#D4AF37]">TP_LETTER_...</code> ou o texto do presente.
            </p>
            <textarea
              id="letter-code-input"
              rows={3}
              required
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              placeholder="Cole o código aqui (ex.: TP_LETTER_...)"
              className="w-full text-xs p-3 rounded-xl bg-[#121212] text-white border border-white/15 focus:border-[#D4AF37] focus:outline-none resize-none font-mono"
            />
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 min-h-[40px] rounded-xl bg-[#D4AF37] hover:bg-[#B8962E] text-black font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all"
            >
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span>Guardar na Minha Estante</span>
            </button>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="min-h-[40px] px-3 rounded-xl border border-white/15 text-white/70 hover:text-white text-xs font-semibold"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      {/* ABA DE CARTAS */}
      {activeTab === 'cartas' && (
        <>
          {friendLetters.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-[#161616] p-6 text-center space-y-2.5">
              <div className="w-12 h-12 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/35 flex items-center justify-center mx-auto text-[#D4AF37]">
                <Mail className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-sm font-bold text-white">
                Sua estante ainda está vazia
              </h4>
              <p className="text-xs text-[#B3B3B3] max-w-xs mx-auto leading-relaxed">
                Quando alguém enviar um card de presente com o código de incentivo, você poderá
                guardá-lo aqui para reler sempre que precisar de um abraço.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    // Adiciona uma carta de boas-vindas demonstrativa
                    addLetterFromCode(
                      JSON.stringify({
                        senderName: 'Clube TRESemmé Play',
                        message:
                          'Boas-vindas à sua jornada de autocuidado! Cada dia dedicado aos seus fios e ao seu bem-estar é uma conquista valiosa. Estamos com você! ✨',
                        theme: 'preto-ouro',
                      }),
                    )
                  }}
                  className="text-xs font-semibold text-[#D4AF37] hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Receber carta de boas-vindas acolhedora</span>
                </button>
              </div>
            </div>
          ) : (
            /* GRID DE CARTAS GUARDADAS */
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {friendLetters.map((letter) => {
                const isWhite = letter.theme === 'branco-dourado'
                const isSoft = letter.theme === 'dourado-suave'
                const isAppLetter = Boolean(letter.isAppLetter)
                const isWeekly = Boolean(letter.isWeeklyLetter)
                const isRead = readLetterIds.includes(letter.id) || Boolean(letter.readAt)

                return (
                  <div
                    key={letter.id}
                    onClick={() => handleOpenLetter(letter)}
                    className={`rounded-2xl border p-4 space-y-3 cursor-pointer hover:scale-[1.01] active:scale-[0.99] transition-all relative overflow-hidden text-left shadow-sm ${
                      isWeekly
                        ? 'bg-gradient-to-br from-[#342714] via-[#221A0F] to-[#120F0B] border-2 border-[#D4AF37] text-white shadow-[0_0_22px_rgba(212,175,55,0.25)]'
                        : isAppLetter
                          ? 'bg-gradient-to-br from-[#3D2F17] via-[#241C0F] to-[#141009] border-2 border-[#D4AF37] text-white shadow-[0_0_20px_rgba(212,175,55,0.2)]'
                          : isWhite
                            ? 'bg-gradient-to-br from-[#FCFCFC] to-[#EDE7D8] border-[#D4AF37]/60 text-[#1C1812]'
                            : isSoft
                              ? 'bg-gradient-to-br from-[#2E2314] to-[#18130B] border-[#D4AF37]/50 text-white'
                              : 'bg-gradient-to-br from-[#1E1911] via-[#161410] to-[#100F0D] border-[#D4AF37]/50 text-white'
                    }`}
                  >
                    {/* Badge especial "Carta Semanal", "Aniversário" ou "Carta do App" */}
                    <div className="absolute top-0 right-0 flex items-center">
                      {isWeekly && (
                        <div className="bg-gradient-to-r from-[#D4AF37] to-[#F1E5C8] text-black text-[9px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-bl-xl shadow flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5 stroke-[2.5]" />
                          <span>Carta Semanal</span>
                        </div>
                      )}
                      {!isWeekly && isAppLetter && (
                        <div className="bg-[#D4AF37] text-black text-[9px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-bl-xl shadow flex items-center gap-1">
                          <Crown className="w-2.5 h-2.5 stroke-[2.5]" />
                          <span>Carta do App</span>
                        </div>
                      )}
                    </div>

                    {/* Cabeçalho da carta com miniatura SVG ilustrada quando for semanal */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {isWeekly ? (
                          <div className="shrink-0 p-0.5 rounded-xl bg-black/40 border border-[#D4AF37]/40 shadow-sm">
                            <WeeklyCardIllustration
                              weekKey={letter.weekKey}
                              size={36}
                              reducedMotion={reducedMotion}
                              className="w-9 h-9"
                            />
                          </div>
                        ) : (
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                              isAppLetter
                                ? 'bg-[#D4AF37] text-black shadow-md'
                                : isWhite
                                  ? 'bg-[#D4AF37] text-black shadow-sm'
                                  : 'bg-[#D4AF37]/20 border border-[#D4AF37] text-[#D4AF37]'
                            }`}
                          >
                            {isAppLetter ? (
                              <Award className="w-4 h-4 stroke-[2.5]" />
                            ) : (
                              <Heart className="w-4 h-4 fill-current" />
                            )}
                          </div>
                        )}
                        <div className="min-w-0 pr-10">
                          <p
                            className={`text-xs font-bold truncate flex items-center gap-1.5 ${
                              isAppLetter
                                ? 'text-[#FFF1CC]'
                                : isWhite
                                  ? 'text-[#1C1812]'
                                  : 'text-white'
                            }`}
                          >
                            <span>De: {letter.senderName}</span>
                            {isRead && (
                              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-[#81C784]/20 text-[#A5D6A7] font-normal border border-[#81C784]/30">
                                Lida ✓
                              </span>
                            )}
                          </p>
                          <span
                            className={`text-[10px] flex items-center gap-1 ${
                              isAppLetter
                                ? 'text-[#D4AF37]'
                                : isWhite
                                  ? 'text-[#77664D]'
                                  : 'text-[#A0A0A0]'
                            }`}
                          >
                            <Calendar className="w-3 h-3 text-[#D4AF37]" />
                            <span>
                              {letter.receivedAt}
                              {letter.weekLabel ? ` • Semana ${letter.weekLabel}` : ''}
                              {letter.milestoneDays
                                ? ` • Marco de ${letter.milestoneDays} dias`
                                : ''}
                            </span>
                          </span>
                        </div>
                      </div>

                      {/* Botão de excluir */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteLetter(letter.id)
                        }}
                        className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors shrink-0 ${
                          isWhite
                            ? 'text-black/40 hover:text-[#E57373] hover:bg-black/5'
                            : 'text-white/40 hover:text-[#E57373] hover:bg-white/10'
                        }`}
                        title="Remover carta da estante"
                        aria-label={`Remover carta de ${letter.senderName}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Prévia da mensagem */}
                    <p
                      className={`text-xs italic leading-relaxed line-clamp-3 p-2.5 rounded-xl border ${
                        isAppLetter
                          ? 'bg-black/50 border-[#D4AF37]/40 text-[#FFF4D9]'
                          : isWhite
                            ? 'bg-white/80 border-black/5 text-[#2C2317]'
                            : 'bg-black/40 border-white/5 text-[#F1E5C8]'
                      }`}
                    >
                      "{letter.message}"
                    </p>

                    {/* Rodapé do card da carta */}
                    <div className="flex items-center justify-between text-[10px] pt-1">
                      <span
                        className={`font-semibold uppercase tracking-wider ${
                          isAppLetter
                            ? 'text-[#D4AF37] font-bold'
                            : isWhite
                              ? 'text-[#8A6E1E]'
                              : 'text-[#D4AF37]'
                        }`}
                      >
                        {isWeekly
                          ? `Ilustração Semanal Dourada`
                          : isAppLetter
                            ? `Aniversário de ${letter.milestoneDays || 7} Dias`
                            : letter.theme === 'branco-dourado'
                              ? 'Branco & Dourado'
                              : letter.theme === 'dourado-suave'
                                ? 'Dourado Suave'
                                : 'Preto & Ouro'}
                      </span>
                      <span className="text-[#D4AF37] font-bold hover:underline">
                        Ler em tela cheia →
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </>
      )}

      {/* ABA DE CARTÕES COLECIONÁVEIS (A CADA 4 CARTAS LIDAS) */}
      {activeTab === 'colecionaveis' && (
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {COLLECTIBLE_CARDS_LIST.map((card) => {
              const isUnlocked =
                unlockedCollectibleCardIds.includes(card.id) ||
                readLetterIds.length >= card.requiredReadLetters
              const remainingLetters = Math.max(0, card.requiredReadLetters - readLetterIds.length)

              return (
                <div
                  key={card.id}
                  className={`rounded-2xl border p-3 space-y-2 relative transition-all ${
                    isUnlocked
                      ? 'border-[#D4AF37] bg-gradient-to-b from-[#241B0E] via-[#16130E] to-[#0D0B08] shadow-[0_0_20px_rgba(212,175,55,0.2)]'
                      : 'border-white/10 bg-[#141414] opacity-85'
                  }`}
                >
                  {/* Selo com status / cadeado */}
                  <div className="flex items-center justify-between pb-1">
                    <span className="text-[10px] font-bold text-[#D4AF37] flex items-center gap-1">
                      {isUnlocked ? (
                        <>
                          <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                          <span>Colecionável Adquirido</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-3 h-3 text-white/50" />
                          <span className="text-white/60">Bloqueado</span>
                        </>
                      )}
                    </span>
                    <span
                      className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                        isUnlocked
                          ? 'bg-[#D4AF37] text-black shadow-sm'
                          : 'bg-white/10 text-white/60 border border-white/10'
                      }`}
                    >
                      {isUnlocked
                        ? 'Desbloqueado ✓'
                        : `Faltam ${remainingLetters} ${remainingLetters === 1 ? 'carta' : 'cartas'}`}
                    </span>
                  </div>

                  <CollectibleCardSvg
                    card={card}
                    isUnlocked={isUnlocked}
                    reducedMotion={reducedMotion}
                  />

                  <div className="text-left space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif text-xs font-bold text-white">{card.title}</h4>
                      <span className="text-[10px] text-[#D4AF37] font-mono">
                        {card.requiredReadLetters} cartas
                      </span>
                    </div>
                    <p className="text-[11px] text-[#D0C4A4] leading-relaxed">{card.description}</p>
                    {!isUnlocked && (
                      <p className="text-[10px] text-white/50 italic pt-1">
                        🔒 Abra e leia {card.requiredReadLetters} cartas em tela cheia na sua
                        estante para liberar este cartão.
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Destaque da Recompensa: Broche de Cartas Dourado */}
          {(() => {
            const isSeriesFinished =
              unlockedCollectibleCardIds.length >= COLLECTIBLE_CARDS_LIST.length ||
              readLetterIds.length >= 16
            const remainingToSeries = Math.max(0, 16 - readLetterIds.length)

            return (
              <div className="p-4 rounded-2xl border-2 border-[#D4AF37] bg-gradient-to-r from-[#291F11] via-[#1B150D] to-[#120F0A] flex items-center gap-3.5 shadow-[0_0_25px_rgba(212,175,55,0.25)]">
                <div className="w-16 h-16 rounded-2xl bg-black/60 border border-[#D4AF37] flex items-center justify-center shrink-0 shadow-inner">
                  <AccessorySvg
                    iconType="letter-brooch"
                    isUnlocked={isSeriesFinished}
                    className="w-12 h-12"
                  />
                </div>
                <div className="min-w-0 text-left space-y-1">
                  <div className="flex items-center gap-1.5">
                    <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <h4 className="font-serif text-xs font-bold text-[#FFF1CC]">
                      Recompensa Máxima: Broche de Cartas Dourado
                    </h4>
                  </div>
                  <p className="text-[11px] text-[#D8CBAC] leading-relaxed">
                    Desbloqueado ao completar a série completa de 4 cartões colecionáveis (16 cartas
                    lidas). Pode ser equipado em todos os 4 avatares e soma à conquista
                    Colecionadora!
                  </p>
                  <div className="pt-0.5">
                    {isSeriesFinished ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#81C784]">
                        <Check className="w-3 h-3" /> Série Completa! Disponível no seu Cofrinho e
                        nos Avatares!
                      </span>
                    ) : (
                      <span className="text-[10px] text-[#D4AF37] font-semibold">
                        {unlockedCollectibleCardIds.length}/4 cartões colecionados • Faltam{' '}
                        {remainingToSeries}{' '}
                        {remainingToSeries === 1 ? 'carta lida' : 'cartas lidas'} para o broche
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )
          })()}
        </div>
      )}

      {/* MODAL DE CELEBRAÇÃO DE CARTÃO COLECIONÁVEL DESBLOQUEADO */}
      {celebratingCard && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="card-unlock-title"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fade-in"
          onClick={() => setCelebratingCard(null)}
        >
          <div
            className="w-full max-w-sm rounded-3xl border-2 border-[#D4AF37] bg-gradient-to-b from-[#2B2011] via-[#1A140C] to-[#0D0B08] p-6 text-center space-y-4 animate-scale-in relative overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.5)] text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Efeito de confetes respeitando reducedMotion */}
            {!reducedMotion && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(24)].map((_, i) => (
                  <span
                    key={i}
                    className="absolute w-2 h-2 rounded-full animate-bounce"
                    style={{
                      backgroundColor: ['#D4AF37', '#FFF1CC', '#F5D77F', '#FFFFFF', '#AA8214'][
                        i % 5
                      ],
                      top: `${(i * 13) % 90}%`,
                      left: `${(i * 17) % 90}%`,
                      opacity: 0.75,
                      animationDuration: `${1.2 + (i % 4) * 0.4}s`,
                      animationDelay: `${(i % 5) * 0.15}s`,
                    }}
                  />
                ))}
              </div>
            )}

            <button
              type="button"
              onClick={() => setCelebratingCard(null)}
              className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-10"
              aria-label="Fechar celebração de cartão"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37] text-black text-[11px] font-black uppercase tracking-wider shadow">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Novo Cartão Colecionável!</span>
            </div>

            <div className="space-y-1">
              <h3 id="card-unlock-title" className="font-serif text-lg font-bold text-white">
                {celebratingCard.title}
              </h3>
              <p className="text-xs text-[#E8DBB8]">{celebratingCard.subtitle}</p>
            </div>

            {/* Ilustração do Cartão Desbloqueado */}
            <div className="py-1">
              <CollectibleCardSvg
                card={celebratingCard}
                isUnlocked={true}
                reducedMotion={reducedMotion}
              />
            </div>

            <p className="text-xs text-[#EADDC0] italic px-2 leading-relaxed">
              "{celebratingCard.description}"
            </p>

            {/* Contagem e marco do cartão */}
            {(() => {
              const cardIndex = COLLECTIBLE_CARDS_LIST.findIndex((c) => c.id === celebratingCard.id)
              const cardNum = cardIndex >= 0 ? cardIndex + 1 : 1
              const isSeriesCompletedNow = cardNum === COLLECTIBLE_CARDS_LIST.length

              return (
                <div className="p-3 rounded-2xl bg-black/50 border border-[#D4AF37]/50 flex items-center gap-3 text-left">
                  <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center shrink-0 text-[#FFF1CC] font-mono font-bold text-xs">
                    {cardNum}/4
                  </div>
                  <div className="text-[11px]">
                    <strong className="text-[#FFF1CC] block font-serif">
                      {isSeriesCompletedNow
                        ? 'Série Completa Desbloqueada! 🌟'
                        : `Marco de ${celebratingCard.requiredReadLetters} cartas lidas atingido!`}
                    </strong>
                    <span className="text-[#C2B79A]">
                      {isSeriesCompletedNow
                        ? 'Você conquistou os 4 cartões colecionáveis e o Broche de Cartas Dourado para o seu avatar!'
                        : `Cartão ${cardNum} de 4 desbloqueado. Continue lendo cartas para completar toda a série e liberar o Broche de Ouro!`}
                    </span>
                  </div>
                </div>
              )
            })()}

            <button
              type="button"
              onClick={() => setCelebratingCard(null)}
              className="w-full min-h-[44px] rounded-xl bg-[#D4AF37] hover:bg-[#B8962E] text-black font-bold text-xs shadow-md active:scale-95 transition-all cursor-pointer"
            >
              Celebrar e Continuar
            </button>
          </div>
        </div>
      )}

      {/* MODAL EM TELA CHEIA PARA LER A CARTA RECEBIDA */}
      {selectedLetter && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="letter-detail-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fade-in"
          onClick={() => setSelectedLetter(null)}
        >
          <div
            className={`w-full max-w-sm rounded-3xl border-2 border-[#D4AF37] p-6 text-center space-y-4 animate-scale-in relative overflow-hidden shadow-[0_0_45px_rgba(212,175,55,0.4)] ${
              selectedLetter.isAppLetter
                ? 'bg-gradient-to-b from-[#382B14] via-[#211A0F] to-[#120F0C] text-white ring-2 ring-[#D4AF37]/30'
                : selectedLetter.theme === 'branco-dourado'
                  ? 'bg-gradient-to-b from-[#FCFCFC] via-[#F7F4EC] to-[#EAE2CE] text-[#1C1812]'
                  : selectedLetter.theme === 'dourado-suave'
                    ? 'bg-gradient-to-b from-[#2F2314] via-[#1D170F] to-[#120F0C] text-white'
                    : 'bg-gradient-to-b from-[#211A11] via-[#14120E] to-[#0A0A0A] text-white'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Brilho dourado de fundo */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-32 bg-[#D4AF37]/25 rounded-full blur-3xl pointer-events-none" />

            {/* Botão fechar */}
            <button
              type="button"
              onClick={() => setSelectedLetter(null)}
              className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-black/25 hover:bg-black/40 text-white flex items-center justify-center transition-colors z-10"
              aria-label="Fechar carta"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Ilustração Semanal em destaque quando for semanal */}
            {selectedLetter.isWeeklyLetter && (
              <div className="flex flex-col items-center justify-center pt-2">
                <div className="p-2 rounded-2xl bg-black/60 border border-[#D4AF37] shadow-[0_0_25px_rgba(212,175,55,0.35)]">
                  <WeeklyCardIllustration
                    weekKey={selectedLetter.weekKey}
                    size={68}
                    reducedMotion={reducedMotion}
                    className="w-16 h-16"
                  />
                </div>
                <span className="text-[10px] text-[#D4AF37] uppercase font-bold tracking-widest pt-1.5">
                  Arte da Semana • Ouro Nobre
                </span>
              </div>
            )}

            {/* Cabeçalho */}
            <div className="space-y-1 relative">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37] text-black text-[11px] font-black uppercase tracking-wider shadow">
                {selectedLetter.isWeeklyLetter ? (
                  <>
                    <Sparkles className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>Carta Semanal Ilustrada • {selectedLetter.weekLabel || 'Incentivo'}</span>
                  </>
                ) : selectedLetter.isAppLetter ? (
                  <>
                    <Crown className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>
                      {selectedLetter.milestoneDays
                        ? `Carta Especial • Marco ${selectedLetter.milestoneDays} Dias`
                        : 'Carta Especial do App'}
                    </span>
                  </>
                ) : (
                  <>
                    <Heart className="w-3.5 h-3.5 fill-current" />
                    <span>Carta da sua Estante</span>
                  </>
                )}
              </div>
              <h3
                id="letter-detail-title"
                className={`font-serif text-xl font-bold pt-1 ${
                  selectedLetter.theme === 'branco-dourado' && !selectedLetter.isAppLetter
                    ? 'text-[#1C1812]'
                    : 'text-white'
                }`}
              >
                {selectedLetter.isWeeklyLetter
                  ? 'Incentivo Semanal de Autocuidado'
                  : selectedLetter.isAppLetter
                    ? 'Celebração de Aniversário Dourado'
                    : `De: ${selectedLetter.senderName}`}
              </h3>
              <p
                className={`text-xs ${
                  selectedLetter.theme === 'branco-dourado' && !selectedLetter.isAppLetter
                    ? 'text-[#77664D]'
                    : 'text-[#E6DCB8]'
                }`}
              >
                {selectedLetter.isWeeklyLetter
                  ? `Semana ${selectedLetter.weekLabel || ''} • Guardada em ${selectedLetter.receivedAt}`
                  : selectedLetter.isAppLetter
                    ? `Guardada em ${selectedLetter.receivedAt} • Autocuidado Contínuo`
                    : `Guardada em ${selectedLetter.receivedAt}`}
              </p>
            </div>

            {/* Caixa com o texto da carta em visual dourado nobre */}
            <div
              className={`p-5 rounded-2xl border text-sm leading-relaxed italic relative ${
                selectedLetter.isAppLetter
                  ? 'bg-black/50 border-[#D4AF37]/60 text-[#FFF6E0] shadow-inner shadow-black/60'
                  : selectedLetter.theme === 'branco-dourado'
                    ? 'bg-white/90 border-[#D4AF37]/50 text-[#2C2317] shadow-inner'
                    : 'bg-black/40 border-[#D4AF37]/40 text-[#F1E5C8] shadow-inner'
              }`}
            >
              <span className="text-2xl font-serif text-[#D4AF37] absolute top-2 left-3 opacity-70">
                “
              </span>
              <p className="pt-2 px-1 text-xs sm:text-sm font-sans">{selectedLetter.message}</p>
              <span className="text-2xl font-serif text-[#D4AF37] absolute bottom-1 right-3 opacity-70">
                ”
              </span>
            </div>

            {/* Assinatura de carinho */}
            <div className="space-y-0.5 relative">
              <p className="font-serif font-bold text-xs text-[#D4AF37] flex items-center justify-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>
                  {selectedLetter.isAppLetter
                    ? 'Com carinho, Equipe TRESemmé Play'
                    : 'Com amor e incentivo ao seu brilho ✨'}
                </span>
              </p>
              <p
                className={`text-[10px] ${
                  selectedLetter.theme === 'branco-dourado' && !selectedLetter.isAppLetter
                    ? 'text-[#77664D]'
                    : 'text-[#A0A0A0]'
                }`}
              >
                TRESemmé Play • Autocuidado Profissional
              </p>
            </div>

            {/* Ações */}
            <div className="space-y-2 pt-2 relative">
              {selectedLetter.code && (
                <button
                  type="button"
                  onClick={() => handleCopyCode(selectedLetter.code)}
                  className="w-full min-h-[42px] rounded-xl border border-[#D4AF37]/50 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 text-[#D4AF37] font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#81C784]" />
                      <span className="text-[#81C784]">Código da carta copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar código para compartilhar</span>
                    </>
                  )}
                </button>
              )}

              <button
                type="button"
                onClick={() => setSelectedLetter(null)}
                className="w-full min-h-[44px] rounded-xl bg-[#D4AF37] hover:bg-[#B8962E] text-black font-bold text-xs shadow-md active:scale-95 transition-all cursor-pointer"
              >
                Guardar de volta na Estante
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )

  // Se renderizado como Modal ou incorporado diretamente
  if (isOpen !== undefined) {
    if (!isOpen) return null
    return (
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="shelf-modal-title"
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fade-in"
        onClick={onClose}
      >
        <div
          className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-3xl border-2 border-[#D4AF37] bg-gradient-to-b from-[#201A11] via-[#14120E] to-[#0A0A0A] p-5 text-white shadow-[0_0_40px_rgba(212,175,55,0.35)] space-y-4 animate-scale-in relative text-left"
          onClick={(e) => e.stopPropagation()}
        >
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-10"
              aria-label="Fechar Estante de Cartas"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          {content}
        </div>
      </div>
    )
  }

  // Renderização direta como seção
  return <section className="w-full">{content}</section>
}
