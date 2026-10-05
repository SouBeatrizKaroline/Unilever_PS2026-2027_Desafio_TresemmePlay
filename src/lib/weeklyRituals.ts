// Missões Rotativas da Coleção "Ritual da Semana"
// 7 missões curtas (2-3 etapas), uma para cada dia da semana (segunda a domingo)
// A missão do dia ganha badge "Missão de Hoje" e destaque, mas todas as outras permanecem disponíveis sem bloqueio/punição.

export interface WeeklyMissionDay {
  id: string
  dayOfWeekIndex: number // 1: Segunda, 2: Terça, 3: Quarta, 4: Quinta, 5: Sexta, 6: Sábado, 0: Domingo
  dayName: string
  title: string
  desc: string
  theme: string
  points: number
  rewardName: string
  accessoryId?: string
  accessoryType?:
    | 'star-clip'
    | 'gold-bow'
    | 'crystal-crown'
    | 'golden-ribbon'
    | 'hairpin'
    | 'scrunchie'
    | 'tiara'
  steps: {
    step: 1 | 2 | 3
    title: string
    instruction: string
    tip: string
  }[]
}

export const WEEKLY_RITUALS: WeeklyMissionDay[] = [
  {
    id: 'semana-segunda',
    dayOfWeekIndex: 1,
    dayName: 'Segunda-feira',
    title: 'Segunda da Limpeza Leve',
    theme: 'Desintoxicação & Leveza',
    desc: 'Purificação suave do couro cabeludo com água morna e massagem revigorante para abrir a semana.',
    points: 45,
    rewardName: 'Selo Segunda de Foco',
    accessoryType: 'hairpin',
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
  {
    id: 'semana-terca',
    dayOfWeekIndex: 2,
    dayName: 'Terça-feira',
    title: 'Terça de Nutrição Reparadora',
    theme: 'Carga Lipídica & Força',
    desc: 'Banho de nutrição capilar rápida com óleo vegetal nobre e acabamento iluminado.',
    points: 55,
    rewardName: 'Prendedor de Estrela Dourada',
    accessoryId: 'star-clip-gold',
    accessoryType: 'star-clip',
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
  {
    id: 'semana-quarta',
    dayOfWeekIndex: 3,
    dayName: 'Quarta-feira',
    title: 'Quarta do Equilíbrio e Bruma',
    theme: 'Hidratação & Calma no Meio da Semana',
    desc: 'Bruma revitalizante antifrizz para renovar o movimento no meio da semana.',
    points: 40,
    rewardName: 'Scrunchie Dourado',
    accessoryId: 'scrunchie-gold',
    accessoryType: 'scrunchie',
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
  {
    id: 'semana-quinta',
    dayOfWeekIndex: 4,
    dayName: 'Quinta-feira',
    title: 'Quinta do Fortalecimento',
    theme: 'Alinhamento & Resistência',
    desc: 'Tratamento com aminoácidos e entrelaçamento protetor com a Fita Dourada.',
    points: 50,
    rewardName: 'Fita Dourada Entrelaçada',
    accessoryId: 'golden-ribbon',
    accessoryType: 'golden-ribbon',
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
  {
    id: 'semana-sexta',
    dayOfWeekIndex: 5,
    dayName: 'Sexta-feira',
    title: 'Sexta de Brilho Espelhado',
    theme: 'Luminosidade & Celebração',
    desc: 'Gotas de cristal de brilho, toque sedoso e laço dourado de celebração do fim de semana.',
    points: 60,
    rewardName: 'Laço Dourado de Cetim',
    accessoryId: 'gold-bow',
    accessoryType: 'gold-bow',
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
  {
    id: 'semana-sabado',
    dayOfWeekIndex: 6,
    dayName: 'Sábado',
    title: 'Sábado Livre & Expressão',
    theme: 'Texturas & Penteado Criativo',
    desc: 'Momento de brincar com novos estilos, coques despojados ou tranças soltas sem pressa.',
    points: 50,
    rewardName: 'Tiara de Ondas Dourada',
    accessoryId: 'tiara-waves-gold',
    accessoryType: 'tiara',
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
  {
    id: 'semana-domingo',
    dayOfWeekIndex: 0,
    dayName: 'Domingo',
    title: 'Domingo de Revitalização',
    theme: 'Renovação Completa & Descanso',
    desc: 'Spa relaxante de fechamento de ciclo com a Coroa de Cristais Dourados.',
    points: 60,
    rewardName: 'Coroa de Cristais Dourados',
    accessoryId: 'crystal-crown',
    accessoryType: 'crystal-crown',
    steps: [
      {
        step: 1,
        title: 'Máscara profunda e momento de silêncio',
        instruction:
          'Aplique a máscara de restauração e reserve 5 minutos para ouvir o som ambiente suave.',
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
]

// Helper para obter a missão recomendada para o dia atual (ou para um dia específico)
export function getTodayWeeklyMission(): WeeklyMissionDay {
  const currentDayOfWeek = new Date().getDay()
  return WEEKLY_RITUALS.find((m) => m.dayOfWeekIndex === currentDayOfWeek) || WEEKLY_RITUALS[0]
}
