import React from 'react'
import type { WeeklyIllustrationKey } from '@/types/game'

export const WEEKLY_ILLUSTRATION_KEYS: WeeklyIllustrationKey[] = [
  'mecha',
  'folha',
  'lua',
  'estrela',
  'flor',
  'concha',
  'coroa',
  'espelho',
]

/**
 * Retorna a arte estável para a chave da semana informada (ex: "2025-W21").
 * Mesmo input = mesma arte.
 * Usa um hash determinístico da string para indexar no catálogo.
 */
export function getWeeklyIllustrationKey(weekKey?: string): WeeklyIllustrationKey {
  if (!weekKey) return 'mecha'
  let hash = 0
  for (let i = 0; i < weekKey.length; i++) {
    hash = (hash * 37 + weekKey.charCodeAt(i)) >>> 0
  }
  const index = hash % WEEKLY_ILLUSTRATION_KEYS.length
  return WEEKLY_ILLUSTRATION_KEYS[index]
}

export interface WeeklyCardIllustrationProps {
  artworkKey?: WeeklyIllustrationKey
  weekKey?: string
  className?: string
  size?: number
  reducedMotion?: boolean
}

export const WeeklyCardIllustration: React.FC<WeeklyCardIllustrationProps> = ({
  artworkKey,
  weekKey,
  className = 'w-12 h-12',
  size = 48,
  reducedMotion = false,
}) => {
  const resolvedKey = artworkKey || getWeeklyIllustrationKey(weekKey)

  const renderArtwork = () => {
    switch (resolvedKey) {
      case 'mecha':
        // Mecha capilar fluida dourada com brilhos
        return (
          <g>
            <path
              d="M18 10 C26 18 34 26 30 38 C27 47 33 54 42 54 C34 50 34 42 36 34 C38 24 30 16 22 10 Z"
              fill="url(#gold-grad-weekly)"
            />
            <path
              d="M26 12 C34 22 38 30 36 40 C34 46 38 50 44 50"
              stroke="#FFF1CC"
              strokeWidth="1.2"
              strokeLinecap="round"
              fill="none"
              opacity="0.9"
            />
            <circle cx="42" cy="18" r="1.8" fill="#FFFFFF" />
            <circle cx="22" cy="46" r="1.4" fill="#D4AF37" />
          </g>
        )

      case 'folha':
        // Folha botânica de hidratação e renovação capilar
        return (
          <g>
            <path
              d="M32 10 C46 16 52 30 48 46 C32 50 18 44 16 30 C20 16 28 10 32 10 Z"
              fill="url(#gold-grad-weekly)"
            />
            <path
              d="M18 46 C26 38 34 28 44 14"
              stroke="#1C170E"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <path
              d="M28 36 L34 40 M32 30 L39 33 M36 24 L43 26"
              stroke="#FFF1CC"
              strokeWidth="1.2"
              strokeLinecap="round"
              opacity="0.85"
            />
            <circle cx="48" cy="14" r="1.6" fill="#FFFFFF" />
          </g>
        )

      case 'lua':
        // Meia-lua delicada de autocuidado e serenidade noturna
        return (
          <g>
            <path
              d="M38 12 C24 16 16 30 20 44 C24 54 36 56 46 50 C36 48 30 40 32 30 C34 20 42 16 46 14 C43 13 40 12 38 12 Z"
              fill="url(#gold-grad-weekly)"
            />
            <circle cx="44" cy="22" r="1.6" fill="#FFFFFF" />
            <polygon points="46,36 47,38 49,39 47,40 46,42 45,40 43,39 45,38" fill="#FFF1CC" />
            <circle cx="22" cy="22" r="1.2" fill="#D4AF37" />
          </g>
        )

      case 'estrela':
        // Estrela reluzente de 8 pontas lapidada
        return (
          <g>
            <polygon
              points="32,10 35,24 49,21 38,30 46,42 33,37 26,48 24,35 12,32 23,24 18,12 29,19"
              fill="url(#gold-grad-weekly)"
            />
            <circle cx="32" cy="29" r="3.2" fill="#FFFFFF" />
            <circle cx="32" cy="29" r="1.8" fill="#D4AF37" />
          </g>
        )

      case 'flor':
        // Flor delicada de 5 pétalas com núcleo de cristal
        return (
          <g>
            <circle cx="32" cy="20" r="7" fill="url(#gold-grad-weekly)" opacity="0.9" />
            <circle cx="42" cy="27" r="7" fill="url(#gold-grad-weekly)" opacity="0.9" />
            <circle cx="38" cy="39" r="7" fill="url(#gold-grad-weekly)" opacity="0.9" />
            <circle cx="26" cy="39" r="7" fill="url(#gold-grad-weekly)" opacity="0.9" />
            <circle cx="22" cy="27" r="7" fill="url(#gold-grad-weekly)" opacity="0.9" />
            <circle cx="32" cy="30" r="5" fill="#241C10" stroke="#FFF1CC" strokeWidth="1.2" />
            <circle cx="32" cy="30" r="2.5" fill="#FFFFFF" />
          </g>
        )

      case 'concha':
        // Concha de búzios e pérola marinha
        return (
          <g>
            <path
              d="M18 38 C18 24 24 14 32 14 C40 14 46 24 46 38 C42 46 22 46 18 38 Z"
              fill="url(#gold-grad-weekly)"
            />
            <path d="M32 14 L32 44" stroke="#241B0E" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M26 18 L28 42" stroke="#241B0E" strokeWidth="1" strokeLinecap="round" />
            <path d="M38 18 L36 42" stroke="#241B0E" strokeWidth="1" strokeLinecap="round" />
            <circle cx="32" cy="44" r="3.5" fill="#FFFFFF" stroke="#D4AF37" strokeWidth="1" />
            <circle cx="31" cy="43" r="1.2" fill="#FFF" />
          </g>
        )

      case 'coroa':
        // Mini coroa real com pérolas
        return (
          <g>
            <path
              d="M18 38 L22 22 L27 28 L32 16 L37 28 L42 22 L46 38 Z"
              fill="url(#gold-grad-weekly)"
            />
            <rect x="18" y="38" width="28" height="4" rx="2" fill="#FFF1CC" />
            <circle cx="22" cy="20" r="2" fill="#FFFFFF" />
            <circle cx="32" cy="14" r="2.4" fill="#FFFFFF" stroke="#D4AF37" strokeWidth="0.8" />
            <circle cx="42" cy="20" r="2" fill="#FFFFFF" />
            <circle cx="32" cy="40" r="1.2" fill="#241B0E" />
          </g>
        )

      case 'espelho':
      default:
        // Espelho de mão clássico de salão de luxo
        return (
          <g>
            <ellipse
              cx="32"
              cy="26"
              rx="13"
              ry="15"
              fill="#181510"
              stroke="url(#gold-grad-weekly)"
              strokeWidth="2.5"
            />
            <ellipse cx="32" cy="26" rx="9" ry="11" fill="url(#gold-grad-weekly)" opacity="0.6" />
            <path
              d="M26 22 Q32 20 36 24"
              stroke="#FFFFFF"
              strokeWidth="1.2"
              strokeLinecap="round"
              fill="none"
            />
            <rect x="30" y="41" width="4" height="12" rx="2" fill="url(#gold-grad-weekly)" />
            <circle cx="32" cy="54" r="2" fill="#FFF1CC" />
          </g>
        )
    }
  }

  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={`shrink-0 drop-shadow-[0_2px_8px_rgba(212,175,55,0.4)] ${className} ${
        reducedMotion ? '' : 'transition-transform duration-300 hover:scale-105'
      }`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label={`Ilustração semanal dourada: ${resolvedKey}`}
      role="img"
    >
      <defs>
        <linearGradient id="gold-grad-weekly" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF1CC" />
          <stop offset="35%" stopColor="#D4AF37" />
          <stop offset="70%" stopColor="#AA8214" />
          <stop offset="100%" stopColor="#F5D77F" />
        </linearGradient>
        <radialGradient id="gold-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Halo de fundo dourado suave */}
      <circle cx="32" cy="32" r="28" fill="url(#gold-halo)" />
      {/* Círculo delicado de moldura tracejada */}
      <circle
        cx="32"
        cy="32"
        r="27"
        stroke="#D4AF37"
        strokeWidth="1"
        strokeDasharray="2 3"
        opacity="0.5"
      />

      {renderArtwork()}
    </svg>
  )
}
