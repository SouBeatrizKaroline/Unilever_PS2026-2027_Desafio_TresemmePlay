import React, { useState, useEffect, useRef } from 'react'
import { Wind, X, Play, RotateCcw, Sparkles } from 'lucide-react'
import { useGame } from '@/context/GameContext'

interface BreathingRitualModalProps {
  isOpen: boolean
  onClose: () => void
  contextTitle?: string
}

type BreathingPhase = 'inhale' | 'hold' | 'exhale'

const PHASE_CONFIG: Record<
  BreathingPhase,
  { label: string; tip: string; duration: number; next: BreathingPhase; scale: number }
> = {
  inhale: {
    label: 'Inspire...',
    tip: 'Puxe o ar suavemente pelo nariz, expandindo o peito',
    duration: 4,
    next: 'hold',
    scale: 1.35,
  },
  hold: {
    label: 'Segure...',
    tip: 'Mantenha o ar com tranquilidade e relaxe os ombros',
    duration: 3,
    next: 'exhale',
    scale: 1.35,
  },
  exhale: {
    label: 'Expire...',
    tip: 'Solte o ar devagar pela boca, liberando tensões',
    duration: 4,
    next: 'inhale',
    scale: 0.9,
  },
}

export const BreathingRitualModal: React.FC<BreathingRitualModalProps> = ({
  isOpen,
  onClose,
  contextTitle,
}) => {
  const { journey } = useGame()
  const isReducedMotion = journey.reducedMotion

  const [phase, setPhase] = useState<BreathingPhase>('inhale')
  const [secondsLeft, setSecondsLeft] = useState<number>(PHASE_CONFIG.inhale.duration)
  const [cyclesCompleted, setCyclesCompleted] = useState<number>(0)
  const [isRunning, setIsRunning] = useState<boolean>(true)
  const { recordBreathingSession } = useGame()

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Reset ao abrir modal
  useEffect(() => {
    if (isOpen) {
      setPhase('inhale')
      setSecondsLeft(PHASE_CONFIG.inhale.duration)
      setCyclesCompleted(0)
      setIsRunning(true)
    } else {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isOpen])

  // Timer do ciclo de respiração
  useEffect(() => {
    if (!isOpen || !isRunning) {
      if (timerRef.current) clearInterval(timerRef.current)
      return
    }

    timerRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          // Muda para a próxima fase
          const currentConfig = PHASE_CONFIG[phase]
          const nextPhase = currentConfig.next
          if (nextPhase === 'inhale') {
            setCyclesCompleted((c) => c + 1)
          }
          setPhase(nextPhase)
          return PHASE_CONFIG[nextPhase].duration
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isOpen, isRunning, phase])

  if (!isOpen) return null

  const currentCfg = PHASE_CONFIG[phase]
  const currentDuration = currentCfg.duration
  const progressRatio = (currentDuration - secondsLeft + 1) / currentDuration

  const handleRestart = () => {
    setPhase('inhale')
    setSecondsLeft(PHASE_CONFIG.inhale.duration)
    setCyclesCompleted(0)
    setIsRunning(true)
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="breathing-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-3xl border border-[#D4AF37] bg-[#141414] p-5 text-center text-white shadow-[0_0_35px_rgba(212,175,55,0.3)] space-y-4 animate-scale-in relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Luz ambiente dourada de fundo */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-32 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Botão fechar */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors z-10"
          aria-label="Encerrar ritual de respiração"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Cabeçalho */}
        <div className="space-y-1 text-center pt-1 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] font-bold tracking-wider uppercase">
            <Wind className="w-3 h-3" />
            <span>Pausa Consciente</span>
          </div>
          <h2 id="breathing-modal-title" className="font-serif text-lg font-bold text-white">
            Respiração & Presença
          </h2>
          <p className="text-xs text-[#B3B3B3]">
            {contextTitle
              ? `Momento para desacelerar antes de "${contextTitle}"`
              : 'Um instante de relaxamento para conectar mente e cuidado com seus fios.'}
          </p>
        </div>

        {/* Área Visual da Animação de Respiração */}
        <div className="relative py-4 flex flex-col items-center justify-center min-h-[220px]">
          {/* Círculo Guia em SVG */}
          <div className="relative w-48 h-48 flex items-center justify-center">
            {/* Halo externo decorativo */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 200 200"
              fill="none"
            >
              <circle
                cx="100"
                cy="100"
                r="90"
                stroke="#D4AF37"
                strokeWidth="1"
                strokeDasharray="4 6"
                opacity="0.35"
              />
              {/* Barra de progresso circular dos segundos da fase */}
              <circle
                cx="100"
                cy="100"
                r="82"
                stroke="#D4AF37"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 82}
                strokeDashoffset={2 * Math.PI * 82 * (1 - progressRatio)}
                className="transition-all duration-1000 ease-linear"
                opacity={isReducedMotion ? 0.4 : 0.85}
              />
            </svg>

            {/* Círculo animado pulsante (expansão/contração em SVG/CSS) */}
            <div
              className={`w-32 h-32 rounded-full border-2 border-[#D4AF37] flex flex-col items-center justify-center shadow-[0_0_28px_rgba(212,175,55,0.35)] transition-transform ${
                isReducedMotion
                  ? 'bg-gradient-to-br from-[#241E11] to-[#121212]'
                  : 'bg-gradient-to-br from-[#2C2415] via-[#1A1813] to-[#101010]'
              }`}
              style={
                isReducedMotion
                  ? { transform: 'scale(1)' }
                  : {
                      transform: `scale(${
                        phase === 'inhale'
                          ? 1 + progressRatio * 0.35
                          : phase === 'hold'
                            ? 1.35
                            : 1.35 - progressRatio * 0.35
                      })`,
                      transition: isRunning ? 'transform 1s ease-in-out' : 'none',
                    }
              }
            >
              <span className="font-serif text-base font-extrabold text-[#F1E5C8] transition-all">
                {currentCfg.label}
              </span>
              <span className="font-mono text-xl font-black text-white mt-0.5">{secondsLeft}s</span>
            </div>
          </div>

          {/* Dica do passo atual */}
          <p className="text-xs text-[#F1E5C8] max-w-xs mt-3 min-h-[32px] px-2 leading-snug">
            {currentCfg.tip}
          </p>

          {/* Contador de Ciclos */}
          <div className="mt-2 flex items-center gap-1.5 text-[11px] text-[#A0A0A0]">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>
              {cyclesCompleted === 0
                ? 'Primeiro ciclo em andamento'
                : `${cyclesCompleted} ${cyclesCompleted === 1 ? 'ciclo concluído' : 'ciclos concluídos'}`}
            </span>
          </div>

          {isReducedMotion && (
            <p className="text-[10px] text-[#888888] pt-1 italic">
              Modo de animação reduzida ativo (transição sutil).
            </p>
          )}
        </div>

        {/* Botões de Ação */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            type="button"
            onClick={() => setIsRunning(!isRunning)}
            className="min-h-[44px] rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
          >
            {isRunning ? (
              <span>Pausar</span>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current text-[#D4AF37]" />
                <span>Continuar</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleRestart}
            className="min-h-[44px] rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Recomeçar</span>
          </button>
        </div>

        {/* Botão Concluir/Encerrar */}
        <button
          type="button"
          onClick={() => {
            // Registra a sessão de respiração concluída
            recordBreathingSession(Math.max(1, cyclesCompleted), contextTitle)
            onClose()
          }}
          className="w-full min-h-[46px] rounded-xl bg-[#D4AF37] hover:bg-[#B8962E] text-[#0D0D0D] font-bold text-xs transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-2"
        >
          <span>Concluir e registrar presença</span>
        </button>
      </div>
    </div>
  )
}
