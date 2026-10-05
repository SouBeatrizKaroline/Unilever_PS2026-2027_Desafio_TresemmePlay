import React from 'react'
import type { AvatarId, SkinToneId, HairTextureId, HairLengthId } from '@/types/game'

export interface AvatarProps {
  id?: AvatarId | string
  skinTone?: SkinToneId
  hairTexture?: HairTextureId
  hairLength?: HairLengthId
  unlockedAccessories?: string[]
  selectedAccessoryId?: string | null
  selectedAccessoriesList?: string[]
  className?: string
  size?: number | string
}

export interface HairLengthOption {
  id: HairLengthId
  name: string
  desc: string
}

export const HAIR_LENGTH_OPTIONS: HairLengthOption[] = [
  {
    id: 'careca',
    name: 'Careca',
    desc: 'Couro cabeludo exposto, liso e bem cuidado, sem fios',
  },
  {
    id: 'curto-buzz',
    name: 'Curto Rente (Buzz)',
    desc: 'Fios raspados/bem rentes acompanhando a silhueta da cabeça',
  },
  {
    id: 'curto-volume',
    name: 'Curto com Volume',
    desc: 'Corte curto clássico com volume suave no topo e laterais limpas',
  },
  {
    id: 'medio',
    name: 'Médio / Chanel',
    desc: 'Comprimento na altura dos ombros com caimento elegante',
  },
  {
    id: 'longo',
    name: 'Longo Flutuante',
    desc: 'Comprimento longo abaixo dos ombros com movimento pleno',
  },
]

export interface SkinToneOption {
  id: SkinToneId
  name: string
  hex: string
  neckHex: string
  blushHex: string
  lipHex: string
  browHex: string
}

export const SKIN_TONE_OPTIONS: SkinToneOption[] = [
  {
    id: 'clara',
    name: 'Pele Clara',
    hex: '#FCE3CE',
    neckHex: '#F4C7A3',
    blushHex: '#F5A396',
    lipHex: '#D96E66',
    browHex: '#664324',
  },
  {
    id: 'media-clara',
    name: 'Pele Morena Clara',
    hex: '#F0B58D',
    neckHex: '#E2A17B',
    blushHex: '#ECA08B',
    lipHex: '#C86A5E',
    browHex: '#332418',
  },
  {
    id: 'dourada',
    name: 'Pele Dourada / Amêndoa',
    hex: '#D99863',
    neckHex: '#C6824D',
    blushHex: '#B96347',
    lipHex: '#A84C3F',
    browHex: '#2E190C',
  },
  {
    id: 'bronze',
    name: 'Pele Bronzeada',
    hex: '#B77248',
    neckHex: '#9E5D38',
    blushHex: '#91432A',
    lipHex: '#873528',
    browHex: '#251206',
  },
  {
    id: 'escura',
    name: 'Pele Negra Escura',
    hex: '#7D4726',
    neckHex: '#6A3B1F',
    blushHex: '#612D19',
    lipHex: '#5E2319',
    browHex: '#1A0D07',
  },
  {
    id: 'retinta',
    name: 'Pele Negra Retinta',
    hex: '#4A2B19',
    neckHex: '#381F10',
    blushHex: '#381C0E',
    lipHex: '#3B1713',
    browHex: '#120803',
  },
]

export interface HairTextureOption {
  id: HairTextureId
  name: string
  desc: string
}

export const HAIR_TEXTURE_OPTIONS: HairTextureOption[] = [
  {
    id: 'liso',
    name: 'Cabelo Liso',
    desc: 'Fios alinhados, fluidos e com reflexo espelhado',
  },
  {
    id: 'ondulado',
    name: 'Cabelo Ondulado',
    desc: 'Curvatura natural em ondas com movimento e leveza',
  },
  {
    id: 'cacheado',
    name: 'Cabelo Cacheado',
    desc: 'Cachos bem definidos, volumosos e cheios de vida',
  },
  {
    id: 'crespo',
    name: 'Cabelo Crespo',
    desc: 'Estrutura afro majestosa, volumosa e coroada',
  },
]

export const AVATAR_OPTIONS: {
  id: AvatarId
  label: string
  desc: string
  defaultSkinTone: SkinToneId
  defaultTexture: HairTextureId
}[] = [
  {
    id: 'avatar-1',
    label: 'Preto Iluminado',
    desc: 'Preto intenso com reflexos luminosos de salão',
    defaultSkinTone: 'media-clara',
    defaultTexture: 'liso',
  },
  {
    id: 'avatar-2',
    label: 'Castanho Quente',
    desc: 'Castanho aveludado profundo com nuance caramelo',
    defaultSkinTone: 'bronze',
    defaultTexture: 'cacheado',
  },
  {
    id: 'avatar-3',
    label: 'Loiro Dourado',
    desc: 'Loiro solar radiante com reflexos luminosos',
    defaultSkinTone: 'clara',
    defaultTexture: 'ondulado',
  },
  {
    id: 'avatar-4',
    label: 'Preto Ébano Profundo',
    desc: 'Preto ébano majestoso com brilho nobre',
    defaultSkinTone: 'retinta',
    defaultTexture: 'crespo',
  },
  {
    id: 'avatar-5',
    label: 'Ruivo Cobre Radiante',
    desc: 'Acobreado intenso e vibrante com reflexos quentes',
    defaultSkinTone: 'clara',
    defaultTexture: 'ondulado',
  },
  {
    id: 'avatar-6',
    label: 'Tingido Fantasia',
    desc: 'Base ametista profunda com nuances magenta e mechas fúcsia',
    defaultSkinTone: 'dourada',
    defaultTexture: 'cacheado',
  },
]

export function getSkinToneColors(skinId?: SkinToneId): SkinToneOption {
  return SKIN_TONE_OPTIONS.find((s) => s.id === skinId) || SKIN_TONE_OPTIONS[1] // fallback media-clara
}

export const AvatarSvg: React.FC<AvatarProps> = ({
  id = 'avatar-1',
  skinTone,
  hairTexture,
  hairLength = 'longo',
  unlockedAccessories = [],
  selectedAccessoryId,
  selectedAccessoriesList,
  className = 'w-12 h-12',
  size,
}) => {
  const style = size ? { width: size, height: size } : undefined

  // Fallbacks coerentes com o avatar se skinTone ou hairTexture não foram explicitados
  const avatarMeta = AVATAR_OPTIONS.find((a) => a.id === id) || AVATAR_OPTIONS[0]
  const effectiveSkinTone = skinTone || avatarMeta.defaultSkinTone
  const effectiveTexture = hairTexture || avatarMeta.defaultTexture
  const effectiveLength: HairLengthId = hairLength || 'longo'
  const skin = getSkinToneColors(effectiveSkinTone)

  // Cores de base da paleta capilar de acordo com o Avatar escolhido (cor do cabelo)
  const hairPalette = React.useMemo(() => {
    switch (id) {
      case 'avatar-2': // Castanho quente
        return {
          bg: '#2B170B',
          mid: '#3D2314',
          highlight: '#5E341B',
          streak: '#734124',
        }
      case 'avatar-3': // Loiro dourado
        return {
          bg: '#C59A3E',
          mid: '#DDB258',
          highlight: '#F5D77F',
          streak: '#FFF4D0',
        }
      case 'avatar-4': // Ébano profundo
        return {
          bg: '#0E0E0E',
          mid: '#1A1A1A',
          highlight: '#2C2C2C',
          streak: '#383838',
        }
      case 'avatar-5': // Ruivo Cobre Radiante
        return {
          bg: '#5A1E0B',
          mid: '#8B3114',
          highlight: '#BD4B1C',
          streak: '#E26D34',
        }
      case 'avatar-6': // Tingido Fantasia (ametista / magenta / fúcsia)
        return {
          bg: '#2E1038',
          mid: '#6A1E6D',
          highlight: '#B82E8A',
          streak: '#E056B3',
        }
      case 'avatar-1':
      default: // Preto iluminado suave
        return {
          bg: '#121212',
          mid: '#1C1A17',
          highlight: '#2A241E',
          streak: '#3A332B',
        }
    }
  }, [id])

  // Acessórios ativos
  let activeAccessories: string[] = []
  if (selectedAccessoriesList && selectedAccessoriesList.length > 0) {
    activeAccessories = selectedAccessoriesList.filter((acc) => unlockedAccessories.includes(acc))
  } else if (selectedAccessoryId !== undefined) {
    activeAccessories =
      selectedAccessoryId && unlockedAccessories.includes(selectedAccessoryId)
        ? [selectedAccessoryId]
        : []
  } else {
    activeAccessories = []
  }

  // Filtragem graciosa de acessórios dependendo do comprimento:
  // - Para 'careca': acessórios que dependem de prender fios longos (scrunchie, laço, fita, grampos de mecha)
  //   são omitidos graciosamente, enquanto brincos, colares, tiaras, coroas, faixas e broches reluzem perfeitamente.
  // - Para 'curto-buzz': idem, scrunchie e laço não se aplicam e não poluem a cabeça.
  const isBald = effectiveLength === 'careca'
  const isShortBuzz = effectiveLength === 'curto-buzz'

  const hasHairpin = !isBald && activeAccessories.includes('hairpin-gold')
  const hasPearlPin = !isBald && activeAccessories.includes('pearl-pin-gold')
  const hasTiaraWaves =
    activeAccessories.includes('tiara-waves-gold') || activeAccessories.includes('tiara-pearl')
  const hasScarf = activeAccessories.includes('scarf-gold')
  const hasMoonEarrings = activeAccessories.includes('moon-earrings-gold')
  const hasScrunchie = !isBald && !isShortBuzz && activeAccessories.includes('scrunchie-gold')
  const hasSunClip = !isBald && activeAccessories.includes('sun-clip-gold')
  const hasSpaBand = activeAccessories.includes('spa-band-gold')
  const hasStarClip = !isBald && activeAccessories.includes('star-clip-gold')
  const hasGoldBow = !isBald && !isShortBuzz && activeAccessories.includes('gold-bow')
  const hasCrystalCrown = activeAccessories.includes('crystal-crown')
  const hasGoldenRibbon = !isBald && !isShortBuzz && activeAccessories.includes('golden-ribbon')
  const hasHarmonyGlow = activeAccessories.includes('harmony-glow')
  const hasRitualStar = activeAccessories.includes('ritual-star')
  const hasShellNecklace = activeAccessories.includes('colar-conchas-gold')
  const hasTiara90 = activeAccessories.includes('tiara-comemorativa-90')
  const hasCrown365 = activeAccessories.includes('coroa-jornada-365')
  const hasConstellationBrooch = activeAccessories.includes('broche-constelacao-ouro')
  const hasLetterBrooch = activeAccessories.includes('broche-cartas-ouro')

  const commonSvgProps = {
    viewBox: '0 0 100 100',
    className: `shrink-0 block aspect-square ${className}`,
    style,
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
    preserveAspectRatio: 'xMidYMid meet',
  }

  // Renderizador de textura de fundo do cabelo dependendo do comprimento e textura
  const renderHairBack = () => {
    // 1. Careca: não há cabelo de fundo, o couro cabeludo já tem sua cúpula e brilho no rosto
    if (effectiveLength === 'careca') {
      return (
        <g id="hair-back-careca">
          {/* Sombreamento sutil do contorno do couro cabeludo */}
          <ellipse cx="50" cy="46" rx="20" ry="22" fill={skin.neckHex} opacity="0.4" />
        </g>
      )
    }

    // 2. Curto Rente (Buzz cut): sombra rente contornando o couro cabeludo
    if (effectiveLength === 'curto-buzz') {
      return (
        <g id="hair-back-buzz">
          <ellipse cx="50" cy="46" rx="20.5" ry="23" fill={hairPalette.bg} opacity="0.95" />
          <ellipse cx="50" cy="44" rx="19.5" ry="21.5" fill={hairPalette.mid} opacity="0.85" />
        </g>
      )
    }

    // 3. Curto com Volume: topete / topo modelado sem comprimento nas costas
    if (effectiveLength === 'curto-volume') {
      if (effectiveTexture === 'crespo') {
        return (
          <g id="hair-back-curto-crespo">
            <ellipse cx="50" cy="34" rx="19" ry="14" fill={hairPalette.bg} />
            <circle cx="38" cy="33" r="10" fill={hairPalette.mid} />
            <circle cx="62" cy="33" r="10" fill={hairPalette.mid} />
            <circle cx="50" cy="27" r="9" fill={hairPalette.highlight} />
          </g>
        )
      } else if (effectiveTexture === 'cacheado') {
        return (
          <g id="hair-back-curto-cacheado">
            <ellipse cx="50" cy="34" rx="19" ry="14" fill={hairPalette.bg} />
            <circle cx="36" cy="33" r="8" fill={hairPalette.mid} />
            <circle cx="64" cy="33" r="8" fill={hairPalette.mid} />
            <circle cx="50" cy="28" r="8" fill={hairPalette.highlight} />
          </g>
        )
      } else if (effectiveTexture === 'ondulado') {
        return (
          <g id="hair-back-curto-ondulado">
            <path
              d="M30 40 C30 25 40 20 50 20 C60 20 70 25 70 40 C65 32 55 30 50 31 C45 30 35 32 30 40 Z"
              fill={hairPalette.bg}
            />
            <ellipse cx="50" cy="30" rx="17" ry="10" fill={hairPalette.mid} />
          </g>
        )
      } else {
        // Liso curto com volume
        return (
          <g id="hair-back-curto-liso">
            <path
              d="M30 40 C30 25 40 20 50 20 C60 20 70 25 70 40 C65 32 55 30 50 31 C45 30 35 32 30 40 Z"
              fill={hairPalette.bg}
            />
            <ellipse cx="50" cy="30" rx="17" ry="10" fill={hairPalette.mid} />
          </g>
        )
      }
    }

    // 4. Médio / Chanel (corta na altura dos ombros, cerca de y=70)
    if (effectiveLength === 'medio') {
      switch (effectiveTexture) {
        case 'crespo':
          return (
            <g id="hair-back-medio-crespo">
              <circle cx="50" cy="38" r="26" fill={hairPalette.bg} />
              <circle cx="32" cy="40" r="16" fill={hairPalette.mid} />
              <circle cx="68" cy="40" r="16" fill={hairPalette.mid} />
              <circle cx="50" cy="24" r="15" fill={hairPalette.highlight} />
              <circle cx="28" cy="54" r="11" fill={hairPalette.bg} />
              <circle cx="72" cy="54" r="11" fill={hairPalette.bg} />
            </g>
          )
        case 'cacheado':
          return (
            <g id="hair-back-medio-cacheado">
              <circle cx="32" cy="38" r="14" fill={hairPalette.bg} />
              <circle cx="68" cy="38" r="14" fill={hairPalette.bg} />
              <circle cx="26" cy="54" r="12" fill={hairPalette.mid} />
              <circle cx="74" cy="54" r="12" fill={hairPalette.mid} />
              <circle cx="50" cy="24" r="14" fill={hairPalette.highlight} />
            </g>
          )
        case 'ondulado':
          return (
            <g id="hair-back-medio-ondulado">
              <path
                d="M23 42 C20 58 24 68 30 72 C38 74 62 74 70 72 C76 68 80 58 77 42 C77 22 66 16 50 16 C34 16 23 22 23 42 Z"
                fill={hairPalette.bg}
              />
              <path
                d="M24 48 Q28 56 26 66"
                stroke={hairPalette.mid}
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M76 48 Q72 56 74 66"
                stroke={hairPalette.mid}
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />
            </g>
          )
        case 'liso':
        default:
          return (
            <g id="hair-back-medio-liso">
              <path
                d="M24 45 C24 25 35 16 50 16 C65 16 76 25 76 45 C76 60 72 68 68 72 C60 74 40 74 32 72 C28 68 24 60 24 45 Z"
                fill={hairPalette.bg}
              />
              <path
                d="M28 45 C28 58 30 66 33 70"
                stroke={hairPalette.mid}
                strokeWidth="3"
                fill="none"
              />
              <path
                d="M72 45 C72 58 70 66 67 70"
                stroke={hairPalette.mid}
                strokeWidth="3"
                fill="none"
              />
            </g>
          )
      }
    }

    // 5. Longo (padrão original que desce até o ombro/peito)
    switch (effectiveTexture) {
      case 'crespo':
        return (
          <g id="hair-back-crespo">
            <circle cx="50" cy="40" r="32" fill={hairPalette.bg} />
            <circle cx="30" cy="38" r="21" fill={hairPalette.mid} />
            <circle cx="70" cy="38" r="21" fill={hairPalette.mid} />
            <circle cx="50" cy="22" r="19" fill={hairPalette.highlight} />
            <circle cx="24" cy="52" r="14" fill={hairPalette.bg} />
            <circle cx="76" cy="52" r="14" fill={hairPalette.bg} />
          </g>
        )
      case 'cacheado':
        return (
          <g id="hair-back-cacheado">
            <circle cx="30" cy="35" r="16" fill={hairPalette.bg} />
            <circle cx="70" cy="35" r="16" fill={hairPalette.bg} />
            <circle cx="23" cy="52" r="15" fill={hairPalette.mid} />
            <circle cx="77" cy="52" r="15" fill={hairPalette.mid} />
            <circle cx="32" cy="68" r="14" fill={hairPalette.bg} />
            <circle cx="68" cy="68" r="14" fill={hairPalette.bg} />
            <circle cx="50" cy="24" r="16" fill={hairPalette.highlight} />
          </g>
        )
      case 'ondulado':
        return (
          <g id="hair-back-ondulado">
            <path
              d="M20 42 C18 65 24 82 28 92 C38 95 62 95 72 92 C76 82 82 65 80 42 C80 20 66 14 50 14 C34 14 20 20 20 42 Z"
              fill={hairPalette.bg}
            />
            {/* Ondulações de fundo */}
            <path
              d="M20 48 Q26 58 22 70 Q28 82 26 90"
              stroke={hairPalette.mid}
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M80 48 Q74 58 78 70 Q72 82 74 90"
              stroke={hairPalette.mid}
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
          </g>
        )
      case 'liso':
      default:
        return (
          <g id="hair-back-liso">
            <path
              d="M22 45 C22 25 35 15 50 15 C65 15 78 25 78 45 C78 72 74 85 70 92 C60 95 40 95 30 92 C26 85 22 72 22 45 Z"
              fill={hairPalette.bg}
            />
            <path
              d="M28 45 C28 65 30 78 33 88"
              stroke={hairPalette.mid}
              strokeWidth="3"
              fill="none"
            />
            <path
              d="M72 45 C72 65 70 78 67 88"
              stroke={hairPalette.mid}
              strokeWidth="3"
              fill="none"
            />
          </g>
        )
    }
  }

  // Renderizador de textura frontal do cabelo (sobre a testa/rosto)
  const renderHairFront = () => {
    // 1. Careca: acabamento suave e iluminado do couro cabeludo
    if (effectiveLength === 'careca') {
      return (
        <g id="hair-front-careca">
          {/* Brilho natural e reflexo sedoso no topo da cabeça */}
          <ellipse cx="50" cy="36" rx="9" ry="4" fill="#FFFFFF" opacity="0.18" />
          <ellipse cx="50" cy="35" rx="5" ry="2" fill="#FFFFFF" opacity="0.25" />
          {/* Sombreamento sutil superior respeitando o tom da pele */}
          <path
            d="M33 46 C35 34 42 32 50 32 C58 32 65 34 67 46"
            stroke={skin.neckHex}
            strokeWidth="0.8"
            strokeLinecap="round"
            fill="none"
            opacity="0.6"
          />
        </g>
      )
    }

    // 2. Curto Rente (Buzz cut): micro-textura pontilhada e contorno rente
    if (effectiveLength === 'curto-buzz') {
      return (
        <g id="hair-front-buzz">
          {/* Contorno superior rente */}
          <path
            d="M33 46 C34 33 41 30 50 30 C59 30 66 33 67 46 C64 41 58 38 50 38 C42 38 36 41 33 46 Z"
            fill={hairPalette.bg}
            opacity="0.9"
          />
          {/* Mecha rente / textura suave */}
          <path
            d="M36 38 C42 33 58 33 64 38"
            stroke={hairPalette.highlight}
            strokeWidth="1.2"
            strokeDasharray="2 2"
            fill="none"
            opacity="0.8"
          />
          <circle cx="50" cy="33" r="1.2" fill={hairPalette.streak} opacity="0.6" />
        </g>
      )
    }

    // 3. Curto com Volume: topo e laterais curtas elegantes
    if (effectiveLength === 'curto-volume') {
      if (effectiveTexture === 'crespo') {
        return (
          <g id="hair-front-curto-crespo">
            <circle cx="38" cy="31" r="8.5" fill={hairPalette.mid} />
            <circle cx="62" cy="31" r="8.5" fill={hairPalette.mid} />
            <circle cx="50" cy="27" r="8" fill={hairPalette.highlight} />
            <circle cx="31" cy="35" r="4" fill={hairPalette.bg} />
            <circle cx="69" cy="35" r="4" fill={hairPalette.bg} />
            <path
              d="M37 26 C43 23 57 23 63 26"
              stroke={hairPalette.highlight}
              strokeWidth="1"
              strokeDasharray="2 3"
              fill="none"
              opacity="0.85"
            />
          </g>
        )
      } else if (effectiveTexture === 'cacheado') {
        return (
          <g id="hair-front-curto-cacheado">
            <circle cx="38" cy="32" r="7" fill={hairPalette.mid} />
            <circle cx="62" cy="32" r="7" fill={hairPalette.mid} />
            <circle cx="50" cy="28" r="6.5" fill={hairPalette.highlight} />
            <path
              d="M32 35 C36 33 37 38 41 36"
              stroke={hairPalette.highlight}
              strokeWidth="1.3"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M68 35 C64 33 63 38 59 36"
              stroke={hairPalette.highlight}
              strokeWidth="1.3"
              strokeLinecap="round"
              fill="none"
            />
          </g>
        )
      } else if (effectiveTexture === 'ondulado') {
        return (
          <g id="hair-front-curto-ondulado">
            <path
              d="M32 40 C32 25 40 21 50 21 C60 21 68 25 68 40 C63 34 56 32 50 33 C44 32 37 34 32 40 Z"
              fill={hairPalette.mid}
            />
            <path
              d="M44 24 Q52 25 60 30"
              stroke={hairPalette.streak}
              strokeWidth="1.2"
              strokeLinecap="round"
              fill="none"
              opacity="0.85"
            />
          </g>
        )
      } else {
        // Liso curto volume
        return (
          <g id="hair-front-curto-liso">
            <path
              d="M32 40 C32 24 40 20 50 20 C62 20 68 25 68 40 C63 33 55 31 46 34 C40 36 36 38 32 40 Z"
              fill={hairPalette.mid}
            />
            <path
              d="M46 23 Q56 25 62 31"
              stroke={hairPalette.streak}
              strokeWidth="1.2"
              strokeLinecap="round"
              fill="none"
              opacity="0.85"
            />
          </g>
        )
      }
    }

    // 4. Médio / Chanel
    if (effectiveLength === 'medio') {
      switch (effectiveTexture) {
        case 'crespo':
          return (
            <g id="hair-front-medio-crespo">
              <circle cx="38" cy="34" r="8.5" fill={hairPalette.mid} />
              <circle cx="62" cy="34" r="8.5" fill={hairPalette.mid} />
              <circle cx="50" cy="31" r="7.5" fill={hairPalette.highlight} />
              <circle cx="28" cy="38" r="3" fill={hairPalette.mid} />
              <circle cx="72" cy="38" r="3" fill={hairPalette.mid} />
              <path
                d="M26 44 C28 54 29 64 32 70"
                stroke={hairPalette.mid}
                strokeWidth="3.5"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M74 44 C72 54 71 64 68 70"
                stroke={hairPalette.mid}
                strokeWidth="3.5"
                fill="none"
                strokeLinecap="round"
              />
            </g>
          )
        case 'cacheado':
          return (
            <g id="hair-front-medio-cacheado">
              <circle cx="38" cy="35" r="7" fill={hairPalette.mid} />
              <circle cx="62" cy="35" r="7" fill={hairPalette.mid} />
              <circle cx="50" cy="32" r="6" fill={hairPalette.highlight} />
              <path
                d="M28 44 C27 54 30 64 32 70"
                stroke={hairPalette.highlight}
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M72 44 C73 54 70 64 68 70"
                stroke={hairPalette.highlight}
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
            </g>
          )
        case 'ondulado':
          return (
            <g id="hair-front-medio-ondulado">
              <path
                d="M28 40 C30 25 38 18 50 18 C62 18 70 25 72 40 C66 33 58 32 50 34 C42 32 34 33 28 40 Z"
                fill={hairPalette.mid}
              />
              <path
                d="M27 44 C29 55 28 64 31 70"
                stroke={hairPalette.highlight}
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M73 44 C71 55 72 64 69 70"
                stroke={hairPalette.highlight}
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
            </g>
          )
        case 'liso':
        default:
          return (
            <g id="hair-front-medio-liso">
              <path
                d="M30 42 C30 22 40 18 50 18 C64 18 70 24 70 38 C65 30 54 28 44 32 C38 35 34 38 30 42 Z"
                fill={hairPalette.mid}
              />
              <path
                d="M30 40 C31 52 32 62 34 70"
                stroke={hairPalette.highlight}
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M70 40 C69 52 68 62 66 70"
                stroke={hairPalette.highlight}
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
            </g>
          )
      }
    }

    // 5. Longo Flutuante (padrão)
    switch (effectiveTexture) {
      case 'crespo':
        return (
          <g id="hair-front-crespo">
            {/* Contornos frontais arredondados e coroa afro pura na cor do cabelo */}
            <circle cx="38" cy="34" r="9" fill={hairPalette.mid} />
            <circle cx="62" cy="34" r="9" fill={hairPalette.mid} />
            <circle cx="50" cy="31" r="8" fill={hairPalette.highlight} />
            {/* Textura natural de curvatura sem peças douradas */}
            <circle cx="28" cy="36" r="3" fill={hairPalette.mid} />
            <circle cx="72" cy="36" r="3" fill={hairPalette.mid} />
            <path
              d="M36 26 C43 23 57 23 64 26"
              stroke={hairPalette.highlight}
              strokeWidth="1"
              strokeDasharray="2 3"
              fill="none"
              opacity="0.8"
            />
          </g>
        )
      case 'cacheado':
        return (
          <g id="hair-front-cacheado">
            {/* Cachos frontais estilizados sem detalhes dourados fixos */}
            <circle cx="38" cy="35" r="7.5" fill={hairPalette.mid} />
            <circle cx="62" cy="35" r="7.5" fill={hairPalette.mid} />
            <circle cx="50" cy="32" r="6.5" fill={hairPalette.highlight} />
            {/* Ondas e curvaturas frontais naturais nos tons do próprio cabelo */}
            <path
              d="M28 36 C32 34 32 40 36 38"
              stroke={hairPalette.highlight}
              strokeWidth="1.4"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M72 48 C68 46 68 52 64 50"
              stroke={hairPalette.highlight}
              strokeWidth="1.4"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M48 24 C52 22 54 26 56 24"
              stroke={hairPalette.streak}
              strokeWidth="1"
              strokeLinecap="round"
              fill="none"
              opacity="0.75"
            />
          </g>
        )
      case 'ondulado':
        return (
          <g id="hair-front-ondulado">
            <path
              d="M26 40 C28 25 38 18 50 18 C62 18 72 25 74 40 C68 32 58 32 50 34 C42 32 32 32 26 40 Z"
              fill={hairPalette.mid}
            />
            <path d="M25 45 C30 60 28 75 32 86 C28 76 25 62 25 45 Z" fill={hairPalette.highlight} />
            <path d="M75 45 C70 60 72 75 68 86 C72 76 75 62 75 45 Z" fill={hairPalette.highlight} />
            {/* Mecha natural sem pino dourado fixo */}
            <path
              d="M48 20 C54 22 62 28 66 36"
              stroke={hairPalette.streak}
              strokeWidth="1.2"
              strokeLinecap="round"
              fill="none"
              opacity="0.85"
            />
          </g>
        )
      case 'liso':
      default:
        return (
          <g id="hair-front-liso">
            <path
              d="M30 42 C30 22 40 18 50 18 C64 18 70 24 70 38 C65 30 54 28 44 32 C38 35 34 38 30 42 Z"
              fill={hairPalette.mid}
            />
            <path d="M30 40 C32 55 33 68 36 78 C33 70 31 56 30 40 Z" fill={hairPalette.highlight} />
            <path d="M70 40 C68 55 67 68 64 78 C67 70 69 56 70 40 Z" fill={hairPalette.highlight} />
            {/* Alinhamento dos fios no tom natural da mecha */}
            <path
              d="M48 22 Q58 24 64 30"
              stroke={hairPalette.streak}
              strokeWidth="1.2"
              strokeLinecap="round"
              fill="none"
              opacity="0.85"
            />
          </g>
        )
    }
  }

  // Acessórios sobrepostos com posições adaptadas
  const renderAccessories = () => (
    <g id="avatar-accessories">
      {/* 1. Prenda de Cabelo Dourada */}
      {hasHairpin && (
        <g id="acc-hairpin" transform="translate(66, 35) rotate(-15)">
          <line
            x1="0"
            y1="0"
            x2="6"
            y2="14"
            stroke="#D4AF37"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <line
            x1="-1.5"
            y1="2"
            x2="4.5"
            y2="16"
            stroke="#8A6E1E"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="0" cy="0" r="4" fill="#242424" stroke="#D4AF37" strokeWidth="1" />
          <circle cx="0" cy="0" r="2" fill="#F1E5C8" />
          <circle cx="0" cy="0" r="1" fill="#FFFFFF" />
        </g>
      )}

      {/* 2. Pino de Pérola */}
      {hasPearlPin && (
        <g id="acc-pearlpin" transform="translate(29, 22) rotate(24)">
          <line
            x1="0"
            y1="0"
            x2="3"
            y2="14"
            stroke="#D4AF37"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="0" cy="0" r="4.5" fill="#FFFFFF" stroke="#D4AF37" strokeWidth="1.4" />
          <circle cx="-1" cy="-1" r="1.5" fill="#FFFFFF" />
          <circle cx="1" cy="1" r="1" fill="#F1E5C8" />
        </g>
      )}

      {/* 3. Tiara de Ondas Dourada */}
      {hasTiaraWaves && (
        <g id="acc-tiarawaves">
          <path
            d="M32 27 C38 18 62 18 68 27"
            stroke="#D4AF37"
            strokeWidth="2.3"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M35 25 Q42 17 50 17 Q58 17 65 25"
            stroke="#F1E5C8"
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="50" cy="16" r="2.2" fill="#FFFFFF" stroke="#D4AF37" strokeWidth="1" />
          <circle cx="43" cy="19" r="1.5" fill="#F1E5C8" />
          <circle cx="57" cy="19" r="1.5" fill="#F1E5C8" />
        </g>
      )}

      {/* 4. Lenço de Cetim Dourado */}
      {hasScarf && (
        <g id="acc-scarf">
          <path
            d="M25 32 C30 15 70 15 75 32 C68 26 58 25 50 25 C42 25 32 26 25 32 Z"
            fill="#D4AF37"
            stroke="#F1E5C8"
            strokeWidth="1.1"
          />
          <path d="M29 28 Q50 21 71 28" stroke="#8A6E1E" strokeWidth="1.2" fill="none" />
          <circle cx="50" cy="23" r="3" fill="#F1E5C8" stroke="#8A6E1E" strokeWidth="1" />
          <path d="M49 25 L46 32 L50 29 L54 32 Z" fill="#D4AF37" />
        </g>
      )}

      {/* 5. Brincos de Meia-Lua Dourados */}
      {hasMoonEarrings && (
        <g id="acc-moon">
          <g transform="translate(68, 55)">
            <path
              d="M1 0 C4 2 4 6 1 8 C2 7 2 3 0 2 Z"
              fill="#D4AF37"
              stroke="#F1E5C8"
              strokeWidth="0.8"
            />
            <circle cx="2" cy="4" r="0.8" fill="#FFFFFF" />
          </g>
          <g transform="translate(30, 55)">
            <path
              d="M0 0 C-3 2 -3 6 0 8 C-1 7 -1 3 1 2 Z"
              fill="#D4AF37"
              stroke="#F1E5C8"
              strokeWidth="0.8"
            />
            <circle cx="-1" cy="4" r="0.8" fill="#FFFFFF" />
          </g>
        </g>
      )}

      {/* 6. Scrunchie Dourado */}
      {hasScrunchie && (
        <g id="acc-scrunchie" transform="translate(35, 78)">
          <ellipse cx="0" cy="0" rx="6" ry="3.5" fill="#D4AF37" stroke="#F1E5C8" strokeWidth="1" />
          <circle cx="0" cy="0" r="1.5" fill="#FFFFFF" />
        </g>
      )}

      {/* 7. Presilha Dourada do Amanhecer */}
      {hasSunClip && (
        <g id="acc-sunclip" transform="translate(32, 38) rotate(15)">
          <line
            x1="-5"
            y1="0"
            x2="8"
            y2="0"
            stroke="#8A6E1E"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <circle cx="1" cy="0" r="3.2" fill="#242424" stroke="#D4AF37" strokeWidth="1" />
          <circle cx="1" cy="0" r="1.5" fill="#D4AF37" />
          <circle cx="1" cy="0" r="0.7" fill="#FFFFFF" />
          <path
            d="M1 -5 L1 -4 M1 4 L1 5 M-3 0 L-2 0 M4 0 L5 0"
            stroke="#F1E5C8"
            strokeWidth="0.8"
          />
        </g>
      )}

      {/* 8. Faixa Spa Dourada */}
      {hasSpaBand && (
        <g id="acc-spaband">
          <path
            d="M26 35 C31 16 69 16 74 35"
            stroke="#D4AF37"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M26 35 C31 16 69 16 74 35"
            stroke="#1B1711"
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
          />
          <rect x="47" y="16.5" width="6" height="5" rx="1.5" fill="#D4AF37" />
          <circle cx="50" cy="19" r="1" fill="#FFFFFF" />
        </g>
      )}

      {/* 9. Prendedor de Estrela Dourada */}
      {hasStarClip && (
        <g id="acc-starclip" transform="translate(67, 32)">
          <polygon
            points="0,-6 1.8,-1.8 6.5,-1.8 2.8,1.2 4.2,5.8 0,3 -4.2,5.8 -2.8,1.2 -6.5,-1.8 -1.8,-1.8"
            fill="#D4AF37"
            stroke="#FFFFFF"
            strokeWidth="0.8"
          />
          <circle cx="0" cy="0" r="1.2" fill="#FFFFFF" />
        </g>
      )}

      {/* 10. Laço Dourado de Cetim */}
      {hasGoldBow && (
        <g id="acc-goldbow" transform="translate(34, 76)">
          <ellipse
            cx="-4"
            cy="0"
            rx="4.5"
            ry="3"
            fill="#D4AF37"
            stroke="#F1E5C8"
            strokeWidth="0.8"
          />
          <ellipse
            cx="4"
            cy="0"
            rx="4.5"
            ry="3"
            fill="#D4AF37"
            stroke="#F1E5C8"
            strokeWidth="0.8"
          />
          <circle cx="0" cy="0" r="2" fill="#201C14" stroke="#D4AF37" strokeWidth="1" />
          <path
            d="M-1 2 L-3 8 M1 2 L3 8"
            stroke="#D4AF37"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </g>
      )}

      {/* 11. Coroa de Cristais Dourados */}
      {hasCrystalCrown && (
        <g id="acc-crystalcrown">
          <path
            d="M35 22 L39 14 L44 20 L50 12 L56 20 L61 14 L65 22"
            stroke="#D4AF37"
            strokeWidth="1.6"
            fill="none"
            strokeLinejoin="round"
          />
          <circle cx="50" cy="12" r="1.8" fill="#FFFFFF" stroke="#D4AF37" strokeWidth="0.8" />
          <circle cx="39" cy="14" r="1.3" fill="#FFFFFF" />
          <circle cx="61" cy="14" r="1.3" fill="#FFFFFF" />
        </g>
      )}

      {/* 12. Fita Dourada Entrelaçada */}
      {hasGoldenRibbon && (
        <g id="acc-goldenribbon">
          <path
            d="M31 40 Q39 50 33 62 Q39 74 35 84"
            stroke="#D4AF37"
            strokeWidth="2"
            fill="none"
            strokeDasharray="3 1"
            strokeLinecap="round"
          />
        </g>
      )}

      {/* 13. Brilho de Harmonia (Especial Ritual Perfeito: broche de luz dourada lapidada na lateral superior) */}
      {hasHarmonyGlow && (
        <g id="acc-harmonyglow" transform="translate(68, 25)">
          <circle cx="0" cy="0" r="5.5" fill="#241E12" stroke="#D4AF37" strokeWidth="1" />
          <circle
            cx="0"
            cy="0"
            r="4"
            stroke="#F1E5C8"
            strokeWidth="0.6"
            strokeDasharray="1.5 1.5"
          />
          <line
            x1="-6.5"
            y1="0"
            x2="6.5"
            y2="0"
            stroke="#F1E5C8"
            strokeWidth="0.8"
            strokeLinecap="round"
          />
          <line
            x1="0"
            y1="-6.5"
            x2="0"
            y2="6.5"
            stroke="#F1E5C8"
            strokeWidth="0.8"
            strokeLinecap="round"
          />
          <circle cx="0" cy="0" r="1.8" fill="#FFFFFF" stroke="#D4AF37" strokeWidth="0.6" />
          <circle cx="-0.4" cy="-0.4" r="0.6" fill="#FFFFFF" />
          <circle cx="-4" cy="-4" r="0.7" fill="#F1E5C8" />
          <circle cx="4" cy="-4" r="0.7" fill="#F1E5C8" />
        </g>
      )}

      {/* 14. Estrela do Ritual (Especial Ritual Perfeito: estrela de 8 pontas no alto da fronte/lateral) */}
      {hasRitualStar && (
        <g id="acc-ritualstar" transform="translate(32, 23)">
          {/* Estrela de 8 pontas em miniatura */}
          <polygon
            points="0,-6.5 1.8,-1.8 6.5,0 1.8,1.8 0,6.5 -1.8,1.8 -6.5,0 -1.8,-1.8"
            fill="#D4AF37"
            stroke="#F1E5C8"
            strokeWidth="0.6"
          />
          <polygon
            points="0,-4.5 1.2,-1.2 4.5,0 1.2,1.2 0,4.5 -1.2,1.2 -4.5,0 -1.2,-1.2"
            fill="#2A2210"
            stroke="#D4AF37"
            strokeWidth="0.5"
            transform="rotate(45)"
          />
          <circle cx="0" cy="0" r="1.4" fill="#FFFFFF" />
          <circle cx="0" cy="0" r="0.8" fill="#F1E5C8" />
        </g>
      )}

      {/* 15. Colar de Conchas Dourado (Exclusivo Streak 4 semanas de Spa) */}
      {hasShellNecklace && (
        <g id="acc-shellnecklace">
          {/* Corrente curva de ouro ao redor do pescoço / colo */}
          <path
            d="M37 72 C41 84 59 84 63 72"
            stroke="#D4AF37"
            strokeWidth="1.6"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M39 73 C43 82 57 82 61 73"
            stroke="#F1E5C8"
            strokeWidth="0.8"
            strokeDasharray="1.5 1.5"
            fill="none"
          />
          {/* Pérolas laterais do colar */}
          <circle cx="43" cy="77" r="1.2" fill="#FFFFFF" stroke="#D4AF37" strokeWidth="0.5" />
          <circle cx="57" cy="77" r="1.2" fill="#FFFFFF" stroke="#D4AF37" strokeWidth="0.5" />
          {/* Conchas laterais menores */}
          <path d="M45 78 C44 81 47 81 47 78 Z" fill="#D4AF37" stroke="#F1E5C8" strokeWidth="0.5" />
          <path d="M55 78 C56 81 53 81 53 78 Z" fill="#D4AF37" stroke="#F1E5C8" strokeWidth="0.5" />
          {/* Pingente Central de Búzio / Concha Dourada com Pérola */}
          <g transform="translate(50, 80)">
            <path
              d="M0 -1 C-2.8 1.5 -2.8 5.5 0 7.5 C2.8 5.5 2.8 1.5 0 -1 Z"
              fill="#D4AF37"
              stroke="#F1E5C8"
              strokeWidth="0.7"
            />
            <line
              x1="0"
              y1="0.5"
              x2="0"
              y2="6.5"
              stroke="#8A6E1E"
              strokeWidth="0.6"
              strokeLinecap="round"
            />
            <circle cx="0" cy="1.8" r="1.3" fill="#FFFFFF" stroke="#D4AF37" strokeWidth="0.4" />
            <circle cx="-0.3" cy="1.4" r="0.4" fill="#FFFFFF" />
            <circle cx="0" cy="7.2" r="0.7" fill="#F1E5C8" />
          </g>
        </g>
      )}

      {/* 16. Tiara Comemorativa de Prata e Ouro (Marco 90 Dias) */}
      {hasTiara90 && (
        <g id="acc-tiara90">
          <path
            d="M30 26 C36 16 64 16 70 26"
            stroke="#D4AF37"
            strokeWidth="2.2"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M33 24 Q41 15 50 15 Q59 15 67 24"
            stroke="#E5E7EB"
            strokeWidth="1.3"
            fill="none"
            strokeLinecap="round"
          />
          {/* Picos comemorativos prateados e dourados */}
          <path
            d="M38 22 L42 16 L46 20 L50 13 L54 20 L58 16 L62 22"
            stroke="#D4AF37"
            strokeWidth="1.2"
            fill="none"
            strokeLinejoin="round"
          />
          <circle cx="50" cy="13" r="2" fill="#FFFFFF" stroke="#D4AF37" strokeWidth="0.8" />
          <circle cx="42" cy="16" r="1.3" fill="#E5E7EB" />
          <circle cx="58" cy="16" r="1.3" fill="#E5E7EB" />
          <circle cx="50" cy="19" r="1" fill="#D4AF37" />
        </g>
      )}

      {/* 17. Coroa de Aniversário de Jornada (Marco 365 Dias) */}
      {hasCrown365 && (
        <g id="acc-crown365">
          <path
            d="M31 24 C37 18 63 18 69 24"
            stroke="#D4AF37"
            strokeWidth="2.8"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M33 22 L36 12 L42 19 L50 8 L58 19 L64 12 L67 22"
            stroke="#D4AF37"
            strokeWidth="1.8"
            strokeLinejoin="round"
            fill="#1E1910"
          />
          {/* Detalhes dourados e cristais */}
          <path
            d="M38 20 L42 14 L46 19 L50 11 L54 19 L58 14 L62 20"
            stroke="#FFF1CC"
            strokeWidth="0.8"
            fill="none"
          />
          <circle cx="50" cy="8" r="2.5" fill="#FFFFFF" stroke="#D4AF37" strokeWidth="0.9" />
          <circle cx="36" cy="12" r="1.6" fill="#FFF1CC" stroke="#D4AF37" strokeWidth="0.6" />
          <circle cx="64" cy="12" r="1.6" fill="#FFF1CC" stroke="#D4AF37" strokeWidth="0.6" />
          <circle cx="50" cy="17" r="1.2" fill="#D4AF37" />
          <circle cx="43" cy="22" r="0.9" fill="#FFFFFF" />
          <circle cx="57" cy="22" r="0.9" fill="#FFFFFF" />
        </g>
      )}

      {/* 18. Broche Constelação de Fim de Ano (Exclusivo Missão Ritual de Fim de Ano) */}
      {hasConstellationBrooch && (
        <g id="acc-constellation" transform="translate(68, 38)">
          {/* Fundo do broche estelar */}
          <circle cx="0" cy="0" r="5" fill="#1C1811" stroke="#D4AF37" strokeWidth="1" />
          {/* Linhas da constelação */}
          <path
            d="M-3 2 L-1 -2 L2 -3 L3 1 L0 3 Z"
            stroke="#D4AF37"
            strokeWidth="0.6"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Estrela central e cristais */}
          <polygon points="0,-3 0.8,-0.8 3,0 0.8,0.8 0,3 -0.8,0.8 -3,0 -0.8,-0.8" fill="#FFF1CC" />
          <circle cx="0" cy="0" r="0.9" fill="#FFFFFF" />
          <circle cx="-3" cy="2" r="0.6" fill="#D4AF37" />
          <circle cx="2" cy="-3" r="0.7" fill="#FFFFFF" />
          <circle cx="3" cy="1" r="0.6" fill="#D4AF37" />
          {/* Ponto de luz cintilante */}
          <circle cx="3.5" cy="-3.5" r="0.5" fill="#FFFFFF" />
        </g>
      )}

      {/* 19. Broche de Cartas Dourado (Exclusivo Coleção de Cartões a cada 4 cartas lidas) */}
      {hasLetterBrooch && (
        <g id="acc-letter-brooch" transform="translate(32, 40) rotate(-10)">
          {/* Fundo do broche */}
          <circle cx="0" cy="0" r="5.2" fill="#18140E" stroke="#D4AF37" strokeWidth="1" />
          {/* Mini envelope dourado */}
          <rect
            x="-3.5"
            y="-2.5"
            width="7"
            height="5"
            rx="0.8"
            fill="#D4AF37"
            stroke="#FFF1CC"
            strokeWidth="0.5"
          />
          <path
            d="M-3.5 -2.5 L0 0.5 L3.5 -2.5"
            stroke="#1A1208"
            strokeWidth="0.6"
            strokeLinejoin="round"
            fill="none"
          />
          <circle cx="0" cy="0.5" r="0.8" fill="#FFFFFF" />
          {/* Ponto de luz cintilante */}
          <circle cx="-3" cy="-3" r="0.6" fill="#FFFFFF" />
        </g>
      )}
    </g>
  )

  return (
    <svg
      {...commonSvgProps}
      aria-label={`Avatar ${avatarMeta.label} - ${skin.name} - ${effectiveLength} - Cabelo ${effectiveTexture}`}
    >
      {/* Círculo de moldura exterior */}
      <circle cx="50" cy="50" r="48" fill="#1F1F1F" stroke="#D4AF37" strokeWidth="2" />

      {/* 1. Cabelo de fundo (varia com a textura) */}
      {renderHairBack()}

      {/* 2. Pescoço & ombros com o Tom de Pele selecionado */}
      <path d="M43 65 L43 78 L57 78 L57 65 Z" fill={skin.neckHex} />
      <path
        d="M28 92 C32 82 40 78 50 78 C60 78 68 82 72 92 Z"
        fill="#2A2A2A"
        stroke="#D4AF37"
        strokeWidth="1"
      />

      {/* 3. Rosto com o Tom de Pele selecionado */}
      <ellipse cx="50" cy="53" rx="17.5" ry="21.5" fill={skin.hex} />

      {/* 4. Sobrancelhas e Olhos */}
      <path d="M40 46 Q44 44 47 46" stroke={skin.browHex} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M53 46 Q56 44 60 46" stroke={skin.browHex} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="43.5" cy="50" r="2.2" fill="#180E07" />
      <circle cx="56.5" cy="50" r="2.2" fill="#180E07" />
      {/* Brilho nos olhos */}
      <circle cx="44.2" cy="49.3" r="0.7" fill="#FFFFFF" />
      <circle cx="57.2" cy="49.3" r="0.7" fill="#FFFFFF" />

      {/* 5. Maçãs do rosto / Blush sutil */}
      <circle cx="39" cy="56" r="2.6" fill={skin.blushHex} opacity="0.45" />
      <circle cx="61" cy="56" r="2.6" fill={skin.blushHex} opacity="0.45" />

      {/* 6. Sorriso com tom labial harmonizado */}
      <path
        d="M46 61.5 Q50 64.5 54 61.5"
        stroke={skin.lipHex}
        strokeWidth="1.9"
        strokeLinecap="round"
      />

      {/* 7. Cabelo frontal / Franja / Cachos frontais */}
      {renderHairFront()}

      {/* 8. Acessórios sobrepostos por cima de tudo */}
      {renderAccessories()}
    </svg>
  )
}
