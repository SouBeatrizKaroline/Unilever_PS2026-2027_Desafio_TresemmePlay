import React, { useState } from 'react'
import {
  Sparkles,
  Download,
  Trash2,
  Eye,
  X,
  Share2,
  Calendar,
  Image as ImageIcon,
} from 'lucide-react'
import { useGame } from '@/context/GameContext'
import type { SavedSharedCard } from '@/types/game'
import {
  generateCardSvgString,
  convertSvgToPngBlob,
  shareRitualCard,
  type ShareCardProps,
} from '@/components/ShareCardModal'

interface SharedCardsAlbumModalProps {
  isOpen: boolean
  onClose: () => void
}

export const SharedCardsAlbumModal: React.FC<SharedCardsAlbumModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { journey, deleteSharedCard } = useGame()
  const savedCards = journey.savedSharedCards || []

  const [selectedCard, setSelectedCard] = useState<SavedSharedCard | null>(null)
  const [feedback, setFeedback] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  if (!isOpen) return null

  const handleDownloadCard = async (card: SavedSharedCard) => {
    setIsProcessing(true)
    try {
      const shareProps: ShareCardProps = {
        missionTitle: card.missionTitle,
        points: card.points,
        stars: card.stars ?? 3,
        completedAt: card.completedAt,
        rewardName: card.rewardName,
        userName: card.userName || journey.name || 'Participante',
        avatarId: card.avatarId || journey.avatarId,
        skinTone: card.skinTone || journey.skinTone,
        hairTexture: card.hairTexture || journey.hairTexture,
        unlockedAccessories: card.unlockedAccessories || journey.unlockedAccessories,
        selectedAccessoryId: card.selectedAccessoryId,
        selectedAccessoriesList: card.selectedAccessoriesList,
        isRitualCompleto: card.isRitualCompleto,
        achievementType: card.achievementType,
        weeklyIntention: card.weeklyIntention,
      }
      const svg = card.svgString || generateCardSvgString(shareProps)
      const blob = await convertSvgToPngBlob(svg)
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `tresemme-album-${card.missionTitle.toLowerCase().replace(/\s+/g, '-')}.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      setTimeout(() => window.URL.revokeObjectURL(url), 1000)
      setFeedback('Card baixado com sucesso!')
      setTimeout(() => setFeedback(null), 3000)
    } catch {
      setFeedback('Erro ao baixar PNG.')
      setTimeout(() => setFeedback(null), 3000)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleShareCard = async (card: SavedSharedCard) => {
    setIsProcessing(true)
    try {
      const shareProps: ShareCardProps = {
        missionTitle: card.missionTitle,
        points: card.points,
        stars: card.stars ?? 3,
        completedAt: card.completedAt,
        rewardName: card.rewardName,
        userName: card.userName || journey.name || 'Participante',
        avatarId: card.avatarId || journey.avatarId,
        skinTone: card.skinTone || journey.skinTone,
        hairTexture: card.hairTexture || journey.hairTexture,
        unlockedAccessories: card.unlockedAccessories || journey.unlockedAccessories,
        selectedAccessoryId: card.selectedAccessoryId,
        selectedAccessoriesList: card.selectedAccessoriesList,
        isRitualCompleto: card.isRitualCompleto,
        achievementType: card.achievementType,
        weeklyIntention: card.weeklyIntention,
      }
      await shareRitualCard(shareProps, (msg) => {
        setFeedback(msg)
        setTimeout(() => setFeedback(null), 3000)
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleDeleteCard = (cardId: string) => {
    deleteSharedCard(cardId)
    if (selectedCard?.id === cardId) {
      setSelectedCard(null)
    }
    setFeedback('Card removido do álbum.')
    setTimeout(() => setFeedback(null), 2500)
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="album-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md max-h-[90vh] rounded-3xl border border-[#D4AF37] bg-[#141414] p-5 text-white shadow-[0_0_35px_rgba(212,175,55,0.25)] flex flex-col space-y-4 animate-scale-in relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Luz ambiente dourada de fundo */}
        <div className="absolute top-0 right-0 w-48 h-32 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Cabeçalho */}
        <div className="flex items-center justify-between pb-2 border-b border-white/10 relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/35 flex items-center justify-center text-[#D4AF37]">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2
                  id="album-modal-title"
                  className="font-serif text-base sm:text-lg font-bold text-white"
                >
                  Álbum de Cards
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#D4AF37] text-black font-extrabold">
                  {savedCards.length}
                </span>
              </div>
              <p className="text-[11px] text-[#A0A0A0]">
                Suas conquistas e rituais salvos para rever e compartilhar
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors"
            aria-label="Fechar álbum de cards"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Feedback visual */}
        {feedback && (
          <div className="px-3 py-1.5 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/35 text-[#F1E5C8] text-xs font-semibold text-center animate-fade-in">
            {feedback}
          </div>
        )}

        {/* Conteúdo: Lista ou Estado Vazio */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1 min-h-[220px]">
          {savedCards.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3 rounded-2xl border border-dashed border-[#D4AF37]/30 bg-[#1A1813]/40">
              <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
                <Sparkles className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <p className="font-serif text-base font-bold text-white">Seu álbum está vazio</p>
                <p className="text-xs text-[#B3B3B3] max-w-xs leading-relaxed">
                  Compartilhe seu primeiro ritual ou conquista para começar sua coleção de cards
                  dourados de autocuidado.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {savedCards.map((card) => {
                const cardSvg =
                  card.svgString ||
                  generateCardSvgString({
                    missionTitle: card.missionTitle,
                    points: card.points,
                    stars: card.stars ?? 3,
                    completedAt: card.completedAt,
                    rewardName: card.rewardName,
                    userName: card.userName || journey.name || 'Participante',
                    avatarId: card.avatarId || journey.avatarId,
                    skinTone: card.skinTone || journey.skinTone,
                    hairTexture: card.hairTexture || journey.hairTexture,
                    unlockedAccessories: card.unlockedAccessories || journey.unlockedAccessories,
                    selectedAccessoryId: card.selectedAccessoryId,
                    selectedAccessoriesList: card.selectedAccessoriesList,
                    isRitualCompleto: card.isRitualCompleto,
                    achievementType: card.achievementType,
                    weeklyIntention: card.weeklyIntention,
                  })

                return (
                  <div
                    key={card.id}
                    className="rounded-2xl border border-[#D4AF37]/35 bg-[#171717] p-3 space-y-2.5 flex flex-col justify-between hover:border-[#D4AF37] transition-all group"
                  >
                    {/* Miniatura do Card (SVG inline miniaturizado) */}
                    <div
                      className="w-full aspect-[5/6] rounded-xl overflow-hidden bg-black/60 border border-white/10 relative cursor-pointer group-hover:shadow-[0_0_15px_rgba(212,175,55,0.25)] transition-shadow flex items-center justify-center p-1"
                      onClick={() => setSelectedCard(card)}
                      title="Clique para ver em tamanho grande"
                    >
                      <div
                        className="w-full h-full pointer-events-none flex items-center justify-center scale-95"
                        dangerouslySetInnerHTML={{ __html: cardSvg }}
                      />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity backdrop-blur-[1px]">
                        <span className="px-3 py-1 rounded-full bg-[#D4AF37] text-black text-xs font-bold flex items-center gap-1 shadow-md">
                          <Eye className="w-3.5 h-3.5" />
                          <span>Ver grande</span>
                        </span>
                      </div>
                    </div>

                    {/* Dados rápidos do card */}
                    <div className="space-y-1 text-left">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="font-serif text-xs font-bold text-white truncate">
                          {card.missionTitle}
                        </h4>
                        <span className="text-[10px] font-mono text-[#D4AF37] font-bold shrink-0">
                          +{card.points} pts
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-[#888888]">
                        <span className="flex items-center gap-1 truncate">
                          <Calendar className="w-3 h-3 text-[#D4AF37]" />
                          <span>{card.completedAt}</span>
                        </span>
                      </div>
                    </div>

                    {/* Botões de Ação */}
                    <div className="grid grid-cols-3 gap-1.5 pt-1 border-t border-white/5">
                      <button
                        type="button"
                        onClick={() => setSelectedCard(card)}
                        className="min-h-[34px] rounded-lg bg-white/5 hover:bg-white/10 text-white text-[11px] font-medium flex items-center justify-center gap-1 transition-colors"
                        title="Visualizar em tamanho grande"
                        aria-label="Visualizar card em tamanho grande"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span className="hidden xs:inline">Ver</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDownloadCard(card)}
                        disabled={isProcessing}
                        className="min-h-[34px] rounded-lg bg-[#D4AF37]/15 hover:bg-[#D4AF37]/25 text-[#F1E5C8] text-[11px] font-semibold flex items-center justify-center gap-1 transition-colors border border-[#D4AF37]/30"
                        title="Baixar imagem PNG"
                        aria-label="Baixar PNG do card"
                      >
                        <Download className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span className="hidden xs:inline">PNG</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteCard(card.id)}
                        className="min-h-[34px] rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-300 text-[11px] font-medium flex items-center justify-center gap-1 transition-colors border border-red-500/20"
                        title="Remover do álbum"
                        aria-label="Excluir card do álbum"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-red-400" />
                        <span className="hidden xs:inline">Excluir</span>
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Rodapé com botão de fechar */}
        <div className="pt-2 border-t border-white/10 flex items-center justify-between">
          <p className="text-[11px] text-[#888888]">Cards salvos automaticamente ao compartilhar</p>
          <button
            type="button"
            onClick={onClose}
            className="min-h-[38px] px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>

      {/* Modal Interno de Visualização em Tamanho Grande */}
      {selectedCard && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="card-detail-title"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fade-in"
          onClick={() => setSelectedCard(null)}
        >
          <div
            className="w-full max-w-sm rounded-3xl border border-[#D4AF37] bg-[#141414] p-5 text-center text-white shadow-[0_0_40px_rgba(212,175,55,0.35)] space-y-4 animate-scale-in relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedCard(null)}
              className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors z-10"
              aria-label="Fechar visualização detalhada"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-0.5 pt-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#D4AF37] font-bold">
                Card Salvo no Álbum
              </span>
              <h3 id="card-detail-title" className="font-serif text-base font-bold text-white">
                {selectedCard.missionTitle}
              </h3>
            </div>

            {/* Prévia SVG em tamanho grande */}
            <div className="w-full max-h-[380px] rounded-2xl overflow-hidden border border-[#D4AF37]/50 bg-black/70 p-2 shadow-inner flex items-center justify-center">
              <div
                className="w-full h-full max-h-[360px] flex items-center justify-center"
                dangerouslySetInnerHTML={{
                  __html:
                    selectedCard.svgString ||
                    generateCardSvgString({
                      missionTitle: selectedCard.missionTitle,
                      points: selectedCard.points,
                      stars: selectedCard.stars ?? 3,
                      completedAt: selectedCard.completedAt,
                      rewardName: selectedCard.rewardName,
                      userName: selectedCard.userName || journey.name || 'Participante',
                      avatarId: selectedCard.avatarId || journey.avatarId,
                      skinTone: selectedCard.skinTone || journey.skinTone,
                      hairTexture: selectedCard.hairTexture || journey.hairTexture,
                      unlockedAccessories:
                        selectedCard.unlockedAccessories || journey.unlockedAccessories,
                      selectedAccessoryId: selectedCard.selectedAccessoryId,
                      selectedAccessoriesList: selectedCard.selectedAccessoriesList,
                      isRitualCompleto: selectedCard.isRitualCompleto,
                      achievementType: selectedCard.achievementType,
                      weeklyIntention: selectedCard.weeklyIntention,
                    }),
                }}
              />
            </div>

            {/* Botões de Ação do Card Grande */}
            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={() => handleShareCard(selectedCard)}
                disabled={isProcessing}
                className="w-full min-h-[44px] rounded-xl bg-[#D4AF37] hover:bg-[#B8962E] text-black font-bold text-xs flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all"
              >
                <Share2 className="w-4 h-4 stroke-[2.5]" />
                <span>Compartilhar Novamente</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleDownloadCard(selectedCard)}
                  disabled={isProcessing}
                  className="min-h-[42px] rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Baixar PNG</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDeleteCard(selectedCard.id)}
                  className="min-h-[42px] rounded-xl border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-300 font-medium text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5 text-red-400" />
                  <span>Excluir</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
