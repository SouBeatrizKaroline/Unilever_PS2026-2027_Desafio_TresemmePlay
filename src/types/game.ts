export type TextSize = 'sm' | 'md' | 'lg'

export type ThemeMode = 'dark' | 'light'

export type AvatarId = 'avatar-1' | 'avatar-2' | 'avatar-3' | 'avatar-4' | 'avatar-5' | 'avatar-6'

export type SkinToneId = 'clara' | 'media-clara' | 'dourada' | 'bronze' | 'escura' | 'retinta'

export type HairTextureId = 'liso' | 'ondulado' | 'cacheado' | 'crespo'

export type HairLengthId = 'careca' | 'curto-buzz' | 'curto-volume' | 'medio' | 'longo'

export type QuickShortcutId =
  | 'spa'
  | 'respirar'
  | 'diario'
  | 'estante'
  | 'presente'
  | 'missoes'
  | 'mural'
  | 'album'
  | 'acessorios'
  | 'avatar'

export interface BreathingSessionRecord {
  id: string
  date: string // YYYY-MM-DD local
  completedAt: string // ISO ou pt-BR formatada
  cycles: number
  contextTitle?: string
}

export interface WeeklyIntention {
  id: string
  weekKey: string // ex: "2025-W20"
  weekLabel: string // ex: "19 a 25 de maio"
  intention: string
  createdAt: string
}

export interface DiaryNote {
  id: string
  missionId: string
  missionTitle: string
  completedAt: string
  noteText: string
  updatedAt?: string
}

export interface RitualHistoryEntry {
  missionId: string
  missionTitle: string
  completedAt: string // ISO string ou formatada
  pointsAwarded: number
  rewardName: string
  stars: number
  noteText?: string
}

export interface SavedLook {
  id: string
  name: string
  accessoryIds: string[]
  createdAt: string
}

export interface SavedSharedCard {
  id: string
  missionTitle: string
  points: number
  stars?: number
  completedAt: string
  rewardName?: string
  userName?: string
  avatarId?: AvatarId | string
  skinTone?: SkinToneId
  hairTexture?: HairTextureId
  hairLength?: HairLengthId
  unlockedAccessories?: string[]
  selectedAccessoryId?: string | null
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
  svgString?: string
  savedAt: string
}

export interface CustomStep {
  id: string
  title: string
  instruction: string
  tip?: string
}

export interface CustomRitual {
  id: string
  title: string
  description?: string
  steps: CustomStep[]
  createdAt: string
  pointsPerStep?: number
}

export type SoundAmbientType = 'chuva-suave' | 'ondas-mar' | 'silencio-dourado'

export interface UserJourney {
  name: string
  avatarId: AvatarId
  skinTone?: SkinToneId
  hairTexture?: HairTextureId
  hairLength?: HairLengthId
  points: number
  unlockedAccessories: string[]
  completedMissions: string[]
  missionHistory?: RitualHistoryEntry[]
  diaryNotes?: DiaryNote[]
  textSize: TextSize
  reducedMotion: boolean
  isDemo: boolean
  theme?: ThemeMode
  hasCompletedAllRivals?: boolean
  ritualCompletoUnlockedAt?: string
  semanaPerfeitaUnlockedAt?: string
  colecionadoraUnlockedAt?: string
  /** ID do acessório escolhido no Cofrinho para ficar em destaque no avatar (null/'none' para nenhum, undefined para padrão/todos) */
  selectedAccessoryId?: string | null
  /** Lista de acessórios selecionados para suportar combinações/looks salvos com retrocompatibilidade */
  selectedAccessoriesList?: string[]
  /** Galeria de looks favoritos salvos pela usuária no Cofrinho */
  savedLooks?: SavedLook[]
  /** Rituais livres personalizados criados pela usuária */
  customRituals?: CustomRitual[]
  /** Histórico de sessões de respiração conscientes concluídas com data */
  breathingSessions?: BreathingSessionRecord[]
  /** Datas no formato YYYY-MM-DD em que o Ritual Perfeito foi conquistado */
  perfectRitualDates?: string[]
  /** Data mais recente em que o modal de celebração de Ritual Perfeito foi exibido/visto */
  lastCelebratedPerfectRitualDate?: string
  /** Mural de intenções semanais (ativa e passadas) */
  weeklyIntentions?: WeeklyIntention[]
  /** Data no formato YYYY-MM-DD em que o lembrete diário foi dispensado */
  dismissedDailyReminderDate?: string
  /** Preferência de som ambiente (desligado por padrão) */
  ambientSoundEnabled?: boolean
  selectedAmbientSound?: SoundAmbientType
  /** Álbum de cards visuais compartilhados/gerados */
  savedSharedCards?: SavedSharedCard[]
  /** Data de início da jornada no formato YYYY-MM-DD */
  startDate?: string
  /** Lista de semanas ISO (ex: "2025-W20") em que o Spa da Semana foi completado */
  spaWeeks?: string[]
  /** Data da celebração do marco de 4 semanas de spa */
  spaStreakCelebratedAt?: string
  /** Lista de marcos de dias de jornada celebrados (ex: [7, 30, 90, 365]) */
  celebratedMilestones?: number[]
  /** Chave da semana ISO (ex: "2025-W20") em que a lembrança gentil do Spa foi dispensada */
  dismissedSpaReminderWeek?: string
  /** Caderno de amigas: destinatárias favoritas salvas para presentear com um toque */
  favoriteFriends?: {
    id: string
    name: string
    addedAt: string
  }[]
  /** Histórico leve de mensagens de incentivo enviadas no Modo Presente */
  sentGiftsHistory?: {
    id: string
    message: string
    recipientName?: string
    sentAt: string
  }[]
  /** Estante de cartas recebidas de amigas */
  friendLetters?: ReceivedLetter[]
  /** IDs das cartas que já foram abertas/lidas em tela cheia */
  readLetterIds?: string[]
  /** Cartões colecionáveis obtidos a cada 4 cartas lidas */
  unlockedCollectibleCardIds?: string[]
  /** Total de missões concluídas com o modo foco ativo */
  focusedMissionsCompletedCount?: number
  /** Indica se a pessoa já visualizou ou dispensou o passeio guiado de primeira visita */
  hasSeenTour?: boolean
  /** Data em que o passeio guiado foi completado até o fim */
  tourCompletedAt?: string
  /** Data/timestamp ISO da última visita do usuário para destacar novidades */
  lastVisitedAt?: string
  /** Atalhos rápidos configurados pelo usuário na Home (3 a 4 itens) */
  customShortcuts?: QuickShortcutId[]
}

export interface ReceivedLetter {
  id: string
  senderName: string
  message: string
  theme: 'preto-ouro' | 'branco-dourado' | 'dourado-suave'
  receivedAt: string
  code?: string
  avatarChoice?: AvatarId
  isAppLetter?: boolean
  milestoneDays?: number
  isWeeklyLetter?: boolean
  weekKey?: string
  weekLabel?: string
  readAt?: string
}

export type WeeklyIllustrationKey =
  | 'mecha'
  | 'folha'
  | 'lua'
  | 'estrela'
  | 'flor'
  | 'concha'
  | 'coroa'
  | 'espelho'

export interface CollectibleCardItem {
  id: string
  number: number
  title: string
  subtitle: string
  description: string
  requiredReadLetters: number
  goldArtworkType: 'constellation' | 'crown-gem' | 'lotus-sun' | 'golden-shell' | 'feather-quill'
}

export interface AccessoryItem {
  id: string
  name: string
  description: string
  missionSource: string
  goldIconType:
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
  collection?:
    | 'original'
    | 'noturno'
    | 'despertar'
    | 'domingo'
    | 'semana'
    | 'ritual-perfeito'
    | 'spa-streak'
    | 'aniversario'
    | 'especial-fim-de-ano'
    | 'cartas'
}

export const MISSION_DURATIONS: Record<string, number> = {
  'tranca-simples': 10,
  'coque-elegante': 12,
  'ondas-naturais': 15,
  'hidratacao-da-noite': 8,
  'massagem-relaxante': 7,
  'hidratacao-matinal': 4,
  'protecao-dia': 5,
  'spa-capilar-domingo': 15,
  'ritual-fim-de-ano': 12,
  // Missões rotativas do Ritual da Semana
  'semana-segunda': 6,
  'semana-terca': 8,
  'semana-quarta': 5,
  'semana-quinta': 7,
  'semana-sexta': 6,
  'semana-sabado': 9,
  'semana-domingo': 10,
}

export const ACCESSORIES_LIST: AccessoryItem[] = [
  {
    id: 'hairpin-gold',
    name: 'Prenda de Cabelo Dourada',
    description: 'Acessório sofisticado que ilumina qualquer penteado trançado.',
    missionSource: 'Trança simples',
    goldIconType: 'hairpin',
    collection: 'original',
  },
  {
    id: 'pearl-pin-gold',
    name: 'Pino de Pérola',
    description: 'Pino dourado com detalhe de pérola para fixação refinada em coques.',
    missionSource: 'Coque elegante',
    goldIconType: 'pearl-pin',
    collection: 'original',
  },
  {
    id: 'tiara-waves-gold',
    name: 'Tiara de Ondas Dourada',
    description: 'Arco ondulado com banho de ouro que acompanha a curvatura e movimento dos fios.',
    missionSource: 'Ondas naturais',
    goldIconType: 'tiara',
    collection: 'original',
  },
  {
    id: 'scarf-gold',
    name: 'Lenço de Cetim Dourado',
    description: 'Envolve os fios preservando a hidratação noturna e prevenindo o atrito.',
    missionSource: 'Hidratação da Noite',
    goldIconType: 'scarf',
    collection: 'noturno',
  },
  {
    id: 'moon-earrings-gold',
    name: 'Brincos de Meia-Lua Dourados',
    description: 'Joias sutis de acabamento que celebram o ritual de serenidade e relaxamento.',
    missionSource: 'Massagem Relaxante',
    goldIconType: 'moon-earrings',
    collection: 'noturno',
  },
  {
    id: 'scrunchie-gold',
    name: 'Scrunchie Dourado',
    description:
      'Scrunchie em cetim dourado suave para prender os fios pela manhã sem marcar ou quebrar.',
    missionSource: 'Toque de Hidratação Matinal',
    goldIconType: 'scrunchie',
    collection: 'despertar',
  },
  {
    id: 'sun-clip-gold',
    name: 'Presilha Dourada do Amanhecer',
    description:
      'Presilha em formato de raio solar dourado para iluminar penteados express do dia.',
    missionSource: 'Proteção para o Dia',
    goldIconType: 'sun-clip',
    collection: 'despertar',
  },
  {
    id: 'spa-band-gold',
    name: 'Faixa Spa Dourada',
    description:
      'Faixa aveludada com detalhes em ouro que protege os fios e eleva a experiência do spa de domingo.',
    missionSource: 'Spa Capilar de Domingo',
    goldIconType: 'spa-band',
    collection: 'domingo',
  },
  // Novos Acessórios Exclusivos da Coleção "Ritual da Semana"
  {
    id: 'star-clip-gold',
    name: 'Prendedor de Estrela Dourada',
    description: 'Prendedor delicado lapidado em estrela de cinco pontas com acabamento reluzente.',
    missionSource: 'Ritual da Semana (Terça de Nutrição)',
    goldIconType: 'star-clip',
    collection: 'semana',
  },
  {
    id: 'gold-bow',
    name: 'Laço Dourado de Cetim',
    description: 'Laço artesanal duplo em fio dourado para coroar penteados com feminilidade.',
    missionSource: 'Ritual da Semana (Sexta de Brilho Espelhado)',
    goldIconType: 'gold-bow',
    collection: 'semana',
  },
  {
    id: 'crystal-crown',
    name: 'Coroa de Cristais Dourados',
    description: 'Mini tiara esculpida com pontos de luz que refletem as conquistas diárias.',
    missionSource: 'Ritual da Semana (Domingo de Revitalização)',
    goldIconType: 'crystal-crown',
    collection: 'semana',
  },
  {
    id: 'golden-ribbon',
    name: 'Fita Dourada Entrelaçada',
    description: 'Fita flexível de acabamento que abraça as mechas com toque fluido e nobre.',
    missionSource: 'Ritual da Semana (Quinta do Fortalecimento)',
    goldIconType: 'golden-ribbon',
    collection: 'semana',
  },
  // Acessórios Especiais Desbloqueados pela Conquista "Ritual Perfeito"
  {
    id: 'harmony-glow',
    name: 'Brilho de Harmonia',
    description:
      'Broche de luz dourada lapidada com esferas celestes que simboliza o equilíbrio entre corpo, mente e fios.',
    missionSource: 'Conquista Ritual Perfeito',
    goldIconType: 'harmony-glow',
    collection: 'ritual-perfeito',
  },
  {
    id: 'ritual-star',
    name: 'Estrela do Ritual',
    description:
      'Estrela de oito pontas banhada a ouro puro, reluzindo a maestria da tríade diária de autocuidado.',
    missionSource: 'Conquista Ritual Perfeito',
    goldIconType: 'ritual-star',
    collection: 'ritual-perfeito',
  },
  // Novo Acessório Exclusivo: Streak de Spas (4 semanas consecutivas)
  {
    id: 'colar-conchas-gold',
    name: 'Colar de Conchas Dourado',
    description:
      'Joia esculpida em búzios e conchas banhadas a ouro, celebrando a serenidade e a constância do spa por 4 semanas consecutivas.',
    missionSource: 'Streak de Spas (4 semanas seguidas)',
    goldIconType: 'shell-necklace',
    collection: 'spa-streak',
  },
  // Novos Acessórios Exclusivos de Aniversário de Jornada (90 e 365 dias)
  {
    id: 'tiara-comemorativa-90',
    name: 'Tiara Comemorativa de Prata e Ouro',
    description:
      'Arco nobre esculpido em dois tons reluzentes com cristais de luz, coroando uma estação inteira de dedicação e respeito aos seus fios.',
    missionSource: 'Marco de 90 Dias de Autocuidado',
    goldIconType: 'tiara-anniversary-90',
    collection: 'aniversario',
  },
  {
    id: 'coroa-jornada-365',
    name: 'Coroa de Aniversário de Jornada',
    description:
      'Coroa majestosa em ouro puro com pontos luminosos elevados, celebrando 1 ano de brilho, presença e maestria na sua rotina capilar.',
    missionSource: 'Marco de 365 Dias de Autocuidado',
    goldIconType: 'crown-anniversary-365',
    collection: 'aniversario',
  },
  // Acessório Exclusivo da Missão Especial de Fim de Ano
  {
    id: 'broche-constelacao-ouro',
    name: 'Broche Constelação de Fim de Ano',
    description:
      'Joia reluzente lapidada com constelação em ouro radiante e cristais de celebração para coroar a virada de ciclo.',
    missionSource: 'Ritual de Fim de Ano',
    goldIconType: 'constellation-brooch',
    collection: 'especial-fim-de-ano',
  },
  // Novo Acessório Exclusivo Coleção de Cartas: Broche de Cartas Dourado
  {
    id: 'broche-cartas-ouro',
    name: 'Broche de Cartas Dourado',
    description:
      'Joia lapidada em envelope dourado com laço e cristal cintilante, coroando a conclusão da série de 4 cartões colecionáveis (16 cartas lidas).',
    missionSource: 'Coleção Completa de Cartões (16 Cartas Lidas)',
    goldIconType: 'letter-brooch',
    collection: 'cartas',
  },
]

export const COLLECTIBLE_CARDS_LIST: CollectibleCardItem[] = [
  {
    id: 'cartao-1',
    number: 1,
    title: 'Cartão 1 • Mensageira do Autocuidado',
    subtitle: 'Marco de 4 cartas lidas',
    description:
      'Primeiro marco dourado da sua estante. Cada palavra de incentivo acolhida transforma-se em presença e serenidade para os seus fios.',
    requiredReadLetters: 4,
    goldArtworkType: 'constellation',
  },
  {
    id: 'cartao-2',
    number: 2,
    title: 'Cartão 2 • A Flor de Ouro',
    subtitle: 'Marco de 8 cartas lidas',
    description:
      'A constância floresce em confiança de salão. Palavras gentis nutrem o autocuidado como gotas de ouro nos fios.',
    requiredReadLetters: 8,
    goldArtworkType: 'lotus-sun',
  },
  {
    id: 'cartao-3',
    number: 3,
    title: 'Cartão 3 • A Concha da Serenidade',
    subtitle: 'Marco de 12 cartas lidas',
    description:
      'Um tesouro íntimo guardado no fundo do coração. Cada carta é uma pérola de afeto que acompanha seus rituais.',
    requiredReadLetters: 12,
    goldArtworkType: 'golden-shell',
  },
  {
    id: 'cartao-4',
    number: 4,
    title: 'Cartão 4 • A Coroa das Afinidades',
    subtitle: 'Marco de 16 cartas lidas',
    description:
      'Coroamento da maestria e conexão afetiva. Sua jornada é feita de pequenos gestos diários que se tornam majestosos.',
    requiredReadLetters: 16,
    goldArtworkType: 'crown-gem',
  },
]
