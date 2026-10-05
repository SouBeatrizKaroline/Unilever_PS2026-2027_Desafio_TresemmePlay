import React, { useState, useEffect, useRef, useMemo } from 'react'
import {
  Sparkles,
  Heart,
  Wind,
  BookHeart,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  X,
  Play,
  RotateCcw,
  Crown,
  Share2,
} from 'lucide-react'
import { useGame } from '@/context/GameContext'
import { MissionStepSvg } from '@/components/svg/MissionStepSvg'
import { getAdaptedCareProfile } from '@/lib/adaptedCare'

interface SpaDaSemanaModalProps {
  isOpen: boolean
  onClose: () => void
  onShareCard?: (data: {
    missionTitle: string
    points: number
    rewardName: string
    completedAt: string
    achievementType?: 'ritual-perfeito' | 'spa-streak'
    weeklyIntention: string
  }) => void
}

type SpaStep = 'intencao' | 'missao' | 'respiracao' | 'diario' | 'celebracao'

const SPA_STEPS_CONFIG = [
  {
    step: 1 as const,
    title: 'Nutrição & Pré-Shampoo',
    instruction:
      'Aplique 4 a 6 gotas de óleo nutritivo nos fios secos, desembaraçando suavemente das pontas à raiz.',
    tip: 'Sinta o aroma suave e prepare a fibra para receber o tratamento.',
  },
  {
    step: 2 as const,
    title: 'Tratamento Térmico Profundo',
    instruction:
      'Enluve mecha por mecha com a máscara capilar. Envolva em uma toalha morna e deixe agir por alguns instantes.',
    tip: 'O calor suave abre as cutículas para absorção máxima dos ativos.',
  },
  {
    step: 3 as const,
    title: 'Selagem & Faixa Spa Dourada',
    instruction:
      'Enxágue com água morna a fresca, sela as pontas e vista a Faixa Spa Dourada para coroar seu ritual.',
    tip: 'Toque seus fios para sentir a maciez acetinada imediata.',
  },
]

const INTENTION_SUGGESTIONS = [
  'Calma & Presença',
  'Gentileza comigo',
  'Fios soltos e livres',
  'Pausa consciente',
  'Brilho autêntico',
  'Menos pressa',
  'Autocuidado sagrado',
]

export const SpaDaSemanaModal: React.FC<SpaDaSemanaModalProps> = ({
  isOpen,
  onClose,
  onShareCard,
}) => {
  const { journey, getCurrentWeekIntention, completeSpaDaSemana, spaStreakCount } = useGame()
  const isReducedMotion = journey.reducedMotion
  const [streakResultInfo, setStreakResultInfo] = useState<{
    isNewSpaStreak: boolean
    streakCount: number
  }>({ isNewSpaStreak: false, streakCount: spaStreakCount })

  const activeIntention = getCurrentWeekIntention()?.intention || ''
  const [currentFlowStep, setCurrentFlowStep] = useState<SpaStep>('intencao')

  // Estado da etapa 1: Intenção
  const [selectedIntention, setSelectedIntention] = useState<string>(
    activeIntention || 'Calma & Presença',
  )
  const [customIntentionInput, setCustomIntentionInput] = useState<string>('')

  // Estado da etapa 2: Missão guiada (etapas 1, 2, 3)
  const [missionStepIndex, setMissionStepIndex] = useState<number>(0)

  // Estado da etapa 3: Respiração
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale')
  const [secondsLeft, setSecondsLeft] = useState<number>(4)
  const [breathingCycles, setBreathingCycles] = useState<number>(0)
  const [isBreathingRunning, setIsBreathingRunning] = useState<boolean>(true)
  const breathingTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Estado da etapa 4: Diário
  const careProfile = useMemo(() => {
    return getAdaptedCareProfile(
      journey.hairTexture,
      journey.avatarId,
      journey.skinTone,
      journey.hairLength,
    )
  }, [journey.hairTexture, journey.avatarId, journey.skinTone, journey.hairLength])

  const [diaryNote, setDiaryNote] = useState<string>(
    'Me sinto com energia renovada, mente calma e fios livres.',
  )

  // Reset ao abrir
  useEffect(() => {
    if (isOpen) {
      setCurrentFlowStep('intencao')
      setSelectedIntention(activeIntention || 'Calma & Presença')
      setCustomIntentionInput('')
      setMissionStepIndex(0)
      setBreathPhase('inhale')
      setSecondsLeft(4)
      setBreathingCycles(0)
      setIsBreathingRunning(true)
      setDiaryNote('Me sinto com energia renovada, mente calma e fios livres.')
    }
  }, [isOpen, activeIntention])

  // Timer da Respiração guiada
  useEffect(() => {
    if (currentFlowStep !== 'respiracao' || !isBreathingRunning) {
      if (breathingTimerRef.current) clearInterval(breathingTimerRef.current)
      return
    }

    breathingTimerRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          if (breathPhase === 'inhale') {
            setBreathPhase('hold')
            return 3
          } else if (breathPhase === 'hold') {
            setBreathPhase('exhale')
            return 4
          } else {
            setBreathPhase('inhale')
            setBreathingCycles((c) => c + 1)
            return 4
          }
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      if (breathingTimerRef.current) clearInterval(breathingTimerRef.current)
    }
  }, [currentFlowStep, isBreathingRunning, breathPhase])

  if (!isOpen) return null

  // Ação de finalizar o fluxo completo do Spa da Semana
  const handleFinishSpa = () => {
    const finalIntention = selectedIntention.trim() || 'Calma & Presença'
    const finalDiaryNote = diaryNote.trim() || 'Momento revigorante no Spa da Semana.'

    const res = completeSpaDaSemana({
      intention: finalIntention,
      missionId: 'spa-capilar-domingo',
      missionTitle: 'Spa da Semana',
      pointsAwarded: 95,
      rewardName: 'Faixa Spa Dourada',
      diaryNoteText: finalDiaryNote,
      breathingCycles: Math.max(1, breathingCycles),
    })

    setStreakResultInfo({
      isNewSpaStreak: res.isNewSpaStreak,
      streakCount: res.spaStreakCount,
    })

    setCurrentFlowStep('celebracao')
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="spa-semana-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-3xl border-2 border-[#D4AF37] bg-gradient-to-b from-[#1C1812] via-[#14120E] to-[#0D0D0D] p-5 text-white shadow-[0_0_40px_rgba(212,175,55,0.35)] space-y-4 animate-scale-in relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Luz dourada de fundo */}
        <div
          className={`absolute top-0 left-1/2 -translate-x-1/2 w-48 h-32 bg-[#D4AF37]/20 rounded-full blur-3xl pointer-events-none ${
            isReducedMotion ? '' : 'animate-pulse'
          }`}
        />

        {/* Botão fechar */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors z-10"
          aria-label="Fechar Spa da Semana"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Barra de Progresso das 4 Etapas */}
        {currentFlowStep !== 'celebracao' && (
          <div className="space-y-1.5 pt-1 relative z-10">
            <div className="flex items-center justify-between text-[10px] uppercase font-bold text-[#D4AF37] tracking-wider">
              <span>Spa da Semana • Tríade Guiada</span>
              <span className="font-mono text-white/80">
                {currentFlowStep === 'intencao' && 'Etapa 1/4'}
                {currentFlowStep === 'missao' && 'Etapa 2/4'}
                {currentFlowStep === 'respiracao' && 'Etapa 3/4'}
                {currentFlowStep === 'diario' && 'Etapa 4/4'}
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden flex">
              <div
                className={`h-full bg-[#D4AF37] transition-all duration-300 ${
                  currentFlowStep === 'intencao'
                    ? 'w-1/4'
                    : currentFlowStep === 'missao'
                      ? 'w-2/4'
                      : currentFlowStep === 'respiracao'
                        ? 'w-3/4'
                        : 'w-full'
                }`}
              />
            </div>
          </div>
        )}

        {/* PASSO 1: INTENÇÃO DA SEMANA */}
        {currentFlowStep === 'intencao' && (
          <div className="space-y-3.5 text-left relative z-10 animate-fade-in">
            <div className="text-center space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] font-bold uppercase tracking-wider">
                <Heart className="w-3 h-3 fill-current" />
                <span>1. Intenção da Semana</span>
              </div>
              <h2 id="spa-semana-title" className="font-serif text-lg font-bold text-white">
                Defina sua Intenção
              </h2>
              <p className="text-xs text-[#B3B3B3]">
                Qual palavra ou propósito guiará seu autocuidado hoje?
              </p>
            </div>

            {/* Intenção Ativa selecionada */}
            <div className="rounded-2xl border border-[#D4AF37]/50 bg-[#251E14] p-3.5 text-center space-y-1">
              <span className="text-[10px] text-[#A0A0A0] uppercase tracking-wider font-semibold">
                Sua Intenção Escolhida
              </span>
              <p className="font-serif text-xl font-bold text-[#F1E5C8]">
                “{selectedIntention || 'Calma & Presença'}”
              </p>
            </div>

            {/* Inspirações rápidas */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold text-[#888888] uppercase tracking-wider">
                Toque para escolher:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {INTENTION_SUGGESTIONS.map((sug) => {
                  const isSelected = selectedIntention === sug
                  return (
                    <button
                      key={sug}
                      type="button"
                      onClick={() => {
                        setSelectedIntention(sug)
                        setCustomIntentionInput('')
                      }}
                      className={`min-h-[32px] px-2.5 py-1 rounded-full text-xs font-medium transition-all active:scale-95 ${
                        isSelected
                          ? 'bg-[#D4AF37] text-black font-bold shadow-md'
                          : 'border border-white/10 bg-white/5 hover:bg-white/10 text-white/80'
                      }`}
                    >
                      {sug}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Campo personalizado */}
            <div className="space-y-1 pt-1">
              <label htmlFor="custom-intention-input" className="text-[10px] text-[#A0A0A0] block">
                Ou digite uma intenção pessoal:
              </label>
              <input
                id="custom-intention-input"
                type="text"
                maxLength={40}
                value={customIntentionInput}
                onChange={(e) => {
                  setCustomIntentionInput(e.target.value)
                  if (e.target.value.trim()) {
                    setSelectedIntention(e.target.value)
                  }
                }}
                placeholder="Ex.: leveza, foco, paz interior..."
                className="w-full min-h-[42px] px-3.5 rounded-xl border border-white/15 bg-black/40 text-white placeholder-white/30 text-xs focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            {/* Botão de Avanço */}
            <button
              type="button"
              onClick={() => setCurrentFlowStep('missao')}
              disabled={!selectedIntention.trim()}
              className="w-full min-h-[46px] rounded-xl bg-[#D4AF37] hover:bg-[#B8962E] disabled:opacity-40 text-black font-bold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
            >
              <span>Avançar para o Ritual de Spa</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* PASSO 2: MISSÃO GUIADA (3 ETAPAS ILUSTRADAS) */}
        {currentFlowStep === 'missao' && (
          <div className="space-y-3 text-left relative z-10 animate-fade-in">
            <div className="text-center space-y-0.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] font-bold uppercase tracking-wider">
                <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                <span>2. Ritual Spa Capilar • Passo {missionStepIndex + 1} de 3</span>
              </div>
              <h3 className="font-serif text-base font-bold text-white">
                {SPA_STEPS_CONFIG[missionStepIndex].title}
              </h3>
            </div>

            {/* Ilustração SVG da Etapa */}
            <div className="rounded-2xl border border-[#D4AF37]/40 overflow-hidden bg-[#16130F] flex items-center justify-center shadow-inner">
              <MissionStepSvg
                step={SPA_STEPS_CONFIG[missionStepIndex].step}
                missionType="spa-capilar-domingo"
                className="w-full h-44 object-contain"
              />
            </div>

            {/* Instruções */}
            <div className="rounded-xl border border-white/10 bg-black/40 p-3 space-y-1">
              <p className="text-xs text-white leading-relaxed">
                {SPA_STEPS_CONFIG[missionStepIndex].instruction}
              </p>
              <p className="text-[11px] text-[#D4AF37] italic">
                💡 {SPA_STEPS_CONFIG[missionStepIndex].tip}
              </p>
              <p className="text-[10px] text-[#F1E5C8] bg-[#D4AF37]/10 p-2 rounded-lg border border-[#D4AF37]/20 mt-1">
                ✨ <strong>Adaptação ({careProfile.title}):</strong>{' '}
                {missionStepIndex === 0
                  ? careProfile.stepsTip
                  : missionStepIndex === 1
                    ? careProfile.washTip
                    : careProfile.sunProtectionTip}
              </p>
            </div>

            {/* Botões Voltar / Avançar */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  if (missionStepIndex > 0) {
                    setMissionStepIndex((i) => i - 1)
                  } else {
                    setCurrentFlowStep('intencao')
                  }
                }}
                className="min-h-[44px] rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white font-medium text-xs flex items-center justify-center gap-1 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Voltar</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (missionStepIndex < SPA_STEPS_CONFIG.length - 1) {
                    setMissionStepIndex((i) => i + 1)
                  } else {
                    setCurrentFlowStep('respiracao')
                  }
                }}
                className="min-h-[44px] rounded-xl bg-[#D4AF37] hover:bg-[#B8962E] text-black font-bold text-xs flex items-center justify-center gap-1 shadow-md active:scale-95 transition-all cursor-pointer"
              >
                <span>
                  {missionStepIndex < SPA_STEPS_CONFIG.length - 1
                    ? 'Concluir etapa'
                    : 'Ir para Respiração'}
                </span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* PASSO 3: RESPIRAÇÃO GUIADA */}
        {currentFlowStep === 'respiracao' && (
          <div className="space-y-3.5 text-center relative z-10 animate-fade-in">
            <div className="space-y-0.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] font-bold uppercase tracking-wider">
                <Wind className="w-3 h-3" />
                <span>3. Pausa & Presença Guiada</span>
              </div>
              <h3 className="font-serif text-base font-bold text-white">Respire com Seus Fios</h3>
              <p className="text-xs text-[#B3B3B3]">
                Solte os ombros e conecte-se com sua intenção: “{selectedIntention}”
              </p>
            </div>

            {/* Animação Visual da Respiração */}
            <div className="relative py-2 flex flex-col items-center justify-center min-h-[160px]">
              <div
                className={`w-28 h-28 rounded-full border-2 border-[#D4AF37] flex flex-col items-center justify-center shadow-[0_0_24px_rgba(212,175,55,0.35)] transition-transform ${
                  isReducedMotion
                    ? 'bg-[#241E11]'
                    : breathPhase === 'inhale'
                      ? 'scale-115 bg-gradient-to-br from-[#2D2413] to-[#14120E] transition-all duration-1000'
                      : breathPhase === 'hold'
                        ? 'scale-115 bg-[#251E12]'
                        : 'scale-90 bg-gradient-to-br from-[#1A1813] to-[#0F0E0C] transition-all duration-1000'
                }`}
              >
                <span className="font-serif text-sm font-bold text-[#F1E5C8]">
                  {breathPhase === 'inhale'
                    ? 'Inspire...'
                    : breathPhase === 'hold'
                      ? 'Segure...'
                      : 'Expire...'}
                </span>
                <span className="font-mono text-lg font-black text-white">{secondsLeft}s</span>
              </div>

              <div className="mt-2 text-[11px] text-[#A0A0A0] flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>
                  {breathingCycles === 0
                    ? 'Primeiro ciclo em andamento'
                    : `${breathingCycles} ${breathingCycles === 1 ? 'ciclo concluído' : 'ciclos concluídos'}`}
                </span>
              </div>
            </div>

            {/* Ações da respiração */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() => setIsBreathingRunning(!isBreathingRunning)}
                className="min-h-[42px] rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white font-medium text-xs flex items-center justify-center gap-1"
              >
                {isBreathingRunning ? (
                  'Pausar'
                ) : (
                  <Play className="w-3.5 h-3.5 fill-current text-[#D4AF37]" />
                )}
                <span>{isBreathingRunning ? 'Pausar' : 'Continuar'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setBreathPhase('inhale')
                  setSecondsLeft(4)
                  setBreathingCycles(0)
                  setIsBreathingRunning(true)
                }}
                className="min-h-[42px] rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white font-medium text-xs flex items-center justify-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Recomeçar</span>
              </button>
            </div>

            {/* Concluir respiração */}
            <button
              type="button"
              onClick={() => setCurrentFlowStep('diario')}
              className="w-full min-h-[46px] rounded-xl bg-[#D4AF37] hover:bg-[#B8962E] text-black font-bold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
            >
              <span>Concluir respiração e abrir Diário</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* PASSO 4: NOTA NO DIÁRIO */}
        {currentFlowStep === 'diario' && (
          <div className="space-y-3.5 text-left relative z-10 animate-fade-in">
            <div className="text-center space-y-0.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] font-bold uppercase tracking-wider">
                <BookHeart className="w-3 h-3" />
                <span>4. Reflexão no Diário</span>
              </div>
              <h3 className="font-serif text-base font-bold text-white">Como você se sentiu?</h3>
              <p className="text-xs text-[#B3B3B3]">
                Registre em até 140 caracteres a sensação desse momento de spa
              </p>
            </div>

            {/* Resumo da Intenção e da Missão */}
            <div className="rounded-xl border border-[#D4AF37]/30 bg-[#1C1812] p-2.5 flex items-center justify-between text-xs">
              <span className="text-[#888888]">Intenção:</span>
              <span className="font-bold text-[#F1E5C8]">“{selectedIntention}”</span>
            </div>

            {/* Campo do diário */}
            <div className="space-y-1">
              <textarea
                value={diaryNote}
                onChange={(e) => setDiaryNote(e.target.value)}
                maxLength={140}
                rows={3}
                placeholder="Ex.: Fios soltos, mente calma e sensação de renovação completa..."
                className="w-full p-3 rounded-xl border border-white/15 bg-black/40 text-white placeholder-white/30 text-xs focus:outline-none focus:border-[#D4AF37] resize-none"
                aria-label="Como você se sentiu após o spa capilar?"
              />
              <div className="flex justify-end text-[10px] text-[#888888]">
                <span>{diaryNote.length} / 140</span>
              </div>
            </div>

            {/* Ações */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() => setCurrentFlowStep('respiracao')}
                className="min-h-[44px] rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white font-medium text-xs flex items-center justify-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Voltar</span>
              </button>

              <button
                type="button"
                onClick={handleFinishSpa}
                className="min-h-[44px] rounded-xl bg-[#D4AF37] hover:bg-[#B8962E] text-black font-bold text-xs flex items-center justify-center gap-1 shadow-md active:scale-95 transition-all cursor-pointer"
              >
                <span>Finalizar Spa ✨</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* PASSO 5: CELEBRAÇÃO & RITUAL PERFEITO */}
        {currentFlowStep === 'celebracao' && (
          <div className="space-y-4 text-center relative z-10 animate-fade-in py-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37] text-black text-[11px] font-black uppercase tracking-wider shadow-md">
              <Crown className="w-3.5 h-3.5" />
              <span>Spa da Semana Concluído!</span>
            </div>

            {/* Medalha / Selo Dourado */}
            <div className="py-2 flex justify-center">
              <div className="w-20 h-20 rounded-full border-2 border-[#D4AF37] bg-gradient-to-br from-[#2D2413] to-[#12110D] flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.5)]">
                <Sparkles className="w-10 h-10 text-[#D4AF37]" />
              </div>
            </div>

            <div className="space-y-1">
              <h2 className="font-serif text-xl font-bold text-white">
                Tríade de Autocuidado Dominada!
              </h2>
              <p className="text-xs text-[#E6DCB8] leading-relaxed max-w-xs mx-auto">
                Você harmonizou a intenção “{selectedIntention}”, o ritual de spa capilar, a
                respiração consciente e sua nota no diário.
              </p>
            </div>

            {/* Recompensas conquistadas */}
            <div className="rounded-2xl border border-[#D4AF37]/35 bg-[#171410] p-3 space-y-1.5 text-xs text-left">
              <div className="flex justify-between items-center text-[#D4AF37] font-bold">
                <span>Pontos Conquistados:</span>
                <span className="font-serif text-sm">+95 pts</span>
              </div>
              <div className="flex justify-between items-center text-[#F1E5C8]">
                <span>Recompensa Desbloqueada:</span>
                <span className="font-semibold">Faixa Spa Dourada</span>
              </div>
              <div className="flex justify-between items-center text-[#81C784]">
                <span>Streak de Spas:</span>
                <span className="font-bold">
                  {streakResultInfo.streakCount >= 4
                    ? `${streakResultInfo.streakCount}/4 semanas seguidas 🔥`
                    : `${streakResultInfo.streakCount}/4 semanas seguidas`}
                </span>
              </div>
              {streakResultInfo.isNewSpaStreak && (
                <div className="pt-1.5 border-t border-[#D4AF37]/30 text-center">
                  <span className="inline-block px-2.5 py-1 rounded-full bg-[#D4AF37] text-black font-extrabold text-[10px] uppercase tracking-wider animate-bounce">
                    ✨ Novo Acessório: Colar de Conchas Dourado Desbloqueado!
                  </span>
                </div>
              )}
            </div>

            {/* Botões de Ação */}
            <div className="space-y-2 pt-1">
              {onShareCard && (
                <button
                  type="button"
                  onClick={() => {
                    onShareCard({
                      missionTitle: 'Spa da Semana',
                      points: 95,
                      rewardName: 'Faixa Spa Dourada',
                      completedAt: new Intl.DateTimeFormat('pt-BR', {
                        day: '2-digit',
                        month: 'short',
                      }).format(new Date()),
                      achievementType: streakResultInfo.isNewSpaStreak
                        ? 'spa-streak'
                        : 'ritual-perfeito',
                      weeklyIntention: selectedIntention,
                    })
                    onClose()
                  }}
                  className="w-full min-h-[46px] rounded-xl bg-[#D4AF37] hover:bg-[#B8962E] text-black font-bold text-xs flex items-center justify-center gap-2 shadow-md active:scale-95 cursor-pointer"
                >
                  <Share2 className="w-4 h-4 stroke-[2.5]" />
                  <span>Compartilhar Card do Spa</span>
                </button>
              )}

              <button
                type="button"
                onClick={onClose}
                className="w-full min-h-[42px] rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white font-medium text-xs transition-colors"
              >
                Concluir e Voltar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
