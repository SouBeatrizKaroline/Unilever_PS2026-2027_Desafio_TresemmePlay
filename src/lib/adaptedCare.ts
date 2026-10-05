import { HairTextureId, HairLengthId, SkinToneId, AvatarId } from '@/types/game'

export interface AdaptedCareTip {
  title: string
  subtitle: string
  stepsTip: string
  washTip: string
  nightTip: string
  sunProtectionTip: string
}

/**
 * Retorna recomendações e dicas personalizadas para a combinação
 * de comprimento, textura capilar, nuance de cor e tom de pele.
 * Cobre pessoas carecas, cabelos curtos, médios e longos com linguagem inclusiva.
 */
export function getAdaptedCareProfile(
  texture?: HairTextureId,
  avatarId?: AvatarId,
  skinTone?: SkinToneId,
  length?: HairLengthId,
): AdaptedCareTip {
  const effectiveLength = length || 'longo'
  const effectiveTexture = texture || 'liso'

  // Caso especial: pessoa careca (foco total na saúde do couro cabeludo e fotoproteção)
  if (effectiveLength === 'careca') {
    let scalpSunTip =
      'Fotoproteção solar diária FPS 30+ no couro cabeludo indispensável contra manchas e sensibilidade.'
    if (skinTone === 'clara' || skinTone === 'media-clara') {
      scalpSunTip =
        'Protetor solar fluido com FPS 50+ reaplicado ao longo do dia para evitar queimaduras e fotoenvelhecimento.'
    } else if (skinTone === 'retinta' || skinTone === 'escura') {
      scalpSunTip =
        'Protetor solar sem resíduo esbranquiçado combinado com sérum hidratante para brilho acetinado natural.'
    }

    return {
      title: 'Couro Cabeludo Saudável • Iluminação Pura',
      subtitle: 'Sem fios para cuidar: seu brilho vem de dentro e da pele protegida.',
      stepsTip:
        'Higienização com limpador suave de pH neutro, tonificação revitalizante e massagem suave com a ponta dos dedos.',
      washTip:
        'Lave com água morna e loção suave sem sulfatos fortes; evite água muito quente que resseca o couro.',
      nightTip:
        'Hidratação noturna leve com sérum restaurador ou óleo leve nutritivo para acordar com o couro revitalizado.',
      sunProtectionTip: scalpSunTip,
    }
  }

  // Cuidados específicos por textura e comprimento
  let textureTip = 'Alinhamento com proteção térmica pré-secador e finalizador leve antifrizz.'
  let washTip = 'Enxágue com água morna a fresca para preservar a cutícula selada.'
  let nightTip = 'Fronha ou touca macia para reduzir o atrito nos fios durante o repouso.'

  if (effectiveLength === 'curto-buzz') {
    textureTip =
      'Fios rentes valorizam o formato: loção hidratante e escovação com cerdas macias para direção uniforme.'
    washTip =
      'Shampoo hidratante diário ou alternado, enxaguando bem a raiz sem necessidade de condicionadores pesados.'
    nightTip =
      'Gotas de óleo vegetal leve na raiz antes de dormir para nutrir a pele do couro cabeludo.'
  } else if (effectiveLength === 'curto-volume') {
    if (effectiveTexture === 'crespo') {
      textureTip =
        'Volume afro curto estruturado: use esponja twist ou fitagem com leave-in nutritivo para definição.'
      washTip =
        'Higienização suave com co-wash ou shampoo sem sulfato para preservar a oleosidade natural.'
      nightTip = 'Fronha de cetim para manter a definição do corte e da curvatura sem amassar.'
    } else if (effectiveTexture === 'cacheado') {
      textureTip =
        'Finalização rápida com ativador leve de cachos e secagem natural para movimento e volume natural.'
      washTip = 'Condicionador suave sem pesar a raiz e enxágue com água morna.'
      nightTip = 'Repouso em fronha de cetim para preservar os cachos definidos pela manhã.'
    } else {
      textureTip =
        'Pomada leve ou cera modeladora com acabamento matte para textura e caimento impecáveis.'
      washTip = 'Higienização equilibrada para remover resíduos de modeladores sem agredir.'
      nightTip = 'Pausa sem produto pesado antes de dormir para o couro cabeludo respirar livre.'
    }
  } else {
    // Comprimentos médio e longo
    if (effectiveTexture === 'crespo') {
      textureTip =
        'Adote o método LOC (Líquido, Óleo e Creme) ou fitagem estruturada para retenção profunda de umidade.'
      washTip =
        'Higienização suave sem sulfatos pesados e pré-poo com óleos vegetais nutritivos antes da lavagem.'
      nightTip =
        'Touca ou fronha de cetim noturna indispensável para proteger a curvatura e evitar quebra.'
    } else if (effectiveTexture === 'cacheado') {
      textureTip =
        'Definição mecha a mecha com gelatina ou creme modelador e secagem com difusor em temperatura média.'
      washTip =
        'Condicionamento com pausa generosa e desembaraço delicado sempre com os fios úmidos.'
      nightTip = 'Coque abacaxi frouxo com scrunchie de cetim para preservar os cachos intactos.'
    } else if (effectiveTexture === 'ondulado') {
      textureTip =
        'Texturização leve em ondas abertas com amassamento de baixo para cima sem pesar a raiz.'
      washTip =
        'Foco da nutrição no comprimento e pontas para manter o volume natural e a leveza das ondas.'
      nightTip = 'Trança solta ou coque alto suave para amanhecer com movimento natural.'
    } else {
      // Liso
      textureTip =
        'Proteção térmica obrigatória antes de calor e reparador de pontas com toque seco.'
      washTip = 'Higienização equilibrada na raiz e condicionamento apenas do meio para as pontas.'
      nightTip =
        'Escovação suave antes de dormir com cerdas flexíveis para distribuir a oleosidade natural.'
    }
  }

  // Cuidados específicos por cor/nuance
  if (avatarId === 'avatar-5') {
    // Ruivo Cobre Radiante
    washTip =
      'Lave sempre com água fria ou morna; use filtro solar capilar anti-desbotamento e máscara acobreada tonalizante mensal.'
  } else if (avatarId === 'avatar-6') {
    // Tingido Fantasia (ametista / magenta / fúcsia)
    washTip =
      'Higienize com água fria, shampoo de pH equilibrado e cronograma com reconstrução e nutrição para preservar a vibração da cor.'
  } else if (avatarId === 'avatar-3') {
    // Loiro Dourado
    washTip =
      'Hidratação profunda pós-descoloração, filtro UV diário e matização quinzenal suave contra tons amarelados indesejados.'
  }

  // Cuidado de couro cabeludo adaptado ao tom de pele
  let skinTip = 'Massagem revigorante circular para ativar a microcirculação folicular.'
  if (skinTone === 'retinta' || skinTone === 'escura') {
    skinTip =
      'Nutrição protetora do couro cabeludo com óleos biocompatíveis para evitar ressecamento e descamação.'
  } else if (skinTone === 'clara' || skinTone === 'media-clara') {
    skinTip =
      'Proteção solar de contorno capilar e couro cabeludo exposto para prevenir fotoenvelhecimento e sensibilidade.'
  } else if (skinTone === 'bronze' || skinTone === 'dourada') {
    skinTip =
      'Equilíbrio entre hidratação e controle da oleosidade com tônicos estimulantes leves na raiz.'
  }

  const lengthLabels: Record<HairLengthId, string> = {
    careca: 'Careca',
    'curto-buzz': 'Curto Rente',
    'curto-volume': 'Curto com Volume',
    medio: 'Médio',
    longo: 'Longo',
  }

  const textureLabels: Record<HairTextureId, string> = {
    crespo: 'Fios Crespos & Afro',
    cacheado: 'Fios Cacheados',
    ondulado: 'Fios Ondulados',
    liso: 'Fios Lisos',
  }

  const colorLabels: Record<AvatarId, string> = {
    'avatar-1': 'Preto Iluminado',
    'avatar-2': 'Castanho Quente',
    'avatar-3': 'Loiro Dourado',
    'avatar-4': 'Ébano Profundo',
    'avatar-5': 'Ruivo Cobre Radiante',
    'avatar-6': 'Tingido Fantasia',
  }

  return {
    title: `${lengthLabels[effectiveLength]} • ${textureLabels[effectiveTexture]} • ${avatarId ? colorLabels[avatarId] : 'Personalizado'}`,
    subtitle: `Cuidados alinhados ao seu corte, curvatura, nuance e couro cabeludo.`,
    stepsTip: textureTip,
    washTip,
    nightTip,
    sunProtectionTip: skinTip,
  }
}
