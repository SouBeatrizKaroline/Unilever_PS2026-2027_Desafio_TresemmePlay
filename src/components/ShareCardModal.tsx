import React, { useState } from 'react'
import { Share2, Download, Copy, Check, X, Sparkles } from 'lucide-react'

import type { AvatarId, SkinToneId, HairTextureId, HairLengthId } from '@/types/game'
import { AvatarSvg, getSkinToneColors, AVATAR_OPTIONS } from '@/components/svg/AvatarSvg'
import { useGame } from '@/context/GameContext'

export type CardVisualTheme = 'preto-ouro' | 'branco-dourado' | 'dourado-suave'

export interface ShareCardProps {
  missionTitle: string
  points: number
  stars?: number
  completedAt: string
  rewardName?: string
  userName?: string
  avatarId?: string
  skinTone?: SkinToneId
  hairTexture?: HairTextureId
  hairLength?: HairLengthId
  unlockedAccessories?: string[]
  selectedAccessoryId?: string
  selectedAccessoriesList?: string[]
  isRitualCompleto?: boolean
  achievementType?:
    | 'ritual-completo'
    | 'semana-perfeita'
    | 'colecionadora'
    | 'ritual-perfeito'
    | 'spa-streak'
    | 'boas-vindas-palco'
    | 'aniversario-jornada'
    | 'presente-amiga'
    | 'especial-fim-de-ano'
    | 'custom'
  weeklyIntention?: string
  cardTheme?: CardVisualTheme
  isOpen?: boolean
  onClose?: () => void
}
/**
 * Utilitário para gerar SVG string do Card no padrão visual TRESemmé Play (Preto/Dourado/Branco)
 */
export function generateCardSvgString(props: ShareCardProps): string {
  const {
    missionTitle,
    points,
    stars = 3,
    completedAt,
    rewardName = 'Recompensa TRESemmé',
    userName = 'Participante',
    isRitualCompleto = false,
    achievementType,
  } = props

  let badgeText = isRitualCompleto ? 'MESTRE DO AUTOCUIDADO' : 'RITUAL DE AUTOCUIDADO'
  if (achievementType === 'semana-perfeita') {
    badgeText = 'SEMANA PERFEITA • 5/5'
  } else if (achievementType === 'colecionadora') {
    badgeText = 'COLECIONADORA • ACERVO OURO'
  } else if (achievementType === 'ritual-perfeito') {
    badgeText = 'RITUAL PERFEITO • TRÍADE DO DIA'
  } else if (achievementType === 'spa-streak') {
    badgeText = 'STREAK DE SPAS • 4 SEMANAS SEGUIDAS'
  } else if (achievementType === 'aniversario-jornada') {
    badgeText = 'ANIVERSÁRIO DE JORNADA'
  } else if (achievementType === 'presente-amiga') {
    badgeText = 'PRESENTE DE AUTOCUIDADO 💛'
  } else if (achievementType === 'especial-fim-de-ano') {
    badgeText = 'RITUAL DE FIM DE ANO • BRILHO DE CELEBRAÇÃO'
  } else if (achievementType === 'boas-vindas-palco') {
    badgeText = 'BOAS-VINDAS AO PALCO • ESTREIA'
  } else if (achievementType === 'custom') {
    badgeText = 'RITUAL PERSONALIZADO'
  }

  // Tratamento de layout temático exclusivo para 'aniversario-jornada' (velas, confetes e estrelas festivas em ouro)
  if (achievementType === 'aniversario-jornada') {
    const avatarChoice = (props.avatarId as AvatarId) || 'avatar-1'
    const meta = AVATAR_OPTIONS.find((a) => a.id === avatarChoice) || AVATAR_OPTIONS[0]
    const effectiveSkin = props.skinTone || meta.defaultSkinTone
    const effectiveTexture = props.hairTexture || meta.defaultTexture
    const skin = getSkinToneColors(effectiveSkin)

    const rawAccs = props.unlockedAccessories || []
    let accs: string[] = []
    if (props.selectedAccessoriesList && props.selectedAccessoriesList.length > 0) {
      accs = props.selectedAccessoriesList.filter((a) => rawAccs.includes(a))
    } else if (props.selectedAccessoryId !== undefined) {
      accs =
        props.selectedAccessoryId && rawAccs.includes(props.selectedAccessoryId)
          ? [props.selectedAccessoryId]
          : []
    } else {
      accs = []
    }

    let hairBack = '#141414'
    let hairMid = '#1C1A17'
    let hairHigh = '#2A241E'
    if (avatarChoice === 'avatar-2') {
      hairBack = '#2B170B'
      hairMid = '#3D2314'
      hairHigh = '#4E2E1A'
    } else if (avatarChoice === 'avatar-3') {
      hairBack = '#C59A3E'
      hairMid = '#DDB258'
      hairHigh = '#E8C36E'
    } else if (avatarChoice === 'avatar-4') {
      hairBack = '#0E0E0E'
      hairMid = '#161616'
      hairHigh = '#1A1A1A'
    } else if (avatarChoice === 'avatar-5') {
      hairBack = '#5A1E0B'
      hairMid = '#8B3114'
      hairHigh = '#BD4B1C'
    } else if (avatarChoice === 'avatar-6') {
      hairBack = '#2E1038'
      hairMid = '#6A1E6D'
      hairHigh = '#B82E8A'
    }

    let hairBackSvg = ''
    let hairFrontSvg = ''
    if (effectiveTexture === 'crespo') {
      hairBackSvg = `
        <circle cx="50" cy="40" r="32" fill="${hairBack}"/>
        <circle cx="30" cy="38" r="20" fill="${hairMid}"/>
        <circle cx="70" cy="38" r="20" fill="${hairMid}"/>
        <circle cx="50" cy="22" r="18" fill="${hairHigh}"/>
      `
      hairFrontSvg = `
        <circle cx="38" cy="34" r="8" fill="${hairMid}"/>
        <circle cx="62" cy="34" r="8" fill="${hairMid}"/>
        <circle cx="50" cy="31" r="7" fill="${hairHigh}"/>
      `
    } else if (effectiveTexture === 'cacheado') {
      hairBackSvg = `
        <circle cx="30" cy="35" r="16" fill="${hairBack}"/><circle cx="70" cy="35" r="16" fill="${hairBack}"/>
        <circle cx="24" cy="52" r="14" fill="${hairMid}"/><circle cx="76" cy="52" r="14" fill="${hairMid}"/>
        <circle cx="50" cy="24" r="16" fill="${hairBack}"/>
      `
      hairFrontSvg = `
        <circle cx="38" cy="35" r="7" fill="${hairHigh}"/><circle cx="62" cy="35" r="7" fill="${hairHigh}"/>
        <circle cx="50" cy="32" r="6" fill="${hairHigh}"/>
      `
    } else if (effectiveTexture === 'ondulado') {
      hairBackSvg = `
        <path d="M20 42 C18 65 24 82 28 92 C38 95 62 95 72 92 C76 82 82 65 80 42 C80 20 66 14 50 14 C34 14 20 20 20 42 Z" fill="${hairBack}"/>
      `
      hairFrontSvg = `
        <path d="M26 40 C28 25 38 18 50 18 C62 18 72 25 74 40 C68 32 58 32 50 34 Z" fill="${hairMid}"/>
        <path d="M25 45 C30 60 28 75 32 86 C28 76 25 62 25 45 Z" fill="${hairHigh}"/>
        <path d="M75 45 C70 60 72 75 68 86 C72 76 75 62 75 45 Z" fill="${hairHigh}"/>
      `
    } else {
      hairBackSvg = `
        <path d="M22 45 C22 25 35 15 50 15 C65 15 78 25 78 45 C78 72 74 85 70 92 C60 95 40 95 30 92 C26 85 22 72 22 45 Z" fill="${hairBack}"/>
      `
      hairFrontSvg = `
        <path d="M30 42 C30 22 40 18 50 18 C64 18 70 24 70 38 C65 30 54 28 44 32 C38 35 34 38 30 42 Z" fill="${hairMid}"/>
        <path d="M30 40 C32 55 33 68 36 78" stroke="${hairHigh}" stroke-width="2"/>
        <path d="M70 40 C68 55 67 68 64 78" stroke="${hairHigh}" stroke-width="2"/>
      `
    }

    const annivAvatarSvg = `
      <circle cx="50" cy="50" r="48" fill="#20170F" stroke="#D4AF37" stroke-width="2"/>
      ${hairBackSvg}
      <path d="M43 65 L43 78 L57 78 L57 65 Z" fill="${skin.neckHex}"/>
      <ellipse cx="50" cy="53" rx="17.5" ry="21.5" fill="${skin.hex}"/>
      <circle cx="43.5" cy="50" r="2.2" fill="#1C0D05"/><circle cx="56.5" cy="50" r="2.2" fill="#1C0D05"/>
      <path d="M40 46 Q44 44 47 46" stroke="${skin.browHex}" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M53 46 Q56 44 60 46" stroke="${skin.browHex}" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M46 61.5 Q50 64.5 54 61.5" stroke="${skin.lipHex}" stroke-width="2" stroke-linecap="round"/>
      <circle cx="39" cy="56" r="2.5" fill="${skin.blushHex}" opacity="0.45"/>
      <circle cx="61" cy="56" r="2.5" fill="${skin.blushHex}" opacity="0.45"/>
      ${hairFrontSvg}
      <!-- Coroa de Aniversário sobre o avatar -->
      <path d="M31 24 C37 18 63 18 69 24" stroke="#D4AF37" stroke-width="2.8" stroke-linecap="round" fill="none"/>
      <path d="M33 22 L36 12 L42 19 L50 8 L58 19 L64 12 L67 22" stroke="#D4AF37" stroke-width="1.8" fill="#241B0E"/>
      <circle cx="50" cy="8" r="2.5" fill="#FFFFFF" stroke="#D4AF37" stroke-width="0.9"/>
    `

    // Paleta baseada no tema para o card de aniversário
    const isWhite = props.cardTheme === 'branco-dourado'
    const isSoft = props.cardTheme === 'dourado-suave'
    const annivBg = isWhite
      ? 'linear-gradient(135deg, #FCFCFC 0%, #F5F1E9 50%, #ECE4D0 100%)'
      : isSoft
        ? 'linear-gradient(135deg, #302416 0%, #221A0F 50%, #15110B 100%)'
        : 'linear-gradient(135deg, #2B1D0E 0%, #19140C 50%, #0A0908 100%)'
    const annivTextMain = isWhite ? '#1C1914' : '#FFFFFF'
    const annivTextSub = isWhite ? '#7A6B52' : '#F1E5C8'
    const annivBoxBg = isWhite ? '#FFFFFF' : '#1A140B'

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 640" width="500" height="640">
      <defs>
        <linearGradient id="annivGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${isWhite ? '#FFFFFF' : '#332210'}"/>
          <stop offset="50%" stop-color="${isWhite ? '#F6F2E8' : '#1C160F'}"/>
          <stop offset="100%" stop-color="${isWhite ? '#ECE3D0' : '#0B0907'}"/>
        </linearGradient>
        <linearGradient id="annivGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FFF5D8"/>
          <stop offset="35%" stop-color="#D4AF37"/>
          <stop offset="70%" stop-color="#997C28"/>
          <stop offset="100%" stop-color="#F2E6C2"/>
        </linearGradient>
      </defs>

      <rect x="10" y="10" width="480" height="620" rx="30" fill="url(#annivGrad)" stroke="url(#annivGold)" stroke-width="3"/>
      <rect x="22" y="22" width="456" height="596" rx="22" fill="none" stroke="#D4AF37" stroke-width="1" stroke-dasharray="6 4" opacity="0.6"/>

      <!-- Confetes em SVG festivos em preto/dourado -->
      <g opacity="0.75">
        <circle cx="50" cy="65" r="3" fill="#D4AF37"/>
        <circle cx="85" cy="45" r="2" fill="#FFF1CC"/>
        <rect x="420" y="55" width="4" height="8" rx="1" transform="rotate(25 420 55)" fill="#D4AF37"/>
        <circle cx="445" cy="85" r="2.5" fill="#FFF1CC"/>
        <polygon points="55,140 58,146 64,147 59,152 61,158 55,154 49,158 51,152 46,147 52,146" fill="#D4AF37" opacity="0.7"/>
        <polygon points="440,160 443,166 449,167 444,172 446,178 440,174 434,178 436,172 431,167 437,166" fill="#FFF1CC" opacity="0.7"/>
        <rect x="40" y="380" width="3" height="7" rx="1" transform="rotate(45 40 380)" fill="#D4AF37"/>
        <circle cx="455" cy="390" r="3" fill="#D4AF37"/>
        <circle cx="65" cy="500" r="2.5" fill="#FFF1CC"/>
        <rect x="430" y="510" width="4" height="8" rx="1" transform="rotate(-30 430 510)" fill="#D4AF37"/>
      </g>

      <!-- Topo Brand -->
      <g transform="translate(250, 68)">
        <text text-anchor="middle" font-family="'Playfair Display', Georgia, serif" font-size="28" font-weight="900" fill="${annivTextMain}" letter-spacing="2">TRESemmé</text>
        <rect x="85" y="-18" width="50" height="20" rx="4" fill="#D4AF37"/>
        <text x="110" y="-4" text-anchor="middle" font-family="'Inter', sans-serif" font-size="11" font-weight="800" fill="#0D0D0D" letter-spacing="1.5">PLAY</text>
      </g>

      <!-- Badge Exclusivo de Aniversário -->
      <g transform="translate(250, 112)">
        <rect x="-150" y="-14" width="300" height="28" rx="14" fill="${isWhite ? '#FFF' : '#23190E'}" stroke="#D4AF37" stroke-width="1.4"/>
        <text text-anchor="middle" y="5" font-family="'Inter', sans-serif" font-size="10" font-weight="800" fill="${isWhite ? '#997C28' : '#F1E5C8'}" letter-spacing="1.5">🎉 RITUAL DE ANIVERSÁRIO DE JORNADA 🎉</text>
      </g>

      <!-- Avatar com Auréola Dourada e Coroa -->
      <g transform="translate(250, 212)">
        <circle cx="0" cy="0" r="58" fill="${isWhite ? '#FAF7F0' : '#1C150C'}" stroke="url(#annivGold)" stroke-width="3.5"/>
        <circle cx="0" cy="0" r="52" fill="${isWhite ? '#FFFFFF' : '#261C10'}" stroke="#D4AF37" stroke-width="1" stroke-dasharray="3 3"/>
        <g transform="translate(-48, -48) scale(0.96)">
          ${annivAvatarSvg}
        </g>
        <circle cx="38" cy="38" r="14" fill="#D4AF37" stroke="${isWhite ? '#FFF' : '#1C150C'}" stroke-width="2"/>
        <text x="38" y="42" text-anchor="middle" font-family="'Inter', sans-serif" font-size="12" font-weight="900" fill="#0D0D0D">👑</text>
      </g>

      <!-- Título da Missão -->
      <text x="250" y="306" text-anchor="middle" font-family="'Playfair Display', Georgia, serif" font-size="23" font-weight="800" fill="${annivTextMain}">${missionTitle}</text>
      <text x="250" y="328" text-anchor="middle" font-family="'Inter', sans-serif" font-size="13" font-weight="500" fill="#D4AF37">Celebrado com maestria por <tspan fill="${annivTextSub}" font-weight="700">${userName}</tspan></text>

      <!-- Mensagem festiva inspiradora -->
      <g transform="translate(250, 362)">
        <rect x="-175" y="-14" width="350" height="30" rx="15" fill="${annivBoxBg}" stroke="#D4AF37" stroke-width="0.8"/>
        <text text-anchor="middle" y="5" font-family="'Inter', sans-serif" font-size="10.5" font-weight="600" fill="${annivTextSub}">"Cada dia dedicado a você é uma vitória para seus fios."</text>
      </g>

      <!-- Card com Pontos e Recompensa -->
      <g transform="translate(50, 412)">
        <rect width="400" height="110" rx="20" fill="${annivBoxBg}" stroke="#D4AF37" stroke-width="1.4"/>
        
        <!-- Pontos -->
        <g transform="translate(30, 26)">
          <circle cx="22" cy="26" r="18" fill="${isWhite ? '#F5EEDC' : '#2A1F11'}" stroke="#D4AF37" stroke-width="1.5"/>
          <text x="22" y="33" text-anchor="middle" font-family="'Inter', sans-serif" font-size="16" font-weight="bold" fill="#D4AF37">🎉</text>
          <text x="54" y="24" font-family="'Inter', sans-serif" font-size="10.5" font-weight="700" fill="${isWhite ? '#77674D' : '#B3B3B3'}" letter-spacing="1">PONTOS DE CELEBRAÇÃO</text>
          <text x="54" y="48" font-family="'Playfair Display', Georgia, serif" font-size="24" font-weight="800" fill="${annivTextMain}">+${points} pts</text>
        </g>

        <!-- Linha divisória -->
        <line x1="220" y1="18" x2="220" y2="92" stroke="#D4AF37" stroke-width="1" stroke-opacity="0.3"/>

        <!-- Recompensa Exclusiva -->
        <g transform="translate(236, 26)">
          <text x="0" y="24" font-family="'Inter', sans-serif" font-size="10" font-weight="700" fill="#D4AF37" letter-spacing="1">JOIA COMEMORATIVA</text>
          <text x="0" y="44" font-family="'Inter', sans-serif" font-size="13" font-weight="800" fill="${annivTextMain}">${rewardName}</text>
          <text x="0" y="58" font-family="'Inter', sans-serif" font-size="9.5" fill="${annivTextSub}">Álbum & Avatar Desbloqueados</text>
        </g>
      </g>

      <!-- Rodapé -->
      <text x="250" y="558" text-anchor="middle" font-family="'Inter', sans-serif" font-size="11" font-weight="500" fill="${isWhite ? '#887962' : '#888888'}">Celebrado em ${completedAt}</text>
      <text x="250" y="588" text-anchor="middle" font-family="'Inter', sans-serif" font-size="9" fill="${isWhite ? '#998A73' : '#555555'}">TRESemmé Play • Conceito de inovação independente</text>
    </svg>`
  }

  // Tratamento de layout temático exclusivo para 'especial-fim-de-ano'
  if (achievementType === 'especial-fim-de-ano') {
    const avatarChoice = (props.avatarId as AvatarId) || 'avatar-1'
    const meta = AVATAR_OPTIONS.find((a) => a.id === avatarChoice) || AVATAR_OPTIONS[0]
    const effectiveSkin = props.skinTone || meta.defaultSkinTone
    const effectiveTexture = props.hairTexture || meta.defaultTexture
    const skin = getSkinToneColors(effectiveSkin)

    const rawAccs = props.unlockedAccessories || []
    let accs: string[] = []
    if (props.selectedAccessoriesList && props.selectedAccessoriesList.length > 0) {
      accs = props.selectedAccessoriesList.filter((a) => rawAccs.includes(a))
    } else if (props.selectedAccessoryId !== undefined) {
      accs =
        props.selectedAccessoryId && rawAccs.includes(props.selectedAccessoryId)
          ? [props.selectedAccessoryId]
          : []
    } else {
      accs = []
    }

    let hairBack = '#141414'
    let hairMid = '#1C1A17'
    let hairHigh = '#2A241E'
    if (avatarChoice === 'avatar-2') {
      hairBack = '#2B170B'
      hairMid = '#3D2314'
      hairHigh = '#4E2E1A'
    } else if (avatarChoice === 'avatar-3') {
      hairBack = '#C59A3E'
      hairMid = '#DDB258'
      hairHigh = '#E8C36E'
    } else if (avatarChoice === 'avatar-4') {
      hairBack = '#0E0E0E'
      hairMid = '#161616'
      hairHigh = '#1A1A1A'
    }

    let hairBackSvg = ''
    let hairFrontSvg = ''
    if (effectiveTexture === 'crespo') {
      hairBackSvg = `
        <circle cx="50" cy="40" r="32" fill="${hairBack}"/>
        <circle cx="30" cy="38" r="20" fill="${hairMid}"/>
        <circle cx="70" cy="38" r="20" fill="${hairMid}"/>
        <circle cx="50" cy="22" r="18" fill="${hairHigh}"/>
      `
      hairFrontSvg = `
        <circle cx="38" cy="34" r="8" fill="${hairMid}"/>
        <circle cx="62" cy="34" r="8" fill="${hairMid}"/>
        <circle cx="50" cy="31" r="7" fill="${hairHigh}"/>
      `
    } else if (effectiveTexture === 'cacheado') {
      hairBackSvg = `
        <circle cx="30" cy="35" r="16" fill="${hairBack}"/><circle cx="70" cy="35" r="16" fill="${hairBack}"/>
        <circle cx="24" cy="52" r="14" fill="${hairMid}"/><circle cx="76" cy="52" r="14" fill="${hairMid}"/>
        <circle cx="50" cy="24" r="16" fill="${hairBack}"/>
      `
      hairFrontSvg = `
        <circle cx="38" cy="35" r="7" fill="${hairHigh}"/><circle cx="62" cy="35" r="7" fill="${hairHigh}"/>
        <circle cx="50" cy="32" r="6" fill="${hairHigh}"/>
      `
    } else if (effectiveTexture === 'ondulado') {
      hairBackSvg = `
        <path d="M20 42 C18 65 24 82 28 92 C38 95 62 95 72 92 C76 82 82 65 80 42 C80 20 66 14 50 14 C34 14 20 20 20 42 Z" fill="${hairBack}"/>
      `
      hairFrontSvg = `
        <path d="M26 40 C28 25 38 18 50 18 C62 18 72 25 74 40 C68 32 58 32 50 34 Z" fill="${hairMid}"/>
        <path d="M25 45 C30 60 28 75 32 86 C28 76 25 62 25 45 Z" fill="${hairHigh}"/>
        <path d="M75 45 C70 60 72 75 68 86 C72 76 75 62 75 45 Z" fill="${hairHigh}"/>
      `
    } else {
      hairBackSvg = `
        <path d="M22 45 C22 25 35 15 50 15 C65 15 78 25 78 45 C78 72 74 85 70 92 C60 95 40 95 30 92 C26 85 22 72 22 45 Z" fill="${hairBack}"/>
      `
      hairFrontSvg = `
        <path d="M30 42 C30 22 40 18 50 18 C64 18 70 24 70 38 C65 30 54 28 44 32 C38 35 34 38 30 42 Z" fill="${hairMid}"/>
        <path d="M30 40 C32 55 33 68 36 78" stroke="${hairHigh}" stroke-width="2"/>
        <path d="M70 40 C68 55 67 68 64 78" stroke="${hairHigh}" stroke-width="2"/>
      `
    }

    const specialAvatarSvg = `
      <circle cx="50" cy="50" r="48" fill="#1C1710" stroke="#D4AF37" stroke-width="2"/>
      ${hairBackSvg}
      <path d="M43 65 L43 78 L57 78 L57 65 Z" fill="${skin.neckHex}"/>
      <ellipse cx="50" cy="53" rx="17.5" ry="21.5" fill="${skin.hex}"/>
      <circle cx="43.5" cy="50" r="2.2" fill="#1C0D05"/><circle cx="56.5" cy="50" r="2.2" fill="#1C0D05"/>
      <path d="M40 46 Q44 44 47 46" stroke="${skin.browHex}" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M53 46 Q56 44 60 46" stroke="${skin.browHex}" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M46 61.5 Q50 64.5 54 61.5" stroke="${skin.lipHex}" stroke-width="2" stroke-linecap="round"/>
      <circle cx="39" cy="56" r="2.5" fill="${skin.blushHex}" opacity="0.45"/>
      <circle cx="61" cy="56" r="2.5" fill="${skin.blushHex}" opacity="0.45"/>
      ${hairFrontSvg}
      <!-- Broche da Constelação sempre no avatar do card de fim de ano -->
      <circle cx="68" cy="38" r="5" fill="#1C1811" stroke="#D4AF37" stroke-width="1.2"/>
      <polygon points="68,34 69,36.8 72,38 69,39.2 68,42 67,39.2 64,38 67,36.8" fill="#FFF1CC"/>
      <circle cx="68" cy="38" r="1.2" fill="#FFFFFF"/>
    `

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 640" width="500" height="640">
      <defs>
        <radialGradient id="nyeRadial" cx="50%" cy="32%" r="75%">
          <stop offset="0%" stop-color="#2D2312"/>
          <stop offset="45%" stop-color="#18130B"/>
          <stop offset="85%" stop-color="#0E0C09"/>
          <stop offset="100%" stop-color="#050504"/>
        </radialGradient>
        <linearGradient id="nyeGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FFF4D0"/>
          <stop offset="30%" stop-color="#D4AF37"/>
          <stop offset="70%" stop-color="#917320"/>
          <stop offset="100%" stop-color="#F3E5BE"/>
        </linearGradient>
      </defs>

      <!-- Fundo temático com moldura nobre -->
      <rect x="10" y="10" width="480" height="620" rx="28" fill="url(#nyeRadial)" stroke="url(#nyeGoldGrad)" stroke-width="3"/>
      <rect x="22" y="22" width="456" height="596" rx="20" fill="none" stroke="#D4AF37" stroke-width="1" stroke-dasharray="8 4" opacity="0.5"/>

      <!-- Constelações e fogos delicados no céu do card -->
      <path d="M45 60 L75 45 L115 65 M380 50 L420 70 L455 55" stroke="#D4AF37" stroke-width="1" stroke-dasharray="3 3" opacity="0.6"/>
      <circle cx="45" cy="60" r="2.5" fill="#FFFFFF"/>
      <circle cx="75" cy="45" r="3" fill="#D4AF37"/>
      <circle cx="115" cy="65" r="2.5" fill="#FFF1CC"/>
      <circle cx="380" cy="50" r="2.5" fill="#FFFFFF"/>
      <circle cx="420" cy="70" r="3" fill="#D4AF37"/>
      <circle cx="455" cy="55" r="2" fill="#FFF1CC"/>

      <!-- Brilhos estelares de celebração espalhados -->
      <g transform="translate(85, 130)"><polygon points="0,-8 2,-2 8,0 2,2 0,8 -2,2 -8,0 -2,-2" fill="#D4AF37"/><circle cx="0" cy="0" r="1.5" fill="#FFFFFF"/></g>
      <g transform="translate(415, 140)"><polygon points="0,-8 2,-2 8,0 2,2 0,8 -2,2 -8,0 -2,-2" fill="#FFF1CC"/><circle cx="0" cy="0" r="1.5" fill="#FFFFFF"/></g>
      <g transform="translate(60, 360)"><polygon points="0,-6 1.5,-1.5 6,0 1.5,1.5 0,6 -1.5,1.5 -6,0 -1.5,-1.5" fill="#D4AF37"/></g>
      <g transform="translate(440, 370)"><polygon points="0,-6 1.5,-1.5 6,0 1.5,1.5 0,6 -1.5,1.5 -6,0 -1.5,-1.5" fill="#FFF1CC"/></g>

      <!-- Topo Brand -->
      <g transform="translate(250, 68)">
        <text text-anchor="middle" font-family="'Playfair Display', Georgia, serif" font-size="28" font-weight="900" fill="#FFFFFF" letter-spacing="2">TRESemmé</text>
        <rect x="85" y="-18" width="50" height="20" rx="4" fill="#D4AF37"/>
        <text x="110" y="-4" text-anchor="middle" font-family="'Inter', sans-serif" font-size="11" font-weight="800" fill="#0D0D0D" letter-spacing="1.5">PLAY</text>
      </g>

      <!-- Badge Exclusivo -->
      <g transform="translate(250, 112)">
        <rect x="-145" y="-14" width="290" height="28" rx="14" fill="#20190F" stroke="#D4AF37" stroke-width="1.4"/>
        <text text-anchor="middle" y="5" font-family="'Inter', sans-serif" font-size="9.5" font-weight="800" fill="#F1E5C8" letter-spacing="1.5">✨ RITUAL DE FIM DE ANO • CELEBRAÇÃO ✨</text>
      </g>

      <!-- Avatar com Auréola Dourada Festiva -->
      <g transform="translate(250, 212)">
        <circle cx="0" cy="0" r="58" fill="#18130B" stroke="url(#nyeGoldGrad)" stroke-width="3.5"/>
        <circle cx="0" cy="0" r="52" fill="#221A0F" stroke="#D4AF37" stroke-width="1" stroke-dasharray="3 3"/>
        <g transform="translate(-48, -48) scale(0.96)">
          ${specialAvatarSvg}
        </g>
        <circle cx="38" cy="38" r="14" fill="#D4AF37" stroke="#18130B" stroke-width="2"/>
        <text x="38" y="42" text-anchor="middle" font-family="'Inter', sans-serif" font-size="12" font-weight="900" fill="#0D0D0D">✦</text>
      </g>

      <!-- Título da Missão -->
      <text x="250" y="306" text-anchor="middle" font-family="'Playfair Display', Georgia, serif" font-size="24" font-weight="800" fill="#FFFFFF">${missionTitle}</text>
      <text x="250" y="328" text-anchor="middle" font-family="'Inter', sans-serif" font-size="13" font-weight="500" fill="#D4AF37">Ciclo renovado por <tspan fill="#FFF1CC" font-weight="700">${userName}</tspan></text>

      <!-- Mensagem festiva inspiradora -->
      <g transform="translate(250, 362)">
        <rect x="-170" y="-14" width="340" height="30" rx="15" fill="#1B150D" stroke="#D4AF37" stroke-width="0.8"/>
        <text text-anchor="middle" y="5" font-family="'Inter', sans-serif" font-size="11" font-weight="600" fill="#F1E5C8">"Brilho, presença e intenções renovadas para o novo ano."</text>
      </g>

      <!-- Card com Pontos e Acessório Exclusivo -->
      <g transform="translate(50, 412)">
        <rect width="400" height="110" rx="20" fill="#17120B" stroke="#D4AF37" stroke-width="1.4"/>
        
        <!-- Pontos -->
        <g transform="translate(30, 26)">
          <circle cx="22" cy="26" r="18" fill="#241B0E" stroke="#D4AF37" stroke-width="1.5"/>
          <text x="22" y="33" text-anchor="middle" font-family="'Inter', sans-serif" font-size="18" font-weight="bold" fill="#D4AF37">✦</text>
          <text x="54" y="24" font-family="'Inter', sans-serif" font-size="10.5" font-weight="700" fill="#B3B3B3" letter-spacing="1">PONTOS DE CELEBRAÇÃO</text>
          <text x="54" y="48" font-family="'Playfair Display', Georgia, serif" font-size="24" font-weight="800" fill="#FFF1CC">+${points} pts</text>
        </g>

        <!-- Linha divisória -->
        <line x1="220" y1="18" x2="220" y2="92" stroke="#3A2C17" stroke-width="1.2"/>

        <!-- Recompensa Exclusiva -->
        <g transform="translate(236, 26)">
          <text x="0" y="24" font-family="'Inter', sans-serif" font-size="10" font-weight="700" fill="#D4AF37" letter-spacing="1">JOIA EXCLUSIVA</text>
          <text x="0" y="44" font-family="'Inter', sans-serif" font-size="13" font-weight="800" fill="#FFFFFF">${rewardName}</text>
          <text x="0" y="58" font-family="'Inter', sans-serif" font-size="9.5" fill="#A0A0A0">Coleção Especial de Fim de Ano</text>
        </g>
      </g>

      <!-- Rodapé -->
      <text x="250" y="558" text-anchor="middle" font-family="'Inter', sans-serif" font-size="11" font-weight="500" fill="#888888">Celebrado em ${completedAt}</text>
      <text x="250" y="588" text-anchor="middle" font-family="'Inter', sans-serif" font-size="9" fill="#555555">TRESemmé Play • Conceito de inovação independente</text>
    </svg>`
  }

  const rawIntention = props.weeklyIntention?.trim()
  const escapeXml = (str: string) =>
    str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;')

  const safeIntention = rawIntention
    ? escapeXml(rawIntention.length > 36 ? rawIntention.slice(0, 35) + '…' : rawIntention)
    : ''
  const hasIntention = Boolean(safeIntention)
  const starIcons = Array.from({ length: stars })
    .map(
      (_, i) =>
        `<polygon points="${220 + i * 30},310 ${223 + i * 30},317 ${230 + i * 30},317 ${225 + i * 30},322 ${227 + i * 30},329 ${220 + i * 30},324 ${213 + i * 30},329 ${215 + i * 30},322 ${210 + i * 30},317 ${217 + i * 30},317" fill="#D4AF37" stroke="#F1E5C8" stroke-width="1"/>`,
    )
    .join('')

  const avatarChoice = (props.avatarId as AvatarId) || 'avatar-1'
  const meta = AVATAR_OPTIONS.find((a) => a.id === avatarChoice) || AVATAR_OPTIONS[0]
  const effectiveSkin = props.skinTone || meta.defaultSkinTone
  const effectiveTexture = props.hairTexture || meta.defaultTexture
  const effectiveLength: HairLengthId = props.hairLength || 'longo'
  const skin = getSkinToneColors(effectiveSkin)

  const rawAccs = props.unlockedAccessories || []
  let accs: string[] = []
  if (props.selectedAccessoriesList && props.selectedAccessoriesList.length > 0) {
    accs = props.selectedAccessoriesList.filter((a) => rawAccs.includes(a))
  } else if (props.selectedAccessoryId !== undefined) {
    accs =
      props.selectedAccessoryId && rawAccs.includes(props.selectedAccessoryId)
        ? [props.selectedAccessoryId]
        : []
  } else {
    accs = []
  }

  const hasHairpin = accs.includes('hairpin-gold')
  const hasPearlPin = accs.includes('pearl-pin-gold')
  const hasTiaraWaves = accs.includes('tiara-waves-gold') || accs.includes('tiara-pearl')
  const hasScarf = accs.includes('scarf-gold')
  const hasMoonEarrings = accs.includes('moon-earrings-gold')
  const hasScrunchie = accs.includes('scrunchie-gold')
  const hasSunClip = accs.includes('sun-clip-gold')
  const hasSpaBand = accs.includes('spa-band-gold')

  // Cores de cabelo pelo ID
  let hairBack = '#141414'
  let hairMid = '#1C1A17'
  let hairHigh = '#2A241E'
  if (avatarChoice === 'avatar-2') {
    hairBack = '#2B170B'
    hairMid = '#3D2314'
    hairHigh = '#4E2E1A'
  } else if (avatarChoice === 'avatar-3') {
    hairBack = '#C59A3E'
    hairMid = '#DDB258'
    hairHigh = '#E8C36E'
  } else if (avatarChoice === 'avatar-4') {
    hairBack = '#0E0E0E'
    hairMid = '#161616'
    hairHigh = '#1A1A1A'
  } else if (avatarChoice === 'avatar-5') {
    hairBack = '#5A1E0B'
    hairMid = '#8B3114'
    hairHigh = '#BD4B1C'
  } else if (avatarChoice === 'avatar-6') {
    hairBack = '#2E1038'
    hairMid = '#6A1E6D'
    hairHigh = '#B82E8A'
  }

  // Gera SVG inline do avatar respeitando tom de pele, textura e comprimento
  let hairBackSvg = ''
  let hairFrontSvg = ''

  if (effectiveLength === 'careca') {
    hairBackSvg = `<ellipse cx="50" cy="46" rx="20" ry="22" fill="${skin.neckHex}" opacity="0.4"/>`
    hairFrontSvg = `
      <ellipse cx="50" cy="36" rx="9" ry="4" fill="#FFFFFF" opacity="0.2"/>
      <path d="M33 46 C35 34 42 32 50 32 C58 32 65 34 67 46" stroke="${skin.neckHex}" stroke-width="0.8" fill="none" opacity="0.6"/>
    `
  } else if (effectiveLength === 'curto-buzz') {
    hairBackSvg = `
      <ellipse cx="50" cy="46" rx="20.5" ry="23" fill="${hairBack}" opacity="0.95"/>
      <ellipse cx="50" cy="44" rx="19.5" ry="21.5" fill="${hairMid}" opacity="0.85"/>
    `
    hairFrontSvg = `
      <path d="M33 46 C34 33 41 30 50 30 C59 30 66 33 67 46 C64 41 58 38 50 38 C42 38 36 41 33 46 Z" fill="${hairBack}" opacity="0.9"/>
      <path d="M36 38 C42 33 58 33 64 38" stroke="${hairHigh}" stroke-width="1.2" stroke-dasharray="2 2" fill="none"/>
    `
  } else if (effectiveLength === 'curto-volume') {
    hairBackSvg = `
      <ellipse cx="50" cy="34" rx="19" ry="14" fill="${hairBack}"/>
      <circle cx="38" cy="33" r="10" fill="${hairMid}"/>
      <circle cx="62" cy="33" r="10" fill="${hairMid}"/>
      <circle cx="50" cy="27" r="9" fill="${hairHigh}"/>
    `
    hairFrontSvg = `
      <circle cx="38" cy="31" r="8" fill="${hairMid}"/>
      <circle cx="62" cy="31" r="8" fill="${hairMid}"/>
      <circle cx="50" cy="27" r="7.5" fill="${hairHigh}"/>
    `
  } else if (effectiveLength === 'medio') {
    hairBackSvg = `
      <circle cx="50" cy="38" r="26" fill="${hairBack}"/>
      <circle cx="32" cy="40" r="16" fill="${hairMid}"/>
      <circle cx="68" cy="40" r="16" fill="${hairMid}"/>
      <circle cx="50" cy="24" r="15" fill="${hairHigh}"/>
    `
    hairFrontSvg = `
      <circle cx="38" cy="34" r="8" fill="${hairMid}"/>
      <circle cx="62" cy="34" r="8" fill="${hairMid}"/>
      <circle cx="50" cy="31" r="7" fill="${hairHigh}"/>
      <path d="M26 44 C28 54 29 64 32 70" stroke="${hairMid}" stroke-width="3.5" fill="none"/>
      <path d="M74 44 C72 54 71 64 68 70" stroke="${hairMid}" stroke-width="3.5" fill="none"/>
    `
  } else if (effectiveTexture === 'crespo') {
    hairBackSvg = `
      <circle cx="50" cy="40" r="32" fill="${hairBack}"/>
      <circle cx="30" cy="38" r="20" fill="${hairMid}"/>
      <circle cx="70" cy="38" r="20" fill="${hairMid}"/>
      <circle cx="50" cy="22" r="18" fill="${hairHigh}"/>
    `
    hairFrontSvg = `
      <circle cx="38" cy="34" r="8" fill="${hairMid}"/>
      <circle cx="62" cy="34" r="8" fill="${hairMid}"/>
      <circle cx="50" cy="31" r="7" fill="${hairHigh}"/>
    `
  } else if (effectiveTexture === 'cacheado') {
    hairBackSvg = `
      <circle cx="30" cy="35" r="16" fill="${hairBack}"/><circle cx="70" cy="35" r="16" fill="${hairBack}"/>
      <circle cx="24" cy="52" r="14" fill="${hairMid}"/><circle cx="76" cy="52" r="14" fill="${hairMid}"/>
      <circle cx="50" cy="24" r="16" fill="${hairBack}"/>
    `
    hairFrontSvg = `
      <circle cx="38" cy="35" r="7" fill="${hairHigh}"/><circle cx="62" cy="35" r="7" fill="${hairHigh}"/>
      <circle cx="50" cy="32" r="6" fill="${hairHigh}"/>
    `
  } else if (effectiveTexture === 'ondulado') {
    hairBackSvg = `
      <path d="M20 42 C18 65 24 82 28 92 C38 95 62 95 72 92 C76 82 82 65 80 42 C80 20 66 14 50 14 C34 14 20 20 20 42 Z" fill="${hairBack}"/>
    `
    hairFrontSvg = `
      <path d="M26 40 C28 25 38 18 50 18 C62 18 72 25 74 40 C68 32 58 32 50 34 Z" fill="${hairMid}"/>
      <path d="M25 45 C30 60 28 75 32 86 C28 76 25 62 25 45 Z" fill="${hairHigh}"/>
      <path d="M75 45 C70 60 72 75 68 86 C72 76 75 62 75 45 Z" fill="${hairHigh}"/>
    `
  } else {
    // Liso longo
    hairBackSvg = `
      <path d="M22 45 C22 25 35 15 50 15 C65 15 78 25 78 45 C78 72 74 85 70 92 C60 95 40 95 30 92 C26 85 22 72 22 45 Z" fill="${hairBack}"/>
    `
    hairFrontSvg = `
      <path d="M30 42 C30 22 40 18 50 18 C64 18 70 24 70 38 C65 30 54 28 44 32 C38 35 34 38 30 42 Z" fill="${hairMid}"/>
      <path d="M30 40 C32 55 33 68 36 78" stroke="${hairHigh}" stroke-width="2"/>
      <path d="M70 40 C68 55 67 68 64 78" stroke="${hairHigh}" stroke-width="2"/>
    `
  }

  const avatarInnerSvg = `
    <circle cx="50" cy="50" r="48" fill="#1F1F1F" stroke="#D4AF37" stroke-width="2"/>
    ${hairBackSvg}
    <path d="M43 65 L43 78 L57 78 L57 65 Z" fill="${skin.neckHex}"/>
    <ellipse cx="50" cy="53" rx="17.5" ry="21.5" fill="${skin.hex}"/>
    <circle cx="43.5" cy="50" r="2.2" fill="#1C0D05"/><circle cx="56.5" cy="50" r="2.2" fill="#1C0D05"/>
    <path d="M40 46 Q44 44 47 46" stroke="${skin.browHex}" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M53 46 Q56 44 60 46" stroke="${skin.browHex}" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M46 61.5 Q50 64.5 54 61.5" stroke="${skin.lipHex}" stroke-width="2" stroke-linecap="round"/>
    <circle cx="39" cy="56" r="2.5" fill="${skin.blushHex}" opacity="0.45"/>
    <circle cx="61" cy="56" r="2.5" fill="${skin.blushHex}" opacity="0.45"/>
    ${hairFrontSvg}
    ${hasHairpin ? '<circle cx="68" cy="35" r="4" fill="#D4AF37"/>' : ''}
    ${hasPearlPin ? '<circle cx="29" cy="22" r="4.5" fill="#FFFFFF" stroke="#D4AF37" stroke-width="1.5"/>' : ''}
    ${hasTiaraWaves ? '<path d="M32 27 C38 18 62 18 68 27" stroke="#D4AF37" stroke-width="2.3" fill="none"/>' : ''}
    ${hasScarf ? '<path d="M25 32 C30 15 70 15 75 32" fill="#D4AF37" stroke="#F1E5C8" stroke-width="1"/>' : ''}
    ${hasMoonEarrings ? '<circle cx="68" cy="55" r="2" fill="#D4AF37"/><circle cx="30" cy="55" r="2" fill="#D4AF37"/>' : ''}
    ${hasScrunchie ? '<circle cx="35" cy="78" r="4" fill="#D4AF37"/>' : ''}
    ${hasSunClip ? '<circle cx="32" cy="38" r="3.5" fill="#D4AF37" stroke="#F1E5C8" stroke-width="1"/>' : ''}
    ${hasSpaBand ? '<path d="M26 35 C31 16 69 16 74 35" stroke="#D4AF37" stroke-width="3.5" fill="none"/>' : ''}
    ${accs.includes('colar-conchas-gold') ? '<path d="M37 72 C41 84 59 84 63 72" stroke="#D4AF37" stroke-width="1.6" fill="none"/><circle cx="50" cy="80" r="2.5" fill="#D4AF37" stroke="#FFFFFF" stroke-width="0.8"/>' : ''}
    ${accs.includes('tiara-comemorativa-90') ? '<path d="M30 26 C36 16 64 16 70 26" stroke="#D4AF37" stroke-width="2.2" fill="none"/><path d="M33 24 Q41 15 50 15 Q59 15 67 24" stroke="#E5E7EB" stroke-width="1.3" fill="none"/><circle cx="50" cy="13" r="2" fill="#FFFFFF" stroke="#D4AF37" stroke-width="0.8"/>' : ''}
    ${accs.includes('coroa-jornada-365') ? '<path d="M31 24 C37 18 63 18 69 24" stroke="#D4AF37" stroke-width="2.8" stroke-linecap="round" fill="none"/><path d="M33 22 L36 12 L42 19 L50 8 L58 19 L64 12 L67 22" stroke="#D4AF37" stroke-width="1.8" fill="#1E1910"/><circle cx="50" cy="8" r="2.5" fill="#FFFFFF" stroke="#D4AF37" stroke-width="0.9"/>' : ''}
    ${accs.includes('broche-constelacao-ouro') ? '<circle cx="68" cy="38" r="4.5" fill="#1C1811" stroke="#D4AF37" stroke-width="1"/><polygon points="68,35 68.8,37.2 71,38 68.8,38.8 68,41 67.2,38.8 65,38 67.2,37.2" fill="#FFF1CC"/><circle cx="68" cy="38" r="1" fill="#FFFFFF"/>' : ''}
    ${accs.includes('broche-cartas-ouro') ? '<circle cx="32" cy="40" r="5" fill="#18140E" stroke="#D4AF37" stroke-width="1"/><rect x="29" y="38" width="6" height="4.5" rx="0.8" fill="#D4AF37" stroke="#FFF1CC" stroke-width="0.5"/><path d="M29 38 L32 40.5 L35 38" stroke="#1A1208" stroke-width="0.5" fill="none"/><circle cx="32" cy="40.5" r="0.7" fill="#FFFFFF"/>' : ''}
  `

  // Configuração dos 3 temas visuais: 'preto-ouro', 'branco-dourado', 'dourado-suave'
  const visualTheme = props.cardTheme || 'preto-ouro'
  const isThemeWhite = visualTheme === 'branco-dourado'
  const isThemeSoft = visualTheme === 'dourado-suave'

  const themeBgGrad = isThemeWhite
    ? `<linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FCFCFC"/>
        <stop offset="50%" stop-color="#F7F5F0"/>
        <stop offset="100%" stop-color="#ECE5D4"/>
      </linearGradient>`
    : isThemeSoft
      ? `<linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#2D2315"/>
        <stop offset="50%" stop-color="#221A0F"/>
        <stop offset="100%" stop-color="#14110C"/>
      </linearGradient>`
      : `<linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#1A1A1A"/>
        <stop offset="50%" stop-color="#0F0F0F"/>
        <stop offset="100%" stop-color="#080808"/>
      </linearGradient>`

  const themeTextMain = isThemeWhite ? '#1B1710' : '#FFFFFF'
  const themeTextSub = isThemeWhite ? '#7A6B52' : '#B3B3B3'
  const themeTextHighlight = isThemeWhite ? '#997B20' : '#F1E5C8'
  const themeCardBoxBg = isThemeWhite ? '#FFFFFF' : isThemeSoft ? '#241B10' : '#181818'
  const themeCircleBg = isThemeWhite ? '#F5EEDC' : isThemeSoft ? '#342615' : '#2A2A2A'

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 640" width="500" height="640">
  <defs>
    ${themeBgGrad}
    <linearGradient id="goldBorder" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F1E5C8"/>
      <stop offset="35%" stop-color="#D4AF37"/>
      <stop offset="70%" stop-color="#8A6E1E"/>
      <stop offset="100%" stop-color="#D4AF37"/>
    </linearGradient>
    <radialGradient id="goldGlow" cx="50%" cy="30%" r="60%">
      <stop offset="0%" stop-color="#D4AF37" stop-opacity="${isThemeWhite ? '0.15' : '0.25'}"/>
      <stop offset="100%" stop-color="#D4AF37" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- Fundo principal com cantos arredondados -->
  <rect x="10" y="10" width="480" height="620" rx="28" fill="url(#bgGrad)" stroke="url(#goldBorder)" stroke-width="3"/>
  <rect x="22" y="22" width="456" height="596" rx="20" fill="none" stroke="#D4AF37" stroke-width="1" stroke-dasharray="6 4" opacity="0.4"/>

  <!-- Halo de iluminação central -->
  <circle cx="250" cy="200" r="160" fill="url(#goldGlow)"/>

  <!-- Top Bar / Brand TRESemmé Play -->
  <g transform="translate(250, 70)">
    <text text-anchor="middle" font-family="'Playfair Display', Georgia, serif" font-size="28" font-weight="900" fill="${themeTextMain}" letter-spacing="2">TRESemmé</text>
    <rect x="85" y="-18" width="50" height="20" rx="4" fill="#D4AF37"/>
    <text x="110" y="-4" text-anchor="middle" font-family="'Inter', sans-serif" font-size="11" font-weight="800" fill="#0D0D0D" letter-spacing="1.5">PLAY</text>
  </g>

  <!-- Badge da conquista -->
  <g transform="translate(250, 115)">
    <rect x="-115" y="-14" width="230" height="28" rx="14" fill="${isThemeWhite ? '#FFFFFF' : '#242424'}" stroke="#D4AF37" stroke-width="1.2"/>
    <text text-anchor="middle" y="5" font-family="'Inter', sans-serif" font-size="10" font-weight="800" fill="${isThemeWhite ? '#997B20' : '#D4AF37'}" letter-spacing="2">${badgeText}</text>
  </g>

  <!-- Avatar Personalizado Central com Moldura Dourada -->
  <g transform="translate(250, 215)">
    <circle cx="0" cy="0" r="56" fill="${isThemeWhite ? '#F8F6F0' : '#141414'}" stroke="url(#goldBorder)" stroke-width="3"/>
    <circle cx="0" cy="0" r="50" fill="${isThemeWhite ? '#FFFFFF' : '#202020'}" stroke="#D4AF37" stroke-width="1.2" stroke-dasharray="3 3"/>
    <!-- Avatar inserido -->
    <g transform="translate(-48, -48) scale(0.96)">
      ${avatarInnerSvg}
    </g>
    <!-- Selo estrela dourada sobre o avatar -->
    <circle cx="36" cy="36" r="14" fill="#D4AF37" stroke="${isThemeWhite ? '#FFF' : '#141414'}" stroke-width="2"/>
    <text x="36" y="40" text-anchor="middle" font-family="'Inter', sans-serif" font-size="12" font-weight="900" fill="#0D0D0D">★</text>
  </g>

  <!-- Título do Ritual -->
  <text x="250" y="310" text-anchor="middle" font-family="'Playfair Display', Georgia, serif" font-size="24" font-weight="800" fill="${themeTextMain}">${missionTitle}</text>
  <text x="250" y="334" text-anchor="middle" font-family="'Inter', sans-serif" font-size="13" font-weight="500" fill="${themeTextSub}">Ritual dominado por <tspan fill="${themeTextHighlight}" font-weight="700">${userName}</tspan></text>

  <!-- Estrelas douradas -->
  <g transform="translate(20, 35)">
    ${starIcons}
  </g>

  <!-- Card com Pontos e Recompensa -->
  <g transform="translate(50, 400)">
    <rect width="400" height="110" rx="18" fill="${themeCardBoxBg}" stroke="#D4AF37" stroke-width="1.2" opacity="0.95"/>
    
    <!-- Pontos -->
    <g transform="translate(30, 28)">
      <circle cx="20" cy="24" r="16" fill="${themeCircleBg}" stroke="#D4AF37" stroke-width="1.5"/>
      <text x="20" y="30" text-anchor="middle" font-family="'Inter', sans-serif" font-size="16" font-weight="bold" fill="#D4AF37">★</text>
      <text x="50" y="22" font-family="'Inter', sans-serif" font-size="11" font-weight="600" fill="${themeTextSub}">PONTOS CONQUISTADOS</text>
      <text x="50" y="44" font-family="'Playfair Display', Georgia, serif" font-size="22" font-weight="800" fill="${themeTextHighlight}">+${points} pts</text>
    </g>

    <!-- Linha divisória -->
    <line x1="220" y1="20" x2="220" y2="90" stroke="#D4AF37" stroke-width="1" stroke-opacity="0.3"/>

    <!-- Recompensa -->
    <g transform="translate(240, 28)">
      <text x="0" y="22" font-family="'Inter', sans-serif" font-size="11" font-weight="600" fill="${themeTextSub}">RECOMPENSA</text>
      <text x="0" y="44" font-family="'Inter', sans-serif" font-size="13" font-weight="700" fill="${themeTextMain}">${rewardName}</text>
    </g>
  </g>

  ${
    hasIntention
      ? `<!-- Linha discreta de Intenção da Semana -->
  <g transform="translate(250, 532)">
    <text text-anchor="middle" font-family="'Inter', sans-serif" font-size="11" font-weight="600" fill="#D4AF37" letter-spacing="0.3">✨ Intenção da semana: <tspan fill="${themeTextHighlight}" font-weight="700">${safeIntention}</tspan></text>
  </g>
  <!-- Data e rodapé com intenção -->
  <text x="250" y="558" text-anchor="middle" font-family="'Inter', sans-serif" font-size="11" font-weight="500" fill="${themeTextSub}">Concluído em ${completedAt}</text>
  <text x="250" y="590" text-anchor="middle" font-family="'Inter', sans-serif" font-size="9" fill="${themeTextSub}">TRESemmé Play • Conceito de inovação independente</text>`
      : `<!-- Data e rodapé padrão -->
  <text x="250" y="545" text-anchor="middle" font-family="'Inter', sans-serif" font-size="11" font-weight="500" fill="${themeTextSub}">Concluído em ${completedAt}</text>
  <text x="250" y="585" text-anchor="middle" font-family="'Inter', sans-serif" font-size="9" fill="${themeTextSub}">TRESemmé Play • Conceito de inovação independente</text>`
  }
</svg>`
}

/**
 * Converte SVG para imagem PNG Blob via Canvas
 */
export async function convertSvgToPngBlob(svgString: string): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' })
    const blobURL = window.URL.createObjectURL(svgBlob)

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas')
        canvas.width = 500
        canvas.height = 640
        const ctx = canvas.getContext('2d')
        if (!ctx) {
          window.URL.revokeObjectURL(blobURL)
          reject(new Error('Canvas context unavailable'))
          return
        }
        ctx.drawImage(img, 0, 0)
        window.URL.revokeObjectURL(blobURL)

        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob)
          } else {
            reject(new Error('Falha ao gerar PNG blob'))
          }
        }, 'image/png')
      } catch (err) {
        window.URL.revokeObjectURL(blobURL)
        reject(err)
      }
    }

    img.onerror = (err) => {
      window.URL.revokeObjectURL(blobURL)
      reject(err)
    }

    img.src = blobURL
  })
}

/**
 * Realiza compartilhamento robusto com fallbacks para garantir que SEMPRE funcione
 */
export async function shareRitualCard(
  props: ShareCardProps,
  onStatusChange?: (msg: string) => void,
): Promise<'shared' | 'downloaded' | 'copied'> {
  const svgString = generateCardSvgString(props)
  const shareTitle = `TRESemmé Play - ${props.missionTitle}`
  const shareText = `Completei o ritual "${props.missionTitle}" no TRESemmé Play! Ganhei +${props.points} pontos e desbloqueei "${props.rewardName}". ★★★`

  // 1. Tentar Web Share API com arquivo PNG se suportado
  try {
    const pngBlob = await convertSvgToPngBlob(svgString)
    const file = new File(
      [pngBlob],
      `tresemme-ritual-${props.missionTitle.toLowerCase().replace(/\s+/g, '-')}.png`,
      {
        type: 'image/png',
      },
    )

    if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        title: shareTitle,
        text: shareText,
        files: [file],
      })
      onStatusChange?.('Compartilhado com sucesso!')
      return 'shared'
    }

    // 2. Se navigator.share existe mas não aceita files
    if (navigator.share) {
      await navigator.share({
        title: shareTitle,
        text: shareText,
      })
      onStatusChange?.('Texto compartilhado com sucesso!')
      return 'shared'
    }

    // 3. Fallback: Download automático da imagem PNG
    const downloadUrl = window.URL.createObjectURL(pngBlob)
    const a = document.createElement('a')
    a.href = downloadUrl
    a.download = `tresemme-ritual-${props.missionTitle.toLowerCase().replace(/\s+/g, '-')}.png`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    setTimeout(() => window.URL.revokeObjectURL(downloadUrl), 1000)
    onStatusChange?.('Card baixado como imagem PNG!')
    return 'downloaded'
  } catch (err) {
    // 4. Fallback final: Copiar texto para área de transferência
    try {
      await navigator.clipboard.writeText(`${shareText}\n\nConcluído em: ${props.completedAt}`)
      onStatusChange?.('Resumo do ritual copiado!')
      return 'copied'
    } catch {
      onStatusChange?.('Pronto!')
      return 'copied'
    }
  }
}

/**
 * Modal visual bonito com prévia do card e botões de compartilhamento
 */
export const ShareCardModal: React.FC<ShareCardProps> = (props) => {
  const { getCurrentWeekIntention, saveSharedCard } = useGame()
  const activeWeeklyIntention = props.weeklyIntention ?? getCurrentWeekIntention()?.intention
  const [selectedTheme, setSelectedTheme] = useState<CardVisualTheme>(
    props.cardTheme || 'preto-ouro',
  )

  const effectiveProps: ShareCardProps = {
    ...props,
    weeklyIntention: activeWeeklyIntention,
    cardTheme: selectedTheme,
  }

  // Atualiza ou salva no álbum ao mudar de tema ou abrir o card
  React.useEffect(() => {
    if (props.missionTitle) {
      try {
        const svgStr = generateCardSvgString(effectiveProps)
        saveSharedCard({
          missionTitle: props.missionTitle,
          points: props.points,
          stars: props.stars ?? 3,
          completedAt: props.completedAt,
          rewardName: props.rewardName,
          userName: props.userName,
          avatarId: props.avatarId,
          skinTone: props.skinTone,
          hairTexture: props.hairTexture,
          hairLength: props.hairLength,
          unlockedAccessories: props.unlockedAccessories,
          selectedAccessoryId: props.selectedAccessoryId,
          selectedAccessoriesList: props.selectedAccessoriesList,
          isRitualCompleto: props.isRitualCompleto,
          achievementType: props.achievementType,
          weeklyIntention: activeWeeklyIntention,
          svgString: svgStr,
        })
      } catch (e) {
        // Ignora silenciosamente se o svg falhar
      }
    }
  }, [props.missionTitle, selectedTheme, activeWeeklyIntention])

  const [feedback, setFeedback] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    setIsLoading(true)
    try {
      await shareRitualCard(effectiveProps, (msg) => {
        setFeedback(msg)
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownload = async () => {
    setIsLoading(true)
    try {
      const svg = generateCardSvgString(effectiveProps)
      const pngBlob = await convertSvgToPngBlob(svg)
      const url = window.URL.createObjectURL(pngBlob)
      const a = document.createElement('a')
      a.href = url
      a.download = `tresemme-ritual-${props.missionTitle.toLowerCase().replace(/\s+/g, '-')}.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      setTimeout(() => window.URL.revokeObjectURL(url), 1000)
      setFeedback('Card baixado como PNG!')
    } catch {
      setFeedback('Erro ao baixar PNG.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopyText = async () => {
    const intentionPart = activeWeeklyIntention?.trim()
      ? ` • Intenção da semana: "${activeWeeklyIntention.trim()}"`
      : ''
    const text = `Completei o ritual "${props.missionTitle}" no TRESemmé Play! Ganhei +${props.points} pontos e desbloqueei "${props.rewardName}".${intentionPart} ★★★ (${props.completedAt})`
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setFeedback('Texto copiado com sucesso!')
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setFeedback('Não foi possível copiar.')
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-card-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fade-in"
      onClick={props.onClose}
    >
      <div
        className="w-full max-w-sm rounded-3xl border border-[#D4AF37] bg-[#141414] p-5 text-center text-white shadow-[0_0_35px_rgba(212,175,55,0.25)] space-y-4 animate-scale-in relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botão fechar */}
        <button
          type="button"
          onClick={props.onClose}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors"
          aria-label="Fechar prévia de compartilhamento"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Cabeçalho */}
        <div className="space-y-1 text-center pt-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] font-bold tracking-wider uppercase">
            <Sparkles className="w-3 h-3" />
            <span>Card Visual do Ritual</span>
          </div>
          <h2 id="share-card-title" className="font-serif text-lg font-bold text-white">
            Compartilhe seu Ritual
          </h2>
        </div>

        {/* Seletor dos 3 Temas Visuais */}
        <div className="space-y-1.5 text-left">
          <span className="text-[11px] font-semibold text-[#A0A0A0] block">
            Tema Visual do Card:
          </span>
          <div className="grid grid-cols-3 gap-1.5">
            <button
              type="button"
              onClick={() => setSelectedTheme('preto-ouro')}
              className={`p-2 rounded-xl text-[11px] font-bold transition-all border flex flex-col items-center gap-1 ${
                selectedTheme === 'preto-ouro'
                  ? 'border-[#D4AF37] bg-[#D4AF37]/20 text-[#FFF1CC] shadow-sm'
                  : 'border-white/10 bg-[#1A1A1A] text-white/60 hover:text-white'
              }`}
            >
              <div className="w-5 h-5 rounded-full bg-black border border-[#D4AF37]" />
              <span>Preto & Ouro</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedTheme('branco-dourado')}
              className={`p-2 rounded-xl text-[11px] font-bold transition-all border flex flex-col items-center gap-1 ${
                selectedTheme === 'branco-dourado'
                  ? 'border-[#D4AF37] bg-[#D4AF37]/20 text-[#FFF1CC] shadow-sm'
                  : 'border-white/10 bg-[#1A1A1A] text-white/60 hover:text-white'
              }`}
            >
              <div className="w-5 h-5 rounded-full bg-[#F5F2EB] border border-[#D4AF37]" />
              <span>Branco & Ouro</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedTheme('dourado-suave')}
              className={`p-2 rounded-xl text-[11px] font-bold transition-all border flex flex-col items-center gap-1 ${
                selectedTheme === 'dourado-suave'
                  ? 'border-[#D4AF37] bg-[#D4AF37]/20 text-[#FFF1CC] shadow-sm'
                  : 'border-white/10 bg-[#1A1A1A] text-white/60 hover:text-white'
              }`}
            >
              <div className="w-5 h-5 rounded-full bg-[#2A1E11] border border-[#D4AF37]" />
              <span>Dourado Suave</span>
            </button>
          </div>
        </div>

        {/* Prévia do Card Visual (renderizado diretamente com styling dourado/preto ou do tema) */}
        <div
          className={`rounded-2xl border-2 border-[#D4AF37]/80 p-4 text-center space-y-3 shadow-inner relative overflow-hidden transition-colors ${
            selectedTheme === 'branco-dourado'
              ? 'bg-gradient-to-b from-[#FCFCFC] via-[#F6F3EC] to-[#EBE4D2] text-[#1B1710]'
              : selectedTheme === 'dourado-suave'
                ? 'bg-gradient-to-b from-[#2D2315] via-[#20180F] to-[#14100B] text-white'
                : 'bg-gradient-to-b from-[#1C1C1C] via-[#121212] to-[#0A0A0A] text-white'
          }`}
        >
          {/* Luz dourada de fundo */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-24 bg-[#D4AF37]/15 rounded-full blur-2xl pointer-events-none" />
          {/* Logo TRESemmé Play */}
          <div className="flex items-center justify-center gap-1">
            <span
              className={`font-serif text-base font-extrabold ${
                selectedTheme === 'branco-dourado' ? 'text-[#1B1710]' : 'text-white'
              }`}
            >
              TRESemmé
            </span>
            <span className="text-[9px] font-bold uppercase px-1 py-0.2 rounded bg-[#D4AF37] text-black">
              Play
            </span>
          </div>
          {/* Avatar Personalizado da Usuária com Acessórios */}
          <div className="relative inline-block mx-auto">
            <div className="w-20 h-20 rounded-full border-2 border-[#D4AF37] p-1 bg-[#1A1A1A] shadow-[0_0_18px_rgba(212,175,55,0.4)] flex items-center justify-center">
              <AvatarSvg
                id={props.avatarId || 'avatar-1'}
                skinTone={props.skinTone}
                hairTexture={props.hairTexture}
                hairLength={props.hairLength}
                unlockedAccessories={props.unlockedAccessories || []}
                selectedAccessoryId={props.selectedAccessoryId}
                selectedAccessoriesList={props.selectedAccessoriesList}
                className="w-full h-full rounded-full"
              />
            </div>
            <span
              className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#D4AF37] text-black flex items-center justify-center text-xs font-bold ring-2 ring-[#141414] shadow"
              title="Ritual Dominado"
            >
              ★
            </span>
          </div>
          <div className="space-y-0.5">
            <p
              className={`font-serif text-base font-bold ${
                selectedTheme === 'branco-dourado' ? 'text-[#2D2315]' : 'text-[#F1E5C8]'
              }`}
            >
              {props.missionTitle}
            </p>
            <p
              className={`text-[12px] ${
                selectedTheme === 'branco-dourado' ? 'text-[#77674D]' : 'text-[#A0A0A0]'
              }`}
            >
              Ritual dominado por{' '}
              <span
                className={`font-bold ${
                  selectedTheme === 'branco-dourado' ? 'text-[#1B1710]' : 'text-white'
                }`}
              >
                {props.userName || 'Visitante'}
              </span>
            </p>
          </div>
          {/* Estrelas */}
          <div className="flex items-center justify-center gap-1 text-[#D4AF37] text-xs">
            <span>★</span>
            <span>★</span>
            <span>★</span>
          </div>
          {/* Dados do ritual */}
          <div
            className={`grid grid-cols-2 gap-2 pt-2 border-t text-left p-2.5 rounded-xl ${
              selectedTheme === 'branco-dourado'
                ? 'bg-white/80 border-black/10 text-[#2B2317]'
                : 'bg-black/40 border-white/10'
            }`}
          >
            <div>
              <span
                className={`text-[9px] uppercase tracking-wider block ${
                  selectedTheme === 'branco-dourado' ? 'text-[#8A7960]' : 'text-[#888888]'
                }`}
              >
                Pontos
              </span>
              <span
                className={`font-serif text-sm font-bold ${
                  selectedTheme === 'branco-dourado' ? 'text-[#8A6E1E]' : 'text-[#F1E5C8]'
                }`}
              >
                +{props.points} pts
              </span>
            </div>
            <div>
              <span
                className={`text-[9px] uppercase tracking-wider block ${
                  selectedTheme === 'branco-dourado' ? 'text-[#8A7960]' : 'text-[#888888]'
                }`}
              >
                Recompensa
              </span>
              <span
                className={`text-[11px] font-semibold truncate block ${
                  selectedTheme === 'branco-dourado' ? 'text-[#1B1710]' : 'text-white'
                }`}
              >
                {props.rewardName || 'Acessório'}
              </span>
            </div>
          </div>
          {/* Linha discreta da Intenção da Semana (exibida apenas quando houver intenção gravada) */}
          {activeWeeklyIntention && activeWeeklyIntention.trim() && (
            <div className="pt-1">
              <div className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[11px] text-[#D4AF37] max-w-full">
                <Sparkles className="w-3 h-3 text-[#D4AF37] shrink-0" />
                <span className="font-medium text-[#D4AF37]">Intenção da semana:</span>
                <span className="font-semibold text-[#F1E5C8] truncate">
                  {activeWeeklyIntention.trim()}
                </span>
              </div>
            </div>
          )}
          <p className="text-[10px] text-[#777777]">{props.completedAt}</p>
        </div>

        {/* Feedback visual de ação */}
        {feedback && (
          <p className="text-xs text-[#D4AF37] font-semibold animate-fade-in bg-[#D4AF37]/10 py-1.5 px-3 rounded-lg border border-[#D4AF37]/30">
            {feedback}
          </p>
        )}

        {/* Botões de Ação */}
        <div className="space-y-2 pt-1">
          <button
            type="button"
            onClick={handleShare}
            disabled={isLoading}
            className="w-full min-h-[48px] rounded-xl bg-[#D4AF37] hover:bg-[#B8962E] text-[#0D0D0D] font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer"
          >
            <Share2 className="w-4 h-4 stroke-[2.5]" />
            <span>Compartilhar Card (Web Share)</span>
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleDownload}
              disabled={isLoading}
              className="min-h-[44px] rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white font-medium text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Baixar PNG</span>
            </button>

            <button
              type="button"
              onClick={handleCopyText}
              disabled={isLoading}
              className="min-h-[44px] rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white font-medium text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#81C784]" />
                  <span className="text-[#81C784]">Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Copiar texto</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
