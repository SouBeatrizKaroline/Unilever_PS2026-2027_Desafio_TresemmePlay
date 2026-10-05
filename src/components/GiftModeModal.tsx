import React, { useState } from 'react'
import {
  Gift,
  Sparkles,
  Share2,
  Download,
  Copy,
  Check,
  X,
  BookmarkCheck,
  UserPlus,
  Users,
  Palette,
  Trash2,
  Edit2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import { useGame } from '@/context/GameContext'
import { convertSvgToPngBlob } from '@/components/ShareCardModal'
import { AVATAR_OPTIONS, getSkinToneColors } from '@/components/svg/AvatarSvg'
import { AvatarId } from '@/types/game'

interface GiftModeModalProps {
  isOpen: boolean
  onClose: () => void
}

export interface PresetIncentive {
  id: string
  category: string
  text: string
}

export const PRESET_INCENTIVES: PresetIncentive[] = [
  {
    id: 'inc-merece',
    category: 'Acolhimento',
    text: 'Você merece esse momento 💛 Uma pausa para respirar e se cuidar por inteira.',
  },
  {
    id: 'inc-historia',
    category: 'Identidade',
    text: 'Seu cabelo conta a sua história e reflete a sua força única no mundo ✨',
  },
  {
    id: 'inc-carinho',
    category: 'Gentileza',
    text: 'Um carinho especial para a sua jornada: que hoje seus fios e sua mente encontrem leveza 🌿',
  },
  {
    id: 'inc-tempo',
    category: 'Paz',
    text: 'No seu tempo, no seu ritmo. O autocuidado verdadeiro não tem pressa nem cobrança 🌸',
  },
  {
    id: 'inc-brilhar',
    category: 'Brilho',
    text: 'Um lembrete dourado de que você nasceu para brilhar com a sua própria luz 🌟',
  },
  {
    id: 'inc-amor-proprio',
    category: 'Amor-próprio',
    text: 'Cuidar de você é o gesto mais bonito de amor-próprio. Comece aos poucos e sinta o aconchego 💛',
  },
  {
    id: 'inc-respiro',
    category: 'Respiração',
    text: 'Feche os olhos, respire fundo e sinta a serenidade tocar a ponta de cada mecha 💆‍♀️',
  },
  {
    id: 'inc-jornada-linda',
    category: 'Constância',
    text: 'Orgulho de ver a sua dedicação. Sua jornada de autocuidado é inspiradora e linda! 🌿',
  },
  {
    id: 'inc-brilho-ouro',
    category: 'Celebração',
    text: 'Que seu dia seja reluzente como ouro e suave como a sensação de cabelo bem tratado ✨',
  },
]

export type GiftCardTheme = 'black-gold' | 'white-gold' | 'soft-gold'

export const GiftModeModal: React.FC<GiftModeModalProps> = ({ isOpen, onClose }) => {
  const {
    journey,
    saveSharedCard,
    sentGiftsHistory,
    recordSentGift,
    favoriteFriends,
    addFavoriteFriend,
    updateFavoriteFriend,
    removeFavoriteFriend,
    sendLetterToAccount,
    currentUser,
  } = useGame()
  const isReducedMotion = journey.reducedMotion

  const [recipientEmail, setRecipientEmail] = useState<string>('')
  const [isSendingToAccount, setIsSendingToAccount] = useState<boolean>(false)
  const [accountSendStatus, setAccountSendStatus] = useState<string | null>(null)

  const [senderName, setSenderName] = useState<string>(journey.name || '')
  const [recipientName, setRecipientName] = useState<string>('')
  const [selectedMessage, setSelectedMessage] = useState<string>(PRESET_INCENTIVES[0].text)
  const [customMessage, setCustomMessage] = useState<string>('')
  const [copied, setCopied] = useState<boolean>(false)
  const [downloading, setDownloading] = useState<boolean>(false)
  const [savedToAlbum, setSavedToAlbum] = useState<boolean>(false)
  const [showHistory, setShowHistory] = useState<boolean>(false)

  // Estados do Caderno de Amigas e Pessoas Queridas
  const [showFriendsManager, setShowFriendsManager] = useState<boolean>(false)
  const [newFriendInput, setNewFriendInput] = useState<string>('')
  const [editingFriendId, setEditingFriendId] = useState<string | null>(null)
  const [editingFriendName, setEditingFriendName] = useState<string>('')
  const [friendFeedback, setFriendFeedback] = useState<string | null>(null)

  // Estados de Edição da Arte do Card
  const [cardTheme, setCardTheme] = useState<GiftCardTheme>('black-gold')
  const [showAvatar, setShowAvatar] = useState<boolean>(true)
  const [showSender, setShowSender] = useState<boolean>(true)
  const [showRecipient, setShowRecipient] = useState<boolean>(true)
  const [showIllustration, setShowIllustration] = useState<boolean>(true)
  const [showArtEditor, setShowArtEditor] = useState<boolean>(false)

  if (!isOpen) return null

  const activeMessage = customMessage.trim() ? customMessage.trim() : selectedMessage
  const activeRecipient = recipientName.trim() || 'você'
  const activeSender = senderName.trim() || journey.name || 'Com carinho'

  const showTempFeedback = (msg: string) => {
    setFriendFeedback(msg)
    setTimeout(() => setFriendFeedback(null), 3000)
  }

  // Ação: Salvar nome atual como favorita
  const handleSaveCurrentAsFriend = () => {
    const trimmed = recipientName.trim()
    if (!trimmed) {
      showTempFeedback('Digite um nome primeiro.')
      return
    }
    const added = addFavoriteFriend(trimmed)
    if (added) {
      showTempFeedback(`"${trimmed}" salva no Caderno de Afeto! 💛`)
    } else {
      showTempFeedback(`"${trimmed}" já está no seu Caderno.`)
    }
  }

  const handleAddNewFriend = () => {
    const trimmed = newFriendInput.trim()
    if (!trimmed) return
    const added = addFavoriteFriend(trimmed)
    if (added) {
      setNewFriendInput('')
      showTempFeedback(`"${trimmed}" adicionada!`)
    } else {
      showTempFeedback(`"${trimmed}" já existe no Caderno.`)
    }
  }

  const handleStartEditFriend = (id: string, current: string) => {
    setEditingFriendId(id)
    setEditingFriendName(current)
  }

  const handleSaveEditFriend = (id: string) => {
    if (!editingFriendName.trim()) return
    updateFavoriteFriend(id, editingFriendName.trim())
    setEditingFriendId(null)
    setEditingFriendName('')
    showTempFeedback('Nome atualizado!')
  }

  // Gera o SVG do Card de Presente com o Tema e Configurações de Arte Escolhidas
  const generateGiftCardSvg = (): string => {
    const escapeXml = (str: string) =>
      str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;')

    const safeRecipient = escapeXml(activeRecipient)
    const safeSender = escapeXml(activeSender)
    const safeMsg = escapeXml(activeMessage)

    // Quebra de texto simples em linhas para o SVG
    const words = safeMsg.split(' ')
    const lines: string[] = []
    let currentLine = ''
    for (const w of words) {
      if ((currentLine + ' ' + w).trim().length > 34) {
        lines.push(currentLine.trim())
        currentLine = w
      } else {
        currentLine = (currentLine + ' ' + w).trim()
      }
    }
    if (currentLine) lines.push(currentLine.trim())

    // Cores de acordo com o tema selecionado
    let bgDefinition = ''
    let outerStroke = 'url(#giftGoldGrad)'
    let innerStroke = '#D4AF37'
    let textColorBrand = '#D4AF37'
    let textColorSub = '#A0A0A0'
    let textRecipientColor = '#FFF1CC'
    let textMsgColor = '#F1E5C8'
    let msgBoxBg = '#181510'
    let msgBoxStroke = '#D4AF37'
    let senderColor = '#D4AF37'
    let quoteColor = '#D4AF37'
    let bottomTextColor = '#F1E5C8'

    if (cardTheme === 'white-gold') {
      bgDefinition = `
        <linearGradient id="giftBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FCFCFC" />
          <stop offset="50%" stop-color="#F7F5F0" />
          <stop offset="100%" stop-color="#EDE8DC" />
        </linearGradient>
      `
      outerStroke = '#D4AF37'
      innerStroke = '#997B20'
      textColorBrand = '#1C1914'
      textColorSub = '#7A6B52'
      textRecipientColor = '#241D12'
      textMsgColor = '#2B2317'
      msgBoxBg = '#FFFFFF'
      msgBoxStroke = '#D4AF37'
      senderColor = '#8A6E1E'
      quoteColor = '#D4AF37'
      bottomTextColor = '#55462D'
    } else if (cardTheme === 'soft-gold') {
      bgDefinition = `
        <linearGradient id="giftBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#2D2315" />
          <stop offset="50%" stop-color="#3A2D1B" />
          <stop offset="100%" stop-color="#1E170E" />
        </linearGradient>
      `
      outerStroke = 'url(#giftGoldGrad)'
      innerStroke = '#FFF1CC'
      textColorBrand = '#FFF1CC'
      textColorSub = '#E8D5B5'
      textRecipientColor = '#FFFFFF'
      textMsgColor = '#FFF8E7'
      msgBoxBg = '#261C10'
      msgBoxStroke = '#F1E5C8'
      senderColor = '#FFF1CC'
      quoteColor = '#FFF1CC'
      bottomTextColor = '#FFF1CC'
    } else {
      // black-gold (padrão escuro luxo)
      bgDefinition = `
        <linearGradient id="giftBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1F1A12" />
          <stop offset="50%" stop-color="#14110E" />
          <stop offset="100%" stop-color="#0A0908" />
        </linearGradient>
      `
      outerStroke = 'url(#giftGoldGrad)'
      innerStroke = '#D4AF37'
      textColorBrand = '#D4AF37'
      textColorSub = '#A0A0A0'
      textRecipientColor = '#FFF1CC'
      textMsgColor = '#F1E5C8'
      msgBoxBg = '#181510'
      msgBoxStroke = '#D4AF37'
      senderColor = '#D4AF37'
      quoteColor = '#D4AF37'
      bottomTextColor = '#F1E5C8'
    }

    // Avatar SVG inline caso ativado
    let avatarSnippet = ''
    if (showAvatar) {
      const avatarChoice = (journey.avatarId as AvatarId) || 'avatar-1'
      const meta = AVATAR_OPTIONS.find((a) => a.id === avatarChoice) || AVATAR_OPTIONS[0]
      const effectiveSkin = journey.skinTone || meta.defaultSkinTone
      const effectiveTexture = journey.hairTexture || meta.defaultTexture
      const effectiveLength = journey.hairLength || 'longo'
      const skin = getSkinToneColors(effectiveSkin)

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
      } else if (effectiveTexture === 'crespo') {
        hairBackSvg = `<circle cx="50" cy="40" r="32" fill="${hairBack}"/><circle cx="30" cy="38" r="20" fill="${hairMid}"/><circle cx="70" cy="38" r="20" fill="${hairMid}"/><circle cx="50" cy="22" r="18" fill="${hairHigh}"/>`
        hairFrontSvg = `<circle cx="38" cy="34" r="8" fill="${hairMid}"/><circle cx="62" cy="34" r="8" fill="${hairMid}"/><circle cx="50" cy="31" r="7" fill="${hairHigh}"/>`
      } else if (effectiveTexture === 'cacheado') {
        hairBackSvg = `<circle cx="30" cy="35" r="16" fill="${hairBack}"/><circle cx="70" cy="35" r="16" fill="${hairBack}"/><circle cx="24" cy="52" r="14" fill="${hairMid}"/><circle cx="76" cy="52" r="14" fill="${hairMid}"/><circle cx="50" cy="24" r="16" fill="${hairBack}"/>`
        hairFrontSvg = `<circle cx="38" cy="35" r="7" fill="${hairHigh}"/><circle cx="62" cy="35" r="7" fill="${hairHigh}"/><circle cx="50" cy="32" r="6" fill="${hairHigh}"/>`
      } else if (effectiveTexture === 'ondulado') {
        hairBackSvg = `<path d="M20 42 C18 65 24 82 28 92 C38 95 62 95 72 92 C76 82 82 65 80 42 C80 20 66 14 50 14 C34 14 20 20 20 42 Z" fill="${hairBack}"/>`
        hairFrontSvg = `<path d="M26 40 C28 25 38 18 50 18 C62 18 72 25 74 40 C68 32 58 32 50 34 Z" fill="${hairMid}"/><path d="M25 45 C30 60 28 75 32 86 C28 76 25 62 25 45 Z" fill="${hairHigh}"/><path d="M75 45 C70 60 72 75 68 86 C72 76 75 62 75 45 Z" fill="${hairHigh}"/>`
      } else {
        hairBackSvg = `<path d="M22 45 C22 25 35 15 50 15 C65 15 78 25 78 45 C78 72 74 85 70 92 C60 95 40 95 30 92 C26 85 22 72 22 45 Z" fill="${hairBack}"/>`
        hairFrontSvg = `<path d="M30 42 C30 22 40 18 50 18 C64 18 70 24 70 38 C65 30 54 28 44 32 C38 35 34 38 30 42 Z" fill="${hairMid}"/><path d="M30 40 C32 55 33 68 36 78" stroke="${hairHigh}" stroke-width="2"/><path d="M70 40 C68 55 67 68 64 78" stroke="${hairHigh}" stroke-width="2"/>`
      }

      avatarSnippet = `
        <g transform="translate(250, 105) scale(0.6)">
          <circle cx="0" cy="0" r="48" fill="#1C1811" stroke="#D4AF37" stroke-width="2.5"/>
          <g transform="translate(-50, -50)">
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
          </g>
        </g>
      `
    }

    // Ilustração decorativa mechas / presente
    let illustrationSnippet = ''
    if (showIllustration) {
      const centerY = showAvatar ? 185 : 170
      illustrationSnippet = `
        <g transform="translate(250, ${centerY})">
          <circle cx="0" cy="0" r="54" fill="#D4AF37" opacity="0.08" filter="url(#giftGlow)" />
          <circle cx="0" cy="0" r="44" fill="${cardTheme === 'white-gold' ? '#FFFFFF' : '#1C1811'}" stroke="#D4AF37" stroke-width="1.6" />
          <circle cx="0" cy="0" r="38" stroke="#F1E5C8" stroke-width="0.7" stroke-dasharray="2 3" opacity="0.6" />
          <!-- Mechas onduladas -->
          <path d="M-18 -20 C-10 -30 10 -30 18 -20 C24 -10 20 6 12 14 C6 20 0 25 -6 30 C-12 25 -18 16 -18 -20 Z" fill="none" stroke="url(#giftGoldGrad)" stroke-width="2.2" stroke-linecap="round" />
          <path d="M-8 -16 C-3 -24 10 -22 10 -12 C10 -2 4 6 0 14 C-4 20 -10 22 -12 12" fill="none" stroke="#FFF1CC" stroke-width="1.4" stroke-linecap="round" opacity="0.9" />
          <!-- Laço -->
          <path d="M-9 14 C-18 10 -16 22 -6 18 Z" fill="#D4AF37" />
          <path d="M9 14 C18 10 16 22 6 18 Z" fill="#D4AF37" />
          <circle cx="0" cy="16" r="2.5" fill="#FFF1CC" stroke="#8A6E1E" stroke-width="0.7" />
          <!-- Sparkles -->
          <path d="M34 -24 L36 -18 L42 -15 L36 -13 L34 -7 L32 -13 L26 -15 L32 -18 Z" fill="#FFF1CC" />
          <path d="M-32 16 L-30 21 L-25 23 L-30 25 L-32 30 L-34 25 L-39 23 L-34 21 Z" fill="#D4AF37" />
          <circle cx="-30" cy="-18" r="1.5" fill="#FFF" />
          <circle cx="28" cy="18" r="1.8" fill="#F1E5C8" />
        </g>
      `
    }

    const messageTspans = lines
      .slice(0, 4)
      .map((line, idx) => `<tspan x="250" dy="${idx === 0 ? 0 : 26}">${line}</tspan>`)
      .join('')

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 640" width="500" height="640">
  <defs>
    ${bgDefinition}
    <linearGradient id="giftGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF1CC" />
      <stop offset="35%" stop-color="#D4AF37" />
      <stop offset="70%" stop-color="#F1E5C8" />
      <stop offset="100%" stop-color="#997B20" />
    </linearGradient>
    <filter id="giftGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Fundo com cantos arredondados -->
  <rect width="500" height="640" rx="36" fill="url(#giftBg)" />

  <!-- Borda dupla refinada -->
  <rect x="14" y="14" width="472" height="612" rx="28" fill="none" stroke="${outerStroke}" stroke-width="2.2" opacity="0.85" />
  <rect x="22" y="22" width="456" height="596" rx="22" fill="none" stroke="${innerStroke}" stroke-width="0.8" stroke-dasharray="3 3" opacity="0.5" />

  <!-- Cantoneiras ornamentais -->
  <path d="M30 46 L30 30 L46 30" stroke="#D4AF37" stroke-width="1.8" fill="none" stroke-linecap="round" />
  <path d="M470 46 L470 30 L454 30" stroke="#D4AF37" stroke-width="1.8" fill="none" stroke-linecap="round" />
  <path d="M30 594 L30 610 L46 610" stroke="#D4AF37" stroke-width="1.8" fill="none" stroke-linecap="round" />
  <path d="M470 594 L470 610 L454 610" stroke="#D4AF37" stroke-width="1.8" fill="none" stroke-linecap="round" />

  <!-- Cabeçalho de marca -->
  <text x="250" y="48" text-anchor="middle" font-family="'Cinzel', 'Playfair Display', serif" font-size="13" font-weight="bold" fill="${textColorBrand}" letter-spacing="4">
    TRESEMMÉ PLAY
  </text>
  <text x="250" y="64" text-anchor="middle" font-family="sans-serif" font-size="9" fill="${textColorSub}" letter-spacing="2">
    PRESENTE DE AUTOCUIDADO • GENTILEZA DOURADA
  </text>

  <!-- Avatar (se ativado) -->
  ${avatarSnippet}

  <!-- Ilustração decorativa mechas / presente (se ativada) -->
  ${illustrationSnippet}

  <!-- Saudação para a pessoa presenteada (se ativada) -->
  ${
    showRecipient
      ? `<text x="250" y="${showAvatar || showIllustration ? 268 : 200}" text-anchor="middle" font-family="'Cinzel', 'Playfair Display', serif" font-size="20" font-weight="bold" fill="${textRecipientColor}">
    Para: ${safeRecipient} 💛
  </text>`
      : ''
  }

  <!-- Caixa de Mensagem -->
  <rect x="42" y="${showRecipient ? (showAvatar || showIllustration ? 288 : 220) : showAvatar || showIllustration ? 260 : 190}" width="416" height="155" rx="18" fill="${msgBoxBg}" stroke="${msgBoxStroke}" stroke-width="1" stroke-opacity="0.4" />

  <!-- Aspas decorativas -->
  <text x="65" y="${showRecipient ? (showAvatar || showIllustration ? 328 : 260) : showAvatar || showIllustration ? 300 : 230}" font-family="'Playfair Display', serif" font-size="36" fill="${quoteColor}" opacity="0.4" font-weight="bold">“</text>
  <text x="435" y="${showRecipient ? (showAvatar || showIllustration ? 425 : 357) : showAvatar || showIllustration ? 397 : 327}" font-family="'Playfair Display', serif" font-size="36" fill="${quoteColor}" opacity="0.4" font-weight="bold">”</text>

  <text x="250" y="${showRecipient ? (showAvatar || showIllustration ? 342 : 274) : showAvatar || showIllustration ? 314 : 244}" text-anchor="middle" font-family="sans-serif" font-size="14" fill="${textMsgColor}" line-height="26">
    ${messageTspans}
  </text>

  <!-- Assinatura de quem envia (se ativada) -->
  ${
    showSender
      ? `<text x="250" y="${showRecipient ? (showAvatar || showIllustration ? 478 : 410) : showAvatar || showIllustration ? 450 : 380}" text-anchor="middle" font-family="'Cinzel', 'Playfair Display', serif" font-size="13" font-weight="bold" fill="${senderColor}">
    Com carinho, ${safeSender}
  </text>
  <text x="250" y="${showRecipient ? (showAvatar || showIllustration ? 496 : 428) : showAvatar || showIllustration ? 468 : 398}" text-anchor="middle" font-family="sans-serif" font-size="10" fill="${textColorSub}">
    Incentivo ao seu ritual sagrado de autocuidado
  </text>`
      : ''
  }

  <!-- Divisor e Rodapé -->
  <line x1="80" y1="538" x2="420" y2="538" stroke="#D4AF37" stroke-width="0.8" opacity="0.3" />

  <text x="250" y="572" text-anchor="middle" font-family="'Cinzel', 'Playfair Display', serif" font-size="11" fill="${bottomTextColor}" letter-spacing="1">
    CADA FIO TEM UMA HISTÓRIA. CUIDE DA SUA.
  </text>
  <text x="250" y="592" text-anchor="middle" font-family="sans-serif" font-size="9" fill="${textColorSub}">
    tresemme.com.br • TRESemmé Play
  </text>
</svg>`
  }

  // Registra no histórico de presentes enviados
  const trackSentGift = () => {
    recordSentGift(activeMessage, recipientName.trim() || undefined)
  }

  // Gerar código único e codificado da carta para que a pessoa possa adicionar à sua Estante de Cartas
  const generateLetterCode = (): string => {
    const letterPayload = {
      senderName: activeSender,
      message: activeMessage,
      theme:
        cardTheme === 'white-gold'
          ? 'branco-dourado'
          : cardTheme === 'soft-gold'
            ? 'dourado-suave'
            : 'preto-ouro',
      avatarChoice: journey.avatarId || 'avatar-1',
    }
    const jsonStr = JSON.stringify(letterPayload)
    // Usar btoa com encodeURIComponent para lidar suavemente com acentos pt-BR
    const encoded = btoa(unescape(encodeURIComponent(jsonStr)))
    return `TP_LETTER_${encoded}`
  }

  // Ação: Copiar texto da mensagem com código da carta
  const handleCopyText = async () => {
    const letterCode = generateLetterCode()
    const textToCopy = `Para: ${activeRecipient} 💛\n\n"${activeMessage}"\n\nCom carinho, ${activeSender}\n✨ Guarde esta carta na sua Estante no TRESemmé Play usando o código:\n${letterCode}`
    try {
      await navigator.clipboard.writeText(textToCopy)
      setCopied(true)
      trackSentGift()
      setTimeout(() => setCopied(false), 2500)
    } catch {
      trackSentGift()
    }
  }

  // Ação: Baixar PNG do card de presente
  const handleDownloadPng = async () => {
    setDownloading(true)
    try {
      const svg = generateGiftCardSvg()
      const blob = await convertSvgToPngBlob(svg)
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `tresemme-presente-${activeRecipient.toLowerCase().replace(/\s+/g, '-')}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      saveGiftToAlbum(svg)
      trackSentGift()
    } catch {
      const svg = generateGiftCardSvg()
      const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `tresemme-presente-${activeRecipient.toLowerCase().replace(/\s+/g, '-')}.svg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      saveGiftToAlbum(svg)
      trackSentGift()
    } finally {
      setDownloading(false)
    }
  }

  // Ação: Compartilhamento nativo (Web Share API)
  const handleNativeShare = async () => {
    const svg = generateGiftCardSvg()
    saveGiftToAlbum(svg)
    trackSentGift()

    const letterCode = generateLetterCode()
    const textPayload = `Para: Querida ${activeRecipient} 💛\n\n"${activeMessage}"\n\nCom carinho, ${activeSender}\n✨ Adicione à sua Estante de Cartas no TRESemmé Play:\n${letterCode}`

    if (navigator.share) {
      try {
        const blob = await convertSvgToPngBlob(svg)
        const file = new File([blob], 'presente-autocuidado.png', { type: 'image/png' })
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: 'Presente de Autocuidado 💛',
            text: textPayload,
            files: [file],
          })
          return
        }
      } catch {
        // fallback
      }

      try {
        await navigator.share({
          title: 'Presente de Autocuidado 💛',
          text: textPayload,
        })
      } catch {
        // share cancelado
      }
    } else {
      handleCopyText()
    }
  }

  const saveGiftToAlbum = (svg: string) => {
    if (savedToAlbum) return
    try {
      saveSharedCard({
        missionTitle: `Presente para ${activeRecipient} 💛`,
        points: 0,
        stars: 3,
        completedAt: new Date().toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'short',
        }),
        rewardName: 'Card de Gentileza',
        userName: activeSender,
        achievementType: 'presente-amiga',
        weeklyIntention: activeMessage,
        svgString: svg,
      })
      setSavedToAlbum(true)
    } catch {
      // ignore
    }
  }

  // Verifica se uma mensagem já foi enviada no histórico
  const isMessageAlreadySent = (msgText: string) => {
    return sentGiftsHistory.some(
      (h) => h.message.trim().toLowerCase() === msgText.trim().toLowerCase(),
    )
  }

  const currentSvgPreview = generateGiftCardSvg()

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="gift-mode-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm max-h-[90vh] overflow-y-auto rounded-3xl border-2 border-[#D4AF37] bg-gradient-to-b from-[#211A11] via-[#14120E] to-[#0A0A0A] p-5 text-white shadow-[0_0_40px_rgba(212,175,55,0.35)] space-y-4 animate-scale-in relative text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow dourado */}
        <div
          className={`absolute top-0 left-1/2 -translate-x-1/2 w-48 h-32 bg-[#D4AF37]/20 rounded-full blur-3xl pointer-events-none ${
            isReducedMotion ? '' : 'animate-pulse'
          }`}
        />

        {/* Botão fechar */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors z-10"
          aria-label="Fechar Modo Presente"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Cabeçalho */}
        <div className="text-center space-y-1 pt-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37] text-black text-[11px] font-black uppercase tracking-wider shadow-md">
            <Gift className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Modo Presente</span>
          </div>
          <h2 id="gift-mode-title" className="font-serif text-xl font-bold text-white">
            Enviar um presente 💛
          </h2>
          <p className="text-xs text-[#B3B3B3]">
            Gere um card visual acolhedor de incentivo para enviar a uma pessoa querida que está
            começando ou seguindo sua jornada.
          </p>
        </div>

        {/* Notificação / Feedback de Amigas */}
        {friendFeedback && (
          <div className="text-xs text-black bg-[#D4AF37] font-semibold py-1.5 px-3 rounded-xl animate-fade-in text-center flex items-center justify-center gap-1.5 shadow-sm">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
            <span>{friendFeedback}</span>
          </div>
        )}

        {/* SEÇÃO 1: CADERNO DE AMIGAS (Favoritas com 1 toque) */}
        <div className="rounded-2xl border border-[#D4AF37]/40 bg-[#1A1610] p-3 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" />
              <span>Caderno de Amigas ({favoriteFriends.length})</span>
            </span>
            <button
              type="button"
              onClick={() => setShowFriendsManager(!showFriendsManager)}
              className="text-[10px] text-[#F1E5C8] hover:text-[#D4AF37] font-semibold flex items-center gap-1 hover:underline cursor-pointer"
            >
              <span>{showFriendsManager ? 'Fechar' : 'Gerenciar'}</span>
              {showFriendsManager ? (
                <ChevronUp className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
            </button>
          </div>

          {/* Chips de seleção rápida com um toque */}
          {favoriteFriends.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {favoriteFriends.map((friend) => {
                const isSelected = recipientName.trim().toLowerCase() === friend.name.toLowerCase()
                return (
                  <button
                    key={friend.id}
                    type="button"
                    onClick={() => setRecipientName(friend.name)}
                    className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all flex items-center gap-1 cursor-pointer min-h-[28px] ${
                      isSelected
                        ? 'bg-[#D4AF37] text-black font-bold shadow-sm'
                        : 'bg-white/10 hover:bg-white/20 text-white/90 border border-white/10'
                    }`}
                  >
                    <span>{friend.name}</span>
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  </button>
                )
              })}
            </div>
          ) : (
            <p className="text-[11px] text-neutral-400">
              Nenhum contato salvo ainda no caderno. Digite um nome e clique em &quot;Salvar&quot;
              para presentear com um toque!
            </p>
          )}

          {/* Gerenciador expandido do caderno de contatos */}
          {showFriendsManager && (
            <div className="pt-2 border-t border-white/10 space-y-2 animate-fade-in text-xs">
              <div className="flex gap-1.5">
                <input
                  type="text"
                  placeholder="Nome da pessoa querida..."
                  value={newFriendInput}
                  onChange={(e) => setNewFriendInput(e.target.value.slice(0, 24))}
                  maxLength={24}
                  className="flex-1 min-h-[34px] px-2.5 rounded-xl border border-white/15 bg-black/50 text-white text-xs placeholder-white/30 focus:outline-none focus:border-[#D4AF37]"
                />
                <button
                  type="button"
                  onClick={handleAddNewFriend}
                  className="min-h-[34px] px-3 rounded-xl bg-[#D4AF37] text-black font-bold text-xs hover:bg-[#B8962E] transition-all flex items-center gap-1 cursor-pointer"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Adicionar</span>
                </button>
              </div>

              {/* Lista detalhada para renomear e excluir */}
              <div className="max-h-36 overflow-y-auto space-y-1 pr-0.5 custom-scrollbar">
                {favoriteFriends.map((friend) => (
                  <div
                    key={friend.id}
                    className="p-1.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between gap-2"
                  >
                    {editingFriendId === friend.id ? (
                      <div className="flex items-center gap-1.5 flex-1 min-w-0">
                        <input
                          type="text"
                          value={editingFriendName}
                          onChange={(e) => setEditingFriendName(e.target.value.slice(0, 24))}
                          maxLength={24}
                          className="flex-1 px-2 py-0.5 rounded-lg border border-[#D4AF37] bg-black text-xs text-white"
                          autoFocus
                        />
                        <button
                          type="button"
                          onClick={() => handleSaveEditFriend(friend.id)}
                          className="px-2 py-0.5 rounded-lg bg-[#D4AF37] text-black font-bold text-[10px]"
                        >
                          Salvar
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingFriendId(null)}
                          className="px-1 text-neutral-400 hover:text-white"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <>
                        <span className="text-xs font-semibold text-white truncate">
                          {friend.name}
                        </span>
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleStartEditFriend(friend.id, friend.name)}
                            className="p-1 text-neutral-400 hover:text-[#D4AF37] rounded transition-colors"
                            title="Renomear contato"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeFavoriteFriend(friend.id)}
                            className="p-1 text-neutral-400 hover:text-red-400 rounded transition-colors"
                            title="Excluir do caderno"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Campos de Nome e E-mail da Conta */}
        <div className="space-y-2 text-xs">
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="friend-name-input"
                  className="text-[10px] text-[#A0A0A0] block font-semibold"
                >
                  Pessoa que vai receber (destinatário/a):
                </label>
                {recipientName.trim() &&
                  !favoriteFriends.some(
                    (f) => f.name.toLowerCase() === recipientName.trim().toLowerCase(),
                  ) && (
                    <button
                      type="button"
                      onClick={handleSaveCurrentAsFriend}
                      className="text-[9px] text-[#D4AF37] hover:underline font-bold flex items-center gap-0.5 cursor-pointer"
                    >
                      <UserPlus className="w-2.5 h-2.5" />
                      <span>Salvar</span>
                    </button>
                  )}
              </div>
              <input
                id="friend-name-input"
                type="text"
                maxLength={24}
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                placeholder="Ex.: Alex ou Mariana"
                className="w-full min-h-[38px] px-3 rounded-xl border border-white/15 bg-black/40 text-white placeholder-white/30 text-xs focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div className="space-y-1">
              <label
                htmlFor="sender-name-input"
                className="text-[10px] text-[#A0A0A0] block font-semibold"
              >
                Seu nome (remetente):
              </label>
              <input
                id="sender-name-input"
                type="text"
                maxLength={24}
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder={journey.name || 'Seu nome'}
                className="w-full min-h-[38px] px-3 rounded-xl border border-white/15 bg-black/40 text-white placeholder-white/30 text-xs focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>

          {/* Campo de e-mail para envio direto à conta da pessoa querida */}
          <div className="rounded-xl border border-[#D4AF37]/35 bg-[#1B1711] p-2.5 space-y-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="friend-account-email"
                className="text-[10px] font-bold text-[#F1E5C8] uppercase tracking-wider flex items-center gap-1"
              >
                <span>Enviar para a conta no TRESemmé Play</span>
              </label>
              <span className="text-[9px] text-[#D4AF37] font-semibold">Direto na Estante</span>
            </div>
            <div className="flex gap-1.5">
              <input
                id="friend-account-email"
                type="email"
                value={recipientEmail}
                onChange={(e) => {
                  setRecipientEmail(e.target.value)
                  setAccountSendStatus(null)
                }}
                placeholder="email-da-pessoa@exemplo.com"
                className="flex-1 min-h-[36px] px-3 rounded-lg border border-white/15 bg-black/50 text-white text-xs placeholder-white/30 focus:outline-none focus:border-[#D4AF37]"
              />
              <button
                type="button"
                disabled={!recipientEmail.trim() || isSendingToAccount}
                onClick={async () => {
                  if (!recipientEmail.trim() || !recipientEmail.includes('@')) {
                    setAccountSendStatus('Informe um e-mail válido.')
                    return
                  }
                  setIsSendingToAccount(true)
                  setAccountSendStatus(null)
                  try {
                    const res = await sendLetterToAccount({
                      recipientEmail: recipientEmail.trim(),
                      recipientName: activeRecipient,
                      message: activeMessage,
                      theme:
                        cardTheme === 'white-gold'
                          ? 'branco-dourado'
                          : cardTheme === 'soft-gold'
                            ? 'dourado-suave'
                            : 'preto-ouro',
                      avatarChoice: journey.avatarId || 'avatar-1',
                    })
                    if (res.success) {
                      setAccountSendStatus('✨ Carta entregue na Estante!')
                      trackSentGift()
                    } else {
                      setAccountSendStatus(res.error || 'Não foi possível entregar.')
                    }
                  } catch {
                    setAccountSendStatus('Erro ao enviar para a conta.')
                  } finally {
                    setIsSendingToAccount(false)
                  }
                }}
                className="min-h-[36px] px-3 rounded-lg bg-[#D4AF37] hover:bg-[#B8962E] disabled:opacity-40 text-black font-bold text-xs flex items-center gap-1 shadow-sm active:scale-95 cursor-pointer shrink-0"
              >
                <span>{isSendingToAccount ? 'Enviando...' : 'Enviar'}</span>
              </button>
            </div>
            {accountSendStatus && (
              <p
                className={`text-[10px] font-semibold ${accountSendStatus.includes('✨') ? 'text-[#81C784]' : 'text-red-400'}`}
              >
                {accountSendStatus}
              </p>
            )}
          </div>
        </div>

        {/* SEÇÃO 2: PRÉVIA AO VIVO & EDITOR DE ARTE DO CARD */}
        <div className="rounded-2xl border-2 border-[#D4AF37]/50 bg-[#16130F] p-3.5 space-y-3 shadow-inner">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="text-[10px] font-bold text-[#F1E5C8] uppercase tracking-wider">
                Prévia ao vivo & Arte do Card
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShowArtEditor(!showArtEditor)}
              className="text-[10px] text-[#D4AF37] font-bold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>{showArtEditor ? 'Ocultar opções de arte' : 'Editar Arte'}</span>
              {showArtEditor ? (
                <ChevronUp className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
            </button>
          </div>

          {/* Opções de customização da Arte */}
          {showArtEditor && (
            <div className="space-y-3 pt-1 border-t border-white/10 animate-fade-in text-xs">
              {/* Seletor de Tema Visual do Fundo */}
              <div className="space-y-1">
                <span className="text-[10px] text-[#A0A0A0] block font-semibold">
                  Tema visual do fundo:
                </span>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    type="button"
                    onClick={() => setCardTheme('black-gold')}
                    className={`py-1.5 px-2 rounded-xl text-[10px] font-bold border transition-all ${
                      cardTheme === 'black-gold'
                        ? 'border-[#D4AF37] bg-[#D4AF37] text-black shadow-sm'
                        : 'border-white/10 bg-black/50 text-white/80 hover:bg-white/10'
                    }`}
                  >
                    Preto & Ouro
                  </button>
                  <button
                    type="button"
                    onClick={() => setCardTheme('white-gold')}
                    className={`py-1.5 px-2 rounded-xl text-[10px] font-bold border transition-all ${
                      cardTheme === 'white-gold'
                        ? 'border-[#D4AF37] bg-[#D4AF37] text-black shadow-sm'
                        : 'border-white/10 bg-white/10 text-white/80 hover:bg-white/20'
                    }`}
                  >
                    Branco & Dourado
                  </button>
                  <button
                    type="button"
                    onClick={() => setCardTheme('soft-gold')}
                    className={`py-1.5 px-2 rounded-xl text-[10px] font-bold border transition-all ${
                      cardTheme === 'soft-gold'
                        ? 'border-[#D4AF37] bg-[#D4AF37] text-black shadow-sm'
                        : 'border-white/10 bg-[#352715] text-[#FFF1CC] hover:bg-[#45331B]'
                    }`}
                  >
                    Dourado Suave
                  </button>
                </div>
              </div>

              {/* Toggles de Elementos da Arte */}
              <div className="space-y-1">
                <span className="text-[10px] text-[#A0A0A0] block font-semibold">
                  Elementos que aparecem no card:
                </span>
                <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                  <label className="flex items-center gap-2 p-1.5 rounded-lg bg-black/40 border border-white/5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showAvatar}
                      onChange={(e) => setShowAvatar(e.target.checked)}
                      className="accent-[#D4AF37] w-3.5 h-3.5 rounded"
                    />
                    <span className="text-white/90">Meu Avatar</span>
                  </label>
                  <label className="flex items-center gap-2 p-1.5 rounded-lg bg-black/40 border border-white/5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showIllustration}
                      onChange={(e) => setShowIllustration(e.target.checked)}
                      className="accent-[#D4AF37] w-3.5 h-3.5 rounded"
                    />
                    <span className="text-white/90">Ilustração Dourada</span>
                  </label>
                  <label className="flex items-center gap-2 p-1.5 rounded-lg bg-black/40 border border-white/5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showRecipient}
                      onChange={(e) => setShowRecipient(e.target.checked)}
                      className="accent-[#D4AF37] w-3.5 h-3.5 rounded"
                    />
                    <span className="text-white/90">Destinatário(a)</span>
                  </label>
                  <label className="flex items-center gap-2 p-1.5 rounded-lg bg-black/40 border border-white/5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showSender}
                      onChange={(e) => setShowSender(e.target.checked)}
                      className="accent-[#D4AF37] w-3.5 h-3.5 rounded"
                    />
                    <span className="text-white/90">Remetente</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* PRÉVIA AO VIVO RENDERIZADA EM SVG */}
          <div className="w-full flex justify-center items-center overflow-hidden rounded-xl border border-[#D4AF37]/30 bg-black/40 p-2 shadow-inner">
            <div
              className="w-full max-w-[280px] aspect-[500/640] rounded-xl overflow-hidden shadow-lg transition-all"
              dangerouslySetInnerHTML={{ __html: currentSvgPreview }}
            />
          </div>
        </div>

        {/* Quadro de Incentivos: Coleção de Mensagens Acolhedoras */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider block flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-[#D4AF37]" />
              <span>Quadro de Incentivos ({PRESET_INCENTIVES.length} opções)</span>
            </span>

            {sentGiftsHistory.length > 0 && (
              <button
                type="button"
                onClick={() => setShowHistory(!showHistory)}
                className="text-[10px] text-[#D4AF37] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
              >
                <span>
                  {showHistory ? 'Ocultar histórico' : `Ver histórico (${sentGiftsHistory.length})`}
                </span>
              </button>
            )}
          </div>

          {/* Histórico retrátil de mensagens enviadas */}
          {showHistory && sentGiftsHistory.length > 0 && (
            <div className="rounded-2xl border border-[#D4AF37]/30 bg-black/50 p-3 space-y-2 animate-fade-in text-xs">
              <div className="flex items-center justify-between text-[11px] text-[#D4AF37] font-semibold border-b border-white/10 pb-1.5">
                <span>Histórico de Presentes Enviados</span>
                <span className="text-[10px] text-neutral-400">Não repita sem querer</span>
              </div>
              <div className="max-h-36 overflow-y-auto space-y-1.5 pr-1">
                {sentGiftsHistory.map((item) => (
                  <div
                    key={item.id}
                    className="p-2 rounded-xl bg-white/5 border border-white/5 text-[11px] space-y-0.5 text-neutral-300"
                  >
                    <div className="flex items-center justify-between text-[10px] text-[#D4AF37]">
                      <span>Para: {item.recipientName || 'Pessoa querida'}</span>
                      <span className="text-neutral-500">
                        {new Date(item.sentAt).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: 'short',
                        })}
                      </span>
                    </div>
                    <p className="line-clamp-2 italic text-white/90">“{item.message}”</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Galeria de Mensagens Pré-definidas do Quadro */}
          <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1 custom-scrollbar">
            {PRESET_INCENTIVES.map((item) => {
              const isSelected = selectedMessage === item.text && !customMessage.trim()
              const alreadySent = isMessageAlreadySent(item.text)
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setSelectedMessage(item.text)
                    setCustomMessage('')
                  }}
                  className={`w-full p-2.5 rounded-xl text-left text-xs transition-all border relative cursor-pointer ${
                    isSelected
                      ? 'border-[#D4AF37] bg-gradient-to-r from-[#2B2213] to-[#1C1811] text-[#FFF1CC] font-medium shadow-md'
                      : 'border-white/10 bg-white/5 hover:bg-white/10 text-white/80'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-[9px] uppercase tracking-wider font-bold text-[#D4AF37] bg-[#D4AF37]/15 px-1.5 py-0.5 rounded">
                      {item.category}
                    </span>
                    {alreadySent && (
                      <span className="text-[9px] text-[#81C784] bg-[#4CAF50]/15 border border-[#4CAF50]/30 px-1.5 py-0.5 rounded flex items-center gap-0.5 font-medium">
                        <Check className="w-2.5 h-2.5" />
                        <span>Já enviada</span>
                      </span>
                    )}
                  </div>
                  <p className="line-clamp-2 leading-relaxed">“{item.text}”</p>
                </button>
              )
            })}
          </div>

          {/* Mensagem personalizada */}
          <div className="space-y-1 pt-1">
            <div className="flex items-center justify-between">
              <label
                htmlFor="custom-gift-message"
                className="text-[10px] text-[#A0A0A0] block font-semibold"
              >
                Ou crie sua própria mensagem afetiva:
              </label>
              <span className="text-[10px] text-neutral-400 font-mono">
                {customMessage.length}/120
              </span>
            </div>
            <textarea
              id="custom-gift-message"
              rows={2}
              maxLength={120}
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              placeholder="Escreva algo único e especial para quem você ama (máx. 120 caracteres)..."
              className="w-full p-2.5 rounded-xl border border-white/15 bg-black/40 text-white placeholder-white/30 text-xs focus:outline-none focus:border-[#D4AF37] resize-none"
            />
          </div>
        </div>

        {/* Status de Salvo no Álbum */}
        {savedToAlbum && (
          <div className="flex items-center justify-center gap-1.5 text-xs text-[#81C784] font-medium">
            <BookmarkCheck className="w-4 h-4" />
            <span>Card de presente salvo no seu Álbum!</span>
          </div>
        )}

        {/* Botões de Ação */}
        <div className="space-y-2 pt-1">
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleNativeShare}
              className="min-h-[44px] rounded-xl bg-[#D4AF37] hover:bg-[#B8962E] text-black font-bold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
            >
              <Share2 className="w-4 h-4 stroke-[2.5]" />
              <span>Compartilhar</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadPng}
              disabled={downloading}
              className="min-h-[44px] rounded-xl border border-[#D4AF37] bg-white/5 hover:bg-white/10 text-[#F1E5C8] font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#D4AF37]" />
              <span>{downloading ? 'Gerando...' : 'Baixar PNG'}</span>
            </button>
          </div>

          <button
            type="button"
            onClick={handleCopyText}
            className="w-full min-h-[40px] rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-[#81C784]" />
                <span className="text-[#81C784]">Texto copiado com sucesso!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#D4AF37]" />
                <span>Copiar mensagem em texto</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
