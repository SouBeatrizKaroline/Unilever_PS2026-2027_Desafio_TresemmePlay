import React from 'react'

interface StepSvgProps {
  step: 1 | 2 | 3 | 4
  missionType?:
    | 'tranca-simples'
    | 'coque-elegante'
    | 'ondas-naturais'
    | 'hidratacao-da-noite'
    | 'massagem-relaxante'
    | 'hidratacao-matinal'
    | 'protecao-dia'
    | 'spa-capilar-domingo'
    | 'ritual-fim-de-ano'
  className?: string
}

export const MissionStepSvg: React.FC<StepSvgProps> = ({
  step,
  missionType = 'tranca-simples',
  className = 'w-full h-56',
}) => {
  if (missionType === 'ritual-fim-de-ano') {
    switch (step) {
      case 1:
        // Etapa 1: Preparação & Alinhamento de Intenções para o Novo Ciclo
        return (
          <svg
            viewBox="0 0 320 220"
            className={className}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Prepare os fios e respire alinhando intenções para o novo ciclo"
          >
            <rect width="320" height="220" rx="16" fill="#14110E" />
            <circle cx="160" cy="110" r="90" fill="#D4AF37" fillOpacity="0.06" />

            {/* Constelação de fundo suave */}
            <path
              d="M50 40 L90 70 L140 50 M230 45 L270 75 L250 120"
              stroke="#D4AF37"
              strokeWidth="0.8"
              strokeDasharray="3 3"
              opacity="0.5"
            />
            <circle cx="50" cy="40" r="2" fill="#FFFFFF" />
            <circle cx="90" cy="70" r="2.5" fill="#D4AF37" />
            <circle cx="140" cy="50" r="2" fill="#F1E5C8" />
            <circle cx="230" cy="45" r="2.5" fill="#FFFFFF" />
            <circle cx="270" cy="75" r="2" fill="#D4AF37" />
            <circle cx="250" cy="120" r="2.5" fill="#F1E5C8" />

            {/* Mechas de cabelo soltas em curva fluida dourada */}
            <path
              d="M130 50 C120 95 125 140 120 185"
              stroke="#261F18"
              strokeWidth="20"
              strokeLinecap="round"
            />
            <path
              d="M130 50 C120 95 125 140 120 185"
              stroke="#D4AF37"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <path
              d="M160 40 C160 90 160 145 160 195"
              stroke="#1C1712"
              strokeWidth="24"
              strokeLinecap="round"
            />
            <path
              d="M160 40 C160 90 160 145 160 195"
              stroke="#F1E5C8"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M190 50 C200 95 195 140 200 185"
              stroke="#261F18"
              strokeWidth="20"
              strokeLinecap="round"
            />
            <path
              d="M190 50 C200 95 195 140 200 185"
              stroke="#D4AF37"
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            {/* Frasco luminoso dourado de elixir de renovação */}
            <g transform="translate(195, 80)">
              <rect
                x="0"
                y="14"
                width="30"
                height="42"
                rx="8"
                fill="#1C1811"
                stroke="#D4AF37"
                strokeWidth="1.8"
              />
              <rect x="7" y="4" width="16" height="10" rx="3" fill="#D4AF37" />
              <circle cx="15" cy="35" r="7" fill="#2A2215" stroke="#F1E5C8" strokeWidth="1" />
              <text x="15" y="38" fill="#D4AF37" fontSize="8" fontWeight="bold" textAnchor="middle">
                ✦
              </text>
            </g>

            {/* Estrela de celebração */}
            <polygon
              points="160,70 163,77 170,80 163,83 160,90 157,83 150,80 157,77"
              fill="#FFFFFF"
            />

            {/* Badge da Etapa */}
            <rect
              x="70"
              y="18"
              width="180"
              height="22"
              rx="11"
              fill="#1A150F"
              stroke="#D4AF37"
              strokeWidth="1"
            />
            <text x="160" y="33" fill="#F1E5C8" fontSize="11" fontWeight="bold" textAnchor="middle">
              1. Preparação & Intenção de Celebração
            </text>
          </svg>
        )

      case 2:
        // Etapa 2: Nutrição Radiante & Brilho Dourado Festivo
        return (
          <svg
            viewBox="0 0 320 220"
            className={className}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Enluve as mechas com sérum de brilho espelhado festivo"
          >
            <rect width="320" height="220" rx="16" fill="#14110E" />
            <circle cx="160" cy="110" r="90" fill="#D4AF37" fillOpacity="0.08" />

            {/* Mecha central polida com luz intensa */}
            <path
              d="M160 40 C155 85 155 135 160 195"
              stroke="#241E15"
              strokeWidth="32"
              strokeLinecap="round"
            />
            <path
              d="M148 45 C144 90 144 140 148 195"
              stroke="#D4AF37"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
            <path
              d="M160 40 C160 85 160 135 160 195"
              stroke="#FFF1CC"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M172 45 C176 90 176 140 172 195"
              stroke="#D4AF37"
              strokeWidth="4.5"
              strokeLinecap="round"
            />

            {/* Mãos estilizadas em enluvamento radiante */}
            <g transform="translate(130, 95)">
              <rect
                x="0"
                y="0"
                width="60"
                height="18"
                rx="9"
                fill="#1F1A12"
                stroke="#D4AF37"
                strokeWidth="1.5"
              />
              <text x="30" y="12" fill="#FFF1CC" fontSize="9" fontWeight="bold" textAnchor="middle">
                Brilho Festivo
              </text>
              <path
                d="M12 22 L12 30 M48 22 L48 30"
                stroke="#D4AF37"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </g>

            {/* Estrelas reluzentes e fogos delicados */}
            <g transform="translate(80, 75)">
              <path
                d="M0 -7 L1.5 -1.5 L7 0 L1.5 1.5 L0 7 L-1.5 1.5 L-7 0 L-1.5 -1.5 Z"
                fill="#FFF1CC"
              />
              <circle cx="0" cy="0" r="1.5" fill="#FFFFFF" />
            </g>
            <g transform="translate(240, 75)">
              <path
                d="M0 -7 L1.5 -1.5 L7 0 L1.5 1.5 L0 7 L-1.5 1.5 L-7 0 L-1.5 -1.5 Z"
                fill="#D4AF37"
              />
              <circle cx="0" cy="0" r="1.5" fill="#FFFFFF" />
            </g>
            <circle cx="90" cy="145" r="2.5" fill="#D4AF37" />
            <circle cx="230" cy="145" r="2.5" fill="#FFF1CC" />

            <rect
              x="75"
              y="18"
              width="170"
              height="22"
              rx="11"
              fill="#1A150F"
              stroke="#D4AF37"
              strokeWidth="1"
            />
            <text x="160" y="33" fill="#F1E5C8" fontSize="11" fontWeight="bold" textAnchor="middle">
              2. Nutrição Radiante & Selamento
            </text>
          </svg>
        )

      case 3:
      default:
        // Etapa 3: Penteado de Celebração & Coroamento com o Broche Constelação
        return (
          <svg
            viewBox="0 0 320 220"
            className={className}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Finalize o penteado festivo e posicione o Broche Constelação de Fim de Ano"
          >
            <rect width="320" height="220" rx="16" fill="#14110E" />
            <circle cx="160" cy="110" r="90" fill="#D4AF37" fillOpacity="0.1" />

            {/* Cabelo semi-preso sofisticado com movimento de ondas douradas */}
            <path
              d="M125 50 C110 90 120 145 115 195"
              stroke="#241E15"
              strokeWidth="24"
              strokeLinecap="round"
            />
            <path
              d="M125 50 C110 90 120 145 115 195"
              stroke="#D4AF37"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M195 50 C210 90 200 145 205 195"
              stroke="#241E15"
              strokeWidth="24"
              strokeLinecap="round"
            />
            <path
              d="M195 50 C210 90 200 145 205 195"
              stroke="#D4AF37"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* O Broche Constelação no centro como joia da celebração */}
            <g transform="translate(160, 95)">
              <circle cx="0" cy="0" r="28" fill="#1C1811" stroke="#D4AF37" strokeWidth="2.5" />
              <circle
                cx="0"
                cy="0"
                r="23"
                stroke="#FFF1CC"
                strokeWidth="1"
                strokeDasharray="3 2"
                fill="none"
              />
              {/* Constelação desenhada */}
              <path
                d="M-12 5 L-5 -10 L6 -12 L12 4 L0 12 Z"
                stroke="#D4AF37"
                strokeWidth="1.2"
                fill="none"
              />
              {/* Estrela central reluzente */}
              <polygon
                points="0,-9 2.5,-2.5 9,0 2.5,2.5 0,9 -2.5,2.5 -9,0 -2.5,-2.5"
                fill="#FFF1CC"
              />
              <circle cx="0" cy="0" r="2.8" fill="#FFFFFF" />
              {/* Cristais dos vértices */}
              <circle cx="-12" cy="5" r="2" fill="#D4AF37" />
              <circle cx="-5" cy="-10" r="2.2" fill="#FFFFFF" />
              <circle cx="6" cy="-12" r="1.8" fill="#D4AF37" />
              <circle cx="12" cy="4" r="2.2" fill="#FFF1CC" />
              <circle cx="0" cy="12" r="2" fill="#FFFFFF" />
            </g>

            {/* Faixas de confete e brilhos estelares ao redor */}
            <circle cx="70" cy="65" r="2.5" fill="#FFFFFF" />
            <circle cx="250" cy="65" r="2.5" fill="#D4AF37" />
            <circle cx="60" cy="130" r="2" fill="#FFF1CC" />
            <circle cx="260" cy="130" r="2" fill="#FFFFFF" />
            <path d="M75 160 L85 165 L80 175" stroke="#D4AF37" strokeWidth="1.5" fill="none" />
            <path d="M245 160 L235 165 L240 175" stroke="#FFF1CC" strokeWidth="1.5" fill="none" />

            <rect
              x="65"
              y="18"
              width="190"
              height="22"
              rx="11"
              fill="#1A150F"
              stroke="#D4AF37"
              strokeWidth="1"
            />
            <text
              x="160"
              y="33"
              fill="#F1E5C8"
              fontSize="10.5"
              fontWeight="bold"
              textAnchor="middle"
            >
              3. Penteado de Celebração & Broche Ouro
            </text>
          </svg>
        )
    }
  }

  if (missionType === 'spa-capilar-domingo') {
    switch (step) {
      case 1:
        // Etapa 1: Pré-lavagem e óleo nutritivo / massagem de abertura
        return (
          <svg
            viewBox="0 0 320 220"
            className={className}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Aplique o óleo pré-shampoo e desembarace suavemente"
          >
            <rect width="320" height="220" rx="16" fill="#151310" />
            <circle cx="160" cy="110" r="85" fill="#241E15" />
            <circle cx="160" cy="110" r="70" fill="#D4AF37" fillOpacity="0.08" />

            {/* Fios longos relaxados e suaves */}
            <path
              d="M130 45 C125 90 120 145 115 195"
              stroke="#2B241C"
              strokeWidth="18"
              strokeLinecap="round"
            />
            <path
              d="M130 45 C125 90 120 145 115 195"
              stroke="#D4AF37"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <path
              d="M160 40 C160 90 160 145 160 195"
              stroke="#1F1A14"
              strokeWidth="24"
              strokeLinecap="round"
            />
            <path
              d="M160 40 C160 90 160 145 160 195"
              stroke="#F1E5C8"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M190 45 C195 90 200 145 205 195"
              stroke="#2B241C"
              strokeWidth="18"
              strokeLinecap="round"
            />
            <path
              d="M190 45 C195 90 200 145 205 195"
              stroke="#D4AF37"
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            {/* Conta-gotas de óleo capilar luxuoso despejando gota dourada */}
            <g transform="translate(195, 60) rotate(-10)">
              {/* Bulbo do conta-gotas */}
              <rect
                x="0"
                y="0"
                width="16"
                height="12"
                rx="4"
                fill="#3A3022"
                stroke="#D4AF37"
                strokeWidth="1.2"
              />
              {/* Tampa dourada */}
              <rect x="2" y="12" width="12" height="6" fill="#D4AF37" />
              {/* Haste de vidro */}
              <rect
                x="5"
                y="18"
                width="6"
                height="30"
                fill="#FFFFFF"
                fillOpacity="0.4"
                stroke="#D4AF37"
                strokeWidth="1"
              />
              <path d="M5 48 L8 56 L11 48 Z" fill="#D4AF37" />
              {/* Gota luminosa escorrendo */}
              <circle cx="8" cy="68" r="4" fill="#F1E5C8" stroke="#D4AF37" strokeWidth="1.2" />
              <circle cx="8" cy="80" r="2.5" fill="#D4AF37" />
            </g>

            {/* Vapores suaves de spa no fundo */}
            <path
              d="M75 140 Q85 110 75 80"
              stroke="#D4AF37"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              opacity="0.6"
              fill="none"
            />
            <path
              d="M245 140 Q255 110 245 80"
              stroke="#D4AF37"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              opacity="0.6"
              fill="none"
            />

            {/* Selo da etapa */}
            <rect
              x="90"
              y="20"
              width="140"
              height="22"
              rx="11"
              fill="#1C1813"
              stroke="#D4AF37"
              strokeWidth="1"
            />
            <text x="160" y="35" fill="#F1E5C8" fontSize="11" fontWeight="bold" textAnchor="middle">
              Nutrição & Pré-Shampoo Spa
            </text>
          </svg>
        )

      case 2:
        // Etapa 2: Máscara intensiva com toalha morna e enluvamento profundo
        return (
          <svg
            viewBox="0 0 320 220"
            className={className}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Enluve a máscara de tratamento mecha a mecha com toalha morna"
          >
            <rect width="320" height="220" rx="16" fill="#151310" />
            <circle cx="160" cy="110" r="85" fill="#241E15" />
            <circle cx="160" cy="110" r="70" fill="#D4AF37" fillOpacity="0.08" />

            {/* Pote elegante de máscara de tratamento TRESemmé */}
            <g transform="translate(60, 95)">
              <rect
                x="0"
                y="16"
                width="46"
                height="34"
                rx="8"
                fill="#1C1914"
                stroke="#D4AF37"
                strokeWidth="2"
              />
              <rect x="-3" y="8" width="52" height="10" rx="4" fill="#D4AF37" />
              <circle cx="23" cy="33" r="7" fill="#2A241C" stroke="#F1E5C8" strokeWidth="1" />
              <text x="23" y="36" fill="#D4AF37" fontSize="8" fontWeight="bold" textAnchor="middle">
                T
              </text>
            </g>

            {/* Mecha sendo enluvada no centro */}
            <path
              d="M160 40 C160 80 155 130 160 195"
              stroke="#2B241C"
              strokeWidth="28"
              strokeLinecap="round"
            />
            <path
              d="M152 45 C150 85 148 135 152 195"
              stroke="#D4AF37"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M168 45 C170 85 172 135 168 195"
              stroke="#F1E5C8"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Mãos em enluvamento suave (linhas de movimento descendo) */}
            <g transform="translate(130, 85)">
              <rect
                x="0"
                y="0"
                width="60"
                height="18"
                rx="9"
                fill="#1C1813"
                stroke="#D4AF37"
                strokeWidth="1.5"
              />
              <text x="30" y="12" fill="#F1E5C8" fontSize="9" fontWeight="bold" textAnchor="middle">
                Enluvamento
              </text>
              <path
                d="M15 22 L15 32 M45 22 L45 32"
                stroke="#F1E5C8"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </g>

            {/* Toalha morna estilizada enrolada à direita */}
            <g transform="translate(230, 90)">
              <path
                d="M5 0 C18 0 25 8 25 22 C25 36 18 44 5 44 C-8 44 -15 36 -15 22 C-15 8 -8 0 5 0 Z"
                fill="#201C16"
                stroke="#D4AF37"
                strokeWidth="2"
              />
              <circle
                cx="5"
                cy="22"
                r="8"
                stroke="#F1E5C8"
                strokeWidth="1.2"
                strokeDasharray="3 2"
                fill="none"
              />
              {/* Linhas de vapor quente da toalha */}
              <path
                d="M0 -8 Q8 -16 0 -24"
                stroke="#D4AF37"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M10 -6 Q18 -14 10 -22"
                stroke="#F1E5C8"
                strokeWidth="1.2"
                fill="none"
                strokeLinecap="round"
              />
            </g>

            <rect
              x="85"
              y="20"
              width="150"
              height="22"
              rx="11"
              fill="#1C1813"
              stroke="#D4AF37"
              strokeWidth="1"
            />
            <text x="160" y="35" fill="#F1E5C8" fontSize="11" fontWeight="bold" textAnchor="middle">
              Tratamento Térmico Profundo
            </text>
          </svg>
        )

      case 3:
      default:
        // Etapa 3: Enxágue com água morna, selagem das pontas e coroamento com a Faixa Spa Dourada
        return (
          <svg
            viewBox="0 0 320 220"
            className={className}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Enxágue com água fresca, sele as pontas e coloque a Faixa Spa Dourada"
          >
            <rect width="320" height="220" rx="16" fill="#151310" />
            <circle cx="160" cy="110" r="85" fill="#241E15" />
            <circle cx="160" cy="110" r="70" fill="#D4AF37" fillOpacity="0.08" />

            {/* Fios soltos com brilho espelhado deslumbrante */}
            <path
              d="M160 40 C155 85 155 135 160 195"
              stroke="#261F18"
              strokeWidth="32"
              strokeLinecap="round"
            />
            <path
              d="M144 45 C140 90 140 140 146 195"
              stroke="#D4AF37"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
            <path
              d="M160 40 C160 85 160 135 160 195"
              stroke="#F1E5C8"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <path
              d="M176 45 C180 90 180 140 174 195"
              stroke="#D4AF37"
              strokeWidth="4.5"
              strokeLinecap="round"
            />

            {/* Faixa Spa Dourada majestosa no centro */}
            <g transform="translate(160, 85)">
              <ellipse
                cx="0"
                cy="0"
                rx="48"
                ry="24"
                fill="#1B1712"
                stroke="#D4AF37"
                strokeWidth="4"
              />
              <ellipse
                cx="0"
                cy="0"
                rx="42"
                ry="19"
                stroke="#F1E5C8"
                strokeWidth="1.5"
                strokeDasharray="5 3"
                fill="none"
              />
              {/* Broche frontal em ouro maciço */}
              <rect
                x="-10"
                y="-8"
                width="20"
                height="16"
                rx="5"
                fill="#D4AF37"
                stroke="#FFFFFF"
                strokeWidth="1"
              />
              <circle cx="0" cy="0" r="3.5" fill="#FFFFFF" />
            </g>

            {/* Gotas de brilho e finalização */}
            <circle cx="95" cy="165" r="3" fill="#D4AF37" />
            <circle cx="225" cy="165" r="3" fill="#F1E5C8" />
            <circle cx="160" cy="175" r="3.5" fill="#FFFFFF" />

            {/* Sparkles radiantes de celebração */}
            <g transform="translate(240, 50)">
              <path d="M0 -8 L2 -2 L8 0 L2 2 L0 8 L-2 2 L-8 0 L-2 -2 Z" fill="#D4AF37" />
              <circle cx="0" cy="0" r="1.5" fill="#FFFFFF" />
            </g>
            <g transform="translate(75, 55)">
              <path
                d="M0 -7 L1.5 -1.5 L7 0 L1.5 1.5 L0 7 L-1.5 1.5 L-7 0 L-1.5 -1.5 Z"
                fill="#F1E5C8"
              />
            </g>

            <rect
              x="80"
              y="192"
              width="160"
              height="22"
              rx="11"
              fill="#1C1813"
              stroke="#D4AF37"
              strokeWidth="1"
            />
            <text
              x="160"
              y="207"
              fill="#F1E5C8"
              fontSize="10.5"
              fontWeight="bold"
              textAnchor="middle"
            >
              Fios Renovados • Faixa Spa Dourada
            </text>
          </svg>
        )
    }
  }

  if (missionType === 'hidratacao-matinal') {
    switch (step) {
      case 1:
        // Etapa 1: Borrifar leave-in matinal nos fios secos ou úmidos
        return (
          <svg
            viewBox="0 0 320 220"
            className={className}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Borrife o leave-in hidratante matinal suavemente nos fios"
          >
            <rect width="320" height="220" rx="16" fill="#141311" />
            {/* Halo de luz matinal */}
            <circle cx="160" cy="110" r="85" fill="#2A2214" />
            <circle cx="160" cy="110" r="70" fill="#D4AF37" fillOpacity="0.08" />

            {/* Sol suave do amanhecer no horizonte */}
            <g transform="translate(60, 45)">
              <circle cx="0" cy="0" r="16" fill="#D4AF37" opacity="0.85" />
              <path
                d="M0 -22 L0 -26 M0 22 L0 26 M-22 0 L-26 0 M22 0 L26 0"
                stroke="#F1E5C8"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M-15 -15 L-18 -18 M15 15 L18 18 M-15 15 L-18 18 M15 -15 L18 -18"
                stroke="#D4AF37"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </g>

            {/* Fios descendo com movimento matinal */}
            <path
              d="M125 50 C120 90 115 145 110 195"
              stroke="#26221E"
              strokeWidth="16"
              strokeLinecap="round"
            />
            <path
              d="M125 50 C120 90 115 145 110 195"
              stroke="#D4AF37"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M155 45 C155 90 155 145 155 195"
              stroke="#1E1A17"
              strokeWidth="20"
              strokeLinecap="round"
            />
            <path
              d="M155 45 C155 90 155 145 155 195"
              stroke="#F1E5C8"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <path
              d="M185 50 C190 90 195 145 200 195"
              stroke="#26221E"
              strokeWidth="16"
              strokeLinecap="round"
            />
            <path
              d="M185 50 C190 90 195 145 200 195"
              stroke="#D4AF37"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Frasco spray dourado borrifando névoa fina */}
            <g transform="translate(205, 75) rotate(-15)">
              {/* Corpo do frasco spray */}
              <rect
                x="0"
                y="20"
                width="26"
                height="42"
                rx="6"
                fill="#1C1814"
                stroke="#D4AF37"
                strokeWidth="2"
              />
              <rect x="5" y="10" width="16" height="10" fill="#D4AF37" rx="2" />
              {/* Gatilho e bico spray */}
              <path d="M6 10 L-6 6 L-6 12 L6 14 Z" fill="#F1E5C8" />
              {/* Gotículas e bruma dourada pulverizada */}
              <circle cx="-16" cy="4" r="2.5" fill="#D4AF37" />
              <circle cx="-28" cy="-2" r="3" fill="#F1E5C8" />
              <circle cx="-38" cy="8" r="2" fill="#FFFFFF" />
              <circle cx="-24" cy="18" r="2.5" fill="#D4AF37" />
              <circle cx="-42" cy="22" r="1.8" fill="#F1E5C8" />
              <circle cx="-34" cy="-10" r="1.5" fill="#FFFFFF" />
            </g>

            {/* Selo informativo */}
            <rect
              x="95"
              y="22"
              width="130"
              height="22"
              rx="11"
              fill="#1E1A15"
              stroke="#D4AF37"
              strokeWidth="1"
            />
            <text x="160" y="37" fill="#F1E5C8" fontSize="11" fontWeight="bold" textAnchor="middle">
              Bruma Hidratante Express
            </text>
          </svg>
        )

      case 2:
      default:
        // Etapa 2: Desembaraçar com os dedos e finalizar com Scrunchie Dourado
        return (
          <svg
            viewBox="0 0 320 220"
            className={className}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Desembarace com os dedos gentilmente e prenda com o Scrunchie Dourado"
          >
            <rect width="320" height="220" rx="16" fill="#141311" />
            <circle cx="160" cy="110" r="85" fill="#241E14" />
            <circle cx="160" cy="110" r="70" fill="#D4AF37" fillOpacity="0.08" />

            {/* Cabelo alinhado e solto fluindo para baixo */}
            <path
              d="M160 30 C155 70 155 130 160 195"
              stroke="#251E16"
              strokeWidth="28"
              strokeLinecap="round"
            />
            <path
              d="M148 35 C144 75 144 135 150 195"
              stroke="#D4AF37"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M160 30 C160 70 160 130 160 195"
              stroke="#F1E5C8"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M172 35 C176 75 176 135 170 195"
              stroke="#D4AF37"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Mão em pente garfo / dedos passando suavemente pelos fios */}
            <g transform="translate(115, 65)">
              <rect
                x="10"
                y="10"
                width="30"
                height="12"
                rx="5"
                fill="#1E1914"
                stroke="#D4AF37"
                strokeWidth="1.5"
              />
              <line
                x1="16"
                y1="22"
                x2="16"
                y2="48"
                stroke="#F1E5C8"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <line
                x1="23"
                y1="22"
                x2="23"
                y2="52"
                stroke="#D4AF37"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <line
                x1="30"
                y1="22"
                x2="30"
                y2="50"
                stroke="#F1E5C8"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <line
                x1="37"
                y1="22"
                x2="37"
                y2="46"
                stroke="#D4AF37"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </g>

            {/* Scrunchie Dourado em destaque prendendo o meio-rabo matinal */}
            <g transform="translate(160, 145)">
              {/* Anel volumoso do scrunchie de cetim */}
              <circle
                cx="0"
                cy="0"
                r="22"
                stroke="#D4AF37"
                strokeWidth="8"
                strokeDasharray="10 3"
                fill="none"
              />
              <circle cx="0" cy="0" r="14" fill="#1A1713" stroke="#F1E5C8" strokeWidth="2" />
              <circle cx="0" cy="0" r="3" fill="#FFFFFF" />
              {/* Brilhos de cetim */}
              <path
                d="M-10 -16 C-4 -12 4 -12 10 -16"
                stroke="#F1E5C8"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M-10 16 C-4 12 4 12 10 16"
                stroke="#F1E5C8"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </g>

            {/* Sparkles de brilho matinal */}
            <g transform="translate(240, 60)">
              <path
                d="M0 -7 L1.5 -1.5 L7 0 L1.5 1.5 L0 7 L-1.5 1.5 L-7 0 L-1.5 -1.5 Z"
                fill="#D4AF37"
              />
              <circle cx="0" cy="0" r="1.5" fill="#FFFFFF" />
            </g>
            <circle cx="85" cy="130" r="2" fill="#F1E5C8" />
            <circle cx="235" cy="160" r="2.5" fill="#D4AF37" />

            <rect
              x="85"
              y="195"
              width="150"
              height="20"
              rx="10"
              fill="#1A1712"
              stroke="#D4AF37"
              strokeWidth="1"
            />
            <text
              x="160"
              y="209"
              fill="#F1E5C8"
              fontSize="10"
              fontWeight="bold"
              textAnchor="middle"
            >
              Fios Alinhados • Scrunchie Dourado
            </text>
          </svg>
        )
    }
  }

  if (missionType === 'protecao-dia') {
    switch (step) {
      case 1:
        // Etapa 1: Aplicar protetor térmico e escudo anti-umidade
        return (
          <svg
            viewBox="0 0 320 220"
            className={className}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Aplique o protetor térmico criando uma barreira protetora para o dia"
          >
            <rect width="320" height="220" rx="16" fill="#131210" />
            <circle cx="160" cy="110" r="85" fill="#241E13" />

            {/* Escudo de proteção solar/térmica dourado no centro */}
            <path
              d="M160 50 C195 50 215 65 215 110 C215 145 160 175 160 175 C160 175 105 145 105 110 C105 65 125 50 160 50 Z"
              fill="#1C1813"
              stroke="#D4AF37"
              strokeWidth="2.5"
            />
            {/* Linha de brilho interna do escudo */}
            <path
              d="M160 62 C186 62 201 75 201 110 C201 138 160 162 160 162 C160 162 119 138 119 110 C119 75 134 62 160 62 Z"
              stroke="#F1E5C8"
              strokeWidth="1.5"
              strokeDasharray="4 3"
              fill="none"
            />

            {/* Raio de sol estilizado central dentro do escudo */}
            <g transform="translate(160, 108)">
              <circle cx="0" cy="0" r="14" fill="#D4AF37" />
              <circle cx="0" cy="0" r="8" fill="#F1E5C8" />
              <path
                d="M0 -22 L0 -16 M0 16 L0 22 M-22 0 L-16 0 M16 0 L22 0"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M-15 -15 L-11 -11 M11 11 L15 15 M-15 15 L-11 11 M11 -11 L15 -15"
                stroke="#D4AF37"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </g>

            {/* Frasco de protetor térmico à esquerda */}
            <g transform="translate(55, 90)">
              <rect
                x="0"
                y="16"
                width="24"
                height="42"
                rx="5"
                fill="#1C1711"
                stroke="#D4AF37"
                strokeWidth="1.8"
              />
              <rect x="6" y="8" width="12" height="8" fill="#D4AF37" rx="2" />
              <path d="M12 24 L12 48" stroke="#F1E5C8" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="12" cy="34" r="3" fill="#D4AF37" />
            </g>

            {/* Fios selados e brilhantes à direita */}
            <g transform="translate(240, 70)">
              <path
                d="M0 0 C10 30 10 70 0 100"
                stroke="#D4AF37"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M10 5 C20 35 20 75 10 105"
                stroke="#F1E5C8"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <circle cx="5" cy="45" r="2" fill="#FFFFFF" />
            </g>

            <rect
              x="90"
              y="20"
              width="140"
              height="22"
              rx="11"
              fill="#1E1912"
              stroke="#D4AF37"
              strokeWidth="1"
            />
            <text x="160" y="35" fill="#F1E5C8" fontSize="11" fontWeight="bold" textAnchor="middle">
              Escudo Térmico & UV 230°C
            </text>
          </svg>
        )

      case 2:
      default:
        // Etapa 2: Finalizar penteado rápido com a Presilha Dourada do Amanhecer
        return (
          <svg
            viewBox="0 0 320 220"
            className={className}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Finalize o penteado rápido com a Presilha Dourada do Amanhecer"
          >
            <rect width="320" height="220" rx="16" fill="#131210" />
            <circle cx="160" cy="110" r="85" fill="#241E13" />

            {/* Silhueta da cabeça de perfil com cabelo polido para trás */}
            <ellipse
              cx="140"
              cy="120"
              rx="50"
              ry="42"
              fill="#1D1812"
              stroke="#443828"
              strokeWidth="1.5"
            />
            {/* Penteado preso lateralmente polido */}
            <path
              d="M105 100 C110 70 145 65 175 75 C205 85 210 115 205 145 C190 145 130 145 105 100 Z"
              fill="#261E15"
              stroke="#D4AF37"
              strokeWidth="1.5"
            />
            {/* Mechas de acabamento com brilho espelhado */}
            <path
              d="M115 95 C140 85 170 95 195 115"
              stroke="#F1E5C8"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M120 110 C145 105 170 115 190 130"
              stroke="#D4AF37"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* Presilha Dourada do Amanhecer posicionada no cabelo com raios solares */}
            <g transform="translate(175, 105) rotate(-20)">
              {/* Haste metálica da presilha */}
              <line
                x1="-15"
                y1="0"
                x2="35"
                y2="0"
                stroke="#8A6E1E"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <line
                x1="-15"
                y1="-1"
                x2="35"
                y2="-1"
                stroke="#D4AF37"
                strokeWidth="2"
                strokeLinecap="round"
              />

              {/* Sol com raios dourados esculpido na presilha */}
              <circle cx="10" cy="-2" r="10" fill="#241F16" stroke="#D4AF37" strokeWidth="2" />
              <circle cx="10" cy="-2" r="6" fill="#D4AF37" />
              <circle cx="10" cy="-2" r="2.5" fill="#FFFFFF" />

              {/* Raios pontiagudos do sol amanhecer */}
              <path
                d="M10 -16 L10 -13 M10 9 L10 12 M-4 -2 L-1 -2 M21 -2 L24 -2"
                stroke="#F1E5C8"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M-1 -11 L2 -8 M18 4 L21 7 M-1 7 L2 4 M18 -8 L21 -11"
                stroke="#D4AF37"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </g>

            {/* Sparkles radiantes ao redor da presilha */}
            <g transform="translate(230, 80)">
              <path
                d="M0 -7 L1.5 -1.5 L7 0 L1.5 1.5 L0 7 L-1.5 1.5 L-7 0 L-1.5 -1.5 Z"
                fill="#F1E5C8"
              />
              <circle cx="0" cy="0" r="1.5" fill="#FFFFFF" />
            </g>
            <g transform="translate(140, 60)">
              <path d="M0 -5 L1 -1 L5 0 L1 1 L0 5 L-1 1 L-5 0 L-1 -1 Z" fill="#D4AF37" />
            </g>
            <circle cx="245" cy="135" r="2" fill="#D4AF37" />
            <circle cx="85" cy="110" r="1.5" fill="#F1E5C8" />

            <rect
              x="80"
              y="195"
              width="160"
              height="20"
              rx="10"
              fill="#1C1710"
              stroke="#D4AF37"
              strokeWidth="1"
            />
            <text
              x="160"
              y="209"
              fill="#F1E5C8"
              fontSize="10"
              fontWeight="bold"
              textAnchor="middle"
            >
              Presilha Dourada do Amanhecer
            </text>
          </svg>
        )
    }
  }

  if (missionType === 'hidratacao-da-noite') {
    switch (step) {
      case 1:
        // Etapa 1: Desembarace e aplique o sérum noturno
        return (
          <svg
            viewBox="0 0 320 220"
            className={className}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Desembarace suavemente e aplique o sérum noturno"
          >
            <rect width="320" height="220" rx="16" fill="#111116" />
            <circle cx="160" cy="110" r="85" fill="#1C182A" />
            <circle cx="160" cy="110" r="70" fill="#D4AF37" fillOpacity="0.05" />

            {/* Lua crescente temática no céu estrelado */}
            <path
              d="M70 40 C60 45 55 58 58 70 C61 82 72 88 84 85 C73 85 66 76 66 65 C66 54 72 43 70 40 Z"
              fill="#D4AF37"
              opacity="0.8"
            />
            <circle cx="95" cy="50" r="1.5" fill="#FFFFFF" />
            <circle cx="80" cy="95" r="1.2" fill="#F1E5C8" />
            <circle cx="240" cy="45" r="1.5" fill="#F1E5C8" />
            <circle cx="260" cy="80" r="1.2" fill="#FFFFFF" />

            {/* Fios caindo para receber nutrição */}
            <path
              d="M130 50 C125 90 120 145 115 195"
              stroke="#25222E"
              strokeWidth="16"
              strokeLinecap="round"
            />
            <path
              d="M130 50 C125 90 120 145 115 195"
              stroke="#D4AF37"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M160 45 C160 90 160 145 160 195"
              stroke="#1D1A24"
              strokeWidth="20"
              strokeLinecap="round"
            />
            <path
              d="M160 45 C160 90 160 145 160 195"
              stroke="#F1E5C8"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <path
              d="M190 50 C195 90 200 145 205 195"
              stroke="#25222E"
              strokeWidth="16"
              strokeLinecap="round"
            />
            <path
              d="M190 50 C195 90 200 145 205 195"
              stroke="#D4AF37"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Frasco conta-gotas de sérum noturno dourado */}
            <g transform="translate(195, 75) rotate(-20)">
              <rect
                x="0"
                y="15"
                width="22"
                height="38"
                rx="6"
                fill="#1E1A14"
                stroke="#D4AF37"
                strokeWidth="1.8"
              />
              <rect x="5" y="6" width="12" height="9" rx="2" fill="#D4AF37" />
              <path d="M8 6 C8 1 14 1 14 6 Z" fill="#F1E5C8" />
              {/* Gotículas caindo */}
              <circle cx="11" cy="62" r="3" fill="#D4AF37" />
              <circle cx="11" cy="74" r="2" fill="#F1E5C8" />
            </g>

            <rect
              x="100"
              y="22"
              width="120"
              height="22"
              rx="11"
              fill="#1E1A26"
              stroke="#D4AF37"
              strokeWidth="1"
            />
            <text x="160" y="37" fill="#F1E5C8" fontSize="11" fontWeight="bold" textAnchor="middle">
              Nutrição Noturna
            </text>
          </svg>
        )

      case 2:
        // Etapa 2: Distribua mecha a mecha com enluvamento
        return (
          <svg
            viewBox="0 0 320 220"
            className={className}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Distribua o produto em movimentos suaves de cima para baixo"
          >
            <rect width="320" height="220" rx="16" fill="#111116" />
            <circle cx="160" cy="110" r="85" fill="#1C182A" />
            <circle cx="160" cy="110" r="70" fill="#D4AF37" fillOpacity="0.05" />

            {/* Mecha central sendo enluvada */}
            <path
              d="M160 35 C158 80 158 140 160 200"
              stroke="#25222E"
              strokeWidth="26"
              strokeLinecap="round"
            />
            <path
              d="M160 35 C158 80 158 140 160 200"
              stroke="#D4AF37"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <path
              d="M160 35 C158 80 158 140 160 200"
              stroke="#F1E5C8"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* Mãos em gesto de enluvamento (deslizando pelas mechas) */}
            <g transform="translate(115, 85)">
              <ellipse
                cx="20"
                cy="20"
                rx="18"
                ry="10"
                fill="#1F1B24"
                stroke="#D4AF37"
                strokeWidth="2"
                transform="rotate(-15 20 20)"
              />
              <path
                d="M10 20 Q25 25 35 15"
                stroke="#F1E5C8"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </g>
            <g transform="translate(170, 105)">
              <ellipse
                cx="20"
                cy="20"
                rx="18"
                ry="10"
                fill="#1F1B24"
                stroke="#D4AF37"
                strokeWidth="2"
                transform="rotate(15 20 20)"
              />
              <path d="M5 15 Q15 25 30 20" stroke="#F1E5C8" strokeWidth="2" strokeLinecap="round" />
            </g>

            {/* Setas para baixo indicando alinhamento e cutículas seladas */}
            <g>
              <line
                x1="85"
                y1="80"
                x2="85"
                y2="135"
                stroke="#D4AF37"
                strokeWidth="2"
                strokeDasharray="3 3"
              />
              <polygon points="81,130 85,140 89,130" fill="#D4AF37" />
              <line
                x1="235"
                y1="80"
                x2="235"
                y2="135"
                stroke="#D4AF37"
                strokeWidth="2"
                strokeDasharray="3 3"
              />
              <polygon points="231,130 235,140 239,130" fill="#D4AF37" />
            </g>

            <text x="160" y="208" fill="#F1E5C8" fontSize="11" fontWeight="600" textAnchor="middle">
              Gesto de enluvamento suave
            </text>
          </svg>
        )

      case 3:
        // Etapa 3: Faça um coque frouxo ou trança protetora
        return (
          <svg
            viewBox="0 0 320 220"
            className={className}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Prenda em coque suave ou trança protetora sem tracionar"
          >
            <rect width="320" height="220" rx="16" fill="#111116" />
            <circle cx="160" cy="110" r="85" fill="#1C182A" />

            {/* Silhueta da cabeça de costas */}
            <ellipse
              cx="160"
              cy="150"
              rx="55"
              ry="40"
              fill="#201D28"
              stroke="#D4AF37"
              strokeWidth="1.5"
            />
            <path d="M140 185 L140 215 L180 215 L180 185 Z" fill="#9E5D38" />

            {/* Coque abacaxi / suave no topo sem tração */}
            <circle cx="160" cy="90" r="38" fill="#1A1820" stroke="#D4AF37" strokeWidth="2" />
            <circle
              cx="160"
              cy="90"
              r="28"
              stroke="#F1E5C8"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            <path
              d="M135 85 C145 70 175 70 185 85 C185 105 135 105 135 85 Z"
              fill="#2A2416"
              stroke="#D4AF37"
              strokeWidth="1"
            />

            {/* Scrunchie suave de cetim segurando */}
            <ellipse cx="160" cy="120" rx="22" ry="7" fill="#D4AF37" opacity="0.85" />
            <circle cx="160" cy="120" r="2" fill="#FFFFFF" />

            {/* Almofada de sono / ícone sono */}
            <g transform="translate(65, 55)">
              <path
                d="M0 0 C5 -4 15 -4 20 0 C25 8 15 16 0 10 Z"
                fill="#1C1828"
                stroke="#D4AF37"
                strokeWidth="1"
              />
              <text x="10" y="7" fill="#F1E5C8" fontSize="8" fontWeight="bold">
                zzz
              </text>
            </g>

            <rect
              x="90"
              y="24"
              width="140"
              height="22"
              rx="11"
              fill="#1E1A26"
              stroke="#D4AF37"
              strokeWidth="1"
            />
            <text x="160" y="39" fill="#F1E5C8" fontSize="11" fontWeight="bold" textAnchor="middle">
              Penteado Protetor Noturno
            </text>
          </svg>
        )

      case 4:
      default:
        // Etapa 4: Envolva com o Lenço de Cetim Dourado
        return (
          <svg
            viewBox="0 0 320 220"
            className={className}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Envolva com o lenço de cetim dourado e acorde com brilho sem frizz"
          >
            <rect width="320" height="220" rx="16" fill="#111116" />
            <circle cx="160" cy="110" r="90" fill="#D4AF37" fillOpacity="0.08" />

            {/* Cabeça envolta no Lenço Dourado acetinado */}
            <ellipse
              cx="160"
              cy="130"
              rx="55"
              ry="45"
              fill="#1E1A26"
              stroke="#444"
              strokeWidth="1.5"
            />
            <path d="M140 170 L140 210 L180 210 L180 170 Z" fill="#B77248" />

            {/* Lenço de Cetim envolvendo a coroa */}
            <path
              d="M105 125 C105 75 130 55 160 55 C190 55 215 75 215 125 C210 135 110 135 105 125 Z"
              fill="#221C12"
              stroke="#D4AF37"
              strokeWidth="2.5"
            />
            {/* Faixa dourada lustrosa */}
            <path
              d="M110 115 C125 90 195 90 210 115"
              stroke="#D4AF37"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <path
              d="M115 115 C130 95 190 95 205 115"
              stroke="#F1E5C8"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Nó elegante e drapeado na lateral */}
            <g transform="translate(190, 115)">
              <circle cx="0" cy="0" r="8" fill="#D4AF37" stroke="#F1E5C8" strokeWidth="1.5" />
              <path d="M0 6 C5 18 12 24 16 35 C10 32 4 25 -2 15 Z" fill="#F1E5C8" />
              <path d="M-4 6 C-1 18 4 24 6 35 C2 30 -2 24 -6 14 Z" fill="#D4AF37" />
            </g>

            {/* Constelação noturna dourada */}
            <circle cx="70" cy="50" r="2" fill="#D4AF37" />
            <circle cx="85" cy="75" r="1.5" fill="#FFFFFF" />
            <circle cx="250" cy="60" r="2" fill="#F1E5C8" />
            <circle cx="265" cy="90" r="1.5" fill="#D4AF37" />

            {/* Selo Anti-Frizz */}
            <rect
              x="95"
              y="185"
              width="130"
              height="24"
              rx="12"
              fill="#1D1A14"
              stroke="#D4AF37"
              strokeWidth="1.2"
            />
            <text
              x="160"
              y="201"
              fill="#F1E5C8"
              fontSize="11"
              fontWeight="bold"
              textAnchor="middle"
            >
              Zero Frito • Brilho Acetinado
            </text>
          </svg>
        )
    }
  }

  if (missionType === 'massagem-relaxante') {
    switch (step) {
      case 1:
        // Etapa 1: Respire fundo e solte a tensão
        return (
          <svg
            viewBox="0 0 320 220"
            className={className}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Respire profundamente e solte os ombros e pescoço"
          >
            <rect width="320" height="220" rx="16" fill="#101015" />
            <circle cx="160" cy="110" r="85" fill="#191522" />
            <circle
              cx="160"
              cy="110"
              r="65"
              stroke="#D4AF37"
              strokeWidth="1"
              strokeDasharray="3 3"
              opacity="0.6"
            />

            {/* Ondas zen de serenidade e respiração */}
            <circle
              cx="160"
              cy="110"
              r="45"
              stroke="#F1E5C8"
              strokeWidth="1.2"
              strokeDasharray="2 4"
              opacity="0.5"
            />

            {/* Silhueta de perfil serena com olhos fechados */}
            <circle cx="160" cy="95" r="32" fill="#231F2A" stroke="#D4AF37" strokeWidth="1.5" />
            <path
              d="M148 95 Q154 98 160 95"
              stroke="#D4AF37"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <path
              d="M152 110 Q160 114 168 110"
              stroke="#C86A5E"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* Ombros relaxando */}
            <path
              d="M110 190 C120 155 140 145 160 145 C180 145 200 155 210 190 Z"
              fill="#1C1822"
              stroke="#444"
              strokeWidth="1.5"
            />

            {/* Setas de relaxamento dos ombros para baixo */}
            <g>
              <line x1="120" y1="150" x2="120" y2="175" stroke="#D4AF37" strokeWidth="2" />
              <polygon points="116,170 120,180 124,170" fill="#D4AF37" />
              <line x1="200" y1="150" x2="200" y2="175" stroke="#D4AF37" strokeWidth="2" />
              <polygon points="196,170 200,180 204,170" fill="#D4AF37" />
            </g>

            {/* Gotas de óleo aromático nas têmporas */}
            <circle cx="130" cy="95" r="2.5" fill="#D4AF37" />
            <circle cx="190" cy="95" r="2.5" fill="#D4AF37" />

            <rect
              x="95"
              y="24"
              width="130"
              height="22"
              rx="11"
              fill="#1E1A26"
              stroke="#D4AF37"
              strokeWidth="1"
            />
            <text x="160" y="39" fill="#F1E5C8" fontSize="11" fontWeight="bold" textAnchor="middle">
              Momento de Respiração
            </text>
          </svg>
        )

      case 2:
        // Etapa 2: Movimentos circulares na raiz com as pontas dos dedos
        return (
          <svg
            viewBox="0 0 320 220"
            className={className}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Faça movimentos circulares suaves no couro cabeludo"
          >
            <rect width="320" height="220" rx="16" fill="#101015" />
            <circle cx="160" cy="110" r="85" fill="#191522" />

            {/* Topo do couro cabeludo visto de cima */}
            <circle cx="160" cy="110" r="50" fill="#201C27" stroke="#D4AF37" strokeWidth="2" />
            <circle
              cx="160"
              cy="110"
              r="30"
              fill="#282332"
              stroke="#F1E5C8"
              strokeWidth="1"
              strokeDasharray="3 3"
            />

            {/* Espirais de pressão circular suave em 4 quadrantes */}
            <g transform="translate(135, 85)">
              <path
                d="M0 0 A6 6 0 1 1 8 8"
                stroke="#D4AF37"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="0" cy="0" r="3" fill="#F1E5C8" />
            </g>
            <g transform="translate(185, 85)">
              <path
                d="M0 0 A6 6 0 1 1 -8 8"
                stroke="#D4AF37"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="0" cy="0" r="3" fill="#F1E5C8" />
            </g>
            <g transform="translate(135, 135)">
              <path
                d="M0 0 A6 6 0 1 1 8 -8"
                stroke="#D4AF37"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="0" cy="0" r="3" fill="#F1E5C8" />
            </g>
            <g transform="translate(185, 135)">
              <path
                d="M0 0 A6 6 0 1 1 -8 -8"
                stroke="#D4AF37"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="0" cy="0" r="3" fill="#F1E5C8" />
            </g>

            {/* Centro coronário com irradiação de energia e circulação */}
            <circle cx="160" cy="110" r="5" fill="#D4AF37" />
            <circle cx="160" cy="110" r="1.5" fill="#FFFFFF" />

            <text x="160" y="195" fill="#F1E5C8" fontSize="11" fontWeight="600" textAnchor="middle">
              Estimule a microcirculação capilar
            </text>
          </svg>
        )

      case 3:
        // Etapa 3: Pressione pontos das têmporas e nuca
        return (
          <svg
            viewBox="0 0 320 220"
            className={className}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Pressione suavemente as têmporas e a base da nuca"
          >
            <rect width="320" height="220" rx="16" fill="#101015" />
            <circle cx="160" cy="110" r="85" fill="#191522" />

            {/* Cabeça de costas mostrando a base da nuca e occipital */}
            <ellipse
              cx="160"
              cy="110"
              rx="48"
              ry="42"
              fill="#221E2A"
              stroke="#D4AF37"
              strokeWidth="2"
            />
            <path d="M140 150 L140 195 L180 195 L180 150 Z" fill="#7D4726" />

            {/* Pontos de acupressão relaxante na base do crânio */}
            <g>
              {/* Ponto Nuca Esquerdo */}
              <circle cx="145" cy="145" r="7" fill="#1B1622" stroke="#D4AF37" strokeWidth="2" />
              <circle cx="145" cy="145" r="3" fill="#F1E5C8" />
              <line
                x1="120"
                y1="145"
                x2="135"
                y2="145"
                stroke="#D4AF37"
                strokeWidth="2"
                strokeDasharray="2 2"
              />
              {/* Ponto Nuca Direito */}
              <circle cx="175" cy="145" r="7" fill="#1B1622" stroke="#D4AF37" strokeWidth="2" />
              <circle cx="175" cy="145" r="3" fill="#F1E5C8" />
              <line
                x1="200"
                y1="145"
                x2="185"
                y2="145"
                stroke="#D4AF37"
                strokeWidth="2"
                strokeDasharray="2 2"
              />
            </g>

            {/* Ondas douradas de alívio irradiando */}
            <path
              d="M130 170 Q160 180 190 170"
              stroke="#D4AF37"
              strokeWidth="1.5"
              strokeDasharray="3 3"
            />
            <path
              d="M125 180 Q160 192 195 180"
              stroke="#F1E5C8"
              strokeWidth="1.5"
              strokeDasharray="3 3"
            />

            <rect
              x="90"
              y="24"
              width="140"
              height="22"
              rx="11"
              fill="#1E1A26"
              stroke="#D4AF37"
              strokeWidth="1"
            />
            <text x="160" y="39" fill="#F1E5C8" fontSize="11" fontWeight="bold" textAnchor="middle">
              Pontos de Pressão e Alívio
            </text>
          </svg>
        )

      case 4:
      default:
        // Etapa 4: Finalize com os Brincos de Meia-Lua e relaxe
        return (
          <svg
            viewBox="0 0 320 220"
            className={className}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Finalize em paz, sinta os fios leves e coloque os brincos de lua"
          >
            <rect width="320" height="220" rx="16" fill="#101015" />
            <circle cx="160" cy="110" r="90" fill="#D4AF37" fillOpacity="0.08" />

            {/* Rosto sereno e radiante */}
            <ellipse cx="160" cy="105" rx="42" ry="48" fill="#F0B58D" />
            {/* Cabelo fluido nas laterais com brilho */}
            <path
              d="M115 105 C112 140 108 175 118 205"
              stroke="#1D1A22"
              strokeWidth="16"
              strokeLinecap="round"
            />
            <path
              d="M115 105 C112 140 108 175 118 205"
              stroke="#D4AF37"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M205 105 C208 140 212 175 202 205"
              stroke="#1D1A22"
              strokeWidth="16"
              strokeLinecap="round"
            />
            <path
              d="M205 105 C208 140 212 175 202 205"
              stroke="#D4AF37"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Franja suave */}
            <path
              d="M125 75 Q160 65 195 80"
              stroke="#2A241E"
              strokeWidth="8"
              strokeLinecap="round"
            />

            {/* Olhos fechados em paz absoluta */}
            <path
              d="M142 100 Q148 103 154 100"
              stroke="#332418"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M166 100 Q172 103 178 100"
              stroke="#332418"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M152 120 Q160 124 168 120"
              stroke="#C86A5E"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="138" cy="112" r="4" fill="#ECA08B" opacity="0.6" />
            <circle cx="182" cy="112" r="4" fill="#ECA08B" opacity="0.6" />

            {/* Brincos de Meia-Lua Dourados nas orelhas */}
            {/* Orelha esquerda */}
            <g transform="translate(112, 115)">
              <circle cx="0" cy="0" r="2" fill="#FFFFFF" />
              <path
                d="M-2 3 C-6 5 -6 11 -2 14 C-4 12 -4 6 0 4 Z"
                fill="#D4AF37"
                stroke="#F1E5C8"
                strokeWidth="0.8"
              />
              <circle cx="-3" cy="8" r="1" fill="#FFFFFF" />
            </g>
            {/* Orelha direita */}
            <g transform="translate(208, 115)">
              <circle cx="0" cy="0" r="2" fill="#FFFFFF" />
              <path
                d="M2 3 C6 5 6 11 2 14 C4 12 4 6 0 4 Z"
                fill="#D4AF37"
                stroke="#F1E5C8"
                strokeWidth="0.8"
              />
              <circle cx="3" cy="8" r="1" fill="#FFFFFF" />
            </g>

            {/* Sparkles de serenidade */}
            <g transform="translate(160, 25)">
              <path
                d="M0 -6 L1.5 -1.5 L6 0 L1.5 1.5 L0 6 L-1.5 1.5 L-6 0 L-1.5 -1.5 Z"
                fill="#D4AF37"
              />
            </g>
            <circle cx="75" cy="80" r="2" fill="#F1E5C8" />
            <circle cx="245" cy="80" r="2" fill="#D4AF37" />

            <text
              x="160"
              y="210"
              fill="#F1E5C8"
              fontSize="11"
              fontWeight="bold"
              textAnchor="middle"
            >
              Mente Leve • Couro Cabeludo Revitalizado
            </text>
          </svg>
        )
    }
  }

  if (missionType === 'ondas-naturais') {
    switch (step) {
      case 1:
        // Ondas naturais - Etapa 1: "Prepare e desembarace" - Alinhe as mechas e aplique protetor térmico
        return (
          <svg
            viewBox="0 0 320 220"
            className={className}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Prepare e desembarace os fios úmidos"
          >
            <rect width="320" height="220" rx="16" fill="#141414" />
            <circle cx="160" cy="110" r="80" fill="#D4AF37" fillOpacity="0.05" />

            {/* Cabeça e mechas soltas */}
            <path
              d="M120 40 C130 25 190 25 200 40 C200 60 120 60 120 40 Z"
              fill="#262626"
              stroke="#D4AF37"
              strokeWidth="1.5"
            />
            {/* Mechas caindo suaves */}
            <path
              d="M130 50 C125 90 120 140 115 195"
              stroke="#2A2A2A"
              strokeWidth="16"
              strokeLinecap="round"
            />
            <path
              d="M130 50 C125 90 120 140 115 195"
              stroke="#D4AF37"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <path
              d="M160 50 C160 90 160 140 160 195"
              stroke="#1F1F1F"
              strokeWidth="18"
              strokeLinecap="round"
            />
            <path
              d="M160 50 C160 90 160 140 160 195"
              stroke="#F1E5C8"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M190 50 C195 90 200 140 205 195"
              stroke="#2A2A2A"
              strokeWidth="16"
              strokeLinecap="round"
            />
            <path
              d="M190 50 C195 90 200 140 205 195"
              stroke="#D4AF37"
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            {/* Pente Dourado alinhando a mecha */}
            <g transform="translate(180, 85) rotate(-15)">
              <rect x="0" y="0" width="60" height="10" rx="5" fill="#D4AF37" />
              <line
                x1="10"
                y1="10"
                x2="10"
                y2="35"
                stroke="#D4AF37"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <line
                x1="20"
                y1="10"
                x2="20"
                y2="35"
                stroke="#D4AF37"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <line
                x1="30"
                y1="10"
                x2="30"
                y2="35"
                stroke="#D4AF37"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <line
                x1="40"
                y1="10"
                x2="40"
                y2="35"
                stroke="#D4AF37"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <line
                x1="50"
                y1="10"
                x2="50"
                y2="35"
                stroke="#D4AF37"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </g>

            {/* Gotas de sérum protetor */}
            <circle cx="95" cy="115" r="3" fill="#F1E5C8" opacity="0.9" />
            <circle cx="85" cy="140" r="2" fill="#D4AF37" opacity="0.8" />
            <path d="M92 110 Q95 102 98 110" stroke="#F1E5C8" strokeWidth="1" fill="#F1E5C8" />

            {/* Linhas de movimento suaves */}
            <path
              d="M140 100 Q150 120 145 145"
              stroke="#F1E5C8"
              strokeWidth="1.5"
              strokeDasharray="3 3"
            />
            <circle cx="215" cy="65" r="2" fill="#D4AF37" />
          </svg>
        )

      case 2:
        // Ondas naturais - Etapa 2: "Torça as mechas em S" - Movimento serpenteante e modelagem
        return (
          <svg
            viewBox="0 0 320 220"
            className={className}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Torça mechas médias em formato S"
          >
            <rect width="320" height="220" rx="16" fill="#141414" />
            <circle cx="160" cy="110" r="80" fill="#D4AF37" fillOpacity="0.05" />

            {/* Ondulações em curva S marcantes */}
            <path
              d="M100 45 Q130 75 100 105 Q70 135 100 165 Q120 185 105 200"
              stroke="#242424"
              strokeWidth="18"
              strokeLinecap="round"
            />
            <path
              d="M100 45 Q130 75 100 105 Q70 135 100 165 Q120 185 105 200"
              stroke="#D4AF37"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Mecha Central em S destacada */}
            <path
              d="M160 40 Q200 75 160 110 Q120 145 160 180 Q180 195 165 205"
              stroke="#2E2E2E"
              strokeWidth="22"
              strokeLinecap="round"
            />
            <path
              d="M160 40 Q200 75 160 110 Q120 145 160 180 Q180 195 165 205"
              stroke="#F1E5C8"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <path
              d="M160 40 Q200 75 160 110 Q120 145 160 180 Q180 195 165 205"
              stroke="#D4AF37"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* Mecha Direita em S */}
            <path
              d="M220 45 Q250 75 220 105 Q190 135 220 165 Q235 185 225 200"
              stroke="#242424"
              strokeWidth="18"
              strokeLinecap="round"
            />
            <path
              d="M220 45 Q250 75 220 105 Q190 135 220 165 Q235 185 225 200"
              stroke="#D4AF37"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Indicador de movimento da onda */}
            <path
              d="M205 75 C225 90 220 115 195 115"
              stroke="#D4AF37"
              strokeWidth="2"
              strokeDasharray="3 3"
              strokeLinecap="round"
            />
            <polygon points="194,111 190,119 200,117" fill="#D4AF37" />

            {/* Badge de formato */}
            <rect
              x="110"
              y="22"
              width="100"
              height="22"
              rx="11"
              fill="#1C1C1C"
              stroke="#D4AF37"
              strokeWidth="1"
            />
            <text x="160" y="37" fill="#F1E5C8" fontSize="11" fontWeight="bold" textAnchor="middle">
              Curvatura em S
            </text>

            <circle cx="135" cy="85" r="2" fill="#FFFFFF" />
            <circle cx="185" cy="145" r="2" fill="#FFFFFF" />
          </svg>
        )

      case 3:
        // Ondas naturais - Etapa 3: "Amasse de baixo para cima" - Ativação da textura (scrunch)
        return (
          <svg
            viewBox="0 0 320 220"
            className={className}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Amasse as pontas em direção à raiz para fixar as ondas"
          >
            <rect width="320" height="220" rx="16" fill="#141414" />
            <circle cx="160" cy="110" r="80" fill="#D4AF37" fillOpacity="0.05" />

            {/* Ondas comprimidas com elasticidade */}
            <path
              d="M120 50 Q145 70 120 90 Q140 105 125 125"
              stroke="#2E2E2E"
              strokeWidth="16"
              strokeLinecap="round"
            />
            <path
              d="M120 50 Q145 70 120 90 Q140 105 125 125"
              stroke="#D4AF37"
              strokeWidth="4"
              strokeLinecap="round"
            />

            <path
              d="M160 45 Q190 70 160 95 Q185 115 160 135"
              stroke="#262626"
              strokeWidth="20"
              strokeLinecap="round"
            />
            <path
              d="M160 45 Q190 70 160 95 Q185 115 160 135"
              stroke="#F1E5C8"
              strokeWidth="4.5"
              strokeLinecap="round"
            />

            <path
              d="M200 50 Q225 70 200 90 Q220 105 205 125"
              stroke="#2E2E2E"
              strokeWidth="16"
              strokeLinecap="round"
            />
            <path
              d="M200 50 Q225 70 200 90 Q220 105 205 125"
              stroke="#D4AF37"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Mãos estilizadas sustentando e amassando de baixo para cima */}
            <g transform="translate(120, 145)">
              <path
                d="M10 35 C10 20 25 15 40 15 C55 15 70 20 70 35"
                stroke="#D4AF37"
                strokeWidth="3.5"
                fill="#1C1C1C"
                strokeLinecap="round"
              />
              <path
                d="M25 18 L25 5 M40 15 L40 3 M55 18 L55 5"
                stroke="#F1E5C8"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </g>

            {/* Setas de pressão para cima */}
            <g>
              <line
                x1="160"
                y1="195"
                x2="160"
                y2="175"
                stroke="#D4AF37"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <polygon points="156,177 160,170 164,177" fill="#D4AF37" />
            </g>
            <g>
              <line
                x1="110"
                y1="185"
                x2="110"
                y2="168"
                stroke="#D4AF37"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <polygon points="107,170 110,164 113,170" fill="#D4AF37" />
            </g>
            <g>
              <line
                x1="210"
                y1="185"
                x2="210"
                y2="168"
                stroke="#D4AF37"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <polygon points="207,170 210,164 213,170" fill="#D4AF37" />
            </g>

            <text x="160" y="210" fill="#F1E5C8" fontSize="11" fontWeight="600" textAnchor="middle">
              Movimento de baixo para cima
            </text>
          </svg>
        )

      case 4:
      default:
        // Ondas naturais - Etapa 4: "Solte com óleo e finalize com a Tiara" - Brilho, acabamento impecável e tiara
        return (
          <svg
            viewBox="0 0 320 220"
            className={className}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Solte os fios com óleo finalizador e coloque a Tiara de Ondas Dourada"
          >
            <rect width="320" height="220" rx="16" fill="#141414" />
            {/* Halo radiante dourado */}
            <circle cx="160" cy="110" r="90" fill="#D4AF37" fillOpacity="0.09" />

            {/* Cabeça e cascata de ondas sedosas */}
            <path
              d="M110 50 C125 30 195 30 210 50 C210 75 110 75 110 50 Z"
              fill="#222222"
              stroke="#D4AF37"
              strokeWidth="1.5"
            />

            {/* Cascata fluida de ondas brilhantes */}
            <path
              d="M100 65 Q135 100 105 135 Q75 170 110 205"
              stroke="#2C2C2C"
              strokeWidth="20"
              strokeLinecap="round"
            />
            <path
              d="M100 65 Q135 100 105 135 Q75 170 110 205"
              stroke="#D4AF37"
              strokeWidth="4"
              strokeLinecap="round"
            />

            <path
              d="M160 65 Q205 100 160 140 Q120 175 165 208"
              stroke="#202020"
              strokeWidth="26"
              strokeLinecap="round"
            />
            <path
              d="M160 65 Q205 100 160 140 Q120 175 165 208"
              stroke="#F1E5C8"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <path
              d="M160 65 Q205 100 160 140 Q120 175 165 208"
              stroke="#D4AF37"
              strokeWidth="2"
              strokeLinecap="round"
            />

            <path
              d="M220 65 Q255 100 220 135 Q190 170 225 205"
              stroke="#2C2C2C"
              strokeWidth="20"
              strokeLinecap="round"
            />
            <path
              d="M220 65 Q255 100 220 135 Q190 170 225 205"
              stroke="#D4AF37"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Tiara de Ondas Dourada no topo dos fios */}
            <g transform="translate(112, 28)">
              {/* Arco base */}
              <path
                d="M8 26 C25 8 70 8 88 26"
                stroke="#D4AF37"
                strokeWidth="3.5"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M14 24 Q48 10 82 24"
                stroke="#F1E5C8"
                strokeWidth="1.8"
                fill="none"
                strokeLinecap="round"
              />
              {/* Ondulações com pedrarias */}
              <circle cx="48" cy="11" r="4" fill="#FFFFFF" stroke="#D4AF37" strokeWidth="1.5" />
              <circle cx="34" cy="15" r="2.8" fill="#F1E5C8" />
              <circle cx="62" cy="15" r="2.8" fill="#F1E5C8" />
              <circle cx="22" cy="22" r="2.2" fill="#D4AF37" />
              <circle cx="74" cy="22" r="2.2" fill="#D4AF37" />
            </g>

            {/* Sparkles dourados celebrando a finalização */}
            <g transform="translate(75, 80)">
              <path
                d="M0 -7 L1.5 -1.5 L7 0 L1.5 1.5 L0 7 L-1.5 1.5 L-7 0 L-1.5 -1.5 Z"
                fill="#D4AF37"
              />
            </g>
            <g transform="translate(245, 85)">
              <path d="M0 -8 L2 -2 L8 0 L2 2 L0 8 L-2 2 L-8 0 L-2 -2 Z" fill="#F1E5C8" />
            </g>
            <g transform="translate(160, 18)" opacity="0.9">
              <path
                d="M0 -6 L1.5 -1.5 L6 0 L1.5 1.5 L0 6 L-1.5 1.5 L-6 0 L-1.5 -1.5 Z"
                fill="#D4AF37"
              />
            </g>

            <circle cx="120" cy="110" r="2" fill="#FFFFFF" />
            <circle cx="205" cy="115" r="2" fill="#FFFFFF" />
            <circle cx="85" cy="155" r="1.5" fill="#F1E5C8" />
            <circle cx="235" cy="155" r="1.5" fill="#D4AF37" />
          </svg>
        )
    }
  }

  if (missionType === 'coque-elegante') {
    switch (step) {
      case 1:
        // Coque Etapa 1: "Faça um rabo de cavalo alto" - Prenda no topo com firmeza e alinhe os fios
        return (
          <svg
            viewBox="0 0 320 220"
            className={className}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Faça um rabo de cavalo no topo da cabeça"
          >
            <rect width="320" height="220" rx="16" fill="#141414" />
            <circle cx="160" cy="110" r="80" fill="#D4AF37" fillOpacity="0.05" />

            {/* Silhueta da cabeça/perfil estilizada */}
            <ellipse
              cx="160"
              cy="140"
              rx="50"
              ry="40"
              fill="#222222"
              stroke="#444444"
              strokeWidth="1.5"
            />
            <path d="M140 180 L140 210 L180 210 L180 180 Z" fill="#9E5D38" />

            {/* Linhas de tração dos fios puxados para cima */}
            <path
              d="M120 150 Q140 110 155 85"
              stroke="#2F2F2F"
              strokeWidth="12"
              strokeLinecap="round"
            />
            <path
              d="M120 150 Q140 110 155 85"
              stroke="#D4AF37"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M200 150 Q180 110 165 85"
              stroke="#2F2F2F"
              strokeWidth="12"
              strokeLinecap="round"
            />
            <path
              d="M200 150 Q180 110 165 85"
              stroke="#D4AF37"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path d="M160 160 L160 85" stroke="#F1E5C8" strokeWidth="3" strokeLinecap="round" />

            {/* Elástico firme prendendo o rabo no topo */}
            <rect
              x="145"
              y="78"
              width="30"
              height="12"
              rx="6"
              fill="#D4AF37"
              stroke="#FFFFFF"
              strokeWidth="1"
            />
            <circle cx="160" cy="84" r="2" fill="#FFFFFF" />

            {/* Cauda do rabo de cavalo estendida */}
            <path
              d="M160 78 C155 50 170 30 185 45 C195 55 185 80 180 100"
              stroke="#262626"
              strokeWidth="16"
              strokeLinecap="round"
            />
            <path
              d="M160 78 C155 50 170 30 185 45 C195 55 185 80 180 100"
              stroke="#D4AF37"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Setas de direcionamento para o topo */}
            <path
              d="M105 130 Q120 95 140 85"
              stroke="#D4AF37"
              strokeWidth="2"
              strokeDasharray="3 3"
            />
            <polygon points="142,82 145,90 137,88" fill="#D4AF37" />
            <path
              d="M215 130 Q200 95 180 85"
              stroke="#D4AF37"
              strokeWidth="2"
              strokeDasharray="3 3"
            />
            <polygon points="178,82 183,88 175,90" fill="#D4AF37" />

            <circle cx="130" cy="70" r="2" fill="#F1E5C8" />
            <circle cx="210" cy="65" r="2" fill="#D4AF37" />
          </svg>
        )

      case 2:
        // Coque Etapa 2: "Enrole o comprimento em espiral" - Gire a mecha suavemente sobre a base
        return (
          <svg
            viewBox="0 0 320 220"
            className={className}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Enrole a mecha em espiral ao redor da base"
          >
            <rect width="320" height="220" rx="16" fill="#141414" />
            <circle cx="160" cy="110" r="80" fill="#D4AF37" fillOpacity="0.05" />

            {/* Base da cabeça */}
            <ellipse
              cx="160"
              cy="160"
              rx="55"
              ry="35"
              fill="#222222"
              stroke="#444444"
              strokeWidth="1.5"
            />

            {/* Centro do coque em formação */}
            <circle cx="160" cy="90" r="24" fill="#1F1F1F" stroke="#D4AF37" strokeWidth="2" />
            <circle cx="160" cy="90" r="16" fill="#2E2E2E" />

            {/* Espiral envolvente da mecha torcida */}
            <path
              d="M160 66 C185 66 195 85 188 102 C180 118 148 118 138 104 C128 90 140 74 160 74"
              stroke="#D4AF37"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <path
              d="M160 66 C185 66 195 85 188 102 C180 118 148 118 138 104 C128 90 140 74 160 74"
              stroke="#F1E5C8"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Seta circular contínua indicando rotação */}
            <path
              d="M160 48 C200 48 215 80 205 110 C195 135 150 135 125 118"
              stroke="#D4AF37"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="4 4"
            />
            <polygon points="122,112 118,124 130,121" fill="#D4AF37" />

            {/* Badge de instrução de rotação */}
            <rect
              x="70"
              y="30"
              width="180"
              height="24"
              rx="12"
              fill="#1C1C1C"
              stroke="#D4AF37"
              strokeWidth="1"
            />
            <text x="160" y="46" fill="#F1E5C8" fontSize="11" fontWeight="bold" textAnchor="middle">
              Gire em sentido horário
            </text>

            <circle cx="160" cy="90" r="3" fill="#FFFFFF" />
            <circle cx="195" cy="80" r="2" fill="#D4AF37" />
          </svg>
        )

      case 3:
        // Coque Etapa 3: "Prenda com grampos invisíveis" - Firme as laterais por baixo do volume
        return (
          <svg
            viewBox="0 0 320 220"
            className={className}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Fixe com grampos ao redor da base"
          >
            <rect width="320" height="220" rx="16" fill="#141414" />
            <circle cx="160" cy="110" r="80" fill="#D4AF37" fillOpacity="0.05" />

            {/* Coque já estruturado e volumoso */}
            <circle cx="160" cy="100" r="42" fill="#202020" stroke="#D4AF37" strokeWidth="2.5" />
            <circle
              cx="160"
              cy="100"
              r="30"
              stroke="#F1E5C8"
              strokeWidth="2"
              strokeDasharray="5 4"
              opacity="0.8"
            />
            <circle cx="160" cy="100" r="16" fill="#181818" stroke="#D4AF37" strokeWidth="1" />

            {/* Grampos dourados sendo inseridos nas 4 posições */}
            {/* Grampo Superior Direito */}
            <g>
              <line
                x1="225"
                y1="55"
                x2="190"
                y2="80"
                stroke="#D4AF37"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <line
                x1="227"
                y1="58"
                x2="193"
                y2="82"
                stroke="#FFFFFF"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <circle cx="225" cy="55" r="3.5" fill="#F1E5C8" />
            </g>

            {/* Grampo Inferior Direito */}
            <g>
              <line
                x1="225"
                y1="145"
                x2="190"
                y2="120"
                stroke="#D4AF37"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <line
                x1="227"
                y1="142"
                x2="193"
                y2="118"
                stroke="#FFFFFF"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <circle cx="225" cy="145" r="3.5" fill="#F1E5C8" />
            </g>

            {/* Grampo Inferior Esquerdo */}
            <g>
              <line
                x1="95"
                y1="145"
                x2="130"
                y2="120"
                stroke="#D4AF37"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <line
                x1="93"
                y1="142"
                x2="127"
                y2="118"
                stroke="#FFFFFF"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <circle cx="95" cy="145" r="3.5" fill="#F1E5C8" />
            </g>

            {/* Grampo Superior Esquerdo */}
            <g>
              <line
                x1="95"
                y1="55"
                x2="130"
                y2="80"
                stroke="#D4AF37"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <line
                x1="93"
                y1="58"
                x2="127"
                y2="82"
                stroke="#FFFFFF"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <circle cx="95" cy="55" r="3.5" fill="#F1E5C8" />
            </g>

            {/* Linhas de fixação firme */}
            <circle cx="160" cy="100" r="4" fill="#D4AF37" />
            <text x="160" y="175" fill="#F1E5C8" fontSize="11" fontWeight="600" textAnchor="middle">
              Insira os grampos na base
            </text>
          </svg>
        )

      case 4:
      default:
        // Coque Etapa 4: "Finalize com spray e o Pino de Pérola" - Brilho, acabamento polido e acessório
        return (
          <svg
            viewBox="0 0 320 220"
            className={className}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Finalize com fixação e adicione o pino decorativo"
          >
            <rect width="320" height="220" rx="16" fill="#141414" />
            {/* Halo de glória e perfeição de salão */}
            <circle cx="160" cy="105" r="90" fill="#D4AF37" fillOpacity="0.1" />

            {/* Cabeça e nuca elegantes */}
            <path
              d="M125 185 C125 155 140 145 160 145 C180 145 195 155 195 185 Z"
              fill="#222222"
              stroke="#D4AF37"
              strokeWidth="1.5"
            />

            {/* Coque perfeito no alto */}
            <circle cx="160" cy="95" r="46" fill="#1A1A1A" stroke="#D4AF37" strokeWidth="2.5" />
            <circle cx="160" cy="95" r="36" fill="#252525" stroke="#F1E5C8" strokeWidth="1.5" />
            <circle cx="160" cy="95" r="22" fill="#1F1F1F" stroke="#D4AF37" strokeWidth="1" />

            {/* Fios polidos espiralados com acabamento acetinado */}
            <path
              d="M135 85 C145 70 175 70 185 85 C190 95 180 115 160 115"
              stroke="#D4AF37"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M140 105 C150 120 170 120 180 105"
              stroke="#F1E5C8"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Pino de Pérola inserido no coque com brilho */}
            <g transform="translate(145, 60)">
              {/* Haste do pino dourado */}
              <line
                x1="26"
                y1="12"
                x2="45"
                y2="40"
                stroke="#D4AF37"
                strokeWidth="3"
                strokeLinecap="round"
              />
              {/* Pérola cintilante */}
              <circle cx="22" cy="8" r="10" fill="#FFFFFF" stroke="#D4AF37" strokeWidth="2" />
              <circle cx="20" cy="6" r="3.5" fill="#F1E5C8" />
              <circle cx="19" cy="5" r="1.5" fill="#FFFFFF" />
              {/* Brilho da pérola */}
              <circle
                cx="22"
                cy="8"
                r="14"
                stroke="#F1E5C8"
                strokeWidth="0.8"
                strokeDasharray="2 3"
              />
            </g>

            {/* Efeito de spray / névoa fixadora estática suave */}
            <g opacity="0.85">
              <circle cx="85" cy="70" r="2" fill="#FFFFFF" />
              <circle cx="95" cy="85" r="1.5" fill="#F1E5C8" />
              <circle cx="90" cy="100" r="2" fill="#D4AF37" />
              <circle cx="235" cy="70" r="2" fill="#FFFFFF" />
              <circle cx="225" cy="85" r="1.5" fill="#F1E5C8" />
              <circle cx="230" cy="100" r="2" fill="#D4AF37" />
            </g>

            {/* Sparkles dourados da finalização */}
            <g transform="translate(110, 50)">
              <path
                d="M0 -7 L1.5 -1.5 L7 0 L1.5 1.5 L0 7 L-1.5 1.5 L-7 0 L-1.5 -1.5 Z"
                fill="#D4AF37"
              />
            </g>
            <g transform="translate(215, 55)">
              <path
                d="M0 -7 L1.5 -1.5 L7 0 L1.5 1.5 L0 7 L-1.5 1.5 L-7 0 L-1.5 -1.5 Z"
                fill="#F1E5C8"
              />
            </g>
            <g transform="translate(160, 160)">
              <path
                d="M0 -6 L1.2 -1.2 L6 0 L1.2 1.2 L0 6 L-1.2 1.2 L-6 0 L-1.2 -1.2 Z"
                fill="#D4AF37"
              />
            </g>
          </svg>
        )
    }
  }

  // Missão padrão: Trança simples
  switch (step) {
    case 1:
      // Etapa 1: "Separe o cabelo" — Divida o cabelo em três partes iguais
      return (
        <svg
          viewBox="0 0 320 220"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Separe o cabelo em três partes iguais"
        >
          {/* Fundo do card interno */}
          <rect width="320" height="220" rx="16" fill="#141414" />
          <circle cx="160" cy="110" r="80" fill="#D4AF37" fillOpacity="0.05" />

          {/* Topo da cabeça estilizado */}
          <path
            d="M100 40 C120 25 200 25 220 40 C220 55 100 55 100 40 Z"
            fill="#262626"
            stroke="#D4AF37"
            strokeWidth="1.5"
          />

          {/* Mecha Esquerda (1) */}
          <g>
            <path
              d="M120 48 C115 80 100 130 95 180"
              stroke="#2D2D2D"
              strokeWidth="18"
              strokeLinecap="round"
            />
            <path
              d="M120 48 C115 80 100 130 95 180"
              stroke="#D4AF37"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <circle cx="95" cy="180" r="14" fill="#1A1A1A" stroke="#D4AF37" strokeWidth="1.5" />
            <text x="95" y="185" fill="#FFFFFF" fontSize="12" fontWeight="bold" textAnchor="middle">
              1
            </text>
          </g>

          {/* Mecha do Meio (2) */}
          <g>
            <path
              d="M160 48 C160 80 160 130 160 180"
              stroke="#222222"
              strokeWidth="18"
              strokeLinecap="round"
            />
            <path
              d="M160 48 C160 80 160 130 160 180"
              stroke="#F1E5C8"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <circle cx="160" cy="180" r="14" fill="#1A1A1A" stroke="#F1E5C8" strokeWidth="1.5" />
            <text
              x="160"
              y="185"
              fill="#FFFFFF"
              fontSize="12"
              fontWeight="bold"
              textAnchor="middle"
            >
              2
            </text>
          </g>

          {/* Mecha Direita (3) */}
          <g>
            <path
              d="M200 48 C205 80 220 130 225 180"
              stroke="#2D2D2D"
              strokeWidth="18"
              strokeLinecap="round"
            />
            <path
              d="M200 48 C205 80 220 130 225 180"
              stroke="#D4AF37"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <circle cx="225" cy="180" r="14" fill="#1A1A1A" stroke="#D4AF37" strokeWidth="1.5" />
            <text
              x="225"
              y="185"
              fill="#FFFFFF"
              fontSize="12"
              fontWeight="bold"
              textAnchor="middle"
            >
              3
            </text>
          </g>

          {/* Mão / Luva estática estilizada indicando separação */}
          <path
            d="M60 100 Q90 105 105 110"
            stroke="#D4AF37"
            strokeWidth="2"
            strokeDasharray="3 3"
          />
          <path
            d="M260 100 Q230 105 215 110"
            stroke="#D4AF37"
            strokeWidth="2"
            strokeDasharray="3 3"
          />

          {/* Brilhos decorativos */}
          <circle cx="130" cy="90" r="2" fill="#D4AF37" />
          <circle cx="190" cy="90" r="2" fill="#F1E5C8" />
        </svg>
      )

    case 2:
      // Etapa 2: "Comece a trançar" — Cruze a mecha da direita sobre a do meio
      return (
        <svg
          viewBox="0 0 320 220"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Cruze a mecha da direita sobre a do meio"
        >
          <rect width="320" height="220" rx="16" fill="#141414" />
          <circle cx="160" cy="110" r="80" fill="#D4AF37" fillOpacity="0.05" />

          {/* Ponto inicial no topo */}
          <ellipse cx="160" cy="35" rx="55" ry="12" fill="#222" stroke="#444" strokeWidth="1" />

          {/* Mecha Esquerda aguardando */}
          <path
            d="M120 40 C110 80 105 130 105 185"
            stroke="#2A2A2A"
            strokeWidth="16"
            strokeLinecap="round"
          />
          <path
            d="M120 40 C110 80 105 130 105 185"
            stroke="#777777"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Mecha do meio recuando sob o cruzamento */}
          <path
            d="M160 40 C160 70 185 110 195 185"
            stroke="#1A1A1A"
            strokeWidth="16"
            strokeLinecap="round"
          />
          <path
            d="M160 40 C160 70 185 110 195 185"
            stroke="#A99260"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.8"
          />

          {/* Mecha Direita em destaque cruzando por cima para o meio */}
          <path
            d="M200 40 C210 70 150 115 150 185"
            stroke="#262626"
            strokeWidth="18"
            strokeLinecap="round"
          />
          <path
            d="M200 40 C210 70 150 115 150 185"
            stroke="#D4AF37"
            strokeWidth="5"
            strokeLinecap="round"
          />

          {/* Flecha dourada indicando movimento de cruzamento */}
          <path
            d="M225 85 C210 100 175 110 155 120"
            stroke="#F1E5C8"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="3 3"
          />
          <polygon points="152,115 146,124 156,126" fill="#F1E5C8" />

          {/* Badge "Movimento" */}
          <rect
            x="190"
            y="100"
            width="105"
            height="26"
            rx="13"
            fill="#1F1F1F"
            stroke="#D4AF37"
            strokeWidth="1"
          />
          <text x="242" y="117" fill="#D4AF37" fontSize="11" fontWeight="600" textAnchor="middle">
            Direita ➔ Meio
          </text>

          {/* Sparkles */}
          <circle cx="160" cy="100" r="2.5" fill="#FFFFFF" />
          <circle cx="180" cy="65" r="1.5" fill="#D4AF37" />
        </svg>
      )

    case 3:
      // Etapa 3: "Continue alternando" — Repita, alternando os lados até o fim
      return (
        <svg
          viewBox="0 0 320 220"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Repita alternando os lados até o fim"
        >
          <rect width="320" height="220" rx="16" fill="#141414" />
          <circle cx="160" cy="110" r="80" fill="#D4AF37" fillOpacity="0.05" />

          {/* Padrão trançado contínuo com elos alternados */}
          {/* Nível 1 */}
          <path
            d="M140 30 C155 45 175 45 190 30"
            stroke="#D4AF37"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <path
            d="M175 40 C160 55 140 55 125 40"
            stroke="#F1E5C8"
            strokeWidth="6"
            strokeLinecap="round"
          />

          {/* Nível 2 */}
          <path
            d="M135 60 C155 75 180 75 195 60"
            stroke="#D4AF37"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M185 75 C165 90 140 90 125 75"
            stroke="#B8962E"
            strokeWidth="7"
            strokeLinecap="round"
          />

          {/* Nível 3 */}
          <path
            d="M130 95 C155 110 185 110 200 95"
            stroke="#F1E5C8"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M190 115 C165 130 135 130 120 115"
            stroke="#D4AF37"
            strokeWidth="7"
            strokeLinecap="round"
          />

          {/* Nível 4 */}
          <path
            d="M135 135 C155 148 180 148 195 135"
            stroke="#D4AF37"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M185 150 C165 162 145 162 130 150"
            stroke="#F1E5C8"
            strokeWidth="7"
            strokeLinecap="round"
          />

          {/* Pontas ainda a tecer */}
          <path
            d="M140 165 C135 180 130 195 125 205"
            stroke="#D4AF37"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="3 3"
          />
          <path
            d="M160 165 C160 180 160 195 160 205"
            stroke="#F1E5C8"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="3 3"
          />
          <path
            d="M180 165 C185 180 190 195 195 205"
            stroke="#D4AF37"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="3 3"
          />

          {/* Flechas curvas duplas esquerda/direita */}
          <g>
            <path
              d="M95 105 C85 115 85 135 95 145"
              stroke="#D4AF37"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <polygon points="98,140 95,148 91,142" fill="#D4AF37" />
            <text x="82" y="128" fill="#D4AF37" fontSize="10" fontWeight="bold" textAnchor="end">
              Esq.
            </text>
          </g>

          <g>
            <path
              d="M225 105 C235 115 235 135 225 145"
              stroke="#D4AF37"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <polygon points="222,140 225,148 229,142" fill="#D4AF37" />
            <text x="238" y="128" fill="#D4AF37" fontSize="10" fontWeight="bold" textAnchor="start">
              Dir.
            </text>
          </g>

          {/* Sparkles */}
          <circle cx="160" cy="85" r="2" fill="#FFFFFF" />
          <circle cx="160" cy="142" r="2" fill="#FFFFFF" />
        </svg>
      )

    case 4:
    default:
      // Etapa 4: "Finalize" — Prenda a ponta com um elástico. Pronto!
      return (
        <svg
          viewBox="0 0 320 220"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Prenda a ponta com um elástico. Pronto!"
        >
          <rect width="320" height="220" rx="16" fill="#141414" />
          {/* Halo dourado triunfante */}
          <circle cx="160" cy="115" r="85" fill="#D4AF37" fillOpacity="0.08" />

          {/* Trança inteira finalizada */}
          <path
            d="M145 25 C155 35 170 35 180 25"
            stroke="#D4AF37"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <path
            d="M175 35 C160 45 145 45 135 35"
            stroke="#F1E5C8"
            strokeWidth="6"
            strokeLinecap="round"
          />

          <path
            d="M140 50 C155 60 175 60 185 50"
            stroke="#D4AF37"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M180 62 C165 72 145 72 135 62"
            stroke="#F1E5C8"
            strokeWidth="7"
            strokeLinecap="round"
          />

          <path
            d="M138 78 C155 88 178 88 188 78"
            stroke="#D4AF37"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M182 90 C165 100 142 100 134 90"
            stroke="#F1E5C8"
            strokeWidth="7"
            strokeLinecap="round"
          />

          <path
            d="M142 105 C155 115 175 115 184 105"
            stroke="#D4AF37"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M178 118 C165 128 145 128 138 118"
            stroke="#F1E5C8"
            strokeWidth="7"
            strokeLinecap="round"
          />

          {/* Elástico dourado premium com laço */}
          <rect
            x="144"
            y="132"
            width="32"
            height="12"
            rx="6"
            fill="#D4AF37"
            stroke="#FFFFFF"
            strokeWidth="1.2"
          />
          <line x1="152" y1="132" x2="152" y2="144" stroke="#8A6E1E" strokeWidth="1" />
          <line x1="168" y1="132" x2="168" y2="144" stroke="#8A6E1E" strokeWidth="1" />

          {/* Ponta solta final suave */}
          <path
            d="M152 144 C150 160 145 175 142 188"
            stroke="#D4AF37"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M160 144 C160 162 160 178 160 192"
            stroke="#F1E5C8"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M168 144 C170 160 175 175 178 188"
            stroke="#D4AF37"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Sparkles de celebração */}
          <g transform="translate(110, 110)">
            <path d="M0 -8 L2 -2 L8 0 L2 2 L0 8 L-2 2 L-8 0 L-2 -2 Z" fill="#D4AF37" />
          </g>
          <g transform="translate(210, 110)">
            <path d="M0 -8 L2 -2 L8 0 L2 2 L0 8 L-2 2 L-8 0 L-2 -2 Z" fill="#F1E5C8" />
          </g>
          <g transform="translate(160, 175)">
            <path
              d="M0 -6 L1.5 -1.5 L6 0 L1.5 1.5 L0 6 L-1.5 1.5 L-6 0 L-1.5 -1.5 Z"
              fill="#D4AF37"
            />
          </g>

          <circle cx="100" cy="60" r="2" fill="#D4AF37" />
          <circle cx="220" cy="60" r="2" fill="#F1E5C8" />
          <circle cx="215" cy="150" r="1.5" fill="#D4AF37" />
        </svg>
      )
  }
}
