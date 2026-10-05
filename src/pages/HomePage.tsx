import React, { useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { useGame } from '@/context/GameContext'
import type { LayoutContextType } from '@/components/Layout'
import { AvatarSvg } from '@/components/svg/AvatarSvg'
import { GoldCoinIcon, AccessorySvg } from '@/components/svg/AccessorySvg'
import { MissionThumbnailSvg } from '@/components/svg/Illustrations'
import { ACCESSORIES_LIST } from '@/types/game'
import {
  Sparkles,
  ChevronRight,
  Lock,
  CheckCircle2,
  RotateCcw,
  Clock,
  ShieldCheck,
  AlertTriangle,
  Award,
  Share2,
  Moon,
  BookHeart,
  PenLine,
  Trash2,
  Check,
  X,
  Sun,
  Flame,
  Timer,
  Download,
  Coffee,
  Target,
  Wind,
  Plus,
  Gift,
  Calendar,
  Eye,
} from 'lucide-react'
import { MISSION_DURATIONS } from '@/types/game'
import { ShareCardModal, type ShareCardProps } from '@/components/ShareCardModal'
import { RitualCompletoCelebration } from '@/components/RitualCompletoCelebration'
import {
  AchievementCelebrationModal,
  type AchievementType,
} from '@/components/AchievementCelebrationModal'
import { AchievementsSection, type AchievementItem } from '@/components/AchievementsSection'
import { exportDiaryAsPng } from '@/components/ExportDiaryModal'
import { DailyReminderCard } from '@/components/DailyReminderCard'
import { RewardPiggyBankModal } from '@/components/RewardPiggyBankModal'
import { DiaryPrintLayout } from '@/components/DiaryPrintLayout'
import { BreathingRitualModal } from '@/components/BreathingRitualModal'
import { CreateCustomRitualModal } from '@/components/CreateCustomRitualModal'
import { Printer, BookOpen, Volume2, CalendarDays } from 'lucide-react'
import { WEEKLY_RITUALS, getTodayWeeklyMission, type WeeklyMissionDay } from '@/lib/weeklyRituals'
import { StoryModeTimeline, type StoryChapter } from '@/components/StoryModeTimeline'
import { AvatarEditorModal } from '@/components/AvatarEditorModal'
import { WeeklyIntentionsMural } from '@/components/WeeklyIntentionsMural'
import { WeeklyIntentionReminderBanner } from '@/components/WeeklyIntentionReminderBanner'
import { WeeklySpaReminderBanner } from '@/components/WeeklySpaReminderBanner'
import { PerfectRitualCelebrationModal } from '@/components/PerfectRitualCelebrationModal'
import { IntentionsStatsBlock } from '@/components/IntentionsStatsBlock'
import { SharedCardsAlbumModal } from '@/components/SharedCardsAlbumModal'
import { SpaDaSemanaModal } from '@/components/SpaDaSemanaModal'
import { JourneyAnniversaryModal } from '@/components/JourneyAnniversaryModal'
import { GiftModeModal } from '@/components/GiftModeModal'
import { FriendLettersShelf } from '@/components/FriendLettersShelf'
import { DailyTipCard } from '@/components/DailyTipCard'
import { NovidadesSection } from '@/components/NovidadesSection'
import { QuickShortcutsBar } from '@/components/QuickShortcutsBar'
import type { QuickShortcutId } from '@/types/game'
import { Mail } from 'lucide-react'

export const HomePage: React.FC = () => {
  const navigate = useNavigate()
  const {
    journey,
    resetJourney,
    addOrUpdateDiaryNote,
    deleteDiaryNote,
    addCustomRitual,
    deleteCustomRitual,
    hasCompletedRitualToday,
    dismissDailyReminder,
    updateAvatarProfile,
    getLocalDateKey,
    checkPerfectRitualForDate,
    dismissPerfectRitualCelebration,
    recordWeeklyGoalReached,
    recordCollectorUnlocked,
    spaStreakCount,
    uncelebratedMilestone,
    celebrateMilestone,
    daysSinceStart,
    startDate,
    startTour,
    friendLetters,
    readLetterIds,
    setCustomShortcuts,
    recordVisit,
    getCurrentWeekIntention,
  } = useGame()
  const outletContext = useOutletContext<LayoutContextType>()

  // fallback se acessado diretamente sem outlet context
  const activeTab = outletContext?.activeTab || 'inicio'
  const setActiveTab = outletContext?.setActiveTab || (() => {})

  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false)
  const [shareCardData, setShareCardData] = useState<ShareCardProps | null>(null)
  const [showTrioCelebrationModal, setShowTrioCelebrationModal] = useState(false)
  const [activeCelebrationAchievement, setActiveCelebrationAchievement] =
    useState<AchievementType | null>(null)
  const [isExportingDiary, setIsExportingDiary] = useState(false)
  const [showExportDiaryModal, setShowExportDiaryModal] = useState(false)
  const [showPiggyBankModal, setShowPiggyBankModal] = useState(false)
  const [showBreathingModal, setShowBreathingModal] = useState(false)
  const [showCreateCustomRitualModal, setShowCreateCustomRitualModal] = useState(false)
  const [showAvatarEditorModal, setShowAvatarEditorModal] = useState(false)
  const [showPerfectCelebrationModal, setShowPerfectCelebrationModal] = useState(false)
  const [showAlbumModal, setShowAlbumModal] = useState(false)
  const [showSpaDaSemanaModal, setShowSpaDaSemanaModal] = useState(false)
  const [showAnniversaryModal, setShowAnniversaryModal] = useState(false)
  const [activeAnniversaryDays, setActiveAnniversaryDays] = useState<number | null>(null)
  const [showGiftModal, setShowGiftModal] = useState(false)
  const [showLettersModal, setShowLettersModal] = useState(false)

  // Estado para edição de nota no diário
  const [editingNoteMissionId, setEditingNoteMissionId] = useState<string | null>(null)
  const [editingNoteText, setEditingNoteText] = useState('')

  // Alternância da seção Diário: 'notas' (notas do usuário) vs 'historia' (capítulos ilustrados)
  const [diaryViewMode, setDiaryViewMode] = useState<'notas' | 'historia'>('notas')

  // Contagem de cartas não lidas da estante de afeto
  const unreadLettersCount = (friendLetters || []).filter(
    (l) => !(readLetterIds || []).includes(l.id) && !l.readAt,
  ).length

  const isBraidCompleted = journey.completedMissions.includes('tranca-simples')
  const isBunCompleted = journey.completedMissions.includes('coque-elegante')
  const isWavesCompleted = journey.completedMissions.includes('ondas-naturais')
  const isNightHydrationCompleted = journey.completedMissions.includes('hidratacao-da-noite')
  const isRelaxingMassageCompleted = journey.completedMissions.includes('massagem-relaxante')
  const isMorningHydrationCompleted = journey.completedMissions.includes('hidratacao-matinal')
  const isDayProtectionCompleted = journey.completedMissions.includes('protecao-dia')
  const isSundaySpaCompleted = journey.completedMissions.includes('spa-capilar-domingo')

  // Ritual Perfeito Hoje e Total
  const todayKey = getLocalDateKey(new Date())
  const todayPerfectStatus = checkPerfectRitualForDate(todayKey)
  const isTodayPerfect = todayPerfectStatus.isPerfect
  const perfectRitualDates = journey.perfectRitualDates || []
  const perfectRitualsTotal = perfectRitualDates.length

  // Checar se deve exibir automaticamente a celebração de Ritual Perfeito hoje
  React.useEffect(() => {
    if (isTodayPerfect && journey.lastCelebratedPerfectRitualDate !== todayKey) {
      setShowPerfectCelebrationModal(true)
    }
  }, [isTodayPerfect, todayKey, journey.lastCelebratedPerfectRitualDate])

  // Checar marco de aniversário de jornada retroativo / ao abrir
  React.useEffect(() => {
    if (uncelebratedMilestone && !showAnniversaryModal) {
      setActiveAnniversaryDays(uncelebratedMilestone)
      setShowAnniversaryModal(true)
    }
  }, [uncelebratedMilestone, showAnniversaryModal])

  // Tratar ação vinda da barra de atalhos rápidos personalizáveis ou dica do dia
  const handleShortcutAction = (shortcutId: string | QuickShortcutId) => {
    switch (shortcutId) {
      case 'spa':
        setShowSpaDaSemanaModal(true)
        break
      case 'respirar':
        setShowBreathingModal(true)
        break
      case 'diario': {
        setActiveTab('inicio')
        setDiaryViewMode('notas')
        setTimeout(() => {
          const diaryEl = document.getElementById('diario-autocuidado-section')
          if (diaryEl) {
            diaryEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        }, 50)
        break
      }
      case 'estante':
        setShowLettersModal(true)
        break
      case 'presente':
        setShowGiftModal(true)
        break
      case 'missoes':
        setActiveTab('missoes')
        break
      case 'mural': {
        setActiveTab('inicio')
        setTimeout(() => {
          const muralEl =
            document.getElementById('mural-intencoes-section') ||
            document.getElementById('weekly-intentions-heading')
          if (muralEl) {
            muralEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        }, 50)
        break
      }
      case 'album':
        setShowAlbumModal(true)
        break
      case 'acessorios':
      case 'cofrinho':
      case 'looks':
        setShowPiggyBankModal(true)
        break
      case 'avatar':
        setShowAvatarEditorModal(true)
        break
      case 'dica':
      case 'atalhos': {
        setActiveTab('inicio')
        setTimeout(() => {
          const shortcutsEl = document.getElementById('home-quick-shortcuts-section')
          if (shortcutsEl) {
            shortcutsEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        }, 50)
        break
      }
      default:
        break
    }
  }
  const isRitualCompletoUnlocked =
    Boolean(journey.ritualCompletoUnlockedAt) ||
    (isBraidCompleted && isBunCompleted && isWavesCompleted)
  const unlockedCount = journey.unlockedAccessories.length

  // Cálculo do total de minutos de autocuidado (somatório das durações dos rituais concluídos)
  const totalCareMinutes = journey.completedMissions.reduce((acc, mId) => {
    return acc + (MISSION_DURATIONS[mId] || 8)
  }, 0)

  // Cálculo da sequência de dias (streak) com base nas conclusões reais ou rituais do histórico
  const calculateStreak = () => {
    const history = journey.missionHistory || []
    if (history.length === 0 && journey.completedMissions.length === 0) {
      return 0
    }
    return Math.max(1, Math.min(journey.completedMissions.length, 7))
  }
  const currentStreak = calculateStreak()

  // Cálculo da Meta Semanal (segunda a domingo da semana corrente)
  // Meta sugerida: 5 rituais/semana
  const WEEKLY_GOAL = 5

  const calculateWeeklyRituals = () => {
    const now = new Date()
    // Determinar início da semana (segunda-feira 00:00:00)
    // No JS: getDay() -> 0 é Domingo, 1 é Segunda, ..., 6 é Sábado
    const dayOfWeek = now.getDay()
    // Distância para a segunda-feira anterior (se hoje é domingo (0), volta 6 dias; se segunda (1), volta 0; etc.)
    const diffToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1
    const monday = new Date(now)
    monday.setDate(now.getDate() - diffToMonday)
    monday.setHours(0, 0, 0, 0)

    const history = journey.missionHistory || []
    if (history.length === 0) {
      // Se concluiu missões nesta sessão sem histórico formal de data, usa o tamanho das completedMissions
      return Math.min(journey.completedMissions.length, WEEKLY_GOAL + 2)
    }

    // Contagem de rituais com carimbo que caem nesta semana corrente
    // Como completedAt pode vir formatado em pt-BR ("18 de mai., 14:30") ou ISO,
    // consideramos rituais realizados no período recente (últimos 7 dias desde a segunda-feira)
    // ou o total de missões concluídas na jornada se o histórico for menor
    return Math.min(Math.max(history.length, journey.completedMissions.length), WEEKLY_GOAL + 2)
  }

  const weeklyRitualsCompleted = calculateWeeklyRituals()
  const isWeeklyGoalReached = weeklyRitualsCompleted >= WEEKLY_GOAL
  const weeklyProgressPercent = Math.min(
    100,
    Math.round((weeklyRitualsCompleted / WEEKLY_GOAL) * 100),
  )

  const isCollectorUnlocked =
    Boolean(journey.colecionadoraUnlockedAt) || unlockedCount >= ACCESSORIES_LIST.length
  const isSemanaPerfeitaUnlocked = Boolean(journey.semanaPerfeitaUnlockedAt) || isWeeklyGoalReached

  // Efeito para garantir persistência dos desbloqueios ao carregar dados existentes
  React.useEffect(() => {
    if (isWeeklyGoalReached && !journey.semanaPerfeitaUnlockedAt) {
      recordWeeklyGoalReached()
    }
    if (unlockedCount >= ACCESSORIES_LIST.length && !journey.colecionadoraUnlockedAt) {
      recordCollectorUnlocked()
    }
  }, [
    isWeeklyGoalReached,
    unlockedCount,
    journey.semanaPerfeitaUnlockedAt,
    journey.colecionadoraUnlockedAt,
    recordWeeklyGoalReached,
    recordCollectorUnlocked,
  ])

  const achievementsList: AchievementItem[] = [
    {
      id: 'ritual-completo',
      title: 'Ritual Completo',
      category: 'Maestria de Salão',
      description: 'Conclua as 3 missões do trio original de penteados do TRESemmé Play.',
      requirement: 'Trança simples + Coque elegante + Ondas naturais',
      isUnlocked: isRitualCompletoUnlocked,
      unlockedAt: journey.ritualCompletoUnlockedAt,
      progressText: `${[isBraidCompleted, isBunCompleted, isWavesCompleted].filter(Boolean).length} de 3 concluídas`,
      progressPercent:
        ([isBraidCompleted, isBunCompleted, isWavesCompleted].filter(Boolean).length / 3) * 100,
      icon: 'award',
    },
    {
      id: 'semana-perfeita',
      title: 'Semana Perfeita',
      category: 'Constância de Autocuidado',
      description: 'Atingir a Meta Semanal de 5 rituais de autocuidado na semana corrente.',
      requirement: 'Completar 5 rituais entre segunda-feira e domingo',
      isUnlocked: isSemanaPerfeitaUnlocked,
      unlockedAt: journey.semanaPerfeitaUnlockedAt,
      progressText: `${weeklyRitualsCompleted} de ${WEEKLY_GOAL} rituais esta semana`,
      progressPercent: weeklyProgressPercent,
      icon: 'calendar',
    },
    {
      id: 'colecionadora',
      title: 'Colecionadora',
      category: 'Acervo de Estilo',
      description: `Desbloquear todos os ${ACCESSORIES_LIST.length} acessórios dourados de todas as coleções.`,
      requirement: `Colecionar todos os ${ACCESSORIES_LIST.length} acessórios do Cofrinho`,
      isUnlocked: isCollectorUnlocked,
      unlockedAt: journey.colecionadoraUnlockedAt,
      progressText: `${unlockedCount} de ${ACCESSORIES_LIST.length} acessórios obtidos`,
      progressPercent: (unlockedCount / ACCESSORIES_LIST.length) * 100,
      icon: 'layers',
    },
    {
      id: 'ritual-perfeito',
      title: 'Ritual Perfeito',
      category: 'Tríade de Autocuidado',
      description:
        'Completar no mesmo dia: ritual capilar + respiração guiada + diário de autocuidado.',
      requirement: '1 ritual + 1 respiração + 1 nota no mesmo dia',
      isUnlocked: perfectRitualsTotal > 0 || isTodayPerfect,
      unlockedAt: perfectRitualDates[0] ? `Último em ${perfectRitualDates[0]}` : undefined,
      progressText: isTodayPerfect
        ? '3 de 3 concluídos hoje! ★'
        : `${[todayPerfectStatus.hasRitual, todayPerfectStatus.hasBreathing, todayPerfectStatus.hasDiary].filter(Boolean).length} de 3 passos hoje`,
      progressPercent:
        ([
          todayPerfectStatus.hasRitual,
          todayPerfectStatus.hasBreathing,
          todayPerfectStatus.hasDiary,
        ].filter(Boolean).length /
          3) *
        100,
      icon: 'sparkles',
    },
    {
      id: 'boas-vindas-palco',
      title: 'Boas-Vindas ao Palco',
      category: 'Chegada Acolhedora',
      description: 'Conclua o passeio guiado de apresentação do app até a última etapa.',
      requirement: 'Completar o passeio guiado (5 etapas) até o final',
      isUnlocked: Boolean(journey.tourCompletedAt),
      unlockedAt: journey.tourCompletedAt,
      progressText: journey.tourCompletedAt
        ? 'Passeio completado com sucesso! ★'
        : 'Passeio guiado ainda pendente',
      progressPercent: journey.tourCompletedAt ? 100 : 0,
      icon: 'sparkles',
    },
  ]

  const handleStartMission = (missionId: string) => {
    navigate(`/missao/${missionId}`)
  }

  const handleConfirmReset = () => {
    resetJourney()
    setIsResetDialogOpen(false)
    navigate('/')
  }

  // Lista de Missões Originais (Trio de Penteados)
  const originalMissions = [
    {
      id: 'tranca-simples',
      title: 'Trança simples',
      desc: 'Penteado clássico em 4 etapas rápidas para o dia a dia.',
      type: 'braid' as const,
      status: 'available',
      isCompleted: isBraidCompleted,
      badgeLabel: isBraidCompleted ? 'Concluída (+50 pts)' : 'Disponível',
      points: 50,
      reward: 'Prenda de Cabelo Dourada',
      collection: 'original' as const,
    },
    {
      id: 'coque-elegante',
      title: 'Coque elegante',
      desc: 'Fixação firme e acabamento de salão para ocasiões especiais.',
      type: 'bun' as const,
      status: 'available',
      isCompleted: isBunCompleted,
      badgeLabel: isBunCompleted ? 'Concluída (+60 pts)' : 'Disponível',
      points: 60,
      reward: 'Pino de Pérola',
      collection: 'original' as const,
    },
    {
      id: 'ondas-naturais',
      title: 'Ondas naturais',
      desc: 'Textura acetinada, curvas leves e movimento sem frizz.',
      type: 'waves' as const,
      status: 'available',
      isCompleted: isWavesCompleted,
      badgeLabel: isWavesCompleted ? 'Concluída (+70 pts)' : 'Disponível',
      points: 70,
      reward: 'Tiara de Ondas Dourada',
      collection: 'original' as const,
    },
  ]

  // Lista de Missões da Coleção Ritual Noturno
  const nightMissions = [
    {
      id: 'hidratacao-da-noite',
      title: 'Hidratação da Noite',
      desc: 'Nutrição profunda, enluvamento noturno e proteção com lenço de cetim.',
      type: 'night-hydration' as const,
      status: 'available',
      isCompleted: isNightHydrationCompleted,
      badgeLabel: isNightHydrationCompleted ? 'Concluída (+80 pts)' : 'Disponível',
      points: 80,
      reward: 'Lenço de Cetim Dourado',
      collection: 'noturno' as const,
      stepsCount: 4,
    },
    {
      id: 'massagem-relaxante',
      title: 'Massagem Relaxante',
      desc: 'Estímulo suave da circulação, alívio de tensões e serenidade para os fios.',
      type: 'relaxing-massage' as const,
      status: 'available',
      isCompleted: isRelaxingMassageCompleted,
      badgeLabel: isRelaxingMassageCompleted ? 'Concluída (+90 pts)' : 'Disponível',
      points: 90,
      reward: 'Brincos de Meia-Lua Dourados',
      collection: 'noturno' as const,
      stepsCount: 4,
    },
  ]

  // Lista de Missões da Coleção Ritual do Despertar (Matinal, rápidas de 2 etapas)
  const morningMissions = [
    {
      id: 'hidratacao-matinal',
      title: 'Toque de Hidratação Matinal',
      desc: 'Bruma leave-in e desembarace com os dedos para acordar os fios.',
      type: 'morning-hydration' as const,
      status: 'available',
      isCompleted: isMorningHydrationCompleted,
      badgeLabel: isMorningHydrationCompleted ? 'Concluída (+40 pts)' : 'Disponível',
      points: 40,
      reward: 'Scrunchie Dourado',
      collection: 'despertar' as const,
      stepsCount: 2,
    },
    {
      id: 'protecao-dia',
      title: 'Proteção para o Dia',
      desc: 'Escudo térmico e UV com acabamento iluminado pela presilha solar.',
      type: 'day-protection' as const,
      status: 'available',
      isCompleted: isDayProtectionCompleted,
      badgeLabel: isDayProtectionCompleted ? 'Concluída (+50 pts)' : 'Disponível',
      points: 50,
      reward: 'Presilha Dourada do Amanhecer',
      collection: 'despertar' as const,
      stepsCount: 2,
    },
  ]

  // Lista de Missões da Coleção Ritual de Domingo (Temática Fim de Semana, 3 etapas de puro autocuidado)
  const sundayMissions = [
    {
      id: 'spa-capilar-domingo',
      title: 'Spa Capilar de Domingo',
      desc: 'Nutrição com óleo pré-shampoo, máscara intensiva com toalha morna e faixa spa.',
      type: 'spa-sunday' as const,
      status: 'available',
      isCompleted: isSundaySpaCompleted,
      badgeLabel: isSundaySpaCompleted ? 'Concluída (+95 pts)' : 'Disponível',
      points: 95,
      reward: 'Faixa Spa Dourada',
      collection: 'domingo' as const,
      stepsCount: 3,
    },
  ]

  // Missão de Hoje da Coleção "Ritual da Semana"
  const todayMission = getTodayWeeklyMission()
  const todayDateFormatted = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'short',
  }).format(new Date())

  // Missões rotativas da semana adaptadas para exibição
  const weeklyMissionsList = WEEKLY_RITUALS.map((wm) => {
    const isCompleted = journey.completedMissions.includes(wm.id)
    const isToday = wm.id === todayMission.id
    return {
      id: wm.id,
      title: wm.title,
      desc: wm.desc,
      dayName: wm.dayName,
      theme: wm.theme,
      type: 'braid' as const,
      status: 'available',
      isCompleted,
      isToday,
      badgeLabel: isCompleted
        ? `Concluída (+${wm.points} pts)`
        : isToday
          ? 'Missão de Hoje'
          : wm.dayName,
      points: wm.points,
      reward: wm.rewardName,
      collection: 'semana' as const,
      stepsCount: wm.steps.length,
    }
  })

  // Capítulos do Modo História (Retroativos & Motivacionais)
  const totalMissionsCompleted = journey.completedMissions.length
  const storyChapters: StoryChapter[] = [
    {
      id: 'cap-boas-vindas',
      title: 'O Despertar do Espelho',
      subtitle: 'Boas-Vindas ao Palco',
      poeticText:
        'Cada fio conta uma história de cuidado. Ao explorar e completar as etapas do seu santuário, sua jornada dourada começa sob os holofotes do autocuidado.',
      unlockedHint: 'Complete o passeio guiado de apresentação do app',
      isUnlocked: Boolean(journey.tourCompletedAt),
      unlockedAt: journey.tourCompletedAt || 'Passeio Concluído',
      svgType: 'seed-mirror',
    },
    {
      id: 'cap-primeiro-passo',
      title: 'O Fio Dourado',
      subtitle: 'Primeiro Ritual Concluído',
      poeticText:
        'O toque suave dos dedos entre as mechas, o alinhamento das pontas e a primeira respiração profunda marcaram o nascimento de uma nova rotina.',
      unlockedHint: 'Conclua seu primeiro ritual de autocuidado',
      isUnlocked: totalMissionsCompleted >= 1,
      unlockedAt:
        journey.missionHistory?.[journey.missionHistory.length - 1]?.completedAt ||
        (totalMissionsCompleted >= 1 ? 'Ritual Concluído' : undefined),
      svgType: 'golden-thread',
    },
    {
      id: 'cap-trio-completo',
      title: 'A Trindade de Salão',
      subtitle: 'Maestria do Trio Clássico',
      poeticText:
        'Da trança descontraída ao coque refinado e às ondas naturais esculpidas pelo movimento: suas mãos agora conhecem o segredo do acabamento de salão.',
      unlockedHint:
        'Conclua as 3 missões do trio original (Trança simples, Coque elegante e Ondas naturais)',
      isUnlocked: isRitualCompletoUnlocked,
      unlockedAt: journey.ritualCompletoUnlockedAt,
      svgType: 'trio-crown',
    },
    {
      id: 'cap-marco-100',
      title: 'A Aurora Dourada',
      subtitle: 'Marco de 100 Pontos Acumulados',
      poeticText:
        'Cem brilhos somados no seu cofrinho. A constância transforma pequenos minutos diários em uma aura de confiança reluzente.',
      unlockedHint: 'Acumule 100 pontos de autocuidado',
      isUnlocked: journey.points >= 100,
      unlockedAt: journey.points >= 100 ? `${journey.points} pts acumulados` : undefined,
      svgType: 'sun-sparkle',
    },
    {
      id: 'cap-ritual-semana',
      title: 'O Ritmo dos Dias',
      subtitle: 'Harmonia com o Ritual da Semana',
      poeticText:
        'Cada dia da semana traz seu próprio acorde: a limpeza de segunda, a estrela de terça, a bruma de quarta e o laço de sexta se entrelaçam em serenidade.',
      unlockedHint: 'Conclua qualquer missão da coleção Ritual da Semana',
      isUnlocked: weeklyMissionsList.some((wm) => wm.isCompleted),
      unlockedAt: weeklyMissionsList.find((wm) => wm.isCompleted)?.badgeLabel || undefined,
      svgType: 'constellation-ribbon',
    },
    {
      id: 'cap-semana-perfeita',
      title: 'A Semana Perfeita',
      subtitle: 'Constância de 5 Rituais na Semana',
      poeticText:
        'Não por obrigação, mas por amor-próprio. Cinco pausas dedicadas a você mesma floresceram em fios soltos, brilhantes e cheios de vida.',
      unlockedHint: 'Atinja a Meta Semanal completando 5 rituais',
      isUnlocked: isSemanaPerfeitaUnlocked,
      unlockedAt: journey.semanaPerfeitaUnlockedAt,
      svgType: 'calendar-bloom',
    },
    {
      id: 'cap-marco-300',
      title: 'O Cálice de Ouro',
      subtitle: 'Marco de 300 Pontos de Maestria',
      poeticText:
        'O cuidado que você planta nos fios transborda na postura, no sorriso e na leveza de cada dia.',
      unlockedHint: 'Alcance 300 pontos de autocuidado',
      isUnlocked: journey.points >= 300,
      unlockedAt: journey.points >= 300 ? `${journey.points} pts conquistados` : undefined,
      svgType: 'golden-chalice',
    },
    {
      id: 'cap-colecionadora',
      title: 'O Acervo Dourado',
      subtitle: 'Todas as Joias Desbloqueadas',
      poeticText:
        'Prendedores de estrela, tiaras onduladas, lenços de cetim, laços e coroas. Seu cofrinho é um testemunho vívido de celebração da sua beleza.',
      unlockedHint: 'Colecione todos os acessórios no Cofrinho de Recompensas',
      isUnlocked: isCollectorUnlocked,
      unlockedAt: journey.colecionadoraUnlockedAt,
      svgType: 'gem-chest',
    },
    {
      id: 'cap-mestre-ouro',
      title: 'O Palácio da Serenidade',
      subtitle: 'Marco Máximo de 500 Pontos',
      poeticText:
        'Você alcançou o equilíbrio perfeito entre sofisticação profissional e bem-estar íntimo. Seu ritual é seu santuário inviolável.',
      unlockedHint: 'Acumule 500 pontos totais de autocuidado',
      isUnlocked: journey.points >= 500,
      unlockedAt: journey.points >= 500 ? '500+ pontos alcançados' : undefined,
      svgType: 'gilded-palace',
    },
  ]

  const allMissions = [
    ...originalMissions,
    ...weeklyMissionsList,
    ...sundayMissions,
    ...nightMissions,
    ...morningMissions,
  ]

  return (
    <div className="flex-1 px-4 sm:px-6 lg:px-8 py-5 sm:py-6 flex flex-col space-y-6 animate-fade-in transition-layout">
      {/* 1. Cabeçalho de Boas-Vindas & Neuromarketing: headline de 3 segundos + valor claro */}
      <section
        aria-labelledby="profile-heading"
        className="bg-gradient-to-r from-[#17140F] via-[#12110E] to-[#0D0D0D] border border-[#D4AF37]/30 rounded-2xl lg:rounded-3xl p-4 sm:p-5 lg:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.6)] transition-all relative overflow-hidden"
      >
        {/* Luz ambiente de destaque no desktop */}
        <div className="absolute top-0 right-0 w-80 h-32 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 relative z-10">
          <div className="flex items-center gap-4">
            <div className="relative w-14 h-14 lg:w-16 lg:h-16 shrink-0 rounded-full bg-[#1A1A1A] p-0.5 border-2 border-[#D4AF37]/60 flex items-center justify-center overflow-hidden aspect-square shadow-[0_0_20px_rgba(212,175,55,0.3)]">
              <AvatarSvg
                id={journey.avatarId}
                skinTone={journey.skinTone}
                hairTexture={journey.hairTexture}
                hairLength={journey.hairLength}
                unlockedAccessories={journey.unlockedAccessories}
                selectedAccessoryId={journey.selectedAccessoryId}
                selectedAccessoriesList={journey.selectedAccessoriesList}
                className="w-full h-full rounded-full object-contain"
              />
              {(isBraidCompleted || isBunCompleted) && (
                <span
                  title="Conquista desbloqueada"
                  className="absolute -bottom-1 -right-1 w-5 h-5 lg:w-6 lg:h-6 rounded-full bg-[#D4AF37] text-[#0D0D0D] flex items-center justify-center text-[10px] lg:text-xs font-bold ring-2 ring-[#141414] shadow"
                >
                  ★
                </span>
              )}
            </div>

            <div className="text-left space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1
                  id="profile-heading"
                  className="font-serif text-lg sm:text-2xl font-bold text-white tracking-tight"
                >
                  Olá, {journey.name || 'Visitante'}
                </h1>
                <span className="hidden md:inline-block text-xs text-[#D4AF37] font-mono font-semibold">
                  • Seu ritual de autocuidado em jogo ✨
                </span>
              </div>

              <p className="text-xs text-[#C8BFAB] line-clamp-1 max-w-xl">
                Cuidado de salão, minutos para si e recompensas reais a cada conquista.
              </p>

              {/* Badges de Status, Link Sobre & Botão Enviar Presente & Passeio Guiado */}
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-mono tracking-wide px-2.5 py-0.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/35 text-[#D4AF37] font-semibold">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Acesso demonstrativo</span>
                </span>

                <button
                  type="button"
                  onClick={() => navigate('/sobre')}
                  className="text-[11px] text-[#D4AF37] hover:underline font-medium inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full hover:bg-white/5 transition-colors"
                  title="Conhecer o conceito e filosofia do TRESemmé Play"
                >
                  <span>Sobre</span>
                  <span className="text-[10px]">ℹ</span>
                </button>

                <button
                  type="button"
                  onClick={() => startTour()}
                  className="text-[11px] text-[#F1E5C8] hover:text-[#D4AF37] font-medium inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 transition-colors"
                  title="Rever o passeio guiado de apresentação do app"
                >
                  <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                  <span>Passeio guiado</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowGiftModal(true)}
                  className="text-[11px] text-[#F1E5C8] hover:text-[#D4AF37] font-semibold inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 border border-[#D4AF37]/30 transition-colors"
                  title="Enviar um presente 💛"
                >
                  <Gift className="w-3 h-3 text-[#D4AF37]" />
                  <span>Presentear 💛</span>
                </button>
              </div>
            </div>
          </div>

          {/* Saldo de Pontos em Destaque no Topo + Reset discreto */}
          <div className="flex items-center gap-3 self-end sm:self-center">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-[#1D1B17] border border-[#D4AF37]/40 shadow-sm">
              <GoldCoinIcon className="w-5 h-5" />
              <div className="text-left leading-none">
                <span className="font-mono text-sm font-bold text-[#F1E5C8] block">
                  {journey.points} pts
                </span>
                <span className="text-[9px] text-[#9A9080] font-mono">saldo atual</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsResetDialogOpen(true)}
              className="text-[11px] text-white/50 hover:text-white/80 p-2 rounded-lg hover:bg-white/5 transition-colors flex items-center gap-1"
              title="Reiniciar progresso da demonstração"
            >
              <RotateCcw className="w-3 h-3 text-[#D4AF37]" />
              <span className="hidden sm:inline">Reiniciar</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. Conteúdo alternado pelas 3 Abas */}
      {/* ABA INÍCIO (Layout de 2 colunas proporcional e harmônico no desktop, sem esticar nem criar 3 colunas) */}
      {activeTab === 'inicio' && (
        <div className="space-y-6 animate-fade-in lg:grid lg:grid-cols-12 lg:gap-8 lg:space-y-0 transition-layout">
          {/* BARRA DE ATALHOS RÁPIDOS PERSONALIZÁVEIS NO TOPO ABSOLUTO DA HOME */}
          <div id="home-quick-shortcuts-section" className="col-span-12 scroll-mt-20">
            <QuickShortcutsBar
              currentShortcuts={journey.customShortcuts}
              onSelectShortcut={handleShortcutAction}
              onSaveShortcuts={(shortcuts) => setCustomShortcuts(shortcuts)}
            />
          </div>

          {/* DICA DO DIA ROTATIVA E SEÇÃO DE NOVIDADES */}
          <div className="col-span-12 grid grid-cols-1 md:grid-cols-2 gap-4">
            <DailyTipCard onAction={handleShortcutAction} />
            <NovidadesSection
              lastVisitedAt={journey.lastVisitedAt}
              onMarkAllSeen={recordVisit}
              onActionTarget={handleShortcutAction}
            />
          </div>

          {/* BANNER / CARD HERO NO TOPO ABSOLUTO DA HOME: RITUAL DA SEMANA (Dominância visual + Neuromarketing) */}
          <div className="col-span-12">
            <section
              aria-label="Ritual da Semana - Missão de Hoje em Destaque"
              className="rounded-3xl border-2 border-[#D4AF37] bg-gradient-to-br from-[#2E2412] via-[#1E1810] to-[#100F0C] p-5 sm:p-7 shadow-[0_10px_36px_rgba(212,175,55,0.32)] relative overflow-hidden text-left"
            >
              {/* Brilhos decorativos no fundo */}
              <div className="absolute top-0 right-0 w-96 h-52 bg-[#D4AF37]/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-10 left-1/4 w-60 h-36 bg-[#D4AF37]/15 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="flex items-start sm:items-center gap-4 sm:gap-5">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#8C6D14] text-black border-2 border-[#FFF1CC]/70 flex items-center justify-center shrink-0 shadow-xl ring-4 ring-[#D4AF37]/30 transition-transform group-hover:scale-105">
                    <AccessorySvg
                      goldIconType={(todayMission.accessoryType as any) || 'star-clip'}
                      isUnlocked={journey.completedMissions.includes(todayMission.id)}
                      className="w-10 h-10 sm:w-12 sm:h-12 drop-shadow-md"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] sm:text-[11px] font-mono px-3 py-0.5 rounded-full bg-[#D4AF37] text-black font-extrabold uppercase tracking-wider shadow-sm flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-black fill-current" />
                        <span>Missão de Hoje</span>
                      </span>
                      <span className="text-[11px] font-mono text-[#D4AF37] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40">
                        {todayMission.dayName}
                      </span>
                      <span className="text-[11px] font-mono text-[#F1E5C8] capitalize font-medium flex items-center gap-1">
                        <CalendarDays className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>{todayDateFormatted}</span>
                      </span>
                      <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white/10 text-[#F1E5C8] border border-white/10">
                        {todayMission.theme}
                      </span>
                    </div>

                    <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight flex items-center gap-2 flex-wrap">
                      <span>{todayMission.title}</span>
                      {journey.completedMissions.includes(todayMission.id) && (
                        <span className="inline-flex items-center gap-1.5 text-xs font-sans font-bold text-[#D4AF37] bg-[#D4AF37]/20 px-3 py-1 rounded-full border border-[#D4AF37]/60 shadow-[0_0_12px_rgba(212,175,55,0.25)]">
                          <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                          <span>Concluída hoje ✓</span>
                        </span>
                      )}
                    </h2>

                    <p className="text-xs sm:text-sm text-[#D8CFBC] max-w-2xl leading-relaxed">
                      {todayMission.desc}
                    </p>

                    <div className="flex items-center gap-3 pt-1 flex-wrap text-xs">
                      <span className="font-bold text-[#0D0D0D] bg-[#D4AF37] px-3 py-1 rounded-lg shadow-sm">
                        +{todayMission.points} pts • {todayMission.steps.length} etapas guiadas
                      </span>
                      <span className="text-[#F1E5C8] font-medium flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-[#D4AF37]" />
                        <span>
                          Recompensa:{' '}
                          <strong className="text-white underline decoration-[#D4AF37]/60 underline-offset-2">
                            {todayMission.rewardName}
                          </strong>
                        </span>
                      </span>
                      {journey.completedMissions.includes(todayMission.id) && (
                        <span className="text-[#A7F3D0] text-xs font-medium flex items-center gap-1">
                          ✨ Dedicação concluída com brilho hoje!
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Botão de Ação Primário em Destaque Absoluto (Único dominante — Lei de Hick e Neuromarketing) */}
                <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-stretch sm:items-center gap-2.5 shrink-0 pt-2 lg:pt-0">
                  <button
                    type="button"
                    onClick={() => handleStartMission(todayMission.id)}
                    className={`min-h-[50px] px-7 rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-xl transition-all cursor-pointer ${
                      journey.completedMissions.includes(todayMission.id)
                        ? 'bg-gradient-to-r from-[#2A2312] via-[#211B10] to-[#171410] hover:bg-[#352B18] text-[#F1E5C8] border-2 border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.2)] active:scale-95'
                        : 'bg-gradient-to-r from-[#D4AF37] via-[#F3DE8A] to-[#D4AF37] hover:brightness-110 hover:shadow-[0_0_24px_rgba(212,175,55,0.5)] text-black shadow-[#D4AF37]/30 active:scale-95'
                    }`}
                  >
                    {journey.completedMissions.includes(todayMission.id) ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-[#D4AF37]" />
                        <span>Praticar Novamente</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 fill-current" />
                        <span>Iniciar Ritual de Hoje</span>
                        <ChevronRight className="w-5 h-5 stroke-[3]" />
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('missoes')}
                    className="min-h-[50px] px-4 rounded-2xl border border-[#D4AF37]/50 bg-[#14120F]/80 hover:bg-[#251F14] text-[#F1E5C8] text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition-colors"
                    title="Ver toda a programação da semana (7 rituais rotativos)"
                  >
                    <span>Ver as 7 missões</span>
                  </button>
                </div>
              </div>
            </section>
          </div>

          {/* COLUNA ESQUERDA NO DESKTOP (lg:col-span-4 xl:col-span-4): Sidebar Fixa de Progresso, Avatar, Gamificação & Neuromarketing */}
          <div className="lg:col-span-4 space-y-6 flex flex-col lg:sticky lg:top-20 lg:self-start">
            {/* Destaque Visual do Avatar Personalizado ("Bonequinha") */}
            <section
              aria-label="Seu Avatar Personalizado"
              className="rounded-3xl border border-[#D4AF37]/45 bg-gradient-to-b from-[#201A12] via-[#161411] to-[#101010] p-5 shadow-[0_6px_24px_rgba(0,0,0,0.5)] relative overflow-hidden"
            >
              {/* Brilho decorativo no topo */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-28 bg-[#D4AF37]/15 rounded-full blur-2xl pointer-events-none" />

              <div className="flex flex-col items-center gap-3.5 relative z-10 text-center">
                {/* Moldura da bonequinha grande / avatar proporcional e elegante */}
                <div className="relative shrink-0">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full border-2 border-[#D4AF37] p-1 bg-[#141414] shadow-[0_0_24px_rgba(212,175,55,0.35)] flex items-center justify-center overflow-hidden aspect-square">
                    <AvatarSvg
                      id={journey.avatarId}
                      skinTone={journey.skinTone}
                      hairTexture={journey.hairTexture}
                      hairLength={journey.hairLength}
                      unlockedAccessories={journey.unlockedAccessories}
                      selectedAccessoryId={journey.selectedAccessoryId}
                      selectedAccessoriesList={journey.selectedAccessoriesList}
                      className="w-full h-full rounded-full object-contain"
                    />
                  </div>
                  {(isBraidCompleted || isBunCompleted) && (
                    <span
                      title="Conquista desbloqueada"
                      className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#D4AF37] text-[#0D0D0D] flex items-center justify-center text-xs font-black ring-2 ring-[#141414] shadow-md"
                    >
                      ★
                    </span>
                  )}
                </div>

                {/* Informações e ações rápidas de personalização */}
                <div className="space-y-1 w-full">
                  <div className="flex items-center justify-center gap-1.5 flex-wrap">
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#F1E5C8] font-bold">
                      Seu Avatar • Salão
                    </span>
                    {journey.selectedAccessoriesList &&
                      journey.selectedAccessoriesList.length > 0 && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#10B981]/20 border border-[#10B981]/40 text-[#6EE7B7] font-semibold">
                          {journey.selectedAccessoriesList.length} peça(s)
                        </span>
                      )}
                  </div>

                  <h2 className="font-serif text-base sm:text-lg font-bold text-white">
                    {journey.name ? `Visual de ${journey.name}` : 'Seu Avatar de Autocuidado'}
                  </h2>

                  <p className="text-[11px] text-[#A0A0A0] leading-relaxed">
                    {unlockedCount > 0
                      ? `${unlockedCount} de ${ACCESSORIES_LIST.length} peças douradas desbloqueadas.`
                      : 'Complete rituais para liberar tiaras e presilhas douradas.'}
                  </p>

                  <div className="pt-2 grid grid-cols-2 gap-1.5">
                    <button
                      type="button"
                      onClick={() => setShowPiggyBankModal(true)}
                      className="min-h-[38px] px-2.5 py-1 rounded-xl bg-[#D4AF37] hover:bg-[#B8962E] text-black font-bold text-xs flex items-center justify-center gap-1 shadow-sm active:scale-95 transition-all cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>Cofrinho</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowAvatarEditorModal(true)}
                      className="min-h-[38px] px-2.5 py-1 rounded-xl border border-[#D4AF37]/50 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 text-[#F1E5C8] font-semibold text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span>Editar</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowAlbumModal(true)}
                      className="min-h-[38px] px-2.5 py-1 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      title="Ver cards compartilhados e conquistas salvas"
                    >
                      <span>Álbum ({journey.savedSharedCards?.length || 0})</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowGiftModal(true)}
                      className="min-h-[38px] px-2.5 py-1 rounded-xl border border-[#D4AF37]/40 bg-[#D4AF37]/15 hover:bg-[#D4AF37]/25 text-[#F1E5C8] font-semibold text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      title="Enviar um presente para uma pessoa querida"
                    >
                      <Gift className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Presentear</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* SEÇÃO DE ESTATÍSTICAS RÁPIDAS (Progresso & Neuromarketing) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Timer className="w-4 h-4 text-[#D4AF37]" />
                  <h3 className="font-serif text-base font-bold text-white">Suas Estatísticas</h3>
                </div>
                <span className="text-[11px] text-[#A0A0A0]">Ritmo & Dedicação</span>
              </div>

              {/* Grid 2x2 harmonioso na coluna lateral */}
              <div className="grid grid-cols-2 gap-2.5">
                {/* Sequência de Dias (Streak) */}
                <div className="rounded-2xl border border-[#D4AF37]/40 bg-[#161513] p-3 space-y-1 shadow-sm text-left relative overflow-hidden">
                  <span className="text-[9px] uppercase font-bold text-[#A0A0A0] tracking-wider block">
                    Sequência
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-serif text-xl sm:text-2xl font-black text-white">
                      {currentStreak}
                    </span>
                    <span className="text-[10px] text-[#D4AF37]">dias</span>
                  </div>
                  <p className="text-[9px] text-[#888888] line-clamp-1">Constância ativa 🔥</p>
                </div>

                {/* Rituais Perfeitos */}
                <div className="rounded-2xl border border-[#D4AF37]/40 bg-[#161513] p-3 space-y-1 shadow-sm text-left relative overflow-hidden">
                  <span className="text-[9px] uppercase font-bold text-[#A0A0A0] tracking-wider block">
                    Rituais Perfeitos
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-serif text-xl sm:text-2xl font-black text-[#D4AF37]">
                      {perfectRitualsTotal}
                    </span>
                    <span className="text-[10px] text-white/70">dias</span>
                  </div>
                  <p className="text-[9px] text-[#888888] line-clamp-1">Tríade completa</p>
                </div>

                {/* Tempo Cuidado */}
                <div className="rounded-2xl border border-[#D4AF37]/30 bg-[#161513] p-3 space-y-1 shadow-sm text-left relative overflow-hidden">
                  <span className="text-[9px] uppercase font-bold text-[#A0A0A0] tracking-wider block">
                    Tempo Cuidado
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-serif text-xl sm:text-2xl font-black text-[#F1E5C8]">
                      {totalCareMinutes}
                    </span>
                    <span className="text-[10px] text-[#D4AF37]">min</span>
                  </div>
                  <p className="text-[9px] text-[#888888] line-clamp-1">Minutos dedicados</p>
                </div>

                {/* Modo Foco */}
                <div className="rounded-2xl border border-[#D4AF37]/30 bg-[#161513] p-3 space-y-1 shadow-sm text-left relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] uppercase font-bold text-[#D4AF37] tracking-wider block truncate">
                      Modo Foco
                    </span>
                    <Eye className="w-3 h-3 text-[#D4AF37]/80 shrink-0" />
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="font-serif text-xl sm:text-2xl font-black text-[#FFF1CC]">
                      {journey.focusedMissionsCompletedCount || 0}
                    </span>
                    <span className="text-[10px] text-white/70">missões</span>
                  </div>
                  <p className="text-[9px] text-[#888888] line-clamp-1">Foco total guiado</p>
                </div>
              </div>

              {/* CARD: META SEMANAL DE RITUAIS */}
              <div
                className={`rounded-2xl border p-4 text-left transition-all relative overflow-hidden ${
                  isWeeklyGoalReached
                    ? 'border-[#D4AF37] bg-gradient-to-br from-[#241E11] via-[#1A1813] to-[#121212] shadow-[0_0_22px_rgba(212,175,55,0.22)]'
                    : 'border-white/10 bg-[#161616]'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${
                        isWeeklyGoalReached
                          ? 'bg-[#D4AF37] border-[#D4AF37] text-black shadow-md'
                          : 'bg-[#D4AF37]/15 border-[#D4AF37]/35 text-[#D4AF37]'
                      }`}
                    >
                      <Target className="w-4 h-4 stroke-[2.2]" />
                    </div>

                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <h4 className="font-serif font-bold text-sm text-white">Meta Semanal</h4>
                        <span
                          className={`text-[9px] font-mono px-2 py-0.2 rounded-full font-bold ${
                            isWeeklyGoalReached
                              ? 'bg-[#D4AF37] text-black'
                              : 'bg-white/10 text-[#F1E5C8] border border-white/5'
                          }`}
                        >
                          {isWeeklyGoalReached ? 'CONQUISTADA! ★' : 'Seg a Dom'}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#B3B3B3]">
                        {isWeeklyGoalReached
                          ? '5 de 5 rituais completados esta semana!'
                          : `${weeklyRitualsCompleted} de ${WEEKLY_GOAL} rituais concluídos.`}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span
                      className={`font-serif text-lg font-black ${
                        isWeeklyGoalReached ? 'text-[#D4AF37]' : 'text-white'
                      }`}
                    >
                      {weeklyRitualsCompleted}/{WEEKLY_GOAL}
                    </span>
                  </div>
                </div>

                {/* Barra de Progresso Dourada */}
                <div className="mt-3 pt-2.5 border-t border-white/5 space-y-1.5">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-[#888888]">Progresso da semana</span>
                    <span
                      className={`font-semibold ${
                        isWeeklyGoalReached ? 'text-[#D4AF37]' : 'text-[#F1E5C8]'
                      }`}
                    >
                      {weeklyProgressPercent}%
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ease-out ${
                        isWeeklyGoalReached
                          ? 'bg-gradient-to-r from-[#D4AF37] via-[#FFF1CC] to-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.6)]'
                          : 'bg-gradient-to-r from-[#D4AF37] to-[#F1E5C8]'
                      }`}
                      style={{ width: `${weeklyProgressPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Bloco de Estatísticas de Intenções Semanal */}
              <IntentionsStatsBlock
                intentions={journey.weeklyIntentions || []}
                onOpenMural={() => {
                  const el =
                    document.getElementById('mural-intencoes-section') ||
                    document.getElementById('weekly-intentions-heading')
                  el?.scrollIntoView({ behavior: 'smooth' })
                }}
              />
            </div>
          </div>

          {/* COLUNA DIREITA NO DESKTOP (lg:col-span-8 xl:col-span-8): Oferta Principal, Spa, Zen, Diário e Rituais */}
          <div className="lg:col-span-8 space-y-6">
            {/* LEMBRANÇA SEMANAL GENTIL DO SPA (quando nova semana começou e ainda não realizou o spa) */}
            <WeeklySpaReminderBanner onOpenSpa={() => setShowSpaDaSemanaModal(true)} />
            {/* 1. SPA DA SEMANA ELEVADO: Banner / Card Dourado com fluxo guiado completo */}
            <section
              aria-label="Spa da Semana"
              className="rounded-3xl border-2 border-[#D4AF37] bg-gradient-to-r from-[#2B2212] via-[#1E1911] to-[#14120F] p-4 sm:p-5 shadow-[0_4px_24px_rgba(212,175,55,0.22)] relative overflow-hidden text-left"
            >
              {/* Brilho decorativo */}
              <div className="absolute top-0 right-0 w-44 h-32 bg-[#D4AF37]/20 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10 text-left">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-12 h-12 rounded-2xl bg-[#D4AF37] text-black flex items-center justify-center font-bold shrink-0 shadow-md">
                    <Sparkles className="w-6 h-6 stroke-[2.4]" />
                  </div>
                  <div className="space-y-0.5 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/10 text-[#F1E5C8] font-bold border border-white/5">
                        Fluxo Guiado Completo
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#D4AF37] text-black font-extrabold">
                        Spa da Semana
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-extrabold border border-amber-500/40">
                        {spaStreakCount >= 4
                          ? `${spaStreakCount}/4 semanas seguidas 🔥`
                          : `${spaStreakCount}/4 semanas seguidas`}
                      </span>
                    </div>
                    <h3 className="font-serif text-base sm:text-lg font-bold text-white">
                      Spa da Semana ✨
                    </h3>
                    <p className="text-xs text-[#B3B3B3] line-clamp-2">
                      Intenção + massagem & máscara em 3 etapas + respiração + nota no diário. Meta:
                      4 semanas seguidas desbloqueiam o Colar de Conchas Dourado.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowSpaDaSemanaModal(true)}
                  className="w-full sm:w-auto min-h-[44px] px-5 rounded-xl bg-[#D4AF37] hover:bg-[#B8962E] text-black font-bold text-xs flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all cursor-pointer shrink-0"
                >
                  <span>Iniciar Spa Guiado</span>
                  <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>
            </section>
            {/* 2. ATALHO DIRETO ELEVADO: Momento Zen (Respiração Guiada) — CTA "Respirar agora" */}
            <section
              aria-label="Momento Zen e Respiração Guiada"
              className={`rounded-2xl border p-4 text-left transition-all relative overflow-hidden ${
                todayPerfectStatus.hasBreathing
                  ? 'border-[#81C784]/60 bg-gradient-to-r from-[#142318] via-[#111A13] to-[#0E1510] shadow-sm'
                  : 'border-2 border-[#D4AF37] bg-gradient-to-r from-[#2A2312] via-[#1C1810] to-[#12110E] shadow-[0_4px_20px_rgba(212,175,55,0.22)]'
              }`}
            >
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3.5 relative z-10">
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border ${
                      todayPerfectStatus.hasBreathing
                        ? 'bg-[#4CAF50]/20 border-[#4CAF50]/40 text-[#81C784]'
                        : 'bg-[#D4AF37] border-[#D4AF37] text-black shadow-md'
                    }`}
                  >
                    <Wind className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[9px] font-mono uppercase tracking-wider text-[#D4AF37] font-bold">
                        Momento Zen
                      </span>
                      {todayPerfectStatus.hasBreathing ? (
                        <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#4CAF50]/20 text-[#81C784] border border-[#4CAF50]/40 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Concluída hoje ✓</span>
                        </span>
                      ) : (
                        <span className="text-[9px] font-mono font-extrabold px-2 py-0.5 rounded-full bg-[#D4AF37] text-black">
                          1 a 2 min de calma
                        </span>
                      )}
                    </div>
                    <h3 className="font-serif text-sm sm:text-base font-bold text-white flex items-center gap-1.5">
                      <span>Pausa Consciente • Respiração Guiada 🌿</span>
                    </h3>
                    <p className="text-xs text-[#B3B3B3]">
                      {todayPerfectStatus.hasBreathing
                        ? 'Sua respiração de hoje já foi registrada e compõe a tríade do Ritual Perfeito.'
                        : 'Dedique um momento para inspirar e expirar. Completa o 2º passo do Ritual Perfeito!'}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowBreathingModal(true)}
                  className={`w-full sm:w-auto min-h-[42px] px-5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shrink-0 shadow-md ${
                    todayPerfectStatus.hasBreathing
                      ? 'bg-white/10 hover:bg-white/20 text-[#F1E5C8] border border-white/20'
                      : 'bg-gradient-to-r from-[#D4AF37] via-[#F3DE8A] to-[#D4AF37] hover:brightness-110 text-black shadow-[#D4AF37]/25'
                  }`}
                >
                  <Wind className="w-4 h-4" />
                  <span>
                    {todayPerfectStatus.hasBreathing ? 'Respirar Novamente' : 'Respirar agora'}
                  </span>
                </button>
              </div>
            </section>
            {/* 3. Grid de 2 Colunas: Modo Presente & Estante de Cartas com Badges Dourados de Cartões */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* 1. Quadro de Incentivos & Presente */}
              <section
                aria-label="Enviar um presente para uma pessoa querida"
                className="rounded-2xl border border-[#D4AF37]/40 bg-gradient-to-r from-[#20180F] via-[#161410] to-[#100F0D] p-3.5 flex flex-col justify-between gap-3 shadow-sm relative overflow-hidden text-left"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] flex items-center justify-center shrink-0">
                    <Gift className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-[#D4AF37] font-bold">
                      Quadro de Incentivos
                    </span>
                    <h3 className="font-serif text-sm font-bold text-white">Modo Presente 💛</h3>
                    <p className="text-[11px] text-[#A0A0A0]">
                      Crie cards de presente com temas e envie códigos para pessoas queridas.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowGiftModal(true)}
                  className="w-full min-h-[38px] px-3 rounded-xl bg-[#D4AF37] hover:bg-[#B8962E] text-black font-bold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
                >
                  <Gift className="w-3.5 h-3.5" />
                  <span>Enviar Presente</span>
                </button>
              </section>

              {/* 2. Estante de Cartas Recebidas (com contador dourado de novas cartas e Cartões Colecionáveis) */}
              <section
                aria-label="Estante de cartas recebidas de pessoas queridas"
                className="rounded-2xl border-2 border-[#D4AF37]/60 bg-gradient-to-r from-[#221A12] via-[#171410] to-[#100F0D] p-3.5 flex flex-col justify-between gap-3 shadow-[0_4px_20px_rgba(212,175,55,0.12)] relative overflow-hidden text-left"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] flex items-center justify-center shrink-0 relative">
                    <Mail className="w-5 h-5 stroke-[2.2]" />
                    {unreadLettersCount > 0 && (
                      <span
                        className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#D4AF37] text-black text-[10px] font-black flex items-center justify-center ring-2 ring-[#171410] shadow-sm animate-pulse"
                        title={`${unreadLettersCount} cartas não lidas`}
                      >
                        {unreadLettersCount}
                      </span>
                    )}
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[9px] font-mono uppercase tracking-wider text-[#D4AF37] font-bold">
                        Cartas & Afeto ({journey.friendLetters?.length || 0})
                      </span>
                      {unreadLettersCount > 0 && (
                        <span className="text-[9px] font-mono font-black px-2 py-0.5 rounded-full bg-[#D4AF37] text-black shadow-sm animate-pulse">
                          {unreadLettersCount} {unreadLettersCount === 1 ? 'nova' : 'novas'}
                        </span>
                      )}
                    </div>
                    <h3 className="font-serif text-sm font-bold text-white flex items-center gap-1.5">
                      <span>Estante de Cartas 💌</span>
                    </h3>
                    <p className="text-[11px] text-[#C5BBAA] leading-tight">
                      {unreadLettersCount > 0
                        ? `Você tem ${unreadLettersCount} carta(s) nova(s) para ler e avançar nos 4 Cartões Colecionáveis!`
                        : `Guarde mensagens de carinho e colecione os 4 Cartões Colecionáveis.`}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowLettersModal(true)}
                  className="w-full min-h-[38px] px-3 rounded-xl bg-[#1F1B14] hover:bg-[#2C241B] text-[#F1E5C8] border border-[#D4AF37]/60 font-bold text-xs flex items-center justify-between gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Abrir Estante & Cartões</span>
                  </span>
                  {unreadLettersCount > 0 ? (
                    <span className="text-[10px] font-mono font-extrabold text-black bg-[#D4AF37] px-2 py-0.5 rounded-full shadow-sm">
                      {unreadLettersCount} {unreadLettersCount === 1 ? 'nova' : 'novas'}
                    </span>
                  ) : (
                    <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
                  )}
                </button>
              </section>
            </div>
            {/* 4. MURAL DE INTENÇÕES SEMANAL DA USUÁRIA (posição de destaque clara) */}
            <WeeklyIntentionsMural />
            {/* 5. MODO HISTÓRIA & DIÁRIO DE AUTOCUIDADO (elevado com presença clara sem rolagem profunda) */}
            <div id="diario-autocuidado-section" className="space-y-3 pt-1 scroll-mt-20">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <BookHeart className="w-4 h-4 text-[#D4AF37]" />
                  <h2 className="font-serif text-lg font-bold text-white">
                    Modo História & Diário
                  </h2>
                </div>

                {/* Botões de Alternância: Modo História (Capítulos) vs Diário (Notas) */}
                <div className="flex items-center gap-1 bg-[#1A1A1A] p-1 rounded-xl border border-white/10">
                  <button
                    type="button"
                    onClick={() => setDiaryViewMode('historia')}
                    className={`min-h-[34px] px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                      diaryViewMode === 'historia'
                        ? 'bg-[#D4AF37] text-black shadow-sm font-bold'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    <BookOpen className="w-3 h-3" />
                    <span>História</span>
                    <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-black/40 text-[#D4AF37] font-bold">
                      {storyChapters.filter((c) => c.isUnlocked).length}/{storyChapters.length}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDiaryViewMode('notas')}
                    className={`min-h-[34px] px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                      diaryViewMode === 'notas'
                        ? 'bg-[#D4AF37] text-black shadow-sm font-bold'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    <PenLine className="w-3 h-3" />
                    <span>Diário</span>
                    {journey.diaryNotes && journey.diaryNotes.length > 0 && (
                      <span className="text-[10px] font-mono opacity-80">
                        ({journey.diaryNotes.length})
                      </span>
                    )}
                  </button>
                </div>
              </div>

              {/* Ações de Impressão e Exportação do Diário quando em modo 'notas' */}
              {diaryViewMode === 'notas' && (
                <div className="flex items-center justify-end gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      if (!journey.diaryNotes || journey.diaryNotes.length === 0) return
                      window.print()
                    }}
                    disabled={!journey.diaryNotes || journey.diaryNotes.length === 0}
                    className={`min-h-[36px] px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all ${
                      journey.diaryNotes && journey.diaryNotes.length > 0
                        ? 'bg-white/10 hover:bg-white/20 text-[#F1E5C8] border border-white/20 active:scale-95 cursor-pointer'
                        : 'bg-white/5 text-white/30 border border-white/5 cursor-not-allowed'
                    }`}
                    title={
                      journey.diaryNotes && journey.diaryNotes.length > 0
                        ? 'Imprimir diário em papel (layout A5)'
                        : 'Escreva pelo menos uma nota para imprimir'
                    }
                    aria-label="Imprimir diário para papel em layout A5"
                  >
                    <Printer className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Imprimir diário</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (!journey.diaryNotes || journey.diaryNotes.length === 0) return
                      setShowExportDiaryModal(true)
                    }}
                    disabled={!journey.diaryNotes || journey.diaryNotes.length === 0}
                    className={`min-h-[36px] px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all ${
                      journey.diaryNotes && journey.diaryNotes.length > 0
                        ? 'bg-[#D4AF37]/15 hover:bg-[#D4AF37] text-[#D4AF37] hover:text-[#0D0D0D] border border-[#D4AF37]/40 active:scale-95 cursor-pointer'
                        : 'bg-white/5 text-white/30 border border-white/5 cursor-not-allowed'
                    }`}
                    title={
                      journey.diaryNotes && journey.diaryNotes.length > 0
                        ? 'Exportar diário completo como imagem PNG'
                        : 'Escreva pelo menos uma nota para exportar'
                    }
                    aria-label="Exportar diário como PNG"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Exportar diário</span>
                  </button>
                </div>
              )}

              {/* Exibição do MODO HISTÓRIA ou NOTAS DO DIÁRIO */}
              {diaryViewMode === 'historia' ? (
                <StoryModeTimeline chapters={storyChapters} onOpenMission={handleStartMission} />
              ) : !journey.diaryNotes || journey.diaryNotes.length === 0 ? (
                <div className="rounded-2xl border border-white/10 bg-[#141414] p-5 text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center mx-auto text-[#D4AF37]">
                    <PenLine className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-sm font-bold text-[#F1E5C8]">
                    Seu diário está em branco
                  </h3>
                  <p className="text-xs text-[#B3B3B3] max-w-xs mx-auto leading-relaxed">
                    Ao concluir uma missão, anote como você se sentiu. Suas reflexões de bem-estar
                    ficarão guardadas aqui no seu aparelho.
                  </p>
                  <div className="pt-1">
                    <span className="inline-flex items-center gap-1 text-[11px] text-[#D4AF37]">
                      <Sparkles className="w-3 h-3" />
                      <span>Conclua um ritual para escrever sua primeira nota</span>
                    </span>
                  </div>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {journey.diaryNotes.map((note) => {
                    const isEditing = editingNoteMissionId === note.missionId

                    return (
                      <div
                        key={note.id}
                        className="rounded-2xl border border-[#D4AF37]/30 bg-[#161616] p-4 space-y-2.5 transition-all shadow-sm"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-serif font-bold text-sm text-white">
                              {note.missionTitle}
                            </h3>
                            <span className="text-[10px] text-[#888888] flex items-center gap-1 mt-0.5">
                              <Clock className="w-3 h-3 text-[#D4AF37]" />
                              <span>{note.completedAt}</span>
                              {note.updatedAt && <span className="italic">(editado)</span>}
                            </span>
                          </div>

                          <div className="flex items-center gap-1">
                            {!isEditing ? (
                              <>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingNoteMissionId(note.missionId)
                                    setEditingNoteText(note.noteText)
                                  }}
                                  className="min-h-[44px] min-w-[44px] rounded-xl text-white/70 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors"
                                  title="Editar reflexão"
                                  aria-label={`Editar nota de ${note.missionTitle}`}
                                >
                                  <PenLine className="w-4 h-4 text-[#D4AF37]" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => deleteDiaryNote(note.id)}
                                  className="min-h-[44px] min-w-[44px] rounded-xl text-white/50 hover:text-[#E57373] hover:bg-white/10 flex items-center justify-center transition-colors"
                                  title="Excluir reflexão"
                                  aria-label={`Excluir nota de ${note.missionTitle}`}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  type="button"
                                  onClick={() => {
                                    addOrUpdateDiaryNote(
                                      note.missionId,
                                      editingNoteText,
                                      note.missionTitle,
                                    )
                                    setEditingNoteMissionId(null)
                                  }}
                                  className="min-h-[44px] px-3 rounded-xl bg-[#D4AF37] text-black font-bold text-xs flex items-center gap-1 transition-all"
                                  title="Salvar alteração"
                                >
                                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                                  <span>Salvar</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setEditingNoteMissionId(null)}
                                  className="min-h-[44px] min-w-[44px] rounded-xl text-white/60 hover:text-white flex items-center justify-center"
                                  title="Cancelar edição"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </>
                            )}
                          </div>
                        </div>

                        {isEditing ? (
                          <div className="space-y-1 pt-1">
                            <textarea
                              value={editingNoteText}
                              onChange={(e) => setEditingNoteText(e.target.value.slice(0, 140))}
                              maxLength={140}
                              rows={3}
                              className="w-full text-xs p-2.5 rounded-xl bg-[#202020] text-white border border-[#D4AF37]/50 focus:outline-none focus:ring-1 focus:ring-[#D4AF37] resize-none"
                            />
                            <div className="text-right text-[10px] text-[#888888]">
                              {editingNoteText.length}/140
                            </div>
                          </div>
                        ) : (
                          <p className="text-xs text-[#EAE5D9] leading-relaxed italic bg-black/30 p-3 rounded-xl border border-white/5">
                            "{note.noteText}"
                          </p>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
            {/* NOVO: Card Especial Dourado de Aniversário de Jornada (se houver marco atingido) */}
            {daysSinceStart >= 7 && (
              <section
                aria-label="Cartão de Aniversário de Jornada"
                className="rounded-3xl border-2 border-[#D4AF37] bg-gradient-to-r from-[#2E2412] via-[#211B10] to-[#15130E] p-4 shadow-[0_4px_28px_rgba(212,175,55,0.28)] relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-36 h-28 bg-[#D4AF37]/25 rounded-full blur-2xl pointer-events-none" />
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3.5 relative z-10 text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#D4AF37] text-black flex items-center justify-center font-bold shrink-0 shadow-md">
                      <Calendar className="w-6 h-6 stroke-[2.4]" />
                    </div>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#D4AF37] text-black font-extrabold uppercase">
                          🎉 Marco de Jornada
                        </span>
                        <span className="text-[10px] text-[#F1E5C8] font-bold">
                          {daysSinceStart} dias desde o início
                        </span>
                      </div>
                      <h3 className="font-serif text-base font-bold text-white">
                        🎉{' '}
                        {daysSinceStart >= 1095
                          ? '1095'
                          : daysSinceStart >= 720
                            ? '720'
                            : daysSinceStart >= 365
                              ? '365'
                              : daysSinceStart >= 90
                                ? '90'
                                : daysSinceStart >= 30
                                  ? '30'
                                  : '7'}{' '}
                        dias de autocuidado
                      </h3>
                      <p className="text-xs text-[#B3B3B3]">
                        Celebre seu tempo dedicado a cuidar de si e dos seus fios.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const milestoneDays =
                        daysSinceStart >= 1095
                          ? 1095
                          : daysSinceStart >= 720
                            ? 720
                            : daysSinceStart >= 365
                              ? 365
                              : daysSinceStart >= 90
                                ? 90
                                : daysSinceStart >= 30
                                  ? 30
                                  : 7
                      setActiveAnniversaryDays(milestoneDays)
                      setShowAnniversaryModal(true)
                    }}
                    className="w-full sm:w-auto min-h-[42px] px-4 rounded-xl bg-[#D4AF37] hover:bg-[#B8962E] text-black font-bold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer shrink-0"
                  >
                    <Sparkles className="w-4 h-4 stroke-[2.5]" />
                    <span>Ver Celebração</span>
                  </button>
                </div>
              </section>
            )}
            {/* Status do Ritual Perfeito do Dia */}
            <section
              aria-label="Status do Ritual Perfeito Diário"
              className={`rounded-2xl border p-4 text-left transition-all relative overflow-hidden ${
                isTodayPerfect
                  ? 'border-[#D4AF37] bg-gradient-to-br from-[#2A2211] via-[#1B1812] to-[#121212] shadow-[0_0_26px_rgba(212,175,55,0.25)]'
                  : 'border-white/10 bg-[#161616]'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-11 h-11 rounded-2xl border flex items-center justify-center shrink-0 ${
                      isTodayPerfect
                        ? 'bg-[#D4AF37] border-[#D4AF37] text-black shadow-md'
                        : 'bg-[#D4AF37]/15 border-[#D4AF37]/35 text-[#D4AF37]'
                    }`}
                  >
                    <Sparkles className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-serif font-bold text-sm text-white">
                        Ritual Perfeito do Dia
                      </h3>
                      <span
                        className={`text-[9px] font-mono px-2 py-0.5 rounded-full font-bold ${
                          isTodayPerfect
                            ? 'bg-[#D4AF37] text-black'
                            : 'bg-white/10 text-[#F1E5C8] border border-white/5'
                        }`}
                      >
                        {isTodayPerfect ? 'CONQUISTADO HOJE! ★' : 'Tríade Diária'}
                      </span>
                    </div>
                    <p className="text-xs text-[#B3B3B3]">
                      {isTodayPerfect
                        ? 'Incrível! Você harmonizou missão capilar, respiração e diário hoje.'
                        : 'Complete um ritual + uma respiração + uma reflexão no diário hoje.'}
                    </p>
                  </div>
                </div>

                {isTodayPerfect && (
                  <button
                    type="button"
                    onClick={() => setShowPerfectCelebrationModal(true)}
                    className="min-h-[36px] px-3 rounded-xl bg-[#D4AF37] hover:bg-[#B8962E] text-black font-bold text-[11px] shrink-0 active:scale-95 transition-all cursor-pointer flex items-center gap-1"
                  >
                    <span>Ver Conquista</span>
                  </button>
                )}
              </div>

              {/* Três Etapas Indicadoras */}
              <div className="mt-3 pt-3 border-t border-white/5 grid grid-cols-3 gap-2 text-center text-[10px]">
                <div
                  className={`p-2 rounded-xl border flex flex-col items-center justify-center gap-1 ${
                    todayPerfectStatus.hasRitual
                      ? 'border-[#D4AF37]/60 bg-[#D4AF37]/15 text-[#F1E5C8]'
                      : 'border-white/5 bg-white/5 text-white/50'
                  }`}
                >
                  <span>
                    {todayPerfectStatus.hasRitual ? '✓ Ritual feito' : '○ Ritual capilar'}
                  </span>
                </div>

                <div
                  className={`p-2 rounded-xl border flex flex-col items-center justify-center gap-1 ${
                    todayPerfectStatus.hasBreathing
                      ? 'border-[#D4AF37]/60 bg-[#D4AF37]/15 text-[#F1E5C8]'
                      : 'border-white/5 bg-white/5 text-white/50'
                  }`}
                >
                  <span>{todayPerfectStatus.hasBreathing ? '✓ Respiração' : '○ Respiração'}</span>
                </div>

                <div
                  className={`p-2 rounded-xl border flex flex-col items-center justify-center gap-1 ${
                    todayPerfectStatus.hasDiary
                      ? 'border-[#D4AF37]/60 bg-[#D4AF37]/15 text-[#F1E5C8]'
                      : 'border-white/5 bg-white/5 text-white/50'
                  }`}
                >
                  <span>{todayPerfectStatus.hasDiary ? '✓ Diário' : '○ Diário'}</span>
                </div>
              </div>
            </section>
            {/* 1.1 Lembrete Diário In-App ("Seu ritual de hoje te espera") */}
            <DailyReminderCard
              hasCompletedToday={hasCompletedRitualToday()}
              isDismissed={
                journey.dismissedDailyReminderDate === new Date().toISOString().slice(0, 10)
              }
              onDismiss={dismissDailyReminder}
              onGoToMissions={() => setActiveTab('missoes')}
            />
            {/* SEÇÃO COMPLETA DE CONQUISTAS (Ritual Completo, Semana Perfeita, Colecionadora) */}
            <AchievementsSection
              achievements={achievementsList}
              onSelectAchievement={(type) => {
                if (type === 'ritual-completo') {
                  setShowTrioCelebrationModal(true)
                } else if (type === 'ritual-perfeito') {
                  setShowPerfectCelebrationModal(true)
                } else {
                  setActiveCelebrationAchievement(type)
                }
              }}
              onShareAchievement={(item) => {
                const dateDisplay = item.unlockedAt || 'Hoje'
                let pts = 180
                let reward = 'Medalha Mestre do Autocuidado'
                if (item.id === 'semana-perfeita') {
                  pts = 250
                  reward = 'Medalha Constância Dourada'
                } else if (item.id === 'colecionadora') {
                  pts = 350
                  reward = 'Medalha Acervo Ouro'
                } else if (item.id === 'boas-vindas-palco') {
                  pts = 100
                  reward = 'Medalha Boas-Vindas ao Palco'
                } else if (item.id === 'ritual-perfeito') {
                  pts = 200
                  reward = 'Medalha Ritual Perfeito'
                }
                setShareCardData({
                  missionTitle: item.title,
                  points: pts,
                  stars: 3,
                  completedAt: dateDisplay,
                  rewardName: reward,
                  userName: journey.name || 'Visitante',
                  avatarId: journey.avatarId,
                  skinTone: journey.skinTone,
                  hairTexture: journey.hairTexture,
                  hairLength: journey.hairLength,
                  unlockedAccessories: journey.unlockedAccessories,
                  selectedAccessoryId: journey.selectedAccessoryId,
                  selectedAccessoriesList: journey.selectedAccessoriesList,
                  isRitualCompleto: item.id === 'ritual-completo',
                  achievementType: item.id,
                  weeklyIntention: getCurrentWeekIntention()?.intention,
                })
              }}
            />{' '}
            {/* Chamada para Missões Principais */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-lg font-bold text-white">Rituais de Penteado</h2>
                  <p className="text-xs text-[#B3B3B3]">
                    Aprenda e ganhe pontos a cada etapa concluída
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('missoes')}
                  className="text-xs font-semibold text-[#D4AF37] hover:underline"
                >
                  Ver todas
                </button>
              </div>

              {/* Lista das Missões Principais (com proporção elegante no desktop 2 colunas) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {originalMissions.map((mission) => {
                  const isAvailable = mission.status === 'available'
                  return (
                    <div
                      key={mission.id}
                      onClick={isAvailable ? () => handleStartMission(mission.id) : undefined}
                      role={isAvailable ? 'button' : undefined}
                      tabIndex={isAvailable ? 0 : undefined}
                      onKeyDown={(e) => {
                        if (isAvailable && (e.key === 'Enter' || e.key === ' ')) {
                          e.preventDefault()
                          handleStartMission(mission.id)
                        }
                      }}
                      className={`w-full rounded-2xl border p-4 text-left flex items-center justify-between gap-3 transition-all ${
                        isAvailable
                          ? 'border-[#D4AF37]/40 bg-[#1A1A1A] hover:border-[#D4AF37] hover:bg-[#202020] cursor-pointer shadow-[0_2px_12px_rgba(0,0,0,0.4)] active:scale-[0.99]'
                          : 'border-white/5 bg-[#141414]/70 opacity-60 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <MissionThumbnailSvg type={mission.type} className="w-14 h-14 shrink-0" />

                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-sm text-white">{mission.title}</h3>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                isAvailable
                                  ? mission.isCompleted
                                    ? 'bg-[#4CAF50]/20 text-[#81C784] border border-[#4CAF50]/40'
                                    : 'bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40'
                                  : 'bg-white/10 text-white/50 border border-white/10'
                              }`}
                            >
                              {mission.badgeLabel}
                            </span>
                          </div>
                          <p className="text-xs text-[#B3B3B3] line-clamp-1">{mission.desc}</p>
                          <p className="text-[11px] text-[#F1E5C8]/80 flex items-center gap-1">
                            <Award className="w-3 h-3 text-[#D4AF37]" />
                            <span>Recompensa: {mission.reward}</span>
                          </p>
                        </div>
                      </div>

                      <div className="shrink-0">
                        {isAvailable ? (
                          <div className="w-9 h-9 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] flex items-center justify-center">
                            <ChevronRight className="w-5 h-5" />
                          </div>
                        ) : (
                          <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 text-white/30 flex items-center justify-center">
                            <Clock className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>{' '}
            {/* DESTAQUE NOVA COLEÇÃO "Ritual de Domingo" na Home */}
            <div className="rounded-2xl border border-[#10B981]/50 bg-gradient-to-br from-[#0F221A] via-[#141A16] to-[#0E1310] p-4 space-y-3 shadow-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#10B981]/20 border border-[#10B981]/40 flex items-center justify-center text-[#6EE7B7]">
                    <Coffee className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-serif text-sm font-bold text-white flex items-center gap-1.5">
                      <span>Ritual de Domingo • Fim de Semana</span>
                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#10B981]/30 text-[#6EE7B7] border border-[#10B981]/40 font-bold">
                        NOVA
                      </span>
                    </h3>
                    <p className="text-[11px] text-[#A7F3D0]/80">
                      Spa capilar profundo para renovar os fios no fim de semana
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('missoes')}
                  className="text-xs font-semibold text-[#6EE7B7] hover:underline"
                >
                  Explorar
                </button>
              </div>

              <div className="pt-1">
                {sundayMissions.map((sm) => (
                  <button
                    key={sm.id}
                    type="button"
                    onClick={() => handleStartMission(sm.id)}
                    className="w-full rounded-xl border border-white/10 bg-[#121E17]/90 p-3 text-left hover:border-[#10B981]/50 transition-all group flex items-center justify-between gap-3 min-h-[64px]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#10B981]/20 border border-[#10B981]/30 flex items-center justify-center text-[#6EE7B7] shrink-0">
                        <MissionThumbnailSvg type={sm.type} className="w-7 h-7" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-xs text-white group-hover:text-[#6EE7B7] transition-colors">
                            {sm.title}
                          </p>
                          <span className="text-[10px] font-bold text-[#6EE7B7] bg-[#10B981]/20 px-2 py-0.2 rounded-md">
                            +{sm.points} pts • 3 etapas
                          </span>
                        </div>
                        <p className="text-[10px] text-[#A0A0A0]">{sm.reward}</p>
                      </div>
                    </div>
                    {sm.isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-[#81C784] shrink-0" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-[#6EE7B7] shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>
            {/* Destaque Coleção "Ritual do Despertar" na Home */}
            <div className="rounded-2xl border border-[#F59E0B]/40 bg-gradient-to-br from-[#261E10] via-[#1A1610] to-[#12100C] p-4 space-y-3 shadow-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#F59E0B]/20 border border-[#F59E0B]/40 flex items-center justify-center text-[#FCD34D]">
                    <Sun className="w-4 h-4 text-[#FCD34D]" />
                  </div>
                  <div>
                    <h3 className="font-serif text-sm font-bold text-white flex items-center gap-1.5">
                      <span>Coleção Ritual do Despertar</span>
                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#F59E0B]/30 text-[#FCD34D] border border-[#F59E0B]/40">
                        NOVA
                      </span>
                    </h3>
                    <p className="text-[11px] text-[#FDE68A]/80">
                      Rituais express de 2 etapas para começar o dia radiante
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('missoes')}
                  className="text-xs font-semibold text-[#FCD34D] hover:underline"
                >
                  Explorar
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {morningMissions.map((mm) => (
                  <button
                    key={mm.id}
                    type="button"
                    onClick={() => handleStartMission(mm.id)}
                    className="rounded-xl border border-white/10 bg-[#1C1812]/90 p-3 text-left hover:border-[#F59E0B]/50 transition-all group flex flex-col justify-between min-h-[96px]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-[#FCD34D] bg-[#F59E0B]/20 px-2 py-0.5 rounded-md">
                        +{mm.points} pts • 2 etapas
                      </span>
                      {mm.isCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-[#81C784]" />}
                    </div>
                    <div className="mt-2">
                      <p className="font-semibold text-xs text-white group-hover:text-[#FCD34D] transition-colors">
                        {mm.title}
                      </p>
                      <p className="text-[10px] text-[#A0A0A0] truncate">{mm.reward}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            {/* Destaque Coleção "Ritual Noturno" na Home */}
            <div className="rounded-2xl border border-[#A78BFA]/30 bg-gradient-to-br from-[#1E192B] via-[#14131C] to-[#0E0D14] p-4 space-y-3 shadow-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#A78BFA]/20 border border-[#A78BFA]/40 flex items-center justify-center text-[#E0D4FC]">
                    <Moon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-serif text-sm font-bold text-white flex items-center gap-1.5">
                      <span>Coleção Ritual Noturno</span>
                    </h3>
                    <p className="text-[11px] text-[#C4B5FD]/80">
                      Autocuidado para acordar com fios radiantes
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('missoes')}
                  className="text-xs font-semibold text-[#E0D4FC] hover:underline"
                >
                  Explorar
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {nightMissions.map((nm) => (
                  <button
                    key={nm.id}
                    type="button"
                    onClick={() => handleStartMission(nm.id)}
                    className="rounded-xl border border-white/10 bg-[#161420]/80 p-3 text-left hover:border-[#A78BFA]/50 transition-all group flex flex-col justify-between min-h-[96px]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-[#E0D4FC] bg-[#A78BFA]/20 px-2 py-0.5 rounded-md">
                        +{nm.points} pts
                      </span>
                      {nm.isCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-[#81C784]" />}
                    </div>
                    <div className="mt-2">
                      <p className="font-semibold text-xs text-white group-hover:text-[#E0D4FC] transition-colors">
                        {nm.title}
                      </p>
                      <p className="text-[10px] text-[#999999] truncate">{nm.reward}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>{' '}
            {/* 3. Seção Histórico de Rituais Concluídos */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                  <h2 className="font-serif text-lg font-bold text-white">Rituais concluídos</h2>
                </div>
                {journey.completedMissions.length > 0 && (
                  <span className="text-xs font-semibold text-[#D4AF37] bg-[#D4AF37]/10 px-2.5 py-0.5 rounded-full border border-[#D4AF37]/30">
                    {journey.completedMissions.length}{' '}
                    {journey.completedMissions.length === 1 ? 'ritual' : 'rituais'}
                  </span>
                )}
              </div>

              {/* Lista ou Estado Vazio */}
              {journey.completedMissions.length === 0 ? (
                <div className="rounded-2xl border border-white/10 bg-[#141414] p-5 text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center mx-auto text-[#D4AF37]">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-sm font-bold text-[#F1E5C8]">
                    Nenhum ritual ainda
                  </h3>
                  <p className="text-xs text-[#B3B3B3] max-w-xs mx-auto leading-relaxed">
                    Sua primeira trança espera por você. Escolha um ritual acima para iniciar sua
                    jornada e desbloquear estrelas.
                  </p>
                  <button
                    type="button"
                    onClick={() => handleStartMission('tranca-simples')}
                    className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#D4AF37] text-[#0D0D0D] font-bold text-xs hover:bg-[#B8962E] transition-all min-h-[44px]"
                  >
                    <span>Começar Trança simples</span>
                    <ChevronRight className="w-4 h-4 stroke-[3]" />
                  </button>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {allMissions
                    .filter((m) => m.isCompleted)
                    .map((m) => {
                      const historyItem = journey.missionHistory?.find((h) => h.missionId === m.id)
                      const dateDisplay = historyItem?.completedAt || 'Hoje'
                      const missionNote = journey.diaryNotes?.find((n) => n.missionId === m.id)

                      return (
                        <div
                          key={m.id}
                          className="rounded-2xl border border-[#D4AF37]/30 bg-[#161616] p-3.5 space-y-2.5 shadow-sm hover:border-[#D4AF37]/60 transition-colors"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] shrink-0">
                                <MissionThumbnailSvg type={m.type} className="w-8 h-8" />
                              </div>

                              <div className="space-y-0.5 text-left">
                                <div className="flex items-center gap-1.5">
                                  <h3 className="font-serif font-bold text-sm text-white">
                                    {m.title}
                                  </h3>
                                  {m.collection === 'noturno' && (
                                    <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#A78BFA]/20 text-[#E0D4FC] border border-[#A78BFA]/30">
                                      Noturno
                                    </span>
                                  )}
                                  {m.collection === 'despertar' && (
                                    <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#F59E0B]/20 text-[#FCD34D] border border-[#F59E0B]/30">
                                      Despertar
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center gap-2 text-[11px] text-[#A0A0A0]">
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3 text-[#D4AF37]" />
                                    <span>{dateDisplay}</span>
                                  </span>
                                  <span>•</span>
                                  <span className="text-[#F1E5C8]">+{m.points} pts</span>
                                </div>
                              </div>
                            </div>

                            {/* Ações: Estrelas + Botão Compartilhar */}
                            <div className="flex items-center gap-2 shrink-0">
                              <div
                                className="flex items-center gap-1 bg-[#1F1F1F] px-2.5 py-1.5 rounded-xl border border-white/10"
                                title="3 estrelas de conquista"
                                aria-label="3 estrelas de conquista"
                              >
                                <span className="text-[#D4AF37] text-xs">★</span>
                                <span className="text-[#D4AF37] text-xs">★</span>
                                <span className="text-[#D4AF37] text-xs">★</span>
                              </div>

                              <button
                                type="button"
                                onClick={() => {
                                  setShareCardData({
                                    missionTitle: m.title,
                                    points: m.points,
                                    stars: 3,
                                    completedAt: dateDisplay,
                                    rewardName: m.reward,
                                    userName: journey.name || 'Visitante',
                                    avatarId: journey.avatarId,
                                    skinTone: journey.skinTone,
                                    hairTexture: journey.hairTexture,
                                    hairLength: journey.hairLength,
                                    unlockedAccessories: journey.unlockedAccessories,
                                    selectedAccessoryId: journey.selectedAccessoryId,
                                    selectedAccessoriesList: journey.selectedAccessoriesList,
                                  })
                                }}
                                className="min-h-[44px] min-w-[44px] rounded-xl bg-[#D4AF37]/15 hover:bg-[#D4AF37] text-[#D4AF37] hover:text-[#0D0D0D] border border-[#D4AF37]/40 flex items-center justify-center transition-all active:scale-95"
                                title={`Compartilhar card de ${m.title}`}
                                aria-label={`Compartilhar ritual ${m.title}`}
                              >
                                <Share2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          {/* Snippet da nota do diário associada, se houver */}
                          {missionNote && (
                            <div className="pt-1.5 border-t border-white/5 flex items-start gap-2 text-xs text-[#E8D9BF] bg-[#121212] p-2 rounded-xl">
                              <PenLine className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                              <p className="italic text-[11px] leading-relaxed line-clamp-2">
                                "{missionNote.noteText}"
                              </p>
                            </div>
                          )}
                        </div>
                      )
                    })}
                </div>
              )}
            </div>
          </div>
          {/* Fim da Coluna Direita do Desktop */}
        </div>
      )}

      {/* ABA MISSÕES */}
      {activeTab === 'missoes' && (
        <div className="space-y-6 animate-fade-in lg:grid lg:grid-cols-12 lg:gap-8 lg:space-y-0">
          <div className="lg:col-span-6 space-y-6">
            {/* Lembrança semanal gentil do Spa no topo das Missões */}
            <WeeklySpaReminderBanner onOpenSpa={() => setShowSpaDaSemanaModal(true)} />

            {/* Banner discreto da Intenção da Semana no topo das Missões */}
            <WeeklyIntentionReminderBanner />

            {/* Destaque Guiado: Spa da Semana ✨ */}
            <section
              aria-label="Atalho Spa da Semana nas Missões"
              className="rounded-2xl border-2 border-[#D4AF37] bg-gradient-to-r from-[#2B2212] via-[#1E1911] to-[#14120F] p-4 flex flex-col sm:flex-row items-center justify-between gap-3.5 shadow-md relative overflow-hidden"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#D4AF37] text-black flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 stroke-[2.4]" />
                </div>
                <div className="text-left space-y-0.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-serif text-sm font-bold text-white">Spa da Semana ✨</h3>
                    <span className="text-[9px] font-mono px-2 py-0.2 rounded-full bg-[#D4AF37] text-black font-extrabold uppercase">
                      Fluxo 4 em 1
                    </span>
                    <span className="text-[9px] font-mono px-2 py-0.2 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                      {spaStreakCount}/4 semanas seguidas
                    </span>
                  </div>
                  <p className="text-xs text-[#B3B3B3]">
                    Intenção + Massagem 3 etapas + Respiração + Diário. Complete 4 semanas seguidas
                    para ganhar o Colar de Conchas Dourado.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowSpaDaSemanaModal(true)}
                className="w-full sm:w-auto min-h-[40px] px-3.5 py-1.5 rounded-xl bg-[#D4AF37] hover:bg-[#B8962E] text-black font-bold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer shrink-0"
              >
                <span>Abrir Spa Guiado</span>
                <ChevronRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </section>

            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-serif text-xl font-bold text-white">Catálogo de Missões</h2>
                <p className="text-xs text-[#B3B3B3]">
                  Passo a passo interativo criado para seu ritual de autocuidado com acabamento
                  profissional.
                </p>
              </div>

              {/* Botão de Criar Ritual Personalizado */}
              <button
                type="button"
                onClick={() => setShowCreateCustomRitualModal(true)}
                className="min-h-[40px] px-3 py-1.5 rounded-xl bg-[#D4AF37] hover:bg-[#B8962E] text-black font-bold text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition-all shrink-0 cursor-pointer"
                title="Criar um ritual livre com suas próprias etapas"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Criar Ritual</span>
              </button>
            </div>

            {/* RITUAIS LIVRES PERSONALIZADOS (Se houver rituais criados ou convite para criar) */}
            <div className="rounded-2xl border border-[#D4AF37]/40 bg-gradient-to-br from-[#1F1A12] via-[#161512] to-[#0F0E0D] p-4 space-y-3 shadow-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-serif text-sm font-bold text-white flex items-center gap-1.5">
                      <span>Meus Rituais Personalizados</span>
                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30 font-bold">
                        EXCLUSIVO
                      </span>
                    </h3>
                    <p className="text-[11px] text-[#F1E5C8]/80">
                      Crie sua rotina sob medida com passos e dicas próprias
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowCreateCustomRitualModal(true)}
                  className="text-xs font-semibold text-[#D4AF37] hover:underline flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Novo</span>
                </button>
              </div>

              {!journey.customRituals || journey.customRituals.length === 0 ? (
                <div className="rounded-xl border border-dashed border-white/15 bg-black/20 p-3.5 text-center space-y-1.5">
                  <p className="text-xs text-[#EAE5D9]">
                    Você ainda não criou nenhum ritual personalizado.
                  </p>
                  <p className="text-[11px] text-[#888888]">
                    Monte um ritual livre com seus cuidados prediletos e ganhe +10 pts por etapa!
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowCreateCustomRitualModal(true)}
                    className="mt-1 inline-flex items-center gap-1 text-xs font-bold text-[#D4AF37] hover:underline"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Criar meu primeiro ritual personalizado</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-2.5 pt-1">
                  {journey.customRituals.map((cr) => {
                    const isCompleted = journey.completedMissions.includes(cr.id)
                    const totalPts = cr.steps.length * (cr.pointsPerStep || 10)
                    return (
                      <div
                        key={cr.id}
                        className="rounded-xl border border-white/10 bg-[#161514] p-3 text-left hover:border-[#D4AF37]/50 transition-all flex items-center justify-between gap-3 group"
                      >
                        <div
                          onClick={() => handleStartMission(cr.id)}
                          className="flex-1 cursor-pointer space-y-1"
                        >
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-xs text-white group-hover:text-[#D4AF37] transition-colors">
                              {cr.title}
                            </h4>
                            <span className="text-[9px] font-bold text-[#D4AF37] bg-[#D4AF37]/15 px-2 py-0.2 rounded-md">
                              +{totalPts} pts • {cr.steps.length} etapas
                            </span>
                            {isCompleted && (
                              <span className="text-[9px] font-bold text-[#81C784] bg-[#4CAF50]/15 px-2 py-0.2 rounded-md flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" />
                                <span>Concluído</span>
                              </span>
                            )}
                          </div>
                          {cr.description && (
                            <p className="text-[11px] text-[#A0A0A0] line-clamp-1">
                              {cr.description}
                            </p>
                          )}
                          <p className="text-[10px] text-[#666666]">Criado em {cr.createdAt}</p>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleStartMission(cr.id)}
                            className="min-h-[34px] px-2.5 rounded-lg bg-[#D4AF37]/15 hover:bg-[#D4AF37] text-[#D4AF37] hover:text-black font-semibold text-[11px] transition-colors"
                          >
                            {isCompleted ? 'Refazer' : 'Praticar'}
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteCustomRitual(cr.id)}
                            className="w-8 h-8 rounded-lg text-white/40 hover:text-[#E57373] hover:bg-white/5 flex items-center justify-center transition-colors"
                            title="Excluir ritual personalizado"
                            aria-label={`Excluir ritual ${cr.title}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
          <div className="lg:col-span-6 space-y-6">
            {/* Seção Especial: RITUAL DE ANIVERSÁRIO DE JORNADA COM CARD EXCLUSIVO */}
            <div className="space-y-3 pt-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-[#D4AF37]/25 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37]">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-base font-bold text-white flex items-center gap-2">
                      <span>Ritual de Aniversário de Jornada</span>
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-[#D4AF37] text-black font-extrabold uppercase shadow-sm">
                        Exclusivo
                      </span>
                    </h3>
                  </div>
                </div>
                <span className="text-[11px] text-[#A0A0A0]">Celebração • Sem bloqueio</span>
              </div>

              <p className="text-xs text-[#A0A0A0]">
                Celebre os passos e dias da sua caminhada com um ritual festivo de 4 etapas
                ilustradas. Ao concluir, ganhe <strong>+150 pontos</strong>, desbloqueie a{' '}
                <strong>Coroa Radiante de Aniversário</strong> e gere o{' '}
                <strong>Card Exclusivo de Aniversário de Jornada</strong> para guardar no Álbum e
                compartilhar!
              </p>

              {/* Card da Missão de Aniversário de Jornada */}
              {(() => {
                const isAnnivCompleted = journey.completedMissions.includes(
                  'ritual-aniversario-jornada',
                )
                return (
                  <div
                    onClick={() => handleStartMission('ritual-aniversario-jornada')}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        handleStartMission('ritual-aniversario-jornada')
                      }
                    }}
                    className="w-full rounded-2xl border-2 border-[#D4AF37] bg-gradient-to-r from-[#2A1D0D] via-[#1D170F] to-[#120F0B] p-4 text-left transition-all hover:bg-[#322312] shadow-[0_0_26px_rgba(212,175,55,0.3)] ring-1 ring-[#D4AF37]/50 cursor-pointer active:scale-[0.99] relative overflow-hidden"
                  >
                    <div className="flex items-start justify-between gap-3 relative z-10">
                      <div className="flex items-center gap-3.5">
                        <div className="w-14 h-14 rounded-xl bg-black/60 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] shrink-0 shadow-md">
                          <AccessorySvg
                            goldIconType="crystal-crown"
                            isUnlocked={isAnnivCompleted}
                            className="w-10 h-10"
                          />
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="font-semibold text-base text-white">
                              Ritual de Aniversário de Jornada 🎉
                            </h4>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                isAnnivCompleted
                                  ? 'bg-[#4CAF50]/20 text-[#81C784] border border-[#4CAF50]/40'
                                  : 'bg-[#D4AF37] text-black font-extrabold shadow-sm'
                              }`}
                            >
                              {isAnnivCompleted ? 'Concluída ★' : 'Comemorativo'}
                            </span>
                          </div>
                          <p className="text-xs text-[#B3B3B3]">
                            Reconhecimento, massagem revigorante, banho de ouro e coroação.
                          </p>
                          <span className="inline-block text-[10px] font-mono text-[#D4AF37] font-semibold">
                            4 etapas • +150 pontos • Coroa de Aniversário + Card Exclusivo
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs relative z-10">
                      <span className="text-[#F1E5C8] font-medium flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Card de Aniversário com confetes em ouro + Álbum</span>
                      </span>

                      <span className="font-semibold text-[#D4AF37] flex items-center gap-1">
                        {isAnnivCompleted ? 'Refazer ritual' : 'Iniciar comemoração'}
                        <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
                      </span>
                    </div>
                  </div>
                )
              })()}
            </div>

            {/* Seção Especial: RITUAL DE FIM DE ANO / DATAS COMEMORATIVAS */}
            <div className="space-y-3 pt-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-[#D4AF37]/25 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37]">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-base font-bold text-white flex items-center gap-2">
                      <span>Missão Especial de Celebração</span>
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-[#D4AF37] text-black font-extrabold uppercase shadow-sm">
                        Fim de Ano
                      </span>
                    </h3>
                  </div>
                </div>
                <span className="text-[11px] text-[#A0A0A0]">Edição Temática • Sem bloqueio</span>
              </div>

              <p className="text-xs text-[#A0A0A0]">
                Celebre a renovação de ciclo com um ritual festivo de brilho espelhado. Conclua para
                desbloquear o exclusivo <strong>Broche Constelação de Fim de Ano</strong> e gerar um
                <strong> Card Temático de Celebração</strong> para salvar no Álbum!
              </p>

              {/* Card da Missão Especial de Fim de Ano */}
              {(() => {
                const isNYECompleted = journey.completedMissions.includes('ritual-fim-de-ano')
                return (
                  <div
                    onClick={() => handleStartMission('ritual-fim-de-ano')}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        handleStartMission('ritual-fim-de-ano')
                      }
                    }}
                    className="w-full rounded-2xl border-2 border-[#D4AF37] bg-gradient-to-r from-[#241B0F] via-[#1A140B] to-[#120E07] p-4 text-left transition-all hover:bg-[#2C2114] shadow-[0_0_24px_rgba(212,175,55,0.25)] ring-1 ring-[#D4AF37]/50 cursor-pointer active:scale-[0.99] relative overflow-hidden"
                  >
                    <div className="flex items-start justify-between gap-3 relative z-10">
                      <div className="flex items-center gap-3.5">
                        <div className="w-14 h-14 rounded-xl bg-black/60 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] shrink-0 shadow-md">
                          <AccessorySvg
                            goldIconType="constellation-brooch"
                            isUnlocked={isNYECompleted}
                            className="w-10 h-10"
                          />
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="font-semibold text-base text-white">
                              Ritual de Fim de Ano • Brilho de Celebração
                            </h4>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                isNYECompleted
                                  ? 'bg-[#4CAF50]/20 text-[#81C784] border border-[#4CAF50]/40'
                                  : 'bg-[#D4AF37] text-black font-extrabold shadow-sm'
                              }`}
                            >
                              {isNYECompleted ? 'Concluída ★' : 'Especial'}
                            </span>
                          </div>
                          <p className="text-xs text-[#B3B3B3]">
                            Intenções para o novo ciclo, nutrição radiante de ouro e penteado
                            festivo.
                          </p>
                          <span className="inline-block text-[10px] font-mono text-[#D4AF37] font-semibold">
                            3 etapas • +120 pontos • Broche Constelação Exclusivo
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs relative z-10">
                      <span className="text-[#F1E5C8] font-medium flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Broche Constelação de Fim de Ano + Card Festivo</span>
                      </span>

                      <span className="font-semibold text-[#D4AF37] flex items-center gap-1">
                        {isNYECompleted ? 'Refazer celebração' : 'Iniciar missão'}
                        <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
                      </span>
                    </div>
                  </div>
                )
              })()}
            </div>

            {/* Nova Coleção em Destaque: RITUAL DA SEMANA (Missões Rotativas por Dia) */}
            <div className="space-y-3 pt-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
                    <CalendarDays className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-base font-bold text-white flex items-center gap-2">
                      <span>Coleção Ritual da Semana</span>
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-[#D4AF37] text-black font-extrabold uppercase">
                        Rotativas
                      </span>
                    </h3>
                  </div>
                </div>
                <span className="text-[11px] text-[#A0A0A0]">7 missões (1 por dia)</span>
              </div>

              <p className="text-xs text-[#A0A0A0]">
                Uma missão especial destacada para cada dia da semana. Todas as 7 missões ficam
                sempre disponíveis para você realizar no seu próprio ritmo, sem punição e sem
                bloqueios.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {weeklyMissionsList.map((mission) => {
                  const isAvailable = true
                  return (
                    <div
                      key={mission.id}
                      onClick={() => handleStartMission(mission.id)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          handleStartMission(mission.id)
                        }
                      }}
                      className={`w-full rounded-2xl border p-4 text-left transition-all ${
                        mission.isToday
                          ? 'border-[#D4AF37] bg-gradient-to-r from-[#2A2315] to-[#1C1813] shadow-[0_0_20px_rgba(212,175,55,0.2)] ring-1 ring-[#D4AF37] cursor-pointer active:scale-[0.99]'
                          : 'border-[#D4AF37]/30 bg-[#161513] hover:border-[#D4AF37]/60 hover:bg-[#1E1C17] cursor-pointer'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3.5">
                          <div className="w-14 h-14 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] shrink-0">
                            <AccessorySvg
                              goldIconType={
                                (WEEKLY_RITUALS.find((w) => w.id === mission.id)
                                  ?.accessoryType as any) || 'star-clip'
                              }
                              isUnlocked={mission.isCompleted}
                              className="w-10 h-10"
                            />
                          </div>

                          <div className="space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4 className="font-semibold text-base text-white">
                                {mission.title}
                              </h4>
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                  mission.isToday
                                    ? 'bg-[#D4AF37] text-black font-extrabold shadow-sm'
                                    : mission.isCompleted
                                      ? 'bg-[#4CAF50]/20 text-[#81C784] border border-[#4CAF50]/40'
                                      : 'bg-white/10 text-[#F1E5C8] border border-white/10'
                                }`}
                              >
                                {mission.badgeLabel}
                              </span>
                            </div>
                            <p className="text-xs text-[#B3B3B3]">{mission.desc}</p>
                            <span className="inline-block text-[10px] font-mono text-[#D4AF37]">
                              {mission.stepsCount} etapas • {mission.theme}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                        <span className="text-[#D4AF37] font-medium flex items-center gap-1">
                          <Award className="w-3.5 h-3.5" />
                          <span>{mission.reward}</span>
                        </span>

                        <span className="font-semibold text-[#F1E5C8] flex items-center gap-1">
                          {mission.isCompleted ? 'Refazer missão' : 'Iniciar missão'}
                          <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Coleção 1: Trio Clássico de Penteados */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  <h3 className="font-serif text-base font-bold text-white">
                    Coleção Original • Penteados
                  </h3>
                </div>
                <span className="text-[11px] text-[#A0A0A0]">3 missões</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {originalMissions.map((mission) => {
                  const isAvailable = mission.status === 'available'
                  return (
                    <div
                      key={mission.id}
                      onClick={isAvailable ? () => handleStartMission(mission.id) : undefined}
                      role={isAvailable ? 'button' : undefined}
                      tabIndex={isAvailable ? 0 : undefined}
                      onKeyDown={(e) => {
                        if (isAvailable && (e.key === 'Enter' || e.key === ' ')) {
                          e.preventDefault()
                          handleStartMission(mission.id)
                        }
                      }}
                      className={`w-full rounded-2xl border p-4 text-left transition-all ${
                        isAvailable
                          ? 'border-[#D4AF37]/50 bg-[#1A1A1A] hover:border-[#D4AF37] hover:bg-[#202020] cursor-pointer shadow-lg active:scale-[0.99]'
                          : 'border-white/5 bg-[#141414]/70 opacity-60 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3.5">
                          <MissionThumbnailSvg type={mission.type} className="w-16 h-16 shrink-0" />

                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-base text-white">
                                {mission.title}
                              </h3>
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                  isAvailable
                                    ? mission.isCompleted
                                      ? 'bg-[#4CAF50]/20 text-[#81C784] border border-[#4CAF50]/40'
                                      : 'bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40'
                                    : 'bg-white/10 text-white/50 border border-white/10'
                                }`}
                              >
                                {mission.badgeLabel}
                              </span>
                            </div>
                            <p className="text-xs text-[#B3B3B3]">{mission.desc}</p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                        <span className="text-[#D4AF37] font-medium flex items-center gap-1">
                          <Award className="w-3.5 h-3.5" />
                          <span>{mission.reward}</span>
                        </span>

                        <span className="font-semibold text-[#F1E5C8] flex items-center gap-1">
                          {mission.isCompleted ? 'Refazer missão' : 'Iniciar missão'}
                          <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Coleção Temática Fim de Semana: RITUAL DE DOMINGO (NOVA, 3 etapas) */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-[#10B981]/20 border border-[#10B981]/40 flex items-center justify-center text-[#6EE7B7]">
                    <Coffee className="w-3.5 h-3.5 text-[#6EE7B7]" />
                  </div>
                  <div>
                    <h3 className="font-serif text-base font-bold text-white flex items-center gap-2">
                      <span>Ritual de Domingo • Fim de Semana</span>
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-[#10B981]/30 text-[#6EE7B7] border border-[#10B981]/40 font-bold">
                        NOVA
                      </span>
                    </h3>
                  </div>
                </div>
                <span className="text-[11px] text-[#A0A0A0]">1 missão temática (3 etapas)</span>
              </div>

              <p className="text-xs text-[#A0A0A0]">
                Dedique seu fim de semana a um spa capilar profissional: nutrição com óleo
                pré-shampoo, máscara com toalha morna e a exclusiva Faixa Spa Dourada.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {sundayMissions.map((mission) => {
                  const isAvailable = mission.status === 'available'
                  return (
                    <div
                      key={mission.id}
                      onClick={isAvailable ? () => handleStartMission(mission.id) : undefined}
                      role={isAvailable ? 'button' : undefined}
                      tabIndex={isAvailable ? 0 : undefined}
                      onKeyDown={(e) => {
                        if (isAvailable && (e.key === 'Enter' || e.key === ' ')) {
                          e.preventDefault()
                          handleStartMission(mission.id)
                        }
                      }}
                      className={`w-full rounded-2xl border p-4 text-left transition-all ${
                        isAvailable
                          ? 'border-[#10B981]/50 bg-gradient-to-r from-[#121F18] to-[#18281E] hover:border-[#10B981] hover:bg-[#1E3226] cursor-pointer shadow-lg active:scale-[0.99]'
                          : 'border-white/5 bg-[#141414]/70 opacity-60 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3.5">
                          <MissionThumbnailSvg type={mission.type} className="w-16 h-16 shrink-0" />

                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-base text-white">
                                {mission.title}
                              </h3>
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                  isAvailable
                                    ? mission.isCompleted
                                      ? 'bg-[#4CAF50]/20 text-[#81C784] border border-[#4CAF50]/40'
                                      : 'bg-[#10B981]/20 text-[#6EE7B7] border border-[#10B981]/40'
                                    : 'bg-white/10 text-white/50 border border-white/10'
                                }`}
                              >
                                {mission.badgeLabel}
                              </span>
                            </div>
                            <p className="text-xs text-[#B3B3B3]">{mission.desc}</p>
                            <span className="inline-block text-[10px] font-mono text-[#6EE7B7]">
                              3 etapas • Ritual Spa Fim de Semana
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                        <span className="text-[#6EE7B7] font-medium flex items-center gap-1">
                          <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span>{mission.reward}</span>
                        </span>

                        <span className="font-semibold text-[#F1E5C8] flex items-center gap-1">
                          {mission.isCompleted ? 'Refazer missão' : 'Iniciar missão'}
                          <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Coleção 2: Coleção Ritual do Despertar (NOVA, 2 etapas rápidas) */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-[#F59E0B]/20 border border-[#F59E0B]/40 flex items-center justify-center text-[#FCD34D]">
                    <Sun className="w-3.5 h-3.5 text-[#FCD34D]" />
                  </div>
                  <div>
                    <h3 className="font-serif text-base font-bold text-white flex items-center gap-2">
                      <span>Coleção Ritual do Despertar</span>
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-[#F59E0B]/30 text-[#FCD34D] border border-[#F59E0B]/40 font-bold">
                        NOVA
                      </span>
                    </h3>
                  </div>
                </div>
                <span className="text-[11px] text-[#A0A0A0]">2 missões rápidas (2 etapas)</span>
              </div>

              <p className="text-xs text-[#A0A0A0]">
                Passos práticos e rápidos para acordar os fios, proteger contra o calor e iluminar
                seu dia com estilo.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {morningMissions.map((mission) => {
                  const isAvailable = mission.status === 'available'
                  return (
                    <div
                      key={mission.id}
                      onClick={isAvailable ? () => handleStartMission(mission.id) : undefined}
                      role={isAvailable ? 'button' : undefined}
                      tabIndex={isAvailable ? 0 : undefined}
                      onKeyDown={(e) => {
                        if (isAvailable && (e.key === 'Enter' || e.key === ' ')) {
                          e.preventDefault()
                          handleStartMission(mission.id)
                        }
                      }}
                      className={`w-full rounded-2xl border p-4 text-left transition-all ${
                        isAvailable
                          ? 'border-[#F59E0B]/50 bg-gradient-to-r from-[#20180F] to-[#2B2113] hover:border-[#F59E0B] hover:bg-[#342817] cursor-pointer shadow-lg active:scale-[0.99]'
                          : 'border-white/5 bg-[#141414]/70 opacity-60 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3.5">
                          <MissionThumbnailSvg type={mission.type} className="w-16 h-16 shrink-0" />

                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-base text-white">
                                {mission.title}
                              </h3>
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                  isAvailable
                                    ? mission.isCompleted
                                      ? 'bg-[#4CAF50]/20 text-[#81C784] border border-[#4CAF50]/40'
                                      : 'bg-[#F59E0B]/20 text-[#FCD34D] border border-[#F59E0B]/40'
                                    : 'bg-white/10 text-white/50 border border-white/10'
                                }`}
                              >
                                {mission.badgeLabel}
                              </span>
                            </div>
                            <p className="text-xs text-[#B3B3B3]">{mission.desc}</p>
                            <span className="inline-block text-[10px] font-mono text-[#FCD34D]/80">
                              Apenas 2 etapas • Rápida
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                        <span className="text-[#FCD34D] font-medium flex items-center gap-1">
                          <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span>{mission.reward}</span>
                        </span>

                        <span className="font-semibold text-[#F1E5C8] flex items-center gap-1">
                          {mission.isCompleted ? 'Refazer missão' : 'Iniciar missão'}
                          <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Coleção 3: Coleção "Ritual Noturno" */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-[#A78BFA]/20 border border-[#A78BFA]/40 flex items-center justify-center text-[#E0D4FC]">
                    <Moon className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-base font-bold text-white flex items-center gap-2">
                      <span>Coleção Ritual Noturno</span>
                    </h3>
                  </div>
                </div>
                <span className="text-[11px] text-[#A0A0A0]">2 missões (4 etapas)</span>
              </div>

              <p className="text-xs text-[#A0A0A0]">
                Rituais dedicados ao descanso, regeneração dos fios e prevenção do frizz noturno com
                pontos extras.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {nightMissions.map((mission) => {
                  const isAvailable = mission.status === 'available'
                  return (
                    <div
                      key={mission.id}
                      onClick={isAvailable ? () => handleStartMission(mission.id) : undefined}
                      role={isAvailable ? 'button' : undefined}
                      tabIndex={isAvailable ? 0 : undefined}
                      onKeyDown={(e) => {
                        if (isAvailable && (e.key === 'Enter' || e.key === ' ')) {
                          e.preventDefault()
                          handleStartMission(mission.id)
                        }
                      }}
                      className={`w-full rounded-2xl border p-4 text-left transition-all ${
                        isAvailable
                          ? 'border-[#A78BFA]/50 bg-gradient-to-r from-[#171422] to-[#1F192E] hover:border-[#A78BFA] hover:bg-[#251E38] cursor-pointer shadow-lg active:scale-[0.99]'
                          : 'border-white/5 bg-[#141414]/70 opacity-60 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3.5">
                          <MissionThumbnailSvg type={mission.type} className="w-16 h-16 shrink-0" />

                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-base text-white">
                                {mission.title}
                              </h3>
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                  isAvailable
                                    ? mission.isCompleted
                                      ? 'bg-[#4CAF50]/20 text-[#81C784] border border-[#4CAF50]/40'
                                      : 'bg-[#A78BFA]/20 text-[#E0D4FC] border border-[#A78BFA]/40'
                                    : 'bg-white/10 text-white/50 border border-white/10'
                                }`}
                              >
                                {mission.badgeLabel}
                              </span>
                            </div>
                            <p className="text-xs text-[#B3B3B3]">{mission.desc}</p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                        <span className="text-[#E0D4FC] font-medium flex items-center gap-1">
                          <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span>{mission.reward}</span>
                        </span>

                        <span className="font-semibold text-[#F1E5C8] flex items-center gap-1">
                          {mission.isCompleted ? 'Refazer missão' : 'Iniciar missão'}
                          <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ABA ACESSÓRIOS */}
      {activeTab === 'acessorios' && (
        <div className="space-y-5 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif text-xl font-bold text-white">Coleção de Acessórios</h2>
              <p className="text-xs text-[#B3B3B3]">
                Desbloqueie peças exclusivas completando as missões de autocuidado.
              </p>
            </div>

            {/* Botão de Destaque / Cofrinho de Recompensas */}
            <button
              type="button"
              onClick={() => setShowPiggyBankModal(true)}
              className="min-h-[40px] px-3.5 py-1.5 rounded-xl bg-[#D4AF37] hover:bg-[#B8962E] text-black font-bold text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition-all shrink-0 cursor-pointer"
              title="Escolher qual acessório destacar no seu avatar"
              aria-label="Abrir Cofrinho de Recompensas"
            >
              <Sparkles className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Cofrinho</span>
            </button>
          </div>

          {/* Banner do Cofrinho de Recompensas com Status Atual */}
          <div className="rounded-2xl border border-[#D4AF37]/50 bg-gradient-to-r from-[#201C12] via-[#1A1813] to-[#121212] p-4 flex items-center justify-between gap-3 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full border-2 border-[#D4AF37] p-0.5 bg-[#141414] shrink-0 flex items-center justify-center overflow-hidden aspect-square">
                <AvatarSvg
                  id={journey.avatarId}
                  unlockedAccessories={journey.unlockedAccessories}
                  selectedAccessoryId={journey.selectedAccessoryId}
                  selectedAccessoriesList={journey.selectedAccessoriesList}
                  className="w-full h-full rounded-full object-contain"
                />
              </div>

              <div className="text-left space-y-0.5">
                <span className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-wider block">
                  Cofrinho de Recompensas
                </span>
                <p className="text-xs font-semibold text-white">
                  {journey.selectedAccessoriesList && journey.selectedAccessoriesList.length > 0
                    ? `Look ativo (${journey.selectedAccessoriesList.length} acessórios)`
                    : journey.selectedAccessoryId === null
                      ? 'Visual limpo (nenhum acessório em destaque)'
                      : journey.selectedAccessoryId === undefined
                        ? 'Todos os acessórios desbloqueados'
                        : `Destaque: ${ACCESSORIES_LIST.find((a) => a.id === journey.selectedAccessoryId)?.name || 'Acessório'}`}
                </p>
                <p className="text-[10px] text-[#A0A0A0]">
                  {journey.savedLooks?.length
                    ? `${journey.savedLooks.length} look(s) salvo(s) • `
                    : ''}
                  {journey.unlockedAccessories.length} de {ACCESSORIES_LIST.length} peças
                  disponíveis no seu cofrinho.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowPiggyBankModal(true)}
              className="min-h-[36px] px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[#F1E5C8] font-bold text-xs border border-white/15 transition-all shrink-0 cursor-pointer"
            >
              Personalizar
            </button>
          </div>

          {/* Grid de Acessórios: 2 colunas no mobile, 3 em tablet e 4 no desktop amplo */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-3.5 sm:gap-4">
            {ACCESSORIES_LIST.map((acc) => {
              const isUnlocked = journey.unlockedAccessories.includes(acc.id)
              return (
                <div
                  key={acc.id}
                  className={`rounded-2xl border p-4 flex flex-col items-center text-center transition-all min-h-[190px] justify-between ${
                    isUnlocked
                      ? 'border-[#D4AF37] bg-[#1A1A1A] shadow-[0_0_18px_rgba(212,175,55,0.15)] ring-1 ring-[#D4AF37]/40'
                      : 'border-white/10 bg-[#141414] opacity-75'
                  }`}
                >
                  {/* Badge de status */}
                  <div className="w-full flex justify-end">
                    {isUnlocked ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#D4AF37] text-[#0D0D0D] shadow-sm">
                        <CheckCircle2 className="w-3 h-3 stroke-[3]" />
                        <span>Desbloqueado</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/10 text-white/50 border border-white/5">
                        <Lock className="w-3 h-3" />
                        <span>Bloqueado</span>
                      </span>
                    )}
                  </div>

                  {/* Ilustração SVG do acessório */}
                  <div className="my-2 relative flex items-center justify-center">
                    <AccessorySvg
                      type={acc.goldIconType}
                      isUnlocked={isUnlocked}
                      className="w-16 h-16"
                    />
                    {!isUnlocked && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full">
                        <Lock className="w-5 h-5 text-white/60" />
                      </div>
                    )}
                  </div>

                  {/* Informações */}
                  <div className="w-full space-y-1">
                    <h3
                      className={`text-xs font-bold leading-tight ${isUnlocked ? 'text-[#F1E5C8]' : 'text-white/80'}`}
                    >
                      {acc.name}
                    </h3>
                    <p className="text-[10px] text-[#A0A0A0] line-clamp-2">
                      {isUnlocked ? acc.description : `Missão: ${acc.missionSource}`}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Bloco de Reiniciar Demo na seção de Acessórios */}
          <div className="pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={() => setIsResetDialogOpen(true)}
              className="w-full min-h-[48px] px-4 py-2.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white font-medium text-xs transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4 text-[#D4AF37]" />
              <span>Reiniciar demo e apagar progresso</span>
            </button>
          </div>
        </div>
      )}

      {/* Diálogo de Confirmação para Reiniciar Demo */}
      {isResetDialogOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="reset-dialog-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in"
        >
          <div className="w-full max-w-sm rounded-2xl border border-white/15 bg-[#141414] p-5 text-white shadow-2xl space-y-4 animate-scale-in">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#E57373]/15 border border-[#E57373]/40 flex items-center justify-center text-[#E57373]">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h2 id="reset-dialog-title" className="font-serif text-lg font-bold text-white">
                Reiniciar demonstração?
              </h2>
            </div>

            <p className="text-xs text-[#B3B3B3] leading-relaxed">
              Tem certeza que deseja reiniciar? Seu progresso, pontos acumulados e acessórios
              desbloqueados serão apagados.
            </p>

            <div className="grid grid-cols-2 gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setIsResetDialogOpen(false)}
                className="min-h-[44px] rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white text-xs font-semibold transition-colors"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmReset}
                className="min-h-[44px] rounded-xl bg-[#E57373] hover:bg-[#D32F2F] text-white text-xs font-bold transition-colors shadow-sm"
              >
                Reiniciar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Celebração de Conquista "Ritual Completo" */}
      {showTrioCelebrationModal && (
        <RitualCompletoCelebration
          onClose={() => setShowTrioCelebrationModal(false)}
          onShare={() => {
            setShowTrioCelebrationModal(false)
            setShareCardData({
              missionTitle: 'Ritual Completo',
              points: 100,
              stars: 3,
              completedAt: 'Hoje',
              rewardName: 'Coroa Dourada',
              userName: journey.name || 'Visitante',
              avatarId: journey.avatarId,
              skinTone: journey.skinTone,
              hairTexture: journey.hairTexture,
              hairLength: journey.hairLength,
              unlockedAccessories: journey.unlockedAccessories,
              selectedAccessoryId: journey.selectedAccessoryId,
              selectedAccessoriesList: journey.selectedAccessoriesList,
              isRitualCompleto: true,
              achievementType: 'ritual-completo',
            })
          }}
        />
      )}

      {/* Modal de Compartilhamento do Card */}
      {shareCardData && (
        <ShareCardModal {...shareCardData} onClose={() => setShareCardData(null)} />
      )}

      {/* Modal de Prévia e Download do Diário Completo */}
      {showExportDiaryModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="export-diary-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in"
        >
          <div className="w-full max-w-sm rounded-2xl border border-[#D4AF37]/50 bg-[#141414] p-5 text-white shadow-2xl space-y-4 max-h-[90vh] flex flex-col animate-scale-in">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <BookHeart className="w-5 h-5 text-[#D4AF37]" />
                <h2 id="export-diary-title" className="font-serif text-base font-bold text-white">
                  Exportar Diário Completo
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setShowExportDiaryModal(false)}
                className="p-1 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Fechar modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-[#B3B3B3] leading-relaxed">
              Gera um card visual preto e dourado com todas as suas reflexões de autocuidado, datas
              e estatísticas pronto para salvar ou compartilhar.
            </p>

            {/* Resumo do que será exportado */}
            <div className="rounded-xl border border-[#D4AF37]/30 bg-[#1B1916] p-3 space-y-2 text-xs">
              <div className="flex justify-between text-[#888888]">
                <span>Pessoa usuária:</span>
                <span className="font-bold text-white">{journey.name || 'Visitante'}</span>
              </div>
              <div className="flex justify-between text-[#888888]">
                <span>Notas incluídas:</span>
                <span className="font-bold text-[#F1E5C8]">
                  {journey.diaryNotes?.length || 0} reflexões
                </span>
              </div>
              <div className="flex justify-between text-[#888888]">
                <span>Sequência ativa:</span>
                <span className="font-bold text-[#D4AF37]">{currentStreak} dias</span>
              </div>
              <div className="flex justify-between text-[#888888]">
                <span>Tempo dedicado:</span>
                <span className="font-bold text-[#D4AF37]">{totalCareMinutes} minutos</span>
              </div>
            </div>

            {/* Ações de Download */}
            <div className="pt-2 flex flex-col gap-2">
              <button
                type="button"
                disabled={isExportingDiary}
                onClick={async () => {
                  try {
                    setIsExportingDiary(true)
                    await exportDiaryAsPng({
                      userName: journey.name || 'Visitante',
                      notes: journey.diaryNotes || [],
                      totalPoints: journey.points,
                      streakDays: currentStreak,
                      totalMinutes: totalCareMinutes,
                    })
                    setShowExportDiaryModal(false)
                  } catch (e) {
                    console.error('Erro ao exportar diário', e)
                  } finally {
                    setIsExportingDiary(false)
                  }
                }}
                className="w-full min-h-[48px] rounded-xl bg-[#D4AF37] hover:bg-[#B8962E] text-[#0D0D0D] font-bold text-sm flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(212,175,55,0.3)] transition-all active:scale-[0.98] disabled:opacity-50"
              >
                <Download className="w-4 h-4" />
                <span>{isExportingDiary ? 'Gerando imagem PNG...' : 'Baixar Imagem PNG'}</span>
              </button>

              <button
                type="button"
                onClick={() => setShowExportDiaryModal(false)}
                className="w-full min-h-[40px] rounded-xl border border-white/10 hover:bg-white/5 text-xs text-white/70 hover:text-white transition-colors"
              >
                Voltar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal do Cofrinho de Recompensas */}
      <RewardPiggyBankModal
        isOpen={showPiggyBankModal}
        onClose={() => setShowPiggyBankModal(false)}
      />

      {/* Modal de Respiração Guiada */}
      <BreathingRitualModal
        isOpen={showBreathingModal}
        onClose={() => setShowBreathingModal(false)}
      />

      {/* Modal de Criação de Ritual Personalizado */}
      <CreateCustomRitualModal
        isOpen={showCreateCustomRitualModal}
        onClose={() => setShowCreateCustomRitualModal(false)}
        onSave={(title, desc, steps) => {
          const newId = addCustomRitual(title, desc, steps)
          // Inicia direto a missão criada para que o usuário sinta o feedback imediato
          handleStartMission(newId)
        }}
      />

      {/* Celebração de Conquistas Extras: Semana Perfeita & Colecionadora */}
      {activeCelebrationAchievement && (
        <AchievementCelebrationModal
          type={activeCelebrationAchievement}
          unlockedAt={
            activeCelebrationAchievement === 'semana-perfeita'
              ? journey.semanaPerfeitaUnlockedAt || 'Hoje'
              : activeCelebrationAchievement === 'boas-vindas-palco'
                ? journey.tourCompletedAt || 'Hoje'
                : journey.colecionadoraUnlockedAt || 'Hoje'
          }
          onClose={() => setActiveCelebrationAchievement(null)}
          onShare={() => {
            const achType = activeCelebrationAchievement
            setActiveCelebrationAchievement(null)
            let title = `Conquista: Colecionadora (${ACCESSORIES_LIST.length}/${ACCESSORIES_LIST.length})`
            let reward = 'Medalha Acervo Completo'
            let pts = 350

            if (achType === 'semana-perfeita') {
              title = 'Conquista: Semana Perfeita (5/5)'
              reward = 'Medalha Constância Dourada'
              pts = 250
            } else if (achType === 'boas-vindas-palco') {
              title = 'Conquista: Boas-Vindas ao Palco'
              reward = 'Medalha de Estreia & Acolhimento'
              pts = 100
            }

            setShareCardData({
              missionTitle: 'Ritual Perfeito',
              points: 30,
              stars: 3,
              completedAt: 'Hoje',
              rewardName: 'Medalha do Equilíbrio Perfeito',
              userName: journey.name || 'Visitante',
              avatarId: journey.avatarId,
              skinTone: journey.skinTone,
              hairTexture: journey.hairTexture,
              hairLength: journey.hairLength,
              unlockedAccessories: journey.unlockedAccessories,
              selectedAccessoryId: journey.selectedAccessoryId,
              selectedAccessoriesList: journey.selectedAccessoriesList,
              isRitualCompleto: true,
              achievementType: 'ritual-perfeito',
            })
          }}
        />
      )}

      {/* NOVO: Modal de Celebração de Ritual Perfeito */}
      <PerfectRitualCelebrationModal
        isOpen={showPerfectCelebrationModal}
        onClose={() => {
          dismissPerfectRitualCelebration(todayKey)
          setShowPerfectCelebrationModal(false)
        }}
        dateDisplay={new Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: 'long',
        }).format(new Date())}
        reducedMotion={Boolean(journey.reducedMotion)}
        onShare={() => {
          dismissPerfectRitualCelebration(todayKey)
          setShowPerfectCelebrationModal(false)
          setShareCardData({
            missionTitle: 'Conquista: Ritual Perfeito',
            points: 200,
            stars: 3,
            completedAt: new Intl.DateTimeFormat('pt-BR', {
              day: '2-digit',
              month: 'short',
            }).format(new Date()),
            rewardName: 'Medalha Ritual Perfeito',
            userName: journey.name || 'Visitante',
            avatarId: journey.avatarId,
            skinTone: journey.skinTone,
            hairTexture: journey.hairTexture,
            hairLength: journey.hairLength,
            unlockedAccessories: journey.unlockedAccessories,
            selectedAccessoryId: journey.selectedAccessoryId,
            selectedAccessoriesList: journey.selectedAccessoriesList,
            isRitualCompleto: true,
            achievementType: 'ritual-perfeito',
          })
        }}
      />

      {/* NOVO: Modal do Editor de Avatar Completo (Comprimento + Tom de Pele + Textura + Base) */}
      <AvatarEditorModal
        isOpen={showAvatarEditorModal}
        onClose={() => setShowAvatarEditorModal(false)}
        currentAvatarId={journey.avatarId}
        currentSkinTone={journey.skinTone}
        currentHairTexture={journey.hairTexture}
        currentHairLength={journey.hairLength}
        unlockedAccessories={journey.unlockedAccessories}
        selectedAccessoryId={journey.selectedAccessoryId}
        selectedAccessoriesList={journey.selectedAccessoriesList}
        onSave={(avatarId, skinTone, hairTexture, hairLength) => {
          updateAvatarProfile(avatarId, skinTone, hairTexture, hairLength)
        }}
      />

      {/* NOVO: Modal do Fluxo Guiado Spa da Semana */}
      <SpaDaSemanaModal
        isOpen={showSpaDaSemanaModal}
        onClose={() => setShowSpaDaSemanaModal(false)}
        onShareCard={(cardData) => {
          setShareCardData({
            missionTitle: cardData.missionTitle,
            points: cardData.points,
            stars: 3,
            completedAt: cardData.completedAt,
            rewardName: cardData.rewardName,
            userName: journey.name || 'Visitante',
            avatarId: journey.avatarId,
            skinTone: journey.skinTone,
            hairTexture: journey.hairTexture,
            unlockedAccessories: journey.unlockedAccessories,
            selectedAccessoryId: journey.selectedAccessoryId,
            selectedAccessoriesList: journey.selectedAccessoriesList,
            isRitualCompleto: true,
            achievementType: cardData.achievementType,
            weeklyIntention: cardData.weeklyIntention,
          })
        }}
      />

      {/* NOVO: Modal do Álbum de Cards Compartilhados */}
      <SharedCardsAlbumModal isOpen={showAlbumModal} onClose={() => setShowAlbumModal(false)} />

      {/* NOVO: Modal de Aniversário de Jornada */}
      {activeAnniversaryDays && (
        <JourneyAnniversaryModal
          isOpen={showAnniversaryModal}
          days={activeAnniversaryDays}
          onClose={() => setShowAnniversaryModal(false)}
          onShareCard={(cardData) => {
            setShareCardData({
              missionTitle: cardData.missionTitle,
              points: cardData.points,
              stars: 3,
              completedAt: cardData.completedAt,
              rewardName: cardData.rewardName,
              userName: journey.name || 'Visitante',
              avatarId: journey.avatarId,
              skinTone: journey.skinTone,
              hairTexture: journey.hairTexture,
              unlockedAccessories: journey.unlockedAccessories,
              selectedAccessoryId: journey.selectedAccessoryId,
              selectedAccessoriesList: journey.selectedAccessoriesList,
              isRitualCompleto: true,
              achievementType: cardData.achievementType,
              weeklyIntention: cardData.weeklyIntention,
            })
          }}
        />
      )}

      {/* NOVO: Modal do Modo Presente 💛 */}
      <GiftModeModal isOpen={showGiftModal} onClose={() => setShowGiftModal(false)} />

      {/* NOVO: Modal da Estante de Cartas 💌 */}
      <FriendLettersShelf isOpen={showLettersModal} onClose={() => setShowLettersModal(false)} />

      {/* Layout de Impressão Papel A5 (invisível em tela, renderizado apenas para window.print()) */}
      <DiaryPrintLayout
        userName={journey.name || 'Visitante'}
        notes={journey.diaryNotes || []}
        streakDays={currentStreak}
        totalMinutes={totalCareMinutes}
        points={journey.points}
      />

      {/* Aviso institucional discreto e link Sobre o Conceito */}
      <footer className="pt-6 pb-2 text-center space-y-2">
        <button
          type="button"
          onClick={() => navigate('/sobre')}
          className="text-xs text-[#D4AF37] hover:underline font-semibold transition-colors inline-flex items-center gap-1"
        >
          <span>Sobre o conceito & filosofia do app</span>
          <span>→</span>
        </button>

        <p className="text-[10px] text-[#888888] max-w-xs mx-auto leading-relaxed">
          Conceito independente para desafio de inovação, sem vínculo oficial com a marca.
        </p>
      </footer>
    </div>
  )
}

export default HomePage
