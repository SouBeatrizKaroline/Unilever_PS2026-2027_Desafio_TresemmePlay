import React from 'react'

export type AccessoryIconType =
  | 'hairpin'
  | 'pearl-pin'
  | 'scrunchie'
  | 'tiara'
  | 'comb'
  | 'scarf'
  | 'moon-earrings'
  | 'sun-clip'
  | 'spa-band'
  | 'star-clip'
  | 'gold-bow'
  | 'crystal-crown'
  | 'golden-ribbon'
  | 'harmony-glow'
  | 'ritual-star'
  | 'shell-necklace'
  | 'tiara-anniversary-90'
  | 'crown-anniversary-365'
  | 'constellation-brooch'
  | 'letter-brooch'

export interface AccessorySvgProps {
  type?: AccessoryIconType
  goldIconType?: AccessoryIconType
  iconType?: AccessoryIconType
  isUnlocked?: boolean
  className?: string
}

export const AccessorySvg: React.FC<AccessorySvgProps> = ({
  type,
  goldIconType,
  iconType,
  isUnlocked = false,
  className = 'w-20 h-20',
}) => {
  const effectiveType = iconType || goldIconType || type || 'comb'
  const gold = isUnlocked ? '#D4AF37' : '#666666'
  const softGold = isUnlocked ? '#F1E5C8' : '#888888'
  const darkAccent = isUnlocked ? '#8C6F1E' : '#444444'
  const gemColor = isUnlocked ? '#FFFFFF' : '#777777'

  switch (effectiveType) {
    case 'spa-band':
      // Faixa Spa Dourada (Faixa aveludada com logo/fivela dourada e relevo)
      return (
        <svg
          viewBox="0 0 80 80"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Arco da faixa aveludada */}
          <path
            d="M18 48 C18 24 30 16 40 16 C50 16 62 24 62 48"
            stroke={gold}
            strokeWidth="7"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M18 48 C18 24 30 16 40 16 C50 16 62 24 62 48"
            stroke="#1E1A14"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Textura acolchoada e acabamento acetinado */}
          <path
            d="M24 36 Q32 20 40 20 Q48 20 56 36"
            stroke={softGold}
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="4 2"
          />
          {/* Broche/Nó central dourado de luxo */}
          <rect
            x="34"
            y="12"
            width="12"
            height="9"
            rx="3"
            fill={gold}
            stroke="#161410"
            strokeWidth="1"
          />
          <circle cx="40" cy="16.5" r="2.2" fill={gemColor} />
          {/* Sparkles */}
          {isUnlocked && <circle cx="28" cy="14" r="1.5" fill="#FFFFFF" />}
          {isUnlocked && <circle cx="58" cy="18" r="2" fill="#D4AF37" />}
          {isUnlocked && <circle cx="40" cy="8" r="1.5" fill="#F1E5C8" />}
        </svg>
      )
    case 'pearl-pin':
      // Pino de Pérola (Pino dourado com pérola lustrosa e aro dourado)
      return (
        <svg
          viewBox="0 0 80 80"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Haste longa do pino em ângulo */}
          <path d="M28 32 L60 68" stroke={gold} strokeWidth="3.5" strokeLinecap="round" />
          <path d="M31 35 L63 71" stroke={darkAccent} strokeWidth="1.5" strokeLinecap="round" />
          {/* Aro / Base dourada da pérola */}
          <circle cx="26" cy="28" r="14" fill="#1F1F1F" stroke={gold} strokeWidth="2" />
          <path
            d="M17 28 C17 22 21 17 26 17"
            stroke={softGold}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Pérola central luminosa */}
          <circle cx="26" cy="28" r="9" fill={gemColor} stroke={gold} strokeWidth="1" />
          <circle cx="23.5" cy="25" r="3" fill="#FFFFFF" />
          <circle cx="28.5" cy="30.5" r="1.5" fill={softGold} opacity="0.8" />
          {/* Detalhes dourados de suporte */}
          <path d="M22 37 Q26 40 30 37" stroke={gold} strokeWidth="2" strokeLinecap="round" />
          {isUnlocked && <circle cx="58" cy="18" r="2.5" fill="#D4AF37" />}
          {isUnlocked && <circle cx="64" cy="24" r="1.5" fill="#F1E5C8" />}
        </svg>
      )

    case 'hairpin':
      // Prenda de Cabelo Dourada (Grampo ornamental floral)
      return (
        <svg
          viewBox="0 0 80 80"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Círculo do topo decorativo */}
          <circle cx="28" cy="26" r="14" fill="#242424" stroke={gold} strokeWidth="1.5" />
          {/* Flor / Roseta de ouro */}
          <circle cx="28" cy="20" r="4" fill={softGold} />
          <circle cx="34" cy="26" r="4" fill={softGold} />
          <circle cx="28" cy="32" r="4" fill={softGold} />
          <circle cx="22" cy="26" r="4" fill={softGold} />
          <circle cx="28" cy="26" r="3" fill={gemColor} />
          {/* Hastes do grampo */}
          <path d="M30 38 L58 66" stroke={gold} strokeWidth="3" strokeLinecap="round" />
          <path d="M26 40 L54 68" stroke={darkAccent} strokeWidth="3" strokeLinecap="round" />
          {isUnlocked && <circle cx="58" cy="20" r="2" fill="#D4AF37" />}
        </svg>
      )

    case 'scrunchie':
      // Scrunchie de cetim
      return (
        <svg
          viewBox="0 0 80 80"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="40"
            cy="40"
            r="24"
            stroke={gold}
            strokeWidth="8"
            strokeDasharray="12 4"
            fill="none"
          />
          <circle cx="40" cy="40" r="15" fill="#1C1C1C" stroke={softGold} strokeWidth="2" />
          {/* Dobras de cetim */}
          <path
            d="M30 22 C34 26 46 26 50 22"
            stroke={softGold}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M30 58 C34 54 46 54 50 58"
            stroke={softGold}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      )

    case 'tiara':
      // Tiara de Ondas Dourada (Arco gracioso ondulado com pedrarias e relevo dourado)
      return (
        <svg
          viewBox="0 0 80 80"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Arco base da tiara */}
          <path
            d="M16 52 C18 30 32 19 40 19 C48 19 62 30 64 52"
            stroke={gold}
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          {/* Arco superior ondulado */}
          <path
            d="M20 46 Q28 26 40 23 Q52 26 60 46"
            stroke={softGold}
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
          />
          {/* Ondulações decorativas no topo */}
          <path
            d="M26 34 Q32 25 36 28 Q40 18 44 28 Q48 25 54 34"
            stroke={gold}
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          {/* Detalhe central e pérolas de acabamento */}
          <circle cx="40" cy="17" r="3" fill={gemColor} stroke={gold} strokeWidth="1.2" />
          <circle cx="32" cy="23" r="2.2" fill={gemColor} />
          <circle cx="48" cy="23" r="2.2" fill={gemColor} />
          <circle cx="24" cy="35" r="2" fill={softGold} />
          <circle cx="56" cy="35" r="2" fill={softGold} />
          {isUnlocked && <circle cx="40" cy="9" r="1.5" fill="#D4AF37" />}
          {isUnlocked && <circle cx="58" cy="18" r="1.5" fill="#F1E5C8" />}
        </svg>
      )

    case 'scarf':
      // Lenço de Cetim Dourado (noturno)
      return (
        <svg
          viewBox="0 0 80 80"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Faixa curva do lenço com dobras luxuosas de cetim */}
          <path
            d="M18 36 C22 22 58 22 62 36 C64 48 56 60 48 64 C42 66 38 66 32 64 C24 60 16 48 18 36 Z"
            fill="#1E1A12"
            stroke={gold}
            strokeWidth="2"
          />
          <path
            d="M22 34 C26 25 54 25 58 34"
            stroke={softGold}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path d="M26 42 Q40 50 54 42" stroke={gold} strokeWidth="1.8" strokeLinecap="round" />
          {/* Nó / Laço frontal sofisticado */}
          <circle cx="40" cy="56" r="5" fill="#242018" stroke={gold} strokeWidth="1.5" />
          <circle cx="40" cy="56" r="2.5" fill={softGold} />
          {/* Pontas caídas do laço */}
          <path d="M37 60 L32 72 L36 71 L39 61 Z" fill={gold} />
          <path d="M43 60 L48 72 L44 71 L41 61 Z" fill={softGold} />
          {isUnlocked && <circle cx="56" cy="22" r="1.5" fill="#FFFFFF" />}
          {isUnlocked && <circle cx="24" cy="22" r="1.5" fill="#D4AF37" />}
        </svg>
      )

    case 'moon-earrings':
      // Brincos de Meia-Lua Dourados
      return (
        <svg
          viewBox="0 0 80 80"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Gancho do brinco */}
          <path
            d="M40 16 C40 10 35 10 35 15 L35 24"
            stroke={gold}
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="35" cy="24" r="2.5" fill={gemColor} stroke={gold} strokeWidth="1" />
          {/* Pingente Meia-Lua Dourada */}
          <path
            d="M44 30 C34 33 30 43 33 53 C36 63 46 67 56 63 C46 66 38 60 37 50 C36 41 42 33 44 30 Z"
            fill={gold}
            stroke={softGold}
            strokeWidth="1.2"
          />
          {/* Estrelinha suspensa no centro da lua */}
          <g transform="translate(48, 44)">
            <path
              d="M0 -5 L1.2 -1.2 L5 0 L1.2 1.2 L0 5 L-1.2 1.2 L-5 0 L-1.2 -1.2 Z"
              fill={softGold}
            />
            <circle cx="0" cy="0" r="1" fill="#FFFFFF" />
          </g>
          {/* Linha que segura a estrela */}
          <line
            x1="48"
            y1="34"
            x2="48"
            y2="40"
            stroke={gold}
            strokeWidth="1"
            strokeDasharray="1 1"
          />
          {isUnlocked && <circle cx="28" cy="48" r="1.5" fill="#FFFFFF" />}
          {isUnlocked && <circle cx="55" cy="28" r="2" fill="#D4AF37" />}
        </svg>
      )

    case 'sun-clip':
      // Presilha Dourada do Amanhecer
      return (
        <svg
          viewBox="0 0 80 80"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Haste inferior da presilha */}
          <path d="M18 52 L62 52" stroke={darkAccent} strokeWidth="3" strokeLinecap="round" />
          <path d="M18 50 L62 50" stroke={gold} strokeWidth="2.2" strokeLinecap="round" />
          {/* Sol do Amanhecer esculpido na presilha */}
          <circle cx="40" cy="38" r="14" fill="#201C16" stroke={gold} strokeWidth="2" />
          <circle cx="40" cy="38" r="8" fill={gold} />
          <circle cx="40" cy="38" r="3.5" fill={gemColor} />
          {/* Raios solares radiantes */}
          <path
            d="M40 18 L40 23 M40 53 L40 58 M20 38 L25 38 M55 38 L60 38"
            stroke={softGold}
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M26 24 L30 28 M50 48 L54 52 M26 52 L30 48 M50 28 L54 24"
            stroke={gold}
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          {isUnlocked && <circle cx="24" cy="18" r="1.5" fill="#FFFFFF" />}
          {isUnlocked && <circle cx="58" cy="22" r="2" fill="#D4AF37" />}
        </svg>
      )

    case 'star-clip':
      // Prendedor de Estrela Dourada
      return (
        <svg
          viewBox="0 0 80 80"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Haste do clip */}
          <path d="M20 54 L60 54" stroke={darkAccent} strokeWidth="3" strokeLinecap="round" />
          <path d="M22 52 L58 52" stroke={gold} strokeWidth="2" strokeLinecap="round" />
          {/* Estrela de 5 pontas central */}
          <g transform="translate(40, 36)">
            <path
              d="M0 -18 L5.5 -5 L19 -4 L8.5 5.5 L12 18 L0 10.5 L-12 18 L-8.5 5.5 L-19 -4 L-5.5 -5 Z"
              fill={gold}
              stroke={softGold}
              strokeWidth="1.5"
            />
            <circle cx="0" cy="0" r="4.5" fill={gemColor} stroke={gold} strokeWidth="1" />
            <circle cx="-1" cy="-1" r="1.5" fill="#FFFFFF" />
          </g>
          {isUnlocked && <circle cx="20" cy="22" r="1.5" fill="#FFFFFF" />}
          {isUnlocked && <circle cx="60" cy="24" r="2" fill="#D4AF37" />}
        </svg>
      )

    case 'gold-bow':
      // Laço Dourado de Cetim
      return (
        <svg
          viewBox="0 0 80 80"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Asas do laço */}
          <path
            d="M40 38 C32 24 16 26 16 38 C16 48 30 46 40 40 Z"
            fill={gold}
            stroke={softGold}
            strokeWidth="1.5"
          />
          <path
            d="M40 38 C48 24 64 26 64 38 C64 48 50 46 40 40 Z"
            fill={gold}
            stroke={softGold}
            strokeWidth="1.5"
          />
          {/* Dobras internas */}
          <path
            d="M22 36 Q32 34 38 38"
            stroke={darkAccent}
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <path
            d="M58 36 Q48 34 42 38"
            stroke={darkAccent}
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          {/* Fitas caídas */}
          <path d="M37 42 L26 62 L33 60 L39 44 Z" fill={gold} stroke={softGold} strokeWidth="0.8" />
          <path d="M43 42 L54 62 L47 60 L41 44 Z" fill={gold} stroke={softGold} strokeWidth="0.8" />
          {/* Nó central */}
          <ellipse cx="40" cy="39" rx="5" ry="4.5" fill="#201C14" stroke={gold} strokeWidth="2" />
          <circle cx="40" cy="39" r="2" fill={gemColor} />
          {isUnlocked && <circle cx="40" cy="20" r="1.5" fill="#FFFFFF" />}
        </svg>
      )

    case 'crystal-crown':
      // Coroa de Cristais Dourados
      return (
        <svg
          viewBox="0 0 80 80"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Base curva da coroa */}
          <path
            d="M20 50 C26 44 54 44 60 50"
            stroke={gold}
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M22 48 C28 42 52 42 58 48"
            stroke={softGold}
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Pontas da coroa com cristais */}
          <path
            d="M22 48 L26 30 L34 44 L40 22 L46 44 L54 30 L58 48"
            stroke={gold}
            strokeWidth="2.2"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Cristais nas pontas */}
          <circle cx="40" cy="22" r="3.5" fill={gemColor} stroke={gold} strokeWidth="1.2" />
          <circle cx="26" cy="30" r="2.5" fill={gemColor} stroke={gold} strokeWidth="1" />
          <circle cx="54" cy="30" r="2.5" fill={gemColor} stroke={gold} strokeWidth="1" />
          <circle cx="40" cy="45" r="2" fill={softGold} />
          <circle cx="31" cy="46" r="1.5" fill={softGold} />
          <circle cx="49" cy="46" r="1.5" fill={softGold} />
          {isUnlocked && <circle cx="40" cy="12" r="1.5" fill="#FFFFFF" />}
        </svg>
      )

    case 'golden-ribbon':
      // Fita Dourada Entrelaçada
      return (
        <svg
          viewBox="0 0 80 80"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Curvas da fita fluida */}
          <path
            d="M18 40 C28 20 52 20 62 40 C52 60 28 60 18 40 Z"
            stroke={gold}
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M24 38 C32 26 48 26 56 38 C48 50 32 50 24 38 Z"
            stroke={softGold}
            strokeWidth="1.5"
            strokeDasharray="4 2"
            fill="none"
          />
          <circle cx="40" cy="38" r="4" fill={gold} stroke={gemColor} strokeWidth="1" />
          {/* Brilhos */}
          {isUnlocked && <circle cx="28" cy="26" r="1.5" fill="#FFFFFF" />}
          {isUnlocked && <circle cx="52" cy="50" r="1.5" fill="#F1E5C8" />}
        </svg>
      )

    case 'harmony-glow':
      // Brilho de Harmonia (Acessório Especial Ritual Perfeito: broche circular de luz dourada com anéis concêntricos e cristais)
      return (
        <svg
          viewBox="0 0 80 80"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Halo exterior de harmonia */}
          <circle
            cx="40"
            cy="40"
            r="26"
            stroke={gold}
            strokeWidth="1.8"
            strokeDasharray="3 3"
            fill="#181510"
          />
          {/* Raios em cruz suave */}
          <path
            d="M40 18 L40 62 M18 40 L62 40"
            stroke={softGold}
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.85"
          />
          {/* Raios diagonais */}
          <path
            d="M24 24 L56 56 M24 56 L56 24"
            stroke={gold}
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.6"
          />
          {/* Aro central dourado com chanfro */}
          <circle cx="40" cy="40" r="16" fill="#241E12" stroke={gold} strokeWidth="2.4" />
          <circle
            cx="40"
            cy="40"
            r="12"
            stroke={softGold}
            strokeWidth="1.2"
            strokeDasharray="2 2"
          />
          {/* Pérola/Cristal central de equilíbrio */}
          <circle cx="40" cy="40" r="6" fill={gemColor} stroke={gold} strokeWidth="1.2" />
          <circle cx="38" cy="38" r="2" fill="#FFFFFF" />
          {/* 4 Pontos de luz nos 4 quadrantes cardeais */}
          <circle cx="40" cy="22" r="2.2" fill={gold} stroke={gemColor} strokeWidth="0.8" />
          <circle cx="40" cy="58" r="2.2" fill={gold} stroke={gemColor} strokeWidth="0.8" />
          <circle cx="22" cy="40" r="2.2" fill={gold} stroke={gemColor} strokeWidth="0.8" />
          <circle cx="58" cy="40" r="2.2" fill={gold} stroke={gemColor} strokeWidth="0.8" />
          {isUnlocked && <circle cx="28" cy="18" r="1.5" fill="#FFFFFF" />}
          {isUnlocked && <circle cx="54" cy="20" r="1.8" fill="#F1E5C8" />}
          {isUnlocked && <circle cx="52" cy="60" r="1.5" fill="#D4AF37" />}
        </svg>
      )

    case 'ritual-star':
      // Estrela do Ritual (Acessório Especial Ritual Perfeito: estrela octogonal/oito pontas reluzente lapidada em ouro)
      return (
        <svg
          viewBox="0 0 80 80"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Halo sutil de fundo */}
          <circle
            cx="40"
            cy="40"
            r="28"
            fill="#1A1610"
            stroke={gold}
            strokeWidth="1"
            opacity="0.6"
          />
          <circle
            cx="40"
            cy="40"
            r="24"
            stroke={softGold}
            strokeWidth="1"
            strokeDasharray="2 3"
            opacity="0.8"
          />
          {/* Estrela de 8 pontas composta: primeira estrela de 4 pontas vertical/horizontal */}
          <polygon
            points="40,12 45,35 68,40 45,45 40,68 35,45 12,40 35,35"
            fill={gold}
            stroke={softGold}
            strokeWidth="1.4"
          />
          {/* Segunda estrela de 4 pontas em 45 graus */}
          <polygon
            points="40,19 44,36 57,23 44,44 40,61 36,44 23,23 36,36"
            fill={darkAccent}
            stroke={gold}
            strokeWidth="1.2"
            transform="rotate(45 40 40)"
          />
          {/* Círculo central da joia */}
          <circle cx="40" cy="40" r="8" fill="#201C12" stroke={gold} strokeWidth="1.8" />
          <circle cx="40" cy="40" r="5" fill={gemColor} stroke={softGold} strokeWidth="1" />
          <circle cx="38" cy="38" r="1.8" fill="#FFFFFF" />
          {/* Pontas dos raios cardeais com pérolas */}
          <circle cx="40" cy="14" r="1.8" fill={softGold} />
          <circle cx="66" cy="40" r="1.8" fill={softGold} />
          <circle cx="40" cy="66" r="1.8" fill={softGold} />
          <circle cx="14" cy="40" r="1.8" fill={softGold} />
          {isUnlocked && <circle cx="20" cy="18" r="1.8" fill="#FFFFFF" />}
          {isUnlocked && <circle cx="62" cy="18" r="1.5" fill="#F1E5C8" />}
          {isUnlocked && <circle cx="64" cy="60" r="1.8" fill="#D4AF37" />}
        </svg>
      )

    case 'shell-necklace':
      // Colar de Conchas Dourado (exclusivo do Streak de 4 semanas de Spa)
      return (
        <svg
          viewBox="0 0 80 80"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Fio do colar / corrente curva de ouro */}
          <path
            d="M16 28 C22 52 58 52 64 28"
            stroke={gold}
            strokeWidth="2.2"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M20 30 C26 50 54 50 60 30"
            stroke={softGold}
            strokeWidth="1.2"
            strokeDasharray="2 3"
            fill="none"
          />
          {/* Esferas de ouro / pérolas entre as conchas */}
          <circle cx="28" cy="38" r="2.2" fill={gemColor} stroke={gold} strokeWidth="1" />
          <circle cx="34" cy="43" r="2.2" fill={gold} />
          <circle cx="46" cy="43" r="2.2" fill={gold} />
          <circle cx="52" cy="38" r="2.2" fill={gemColor} stroke={gold} strokeWidth="1" />

          {/* Concha lateral esquerda */}
          <g transform="translate(30, 42) rotate(15)">
            <path
              d="M0 0 C-4 4 -3 9 0 11 C3 9 4 4 0 0 Z"
              fill={gold}
              stroke={softGold}
              strokeWidth="0.8"
            />
            <line x1="0" y1="2" x2="0" y2="10" stroke={darkAccent} strokeWidth="0.6" />
            <circle cx="0" cy="11" r="1" fill={gemColor} />
          </g>

          {/* Concha lateral direita */}
          <g transform="translate(50, 42) rotate(-15)">
            <path
              d="M0 0 C-4 4 -3 9 0 11 C3 9 4 4 0 0 Z"
              fill={gold}
              stroke={softGold}
              strokeWidth="0.8"
            />
            <line x1="0" y1="2" x2="0" y2="10" stroke={darkAccent} strokeWidth="0.6" />
            <circle cx="0" cy="11" r="1" fill={gemColor} />
          </g>

          {/* Concha Central Majestic (Pingente Principal) */}
          <g transform="translate(40, 47)">
            {/* Base da concha */}
            <path
              d="M0 -3 C-7 3 -7 12 0 16 C7 12 7 3 0 -3 Z"
              fill={gold}
              stroke={softGold}
              strokeWidth="1.2"
            />
            {/* Ranhuras radiantes da concha */}
            <path
              d="M0 0 L-4 13 M0 0 L0 14 M0 0 L4 13"
              stroke={darkAccent}
              strokeWidth="1"
              strokeLinecap="round"
            />
            {/* Pérola central luminosa */}
            <circle cx="0" cy="2" r="3" fill={gemColor} stroke={gold} strokeWidth="1" />
            <circle cx="-0.8" cy="1.2" r="1" fill="#FFFFFF" />
            <circle cx="0" cy="15" r="1.5" fill={gemColor} />
          </g>

          {/* Brilhos estelares */}
          {isUnlocked && <circle cx="40" cy="34" r="1.5" fill="#FFFFFF" />}
          {isUnlocked && <circle cx="24" cy="28" r="1.5" fill="#F1E5C8" />}
          {isUnlocked && <circle cx="56" cy="28" r="1.5" fill="#D4AF37" />}
        </svg>
      )

    case 'tiara-anniversary-90': {
      // Tiara Comemorativa de Prata e Ouro (Marco de 90 dias de autocuidado)
      const silverColor = isUnlocked ? '#E5E7EB' : '#777777'
      const silverShine = isUnlocked ? '#FFFFFF' : '#999999'
      return (
        <svg
          viewBox="0 0 80 80"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Arco base dourado e prateado duplo */}
          <path
            d="M16 52 C18 28 32 17 40 17 C48 17 62 28 64 52"
            stroke={gold}
            strokeWidth="3.2"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M19 49 C21 27 33 20 40 20 C47 20 59 27 61 49"
            stroke={silverColor}
            strokeWidth="1.6"
            fill="none"
            strokeLinecap="round"
          />
          {/* Estrutura geométrica de flor de lis / louros em prata e ouro */}
          <path
            d="M26 34 Q32 23 36 27 Q40 14 44 27 Q48 23 54 34"
            stroke={gold}
            strokeWidth="2.2"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M29 36 Q34 26 38 29 Q40 18 42 29 Q46 26 51 36"
            stroke={silverColor}
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
          />
          {/* Pontos de luz / Cristais lapidados com numeração comemorativa sutil */}
          <circle cx="40" cy="14" r="3.2" fill={gemColor} stroke={gold} strokeWidth="1.4" />
          <circle cx="40" cy="14" r="1.4" fill={silverShine} />
          <circle cx="36" cy="24" r="2.2" fill={silverColor} stroke={gold} strokeWidth="0.8" />
          <circle cx="44" cy="24" r="2.2" fill={silverColor} stroke={gold} strokeWidth="0.8" />
          <circle cx="28" cy="30" r="1.8" fill={gold} />
          <circle cx="52" cy="30" r="1.8" fill={gold} />
          <circle cx="20" cy="42" r="1.5" fill={gemColor} />
          <circle cx="60" cy="42" r="1.5" fill={gemColor} />

          {/* Brilhos estelares */}
          {isUnlocked && <circle cx="40" cy="7" r="1.6" fill="#FFFFFF" />}
          {isUnlocked && <circle cx="22" cy="18" r="1.5" fill="#D4AF37" />}
          {isUnlocked && <circle cx="58" cy="18" r="1.5" fill="#E5E7EB" />}
        </svg>
      )
    }

    case 'crown-anniversary-365':
      // Coroa de Aniversário de Jornada (Marco de 365 dias de autocuidado)
      return (
        <svg
          viewBox="0 0 80 80"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Base curva rica com relevo e aro duplo */}
          <path
            d="M16 54 C24 46 56 46 64 54"
            stroke={gold}
            strokeWidth="3.6"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M18 51 C25 44 55 44 62 51"
            stroke={softGold}
            strokeWidth="1.8"
            strokeDasharray="3 2"
            strokeLinecap="round"
            fill="none"
          />
          {/* Picos imperiais da coroa com curvas elegantes */}
          <path
            d="M18 51 L20 32 L28 44 L40 16 L52 44 L60 32 L62 51"
            stroke={gold}
            strokeWidth="2.5"
            strokeLinejoin="round"
            fill="#1E1910"
          />
          {/* Linhas decorativas internas de ouro */}
          <path
            d="M23 48 L28 36 L34 46 L40 22 L46 46 L52 36 L57 48"
            stroke={softGold}
            strokeWidth="1.2"
            fill="none"
          />
          {/* Joias do ápice: Diamante central do 365 */}
          <circle cx="40" cy="16" r="4.2" fill={gemColor} stroke={gold} strokeWidth="1.6" />
          <circle cx="39" cy="14.5" r="1.8" fill="#FFFFFF" />
          {/* Joias secundárias nas pontas */}
          <circle cx="20" cy="32" r="2.8" fill={gemColor} stroke={gold} strokeWidth="1.2" />
          <circle cx="60" cy="32" r="2.8" fill={gemColor} stroke={gold} strokeWidth="1.2" />
          <circle cx="28" cy="42" r="2" fill={softGold} stroke={darkAccent} strokeWidth="0.8" />
          <circle cx="52" cy="42" r="2" fill={softGold} stroke={darkAccent} strokeWidth="0.8" />
          {/* Tríade de rubis/pérolas douradas na base */}
          <circle cx="40" cy="48" r="2.5" fill={gemColor} stroke={gold} strokeWidth="1" />
          <circle cx="30" cy="49" r="1.8" fill={softGold} />
          <circle cx="50" cy="49" r="1.8" fill={softGold} />

          {/* Brilhos reluzentes de 1 ano de conquista */}
          {isUnlocked && (
            <>
              <path
                d="M40 5 L41.5 8.5 L45 10 L41.5 11.5 L40 15 L38.5 11.5 L35 10 L38.5 8.5 Z"
                fill="#FFFFFF"
              />
              <circle cx="15" cy="22" r="1.8" fill="#D4AF37" />
              <circle cx="65" cy="22" r="1.8" fill="#FFF1CC" />
            </>
          )}
        </svg>
      )

    case 'letter-brooch':
      // Broche de Cartas Dourado (Exclusivo a cada 4 cartas lidas da Estante)
      return (
        <svg
          viewBox="0 0 80 80"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Fundo do broche circular lapidado em ouro nobre */}
          <circle cx="40" cy="40" r="28" fill="#181510" stroke={gold} strokeWidth="2.2" />
          <circle
            cx="40"
            cy="40"
            r="24"
            stroke={softGold}
            strokeWidth="0.9"
            strokeDasharray="3 2"
          />
          {/* Envelope dourado de luxo */}
          <rect
            x="23"
            y="27"
            width="34"
            height="23"
            rx="3.5"
            fill={gold}
            stroke="#FFF1CC"
            strokeWidth="1"
          />
          <path
            d="M23 27 L40 41 L57 27"
            stroke="#1F170E"
            strokeWidth="2"
            strokeLinejoin="round"
            fill="none"
          />
          <path d="M23 50 L34 38 M57 50 L46 38" stroke="#1F170E" strokeWidth="1.2" fill="none" />
          {/* Selo / Medalhão central de coração com cristal */}
          <circle cx="40" cy="41" r="5" fill="#FFFFFF" stroke={gold} strokeWidth="1.2" />
          <circle cx="40" cy="41" r="2.5" fill={gold} />
          {/* Laço superior em fio de ouro */}
          <path
            d="M33 23 Q37 19 40 23 Q43 19 47 23"
            stroke={gold}
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
          />
          {/* Sparkles de brilho reluzente */}
          {isUnlocked && <circle cx="18" cy="22" r="1.8" fill="#FFFFFF" />}
          {isUnlocked && <circle cx="62" cy="20" r="1.8" fill="#FFF1CC" />}
          {isUnlocked && <circle cx="18" cy="54" r="1.5" fill="#D4AF37" />}
          {isUnlocked && <circle cx="62" cy="56" r="1.8" fill="#FFFFFF" />}
        </svg>
      )

    case 'constellation-brooch':
      // Broche Constelação de Fim de Ano (Acessório Temático Exclusivo de Fim de Ano)
      return (
        <svg
          viewBox="0 0 80 80"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Base em halo dourado estelar */}
          <circle
            cx="40"
            cy="40"
            r="28"
            fill="#1E1911"
            stroke={gold}
            strokeWidth="1.6"
            strokeDasharray="4 2"
          />
          <circle
            cx="40"
            cy="40"
            r="24"
            stroke={softGold}
            strokeWidth="0.8"
            strokeDasharray="2 3"
            opacity="0.7"
          />
          {/* Linhas da constelação conectando as estrelas principais */}
          <path
            d="M24 46 L34 32 L40 20 L52 30 L58 48 L46 56 L30 54 Z"
            stroke={gold}
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.85"
          />
          <path
            d="M34 32 L46 56 M40 20 L40 40 L58 48"
            stroke={softGold}
            strokeWidth="0.8"
            strokeDasharray="2 2"
            opacity="0.6"
          />
          {/* Estrela Estelar Central da Virada (8 pontas) */}
          <g transform="translate(40, 40)">
            <polygon
              points="0,-10 2.5,-3 10,0 2.5,3 0,10 -2.5,3 -10,0 -2.5,-3"
              fill={gold}
              stroke={softGold}
              strokeWidth="0.8"
            />
            <circle cx="0" cy="0" r="3.2" fill={gemColor} stroke={gold} strokeWidth="1" />
            <circle cx="-0.8" cy="-0.8" r="1" fill="#FFFFFF" />
          </g>
          {/* Estrelas pontuais da constelação com cristais */}
          <circle cx="40" cy="20" r="2.8" fill={gemColor} stroke={gold} strokeWidth="1" />
          <circle cx="52" cy="30" r="2.2" fill={gold} />
          <circle cx="58" cy="48" r="2.5" fill={gemColor} stroke={gold} strokeWidth="0.8" />
          <circle cx="46" cy="56" r="2.2" fill={gold} />
          <circle cx="30" cy="54" r="2.4" fill={gemColor} stroke={gold} strokeWidth="0.8" />
          <circle cx="24" cy="46" r="2" fill={gold} />
          <circle cx="34" cy="32" r="2.4" fill={gemColor} stroke={gold} strokeWidth="0.8" />
          {/* Sparkles ao redor */}
          {isUnlocked && <circle cx="40" cy="8" r="1.5" fill="#FFFFFF" />}
          {isUnlocked && <circle cx="64" cy="20" r="1.8" fill="#FFF1CC" />}
          {isUnlocked && <circle cx="18" cy="26" r="1.5" fill="#D4AF37" />}
          {isUnlocked && <circle cx="62" cy="60" r="1.5" fill="#FFFFFF" />}
        </svg>
      )

    case 'comb':
    default:
      // Pente dourado de dentes largos
      return (
        <svg
          viewBox="0 0 80 80"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Dorso do pente */}
          <rect x="18" y="24" width="44" height="8" rx="4" fill={gold} />
          <line x1="22" y1="28" x2="58" y2="28" stroke={gemColor} strokeWidth="1" />
          {/* Dentes */}
          <line
            x1="24"
            y1="32"
            x2="24"
            y2="56"
            stroke={gold}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <line
            x1="30"
            y1="32"
            x2="30"
            y2="56"
            stroke={gold}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <line
            x1="36"
            y1="32"
            x2="36"
            y2="56"
            stroke={gold}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <line
            x1="42"
            y1="32"
            x2="42"
            y2="56"
            stroke={gold}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <line
            x1="48"
            y1="32"
            x2="48"
            y2="56"
            stroke={gold}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <line
            x1="54"
            y1="32"
            x2="54"
            y2="56"
            stroke={gold}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      )
  }
}

export const GoldCoinIcon: React.FC<{ className?: string; size?: number }> = ({
  className = 'w-5 h-5',
  size = 20,
}) => {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Pontos TRESemmé"
    >
      <circle cx="12" cy="12" r="10" fill="#202020" stroke="#D4AF37" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="7.5" stroke="#F1E5C8" strokeWidth="0.8" strokeDasharray="2 2" />
      {/* T estilizado em ouro */}
      <path d="M8 8.5 H16 M12 8.5 V16" stroke="#D4AF37" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="12" cy="12" r="0.8" fill="#FFFFFF" />
    </svg>
  )
}
