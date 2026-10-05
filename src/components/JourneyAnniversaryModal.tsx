import React from 'react'
import { Sparkles, Calendar, Share2, X, Award, CheckCircle2 } from 'lucide-react'
import { useGame } from '@/context/GameContext'
import { ShareCardProps } from '@/components/ShareCardModal'

interface JourneyAnniversaryModalProps {
  isOpen: boolean
  days: number
  onClose: () => void
  onShareCard?: (cardData: ShareCardProps) => void
}

const MILESTONE_MESSAGES: Record<
  number,
  { title: string; badge: string; subtitle: string; reflection: string }
> = {
  7: {
    title: '7 Dias de Autocuidado',
    badge: '1ª Semana de Dedicação',
    subtitle:
      'Uma semana inteira de presença, carinho e respeito pelo seu tempo e pelos seus fios.',
    reflection:
      'Você deu os primeiros passos mais importantes: transformar o cuidado diário em um ritual sagrado de gentileza consigo e com os seus fios.',
  },
  30: {
    title: '30 Dias de Autocuidado',
    badge: '1 Mês de Maestria Dourada',
    subtitle: 'Um mês cultivando sua melhor versão com consistência, serenidade e brilho próprio.',
    reflection:
      'Em 30 dias você provou que o autocuidado não é pressa, é constância. Seus fios agradecem e sua autoconfiança reluz.',
  },
  90: {
    title: '90 Dias de Autocuidado',
    badge: 'Uma Estação de Transformação',
    subtitle: 'Três meses dedicados a honrar seu ritmo e revelar toda a beleza da sua rotina.',
    reflection:
      'Um ciclo completo de renovação. O que era intenção agora é hábito enraizado, com fios fortes, saudáveis e luminosos.',
  },
  365: {
    title: '365 Dias de Autocuidado',
    badge: '1 Ano de Brilho & Maestria',
    subtitle: 'Um ano inesquecível de evolução, acolhimento e celebração da sua identidade.',
    reflection:
      '365 dias de amor-próprio, disciplina afetuosa e autocuidado profissional. Uma jornada extraordinária gravada a ouro.',
  },
  720: {
    title: '720 Dias de Autocuidado (2 Anos)',
    badge: '2 Anos • Jornada Consolidada',
    subtitle:
      'Dois anos cultivando presença, constância e rituais que revelam sua essência mais radiante.',
    reflection:
      '720 dias celebrando a sua constância dourada! Seus passos transformaram a sua relação consigo e com os seus fios. Uma jornada sólida e inspiradora.',
  },
  1095: {
    title: '1095 Dias de Autocuidado (3 Anos)',
    badge: '3 Anos • Maestria & Tradição',
    subtitle:
      'Três anos monumentais de respeito profundo, aprendizado e rituais lendários gravados a ouro.',
    reflection:
      'Três anos inteiros honrando o seu ritmo e maestria. 1095 dias de história, afeto e acabamento de salão. Uma tradição inabalável e histórica!',
  },
}

export const JourneyAnniversaryModal: React.FC<JourneyAnniversaryModalProps> = ({
  isOpen,
  days,
  onClose,
  onShareCard,
}) => {
  const { journey, celebrateMilestone } = useGame()
  const isReducedMotion = journey.reducedMotion

  // Ao abrir o modal comemorativo, já garante que o marco e a carta especial do app fiquem gravados
  React.useEffect(() => {
    if (isOpen && days) {
      celebrateMilestone(days)
    }
  }, [isOpen, days, celebrateMilestone])

  if (!isOpen) return null

  const info = MILESTONE_MESSAGES[days] || {
    title: `${days} Dias de Autocuidado`,
    badge: 'Marco de Jornada',
    subtitle: `Você completou ${days} dias na sua jornada de autocuidado.`,
    reflection: 'Cada dia dedicado a você é uma vitória para seus fios e seu bem-estar.',
  }

  const handleShare = () => {
    celebrateMilestone(days)
    if (onShareCard) {
      onShareCard({
        missionTitle: `Marco: ${days} Dias de Autocuidado`,
        points:
          days >= 1095
            ? 300
            : days >= 720
              ? 250
              : days >= 365
                ? 200
                : days >= 90
                  ? 150
                  : days >= 30
                    ? 100
                    : 50,
        rewardName: info.badge,
        completedAt: new Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: 'short',
        }).format(new Date()),
        achievementType: 'aniversario-jornada',
        weeklyIntention: `${days} dias cuidando de mim com gentileza ✨`,
      })
    }
    onClose()
  }

  const handleClose = () => {
    celebrateMilestone(days)
    onClose()
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="anniversary-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fade-in"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-sm rounded-3xl border-2 border-[#D4AF37] bg-gradient-to-b from-[#231A0F] via-[#16130F] to-[#0E0D0C] p-6 text-white shadow-[0_0_45px_rgba(212,175,55,0.4)] space-y-5 animate-scale-in relative overflow-hidden text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow dourado */}
        <div
          className={`absolute top-0 left-1/2 -translate-x-1/2 w-52 h-36 bg-[#D4AF37]/25 rounded-full blur-3xl pointer-events-none ${
            isReducedMotion ? '' : 'animate-pulse'
          }`}
        />

        {/* Confetes SVG decorativos se não for reducedMotion */}
        {!isReducedMotion && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
            <span className="absolute top-4 left-6 w-2 h-2 rounded-full bg-[#D4AF37] animate-bounce" />
            <span className="absolute top-8 right-8 w-2 h-2 rounded-full bg-[#FFF1CC] animate-ping" />
            <span className="absolute top-16 left-12 w-1.5 h-1.5 rounded-full bg-[#F1E5C8] opacity-75" />
            <span className="absolute top-12 right-16 w-2.5 h-1 bg-[#D4AF37] rotate-45" />
          </div>
        )}

        <button
          type="button"
          onClick={handleClose}
          className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors z-10"
          aria-label="Fechar celebração de aniversário de jornada"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Badge superior */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37] text-black text-[11px] font-black uppercase tracking-wider shadow-md">
          <Calendar className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>{info.badge}</span>
        </div>

        {/* Medalha com o número de dias */}
        <div className="py-1 flex justify-center">
          <div className="w-24 h-24 rounded-full border-2 border-[#D4AF37] bg-gradient-to-br from-[#2D2413] via-[#1E1911] to-[#12110D] flex flex-col items-center justify-center shadow-[0_0_35px_rgba(212,175,55,0.6)]">
            <Sparkles className="w-5 h-5 text-[#D4AF37] mb-0.5" />
            <span className="font-serif text-2xl font-black text-white leading-none">{days}</span>
            <span className="text-[9px] uppercase tracking-wider text-[#D4AF37] font-bold">
              dias
            </span>
          </div>
        </div>

        <div className="space-y-1.5">
          <h2 id="anniversary-title" className="font-serif text-2xl font-bold text-white">
            {info.title}
          </h2>
          <p className="text-xs text-[#E6DCB8] leading-relaxed max-w-xs mx-auto">{info.subtitle}</p>
        </div>

        {/* Caixa de reflexão acolhedora */}
        <div className="rounded-2xl border border-[#D4AF37]/35 bg-[#171410] p-4 text-xs text-[#F1E5C8] leading-relaxed shadow-inner space-y-2">
          <p className="italic">“{info.reflection}”</p>
          <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-[#A0A0A0]">
            <span>Início da jornada:</span>
            <span className="font-mono text-[#D4AF37]">{journey.startDate || 'Ativo'}</span>
          </div>
        </div>

        {/* Recompensa Exclusiva de Acessório para marcos de 90 e 365 dias */}
        {days >= 90 && (
          <div className="bg-[#1C1812] border border-[#D4AF37] rounded-2xl p-3 flex items-center gap-3 text-left shadow-md">
            <div className="w-11 h-11 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center shrink-0">
              <span className="text-xl" aria-hidden="true">
                {days >= 720 ? '💎' : days >= 365 ? '👑' : '✨'}
              </span>
            </div>
            <div className="min-w-0">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-[#D4AF37]">
                {days >= 720
                  ? 'Marco Lendário de Autocuidado!'
                  : 'Acessório Exclusivo Desbloqueado!'}
              </div>
              <div className="text-xs font-serif font-bold text-white truncate">
                {days >= 1095
                  ? 'Medalha Lendária de 3 Anos • Maestria'
                  : days >= 720
                    ? 'Medalha Dourada de 2 Anos • Tradição'
                    : days >= 365
                      ? 'Coroa de Aniversário de Jornada'
                      : 'Tiara Comemorativa de Prata e Ouro'}
              </div>
              <div className="text-[11px] text-[#C4B79B]">
                {days >= 720
                  ? 'Carta Especial do App guardada na sua Estante de Cartas.'
                  : 'Já no seu Cofrinho e pronto para o Avatar.'}
              </div>
            </div>
          </div>
        )}

        {/* Botões de Ação */}
        <div className="space-y-2 pt-1">
          {onShareCard && (
            <button
              type="button"
              onClick={handleShare}
              className="w-full min-h-[46px] rounded-xl bg-[#D4AF37] hover:bg-[#B8962E] text-black font-bold text-xs flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all cursor-pointer"
            >
              <Share2 className="w-4 h-4 stroke-[2.5]" />
              <span>Gerar e Compartilhar Card 🎉</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleClose}
            className="w-full min-h-[42px] rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white font-medium text-xs transition-colors"
          >
            Guardar no Coração & Continuar
          </button>
        </div>
      </div>
    </div>
  )
}
