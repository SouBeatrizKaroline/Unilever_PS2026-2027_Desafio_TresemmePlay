import React from 'react'
import { Sparkles, ArrowRight, Lightbulb } from 'lucide-react'

export interface DailyTipItem {
  id: string
  title: string
  description: string
  actionLabel?: string
  actionTarget?: string
}

export const DAILY_TIPS: DailyTipItem[] = [
  {
    id: 'foco',
    title: 'Modo Foco em Missões',
    description:
      'Durante qualquer ritual, clique em "Modo Foco" para esconder distrações, ouvir o som ambiente e ver só o passo atual.',
    actionLabel: 'Ver missões',
    actionTarget: 'missoes',
  },
  {
    id: 'respiracao',
    title: 'Respiração Consciente 4-4-4',
    description:
      'Completar 1 ciclo de respiração guiada por dia contribui diretamente para destravar o "Ritual Perfeito" e recompensas raras.',
    actionLabel: 'Abrir respiração',
    actionTarget: 'respirar',
  },
  {
    id: 'cofrinho',
    title: 'Cofrinho de Looks Salvos',
    description:
      'Você pode salvar até 4 combinações favoritas de avatar + acessórios e alternar entre elas com apenas um clique.',
    actionLabel: 'Ver cofrinho',
    actionTarget: 'cofrinho',
  },
  {
    id: 'estante',
    title: 'Estante de Cartas & Códigos',
    description:
      'Amigas e familiares podem te enviar cartinhas pelo Modo Presente. Use o código TP_LETTER na estante para guardá-las para sempre.',
    actionLabel: 'Abrir estante',
    actionTarget: 'estante',
  },
  {
    id: 'exportar-diario',
    title: 'Exportação Visual do Diário',
    description:
      'Suas anotações de autocuidado podem ser impressas ou exportadas em PNG com moldura dourada e resumo de intenções.',
    actionLabel: 'Ver diário',
    actionTarget: 'diario',
  },
  {
    id: 'modo-presente',
    title: 'Gentileza no Modo Presente',
    description:
      'Envie uma mensagem acolhedora com selo TRESemmé e moldura personalizável para presentear alguém querido pelo WhatsApp.',
    actionLabel: 'Enviar presente',
    actionTarget: 'presente',
  },
  {
    id: 'spa-streak',
    title: 'Streak do Spa de Domingo',
    description:
      'Concluir o Spa Capilar em 4 semanas seguidas desbloqueia um selo dourado exclusivo e pontos especiais na sua jornada.',
    actionLabel: 'Ver spa',
    actionTarget: 'spa',
  },
  {
    id: 'avatar-inclusivo',
    title: 'Novo: Corte e Comprimento do Cabelo',
    description:
      'O editor de avatar agora inclui Careca, Curto Rente, Volume, Médio e Longo com dicas adaptadas de salão e fotoproteção.',
    actionLabel: 'Editar avatar',
    actionTarget: 'avatar',
  },
]

export function getTodayTip(): DailyTipItem {
  const now = new Date()
  const dayOfYear = Math.floor(
    (now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24),
  )
  const index = Math.abs(dayOfYear) % DAILY_TIPS.length
  return DAILY_TIPS[index]
}

interface DailyTipCardProps {
  onAction?: (target: string) => void
}

export const DailyTipCard: React.FC<DailyTipCardProps> = ({ onAction }) => {
  const tip = React.useMemo(() => getTodayTip(), [])

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#D4AF37]/35 bg-gradient-to-br from-[#1C1811] via-[#14120E] to-[#0D0D0D] p-3.5 text-left shadow-sm">
      <div className="flex items-start gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-[#D4AF37]/40 bg-[#D4AF37]/15 text-[#D4AF37]">
          <Lightbulb className="h-4 w-4" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#D4AF37] font-bold">
              Dica do dia
            </span>
            <span className="text-[10px] text-white/40">•</span>
            <span className="text-[10px] text-white/60 truncate font-medium">Recurso do app</span>
          </div>

          <h4 className="text-xs font-bold text-white leading-tight">{tip.title}</h4>
          <p className="text-[11px] text-[#B3B3B3] leading-relaxed mt-1">{tip.description}</p>

          {tip.actionLabel && tip.actionTarget && (
            <button
              type="button"
              onClick={() => onAction?.(tip.actionTarget!)}
              className="mt-2.5 inline-flex items-center gap-1 text-[11px] font-bold text-[#D4AF37] hover:text-[#F1E5C8] transition-colors"
            >
              <span>{tip.actionLabel}</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
