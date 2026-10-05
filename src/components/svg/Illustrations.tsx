import React from 'react'

export const HeroHairIllustration: React.FC<{ className?: string }> = ({
  className = 'w-full h-48',
}) => {
  return (
    <svg
      viewBox="0 0 320 200"
      className={`shrink-0 block max-w-full h-auto aspect-[320/200] ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Ilustração decorativa de mecha capilar iluminada"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="goldFlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F1E5C8" stopOpacity="0.9" />
          <stop offset="45%" stopColor="#D4AF37" stopOpacity="1" />
          <stop offset="85%" stopColor="#8A6E1E" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#D4AF37" stopOpacity="1" />
        </linearGradient>
        <linearGradient id="darkStrand" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2A2A2A" />
          <stop offset="50%" stopColor="#151515" />
          <stop offset="100%" stopColor="#2F2B20" />
        </linearGradient>
        <radialGradient id="haloGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
        </radialGradient>
        <filter id="softBlur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      {/* Brilho halo de fundo */}
      <circle cx="160" cy="100" r="85" fill="url(#haloGlow)" filter="url(#softBlur)" />

      {/* Círculo sutil de moldura */}
      <circle
        cx="160"
        cy="100"
        r="76"
        stroke="#D4AF37"
        strokeWidth="1"
        strokeDasharray="3 6"
        opacity="0.4"
      />

      {/* Mechas volumosas onduladas */}
      <path
        d="M60 170 C90 140 100 70 140 60 C180 50 200 110 260 80"
        stroke="url(#darkStrand)"
        strokeWidth="28"
        strokeLinecap="round"
      />
      <path
        d="M60 170 C90 140 100 70 140 60 C180 50 200 110 260 80"
        stroke="#1E1E1E"
        strokeWidth="22"
        strokeLinecap="round"
      />

      {/* Mecha dourada principal em movimento de onda */}
      <path
        d="M75 160 C105 130 115 65 155 55 C195 45 210 105 270 75"
        stroke="url(#goldFlow)"
        strokeWidth="10"
        strokeLinecap="round"
      />

      {/* Fios finos luminosos entrelaçados */}
      <path
        d="M85 175 C120 145 130 75 170 70 C210 65 225 120 280 85"
        stroke="#F1E5C8"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path
        d="M68 150 C95 115 110 50 145 45 C185 40 195 95 250 70"
        stroke="#D4AF37"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.8"
      />

      {/* Partículas de brilho / sparkles */}
      {/* Sparkle 1 */}
      <g transform="translate(145, 38)">
        <path d="M0 -7 L1.5 -1.5 L7 0 L1.5 1.5 L0 7 L-1.5 1.5 L-7 0 L-1.5 -1.5 Z" fill="#D4AF37" />
        <circle cx="0" cy="0" r="1.5" fill="#FFFFFF" />
      </g>
      {/* Sparkle 2 */}
      <g transform="translate(225, 60)">
        <path d="M0 -9 L2 -2 L9 0 L2 2 L0 9 L-2 2 L-9 0 L-2 -2 Z" fill="#F1E5C8" />
        <circle cx="0" cy="0" r="2" fill="#FFFFFF" />
      </g>
      {/* Sparkle 3 */}
      <g transform="translate(95, 120)">
        <path d="M0 -6 L1 -1 L6 0 L1 1 L0 6 L-1 1 L-6 0 L-1 -1 Z" fill="#D4AF37" />
      </g>
      {/* Sparkle 4 */}
      <g transform="translate(275, 105)">
        <path d="M0 -5 L1 -1 L5 0 L1 1 L0 5 L-1 1 L-5 0 L-1 -1 Z" fill="#D4AF37" />
      </g>

      {/* Pequenos pontos de luz dourada flutuantes */}
      <circle cx="120" cy="50" r="1.5" fill="#F1E5C8" opacity="0.8" />
      <circle cx="180" cy="90" r="2" fill="#D4AF37" opacity="0.9" />
      <circle cx="210" cy="40" r="1.5" fill="#D4AF37" opacity="0.7" />
      <circle cx="240" cy="115" r="2" fill="#F1E5C8" opacity="0.9" />
      <circle cx="105" cy="155" r="1.5" fill="#D4AF37" opacity="0.6" />
    </svg>
  )
}

export const MissionThumbnailSvg: React.FC<{
  type:
    | 'braid'
    | 'bun'
    | 'waves'
    | 'night-hydration'
    | 'relaxing-massage'
    | 'morning-hydration'
    | 'day-protection'
    | 'spa-sunday'
  className?: string
}> = ({ type, className = 'w-16 h-16' }) => {
  if (type === 'spa-sunday') {
    // Spa Capilar de Domingo - Toalha macia, faixa spa dourada e gotas de óleo botânico
    return (
      <svg viewBox="0 0 80 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="80" height="80" rx="14" fill="#1A1813" stroke="#D4AF37" strokeWidth="1.2" />
        {/* Círculo suave de vapor/bem-estar */}
        <circle
          cx="40"
          cy="38"
          r="22"
          stroke="#D4AF37"
          strokeWidth="1"
          strokeDasharray="3 3"
          opacity="0.5"
        />
        <circle cx="40" cy="38" r="16" fill="#252119" stroke="#F1E5C8" strokeWidth="1.2" />
        {/* Faixa Spa Dourada no centro */}
        <path
          d="M24 44 C24 30 31 24 40 24 C49 24 56 30 56 44"
          stroke="#D4AF37"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M24 44 C24 30 31 24 40 24 C49 24 56 30 56 44"
          stroke="#161410"
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
        />
        {/* Broche central */}
        <rect x="36" y="21" width="8" height="6" rx="2" fill="#D4AF37" />
        <circle cx="40" cy="24" r="1.5" fill="#FFFFFF" />
        {/* Gotas de máscara nutritiva */}
        <circle cx="30" cy="56" r="3" fill="#D4AF37" />
        <circle cx="50" cy="56" r="3" fill="#F1E5C8" />
        <circle cx="40" cy="62" r="2" fill="#FFFFFF" />
        {/* Sparkles */}
        <circle cx="58" cy="20" r="1.5" fill="#FFFFFF" />
        <circle cx="22" cy="26" r="1.5" fill="#D4AF37" />
      </svg>
    )
  }

  if (type === 'morning-hydration') {
    // Toque de Hidratação Matinal - Sol nascente e bruma de hidratação
    return (
      <svg viewBox="0 0 80 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="80" height="80" rx="14" fill="#1C1812" stroke="#D4AF37" strokeWidth="1.2" />
        {/* Sol amanhecendo no horizonte */}
        <path d="M22 48 C24 36 32 30 40 30 C48 30 56 36 58 48 Z" fill="#D4AF37" opacity="0.9" />
        <circle cx="40" cy="38" r="8" fill="#F1E5C8" />
        {/* Raios solares */}
        <line
          x1="40"
          y1="20"
          x2="40"
          y2="25"
          stroke="#F1E5C8"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="26"
          y1="26"
          x2="30"
          y2="30"
          stroke="#D4AF37"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="54"
          y1="26"
          x2="50"
          y2="30"
          stroke="#D4AF37"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Scrunchie dourado em miniatura na base */}
        <circle
          cx="40"
          cy="58"
          r="10"
          stroke="#D4AF37"
          strokeWidth="3.5"
          strokeDasharray="5 2"
          fill="none"
        />
        <circle cx="40" cy="58" r="6" fill="#14120E" stroke="#F1E5C8" strokeWidth="1" />
        <circle cx="58" cy="22" r="1.5" fill="#FFFFFF" />
        <circle cx="22" cy="56" r="1.5" fill="#F1E5C8" />
      </svg>
    )
  }

  if (type === 'day-protection') {
    // Proteção para o Dia - Escudo térmico solar e presilha do amanhecer
    return (
      <svg viewBox="0 0 80 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="80" height="80" rx="14" fill="#1C1812" stroke="#D4AF37" strokeWidth="1.2" />
        {/* Escudo de proteção solar */}
        <path
          d="M40 18 C52 18 58 24 58 40 C58 52 40 64 40 64 C40 64 22 52 22 40 C22 24 28 18 40 18 Z"
          fill="#251E14"
          stroke="#D4AF37"
          strokeWidth="1.5"
        />
        {/* Sol estilizado no centro do escudo */}
        <circle cx="40" cy="38" r="7" fill="#D4AF37" />
        <circle cx="40" cy="38" r="3.5" fill="#FFFFFF" />
        {/* Raio e brilhos */}
        <line
          x1="40"
          y1="26"
          x2="40"
          y2="29"
          stroke="#F1E5C8"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="40"
          y1="47"
          x2="40"
          y2="50"
          stroke="#F1E5C8"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="28"
          y1="38"
          x2="31"
          y2="38"
          stroke="#F1E5C8"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="49"
          y1="38"
          x2="52"
          y2="38"
          stroke="#F1E5C8"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Sparkles */}
        <circle cx="62" cy="24" r="1.5" fill="#D4AF37" />
        <circle cx="18" cy="54" r="1.5" fill="#F1E5C8" />
      </svg>
    )
  }

  if (type === 'night-hydration') {
    // Hidratação da Noite - Lua, estrelas e lenço de cetim dourado
    return (
      <svg viewBox="0 0 80 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="80" height="80" rx="14" fill="#181822" stroke="#D4AF37" strokeWidth="1.2" />
        {/* Lua crescente de fundo */}
        <path
          d="M32 20 C24 23 20 32 22 41 C24 50 32 56 41 55 C33 55 28 48 28 40 C28 32 32 24 32 20 Z"
          fill="#D4AF37"
          opacity="0.9"
        />
        {/* Gotas de sérum noturno */}
        <circle cx="48" cy="24" r="3.5" fill="#F1E5C8" />
        <circle cx="58" cy="34" r="2.5" fill="#D4AF37" />
        {/* Lenço de cetim dobrado na base */}
        <path
          d="M25 54 C30 46 50 46 55 54 C58 59 48 64 40 64 C32 64 22 59 25 54 Z"
          fill="#2A2416"
          stroke="#D4AF37"
          strokeWidth="1.5"
        />
        <circle cx="40" cy="58" r="2" fill="#F1E5C8" />
        {/* Sparkles noturnos */}
        <circle cx="54" cy="18" r="1.5" fill="#FFFFFF" />
        <circle cx="22" cy="30" r="1" fill="#F1E5C8" />
      </svg>
    )
  }

  if (type === 'relaxing-massage') {
    // Massagem Relaxante - Mãos energéticas, pontos de toque e brincos de lua
    return (
      <svg viewBox="0 0 80 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="80" height="80" rx="14" fill="#181822" stroke="#D4AF37" strokeWidth="1.2" />
        {/* Ondulações de relaxamento e serenidade */}
        <circle
          cx="40"
          cy="40"
          r="22"
          stroke="#D4AF37"
          strokeWidth="1"
          strokeDasharray="3 3"
          opacity="0.6"
        />
        <circle cx="40" cy="40" r="14" fill="#221E2A" stroke="#F1E5C8" strokeWidth="1.2" />
        {/* Pontas dos dedos em massagem circular */}
        <circle cx="34" cy="34" r="3" fill="#D4AF37" />
        <circle cx="46" cy="34" r="3" fill="#D4AF37" />
        <circle cx="40" cy="46" r="3" fill="#F1E5C8" />
        {/* Meia lua e estrela de bem-estar */}
        <path
          d="M24 22 C20 23 18 27 19 30 C20 33 24 35 27 34 C23 34 21 31 21 28 C21 25 24 22 24 22 Z"
          fill="#D4AF37"
        />
        <circle cx="58" cy="24" r="1.5" fill="#FFFFFF" />
        <circle cx="56" cy="56" r="2" fill="#D4AF37" />
      </svg>
    )
  }

  if (type === 'braid') {
    // Trança elegante entrelaçada
    return (
      <svg viewBox="0 0 80 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="80" height="80" rx="14" fill="#202020" stroke="#D4AF37" strokeWidth="1.2" />
        {/* Mecha de topo */}
        <path
          d="M40 14 C32 18 30 26 40 32 C50 38 48 46 40 52 C32 58 32 64 40 68"
          stroke="#D4AF37"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M40 14 C48 18 50 26 40 32 C30 38 32 46 40 52 C48 58 48 64 40 68"
          stroke="#F1E5C8"
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* Elástico final */}
        <rect x="37" y="66" width="6" height="3" rx="1.5" fill="#D4AF37" />
        {/* Sparkles */}
        <circle cx="56" cy="24" r="1.5" fill="#D4AF37" />
        <circle cx="24" cy="48" r="1.5" fill="#F1E5C8" />
      </svg>
    )
  }

  if (type === 'bun') {
    // Coque elegante no alto com detalhe de pino de pérola e acabamento dourado
    return (
      <svg viewBox="0 0 80 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="80" height="80" rx="14" fill="#202020" stroke="#D4AF37" strokeWidth="1.2" />
        <circle cx="40" cy="38" r="18" fill="#282828" stroke="#D4AF37" strokeWidth="1.8" />
        <circle
          cx="40"
          cy="38"
          r="12"
          stroke="#F1E5C8"
          strokeWidth="1.5"
          strokeDasharray="3 3"
          opacity="0.8"
        />
        <path
          d="M26 62 C30 52 38 48 40 48 C42 48 50 52 54 62"
          stroke="#3D3D3D"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        {/* Pino de Pérola no coque miniatura */}
        <line
          x1="34"
          y1="26"
          x2="52"
          y2="44"
          stroke="#D4AF37"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <circle cx="32" cy="24" r="3.5" fill="#FFFFFF" stroke="#D4AF37" strokeWidth="1" />
        <circle cx="58" cy="24" r="1.5" fill="#D4AF37" />
        <circle cx="22" cy="48" r="1.5" fill="#F1E5C8" />
      </svg>
    )
  }

  // Ondas naturais com destaque dourado e tiara miniatura
  return (
    <svg viewBox="0 0 80 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="80" height="80" rx="14" fill="#202020" stroke="#D4AF37" strokeWidth="1.2" />
      {/* Tiara miniatura no topo */}
      <path
        d="M26 22 C34 16 46 16 54 22"
        stroke="#D4AF37"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="40" cy="18" r="2" fill="#FFFFFF" stroke="#D4AF37" strokeWidth="0.8" />
      {/* Ondas fluindo */}
      <path
        d="M26 28 Q36 38 26 48 Q18 58 28 68"
        stroke="#D4AF37"
        strokeWidth="3.8"
        strokeLinecap="round"
      />
      <path
        d="M40 25 Q52 36 40 47 Q28 58 40 69"
        stroke="#F1E5C8"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M54 28 Q64 38 54 48 Q46 58 54 68"
        stroke="#D4AF37"
        strokeWidth="3.8"
        strokeLinecap="round"
      />
      <circle cx="58" cy="38" r="1.5" fill="#FFFFFF" />
      <circle cx="22" cy="52" r="1.5" fill="#F1E5C8" />
    </svg>
  )
}
