import React, { useState } from 'react'
import { Sparkles, Check, ChevronDown, ChevronUp, Bell, Calendar } from 'lucide-react'

export interface AppReleaseItem {
  id: string
  title: string
  description: string
  date: string // YYYY-MM-DD
  tag: string
  actionLabel?: string
  actionTarget?: string
}

export const APP_RELEASES: AppReleaseItem[] = [
  {
    id: 'rel-avatar-comprimento',
    title: 'Editor de Avatar Inclusivo: Cortes & Careca',
    description:
      'Agora você pode escolher comprimento do cabelo (Careca com couro bem cuidado, Curto Rente Buzz, Curto com Volume, Médio e Longo), respeitando textura, tom de pele e dicas adaptadas de fotoproteção.',
    date: '2025-05-20',
    tag: 'Avatar & Inclusão',
    actionLabel: 'Personalizar avatar',
    actionTarget: 'avatar',
  },
  {
    id: 'rel-atalhos-custom',
    title: 'Atalhos Rápidos Personalizáveis',
    description:
      'Escolha quais 2 a 4 botões ficam no topo da sua Home (Spa, Respiração, Diário, Estante, Presente, Missões, Mural, etc.) para acessar seu ritual favorito mais rápido.',
    date: '2025-05-20',
    tag: 'Home',
    actionLabel: 'Ver atalhos',
    actionTarget: 'atalhos',
  },
  {
    id: 'rel-dica-do-dia',
    title: 'Dica do Dia Rotativa',
    description:
      'Cartão diário ensinando recursos especiais do app, como Modo Foco, respiração guiada, exportação do diário e cofrinho de looks.',
    date: '2025-05-20',
    tag: 'Dicas',
    actionLabel: 'Ver dicas do dia',
    actionTarget: 'dica',
  },
  {
    id: 'rel-estante-cartas',
    title: 'Estante de Cartas & Troca de Códigos',
    description:
      'Receba e colecione cartas de autocuidado enviadas por amigas e familiares através de códigos exclusivos TP_LETTER.',
    date: '2025-05-18',
    tag: 'Social',
    actionLabel: 'Abrir estante',
    actionTarget: 'estante',
  },
  {
    id: 'rel-som-ambiente',
    title: 'Sons Ambientes Relaxantes',
    description:
      'Trilhas suaves de spa, chuva leve, salão clássico e meditação para embalar seus rituais com tranquilidade.',
    date: '2025-05-15',
    tag: 'Bem-estar',
    actionLabel: 'Explorar rituais',
    actionTarget: 'missoes',
  },
]

interface NovidadesSectionProps {
  lastVisitedAt?: string
  onMarkAllSeen?: () => void
  onActionTarget?: (target: string) => void
}

export const NovidadesSection: React.FC<NovidadesSectionProps> = ({
  lastVisitedAt,
  onMarkAllSeen,
  onActionTarget,
}) => {
  const [isExpanded, setIsExpanded] = useState(false)

  // Verifica quais itens foram adicionados após a última visita
  const lastVisitTime = lastVisitedAt ? new Date(lastVisitedAt).getTime() : 0
  const isNewItem = (itemDate: string) => {
    if (!lastVisitedAt) return true
    const itemTime = new Date(`${itemDate}T23:59:59`).getTime()
    return itemTime > lastVisitTime
  }

  const newItemsCount = APP_RELEASES.filter((r) => isNewItem(r.date)).length

  return (
    <div className="rounded-2xl border border-white/10 bg-[#141414] p-4 text-left space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37]">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>Novidades do TRESemmé Play</span>
              {newItemsCount > 0 && (
                <span className="rounded-full bg-[#D4AF37] px-1.5 py-0.2 text-[9px] font-black text-black">
                  {newItemsCount} nova{newItemsCount > 1 ? 's' : ''}
                </span>
              )}
            </h3>
            <p className="text-[10px] text-[#A0A0A0]">
              Evoluções pensadas para o seu momento de autocuidado
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            const next = !isExpanded
            setIsExpanded(next)
            if (next && onMarkAllSeen && newItemsCount > 0) {
              onMarkAllSeen()
            }
          }}
          className="flex items-center gap-1 text-[11px] font-semibold text-[#D4AF37] hover:text-[#F1E5C8] transition-colors py-1 px-2 rounded-lg bg-white/5 border border-white/10"
        >
          <span>{isExpanded ? 'Recolher' : 'Ver todas'}</span>
          {isExpanded ? (
            <ChevronUp className="h-3.5 w-3.5" />
          ) : (
            <ChevronDown className="h-3.5 w-3.5" />
          )}
        </button>
      </div>

      {/* Lista de novidades: mostra a principal se recolhido ou todas se expandido */}
      <div className="space-y-2 pt-1">
        {(isExpanded ? APP_RELEASES : APP_RELEASES.slice(0, 1)).map((release) => {
          const isItemRecent = isNewItem(release.date)
          return (
            <div
              key={release.id}
              className={`rounded-xl border p-3 transition-all ${
                isItemRecent
                  ? 'border-[#D4AF37]/50 bg-gradient-to-r from-[#1F1B12] to-[#141414]'
                  : 'border-white/5 bg-white/[0.02]'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-white/80">
                    {release.tag}
                  </span>
                  {isItemRecent && (
                    <span className="rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 px-1.5 py-0.2 text-[9px] font-bold text-[#D4AF37]">
                      Novo desde sua última visita ✨
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-[#888888] font-mono">{release.date}</span>
              </div>

              <h4 className="text-xs font-bold text-white leading-snug">{release.title}</h4>
              <p className="text-[11px] text-[#B3B3B3] leading-relaxed mt-1">
                {release.description}
              </p>

              {release.actionLabel && release.actionTarget && onActionTarget && (
                <button
                  type="button"
                  onClick={() => onActionTarget(release.actionTarget!)}
                  className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-[#D4AF37] hover:text-[#F1E5C8] transition-colors"
                >
                  <span>{release.actionLabel}</span>
                  <span aria-hidden="true">→</span>
                </button>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
