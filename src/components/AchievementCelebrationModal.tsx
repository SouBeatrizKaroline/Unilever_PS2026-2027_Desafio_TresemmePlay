import React from 'react'
import { ACCESSORIES_LIST } from '@/types/game'
import { Sparkles, Calendar, Layers, CheckCircle2, ChevronRight, Share2, Award } from 'lucide-react'
import { useGame } from '@/context/GameContext'

export type AchievementType =
  | 'ritual-completo'
  | 'semana-perfeita'
  | 'colecionadora'
  | 'ritual-perfeito'
  | 'spa-streak'
  | 'boas-vindas-palco'

interface AchievementCelebrationModalProps {
  type: AchievementType
  unlockedAt?: string
  onClose: () => void
  onShare?: () => void
}

export const AchievementCelebrationModal: React.FC<AchievementCelebrationModalProps> = ({
  type,
  unlockedAt,
  onClose,
  onShare,
}) => {
  const { journey } = useGame()
  const isReducedMotion = journey.reducedMotion
  const config = {
    'ritual-completo': {
      title: 'Ritual Completo!',
      badge: 'Conquista de Maestria',
      subtitle: 'Trança simples, Coque elegante e Ondas naturais dominados com excelência.',
      detailLabel: '3 de 3 rituais concluídos',
      items: ['Trança simples (+50 pts)', 'Coque elegante (+60 pts)', 'Ondas naturais (+70 pts)'],
      icon: (
        <svg
          viewBox="0 0 120 120"
          className="w-28 h-28 relative drop-shadow-[0_0_20px_rgba(212,175,55,0.6)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Medalha Ritual Completo"
        >
          <path
            d="M44 10 L60 26 L76 10 L84 40 L36 40 Z"
            fill="#8A6E1E"
            stroke="#D4AF37"
            strokeWidth="1"
          />
          <path d="M48 10 L60 22 L72 10 L78 36 L42 36 Z" fill="#D4AF37" />
          <circle cx="60" cy="70" r="44" fill="#1A1A1A" stroke="#D4AF37" strokeWidth="3" />
          <circle cx="60" cy="70" r="38" stroke="#F1E5C8" strokeWidth="1.2" strokeDasharray="3 3" />
          <circle cx="60" cy="70" r="32" fill="#242424" stroke="#D4AF37" strokeWidth="1.5" />
          <path
            d="M45 78 L49 60 L60 67 L71 60 L75 78 Z"
            fill="#D4AF37"
            stroke="#F1E5C8"
            strokeWidth="1"
          />
          <circle cx="49" cy="58" r="2.5" fill="#FFFFFF" />
          <circle cx="60" cy="65" r="3" fill="#FFFFFF" />
          <circle cx="71" cy="58" r="2.5" fill="#FFFFFF" />
          <path
            d="M32 70 C32 85 45 98 60 98 C75 98 88 85 88 70"
            stroke="#D4AF37"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="4 3"
          />
        </svg>
      ),
    },
    'semana-perfeita': {
      title: 'Semana Perfeita!',
      badge: 'Constância Dourada',
      subtitle: 'Você bateu a meta semanal com 5 rituais de autocuidado dedicados aos seus fios.',
      detailLabel: 'Meta Semanal Atingida (5/5)',
      items: [
        '5 rituais completados na semana corrente',
        'Dedicação consistente sem pressão',
        'Fios radiantes e bem cuidados',
      ],
      icon: (
        <svg
          viewBox="0 0 120 120"
          className="w-28 h-28 relative drop-shadow-[0_0_20px_rgba(212,175,55,0.6)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Medalha Semana Perfeita"
        >
          {/* Fitas superiores */}
          <path
            d="M42 8 L60 22 L78 8 L86 38 L34 38 Z"
            fill="#997B20"
            stroke="#D4AF37"
            strokeWidth="1"
          />
          <path d="M46 8 L60 18 L74 8 L80 34 L40 34 Z" fill="#D4AF37" />
          {/* Corpo do escudo estelar */}
          <circle cx="60" cy="70" r="44" fill="#1C1810" stroke="#D4AF37" strokeWidth="3" />
          <circle cx="60" cy="70" r="37" stroke="#F1E5C8" strokeWidth="1.2" strokeDasharray="2 3" />
          {/* Calendário estelar de 7 dias com 5 estrelas acesas */}
          <rect
            x="42"
            y="52"
            width="36"
            height="34"
            rx="6"
            fill="#242017"
            stroke="#D4AF37"
            strokeWidth="1.5"
          />
          <line x1="42" y1="62" x2="78" y2="62" stroke="#D4AF37" strokeWidth="1" />
          <circle cx="48" cy="57" r="1.5" fill="#D4AF37" />
          <circle cx="72" cy="57" r="1.5" fill="#D4AF37" />
          {/* Estrela central dourada reluzente */}
          <path
            d="M60 66 L62.5 72 L69 72.5 L64 76.5 L65.5 83 L60 79.5 L54.5 83 L56 76.5 L51 72.5 L57.5 72 Z"
            fill="#D4AF37"
            stroke="#FFF"
            strokeWidth="0.8"
          />
          {/* Ramos laterais */}
          <path
            d="M30 72 C30 87 43 98 60 98 C77 98 90 87 90 72"
            stroke="#D4AF37"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="3 3"
          />
        </svg>
      ),
    },
    'ritual-perfeito': {
      title: 'Ritual Perfeito!',
      badge: 'Harmonia Completa',
      subtitle:
        'Conexão sublime! Você completou um ritual capilar, uma sessão de respiração consciente e um registro no diário no mesmo dia.',
      detailLabel: 'Tríade de Autocuidado Diário (3/3)',
      items: [
        '1 Missão ou Ritual capilar concluído hoje',
        '1 Pausa guiada de respiração consciente',
        '1 Reflexão afetiva registrada no diário',
      ],
      icon: (
        <svg
          viewBox="0 0 120 120"
          className="w-28 h-28 relative drop-shadow-[0_0_24px_rgba(212,175,55,0.7)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Medalha Ritual Perfeito"
        >
          {/* Fitas superiores */}
          <path
            d="M42 8 L60 22 L78 8 L86 38 L34 38 Z"
            fill="#997B20"
            stroke="#D4AF37"
            strokeWidth="1"
          />
          <path d="M46 8 L60 18 L74 8 L80 34 L40 34 Z" fill="#D4AF37" />
          {/* Aro solar dourado */}
          <circle cx="60" cy="70" r="44" fill="#1C1810" stroke="#D4AF37" strokeWidth="3" />
          <circle cx="60" cy="70" r="37" stroke="#F1E5C8" strokeWidth="1.2" strokeDasharray="2 3" />
          {/* Sol central com raio e coração */}
          <circle cx="60" cy="70" r="24" fill="#292014" stroke="#D4AF37" strokeWidth="1.5" />
          {/* Brilhos estelares / respiração */}
          <path
            d="M60 52 L60 88 M42 70 L78 70 M47 57 L73 83 M47 83 L73 57"
            stroke="#D4AF37"
            strokeWidth="1.4"
            strokeLinecap="round"
            opacity="0.65"
          />
          <circle cx="60" cy="70" r="8" fill="#D4AF37" />
          <circle cx="60" cy="70" r="4" fill="#FFFFFF" />
          {/* Ramos de ouro */}
          <path
            d="M30 72 C30 87 43 98 60 98 C77 98 90 87 90 72"
            stroke="#D4AF37"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="3 3"
          />
        </svg>
      ),
    },
    'spa-streak': {
      title: 'Streak de Spas Dominado!',
      badge: 'Constância Dourada de Spa',
      subtitle:
        'Extraordinário! Você realizou o Spa da Semana por 4 semanas consecutivas, nutrindo seus fios e sua mente com constância e serenidade.',
      detailLabel: '4 semanas consecutivas concluídas (4/4)',
      items: [
        '4 semanas seguidas com o Spa da Semana realizado',
        'Dedicação inabalável ao seu ritual sagrado de autocuidado',
        'Desbloqueio exclusivo: Colar de Conchas Dourado',
      ],
      icon: (
        <svg
          viewBox="0 0 120 120"
          className="w-28 h-28 relative drop-shadow-[0_0_24px_rgba(212,175,55,0.7)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Medalha Streak de Spas"
        >
          {/* Fita superior */}
          <path
            d="M42 8 L60 22 L78 8 L86 38 L34 38 Z"
            fill="#997B20"
            stroke="#D4AF37"
            strokeWidth="1"
          />
          <path d="M46 8 L60 18 L74 8 L80 34 L40 34 Z" fill="#D4AF37" />
          {/* Corpo do medalhão */}
          <circle cx="60" cy="70" r="44" fill="#1C1810" stroke="#D4AF37" strokeWidth="3" />
          <circle cx="60" cy="70" r="37" stroke="#F1E5C8" strokeWidth="1.2" strokeDasharray="2 3" />
          {/* Corrente com concha e pérola */}
          <path
            d="M38 60 C44 76 76 76 82 60"
            stroke="#D4AF37"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          {/* Concha central */}
          <g transform="translate(60, 72)">
            <path
              d="M0 -4 C-9 4 -9 16 0 21 C9 16 9 4 0 -4 Z"
              fill="#D4AF37"
              stroke="#FFF"
              strokeWidth="1.2"
            />
            <line x1="0" y1="2" x2="0" y2="19" stroke="#8A6E1E" strokeWidth="1" />
            <circle cx="0" cy="5" r="3.5" fill="#FFFFFF" stroke="#D4AF37" strokeWidth="1" />
            <circle cx="-1" cy="4" r="1" fill="#FFFFFF" />
          </g>
          <circle cx="48" cy="65" r="2.2" fill="#FFFFFF" />
          <circle cx="72" cy="65" r="2.2" fill="#FFFFFF" />
          {/* Ramos dourados */}
          <path
            d="M30 72 C30 87 43 98 60 98 C77 98 90 87 90 72"
            stroke="#D4AF37"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="3 3"
          />
        </svg>
      ),
    },
    'boas-vindas-palco': {
      title: 'Boas-Vindas ao Palco!',
      badge: 'Conquista de Chegada',
      subtitle:
        'Você completou todos os passos do passeio guiado e já conhece seu santuário de autocuidado capilar.',
      detailLabel: 'Passeio Guiado Concluído (5/5)',
      items: [
        'Explorou a visão geral e a missão do TRESemmé Play',
        'Conheceu as missões práticas com acabamento de salão',
        'Descobriu o cofrinho de joias, o painel Aa e o diário de afeto',
      ],
      icon: (
        <svg
          viewBox="0 0 120 120"
          className="w-28 h-28 relative drop-shadow-[0_0_24px_rgba(212,175,55,0.7)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Medalha Boas-Vindas ao Palco"
        >
          {/* Fitas superiores */}
          <path
            d="M42 8 L60 22 L78 8 L86 38 L34 38 Z"
            fill="#997B20"
            stroke="#D4AF37"
            strokeWidth="1"
          />
          <path d="M46 8 L60 18 L74 8 L80 34 L40 34 Z" fill="#D4AF37" />
          {/* Corpo do medalhão */}
          <circle cx="60" cy="70" r="44" fill="#1C1810" stroke="#D4AF37" strokeWidth="3" />
          <circle cx="60" cy="70" r="37" stroke="#F1E5C8" strokeWidth="1.2" strokeDasharray="2 3" />
          {/* Cortina / Holofote dourado de palco */}
          <path
            d="M38 52 C45 62 55 64 60 64 C65 64 75 62 82 52 L82 86 C72 90 48 90 38 86 Z"
            fill="#2A2012"
            stroke="#D4AF37"
            strokeWidth="1.5"
          />
          {/* Estrela de palco reluzente */}
          <polygon
            points="60,56 62.5,63 69,63.5 64,68 65.5,75 60,71 54.5,75 56,68 51,63.5 57.5,63"
            fill="#D4AF37"
            stroke="#FFFFFF"
            strokeWidth="1"
          />
          <circle cx="60" cy="67" r="2.5" fill="#FFFFFF" />
          {/* Brilhos estelares */}
          <circle cx="46" cy="58" r="1.5" fill="#FFF1CC" />
          <circle cx="74" cy="58" r="1.5" fill="#FFF1CC" />
          {/* Ramos dourados de vitória */}
          <path
            d="M30 72 C30 87 43 98 60 98 C77 98 90 87 90 72"
            stroke="#D4AF37"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="3 3"
          />
        </svg>
      ),
    },
    colecionadora: {
      title: 'Colecionadora!',
      badge: 'Acervo Completo',
      subtitle: `Incrível! Você desbloqueou todos os ${ACCESSORIES_LIST.length} acessórios dourados de todas as coleções.`,
      detailLabel: `${ACCESSORIES_LIST.length} de ${ACCESSORIES_LIST.length} acessórios desbloqueados`,
      items: [
        'Coleção Original completa (Prenda, Pino, Tiara)',
        'Coleção Noturna completa (Lenço, Brincos)',
        'Coleção Despertar completa (Scrunchie, Presilha)',
        'Coleção Domingo completa (Faixa Spa)',
        'Coleção Ritual da Semana (Estrela, Laço, Coroa, Fita)',
        'Coleção Ritual Perfeito (Brilho de Harmonia, Estrela do Ritual)',
        'Coleção Streak de Spas (Colar de Conchas Dourado)',
      ],
      icon: (
        <svg
          viewBox="0 0 120 120"
          className="w-28 h-28 relative drop-shadow-[0_0_20px_rgba(212,175,55,0.6)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Medalha Colecionadora"
        >
          {/* Fita superior com brilho */}
          <path
            d="M40 8 L60 22 L80 8 L88 38 L32 38 Z"
            fill="#997B20"
            stroke="#D4AF37"
            strokeWidth="1"
          />
          <path d="M44 8 L60 18 L76 8 L82 34 L38 34 Z" fill="#F1E5C8" />
          {/* Círculo do medalhão de diamante */}
          <circle cx="60" cy="70" r="44" fill="#18151A" stroke="#D4AF37" strokeWidth="3" />
          <circle cx="60" cy="70" r="37" stroke="#E0D4FC" strokeWidth="1.2" strokeDasharray="3 2" />
          {/* Joia / Diamante estilizado com tiara */}
          <polygon points="60,48 76,62 60,88 44,62" fill="#D4AF37" stroke="#FFF" strokeWidth="1" />
          <polygon points="60,48 76,62 60,67 44,62" fill="#F1E5C8" opacity="0.8" />
          <circle cx="60" cy="62" r="3" fill="#FFFFFF" />
          {/* Coroa estelar no topo do diamante */}
          <circle cx="44" cy="56" r="2" fill="#D4AF37" />
          <circle cx="76" cy="56" r="2" fill="#D4AF37" />
          <circle cx="60" cy="45" r="2.5" fill="#FFFFFF" />
          {/* Louros da vitória */}
          <path
            d="M30 72 C30 87 43 98 60 98 C77 98 90 87 90 72"
            stroke="#D4AF37"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="4 3"
          />
        </svg>
      ),
    },
  }[type]

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="achievement-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fade-in"
    >
      {/* Confete SVG dourado respeitando reduced-motion */}
      {!isReducedMotion && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <svg className="w-full h-full" viewBox="0 0 400 600" fill="none">
            <circle cx="50" cy="70" r="4.5" fill="#D4AF37" opacity="0.85" />
            <circle cx="130" cy="120" r="3.5" fill="#F1E5C8" opacity="0.9" />
            <circle cx="210" cy="80" r="5" fill="#D4AF37" opacity="0.9" />
            <circle cx="290" cy="110" r="4" fill="#FFFFFF" opacity="0.8" />
            <circle cx="350" cy="65" r="3.5" fill="#D4AF37" opacity="0.85" />
            <circle cx="80" cy="180" r="3" fill="#F1E5C8" opacity="0.75" />
            <circle cx="320" cy="170" r="4" fill="#D4AF37" opacity="0.8" />
            <rect
              x="70"
              y="230"
              width="9"
              height="4.5"
              rx="2"
              fill="#D4AF37"
              transform="rotate(30 70 230)"
            />
            <rect
              x="320"
              y="250"
              width="9"
              height="4.5"
              rx="2"
              fill="#F1E5C8"
              transform="rotate(-25 320 250)"
            />
            <rect
              x="190"
              y="290"
              width="8"
              height="4"
              rx="2"
              fill="#D4AF37"
              transform="rotate(18 190 290)"
            />
            <rect
              x="45"
              y="340"
              width="8"
              height="4"
              rx="2"
              fill="#FFFFFF"
              transform="rotate(-35 45 340)"
            />
            <rect
              x="340"
              y="370"
              width="9"
              height="4.5"
              rx="2"
              fill="#D4AF37"
              transform="rotate(40 340 370)"
            />
          </svg>
        </div>
      )}

      <div className="w-full max-w-sm rounded-3xl border-2 border-[#D4AF37] bg-gradient-to-b from-[#1C1C1C] via-[#141414] to-[#0A0A0A] p-6 text-center text-white shadow-[0_0_50px_rgba(212,175,55,0.4)] space-y-4 animate-scale-in relative z-10">
        {/* Selo Topo */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] text-[#D4AF37] text-xs font-bold uppercase tracking-wider shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{config.badge}</span>
        </div>

        {/* Medalha SVG */}
        <div className="relative py-2 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className={`w-28 h-28 rounded-full bg-[#D4AF37]/20 blur-xl ${
                isReducedMotion ? '' : 'animate-pulse'
              }`}
            />
          </div>
          {config.icon}
        </div>

        {/* Título & Descrição */}
        <div className="space-y-1.5">
          <h2
            id="achievement-modal-title"
            className="font-serif text-2xl font-extrabold text-white"
          >
            {config.title}
          </h2>
          <p className="text-xs text-[#F1E5C8] font-medium leading-relaxed">{config.subtitle}</p>
          {unlockedAt && <p className="text-[10px] text-[#A0A0A0]">Conquistado em: {unlockedAt}</p>}
        </div>

        {/* Resumo dos Itens */}
        <div className="rounded-2xl border border-[#D4AF37]/30 bg-[#171717] p-3 text-left space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-[#D4AF37]">
            <span>Requisitos</span>
            <span className="font-mono text-white text-[11px]">{config.detailLabel}</span>
          </div>
          <div className="space-y-1.5 text-xs text-[#E0E0E0]">
            {config.items.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#81C784] shrink-0" />
                <span className="leading-snug">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Ações */}
        <div className="space-y-2.5 pt-1">
          {onShare && (
            <button
              type="button"
              onClick={onShare}
              className="w-full min-h-[48px] rounded-2xl bg-[#D4AF37] hover:bg-[#B8962E] text-[#0D0D0D] font-bold text-sm transition-all shadow-[0_4px_16px_rgba(212,175,55,0.3)] flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              <Share2 className="w-4 h-4 stroke-[2.5]" />
              <span>Compartilhar Conquista</span>
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            className="w-full min-h-[46px] rounded-2xl border border-white/20 bg-transparent hover:bg-white/5 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Ver minhas conquistas</span>
            <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
          </button>
        </div>
      </div>
    </div>
  )
}
