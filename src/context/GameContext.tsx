import React, { createContext, useContext, useEffect, useState, useTransition } from 'react'
import type {
  UserJourney,
  TextSize,
  ThemeMode,
  AvatarId,
  SkinToneId,
  HairTextureId,
  HairLengthId,
  QuickShortcutId,
  DiaryNote,
  CustomRitual,
  CustomStep,
  SoundAmbientType,
  WeeklyIntention,
  BreathingSessionRecord,
  SavedSharedCard,
  ReceivedLetter,
} from '@/types/game'
import { ACCESSORIES_LIST, COLLECTIBLE_CARDS_LIST, type CollectibleCardItem } from '@/types/game'
import { ambientSound } from '@/lib/ambientSound'
import { authService, type UserAccount } from '@/services/auth'

const STORAGE_KEY = 'tresemme-play-journey'

const DEFAULT_STATE: UserJourney = {
  name: '',
  avatarId: 'avatar-1',
  skinTone: 'media-clara',
  hairTexture: 'liso',
  points: 0,
  unlockedAccessories: [],
  completedMissions: [],
  missionHistory: [],
  diaryNotes: [],
  customRituals: [],
  breathingSessions: [],
  perfectRitualDates: [],
  weeklyIntentions: [],
  savedSharedCards: [],
  textSize: 'md',
  reducedMotion: false,
  isDemo: false,
  theme: 'dark',
  ambientSoundEnabled: false,
  selectedAmbientSound: 'chuva-suave',
  startDate: new Date().toISOString().split('T')[0],
  spaWeeks: [],
  celebratedMilestones: [],
  favoriteFriends: [],
  sentGiftsHistory: [],
  friendLetters: [],
  hasSeenTour: false,
  tourCompletedAt: undefined,
  customShortcuts: ['spa', 'respirar', 'diario', 'presente'],
  lastVisitedAt: undefined,
}
interface GameContextType {
  journey: UserJourney
  hasSession: boolean
  currentUser: UserAccount | null
  isDemo: boolean
  theme: ThemeMode
  startDemo: () => void
  startJourney: (
    name: string,
    avatarId: AvatarId,
    skinTone?: SkinToneId,
    hairTexture?: HairTextureId,
    hairLength?: HairLengthId,
  ) => void
  updateAvatarProfile: (
    avatarId: AvatarId,
    skinTone: SkinToneId,
    hairTexture: HairTextureId,
    hairLength?: HairLengthId,
  ) => void
  recordBreathingSession: (cycles: number, contextTitle?: string) => { isNewPerfectRitual: boolean }
  getLocalDateKey: (date?: Date) => string
  checkPerfectRitualForDate: (dateKey: string) => {
    isPerfect: boolean
    hasRitual: boolean
    hasBreathing: boolean
    hasDiary: boolean
  }
  dismissPerfectRitualCelebration: (dateKey: string) => void
  getWeekInfo: (date?: Date) => { weekKey: string; weekLabel: string }
  getCurrentWeekIntention: () => WeeklyIntention | undefined
  setWeeklyIntention: (intention: string) => void
  completeMission: (
    missionId: string,
    pointsAwarded: number,
    accessoryId?: string,
    historyData?: { missionTitle: string; rewardName: string },
  ) => {
    isNewTrioCompletion: boolean
    isNewWeeklyCompletion: boolean
    isNewCollectorCompletion: boolean
  }
  addOrUpdateDiaryNote: (missionId: string, noteText: string, missionTitle?: string) => void
  deleteDiaryNote: (noteId: string) => void
  setSelectedAccessory: (accessoryId: string | null) => void
  setSelectedAccessoriesList: (accessoryIds: string[] | undefined) => void
  saveLook: (name: string, accessoryIds: string[]) => void
  deleteLook: (lookId: string) => void
  applyLook: (lookId: string) => void
  addCustomRitual: (title: string, description: string, steps: CustomStep[]) => string
  deleteCustomRitual: (ritualId: string) => void
  dismissDailyReminder: () => void
  hasCompletedRitualToday: () => boolean
  setTextSize: (size: TextSize) => void
  setReducedMotion: (enabled: boolean) => void
  setTheme: (theme: ThemeMode) => void
  toggleTheme: () => void
  resetJourney: () => void
  isAccessibilityOpen: boolean
  setAccessibilityOpen: (open: boolean) => void
  recordWeeklyGoalReached: () => void
  recordCollectorUnlocked: () => void
  isAmbientPlaying: boolean
  toggleAmbientSound: (explicitSound?: SoundAmbientType) => void
  setAmbientSoundType: (sound: SoundAmbientType) => void
  stopAmbientSound: () => void
  saveSharedCard: (card: Omit<SavedSharedCard, 'id' | 'savedAt'>) => string
  deleteSharedCard: (cardId: string) => void
  completeSpaDaSemana: (params: {
    intention: string
    missionId: string
    missionTitle: string
    pointsAwarded: number
    rewardName: string
    diaryNoteText: string
    breathingCycles: number
  }) => { isNewPerfectRitual: boolean; isNewSpaStreak: boolean; spaStreakCount: number }
  /** Streak de Spas (4 semanas consecutivas) */
  spaWeeks: string[]
  spaStreakCount: number
  hasCompletedSpaThisWeek: boolean
  clearSpaStreakCelebration: () => void
  /** Aniversário de Jornada */
  startDate: string
  daysSinceStart: number
  celebratedMilestones: number[]
  uncelebratedMilestone: number | null
  celebrateMilestone: (days: number) => void
  /** Lembrança semanal gentil do Spa */
  dismissSpaReminder: () => void
  isSpaReminderDismissedThisWeek: boolean
  /** Caderno de Amigas */
  favoriteFriends: {
    id: string
    name: string
    addedAt: string
  }[]
  addFavoriteFriend: (name: string) => boolean
  updateFavoriteFriend: (id: string, newName: string) => void
  removeFavoriteFriend: (id: string) => void
  /** Histórico de presentes enviados */
  sentGiftsHistory: {
    id: string
    message: string
    recipientName?: string
    sentAt: string
  }[]
  recordSentGift: (message: string, recipientName?: string) => void
  /** Estante de Cartas */
  friendLetters: ReceivedLetter[]
  readLetterIds: string[]
  markLetterAsRead: (letterId: string) => {
    isNewCollectibleCard: boolean
    newCardNumber?: number
    newCardTitle?: string
    isNewCollectorUnlock: boolean
  }
  unlockedCollectibleCardIds: string[]
  focusedMissionsCompletedCount: number
  recordFocusedMissionCompleted: () => void
  addLetterFromCode: (codeOrData: string) => { success: boolean; error?: string }
  addLetterDirect: (letter: Omit<ReceivedLetter, 'id' | 'receivedAt'>) => void
  deleteLetter: (letterId: string) => void
  sendLetterToAccount: (payload: {
    recipientEmail: string
    recipientName?: string
    message: string
    theme?: string
    avatarChoice?: string
  }) => Promise<{ success: boolean; error?: string }>
  /** Autenticação e sincronização */
  loginUser: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>
  registerUser: (
    name: string,
    email: string,
    pass: string,
  ) => Promise<{ success: boolean; error?: string }>
  requestPasswordReset: (email: string) => Promise<{ success: boolean; error?: string }>
  logoutUser: () => void
  syncStatus: 'idle' | 'syncing' | 'synced' | 'error'
  isOfflineMode: boolean
  /** Passeio guiado de primeira visita */
  isTourOpen: boolean
  startTour: () => void
  closeTour: () => void
  completeTour: () => void
  dismissTour: () => void
  celebrateTourSuccess: boolean
  dismissTourCelebration: () => void
  setCustomShortcuts: (shortcuts: QuickShortcutId[]) => void
  recordVisit: () => void
}

const GameContext = createContext<GameContextType | undefined>(undefined)

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [, startTransition] = useTransition()
  const [journey, setJourney] = useState<UserJourney>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = { ...DEFAULT_STATE, ...JSON.parse(stored) }
        // Se a usuária já possuía conquista de Ritual Perfeito registrada,
        // garante desbloqueio retrocompatível dos acessórios especiais
        const hasExistingPerfect = (parsed.perfectRitualDates || []).length > 0
        let accs = parsed.unlockedAccessories || []
        if (hasExistingPerfect) {
          const toAdd = ['harmony-glow', 'ritual-star'].filter((accId) => !accs.includes(accId))
          if (toAdd.length > 0) {
            accs = [...accs, ...toAdd]
          }
        }

        // Retrocompatibilidade para startDate: se não existir, infere a partir do primeiro registro
        // do histórico de missões, diário ou respiração, ou hoje.
        if (!parsed.startDate) {
          let earliestDate: string | undefined
          if (parsed.missionHistory && parsed.missionHistory.length > 0) {
            // Pode haver completedAt
            earliestDate = new Date().toISOString().split('T')[0]
          }
          parsed.startDate = earliestDate || new Date().toISOString().split('T')[0]
        }

        // Retrocompatibilidade para spaWeeks a partir de spa-capilar-domingo no histórico
        if (!parsed.spaWeeks || parsed.spaWeeks.length === 0) {
          const spaWeeksSet = new Set<string>()
          if (
            parsed.completedMissions &&
            parsed.completedMissions.includes('spa-capilar-domingo')
          ) {
            // Atribui semana corrente como ponto de partida retroativo
            const now = new Date()
            const d = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()))
            const dayNum = d.getUTCDay() || 7
            d.setUTCDate(d.getUTCDate() + 4 - dayNum)
            const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
            const weekNo = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7)
            spaWeeksSet.add(`${d.getUTCFullYear()}-W${String(weekNo).padStart(2, '0')}`)
          }
          parsed.spaWeeks = Array.from(spaWeeksSet)
        }

        if (parsed.spaStreakCelebratedAt && !accs.includes('colar-conchas-gold')) {
          accs = [...accs, 'colar-conchas-gold']
        }

        if (!parsed.celebratedMilestones) {
          parsed.celebratedMilestones = []
        }

        // Retroatividade: marcos de 90 e 365 dias já celebrados desbloqueiam os acessórios correspondentes
        if (parsed.celebratedMilestones.includes(90) && !accs.includes('tiara-comemorativa-90')) {
          accs = [...accs, 'tiara-comemorativa-90']
        }
        if (parsed.celebratedMilestones.includes(365) && !accs.includes('coroa-jornada-365')) {
          accs = [...accs, 'coroa-jornada-365']
        }

        // Retrocompatibilidade para cartões colecionáveis e broche de cartas se houver cartas já lidas
        // Também infere cartas que já possuem readAt registrado
        const lettersWithReadAt = (parsed.friendLetters || [])
          .filter((l: any) => Boolean(l.readAt))
          .map((l: any) => l.id)
        const existingReadLetterIds: string[] = Array.from(
          new Set([...(parsed.readLetterIds || []), ...lettersWithReadAt]),
        )
        parsed.readLetterIds = existingReadLetterIds

        const existingUnlockedCardIds: string[] = parsed.unlockedCollectibleCardIds || []
        const updatedUnlockedCards = [...existingUnlockedCardIds]
        COLLECTIBLE_CARDS_LIST.forEach((card) => {
          if (
            existingReadLetterIds.length >= card.requiredReadLetters &&
            !updatedUnlockedCards.includes(card.id)
          ) {
            updatedUnlockedCards.push(card.id)
          }
        })
        parsed.unlockedCollectibleCardIds = updatedUnlockedCards

        // O Broche de Cartas Dourado é concedido ao COMPLETAR toda a série (4 cartões / 16 cartas lidas)
        if (
          (updatedUnlockedCards.length >= COLLECTIBLE_CARDS_LIST.length ||
            existingReadLetterIds.length >= 16) &&
          !accs.includes('broche-cartas-ouro')
        ) {
          accs = [...accs, 'broche-cartas-ouro']
        }

        parsed.unlockedAccessories = accs

        return parsed
      }
    } catch {
      // ignore JSON parse error
    }
    return DEFAULT_STATE
  })

  const [isAccessibilityOpen, setAccessibilityOpen] = useState(false)
  const [isAmbientPlaying, setIsAmbientPlaying] = useState(false)
  const [isTourOpen, setIsTourOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() =>
    authService.getCurrentUser(),
  )
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'synced' | 'error'>('idle')
  const [isOfflineMode, setIsOfflineMode] = useState(false)

  // Sync journey to localStorage & remote PocketBase
  useEffect(() => {
    try {
      if (
        journey.name ||
        journey.isDemo ||
        journey.points > 0 ||
        journey.textSize !== 'md' ||
        journey.reducedMotion ||
        currentUser
      ) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(journey))
      }
    } catch {
      // storage unavailable
    }

    // Se estiver logado em conta e não for modo demo pura não-associada, sincronizar com backend
    if (currentUser && !journey.isDemo) {
      setSyncStatus('syncing')
      authService
        .saveRemoteJourney(currentUser.id, journey)
        .then(() => {
          setSyncStatus('synced')
          setIsOfflineMode(false)
        })
        .catch(() => {
          setSyncStatus('error')
          setIsOfflineMode(true)
        })
    }
  }, [journey, currentUser])

  // Sync text size to <html> attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-text-size', journey.textSize)
  }, [journey.textSize])

  // Sync theme mode to <html> attribute and class
  const currentTheme = journey.theme || 'dark'
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme)
    if (currentTheme === 'light') {
      document.documentElement.classList.add('light-mode')
      document.documentElement.classList.remove('dark')
      document.body.classList.add('light-theme')
    } else {
      document.documentElement.classList.remove('light-mode')
      document.documentElement.classList.add('dark')
      document.body.classList.remove('light-theme')
    }
  }, [currentTheme])

  // Sync reduced motion to body class and html
  useEffect(() => {
    if (journey.reducedMotion) {
      document.body.classList.add('reduced-motion')
    } else {
      document.body.classList.remove('reduced-motion')
    }
  }, [journey.reducedMotion])

  const startDemo = () => {
    const demoData: UserJourney = {
      name: 'Visitante',
      avatarId: 'avatar-1',
      skinTone: 'media-clara',
      hairTexture: 'liso',
      points: 20,
      unlockedAccessories: [],
      completedMissions: [],
      textSize: journey.textSize,
      reducedMotion: journey.reducedMotion,
      isDemo: true,
      theme: journey.theme || 'dark',
      breathingSessions: [],
      perfectRitualDates: [],
      weeklyIntentions: [],
      startDate: new Date().toISOString().split('T')[0],
      spaWeeks: [],
      celebratedMilestones: [],
    }
    setJourney(demoData)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(demoData))
    } catch {
      /* intentionally ignored */
    }
  }

  const startJourney = (
    name: string,
    avatarId: AvatarId,
    skinTone?: SkinToneId,
    hairTexture?: HairTextureId,
    hairLength?: HairLengthId,
  ) => {
    // Se skinTone ou hairTexture não forem informados, mapear do default de avatarId
    const defaultSkin: SkinToneId =
      avatarId === 'avatar-4'
        ? 'retinta'
        : avatarId === 'avatar-2'
          ? 'bronze'
          : avatarId === 'avatar-3' || avatarId === 'avatar-5'
            ? 'clara'
            : avatarId === 'avatar-6'
              ? 'dourada'
              : 'media-clara'
    const defaultTexture: HairTextureId =
      avatarId === 'avatar-2' || avatarId === 'avatar-6'
        ? 'cacheado'
        : avatarId === 'avatar-3' || avatarId === 'avatar-5'
          ? 'ondulado'
          : avatarId === 'avatar-4'
            ? 'crespo'
            : 'liso'

    const journeyData: UserJourney = {
      name: name.trim() || 'Participante',
      avatarId,
      skinTone: skinTone || defaultSkin,
      hairTexture: hairTexture || defaultTexture,
      hairLength: hairLength || 'longo',
      points: 20,
      unlockedAccessories: [],
      completedMissions: [],
      textSize: journey.textSize,
      reducedMotion: journey.reducedMotion,
      isDemo: false,
      theme: journey.theme || 'dark',
      breathingSessions: [],
      perfectRitualDates: [],
      weeklyIntentions: [],
      startDate: new Date().toISOString().split('T')[0],
      spaWeeks: [],
      celebratedMilestones: [],
    }
    setJourney(journeyData)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(journeyData))
    } catch {
      /* intentionally ignored */
    }
  }

  const completeMission = (
    missionId: string,
    pointsAwarded: number,
    accessoryId?: string,
    historyData?: { missionTitle: string; rewardName: string },
  ) => {
    let isNewTrioCompletion = false
    let isNewWeeklyCompletion = false
    let isNewCollectorCompletion = false

    setJourney((prev) => {
      // Se a missão já foi completada, não re-pontua, mas garante consistência
      const alreadyCompleted = prev.completedMissions.includes(missionId)
      const newMissions = alreadyCompleted
        ? prev.completedMissions
        : [...prev.completedMissions, missionId]
      const newAccessories =
        accessoryId && !prev.unlockedAccessories.includes(accessoryId)
          ? [...prev.unlockedAccessories, accessoryId]
          : prev.unlockedAccessories

      const newHistory = [...(prev.missionHistory || [])]
      // Se ainda não consta no histórico ou para registrar conclusão
      const existingHistoryIndex = newHistory.findIndex((h) => h.missionId === missionId)
      const now = new Date()
      // Formatação amigável em pt-BR (ex: "18 de mai., 14:30" ou dd/MM às HH:mm)
      const formattedDate = new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      }).format(now)

      let fallbackTitle = 'Trança simples'
      let fallbackReward = 'Prenda de Cabelo Dourada'
      if (missionId.startsWith('custom-')) {
        const custom = (prev.customRituals || []).find((r) => r.id === missionId)
        fallbackTitle = custom?.title || 'Ritual Personalizado'
        fallbackReward = 'Selo de Autocuidado Criativo'
      } else if (missionId === 'coque-elegante') {
        fallbackTitle = 'Coque elegante'
        fallbackReward = 'Pino de Pérola'
      } else if (missionId === 'ondas-naturais') {
        fallbackTitle = 'Ondas naturais'
        fallbackReward = 'Tiara de Ondas Dourada'
      } else if (missionId === 'hidratacao-da-noite') {
        fallbackTitle = 'Hidratação da Noite'
        fallbackReward = 'Lenço de Cetim Dourado'
      } else if (missionId === 'massagem-relaxante') {
        fallbackTitle = 'Massagem Relaxante'
        fallbackReward = 'Brincos de Meia-Lua Dourados'
      } else if (missionId === 'hidratacao-matinal') {
        fallbackTitle = 'Toque de Hidratação Matinal'
        fallbackReward = 'Scrunchie Dourado'
      } else if (missionId === 'protecao-dia') {
        fallbackTitle = 'Proteção para o Dia'
        fallbackReward = 'Presilha Dourada do Amanhecer'
      } else if (missionId === 'spa-capilar-domingo') {
        fallbackTitle = 'Spa Capilar de Domingo'
        fallbackReward = 'Faixa Spa Dourada'
      } else if (missionId === 'semana-segunda') {
        fallbackTitle = 'Segunda da Limpeza Leve'
        fallbackReward = 'Selo Segunda de Foco'
      } else if (missionId === 'semana-terca') {
        fallbackTitle = 'Terça de Nutrição Reparadora'
        fallbackReward = 'Prendedor de Estrela Dourada'
      } else if (missionId === 'semana-quarta') {
        fallbackTitle = 'Quarta do Equilíbrio e Bruma'
        fallbackReward = 'Scrunchie Dourado'
      } else if (missionId === 'semana-quinta') {
        fallbackTitle = 'Quinta do Fortalecimento'
        fallbackReward = 'Fita Dourada Entrelaçada'
      } else if (missionId === 'semana-sexta') {
        fallbackTitle = 'Sexta de Brilho Espelhado'
        fallbackReward = 'Laço Dourado de Cetim'
      } else if (missionId === 'semana-sabado') {
        fallbackTitle = 'Sábado Livre & Expressão'
        fallbackReward = 'Tiara de Ondas Dourada'
      } else if (missionId === 'semana-domingo') {
        fallbackTitle = 'Domingo de Revitalização'
        fallbackReward = 'Coroa de Cristais Dourados'
      } else if (missionId === 'ritual-fim-de-ano') {
        fallbackTitle = 'Ritual de Fim de Ano'
        fallbackReward = 'Broche Constelação de Fim de Ano'
      }

      const historyEntry = {
        missionId,
        missionTitle: historyData?.missionTitle || fallbackTitle,
        completedAt: formattedDate,
        pointsAwarded,
        rewardName: historyData?.rewardName || fallbackReward,
        stars: 3,
      }

      if (existingHistoryIndex >= 0) {
        // atualiza timestamp
        newHistory[existingHistoryIndex] = historyEntry
      } else {
        newHistory.unshift(historyEntry)
      }

      const allThreeDone =
        newMissions.includes('tranca-simples') &&
        newMissions.includes('coque-elegante') &&
        newMissions.includes('ondas-naturais')

      if (allThreeDone && !prev.ritualCompletoUnlockedAt) {
        isNewTrioCompletion = true
      }

      // Checa Meta Semanal (5 rituais)
      const totalRitualsCount = Math.max(newHistory.length, newMissions.length)
      if (totalRitualsCount >= 5 && !prev.semanaPerfeitaUnlockedAt) {
        isNewWeeklyCompletion = true
      }

      // Checa Colecionadora (todos os acessórios desbloqueados)
      const allAccessoriesCount = ACCESSORIES_LIST.length
      if (newAccessories.length >= allAccessoriesCount && !prev.colecionadoraUnlockedAt) {
        isNewCollectorCompletion = true
      }

      // Checa Ritual Perfeito hoje (missão concluída + respiração + diário)
      const todayKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
      const hasBreathingToday = (prev.breathingSessions || []).some(
        (b) => b.date === todayKey || (b.completedAt && b.completedAt.includes(todayKey)),
      )
      const hasDiaryToday = (prev.diaryNotes || []).some(
        (d) =>
          (d.completedAt && d.completedAt.includes(todayKey)) ||
          (d.updatedAt && d.updatedAt.includes(todayKey)),
      )

      const existingPerfectDates = prev.perfectRitualDates || []
      let updatedPerfectDates = existingPerfectDates
      let updatedAccessories = newAccessories

      if (hasBreathingToday && hasDiaryToday && !existingPerfectDates.includes(todayKey)) {
        updatedPerfectDates = [...existingPerfectDates, todayKey]
        // Desbloqueia os acessórios especiais do Ritual Perfeito
        const perfectRewards = ['harmony-glow', 'ritual-star']
        perfectRewards.forEach((r) => {
          if (!updatedAccessories.includes(r)) {
            updatedAccessories = [...updatedAccessories, r]
          }
        })
      }

      return {
        ...prev,
        points: alreadyCompleted ? prev.points : prev.points + pointsAwarded,
        completedMissions: newMissions,
        unlockedAccessories: updatedAccessories,
        missionHistory: newHistory,
        ritualCompletoUnlockedAt: allThreeDone
          ? prev.ritualCompletoUnlockedAt || formattedDate
          : prev.ritualCompletoUnlockedAt,
        semanaPerfeitaUnlockedAt:
          totalRitualsCount >= 5
            ? prev.semanaPerfeitaUnlockedAt || formattedDate
            : prev.semanaPerfeitaUnlockedAt,
        colecionadoraUnlockedAt:
          updatedAccessories.length >= allAccessoriesCount
            ? prev.colecionadoraUnlockedAt || formattedDate
            : prev.colecionadoraUnlockedAt,
        perfectRitualDates: updatedPerfectDates,
      }
    })
    return { isNewTrioCompletion, isNewWeeklyCompletion, isNewCollectorCompletion }
  }

  // Utilitário para formatar a data local YYYY-MM-DD (garante mesma data independente de timezone)
  const getLocalDateKey = (d: Date = new Date()): string => {
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  // Helper para verificar se um timestamp/string ISO ou formatada pertence à data local YYYY-MM-DD
  const matchesLocalDateKey = (dateStr: string | undefined, targetKey: string): boolean => {
    if (!dateStr) return false
    // Se a string já contém YYYY-MM-DD
    if (dateStr.includes(targetKey)) return true

    // Tentar converter de ISO
    const parsed = new Date(dateStr)
    if (!isNaN(parsed.getTime())) {
      if (getLocalDateKey(parsed) === targetKey) return true
    }

    // Se a string está em pt-BR (ex: "18 de mai., 14:30" ou "18 mai")
    const [targetYear, targetMonth, targetDay] = targetKey.split('-').map(Number)
    const targetDate = new Date(targetYear, targetMonth - 1, targetDay)
    const targetFormattedMonth = new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'short',
    }).format(targetDate)

    const cleanDateStr = dateStr.toLowerCase().replace('.', '')
    const cleanTargetMonth = targetFormattedMonth.toLowerCase().replace('.', '')

    return cleanDateStr.includes(cleanTargetMonth)
  }

  // Atualiza Tom de Pele, Textura de Cabelo, Comprimento e Estilo de Avatar
  const updateAvatarProfile = (
    avatarId: AvatarId,
    skinTone?: SkinToneId,
    hairTexture?: HairTextureId,
    hairLength?: HairLengthId,
  ) => {
    setJourney((prev) => ({
      ...prev,
      avatarId,
      skinTone: skinTone || prev.skinTone || 'media-clara',
      hairTexture: hairTexture || prev.hairTexture || 'liso',
      hairLength: hairLength || prev.hairLength || 'longo',
    }))
  }

  // Checa se na data fornecida temos os 3 requisitos para Ritual Perfeito:
  // 1) Missão/ritual concluído
  // 2) Sessão de respiração guiada
  // 3) Nota no diário de autocuidado
  const checkPerfectRitualForDate = (dateKey: string) => {
    const hasRitual = (journey.missionHistory || []).some((m) =>
      matchesLocalDateKey(m.completedAt, dateKey),
    )
    const hasBreathing = (journey.breathingSessions || []).some(
      (b) => b.date === dateKey || matchesLocalDateKey(b.completedAt, dateKey),
    )
    const hasDiary = (journey.diaryNotes || []).some(
      (d) =>
        matchesLocalDateKey(d.completedAt, dateKey) || matchesLocalDateKey(d.updatedAt, dateKey),
    )

    return {
      isPerfect: hasRitual && hasBreathing && hasDiary,
      hasRitual,
      hasBreathing,
      hasDiary,
    }
  }

  // Registra sessão de respiração consciente com data local
  const recordBreathingSession = (cycles: number, contextTitle?: string) => {
    const now = new Date()
    const todayKey = getLocalDateKey(now)
    const formattedDate = new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    }).format(now)

    const session: BreathingSessionRecord = {
      id: `breath-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      date: todayKey,
      completedAt: formattedDate,
      cycles: Math.max(1, cycles),
      contextTitle,
    }

    let isNewPerfectRitual = false

    setJourney((prev) => {
      const updatedSessions = [session, ...(prev.breathingSessions || [])]
      const existingDates = prev.perfectRitualDates || []

      // Checa se o dia de hoje atingiu o trio do Ritual Perfeito
      const hasRitualToday = (prev.missionHistory || []).some((m) =>
        matchesLocalDateKey(m.completedAt, todayKey),
      )
      const hasDiaryToday = (prev.diaryNotes || []).some(
        (d) =>
          matchesLocalDateKey(d.completedAt, todayKey) ||
          matchesLocalDateKey(d.updatedAt, todayKey),
      )

      let updatedDates = existingDates
      let updatedAccessories = prev.unlockedAccessories || []
      if (hasRitualToday && hasDiaryToday && !existingDates.includes(todayKey)) {
        updatedDates = [...existingDates, todayKey]
        isNewPerfectRitual = true
        // Desbloqueia os acessórios especiais do Ritual Perfeito
        const perfectRewards = ['harmony-glow', 'ritual-star']
        perfectRewards.forEach((r) => {
          if (!updatedAccessories.includes(r)) {
            updatedAccessories = [...updatedAccessories, r]
          }
        })
      }

      return {
        ...prev,
        breathingSessions: updatedSessions,
        unlockedAccessories: updatedAccessories,
        perfectRitualDates: updatedDates,
      }
    })

    return { isNewPerfectRitual }
  }

  const dismissPerfectRitualCelebration = (dateKey: string) => {
    setJourney((prev) => ({
      ...prev,
      lastCelebratedPerfectRitualDate: dateKey,
    }))
  }

  // Cálculo da Chave da Semana (ex.: "2025-W21" e rótulo "19 a 25 de mai.")
  const getWeekInfo = (date: Date = new Date()) => {
    const now = new Date(date)
    const dayOfWeek = now.getDay() // 0 = dom, 1 = seg ...
    const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek
    const monday = new Date(now)
    monday.setDate(now.getDate() + diffToMonday)
    monday.setHours(0, 0, 0, 0)

    const sunday = new Date(monday)
    sunday.setDate(monday.getDate() + 6)

    const mondayDay = monday.getDate()
    const sundayDay = sunday.getDate()
    const monthFormatter = new Intl.DateTimeFormat('pt-BR', { month: 'short' })
    const mondayMonth = monthFormatter.format(monday)
    const sundayMonth = monthFormatter.format(sunday)

    const label =
      mondayMonth === sundayMonth
        ? `${mondayDay} a ${sundayDay} de ${mondayMonth}`
        : `${mondayDay} de ${mondayMonth} a ${sundayDay} de ${sundayMonth}`

    // Chave da semana ISO
    const year = monday.getFullYear()
    const firstJan = new Date(year, 0, 1)
    const numberOfDays = Math.floor((monday.getTime() - firstJan.getTime()) / (24 * 60 * 60 * 1000))
    const weekNumber = Math.ceil((numberOfDays + firstJan.getDay() + 1) / 7)
    const weekKey = `${year}-W${String(weekNumber).padStart(2, '0')}`

    return { weekKey, weekLabel: label }
  }

  const getCurrentWeekIntention = (): WeeklyIntention | undefined => {
    const { weekKey } = getWeekInfo()
    return (journey.weeklyIntentions || []).find((w) => w.weekKey === weekKey)
  }

  // Salva ou atualiza intenção para a semana corrente
  const setWeeklyIntention = (intention: string) => {
    const trimmed = intention.trim()
    if (!trimmed) return

    const { weekKey, weekLabel } = getWeekInfo()
    const now = new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'short',
    }).format(new Date())

    setJourney((prev) => {
      const currentList = prev.weeklyIntentions || []
      const existingIdx = currentList.findIndex((w) => w.weekKey === weekKey)

      let updated: WeeklyIntention[]
      if (existingIdx >= 0) {
        updated = [...currentList]
        updated[existingIdx] = {
          ...updated[existingIdx],
          intention: trimmed,
          weekLabel,
          createdAt: now,
        }
      } else {
        const newIntention: WeeklyIntention = {
          id: `intent-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          weekKey,
          weekLabel,
          intention: trimmed,
          createdAt: now,
        }
        updated = [newIntention, ...currentList]
      }

      return {
        ...prev,
        weeklyIntentions: updated,
      }
    })
  }

  const recordWeeklyGoalReached = () => {
    const formattedDate = new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'short',
    }).format(new Date())

    setJourney((prev) => {
      if (prev.semanaPerfeitaUnlockedAt) return prev
      return {
        ...prev,
        semanaPerfeitaUnlockedAt: formattedDate,
      }
    })
  }

  const recordCollectorUnlocked = () => {
    const formattedDate = new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'short',
    }).format(new Date())

    setJourney((prev) => {
      if (prev.colecionadoraUnlockedAt) return prev
      return {
        ...prev,
        colecionadoraUnlockedAt: formattedDate,
      }
    })
  }

  // Registra conclusão de missão enquanto o Modo Foco esteve ativo (1 incremento por conclusão de missão)
  const recordFocusedMissionCompleted = () => {
    setJourney((prev) => {
      const currentCount = prev.focusedMissionsCompletedCount || 0
      const updated = {
        ...prev,
        focusedMissionsCompletedCount: currentCount + 1,
      }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      } catch {
        // ignore
      }
      if (currentUser?.id) {
        authService.saveRemoteJourney(currentUser.id, updated).catch(() => {})
      }
      return updated
    })
  }

  // Marca carta como lida e verifica o desbloqueio de cartões colecionáveis a cada 4 cartas lidas
  const markLetterAsRead = (
    letterId: string,
  ): {
    isNewCollectibleCard: boolean
    newCardNumber?: number
    newCardTitle?: string
    isNewCollectorUnlock: boolean
  } => {
    let result = {
      isNewCollectibleCard: false,
      newCardNumber: undefined as number | undefined,
      newCardTitle: undefined as string | undefined,
      isNewCollectorUnlock: false,
    }

    setJourney((prev) => {
      const currentReadIds = prev.readLetterIds || []
      const isAlreadyRead = currentReadIds.includes(letterId)

      // Atualiza lista de lidas e a propriedade readAt da carta
      const updatedReadIds = isAlreadyRead ? currentReadIds : [...currentReadIds, letterId]
      const nowFormatted = new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }).format(new Date())

      const updatedLetters = (prev.friendLetters || []).map((l) =>
        l.id === letterId ? { ...l, readAt: l.readAt || nowFormatted } : l,
      )

      // Total de cartas lidas
      const totalReadCount = updatedReadIds.length
      const currentCards = prev.unlockedCollectibleCardIds || []
      const newUnlockedCards = [...currentCards]
      let newCardUnlocked: CollectibleCardItem | null = null

      // Checa os cartões colecionáveis (cada 4 cartas: 4, 8, 12, 16...)
      COLLECTIBLE_CARDS_LIST.forEach((card) => {
        if (totalReadCount >= card.requiredReadLetters && !newUnlockedCards.includes(card.id)) {
          newUnlockedCards.push(card.id)
          newCardUnlocked = card
        }
      })

      // O Broche de Cartas Dourado é concedido ao COMPLETAR toda a série (16 cartas lidas / 4 cartões), não no primeiro
      let updatedAccessories = prev.unlockedAccessories || []
      const isSeriesCompleted =
        newUnlockedCards.length >= COLLECTIBLE_CARDS_LIST.length || totalReadCount >= 16
      if (isSeriesCompleted && !updatedAccessories.includes('broche-cartas-ouro')) {
        updatedAccessories = [...updatedAccessories, 'broche-cartas-ouro']
      }

      // Re-avalia conquista "Colecionadora" dinamicamente
      const allAccessoriesCount = ACCESSORIES_LIST.length
      const isCollectorUnlocked =
        updatedAccessories.length >= allAccessoriesCount && !prev.colecionadoraUnlockedAt

      if (newCardUnlocked) {
        result = {
          isNewCollectibleCard: true,
          newCardNumber: (newCardUnlocked as CollectibleCardItem).number,
          newCardTitle: (newCardUnlocked as CollectibleCardItem).title,
          isNewCollectorUnlock: isCollectorUnlocked,
        }
      }

      const updatedJourney: UserJourney = {
        ...prev,
        friendLetters: updatedLetters,
        readLetterIds: updatedReadIds,
        unlockedCollectibleCardIds: newUnlockedCards,
        unlockedAccessories: updatedAccessories,
        colecionadoraUnlockedAt: isCollectorUnlocked
          ? prev.colecionadoraUnlockedAt || nowFormatted
          : prev.colecionadoraUnlockedAt,
      }

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedJourney))
      } catch {
        // ignore
      }
      if (currentUser?.id) {
        authService.saveRemoteJourney(currentUser.id, updatedJourney).catch(() => {})
      }

      return updatedJourney
    })

    return result
  }

  const setSelectedAccessory = (accessoryId: string | null) => {
    setJourney((prev) => ({
      ...prev,
      selectedAccessoryId: accessoryId,
      // Se definiu acessório único (ou null), limpa a lista de múltiplos
      selectedAccessoriesList: undefined,
    }))
  }

  const setSelectedAccessoriesList = (accessoryIds: string[] | undefined) => {
    setJourney((prev) => ({
      ...prev,
      selectedAccessoriesList: accessoryIds,
      selectedAccessoryId: accessoryIds && accessoryIds.length === 1 ? accessoryIds[0] : undefined,
    }))
  }

  const saveLook = (name: string, accessoryIds: string[]) => {
    const trimmed = name.trim() || 'Meu Look'
    const now = new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'short',
    }).format(new Date())

    setJourney((prev) => {
      const currentLooks = prev.savedLooks || []
      const newLook = {
        id: `look-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        name: trimmed,
        accessoryIds,
        createdAt: now,
      }
      return {
        ...prev,
        savedLooks: [newLook, ...currentLooks],
      }
    })
  }

  const deleteLook = (lookId: string) => {
    setJourney((prev) => ({
      ...prev,
      savedLooks: (prev.savedLooks || []).filter((l) => l.id !== lookId),
    }))
  }

  const applyLook = (lookId: string) => {
    setJourney((prev) => {
      const look = (prev.savedLooks || []).find((l) => l.id === lookId)
      if (!look) return prev
      return {
        ...prev,
        selectedAccessoriesList: look.accessoryIds,
        selectedAccessoryId:
          look.accessoryIds.length === 0
            ? null
            : look.accessoryIds.length === 1
              ? look.accessoryIds[0]
              : undefined,
      }
    })
  }

  const addCustomRitual = (title: string, description: string, steps: CustomStep[]): string => {
    const trimmedTitle = title.trim() || 'Meu Ritual de Autocuidado'
    const newId = `custom-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`
    const now = new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date())

    const newRitual: CustomRitual = {
      id: newId,
      title: trimmedTitle,
      description: description.trim() || 'Ritual personalizado criado por você.',
      steps:
        steps.length > 0
          ? steps
          : [
              {
                id: 'step-1',
                title: 'Passo Inicial',
                instruction: 'Prepare seus fios com carinho.',
                tip: 'Respire fundo e aproveite seu momento.',
              },
            ],
      createdAt: now,
      pointsPerStep: 10,
    }

    setJourney((prev) => ({
      ...prev,
      customRituals: [newRitual, ...(prev.customRituals || [])],
    }))

    return newId
  }

  const deleteCustomRitual = (ritualId: string) => {
    setJourney((prev) => ({
      ...prev,
      customRituals: (prev.customRituals || []).filter((r) => r.id !== ritualId),
      completedMissions: prev.completedMissions.filter((mId) => mId !== ritualId),
    }))
  }

  const dismissDailyReminder = () => {
    const today = new Date().toISOString().slice(0, 10)
    setJourney((prev) => ({
      ...prev,
      dismissedDailyReminderDate: today,
    }))
  }

  const hasCompletedRitualToday = (): boolean => {
    const today = new Date()
    const todayFormattedMonthShort = new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'short',
    }).format(today)
    const todayIsoDate = today.toISOString().slice(0, 10)

    const history = journey.missionHistory || []
    if (history.length === 0) return false

    return history.some((entry) => {
      if (!entry.completedAt) return false
      // Verifica formato ISO ou string formatada em pt-BR (ex: "18 de mai." ou "18 mai")
      if (entry.completedAt.includes(todayIsoDate)) return true
      if (entry.completedAt.toLowerCase().includes(todayFormattedMonthShort.toLowerCase())) {
        return true
      }
      return false
    })
  }

  const addOrUpdateDiaryNote = (missionId: string, noteText: string, missionTitle?: string) => {
    const trimmed = noteText.trim()
    const now = new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date())

    let title = missionTitle || 'Ritual'
    if (!missionTitle) {
      if (missionId === 'tranca-simples') title = 'Trança simples'
      else if (missionId === 'coque-elegante') title = 'Coque elegante'
      else if (missionId === 'ondas-naturais') title = 'Ondas naturais'
      else if (missionId === 'hidratacao-da-noite') title = 'Hidratação da Noite'
      else if (missionId === 'massagem-relaxante') title = 'Massagem Relaxante'
      else if (missionId === 'hidratacao-matinal') title = 'Toque de Hidratação Matinal'
      else if (missionId === 'protecao-dia') title = 'Proteção para o Dia'
      else if (missionId === 'spa-capilar-domingo') title = 'Spa Capilar de Domingo'
    }
    setJourney((prev) => {
      const existingNotes = prev.diaryNotes ? [...prev.diaryNotes] : []
      const index = existingNotes.findIndex((n) => n.missionId === missionId)

      if (index >= 0) {
        if (!trimmed) {
          // Se ficou vazio, remove
          existingNotes.splice(index, 1)
        } else {
          existingNotes[index] = {
            ...existingNotes[index],
            noteText: trimmed,
            updatedAt: now,
          }
        }
      } else if (trimmed) {
        const newNote: DiaryNote = {
          id: `note-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          missionId,
          missionTitle: title,
          completedAt: now,
          noteText: trimmed,
        }
        existingNotes.unshift(newNote)
      }

      // Sincroniza também no missionHistory se existir
      const updatedHistory = (prev.missionHistory || []).map((h) =>
        h.missionId === missionId ? { ...h, noteText: trimmed } : h,
      )

      // Checar se conquistou Ritual Perfeito após registrar a nota
      const todayKey = getLocalDateKey(new Date())
      const hasRitualToday = updatedHistory.some((m) =>
        matchesLocalDateKey(m.completedAt, todayKey),
      )
      const hasBreathingToday = (prev.breathingSessions || []).some(
        (b) => b.date === todayKey || matchesLocalDateKey(b.completedAt, todayKey),
      )

      const existingPerfectDates = prev.perfectRitualDates || []
      let updatedPerfectDates = existingPerfectDates
      let updatedAccessories = prev.unlockedAccessories || []
      if (hasRitualToday && hasBreathingToday && !existingPerfectDates.includes(todayKey)) {
        updatedPerfectDates = [...existingPerfectDates, todayKey]
        // Desbloqueia os acessórios especiais do Ritual Perfeito
        const perfectRewards = ['harmony-glow', 'ritual-star']
        perfectRewards.forEach((r) => {
          if (!updatedAccessories.includes(r)) {
            updatedAccessories = [...updatedAccessories, r]
          }
        })
      }

      return {
        ...prev,
        diaryNotes: existingNotes,
        unlockedAccessories: updatedAccessories,
        missionHistory: updatedHistory,
        perfectRitualDates: updatedPerfectDates,
      }
    })
  }
  const deleteDiaryNote = (noteId: string) => {
    setJourney((prev) => {
      const existingNotes = prev.diaryNotes ? [...prev.diaryNotes] : []
      const found = existingNotes.find((n) => n.id === noteId)
      const filtered = existingNotes.filter((n) => n.id !== noteId)

      let updatedHistory = prev.missionHistory
      if (found) {
        updatedHistory = (prev.missionHistory || []).map((h) =>
          h.missionId === found.missionId ? { ...h, noteText: undefined } : h,
        )
      }

      return {
        ...prev,
        diaryNotes: filtered,
        missionHistory: updatedHistory,
      }
    })
  }

  const setTextSize = (size: TextSize) => {
    startTransition(() => {
      setJourney((prev) => ({ ...prev, textSize: size }))
    })
  }

  const setReducedMotion = (enabled: boolean) => {
    startTransition(() => {
      setJourney((prev) => ({ ...prev, reducedMotion: enabled }))
    })
  }

  const setTheme = (theme: ThemeMode) => {
    startTransition(() => {
      setJourney((prev) => ({ ...prev, theme }))
    })
  }

  const toggleTheme = () => {
    setTheme(currentTheme === 'light' ? 'dark' : 'light')
  }

  const resetJourney = () => {
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      /* intentionally ignored */
    }
    setJourney({
      ...DEFAULT_STATE,
      textSize: journey.textSize,
      reducedMotion: journey.reducedMotion,
      theme: journey.theme || 'dark',
    })
  }

  const hasSession = Boolean(journey.name || journey.isDemo)
  const isDemo = journey.isDemo

  // Controle de Som Ambiente
  const toggleAmbientSound = (explicitSound?: SoundAmbientType) => {
    const soundToPlay = explicitSound || journey.selectedAmbientSound || 'chuva-suave'
    if (isAmbientPlaying) {
      ambientSound.stop()
      setIsAmbientPlaying(false)
      setJourney((prev) => ({ ...prev, ambientSoundEnabled: false }))
    } else {
      ambientSound.play(soundToPlay)
      setIsAmbientPlaying(true)
      setJourney((prev) => ({
        ...prev,
        ambientSoundEnabled: true,
        selectedAmbientSound: soundToPlay,
      }))
    }
  }

  const setAmbientSoundType = (sound: SoundAmbientType) => {
    setJourney((prev) => ({
      ...prev,
      selectedAmbientSound: sound,
    }))
    if (isAmbientPlaying) {
      ambientSound.play(sound)
    }
  }

  const stopAmbientSound = () => {
    ambientSound.stop()
    setIsAmbientPlaying(false)
    setJourney((prev) => ({ ...prev, ambientSoundEnabled: false }))
  }

  const saveSharedCard = (cardData: Omit<SavedSharedCard, 'id' | 'savedAt'>): string => {
    const cardId = `card-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`
    const now = new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date())

    const newCard: SavedSharedCard = {
      ...cardData,
      id: cardId,
      savedAt: now,
    }

    setJourney((prev) => {
      const existing = prev.savedSharedCards || []
      // Se já existe um card idêntico para a mesma missão no mesmo timestamp, não duplica
      const isDuplicate = existing.some(
        (c) =>
          c.missionTitle === newCard.missionTitle &&
          c.completedAt === newCard.completedAt &&
          c.points === newCard.points &&
          c.achievementType === newCard.achievementType,
      )
      if (isDuplicate) {
        return prev
      }
      return {
        ...prev,
        savedSharedCards: [newCard, ...existing],
      }
    })

    return cardId
  }

  const deleteSharedCard = (cardId: string) => {
    setJourney((prev) => ({
      ...prev,
      savedSharedCards: (prev.savedSharedCards || []).filter((c) => c.id !== cardId),
    }))
  }

  // Fluxo atômico guiado "Spa da Semana"
  // Conecta intenção da semana + missão spa + respiração + nota no diário
  // e computa a tríade do Ritual Perfeito
  const completeSpaDaSemana = (params: {
    intention: string
    missionId: string
    missionTitle: string
    pointsAwarded: number
    rewardName: string
    diaryNoteText: string
    breathingCycles: number
  }): { isNewPerfectRitual: boolean; isNewSpaStreak: boolean; spaStreakCount: number } => {
    const {
      intention,
      missionId,
      missionTitle,
      pointsAwarded,
      rewardName,
      diaryNoteText,
      breathingCycles,
    } = params

    // 1. Grava / atualiza intenção da semana
    if (intention.trim()) {
      setWeeklyIntention(intention.trim())
    }

    // 2. Conclui a missão (spa-capilar-domingo ou custom)
    completeMission(missionId, pointsAwarded, 'spa-band-gold', {
      missionTitle,
      rewardName,
    })

    // 3. Registra a respiração
    recordBreathingSession(Math.max(1, breathingCycles), missionTitle)

    // 4. Registra nota no diário
    addOrUpdateDiaryNote(
      missionId,
      diaryNoteText.trim() || 'Momento revigorante no Spa da Semana.',
      missionTitle,
    )

    // 5. Garantir que o dia de hoje seja computado como Ritual Perfeito
    const now = new Date()
    const todayKey = getLocalDateKey(now)
    const { weekKey: currentWeekKey } = getWeekInfo(now)

    let isNewPerfectRitual = false
    let isNewSpaStreak = false
    let calculatedStreakCount = 1

    setJourney((prev) => {
      const existingDates = prev.perfectRitualDates || []
      let updatedDates = existingDates
      let updatedAccessories = prev.unlockedAccessories || []

      if (!existingDates.includes(todayKey)) {
        updatedDates = [...existingDates, todayKey]
        isNewPerfectRitual = true
        const perfectRewards = ['harmony-glow', 'ritual-star', 'spa-band-gold']
        perfectRewards.forEach((r) => {
          if (!updatedAccessories.includes(r)) {
            updatedAccessories = [...updatedAccessories, r]
          }
        })
      }

      // Adiciona a semana atual ao conjunto de spaWeeks
      const currentWeeksSet = new Set(prev.spaWeeks || [])
      currentWeeksSet.add(currentWeekKey)
      const updatedSpaWeeks = Array.from(currentWeeksSet)

      // Calcula o streak consecutivo terminando nesta semana corrente
      // Verifica quantas semanas consecutivas para trás existem
      let streak = 0
      for (let w = 0; w < 52; w++) {
        const checkWeekKey = getPreviousIsoWeekKey(now, w)
        if (updatedSpaWeeks.includes(checkWeekKey)) {
          streak++
        } else {
          break
        }
      }
      calculatedStreakCount = streak

      let spaStreakCelebratedAt = prev.spaStreakCelebratedAt
      // Se alcançou 4 semanas seguidas ou mais e ainda não celebrou
      if (streak >= 4 && !spaStreakCelebratedAt) {
        isNewSpaStreak = true
        spaStreakCelebratedAt = todayKey
        // Desbloqueia Colar de Conchas Dourado
        if (!updatedAccessories.includes('colar-conchas-gold')) {
          updatedAccessories = [...updatedAccessories, 'colar-conchas-gold']
        }
      }

      return {
        ...prev,
        unlockedAccessories: updatedAccessories,
        perfectRitualDates: updatedDates,
        spaWeeks: updatedSpaWeeks,
        spaStreakCelebratedAt,
      }
    })

    return { isNewPerfectRitual, isNewSpaStreak, spaStreakCount: calculatedStreakCount }
  }

  // Helper para subtrair N semanas de uma data e retornar a chave ISO
  const getPreviousIsoWeekKey = (date: Date, weeksAgo: number): string => {
    const target = new Date(date)
    target.setDate(target.getDate() - weeksAgo * 7)
    return getWeekInfo(target).weekKey
  }

  // Cálculo do streak atual de Spas em semanas seguidas
  const currentWeekInfo = getWeekInfo()
  const currentSpaWeeks = journey.spaWeeks || []
  const hasCompletedSpaThisWeek = currentSpaWeeks.includes(currentWeekInfo.weekKey)

  // O streak considera ou a semana atual (se já fez) ou a semana passada como última (se ainda não fez nesta semana)
  let currentSpaStreak = 0
  const referenceDate = new Date()
  if (hasCompletedSpaThisWeek) {
    for (let w = 0; w < 52; w++) {
      const wk = getPreviousIsoWeekKey(referenceDate, w)
      if (currentSpaWeeks.includes(wk)) {
        currentSpaStreak++
      } else {
        break
      }
    }
  } else {
    // Se ainda não fez na semana atual, verifica se a semana passada teve spa
    const lastWeekKey = getPreviousIsoWeekKey(referenceDate, 1)
    if (currentSpaWeeks.includes(lastWeekKey)) {
      for (let w = 1; w < 52; w++) {
        const wk = getPreviousIsoWeekKey(referenceDate, w)
        if (currentSpaWeeks.includes(wk)) {
          currentSpaStreak++
        } else {
          break
        }
      }
    }
  }

  const clearSpaStreakCelebration = () => {
    // Não remove o desbloqueio do colar nem a data permanente, apenas limpa modal caso necessário
  }

  // Aniversário de Jornada
  const journeyStartDate = journey.startDate || new Date().toISOString().split('T')[0]
  const calculateDaysSinceStart = (): number => {
    try {
      const [y, m, d] = journeyStartDate.split('-').map(Number)
      const start = new Date(y, m - 1, d)
      const now = new Date()
      const diffTime = now.getTime() - start.getTime()
      const days = Math.floor(diffTime / (1000 * 60 * 60 * 24))
      return Math.max(0, days)
    } catch {
      return 0
    }
  }
  const daysSinceStart = calculateDaysSinceStart()

  const ANNIVERSARY_MILESTONES = [7, 30, 90, 365, 720, 1095]
  const celebratedMilestones = journey.celebratedMilestones || []
  // Encontra o marco atingido não celebrado (prioriza o maior atingido ainda não celebrado)
  const uncelebratedMilestone =
    ANNIVERSARY_MILESTONES.slice()
      .reverse()
      .find((m) => daysSinceStart >= m && !celebratedMilestones.includes(m)) || null

  // Textos acolhedores e inspiradores para cada marco comemorativo de aniversário de jornada
  const ANNIVERSARY_LETTER_TEXTS: Record<number, { title: string; message: string }> = {
    7: {
      title: '7 Dias de Autocuidado',
      message:
        'Querida pessoa, você completou sua primeira semana de jornada! Criar tempo para cuidar de si e dos seus fios em meio à rotina é o primeiro passo para uma transformação duradoura. Celebramos a sua presença, dedicação e delicadeza.',
    },
    30: {
      title: '30 Dias de Autocuidado',
      message:
        'Um mês inteiro de consistência dourada! Seus rituais deixaram de ser apenas passos e tornaram-se momentos sagrados de reconexão e bem-estar. Seus fios agradecem e a sua confiança reflete a beleza dessa constância.',
    },
    90: {
      title: '90 Dias de Autocuidado',
      message:
        'Uma estação inteira dedicada ao seu brilho e saúde capilar. Três meses honrando seu ritmo com paciência e carinho. Você construiu um hábito sólido e refinado, e seu autocuidado agora tem acabamento e presença dignos de salão.',
    },
    365: {
      title: '365 Dias de Autocuidado (1 Ano)',
      message:
        'Um ano completo de autocuidado profissional e amor-próprio! Foram 365 dias de respeito ao seu tempo, aos seus fios e à sua história. Você é a maestria da sua própria rotina. Parabéns por esta jornada extraordinária gravada a ouro!',
    },
    720: {
      title: '720 Dias de Autocuidado (2 Anos)',
      message:
        'Dois anos celebrando sua essência e constância dourada! 720 dias cultivando presença, aprendizado e rituais que transformaram a sua relação com o espelho. Sua dedicação inspira e seu brilho permanece inconfundível.',
    },
    1095: {
      title: '1095 Dias de Autocuidado (3 Anos)',
      message:
        'Três anos inteiros de maestria capilar e respeito profundo à sua identidade! 1095 dias de história, cuidado minucioso e rituais que se tornaram parte indissociável de quem você é. Uma jornada monumental e lendária no TRESemmé Play!',
    },
  }

  // Gera a carta de aniversário do app para um determinado marco de forma idempotente
  const createAnniversaryAppLetter = (
    days: number,
    existingLetters: ReceivedLetter[],
  ): ReceivedLetter | null => {
    // Verificar se já existe uma carta para este marco
    const letterId = `letter-anniversary-${days}`
    const alreadyExists = existingLetters.some(
      (l) => l.id === letterId || (l.isAppLetter && l.milestoneDays === days),
    )
    if (alreadyExists) return null

    const letterData = ANNIVERSARY_LETTER_TEXTS[days]
    if (!letterData) return null

    const nowFormatted = new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(new Date())

    return {
      id: letterId,
      senderName: 'TRESemmé Play',
      message: letterData.message,
      theme: 'dourado-suave',
      receivedAt: nowFormatted,
      isAppLetter: true,
      milestoneDays: days,
      avatarChoice: 'avatar-1',
    }
  }

  // Pool de mensagens de incentivo semanais variadas (rotativas, acolhedoras, linguagem inclusiva neutra pt-BR)
  const WEEKLY_INCENTIVE_MESSAGES = [
    'Que a sua semana comece com leveza e intenção. Cada pausa que você faz para cuidar dos seus fios é um abraço em você mesma(o). Você é chamada(o) a brilhar no seu próprio ritmo, sem comparações nem pressões. Tenha uma linda semana! ✨',
    'Lembre-se de respirar fundo e honrar o tempo que dedica ao seu bem-estar. O autocuidado não precisa ser demorado para ser sagrado: um toque suave nas mechas, uma respiração consciente e você já renovou suas energias. Uma semana radiante para você! 💛',
    'Você merece instantes de presença plena. Cuidar do cabelo é também acolher suas histórias, sua textura e a sua essência única. Estamos com você em cada etapa da sua jornada, celebrando cada conquista com carinho. Brilhe alto! 🌟',
    'Uma nova semana se abre como uma página em branco. Sem pressa e sem cobranças, encontre prazer nas pequenas pausas do seu dia. Você é protagonista da sua beleza e do seu equilíbrio. Muito afeto para os seus dias! 🌿',
    'Dedicar alguns minutos ao seu ritual capilar é um gesto profundo de amor-próprio. Que seus dias sejam repletos de serenidade, fios alinhados e muita confiança. Sinta-se acolhida(o) pelo TRESemmé Play! 💫',
    'A constância mais bonita é aquela feita com gentileza. Se hoje o dia pedir calma, respeite o seu ritmo; se pedir movimento, celebre a sua força. Seus fios agradecem cada cuidado que você semeia. Boa semana! 🌸',
  ]

  // Gera carta de incentivo semanal idempotente para a semana atual
  const createWeeklyIncentiveLetter = (
    currentWeekKey: string,
    currentWeekLabel: string,
    existingLetters: ReceivedLetter[],
  ): ReceivedLetter | null => {
    const letterId = `letter-weekly-${currentWeekKey}`
    // Idempotência: verificar se já existe carta com este ID ou desta semana
    const alreadyExists = existingLetters.some(
      (l) => l.id === letterId || (l.isWeeklyLetter && l.weekKey === currentWeekKey),
    )
    if (alreadyExists) return null

    // Selecionar mensagem do pool rotativo com base no hash da semana para não repetir seguidas
    let hash = 0
    for (let i = 0; i < currentWeekKey.length; i++) {
      hash = (hash * 31 + currentWeekKey.charCodeAt(i)) >>> 0
    }
    const messageIndex = hash % WEEKLY_INCENTIVE_MESSAGES.length
    const message = WEEKLY_INCENTIVE_MESSAGES[messageIndex]

    const nowFormatted = new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(new Date())

    return {
      id: letterId,
      senderName: 'TRESemmé Play',
      message,
      theme: 'dourado-suave',
      receivedAt: nowFormatted,
      isAppLetter: true,
      isWeeklyLetter: true,
      weekKey: currentWeekKey,
      weekLabel: currentWeekLabel,
      avatarChoice: 'avatar-1',
    }
  }

  // Garantir que cartas dos marcos de aniversário já alcançados e da semana atual apareçam na Estante de forma idempotente
  useEffect(() => {
    const { weekKey: currentWeekKey, weekLabel: currentWeekLabel } = getWeekInfo()

    setJourney((prev) => {
      const currentLetters = prev.friendLetters || []
      const lettersToAdd: ReceivedLetter[] = []

      // 1. Carta Semanal da semana atual (retroativa simples: apenas a semana corrente)
      const weeklyLetter = createWeeklyIncentiveLetter(currentWeekKey, currentWeekLabel, [
        ...currentLetters,
        ...lettersToAdd,
      ])
      if (weeklyLetter) {
        lettersToAdd.push(weeklyLetter)
      }

      // 2. Cartas de marcos de aniversário (a partir de 7 dias)
      if (daysSinceStart >= 7) {
        ANNIVERSARY_MILESTONES.forEach((milestone) => {
          if (daysSinceStart >= milestone) {
            const letter = createAnniversaryAppLetter(milestone, [
              ...currentLetters,
              ...lettersToAdd,
            ])
            if (letter) {
              lettersToAdd.push(letter)
            }
          }
        })
      }

      if (lettersToAdd.length === 0) {
        return prev
      }

      const updated = {
        ...prev,
        friendLetters: [...lettersToAdd, ...currentLetters],
      }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      } catch {
        // ignore
      }
      return updated
    })
  }, [daysSinceStart])

  const dismissSpaReminder = () => {
    const { weekKey: currentWeekKey } = getWeekInfo()
    setJourney((prev) => ({
      ...prev,
      dismissedSpaReminderWeek: currentWeekKey,
    }))
  }

  // Gerenciamento do Caderno de Amigas
  const addFavoriteFriend = (name: string): boolean => {
    const trimmed = name.trim()
    if (!trimmed) return false

    let added = false
    setJourney((prev) => {
      const current = prev.favoriteFriends || []
      // Evita duplicatas exatas ignorando maiúsculas
      if (current.some((f) => f.name.toLowerCase() === trimmed.toLowerCase())) {
        return prev
      }
      const newFriend = {
        id: `friend-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        name: trimmed,
        addedAt: new Date().toISOString(),
      }
      added = true
      return {
        ...prev,
        favoriteFriends: [...current, newFriend],
      }
    })
    return added
  }

  const updateFavoriteFriend = (id: string, newName: string) => {
    const trimmed = newName.trim()
    if (!trimmed) return
    setJourney((prev) => ({
      ...prev,
      favoriteFriends: (prev.favoriteFriends || []).map((f) =>
        f.id === id ? { ...f, name: trimmed } : f,
      ),
    }))
  }

  const removeFavoriteFriend = (id: string) => {
    setJourney((prev) => ({
      ...prev,
      favoriteFriends: (prev.favoriteFriends || []).filter((f) => f.id !== id),
    }))
  }

  const recordSentGift = (message: string, recipientName?: string) => {
    setJourney((prev) => {
      const history = prev.sentGiftsHistory || []
      const newEntry = {
        id: `gift-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        message: message.trim(),
        recipientName: recipientName?.trim() || undefined,
        sentAt: new Date().toISOString(),
      }
      return {
        ...prev,
        sentGiftsHistory: [newEntry, ...history].slice(0, 50),
      }
    })
  }

  const celebrateMilestone = (days: number) => {
    setJourney((prev) => {
      const currentCelebrated = prev.celebratedMilestones || []
      const currentUnlocked = prev.unlockedAccessories || []
      let updatedUnlocked = [...currentUnlocked]

      if (days >= 90 && !updatedUnlocked.includes('tiara-comemorativa-90')) {
        updatedUnlocked.push('tiara-comemorativa-90')
      }
      if (days >= 365 && !updatedUnlocked.includes('coroa-jornada-365')) {
        updatedUnlocked.push('coroa-jornada-365')
      }

      // Re-avalia conquista colecionadora
      const allAccessoriesCount = ACCESSORIES_LIST.length
      const nowFormatted = new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: 'short',
      }).format(new Date())
      const isCollectorUnlocked =
        updatedUnlocked.length >= allAccessoriesCount && !prev.colecionadoraUnlockedAt

      // Assegurar carta comemorativa na Estante de Cartas
      const currentLetters = prev.friendLetters || []
      const anniversaryLetter = createAnniversaryAppLetter(days, currentLetters)
      const updatedLetters = anniversaryLetter
        ? [anniversaryLetter, ...currentLetters]
        : currentLetters

      if (currentCelebrated.includes(days)) {
        if (
          updatedUnlocked.length !== currentUnlocked.length ||
          updatedLetters.length !== currentLetters.length
        ) {
          return {
            ...prev,
            unlockedAccessories: updatedUnlocked,
            friendLetters: updatedLetters,
            colecionadoraUnlockedAt: isCollectorUnlocked
              ? prev.colecionadoraUnlockedAt || nowFormatted
              : prev.colecionadoraUnlockedAt,
          }
        }
        return prev
      }

      return {
        ...prev,
        celebratedMilestones: [...currentCelebrated, days],
        unlockedAccessories: updatedUnlocked,
        friendLetters: updatedLetters,
        colecionadoraUnlockedAt: isCollectorUnlocked
          ? prev.colecionadoraUnlockedAt || nowFormatted
          : prev.colecionadoraUnlockedAt,
      }
    })
  }

  // Gerenciamento de Estante de Cartas
  const addLetterDirect = (letter: Omit<ReceivedLetter, 'id' | 'receivedAt'>) => {
    const now = new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date())
    const newLetter: ReceivedLetter = {
      ...letter,
      id: `letter-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      receivedAt: now,
    }

    setJourney((prev) => ({
      ...prev,
      friendLetters: [newLetter, ...(prev.friendLetters || [])],
    }))
  }

  const addLetterFromCode = (codeOrData: string): { success: boolean; error?: string } => {
    const trimmed = codeOrData.trim()
    if (!trimmed) {
      return { success: false, error: 'Por favor, informe ou cole o código da carta.' }
    }

    try {
      // O código pode vir codificado em base64 (prefixado com TP_LETTER_) ou JSON direto
      let jsonStr = trimmed
      if (trimmed.startsWith('TP_LETTER_')) {
        const base64Part = trimmed.replace('TP_LETTER_', '')
        jsonStr = decodeURIComponent(escape(atob(base64Part)))
      } else if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
        jsonStr = trimmed
      } else {
        // Tentar base64 direto
        try {
          jsonStr = decodeURIComponent(escape(atob(trimmed)))
        } catch {
          // fallback: não era base64 puro
        }
      }

      const parsed = JSON.parse(jsonStr)
      if (!parsed.message || !parsed.senderName) {
        return { success: false, error: 'Código de carta incompleto ou inválido.' }
      }

      addLetterDirect({
        senderName: parsed.senderName,
        message: parsed.message,
        theme: parsed.theme || 'preto-ouro',
        code: trimmed,
        avatarChoice: parsed.avatarChoice || 'avatar-1',
      })
      return { success: true }
    } catch {
      return {
        success: false,
        error: 'Código não reconhecido. Verifique se copiou a mensagem completa.',
      }
    }
  }

  const deleteLetter = (letterId: string) => {
    setJourney((prev) => ({
      ...prev,
      friendLetters: (prev.friendLetters || []).filter((l) => l.id !== letterId),
    }))
  }

  const sendLetterToAccount = async (payload: {
    recipientEmail: string
    recipientName?: string
    message: string
    theme?: string
    avatarChoice?: string
  }): Promise<{ success: boolean; error?: string }> => {
    const senderName =
      journey.name && !journey.isDemo ? journey.name : currentUser?.name || 'Pessoa Amiga'
    const ok = await authService.sendFriendLetter({
      senderId: currentUser?.id,
      senderName,
      recipientEmail: payload.recipientEmail,
      recipientName: payload.recipientName,
      message: payload.message,
      theme: payload.theme,
      avatarChoice: payload.avatarChoice || journey.avatarId || 'avatar-1',
    })
    if (!ok) {
      return { success: false, error: 'Não foi possível enviar a carta para a conta informada.' }
    }
    return { success: true }
  }

  // Merge seguro entre jornada local existente e jornada vinda do PocketBase
  const mergeJourneysSafely = (
    local: UserJourney,
    remote: UserJourney,
    defaultUserName: string,
  ): UserJourney => {
    // 1. Unir coleções de arrays sem perda nem duplicação
    const unlockedAccessories = Array.from(
      new Set([...(remote.unlockedAccessories || []), ...(local.unlockedAccessories || [])]),
    )
    const completedMissions = Array.from(
      new Set([...(remote.completedMissions || []), ...(local.completedMissions || [])]),
    )
    const spaWeeks = Array.from(new Set([...(remote.spaWeeks || []), ...(local.spaWeeks || [])]))
    const celebratedMilestones = Array.from(
      new Set([...(remote.celebratedMilestones || []), ...(local.celebratedMilestones || [])]),
    )
    const perfectRitualDates = Array.from(
      new Set([...(remote.perfectRitualDates || []), ...(local.perfectRitualDates || [])]),
    )

    // Merge de Looks do Cofrinho (preservar IDs únicos, evitar duplicata por ID)
    const looksMap = new Map<
      string,
      typeof local.savedLooks extends (infer U)[] | undefined ? U : never
    >()
    ;(remote.savedLooks || []).forEach((look) => looksMap.set(look.id, look))
    ;(local.savedLooks || []).forEach((look) => {
      if (!looksMap.has(look.id)) {
        looksMap.set(look.id, look)
      }
    })
    const savedLooks = Array.from(looksMap.values())

    // Merge de Caderno de Amigas Favoritas (preservar pelo nome ou ID)
    const friendsMap = new Map<string, NonNullable<typeof local.favoriteFriends>[number]>()
    ;(remote.favoriteFriends || []).forEach((f) => {
      friendsMap.set(f.id, f)
    })
    ;(local.favoriteFriends || []).forEach((f) => {
      // Se não existe pelo ID nem pelo mesmo nome (case-insensitive)
      const existsByName = Array.from(friendsMap.values()).some(
        (existing) => existing.name.toLowerCase() === f.name.toLowerCase(),
      )
      if (!friendsMap.has(f.id) && !existsByName) {
        friendsMap.set(f.id, f)
      }
    })
    const favoriteFriends = Array.from(friendsMap.values())

    // Merge de Histórico de Presentes Enviados
    const giftsMap = new Map<string, NonNullable<typeof local.sentGiftsHistory>[number]>()
    ;(remote.sentGiftsHistory || []).forEach((g) => giftsMap.set(g.id, g))
    ;(local.sentGiftsHistory || []).forEach((g) => {
      if (!giftsMap.has(g.id)) {
        giftsMap.set(g.id, g)
      }
    })
    const sentGiftsHistory = Array.from(giftsMap.values()).slice(0, 50)

    // Merge de Estante de Cartas Recebidas
    const lettersMap = new Map<string, ReceivedLetter>()
    ;(remote.friendLetters || []).forEach((l) => lettersMap.set(l.id, l))
    ;(local.friendLetters || []).forEach((l) => {
      if (!lettersMap.has(l.id)) {
        // Também verifica se não há carta idêntica (mesmo código, mesmo marco de aniversário, ou mesma mensagem e remetente)
        const isDuplicate = Array.from(lettersMap.values()).some(
          (existing) =>
            (l.isWeeklyLetter && existing.isWeeklyLetter && l.weekKey === existing.weekKey) ||
            (l.isAppLetter &&
              existing.isAppLetter &&
              l.milestoneDays &&
              l.milestoneDays === existing.milestoneDays) ||
            (l.code && existing.code === l.code) ||
            (existing.senderName === l.senderName && existing.message === l.message),
        )
        if (!isDuplicate) {
          lettersMap.set(l.id, l)
        }
      }
    })
    const friendLetters = Array.from(lettersMap.values())

    // Merge de IDs de Cartas Lidas e Cartões Colecionáveis Desbloqueados
    const readLetterIds = Array.from(
      new Set([...(remote.readLetterIds || []), ...(local.readLetterIds || [])]),
    )
    let mergedCollectibleCardIds = Array.from(
      new Set([
        ...(remote.unlockedCollectibleCardIds || []),
        ...(local.unlockedCollectibleCardIds || []),
      ]),
    )
    // Garantir que todos os cartões compatíveis com o total de cartas lidas estejam incluídos
    COLLECTIBLE_CARDS_LIST.forEach((card) => {
      if (
        readLetterIds.length >= card.requiredReadLetters &&
        !mergedCollectibleCardIds.includes(card.id)
      ) {
        mergedCollectibleCardIds.push(card.id)
      }
    })
    const unlockedCollectibleCardIds = mergedCollectibleCardIds

    // Se completou a série de 4 cartões / 16 cartas lidas, garante o broche exclusivo de cartas
    if (
      (unlockedCollectibleCardIds.length >= COLLECTIBLE_CARDS_LIST.length ||
        readLetterIds.length >= 16) &&
      !unlockedAccessories.includes('broche-cartas-ouro')
    ) {
      unlockedAccessories.push('broche-cartas-ouro')
    }

    const focusedMissionsCompletedCount = Math.max(
      remote.focusedMissionsCompletedCount || 0,
      local.focusedMissionsCompletedCount || 0,
    )

    // Merge de Rituais Personalizados
    const ritualsMap = new Map<string, NonNullable<typeof local.customRituals>[number]>()
    ;(remote.customRituals || []).forEach((r) => ritualsMap.set(r.id, r))
    ;(local.customRituals || []).forEach((r) => {
      if (!ritualsMap.has(r.id)) {
        ritualsMap.set(r.id, r)
      }
    })
    const customRituals = Array.from(ritualsMap.values())

    // Merge de Diário
    const notesMap = new Map<string, NonNullable<typeof local.diaryNotes>[number]>()
    ;(remote.diaryNotes || []).forEach((n) => notesMap.set(n.id || n.missionId, n))
    ;(local.diaryNotes || []).forEach((n) => {
      const key = n.id || n.missionId
      if (!notesMap.has(key)) {
        notesMap.set(key, n)
      }
    })
    const diaryNotes = Array.from(notesMap.values())

    // Merge de Cards Compartilhados
    const cardsMap = new Map<string, NonNullable<typeof local.savedSharedCards>[number]>()
    ;(remote.savedSharedCards || []).forEach((c) => cardsMap.set(c.id, c))
    ;(local.savedSharedCards || []).forEach((c) => {
      if (!cardsMap.has(c.id)) {
        cardsMap.set(c.id, c)
      }
    })
    const savedSharedCards = Array.from(cardsMap.values())

    // Merge de Histórico de Missões
    const missionHistoryMap = new Map<string, NonNullable<typeof local.missionHistory>[number]>()
    ;(remote.missionHistory || []).forEach((h) =>
      missionHistoryMap.set(h.missionId + '_' + h.completedAt, h),
    )
    ;(local.missionHistory || []).forEach((h) => {
      const key = h.missionId + '_' + h.completedAt
      if (!missionHistoryMap.has(key)) {
        missionHistoryMap.set(key, h)
      }
    })
    const missionHistory = Array.from(missionHistoryMap.values())

    // Merge de Respiração
    const breathMap = new Map<string, NonNullable<typeof local.breathingSessions>[number]>()
    ;(remote.breathingSessions || []).forEach((b) => breathMap.set(b.id, b))
    ;(local.breathingSessions || []).forEach((b) => {
      if (!breathMap.has(b.id)) {
        breathMap.set(b.id, b)
      }
    })
    const breathingSessions = Array.from(breathMap.values())

    // Merge de Intenções Semanais
    const intentionsMap = new Map<string, NonNullable<typeof local.weeklyIntentions>[number]>()
    ;(remote.weeklyIntentions || []).forEach((i) => intentionsMap.set(i.weekKey || i.id, i))
    ;(local.weeklyIntentions || []).forEach((i) => {
      const key = i.weekKey || i.id
      if (!intentionsMap.has(key)) {
        intentionsMap.set(key, i)
      }
    })
    const weeklyIntentions = Array.from(intentionsMap.values())

    // Merge de Atalhos Rápidos Personalizáveis
    const customShortcuts =
      local.customShortcuts && local.customShortcuts.length > 0
        ? local.customShortcuts
        : remote.customShortcuts && remote.customShortcuts.length > 0
          ? remote.customShortcuts
          : undefined

    // Merge de Data da Última Visita (lastVisitedAt: a mais recente entre local e remoto)
    let lastVisitedAt = remote.lastVisitedAt || local.lastVisitedAt
    if (remote.lastVisitedAt && local.lastVisitedAt) {
      lastVisitedAt =
        new Date(remote.lastVisitedAt).getTime() > new Date(local.lastVisitedAt).getTime()
          ? remote.lastVisitedAt
          : local.lastVisitedAt
    }

    // Pontos: o maior valor entre remoto e local (para nunca perder pontos conquistados)
    const points = Math.max(remote.points || 0, local.points || 0)

    // Data de início da jornada: a mais antiga conhecida
    let startDate = remote.startDate || local.startDate
    if (remote.startDate && local.startDate) {
      startDate = remote.startDate < local.startDate ? remote.startDate : local.startDate
    }

    // Acessório selecionado / look de destaque: priorizar o remoto se houver, caso contrário o local
    const selectedAccessoryId =
      remote.selectedAccessoryId !== undefined
        ? remote.selectedAccessoryId
        : local.selectedAccessoryId
    const selectedAccessoriesList =
      remote.selectedAccessoriesList && remote.selectedAccessoriesList.length > 0
        ? remote.selectedAccessoriesList
        : local.selectedAccessoriesList

    return {
      ...DEFAULT_STATE,
      ...remote,
      name: remote.name || (local.name && !local.isDemo ? local.name : defaultUserName),
      avatarId: remote.avatarId || local.avatarId || 'avatar-1',
      skinTone: remote.skinTone || local.skinTone || 'media-clara',
      hairTexture: remote.hairTexture || local.hairTexture || 'liso',
      textSize: local.textSize !== 'md' ? local.textSize : remote.textSize || 'md',
      reducedMotion: local.reducedMotion ?? remote.reducedMotion ?? false,
      theme: local.theme || remote.theme || 'dark',
      points,
      startDate,
      unlockedAccessories,
      completedMissions,
      spaWeeks,
      celebratedMilestones,
      perfectRitualDates,
      hasSeenTour: remote.hasSeenTour || local.hasSeenTour || false,
      tourCompletedAt: remote.tourCompletedAt || local.tourCompletedAt,
      savedLooks,
      favoriteFriends,
      sentGiftsHistory,
      friendLetters,
      readLetterIds,
      unlockedCollectibleCardIds,
      focusedMissionsCompletedCount,
      customRituals,
      diaryNotes,
      savedSharedCards,
      missionHistory,
      breathingSessions,
      weeklyIntentions,
      selectedAccessoryId,
      selectedAccessoriesList,
      customShortcuts,
      lastVisitedAt,
      ritualCompletoUnlockedAt: remote.ritualCompletoUnlockedAt || local.ritualCompletoUnlockedAt,
      semanaPerfeitaUnlockedAt: remote.semanaPerfeitaUnlockedAt || local.semanaPerfeitaUnlockedAt,
      colecionadoraUnlockedAt: remote.colecionadoraUnlockedAt || local.colecionadoraUnlockedAt,
      spaStreakCelebratedAt: remote.spaStreakCelebratedAt || local.spaStreakCelebratedAt,
      isDemo: false,
    }
  }

  // Ações de login / registro / logout
  const loginUser = async (
    email: string,
    pass: string,
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const user = await authService.login(email, pass)
      setCurrentUser(user)
      setIsOfflineMode(false)

      // Carregar jornada remota se houver
      const remoteJourney = await authService.fetchRemoteJourney(user.id)
      if (remoteJourney) {
        // Merge seguro entre remoto e dados locais atuais
        let merged = mergeJourneysSafely(journey, remoteJourney, user.name)

        // Buscar cartas recebidas da conta PocketBase pelo email do usuário
        try {
          const incoming = await authService.fetchIncomingLetters(user.email)
          if (incoming && incoming.length > 0) {
            const currentLetters = merged.friendLetters || []
            const newLetters = [...currentLetters]
            let addedAny = false
            for (const inc of incoming) {
              const letterId = `remote-${inc.id}`
              if (!newLetters.some((l) => l.id === letterId)) {
                newLetters.unshift({
                  id: letterId,
                  senderName: inc.senderName || 'Pessoa Querida',
                  message: inc.message,
                  receivedAt: inc.created
                    ? new Date(inc.created).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })
                    : new Date().toLocaleDateString('pt-BR'),
                  theme:
                    inc.theme === 'white-gold' || inc.theme === 'branco-dourado'
                      ? 'branco-dourado'
                      : inc.theme === 'soft-gold' || inc.theme === 'dourado-suave'
                        ? 'dourado-suave'
                        : 'preto-ouro',
                  avatarChoice: (inc.avatarChoice as any) || 'avatar-1',
                })
                addedAny = true
              }
            }
            if (addedAny) {
              merged = {
                ...merged,
                friendLetters: newLetters,
              }
            }
          }
        } catch {
          // fallback silencioso
        }

        setJourney(merged)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(merged))
        // Atualiza o backend com a união dos dados para salvar itens novos locais
        await authService.saveRemoteJourney(user.id, merged)
      } else {
        // Migrar estado local existente para a conta
        let migratedJourney: UserJourney = {
          ...journey,
          name: journey.name && !journey.isDemo ? journey.name : user.name,
          isDemo: false,
        }

        // Buscar cartas recebidas
        try {
          const incoming = await authService.fetchIncomingLetters(user.email)
          if (incoming && incoming.length > 0) {
            const currentLetters = migratedJourney.friendLetters || []
            const newLetters = [...currentLetters]
            let addedAny = false
            for (const inc of incoming) {
              const letterId = `remote-${inc.id}`
              if (!newLetters.some((l) => l.id === letterId)) {
                newLetters.unshift({
                  id: letterId,
                  senderName: inc.senderName || 'Pessoa Querida',
                  message: inc.message,
                  receivedAt: inc.created
                    ? new Date(inc.created).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })
                    : new Date().toLocaleDateString('pt-BR'),
                  theme:
                    inc.theme === 'white-gold' || inc.theme === 'branco-dourado'
                      ? 'branco-dourado'
                      : inc.theme === 'soft-gold' || inc.theme === 'dourado-suave'
                        ? 'dourado-suave'
                        : 'preto-ouro',
                  avatarChoice: (inc.avatarChoice as any) || 'avatar-1',
                })
                addedAny = true
              }
            }
            if (addedAny) {
              migratedJourney = {
                ...migratedJourney,
                friendLetters: newLetters,
              }
            }
          }
        } catch {
          // fallback silencioso
        }

        setJourney(migratedJourney)
        await authService.saveRemoteJourney(user.id, migratedJourney)
      }
      return { success: true }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Credenciais inválidas ou erro de conexão.'
      return { success: false, error: msg }
    }
  }

  const registerUser = async (
    name: string,
    email: string,
    pass: string,
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const user = await authService.register(name, email, pass)
      setCurrentUser(user)
      setIsOfflineMode(false)

      // Migra a jornada local atual para a nova conta
      const initialJourney: UserJourney = {
        ...journey,
        name: name.trim() || user.name,
        isDemo: false,
      }
      setJourney(initialJourney)
      await authService.saveRemoteJourney(user.id, initialJourney)
      return { success: true }
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : 'Erro ao criar conta. Verifique os dados inseridos.'
      return { success: false, error: msg }
    }
  }

  const requestPasswordReset = async (
    email: string,
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      await authService.requestPasswordReset(email)
      return { success: true }
    } catch (err: unknown) {
      let msg = 'Não foi possível solicitar a redefinição de senha.'
      if (err instanceof Error) {
        if (
          err.message.includes('valid email') ||
          err.message.includes('invalid') ||
          err.message.toLowerCase().includes('e-mail')
        ) {
          msg = 'Por favor, informe um endereço de e-mail válido.'
        } else {
          msg = err.message
        }
      }
      return { success: false, error: msg }
    }
  }

  const logoutUser = () => {
    authService.logout()
    setCurrentUser(null)
    // Ao deslogar, mantemos os dados no local ou reiniciamos suavemente para modo demonstrativo
  }

  // Métodos do passeio guiado
  const startTour = () => {
    setIsTourOpen(true)
  }

  const closeTour = () => {
    setIsTourOpen(false)
  }

  const [celebrateTourSuccess, setCelebrateTourSuccess] = useState(false)

  const completeTour = () => {
    setIsTourOpen(false)
    const isFirstTime = !journey.tourCompletedAt
    setJourney((prev) => {
      const nowFormatted = new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }).format(new Date())
      const updated: UserJourney = {
        ...prev,
        hasSeenTour: true,
        tourCompletedAt: prev.tourCompletedAt || nowFormatted,
      }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      } catch {
        // ignore
      }
      // Se estiver logado, persiste no backend em segundo plano
      if (currentUser?.id) {
        authService.saveRemoteJourney(currentUser.id, updated).catch(() => {})
      }
      return updated
    })
    if (isFirstTime) {
      setCelebrateTourSuccess(true)
    }
  }

  const dismissTourCelebration = () => {
    setCelebrateTourSuccess(false)
  }

  const dismissTour = () => {
    setIsTourOpen(false)
    setJourney((prev) => {
      const updated: UserJourney = { ...prev, hasSeenTour: true }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      } catch {
        // ignore
      }
      if (currentUser?.id) {
        authService.saveRemoteJourney(currentUser.id, updated).catch(() => {})
      }
      return updated
    })
  }

  const setCustomShortcuts = (shortcuts: QuickShortcutId[]) => {
    setJourney((prev) => {
      const updated: UserJourney = {
        ...prev,
        customShortcuts: shortcuts,
      }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      } catch {
        // ignore
      }
      if (currentUser?.id) {
        authService.saveRemoteJourney(currentUser.id, updated).catch(() => {})
      }
      return updated
    })
  }

  const recordVisit = () => {
    const nowIso = new Date().toISOString()
    setJourney((prev) => {
      const updated: UserJourney = {
        ...prev,
        lastVisitedAt: nowIso,
      }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      } catch {
        // ignore
      }
      if (currentUser?.id) {
        authService.saveRemoteJourney(currentUser.id, updated).catch(() => {})
      }
      return updated
    })
  }

  return (
    <GameContext.Provider
      value={{
        journey,
        hasSession,
        currentUser,
        loginUser,
        registerUser,
        requestPasswordReset,
        logoutUser,
        syncStatus,
        isOfflineMode,
        friendLetters: journey.friendLetters || [],
        readLetterIds: journey.readLetterIds || [],
        markLetterAsRead,
        unlockedCollectibleCardIds: journey.unlockedCollectibleCardIds || [],
        focusedMissionsCompletedCount: journey.focusedMissionsCompletedCount || 0,
        recordFocusedMissionCompleted,
        addLetterFromCode,
        addLetterDirect,
        deleteLetter,
        sendLetterToAccount,
        isDemo,
        theme: currentTheme,
        startDemo,
        startJourney,
        updateAvatarProfile,
        recordBreathingSession,
        getLocalDateKey,
        checkPerfectRitualForDate,
        dismissPerfectRitualCelebration,
        getWeekInfo,
        getCurrentWeekIntention,
        setWeeklyIntention,
        completeMission,
        addOrUpdateDiaryNote,
        deleteDiaryNote,
        setSelectedAccessory,
        setSelectedAccessoriesList,
        saveLook,
        deleteLook,
        applyLook,
        addCustomRitual,
        deleteCustomRitual,
        dismissDailyReminder,
        hasCompletedRitualToday,
        setTextSize,
        setReducedMotion,
        setTheme,
        toggleTheme,
        resetJourney,
        isAccessibilityOpen,
        setAccessibilityOpen,
        recordWeeklyGoalReached,
        recordCollectorUnlocked,
        isAmbientPlaying,
        toggleAmbientSound,
        setAmbientSoundType,
        stopAmbientSound,
        saveSharedCard,
        deleteSharedCard,
        completeSpaDaSemana,
        spaWeeks: journey.spaWeeks || [],
        spaStreakCount: currentSpaStreak,
        hasCompletedSpaThisWeek,
        clearSpaStreakCelebration,
        startDate: journeyStartDate,
        daysSinceStart,
        celebratedMilestones,
        uncelebratedMilestone,
        celebrateMilestone,
        dismissSpaReminder,
        isSpaReminderDismissedThisWeek:
          journey.dismissedSpaReminderWeek === currentWeekInfo.weekKey,
        favoriteFriends: journey.favoriteFriends || [],
        addFavoriteFriend,
        updateFavoriteFriend,
        removeFavoriteFriend,
        sentGiftsHistory: journey.sentGiftsHistory || [],
        recordSentGift,
        isTourOpen,
        startTour,
        closeTour,
        completeTour,
        dismissTour,
        celebrateTourSuccess,
        dismissTourCelebration,
        setCustomShortcuts,
        recordVisit,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export const useGame = () => {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error('useGame must be used within a GameProvider')
  }
  return context
}
