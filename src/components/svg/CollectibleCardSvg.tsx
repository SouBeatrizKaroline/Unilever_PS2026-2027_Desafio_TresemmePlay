import React from 'react'
import type { CollectibleCardItem } from '@/types/game'

export interface CollectibleCardSvgProps {
  card: CollectibleCardItem
  isUnlocked?: boolean
  className?: string
  reducedMotion?: boolean
}

export const CollectibleCardSvg: React.FC<CollectibleCardSvgProps> = ({
  card,
  isUnlocked = false,
  className = 'w-full h-44',
  reducedMotion = false,
}) => {
  const gradId = `card-gold-grad-${card.id}`
  const bgGradId = `card-bg-grad-${card.id}`

  const renderArtwork = () => {
    switch (card.goldArtworkType) {
      case 'constellation':
        // Cartão 1: Constelação com envelope e cartas de luz
        return (
          <g transform="translate(100, 68)">
            {/* Círculo estelar */}
            <circle
              cx="0"
              cy="0"
              r="34"
              fill="#18140D"
              stroke={`url(#${gradId})`}
              strokeWidth="1.8"
            />
            <circle
              cx="0"
              cy="0"
              r="28"
              stroke="#FFF1CC"
              strokeWidth="0.8"
              strokeDasharray="3 3"
              opacity="0.6"
            />
            {/* Envelope Dourado Central */}
            <rect
              x="-14"
              y="-9"
              width="28"
              height="18"
              rx="3"
              fill={`url(#${gradId})`}
              stroke="#FFF1CC"
              strokeWidth="1"
            />
            <path
              d="M-14 -9 L0 3 L14 -9"
              stroke="#1C150A"
              strokeWidth="1.4"
              fill="none"
              strokeLinejoin="round"
            />
            <path d="M-14 9 L-3 -1 M14 9 L3 -1" stroke="#1C150A" strokeWidth="1" fill="none" />
            <circle cx="0" cy="3" r="1.8" fill="#FFFFFF" />
            {/* Estrelas conectadas */}
            <line
              x1="-24"
              y1="-20"
              x2="-14"
              y2="-9"
              stroke="#D4AF37"
              strokeWidth="0.8"
              strokeDasharray="2 2"
            />
            <line
              x1="24"
              y1="-18"
              x2="14"
              y2="-9"
              stroke="#D4AF37"
              strokeWidth="0.8"
              strokeDasharray="2 2"
            />
            <circle cx="-24" cy="-20" r="2" fill="#FFFFFF" />
            <circle cx="24" cy="-18" r="2.2" fill="#FFF1CC" />
            <circle cx="-20" cy="20" r="1.6" fill="#D4AF37" />
            <circle cx="20" cy="22" r="1.8" fill="#FFFFFF" />
          </g>
        )

      case 'lotus-sun':
        // Cartão 2: Lótus com raios solares dourados
        return (
          <g transform="translate(100, 68)">
            <circle
              cx="0"
              cy="0"
              r="34"
              fill="#18140D"
              stroke={`url(#${gradId})`}
              strokeWidth="1.8"
            />
            {/* Pétalas da flor */}
            <ellipse cx="0" cy="0" rx="7" ry="18" fill={`url(#${gradId})`} />
            <ellipse
              cx="0"
              cy="0"
              rx="7"
              ry="18"
              transform="rotate(45)"
              fill={`url(#${gradId})`}
              opacity="0.85"
            />
            <ellipse
              cx="0"
              cy="0"
              rx="7"
              ry="18"
              transform="rotate(-45)"
              fill={`url(#${gradId})`}
              opacity="0.85"
            />
            <ellipse
              cx="0"
              cy="0"
              rx="7"
              ry="18"
              transform="rotate(90)"
              fill={`url(#${gradId})`}
              opacity="0.7"
            />
            <circle cx="0" cy="0" r="7" fill="#20180F" stroke="#FFF1CC" strokeWidth="1.5" />
            <circle cx="0" cy="0" r="3.5" fill="#FFFFFF" />
            {/* Raios externos */}
            <circle cx="0" cy="-26" r="1.6" fill="#FFF1CC" />
            <circle cx="26" cy="0" r="1.6" fill="#FFF1CC" />
            <circle cx="0" cy="26" r="1.6" fill="#FFF1CC" />
            <circle cx="-26" cy="0" r="1.6" fill="#FFF1CC" />
          </g>
        )

      case 'golden-shell':
        // Cartão 3: Búzio da serenidade com pérola cintilante
        return (
          <g transform="translate(100, 68)">
            <circle
              cx="0"
              cy="0"
              r="34"
              fill="#18140D"
              stroke={`url(#${gradId})`}
              strokeWidth="1.8"
            />
            {/* Concha */}
            <path
              d="M-18 10 C-18 -12 -8 -24 0 -24 C8 -24 18 -12 18 10 C12 20 -12 20 -18 10 Z"
              fill={`url(#${gradId})`}
              stroke="#FFF1CC"
              strokeWidth="1"
            />
            <path d="M0 -24 L0 18" stroke="#1A1208" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M-8 -18 L-5 16" stroke="#1A1208" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M8 -18 L5 16" stroke="#1A1208" strokeWidth="1.2" strokeLinecap="round" />
            {/* Pérola central */}
            <circle cx="0" cy="14" r="5" fill="#FFFFFF" stroke="#D4AF37" strokeWidth="1.2" />
            <circle cx="-1.5" cy="12.5" r="1.8" fill="#FFFFFF" />
            {/* Cristais ao redor */}
            <circle cx="-22" cy="-8" r="2" fill="#FFF1CC" />
            <circle cx="22" cy="-8" r="2" fill="#FFF1CC" />
          </g>
        )

      case 'crown-gem':
      default:
        // Cartão 4: Coroa das Afinidades e cetro dourado
        return (
          <g transform="translate(100, 68)">
            <circle
              cx="0"
              cy="0"
              r="34"
              fill="#18140D"
              stroke={`url(#${gradId})`}
              strokeWidth="1.8"
            />
            {/* Coroa Majestic */}
            <path
              d="M-18 12 L-13 -6 L-7 0 L0 -14 L7 0 L13 -6 L18 12 Z"
              fill={`url(#${gradId})`}
              stroke="#FFF1CC"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
            <rect x="-18" y="12" width="36" height="5" rx="2" fill="#FFF1CC" />
            <circle cx="-13" cy="-8" r="2.2" fill="#FFFFFF" />
            <circle cx="0" cy="-17" r="3" fill="#FFFFFF" stroke="#D4AF37" strokeWidth="1" />
            <circle cx="13" cy="-8" r="2.2" fill="#FFFFFF" />
            <circle cx="0" cy="14.5" r="1.6" fill="#1C150A" />
            <circle cx="-10" cy="14.5" r="1.3" fill="#1C150A" />
            <circle cx="10" cy="14.5" r="1.3" fill="#1C150A" />
          </g>
        )
    }
  }

  return (
    <svg
      viewBox="0 0 200 136"
      className={`rounded-2xl overflow-hidden block ${className} ${
        reducedMotion ? '' : 'transition-transform duration-300 hover:scale-[1.02]'
      }`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={`${card.title} - ${isUnlocked ? 'Desbloqueado' : 'Bloqueado'}`}
    >
      <defs>
        <linearGradient id={bgGradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={isUnlocked ? '#2A2012' : '#171717'} />
          <stop offset="50%" stopColor={isUnlocked ? '#1B150D' : '#111111'} />
          <stop offset="100%" stopColor={isUnlocked ? '#0F0C08' : '#0A0A0A'} />
        </linearGradient>

        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={isUnlocked ? '#FFF4D0' : '#888888'} />
          <stop offset="35%" stopColor={isUnlocked ? '#D4AF37' : '#666666'} />
          <stop offset="70%" stopColor={isUnlocked ? '#B8860B' : '#444444'} />
          <stop offset="100%" stopColor={isUnlocked ? '#F5D77F' : '#555555'} />
        </linearGradient>
      </defs>

      {/* Cartão retangular de fundo */}
      <rect
        x="2"
        y="2"
        width="196"
        height="132"
        rx="14"
        fill={`url(#${bgGradId})`}
        stroke={isUnlocked ? '#D4AF37' : '#333333'}
        strokeWidth={isUnlocked ? '2' : '1'}
      />

      {/* Moldura ornamental interna */}
      <rect
        x="6"
        y="6"
        width="188"
        height="124"
        rx="10"
        stroke={isUnlocked ? '#D4AF37' : '#2A2A2A'}
        strokeWidth="0.8"
        strokeDasharray="4 3"
        opacity={isUnlocked ? '0.7' : '0.4'}
      />

      {/* Brilho de fundo suave quando desbloqueado */}
      {isUnlocked && <circle cx="100" cy="68" r="42" fill="#D4AF37" opacity="0.12" />}

      {/* Desenho SVG temático */}
      {renderArtwork()}

      {/* Número do Cartão Colecionável no canto superior esquerdo */}
      <rect x="12" y="12" width="38" height="16" rx="8" fill={isUnlocked ? '#D4AF37' : '#262626'} />
      <text
        x="31"
        y="23"
        fill={isUnlocked ? '#0D0D0D' : '#999999'}
        fontSize="9"
        fontFamily="sans-serif"
        fontWeight="bold"
        textAnchor="middle"
      >
        Nº 0{card.number}
      </text>

      {/* Selo TRESemmé Play no canto superior direito */}
      <text
        x="184"
        y="22"
        fill={isUnlocked ? '#D4AF37' : '#666666'}
        fontSize="8"
        fontFamily="serif"
        fontWeight="bold"
        textAnchor="end"
        letterSpacing="0.5"
      >
        COLECIONÁVEL
      </text>

      {/* Barra inferior com meta de cartas lidas */}
      <rect x="12" y="112" width="176" height="15" rx="7.5" fill="#000000" opacity="0.5" />
      <text
        x="100"
        y="122.5"
        fill={isUnlocked ? '#F1E5C8' : '#888888'}
        fontSize="8"
        fontFamily="sans-serif"
        fontWeight="bold"
        textAnchor="middle"
      >
        {isUnlocked
          ? `★ Conquistado com ${card.requiredReadLetters} cartas lidas`
          : `Bloqueado • Requer ${card.requiredReadLetters} cartas lidas`}
      </text>
    </svg>
  )
}
