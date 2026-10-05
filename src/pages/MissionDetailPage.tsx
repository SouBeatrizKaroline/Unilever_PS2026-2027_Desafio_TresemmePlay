import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGame } from '@/context/GameContext'
import { MissionStepSvg } from '@/components/svg/MissionStepSvg'
import { AccessorySvg, GoldCoinIcon } from '@/components/svg/AccessorySvg'
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Share2,
  Gift,
  Home,
  PenLine,
  Moon,
  Sun,
  Coffee,
  Wind,
  Eye,
  EyeOff,
} from 'lucide-react'
import { BreathingRitualModal } from '@/components/BreathingRitualModal'
import { RitualCompletoCelebration } from '@/components/RitualCompletoCelebration'
import {
  AchievementCelebrationModal,
  type AchievementType,
} from '@/components/AchievementCelebrationModal'
import { ACCESSORIES_LIST } from '@/types/game'
import { ShareCardModal, type ShareCardProps } from '@/components/ShareCardModal'
import { WeeklyIntentionReminderBanner } from '@/components/WeeklyIntentionReminderBanner'
import { WeeklySpaReminderBanner } from '@/components/WeeklySpaReminderBanner'

type StepNumber = 1 | 2 | 3 | 4

interface StepInfo {
  step: StepNumber
  title: string
  instruction: string
  tip: string
}

interface MissionConfig {
  id: string
  title: string
  collection?: 'original' | 'noturno' | 'despertar' | 'domingo'
  points: number
  accessoryId: string
  accessoryType:
    | 'hairpin'
    | 'pearl-pin'
    | 'tiara'
    | 'scarf'
    | 'moon-earrings'
    | 'scrunchie'
    | 'sun-clip'
    | 'spa-band'
    | 'star-clip'
    | 'gold-bow'
    | 'crystal-crown'
    | 'golden-ribbon'
  rewardName: string
  steps: StepInfo[]
}

const MISSIONS_CONFIG: Record<string, MissionConfig> = {
  'tranca-simples': {
    id: 'tranca-simples',
    title: 'Trança simples',
    points: 50,
    accessoryId: 'hairpin-gold',
    accessoryType: 'hairpin',
    rewardName: 'Prenda de Cabelo Dourada',
    steps: [
      {
        step: 1,
        title: 'Separe o cabelo',
        instruction: 'Divida o cabelo em três partes iguais.',
        tip: 'Dica TRESemmé: Use as pontas dos dedos ou um pente fino para mechas uniformes e sem nós.',
      },
      {
        step: 2,
        title: 'Comece a trançar',
        instruction: 'Cruze a mecha da direita sobre a do meio.',
        tip: 'Mantenha uma tensão suave para que a mecha permaneça firme e com acabamento polido.',
      },
      {
        step: 3,
        title: 'Continue alternando',
        instruction: 'Repita, alternando os lados até o fim.',
        tip: 'Cruze a da esquerda sobre o centro, depois a da direita, mantendo o ritmo fluido.',
      },
      {
        step: 4,
        title: 'Finalize',
        instruction: 'Prenda a ponta com um elástico. Pronto!',
        tip: 'Para um visual moderno, puxe suavemente as laterais dos elos para dar volume e textura.',
      },
    ],
  },
  'coque-elegante': {
    id: 'coque-elegante',
    title: 'Coque elegante',
    points: 60,
    accessoryId: 'pearl-pin-gold',
    accessoryType: 'pearl-pin',
    rewardName: 'Pino de Pérola',
    steps: [
      {
        step: 1,
        title: 'Faça um rabo alto',
        instruction: 'Penteie os fios para o topo e prenda com firmeza.',
        tip: 'Dica TRESemmé: Alinhe os fios com suavidade para garantir uma base limpa e sem frizz.',
      },
      {
        step: 2,
        title: 'Enrole em espiral',
        instruction: 'Gire o comprimento do cabelo ao redor do elástico.',
        tip: 'Mantenha o movimento fluido e contínuo para criar um formato arredondado uniforme.',
      },
      {
        step: 3,
        title: 'Fixe com grampos',
        instruction: 'Insira os grampos por baixo da base do coque.',
        tip: 'Esconda as pontas para dentro e firme as laterais com grampos discretos.',
      },
      {
        step: 4,
        title: 'Finalize com o Pino',
        instruction: 'Posicione o Pino de Pérola no coque para acabamento luxuoso.',
        tip: 'O toque dourado com pérola traz brilho e sofisticação imediata ao penteado.',
      },
    ],
  },
  'ondas-naturais': {
    id: 'ondas-naturais',
    title: 'Ondas naturais',
    points: 70,
    accessoryId: 'tiara-waves-gold',
    accessoryType: 'tiara',
    rewardName: 'Tiara de Ondas Dourada',
    steps: [
      {
        step: 1,
        title: 'Prepare e desembarace',
        instruction: 'Alinhe as mechas úmidas suavemente e aplique protetor térmico.',
        tip: 'Dica TRESemmé: Distribua o produto uniformemente do comprimento às pontas para selar a cutícula.',
      },
      {
        step: 2,
        title: 'Torça as mechas em S',
        instruction:
          'Separe mechas médias e torça suavemente desenhando curvas em formato de onda.',
        tip: 'Alterne a direção de cada mecha para um caimento mais natural, volumoso e orgânico.',
      },
      {
        step: 3,
        title: 'Amasse de baixo para cima',
        instruction: 'Apoie as pontas nas mãos e comprima delicadamente em direção à raiz.',
        tip: 'Essa pressão suave ativa a memória da curvatura dos fios mantendo as ondas definidas.',
      },
      {
        step: 4,
        title: 'Solte e posicione a Tiara',
        instruction:
          'Solte os fios com gotas de óleo nutritivo e adicione a Tiara de Ondas Dourada.',
        tip: 'O toque dourado da tiara coroa a textura com brilho acetinado digno de tapete vermelho.',
      },
    ],
  },
  'hidratacao-da-noite': {
    id: 'hidratacao-da-noite',
    title: 'Hidratação da Noite',
    collection: 'noturno',
    points: 80,
    accessoryId: 'scarf-gold',
    accessoryType: 'scarf',
    rewardName: 'Lenço de Cetim Dourado',
    steps: [
      {
        step: 1,
        title: 'Desembarace e aplique o sérum',
        instruction:
          'Penteie suavemente e distribua algumas gotas do sérum noturno nos fios secos ou úmidos.',
        tip: 'Dica TRESemmé: O cuidado noturno age durante as horas de sono nutrindo profundamente a fibra.',
      },
      {
        step: 2,
        title: 'Enluve mecha a mecha',
        instruction:
          'Deslize as mãos em movimentos suaves de cima para baixo para selar a hidratação nas cutículas.',
        tip: 'Aqueça as palmas antes da aplicação para potencializar a penetração dos óleos e ativos.',
      },
      {
        step: 3,
        title: 'Faça um penteado protetor',
        instruction:
          'Prenda em um coque abacaxi frouxo ou trança suave sem tracionar a raiz capilar.',
        tip: 'Evite elásticos com metal para não quebrar os fios durante os movimentos do sono.',
      },
      {
        step: 4,
        title: 'Envolva com o Lenço de Cetim',
        instruction:
          'Ajuste o Lenço de Cetim Dourado ao redor da cabeça para preservar a umidade e eliminar o atrito.',
        tip: 'O cetim dourado protege os fios do travesseiro de algodão, garantindo manhãs sem frizz.',
      },
    ],
  },
  'massagem-relaxante': {
    id: 'massagem-relaxante',
    title: 'Massagem Relaxante',
    collection: 'noturno',
    points: 90,
    accessoryId: 'moon-earrings-gold',
    accessoryType: 'moon-earrings',
    rewardName: 'Brincos de Meia-Lua Dourados',
    steps: [
      {
        step: 1,
        title: 'Respire fundo e alinhe a postura',
        instruction:
          'Feche os olhos, respire fundo 3 vezes e solte o peso dos ombros e do maxilar.',
        tip: 'Dica TRESemmé: O autocuidado começa aliviando a tensão acumulada do dia na cabeça e pescoço.',
      },
      {
        step: 2,
        title: 'Movimentos circulares na raiz',
        instruction:
          'Com as pontas dos dedos (sem as unhas), faça círculos firmes e lentos por todo o couro cabeludo.',
        tip: 'Esse estímulo ativa a microcirculação, oxigena o bulbo capilar e proporciona bem-estar imediato.',
      },
      {
        step: 3,
        title: 'Pressione têmporas e nuca',
        instruction:
          'Pressione com suavidade a base da nuca e faça pressões leves nas têmporas por 10 segundos.',
        tip: 'Pontos-chave de alívio que reduzem o estresse e preparam o corpo para um sono reparador.',
      },
      {
        step: 4,
        title: 'Finalize com os Brincos de Lua',
        instruction:
          'Abrace a sensação de leveza, solte os fios e celebre o ritual com os Brincos de Meia-Lua Dourados.',
        tip: 'Sua rotina noturna completa reflete a harmonia entre cuidado capilar e tranquilidade.',
      },
    ],
  },
  'hidratacao-matinal': {
    id: 'hidratacao-matinal',
    title: 'Toque de Hidratação Matinal',
    collection: 'despertar',
    points: 40,
    accessoryId: 'scrunchie-gold',
    accessoryType: 'scrunchie',
    rewardName: 'Scrunchie Dourado',
    steps: [
      {
        step: 1,
        title: 'Borrife o leave-in hidratante',
        instruction:
          'Pulverize o spray hidratante a 20cm de distância, distribuindo a bruma suave do comprimento às pontas.',
        tip: 'Dica TRESemmé: A hidratação matinal acorda a curvatura dos fios e neutraliza o ressecamento do sono.',
      },
      {
        step: 2,
        title: 'Desembarace com os dedos e prenda',
        instruction:
          'Passe as mãos delicadamente como um pente garfo e prenda um meio-rabo com o Scrunchie Dourado.',
        tip: 'O cetim dourado acomoda os fios sem tensionar, trazendo um toque de elegância instantânea para a manhã.',
      },
    ],
  },
  'protecao-dia': {
    id: 'protecao-dia',
    title: 'Proteção para o Dia',
    collection: 'despertar',
    points: 50,
    accessoryId: 'sun-clip-gold',
    accessoryType: 'sun-clip',
    rewardName: 'Presilha Dourada do Amanhecer',
    steps: [
      {
        step: 1,
        title: 'Aplique o escudo térmico',
        instruction:
          'Espalhe 2 pumps de protetor térmico nas mãos e enluve as mechas, criando um escudo anti-umidade.',
        tip: 'Dica TRESemmé: Protege os fios contra calor de até 230°C, raios UV e variações de clima ao longo do dia.',
      },
      {
        step: 2,
        title: 'Finalize com a Presilha do Amanhecer',
        instruction:
          'Puxe uma mecha lateral polida e posicione a Presilha Dourada do Amanhecer para iluminar o rosto.',
        tip: 'O reflexo dourado em formato solar coroa o penteado express com charme e sofisticação imediata.',
      },
    ],
  },
  'spa-capilar-domingo': {
    id: 'spa-capilar-domingo',
    title: 'Spa Capilar de Domingo',
    collection: 'domingo',
    points: 95,
    accessoryId: 'spa-band-gold',
    accessoryType: 'spa-band',
    rewardName: 'Faixa Spa Dourada',
    steps: [
      {
        step: 1,
        title: 'Nutrição com Óleo Pré-Shampoo',
        instruction:
          'Aqueça algumas gotas de óleo nutritivo nas mãos e massageie a raiz e o comprimento dos fios secos.',
        tip: 'Dica TRESemmé: A umectação pré-shampoo cria uma barreira lipídica que protege contra o ressecamento da lavagem.',
      },
      {
        step: 2,
        title: 'Máscara Intensiva com Toalha Morna',
        instruction:
          'Após o shampoo, enluve a máscara mecha por mecha e envolva o cabelo em uma toalha morna por alguns minutos.',
        tip: 'O vapor suave da toalha dilata as cutículas facilitando a absorção profunda dos aminoácidos e óleos nobres.',
      },
      {
        step: 3,
        title: 'Enxágue e Coroe com a Faixa Spa',
        instruction:
          'Enxágue com água fresca para selar o brilho espelhado e ajuste a Faixa Spa Dourada para relaxar.',
        tip: 'A água fria no enxágue final alinha as cutículas, proporcionando maciez incomparável e zero frizz.',
      },
    ],
  },
  // Missão Especial Temática de Celebração / Fim de Ano
  'ritual-fim-de-ano': {
    id: 'ritual-fim-de-ano',
    title: 'Ritual de Fim de Ano • Brilho de Celebração',
    collection: 'especial' as any,
    points: 120,
    accessoryId: 'broche-constelacao-ouro',
    accessoryType: 'constellation-brooch' as any,
    rewardName: 'Broche Constelação de Fim de Ano',
    steps: [
      {
        step: 1,
        title: 'Preparação & Intenção de Celebração',
        instruction:
          'Respire fundo três vezes, desembarace com suavidade e mentalize suas maiores conquistas e gratidões deste ciclo.',
        tip: 'Dica TRESemmé: O autocuidado consciente acalma a mente e prepara as cutículas para absorver os nutrientes festivos.',
      },
      {
        step: 2,
        title: 'Nutrição Radiante & Selamento de Ouro',
        instruction:
          'Aplique o elixir ou sérum de brilho nas pontas, enluvando mecha a mecha para capturar cada reflexo de luz.',
        tip: 'O toque aveludado dos óleos nobres sela as cutículas conferindo reflexo espelhado deslumbrante para as festas.',
      },
      {
        step: 3,
        title: 'Penteado de Celebração & Broche Constelação',
        instruction:
          'Finalize seu penteado comemorativo favorito e coroe com o exclusivo Broche Constelação de Fim de Ano!',
        tip: 'Você é a protagonista do seu novo ano. Seu brilho é único, constante e iluminará todos os novos caminhos.',
      },
    ],
  },
  // Ritual de Aniversário de Jornada (Jogável na aba Missões com 4 etapas ilustradas)
  'ritual-aniversario-jornada': {
    id: 'ritual-aniversario-jornada',
    title: 'Ritual de Aniversário de Jornada 🎉',
    collection: 'especial' as any,
    points: 150,
    accessoryId: 'coroa-jornada-365',
    accessoryType: 'crystal-crown' as any,
    rewardName: 'Coroa Radiante de Aniversário',
    steps: [
      {
        step: 1,
        title: 'Reconhecimento & Intenção do Ciclo',
        instruction:
          'Feche os olhos, respire lenta e profundamente por três ciclos e agradeça a cada minuto de carinho e tempo que você dedicou a si mesma nesta jornada.',
        tip: 'Dica TRESemmé: Autocuidado não é sobre perfeição, é sobre o compromisso afetuoso de estar presente na sua própria história.',
      },
      {
        step: 2,
        title: 'Massagem Revigorante do Couro Cabeludo',
        instruction:
          'Apoie as polpas dos dedos na raiz e faça movimentos circulares ascendentes durante dois minutos, liberando qualquer tensão acumulada nos ombros e na mente.',
        tip: 'Essa estimulação ativa os folículos e renova a vitalidade dos fios enquanto traz uma sensação imediata de alívio.',
      },
      {
        step: 3,
        title: 'Banho de Brilho Espelhado & Ouro',
        instruction:
          'Aqueça algumas gotas de óleo ou leave-in com partículas douradas e enluve da metade às pontas, alinhando as cutículas com suavidade.',
        tip: 'O selamento com óleos nobres confere maciez aveludada e reflexo luminoso com acabamento profissional de salão.',
      },
      {
        step: 4,
        title: 'Penteado de Coroação & Celebração',
        instruction:
          'Finalize com o penteado que melhor reflete sua autenticidade e sinta o orgulho de tudo o que você construiu na sua jornada.',
        tip: 'Você é a rainha do seu autocuidado. Coroe este momento compartilhando seu Card Exclusivo de Aniversário com quem torce por você!',
      },
    ],
  },
  // Missões Rotativas: Coleção "Ritual da Semana"
  'semana-segunda': {
    id: 'semana-segunda',
    title: 'Segunda da Limpeza Leve',
    collection: 'semana' as any,
    points: 45,
    accessoryId: 'hairpin-gold',
    accessoryType: 'hairpin',
    rewardName: 'Selo Segunda de Foco',
    steps: [
      {
        step: 1,
        title: 'Molhe os fios e alinhe a respiração',
        instruction:
          'Use água morna e respire fundo 3 vezes enquanto molha delicadamente o couro cabeludo.',
        tip: 'Dica TRESemmé: A água morna dissolve resíduos de styling sem agredir a barreira protetora.',
      },
      {
        step: 2,
        title: 'Massagem purificante',
        instruction:
          'Com as pontas dos dedos em movimentos circulares, estimule a raiz por 2 minutos.',
        tip: 'Essa massagem desintoxica a raiz e oxigena os folículos para iniciar a semana com leveza.',
      },
    ],
  },
  'semana-terca': {
    id: 'semana-terca',
    title: 'Terça de Nutrição Reparadora',
    collection: 'semana' as any,
    points: 55,
    accessoryId: 'star-clip-gold',
    accessoryType: 'star-clip' as any,
    rewardName: 'Prendedor de Estrela Dourada',
    steps: [
      {
        step: 1,
        title: 'Aqueça o óleo nutritivo',
        instruction:
          'Esfregue 3 a 4 gotas de óleo vegetal nutritivo entre as palmas das mãos aquecidas.',
        tip: 'Dica TRESemmé: O calor suave das mãos fluidifica os óleos e acelera a absorção pelas cutículas.',
      },
      {
        step: 2,
        title: 'Enluvamento mecha a mecha',
        instruction:
          'Deslize as mãos com firmeza delicada do meio para as pontas selando o tratamento.',
        tip: 'Insista nas pontas mais ressecadas para evitar pontas duplas.',
      },
      {
        step: 3,
        title: 'Coroe com a Estrela Dourada',
        instruction:
          'Prenda uma mecha lateral com o Prendedor de Estrela Dourada e admire o brilho no espelho.',
        tip: 'O acessório de estrela celebra sua dedicação e ilumina seu visual de terça-feira.',
      },
    ],
  },
  'semana-quarta': {
    id: 'semana-quarta',
    title: 'Quarta do Equilíbrio e Bruma',
    collection: 'semana' as any,
    points: 40,
    accessoryId: 'scrunchie-gold',
    accessoryType: 'scrunchie',
    rewardName: 'Scrunchie Dourado',
    steps: [
      {
        step: 1,
        title: 'Pulverize a bruma floral ou leave-in',
        instruction: 'Mantenha o frasco a 25cm e borrife em névoa por todo o cabelo solto.',
        tip: 'Dica TRESemmé: A bruma devolve umidade e reativa a textura natural sem pesar.',
      },
      {
        step: 2,
        title: 'Amasse as pontas com carinho',
        instruction:
          'Apoie as mechas nas palmas e aperte suavemente para recuperar balanço e movimento.',
        tip: 'Um minuto de pausa para sentir a textura renovada e soltar as tensões do dia.',
      },
    ],
  },
  'semana-quinta': {
    id: 'semana-quinta',
    title: 'Quinta do Fortalecimento',
    collection: 'semana' as any,
    points: 50,
    accessoryId: 'golden-ribbon',
    accessoryType: 'golden-ribbon' as any,
    rewardName: 'Fita Dourada Entrelaçada',
    steps: [
      {
        step: 1,
        title: 'Aplique o sérum fortalecedor',
        instruction:
          'Espalhe o sérum ou creme fortificante concentrando nas áreas de maior atrito.',
        tip: 'Dica TRESemmé: Os aminoácidos preenchem microfissuras da haste capilar.',
      },
      {
        step: 2,
        title: 'Penteado protetor com a Fita',
        instruction:
          'Faça uma mecha torcida ou semi-presa e trance suavemente com a Fita Dourada Entrelaçada.',
        tip: 'A fita dourada protege os fios durante a noite e garante um visual sofisticado imediato.',
      },
    ],
  },
  'semana-sexta': {
    id: 'semana-sexta',
    title: 'Sexta de Brilho Espelhado',
    collection: 'semana' as any,
    points: 60,
    accessoryId: 'gold-bow',
    accessoryType: 'gold-bow' as any,
    rewardName: 'Laço Dourado de Cetim',
    steps: [
      {
        step: 1,
        title: 'Polimento com óleo de brilho',
        instruction:
          'Espalhe 2 gotas de finalizador de brilho espelhado da raiz às pontas com os dedos bem abertos.',
        tip: 'Dica TRESemmé: O óleo reflexivo sela a luz solar criando acabamento espelhado profissional.',
      },
      {
        step: 2,
        title: 'Arremate com o Laço Dourado',
        instruction: 'Prenda um meio-rabo elegante e adicione o Laço Dourado de Cetim como coroa.',
        tip: 'Você cruzou a semana de trabalho e merece celebrar sua beleza radiante.',
      },
    ],
  },
  'semana-sabado': {
    id: 'semana-sabado',
    title: 'Sábado Livre & Expressão',
    collection: 'semana' as any,
    points: 50,
    accessoryId: 'tiara-waves-gold',
    accessoryType: 'tiara',
    rewardName: 'Tiara de Ondas Dourada',
    steps: [
      {
        step: 1,
        title: 'Solte a imaginação',
        instruction:
          'Sem espelhos exigentes: experimente torções, tranças embutidas ou curvas orgânicas.',
        tip: 'Dica TRESemmé: O sábado é o dia da liberdade capilar. Não existe certo ou errado.',
      },
      {
        step: 2,
        title: 'Fixação suave e toque de perfume',
        instruction:
          'Borrife um perfume capilar suave ou bruma fixadora sem álcool a 30cm dos fios.',
        tip: 'A fragrância sutil acompanha seus movimentos ao longo de todo o final de semana.',
      },
    ],
  },
  'semana-domingo': {
    id: 'semana-domingo',
    title: 'Domingo de Revitalização',
    collection: 'semana' as any,
    points: 60,
    accessoryId: 'crystal-crown',
    accessoryType: 'crystal-crown' as any,
    rewardName: 'Coroa de Cristais Dourados',
    steps: [
      {
        step: 1,
        title: 'Máscara profunda e momento de silêncio',
        instruction: 'Aplique a máscara de restauração e reserve 5 minutos para relaxar a mente.',
        tip: 'Dica TRESemmé: O silêncio e a respiração calma potencializam a sensação de restauração integral.',
      },
      {
        step: 2,
        title: 'Enxágue gelado e selamento',
        instruction:
          'Finalize o enxágue com água fresca para alinhar cutículas e revelar reflexos puros.',
        tip: 'A água fresca fecha as cutículas e fixa os nutrientes dentro do córtex capilar.',
      },
      {
        step: 3,
        title: 'A Coroa de Cristais Dourados',
        instruction:
          'Ajuste a Coroa de Cristais Dourados no seu avatar e celebre uma semana inteira de autocuidado!',
        tip: 'Você é a rainha do seu próprio tempo e da sua autoestima.',
      },
    ],
  },
}

export const MissionDetailPage: React.FC = () => {
  const navigate = useNavigate()
  const { missionId } = useParams<{ missionId: string }>()
  const { completeMission, journey, addOrUpdateDiaryNote, recordFocusedMissionCompleted } =
    useGame()

  const customRitual = (journey.customRituals || []).find((r) => r.id === missionId)

  // Configuração da missão: padrão do catálogo ou personalizada pela usuária
  const currentMission = customRitual
    ? {
        id: customRitual.id,
        title: customRitual.title,
        collection: 'custom' as const,
        points: customRitual.steps.length * (customRitual.pointsPerStep || 10),
        accessoryId: undefined,
        accessoryType: 'comb' as const,
        rewardName: 'Selo de Autocuidado Criativo',
        steps: customRitual.steps.map((st, idx) => ({
          step: (idx + 1) as StepNumber,
          title: st.title,
          instruction: st.instruction,
          tip: st.tip || 'Respire com calma e desfrute do autocuidado.',
        })),
      }
    : MISSIONS_CONFIG[missionId || 'tranca-simples'] || MISSIONS_CONFIG['tranca-simples']

  const [currentStep, setCurrentStep] = useState<StepNumber>(1)
  const [noteInput, setNoteInput] = useState('')
  const [noteSaved, setNoteSaved] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)
  const [showTrioCelebration, setShowTrioCelebration] = useState(false)
  const [extraCelebrationType, setExtraCelebrationType] = useState<AchievementType | null>(null)
  const [shareCardData, setShareCardData] = useState<ShareCardProps | null>(null)
  const [showBreathingModal, setShowBreathingModal] = useState(false)
  const isReducedMotion = Boolean(journey.reducedMotion)

  // Modo foco durante missões: persistido em localStorage, revertido ao sair da missão
  const FOCUS_STORAGE_KEY = 'tresemme_play_mission_focus_mode'
  const [isFocusMode, setIsFocusMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem(FOCUS_STORAGE_KEY) === 'true'
    } catch {
      return false
    }
  })

  const toggleFocusMode = () => {
    setIsFocusMode((prev) => {
      const next = !prev
      try {
        localStorage.setItem(FOCUS_STORAGE_KEY, String(next))
      } catch {
        // ignore
      }
      return next
    })
  }

  // Reverter ao sair da missão (desmontar componente)
  useEffect(() => {
    return () => {
      // Ao sair da tela de missão, o modo foco ativo na tela se encerra
    }
  }, [])

  const totalSteps = currentMission.steps.length
  const isLastStep = currentStep >= totalSteps
  const currentStepData =
    currentMission.steps.find((s) => s.step === currentStep) || currentMission.steps[0]
  const progressPercent = Math.round((currentStep / totalSteps) * 100)

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => (prev + 1) as StepNumber)
    } else {
      // Concluir missão
      const result = completeMission(
        currentMission.id,
        currentMission.points,
        currentMission.accessoryId,
        {
          missionTitle: currentMission.title,
          rewardName: currentMission.rewardName,
        },
      )

      // Se o Modo Foco estava ativo no momento da conclusão, registra 1 contagem
      if (isFocusMode) {
        recordFocusedMissionCompleted()
      }
      if (result.isNewTrioCompletion) {
        setShowTrioCelebration(true)
      } else if (result.isNewWeeklyCompletion) {
        setExtraCelebrationType('semana-perfeita')
      } else if (result.isNewCollectorCompletion) {
        setExtraCelebrationType('colecionadora')
      } else {
        setShowCelebration(true)
      }
    }
  }

  const handleOpenShare = () => {
    const now = new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date())

    setShareCardData({
      missionTitle: currentMission.title,
      points: currentMission.points,
      stars: 3,
      completedAt: now,
      rewardName: currentMission.rewardName,
      userName: journey.name || 'Visitante',
      avatarId: journey.avatarId,
      unlockedAccessories: journey.unlockedAccessories,
      selectedAccessoryId: journey.selectedAccessoryId,
      selectedAccessoriesList: journey.selectedAccessoriesList,
      achievementType:
        currentMission.id === 'ritual-fim-de-ano'
          ? 'especial-fim-de-ano'
          : currentMission.id === 'ritual-aniversario-jornada'
            ? 'aniversario-jornada'
            : undefined,
    })
  }

  const handleSaveNote = () => {
    if (noteInput.trim()) {
      addOrUpdateDiaryNote(currentMission.id, noteInput.trim(), currentMission.title)
      setNoteSaved(true)
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as StepNumber)
    } else {
      navigate('/inicio')
    }
  }

  return (
    <div className="flex-1 px-4 py-5 flex flex-col justify-between space-y-4 animate-fade-in relative">
      {/* Backdrop do Modo Foco: escurece e atenua o resto da tela/navegação */}
      {isFocusMode && (
        <div
          aria-hidden="true"
          onClick={toggleFocusMode}
          className={`fixed inset-0 z-30 bg-black/80 backdrop-blur-[3px] pointer-events-auto ${
            isReducedMotion ? 'transition-none' : 'transition-opacity duration-300'
          }`}
        />
      )}

      {/* Lembrança semanal gentil do Spa (atenuada no modo foco) */}
      <div className={isFocusMode ? 'opacity-20 pointer-events-none transition-opacity' : ''}>
        <WeeklySpaReminderBanner onOpenSpa={() => navigate('/')} />
      </div>

      {/* Lembrança suave da intenção da semana (atenuada no modo foco) */}
      <div className={isFocusMode ? 'opacity-20 pointer-events-none transition-opacity' : ''}>
        <WeeklyIntentionReminderBanner />
      </div>

      {/* 1. Header da Missão */}
      <div className={`space-y-3 ${isFocusMode ? 'relative z-40' : ''}`}>
        <div className="space-y-1 text-left">
          <div className="flex items-center gap-2 flex-wrap justify-between">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1 ${
                  currentMission.collection === 'noturno'
                    ? 'bg-[#5C4D7D]/30 text-[#E0D4FC] border border-[#A78BFA]/40'
                    : currentMission.collection === 'despertar'
                      ? 'bg-[#F59E0B]/20 text-[#FCD34D] border border-[#F59E0B]/40'
                      : currentMission.collection === 'domingo'
                        ? 'bg-[#10B981]/20 text-[#6EE7B7] border border-[#10B981]/40'
                        : (currentMission.collection as string) === 'semana'
                          ? 'bg-[#D4AF37]/25 text-[#F1E5C8] border border-[#D4AF37]'
                          : (currentMission.collection as string) === 'especial'
                            ? 'bg-[#D4AF37] text-black font-extrabold border border-[#FFF1CC] shadow-sm'
                            : 'bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40'
                }`}
              >
                {currentMission.collection === 'noturno' && <Moon className="w-3 h-3" />}
                {currentMission.collection === 'despertar' && (
                  <Sun className="w-3 h-3 text-[#FCD34D]" />
                )}
                {currentMission.collection === 'domingo' && (
                  <Coffee className="w-3 h-3 text-[#6EE7B7]" />
                )}
                {(currentMission.collection as string) === 'semana' && (
                  <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                )}
                {(currentMission.collection as string) === 'especial' && (
                  <Sparkles className="w-3 h-3 text-black stroke-[3]" />
                )}
                <span>
                  {currentMission.collection === 'noturno'
                    ? 'Ritual Noturno'
                    : currentMission.collection === 'despertar'
                      ? 'Ritual do Despertar'
                      : currentMission.collection === 'domingo'
                        ? 'Ritual de Domingo • Fim de Semana'
                        : (currentMission.collection as string) === 'semana'
                          ? 'Ritual da Semana • Missão Rotativa'
                          : (currentMission.collection as string) === 'especial'
                            ? 'Missão Especial • Fim de Ano & Celebração'
                            : 'Ritual de Penteado'}
                </span>
              </span>
              <span className="text-xs text-[#B3B3B3] flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                <span>+{currentMission.points} pontos ao finalizar</span>
              </span>
            </div>

            {/* Botão / Toggle Modo Foco */}
            <button
              type="button"
              onClick={toggleFocusMode}
              aria-pressed={isFocusMode}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer border ${
                isFocusMode
                  ? 'bg-[#D4AF37] text-black border-[#FFF1CC] ring-2 ring-[#D4AF37]/50 shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                  : 'bg-[#1F1C16] text-[#F1E5C8] hover:text-white border-[#D4AF37]/40 hover:border-[#D4AF37]'
              } ${isReducedMotion ? 'duration-0' : 'duration-200'}`}
              title={
                isFocusMode
                  ? 'Modo foco ativado: toque para sair e restaurar iluminação padrão'
                  : 'Modo foco: escurece o restante da tela para foco total no ritual'
              }
            >
              {isFocusMode ? (
                <>
                  <EyeOff className="w-4 h-4 stroke-[2.5]" />
                  <span>Modo foco ativo</span>
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4 text-[#D4AF37] stroke-[2.2]" />
                  <span>Modo foco</span>
                </>
              )}
            </button>
          </div>

          <h1 className="font-serif text-2xl font-bold text-white">{currentMission.title}</h1>
          <p className="text-xs text-[#B3B3B3]">
            {isFocusMode
              ? 'Ambiente de foco elevado • Sem distrações para o seu ritual'
              : 'Aprenda o passo a passo e ganhe pontos'}
          </p>
        </div>

        {/* Indicador de Etapa e Barra de Progresso Dourada */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-[#F1E5C8]">
              Etapa {currentStep} de {totalSteps}
            </span>
            <button
              type="button"
              onClick={() => setShowBreathingModal(true)}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#D4AF37]/15 hover:bg-[#D4AF37]/25 text-[#D4AF37] text-[11px] font-semibold border border-[#D4AF37]/30 transition-all active:scale-95 cursor-pointer"
              title="Respirar um pouco e relaxar"
            >
              <Wind className="w-3.5 h-3.5" />
              <span>Respirar um pouco</span>
            </button>
            <span className="text-[#D4AF37]">{progressPercent}%</span>
          </div>

          <div
            className="w-full h-2 rounded-full bg-white/10 overflow-hidden"
            role="progressbar"
            aria-valuenow={currentStep}
            aria-valuemin={1}
            aria-valuemax={totalSteps}
            aria-label={`Progresso da missão: Etapa ${currentStep} de ${totalSteps}`}
          >
            <div
              className="h-full bg-gradient-to-r from-[#D4AF37] to-[#F1E5C8] rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* 2. Conteúdo da Etapa Atual (em destaque elevado no modo foco) */}
      <div
        className={`flex-1 flex flex-col justify-center space-y-4 py-2 ${
          isFocusMode
            ? 'relative z-40 rounded-3xl p-3 bg-gradient-to-b from-[#1E1911] via-[#14120E] to-[#0D0D0D] border-2 border-[#D4AF37] shadow-[0_0_50px_rgba(212,175,55,0.35)]'
            : ''
        } ${isReducedMotion ? 'transition-none' : 'transition-all duration-300'}`}
      >
        {/* Ilustração SVG da Etapa */}
        <div className="rounded-2xl border border-white/10 bg-[#161616] p-3 shadow-md flex items-center justify-center">
          {currentMission.collection === 'custom' ? (
            <div className="py-6 px-4 text-center space-y-2 w-full max-w-xs mx-auto">
              <div className="w-16 h-16 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] mx-auto shadow-inner">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-sm font-bold text-[#F1E5C8]">
                {currentStepData.title}
              </h3>
              <p className="text-[11px] text-[#A0A0A0]">
                Ritual personalizado criado por você • Etapa {currentStep} de {totalSteps}
              </p>
            </div>
          ) : (
            <MissionStepSvg
              step={currentStep}
              missionType={currentMission.id as any}
              className="w-full h-52 sm:h-60"
            />
          )}
        </div>

        {/* Cartão de Instrução */}
        <div className="rounded-2xl border border-[#D4AF37]/30 bg-[#1A1A1A] p-4 text-left space-y-2 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#D4AF37] text-[#0D0D0D] font-bold text-xs flex items-center justify-center">
              {currentStep}
            </span>
            <h2 className="font-serif text-lg font-bold text-white">{currentStepData.title}</h2>
          </div>

          <p className="text-sm font-medium text-[#F1E5C8] leading-relaxed">
            {currentStepData.instruction}
          </p>

          <p className="text-xs text-[#A0A0A0] pt-1 border-t border-white/5">
            {currentStepData.tip}
          </p>
        </div>
      </div>

      {/* 3. Botões de Navegação Inferiores */}
      <div className={`pt-2 flex items-center gap-3 ${isFocusMode ? 'relative z-40' : ''}`}>
        {/* Botão Voltar (vai para etapa anterior ou volta para home se etapa 1) */}
        <button
          type="button"
          onClick={handlePrevStep}
          className="flex-1 min-h-[50px] px-4 py-3 rounded-2xl border border-white/20 bg-transparent hover:bg-white/5 text-white font-semibold text-sm transition-all flex items-center justify-center gap-1.5 active:scale-[0.98]"
        >
          <ArrowLeft className="w-4 h-4 text-[#D4AF37]" />
          <span>Voltar</span>
        </button>

        {/* Botão Concluir etapa / Concluir missão */}
        <button
          type="button"
          onClick={handleNextStep}
          className="flex-[1.6] min-h-[50px] px-5 py-3 rounded-2xl bg-[#D4AF37] hover:bg-[#B8962E] text-[#0D0D0D] font-bold text-sm transition-all shadow-[0_4px_16px_rgba(212,175,55,0.3)] flex items-center justify-center gap-2 active:scale-[0.98]"
        >
          <span>{isLastStep ? 'Concluir missão' : 'Concluir etapa'}</span>
          {isLastStep ? (
            <Sparkles className="w-4 h-4 fill-current" />
          ) : (
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          )}
        </button>
      </div>

      {/* 4. Overlay de Celebração e Conclusão */}
      {showCelebration && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="success-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fade-in"
        >
          {/* Confete SVG animado sutilmente no topo */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
            {/* Partículas douradas geradas via SVG inline */}
            <svg className="w-full h-full" viewBox="0 0 400 600" fill="none">
              <circle cx="60" cy="80" r="4" fill="#D4AF37" opacity="0.8" />
              <circle cx="120" cy="140" r="3" fill="#F1E5C8" opacity="0.9" />
              <circle cx="200" cy="90" r="5" fill="#D4AF37" opacity="0.8" />
              <circle cx="280" cy="130" r="4" fill="#FFFFFF" opacity="0.7" />
              <circle cx="340" cy="70" r="3" fill="#D4AF37" opacity="0.8" />
              <rect
                x="90"
                y="220"
                width="8"
                height="4"
                rx="2"
                fill="#D4AF37"
                transform="rotate(25 90 220)"
              />
              <rect
                x="310"
                y="240"
                width="8"
                height="4"
                rx="2"
                fill="#F1E5C8"
                transform="rotate(-35 310 240)"
              />
              <rect
                x="180"
                y="270"
                width="6"
                height="3"
                rx="1.5"
                fill="#D4AF37"
                transform="rotate(15 180 270)"
              />
              <rect
                x="50"
                y="320"
                width="7"
                height="4"
                rx="2"
                fill="#FFFFFF"
                transform="rotate(-40 50 320)"
              />
              <rect
                x="330"
                y="360"
                width="8"
                height="4"
                rx="2"
                fill="#D4AF37"
                transform="rotate(30 330 360)"
              />
            </svg>
          </div>

          <div className="w-full max-w-sm rounded-3xl border border-[#D4AF37] bg-gradient-to-b from-[#1E1E1E] to-[#121212] p-6 text-center text-white shadow-[0_0_40px_rgba(212,175,55,0.3)] space-y-5 animate-scale-in relative z-10">
            {/* Ícone de Sucesso */}
            <div className="w-16 h-16 mx-auto rounded-full bg-[#D4AF37]/20 border-2 border-[#D4AF37] flex items-center justify-center text-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.4)]">
              <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
            </div>

            {/* Mensagem e Pontos */}
            <div className="space-y-1">
              <h2
                id="success-modal-title"
                className="font-serif text-2xl font-extrabold text-white"
              >
                Missão concluída!
              </h2>
              <p className="text-xs text-[#B3B3B3]">
                Você dominou o ritual de {currentMission.title} com excelência.
              </p>
            </div>

            {/* Destaque de Pontuação */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 shadow-inner">
              <GoldCoinIcon className="w-6 h-6" size={24} />
              <span className="font-serif text-xl font-bold text-[#F1E5C8]">
                +{currentMission.points} pontos
              </span>
            </div>

            {/* Revelação do Acessório Desbloqueado */}
            <div className="rounded-2xl border border-[#D4AF37]/40 bg-[#171717] p-3.5 space-y-2">
              <div className="flex items-center justify-center gap-1.5 text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider">
                <Gift className="w-3.5 h-3.5" />
                <span>Novo acessório desbloqueado!</span>
              </div>

              <div className="flex items-center justify-center py-1">
                <AccessorySvg
                  type={currentMission.accessoryType}
                  isUnlocked
                  className="w-16 h-16 drop-shadow-[0_0_12px_rgba(212,175,55,0.5)]"
                />
              </div>

              <h3 className="font-serif text-sm font-bold text-white">
                {currentMission.rewardName}
              </h3>
              <p className="text-[11px] text-[#A0A0A0] leading-tight">
                Disponível na sua coleção para iluminar seu estilo.
              </p>
            </div>

            {/* Diário de Autocuidado - Registrar Nota Curta pós-ritual */}
            <div className="rounded-2xl border border-white/10 bg-[#161616] p-3 text-left space-y-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="mission-note-input"
                  className="text-xs font-semibold text-[#F1E5C8] flex items-center gap-1.5"
                >
                  <PenLine className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Diário de autocuidado</span>
                </label>
                <span className="text-[10px] text-[#888888]">{noteInput.length}/140</span>
              </div>
              <p className="text-[11px] text-[#B3B3B3]">Como você se sentiu após esse ritual?</p>

              <div className="space-y-1.5">
                <textarea
                  id="mission-note-input"
                  value={noteInput}
                  onChange={(e) => {
                    setNoteInput(e.target.value.slice(0, 140))
                    if (noteSaved) setNoteSaved(false)
                  }}
                  rows={2}
                  maxLength={140}
                  placeholder="Ex.: Senti meus fios mais leves, soltos e macios..."
                  className="w-full text-xs p-2.5 rounded-xl bg-[#202020] text-white border border-white/10 placeholder-white/30 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all resize-none"
                />

                <div className="flex items-center justify-between pt-0.5">
                  <span className="text-[10px] text-[#81C784]">
                    {noteSaved && '✓ Nota registrada no seu diário!'}
                  </span>
                  <button
                    type="button"
                    onClick={handleSaveNote}
                    disabled={!noteInput.trim()}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all min-h-[36px] flex items-center gap-1 ${
                      noteInput.trim()
                        ? 'bg-[#D4AF37]/20 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0D0D0D] border border-[#D4AF37]/40 cursor-pointer'
                        : 'bg-white/5 text-white/30 cursor-not-allowed border border-white/5'
                    }`}
                  >
                    <span>{noteSaved ? 'Salva' : 'Salvar nota'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Ações pós-conclusão */}
            <div className="space-y-2.5 pt-2">
              <button
                type="button"
                onClick={handleOpenShare}
                className="w-full min-h-[50px] rounded-2xl bg-[#D4AF37] hover:bg-[#B8962E] text-[#0D0D0D] font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                <Share2 className="w-4 h-4 stroke-[2.5]" />
                <span>Compartilhar conquista</span>
              </button>

              <button
                type="button"
                onClick={() => navigate('/inicio', { state: { tab: 'acessorios' } })}
                className="w-full min-h-[46px] rounded-2xl border border-white/20 bg-white/5 hover:bg-white/10 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2"
              >
                <Gift className="w-4 h-4 text-[#D4AF37]" />
                <span>Ver acessório na coleção</span>
              </button>

              <button
                type="button"
                onClick={() => navigate('/inicio', { state: { tab: 'inicio' } })}
                className="w-full min-h-[44px] rounded-2xl border border-white/15 bg-transparent hover:bg-white/5 text-white/80 hover:text-white font-medium text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <Home className="w-4 h-4 text-[#D4AF37]" />
                <span>Voltar ao início</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Celebração Especial: Ritual Completo */}
      {showTrioCelebration && (
        <RitualCompletoCelebration
          onClose={() => {
            setShowTrioCelebration(false)
            setShowCelebration(true)
          }}
          onShare={() => {
            const now = new Intl.DateTimeFormat('pt-BR', {
              day: '2-digit',
              month: 'short',
              hour: '2-digit',
              minute: '2-digit',
            }).format(new Date())

            setShareCardData({
              missionTitle: 'Ritual Completo (3/3)',
              points: 180,
              stars: 3,
              completedAt: now,
              rewardName: 'Medalha Mestre do Autocuidado',
              userName: journey.name || 'Visitante',
              avatarId: journey.avatarId,
              skinTone: journey.skinTone,
              hairTexture: journey.hairTexture,
              unlockedAccessories: journey.unlockedAccessories,
              selectedAccessoryId: journey.selectedAccessoryId,
              selectedAccessoriesList: journey.selectedAccessoriesList,
              isRitualCompleto: true,
            })
          }}
        />
      )}

      {/* Celebração Especial: Conquistas Extras Desbloqueadas na Missão */}
      {extraCelebrationType && (
        <AchievementCelebrationModal
          type={extraCelebrationType}
          unlockedAt="Hoje"
          onClose={() => {
            setExtraCelebrationType(null)
            setShowCelebration(true)
          }}
          onShare={() => {
            const ach = extraCelebrationType
            setExtraCelebrationType(null)
            const now = new Intl.DateTimeFormat('pt-BR', {
              day: '2-digit',
              month: 'short',
              hour: '2-digit',
              minute: '2-digit',
            }).format(new Date())

            setShareCardData({
              missionTitle:
                ach === 'semana-perfeita'
                  ? 'Conquista: Semana Perfeita (5/5)'
                  : `Conquista: Colecionadora (${ACCESSORIES_LIST.length}/${ACCESSORIES_LIST.length})`,
              points: ach === 'semana-perfeita' ? 250 : 350,
              stars: 3,
              completedAt: now,
              rewardName:
                ach === 'semana-perfeita'
                  ? 'Medalha Constância Dourada'
                  : 'Medalha Acervo Completo',
              userName: journey.name || 'Visitante',
              avatarId: journey.avatarId,
              skinTone: journey.skinTone,
              hairTexture: journey.hairTexture,
              unlockedAccessories: journey.unlockedAccessories,
              selectedAccessoryId: journey.selectedAccessoryId,
              selectedAccessoriesList: journey.selectedAccessoriesList,
              isRitualCompleto: true,
            })
          }}
        />
      )}

      {/* Modal de Compartilhamento do Card */}
      {shareCardData && (
        <ShareCardModal {...shareCardData} onClose={() => setShareCardData(null)} />
      )}

      {/* Modal de Respiração Consciente */}
      <BreathingRitualModal
        isOpen={showBreathingModal}
        onClose={() => setShowBreathingModal(false)}
        contextTitle={currentMission.title}
      />
    </div>
  )
}

export default MissionDetailPage
