import React, { useState, useEffect } from 'react'
import { useGame } from '@/context/GameContext'
import {
  Sparkles,
  Gift,
  Eye,
  BookHeart,
  User,
  ArrowRight,
  ArrowLeft,
  Check,
  X,
  Compass,
} from 'lucide-react'

export interface TourStep {
  id: string
  title: string
  subtitle: string
  description: string
  badge: string
  icon: React.ReactNode
  targetTab?: 'inicio' | 'missoes' | 'acessorios'
  highlightSelector?: string
}

interface GuidedTourModalProps {
  isOpen: boolean
  onClose: () => void
  onComplete: () => void
  onSwitchTab?: (tab: 'inicio' | 'missoes' | 'acessorios') => void
}

export const GuidedTourModal: React.FC<GuidedTourModalProps> = ({
  isOpen,
  onClose,
  onComplete,
  onSwitchTab,
}) => {
  const { journey } = useGame()
  const isReducedMotion = journey.reducedMotion
  const [currentStepIndex, setCurrentStepIndex] = useState(0)

  const steps: TourStep[] = [
    {
      id: 'bem-vinda',
      title: 'Boas-vindas ao TRESemmé Play',
      subtitle: 'Seu santuário diário de autocuidado e beleza capilar',
      description:
        'Criamos um espaço acolhedor para transformar a sua rotina com os fios em momentos sagrados de presença, bem-estar e sofisticação profissional.',
      badge: 'Passo 1 de 5 • Visão Geral',
      icon: <Sparkles className="w-6 h-6 text-[#D4AF37]" />,
      targetTab: 'inicio',
    },
    {
      id: 'missoes',
      title: 'Missões & Rituais Práticos',
      subtitle: 'Passo a passo com acabamento de salão',
      description:
        'Explore penteados diários, hidratações noturnas, massagens relaxantes e o Spa da Semana. A cada ritual concluído com carinho, você acumula pontos de autocuidado.',
      badge: 'Passo 2 de 5 • Missões',
      icon: <Compass className="w-6 h-6 text-[#D4AF37]" />,
      targetTab: 'missoes',
      highlightSelector: '[data-tour="missoes"]',
    },
    {
      id: 'acessorios',
      title: 'Acessórios & Cofrinho Dourado',
      subtitle: 'Joias, presilhas e coroas para o seu avatar',
      description:
        'Use seus pontos conquistados para desbloquear presilhas, tiaras, lenços de cetim e broches exclusivos. Combine peças e salve seus looks favoritos no cofrinho.',
      badge: 'Passo 3 de 5 • Cofrinho',
      icon: <Gift className="w-6 h-6 text-[#D4AF37]" />,
      targetTab: 'acessorios',
      highlightSelector: '[data-tour="acessorios"]',
    },
    {
      id: 'acessibilidade',
      title: 'Painel "Aa" de Acessibilidade',
      subtitle: 'Conforto visual, redução de movimento e sons relaxantes',
      description:
        'No botão circular "Aa", você ajusta o tamanho da tipografia (Pequeno, Médio, Grande), ativa o modo de animações reduzidas e pode ouvir sons ambiente suaves sintetizados sem download.',
      badge: 'Passo 4 de 5 • Conforto & Inclusão',
      icon: <Eye className="w-6 h-6 text-[#D4AF37]" />,
      highlightSelector: '[data-tour="acessibilidade"]',
    },
    {
      id: 'perfil-diario',
      title: 'Diário, Estatísticas & Afeto',
      subtitle: 'Constância dourada e reflexões que ficam com você',
      description:
        'Registre notas no Diário de Autocuidado, acompanhe seu ritmo nas estatísticas semanais e presenteie amigas queridas com cards inspiradores. Tudo salvo com privacidade no seu aparelho.',
      badge: 'Passo 5 de 5 • Diário & Perfil',
      icon: <BookHeart className="w-6 h-6 text-[#D4AF37]" />,
      targetTab: 'inicio',
      highlightSelector: '[data-tour="perfil"]',
    },
  ]

  // Sincroniza aba da aplicação caso o passo atual recomende uma aba específica
  useEffect(() => {
    if (isOpen) {
      const step = steps[currentStepIndex]
      if (step?.targetTab && onSwitchTab) {
        onSwitchTab(step.targetTab)
      }
    }
  }, [currentStepIndex, isOpen])

  if (!isOpen) return null

  const currentStep = steps[currentStepIndex]
  const isFirstStep = currentStepIndex === 0
  const isLastStep = currentStepIndex === steps.length - 1

  const handleNext = () => {
    if (isLastStep) {
      onComplete()
    } else {
      setCurrentStepIndex((prev) => prev + 1)
    }
  }

  const handlePrev = () => {
    if (!isFirstStep) {
      setCurrentStepIndex((prev) => prev - 1)
    }
  }

  const handleSkip = () => {
    onClose()
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="tour-modal-title"
      aria-describedby="tour-modal-desc"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
    >
      <div
        className={`w-full max-w-md rounded-3xl border-2 border-[#D4AF37] bg-gradient-to-b from-[#221C14] via-[#161411] to-[#0D0D0D] p-5 sm:p-6 text-white shadow-[0_0_50px_rgba(212,175,55,0.35)] relative overflow-hidden flex flex-col justify-between transition-all duration-200 ${
          isReducedMotion ? '' : 'animate-scale-in'
        }`}
      >
        {/* Luz ambiente dourada decorativa */}
        <div className="absolute top-0 right-0 w-48 h-36 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Topo: Selo do Passo + Botão Pular/Fechar */}
        <div className="flex items-center justify-between relative z-10 mb-4">
          <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#F1E5C8] font-bold">
            {currentStep.badge}
          </span>

          <button
            type="button"
            onClick={handleSkip}
            className="text-xs text-white/50 hover:text-white px-2 py-1 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-1 min-h-[36px]"
            title="Pular passeio guiado"
            aria-label="Pular passeio guiado"
          >
            <span>Pular</span>
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Conteúdo Central */}
        <div className="space-y-3 relative z-10 text-left my-2">
          {/* Ícone com moldura iluminada */}
          <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center shadow-inner">
            {currentStep.icon}
          </div>

          <div className="space-y-1">
            <h2
              id="tour-modal-title"
              className="font-serif text-xl sm:text-2xl font-bold text-white leading-tight"
            >
              {currentStep.title}
            </h2>
            <p className="text-xs sm:text-sm font-medium text-[#F1E5C8]">{currentStep.subtitle}</p>
          </div>

          <p
            id="tour-modal-desc"
            className="text-xs sm:text-sm text-[#CCCCCC] leading-relaxed pt-1"
          >
            {currentStep.description}
          </p>

          {/* Dica de contexto amigável */}
          <div className="pt-2">
            <div className="rounded-xl border border-white/10 bg-white/5 p-2.5 flex items-center gap-2 text-[11px] text-[#A0A0A0]">
              <span className="text-[#D4AF37] font-bold">Dica:</span>
              <span>
                Você pode rever este passeio a qualquer momento no perfil ou no painel Aa.
              </span>
            </div>
          </div>
        </div>

        {/* Rodapé: Indicadores de passos (dots) e botões de navegação */}
        <div className="pt-4 border-t border-white/10 relative z-10 flex flex-col gap-3">
          {/* Indicadores de bolinhas */}
          <div className="flex items-center justify-center gap-2">
            {steps.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setCurrentStepIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentStepIndex
                    ? 'w-7 bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.6)]'
                    : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Ir para passo ${idx + 1}: ${s.title}`}
                aria-current={idx === currentStepIndex ? 'step' : undefined}
              />
            ))}
          </div>

          {/* Botões de Ação */}
          <div className="flex items-center justify-between gap-2.5 pt-1">
            {!isFirstStep ? (
              <button
                type="button"
                onClick={handlePrev}
                className="min-h-[46px] px-4 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white font-semibold text-xs sm:text-sm transition-colors flex items-center gap-1.5 active:scale-95 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 text-[#D4AF37]" />
                <span>Anterior</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSkip}
                className="min-h-[46px] px-4 rounded-xl text-white/50 hover:text-white text-xs sm:text-sm transition-colors"
              >
                Explorar por conta
              </button>
            )}

            <button
              type="button"
              onClick={handleNext}
              className="flex-1 min-h-[46px] px-5 rounded-xl bg-[#D4AF37] hover:bg-[#B8962E] text-black font-bold text-xs sm:text-sm transition-all shadow-[0_4px_16px_rgba(212,175,55,0.35)] flex items-center justify-center gap-2 active:scale-95 cursor-pointer ml-auto"
            >
              <span>{isLastStep ? 'Entendi, vamos começar!' : 'Próximo'}</span>
              {isLastStep ? (
                <Check className="w-4 h-4 stroke-[2.5]" />
              ) : (
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
