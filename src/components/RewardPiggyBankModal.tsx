import React, { useState } from 'react'
import { Sparkles, Check, CheckCircle2, Lock, X, Gift, ShieldAlert, Sliders } from 'lucide-react'
import { useGame } from '@/context/GameContext'
import { ACCESSORIES_LIST, type AccessoryItem } from '@/types/game'
import { AvatarSvg } from '@/components/svg/AvatarSvg'
import { AccessorySvg } from '@/components/svg/AccessorySvg'
import { Trash2, Plus, Bookmark, Shirt, Eye } from 'lucide-react'

interface RewardPiggyBankModalProps {
  isOpen: boolean
  onClose: () => void
}

type TabMode = 'destaque' | 'montar' | 'galeria'

export const RewardPiggyBankModal: React.FC<RewardPiggyBankModalProps> = ({ isOpen, onClose }) => {
  const {
    journey,
    setSelectedAccessory,
    setSelectedAccessoriesList,
    saveLook,
    deleteLook,
    applyLook,
  } = useGame()
  const [tabMode, setTabMode] = useState<TabMode>('destaque')
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null)

  // Estado para montar um novo look
  const [customLookSelectedIds, setCustomLookSelectedIds] = useState<string[]>([])
  const [lookNameInput, setLookNameInput] = useState('')

  if (!isOpen) return null

  const unlockedList = ACCESSORIES_LIST.filter((acc) =>
    journey.unlockedAccessories.includes(acc.id),
  )

  const savedLooks = journey.savedLooks || []

  const showFeedback = (msg: string) => {
    setFeedbackMsg(msg)
    setTimeout(() => {
      setFeedbackMsg(null)
    }, 2600)
  }

  const handleSelect = (accessoryId: string | null) => {
    setSelectedAccessory(accessoryId)
    if (accessoryId === null) {
      showFeedback('Visual limpo: nenhum acessório em destaque no avatar.')
    } else if (accessoryId === 'all') {
      setSelectedAccessory(undefined)
      showFeedback('Exibindo todos os acessórios desbloqueados juntos!')
    } else {
      const item = ACCESSORIES_LIST.find((a) => a.id === accessoryId)
      showFeedback(`"${item?.name}" destacado no seu avatar!`)
    }
  }

  const toggleAccessoryInCustomLook = (accId: string) => {
    setCustomLookSelectedIds((prev) =>
      prev.includes(accId) ? prev.filter((id) => id !== accId) : [...prev, accId],
    )
  }

  const handleSaveCustomLook = () => {
    const name = lookNameInput.trim() || `Look ${savedLooks.length + 1}`
    saveLook(name, customLookSelectedIds)
    // Aplica imediatamente o look criado ao avatar
    setSelectedAccessoriesList(customLookSelectedIds)
    setLookNameInput('')
    showFeedback(`Look "${name}" salvo e aplicado com sucesso!`)
    setTabMode('galeria')
  }

  const handleApplySavedLook = (lookId: string, lookName: string) => {
    applyLook(lookId)
    showFeedback(`Look "${lookName}" aplicado no seu avatar!`)
  }

  const handleDeleteSavedLook = (e: React.MouseEvent, lookId: string, lookName: string) => {
    e.stopPropagation()
    deleteLook(lookId)
    showFeedback(`Look "${lookName}" removido.`)
  }

  // Identificação do que está ativo no avatar
  const hasMultipleSelected =
    journey.selectedAccessoriesList && journey.selectedAccessoriesList.length > 0
  const currentSelected = journey.selectedAccessoryId

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="piggy-bank-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-3xl border border-[#D4AF37] bg-[#141414] p-5 text-white shadow-[0_0_35px_rgba(212,175,55,0.25)] space-y-4 max-h-[90vh] flex flex-col relative animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botão fechar */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          aria-label="Fechar Cofrinho de recompensas"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Cabeçalho */}
        <div className="space-y-1 text-left pr-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] font-bold tracking-wider uppercase">
            <Gift className="w-3 h-3" />
            <span>Cofrinho de Recompensas</span>
          </div>
          <h2 id="piggy-bank-title" className="font-serif text-lg font-bold text-white">
            Personalização do Avatar & Looks
          </h2>
          <p className="text-xs text-[#A0A0A0]">
            Escolha peças em destaque ou monte e salve combinações favoritas na sua Galeria de
            Looks.
          </p>
        </div>

        {/* Abas internas do Cofrinho */}
        <div className="grid grid-cols-3 gap-1 bg-[#1A1A1A] p-1 rounded-2xl border border-white/10 text-xs">
          <button
            type="button"
            onClick={() => setTabMode('destaque')}
            className={`min-h-[36px] py-1.5 px-2 rounded-xl font-bold transition-all flex items-center justify-center gap-1 text-[11px] ${
              tabMode === 'destaque'
                ? 'bg-[#D4AF37] text-black shadow-sm'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <Sparkles className="w-3 h-3" />
            <span>Destaque</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setTabMode('montar')
              // Inicializa com o que estiver ativo atualmente
              if (journey.selectedAccessoriesList) {
                setCustomLookSelectedIds(journey.selectedAccessoriesList)
              } else if (journey.selectedAccessoryId) {
                setCustomLookSelectedIds([journey.selectedAccessoryId])
              } else if (journey.selectedAccessoryId === null) {
                setCustomLookSelectedIds([])
              } else {
                setCustomLookSelectedIds(journey.unlockedAccessories)
              }
            }}
            className={`min-h-[36px] py-1.5 px-2 rounded-xl font-bold transition-all flex items-center justify-center gap-1 text-[11px] ${
              tabMode === 'montar'
                ? 'bg-[#D4AF37] text-black shadow-sm'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <Shirt className="w-3 h-3" />
            <span>Montar Look</span>
          </button>

          <button
            type="button"
            onClick={() => setTabMode('galeria')}
            className={`min-h-[36px] py-1.5 px-2 rounded-xl font-bold transition-all flex items-center justify-center gap-1 text-[11px] relative ${
              tabMode === 'galeria'
                ? 'bg-[#D4AF37] text-black shadow-sm'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <Bookmark className="w-3 h-3" />
            <span>Galeria</span>
            {savedLooks.length > 0 && (
              <span
                className={`ml-1 text-[9px] px-1.5 py-0.2 rounded-full font-bold ${
                  tabMode === 'galeria' ? 'bg-black text-[#D4AF37]' : 'bg-[#D4AF37] text-black'
                }`}
              >
                {savedLooks.length}
              </span>
            )}
          </button>
        </div>

        {/* Prévia do Avatar com o visual escolhido / em edição */}
        <div className="rounded-2xl border border-[#D4AF37]/40 bg-gradient-to-b from-[#1F1D1A] to-[#121212] p-3 flex items-center gap-3.5 shadow-inner">
          <div className="w-16 h-16 rounded-full border-2 border-[#D4AF37] p-0.5 bg-[#141414] shadow-[0_0_14px_rgba(212,175,55,0.35)] shrink-0">
            <AvatarSvg
              id={journey.avatarId}
              skinTone={journey.skinTone}
              hairTexture={journey.hairTexture}
              unlockedAccessories={journey.unlockedAccessories}
              selectedAccessoryId={tabMode === 'montar' ? undefined : journey.selectedAccessoryId}
              selectedAccessoriesList={
                tabMode === 'montar' ? customLookSelectedIds : journey.selectedAccessoriesList
              }
              className="w-full h-full rounded-full"
            />
          </div>

          <div className="space-y-0.5 text-left min-w-0">
            <span className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-wider block">
              {tabMode === 'montar' ? 'Prévia da Combinação' : 'Prévia ao Vivo'}
            </span>
            <p className="font-serif text-sm font-bold text-white truncate">
              {tabMode === 'montar'
                ? customLookSelectedIds.length === 0
                  ? 'Visual limpo (nenhum selecionado)'
                  : `${customLookSelectedIds.length} acessório(s) combinados`
                : hasMultipleSelected
                  ? `Combinação ativa (${journey.selectedAccessoriesList?.length} itens)`
                  : currentSelected === null
                    ? 'Sem acessórios (Visual minimalista)'
                    : currentSelected === undefined
                      ? 'Todos os desbloqueados'
                      : ACCESSORIES_LIST.find((a) => a.id === currentSelected)?.name || 'Acessório'}
            </p>
            <p className="text-[11px] text-[#A0A0A0]">
              Refletido no perfil, Top Bar e cards de conquista.
            </p>
          </div>
        </div>

        {feedbackMsg && (
          <div className="text-xs text-[#0D0D0D] bg-[#D4AF37] font-semibold py-1.5 px-3 rounded-xl animate-fade-in text-center flex items-center justify-center gap-1.5">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
            <span>{feedbackMsg}</span>
          </div>
        )}

        {/* ABA 1: DESTAQUE RÁPIDO */}
        {tabMode === 'destaque' && (
          <div className="space-y-3 flex-1 overflow-hidden flex flex-col">
            {/* Opções rápidas: Todos ou Nenhum */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => handleSelect(null)}
                className={`min-h-[38px] px-3 py-1.5 rounded-xl border font-semibold flex items-center justify-center gap-1.5 transition-all ${
                  !hasMultipleSelected && currentSelected === null
                    ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow-sm'
                    : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                {!hasMultipleSelected && currentSelected === null && (
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                )}
                <span>Nenhum acessório</span>
              </button>

              <button
                type="button"
                onClick={() => handleSelect('all')}
                className={`min-h-[38px] px-3 py-1.5 rounded-xl border font-semibold flex items-center justify-center gap-1.5 transition-all ${
                  !hasMultipleSelected && currentSelected === undefined
                    ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow-sm'
                    : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                {!hasMultipleSelected && currentSelected === undefined && (
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                )}
                <span>Todos juntos</span>
              </button>
            </div>

            {/* Lista de Acessórios Desbloqueados para Escolha */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar max-h-52">
              {unlockedList.length === 0 ? (
                <div className="rounded-xl border border-white/10 bg-black/40 p-4 text-center space-y-2">
                  <Lock className="w-6 h-6 text-white/30 mx-auto" />
                  <p className="text-xs text-[#B3B3B3]">
                    Você ainda não desbloqueou acessórios. Conclua missões para rechear seu
                    cofrinho!
                  </p>
                </div>
              ) : (
                unlockedList.map((acc) => {
                  const isSelected = !hasMultipleSelected && currentSelected === acc.id
                  return (
                    <button
                      key={acc.id}
                      type="button"
                      onClick={() => handleSelect(acc.id)}
                      className={`w-full rounded-xl border p-2.5 text-left flex items-center justify-between gap-3 transition-all min-h-[50px] ${
                        isSelected
                          ? 'border-[#D4AF37] bg-[#D4AF37]/15 ring-1 ring-[#D4AF37] shadow-sm'
                          : 'border-white/10 bg-[#1A1A1A] hover:bg-[#222222] hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-8 h-8 rounded-lg bg-black/40 border border-[#D4AF37]/30 flex items-center justify-center shrink-0">
                          <AccessorySvg
                            goldIconType={acc.goldIconType}
                            isUnlocked
                            className="w-6 h-6"
                          />
                        </div>
                        <div className="min-w-0">
                          <p
                            className={`text-xs font-bold truncate ${isSelected ? 'text-[#F1E5C8]' : 'text-white'}`}
                          >
                            {acc.name}
                          </p>
                          <p className="text-[10px] text-[#A0A0A0] truncate">
                            Conquista: {acc.missionSource}
                          </p>
                        </div>
                      </div>

                      <div className="shrink-0">
                        {isSelected ? (
                          <span className="w-6 h-6 rounded-full bg-[#D4AF37] text-black flex items-center justify-center shadow-sm">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </span>
                        ) : (
                          <span className="text-[11px] text-[#888888] font-semibold hover:text-[#D4AF37]">
                            Destacar
                          </span>
                        )}
                      </div>
                    </button>
                  )
                })
              )}
            </div>
          </div>
        )}

        {/* ABA 2: MONTAR NOVO LOOK */}
        {tabMode === 'montar' && (
          <div className="space-y-3 flex-1 overflow-hidden flex flex-col text-left">
            <div className="space-y-1">
              <label
                htmlFor="look-name-input"
                className="text-xs font-semibold text-[#F1E5C8] block"
              >
                Nome do Look
              </label>
              <input
                id="look-name-input"
                type="text"
                placeholder="Ex.: Domingo Relax, Noite Especial, Brilho Dourado..."
                value={lookNameInput}
                onChange={(e) => setLookNameInput(e.target.value.slice(0, 30))}
                maxLength={30}
                className="w-full text-xs p-2.5 rounded-xl bg-[#202020] text-white border border-[#D4AF37]/40 placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-[#A0A0A0]">
              <span>Marque as peças que compõem este look:</span>
              <span className="font-bold text-[#D4AF37]">
                {customLookSelectedIds.length} selecionada(s)
              </span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar max-h-40">
              {unlockedList.length === 0 ? (
                <div className="rounded-xl border border-white/10 bg-black/40 p-4 text-center space-y-1">
                  <p className="text-xs text-[#B3B3B3]">
                    Desbloqueie acessórios concluindo missões para montar seus looks.
                  </p>
                </div>
              ) : (
                unlockedList.map((acc) => {
                  const isChecked = customLookSelectedIds.includes(acc.id)
                  return (
                    <button
                      key={acc.id}
                      type="button"
                      onClick={() => toggleAccessoryInCustomLook(acc.id)}
                      className={`w-full rounded-xl border p-2 text-left flex items-center justify-between gap-2.5 transition-all min-h-[44px] ${
                        isChecked
                          ? 'border-[#D4AF37] bg-[#D4AF37]/15 ring-1 ring-[#D4AF37]'
                          : 'border-white/10 bg-[#1A1A1A] hover:bg-[#222222]'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-7 h-7 rounded-lg bg-black/40 border border-[#D4AF37]/30 flex items-center justify-center shrink-0">
                          <AccessorySvg
                            goldIconType={acc.goldIconType}
                            isUnlocked
                            className="w-5 h-5"
                          />
                        </div>
                        <p
                          className={`text-xs font-semibold truncate ${
                            isChecked ? 'text-[#F1E5C8]' : 'text-white'
                          }`}
                        >
                          {acc.name}
                        </p>
                      </div>

                      <div className="shrink-0">
                        <div
                          className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                            isChecked
                              ? 'bg-[#D4AF37] border-[#D4AF37] text-black'
                              : 'border-white/30 bg-black/30'
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </div>
                    </button>
                  )
                })
              )}
            </div>

            <button
              type="button"
              onClick={handleSaveCustomLook}
              className="w-full min-h-[42px] rounded-xl bg-[#D4AF37] hover:bg-[#B8962E] text-black font-bold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all"
            >
              <Bookmark className="w-4 h-4 fill-current" />
              <span>Salvar na Galeria & Aplicar Look</span>
            </button>
          </div>
        )}

        {/* ABA 3: GALERIA DE LOOKS SALVOS */}
        {tabMode === 'galeria' && (
          <div className="space-y-3 flex-1 overflow-hidden flex flex-col text-left">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#A0A0A0]">Seus looks salvos favoritos:</span>
              <button
                type="button"
                onClick={() => setTabMode('montar')}
                className="text-[11px] font-bold text-[#D4AF37] hover:underline flex items-center gap-1"
              >
                <Plus className="w-3 h-3" />
                <span>Novo look</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 custom-scrollbar max-h-56">
              {savedLooks.length === 0 ? (
                <div className="rounded-xl border border-white/10 bg-black/40 p-5 text-center space-y-2">
                  <Bookmark className="w-6 h-6 text-[#D4AF37]/50 mx-auto" />
                  <p className="font-serif text-sm font-bold text-white">Nenhum look salvo</p>
                  <p className="text-xs text-[#B3B3B3] leading-relaxed">
                    Você ainda não salvou combinações. Crie looks personalizados na aba "Montar
                    Look" para alternar com 1 toque!
                  </p>
                  <button
                    type="button"
                    onClick={() => setTabMode('montar')}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#D4AF37] text-black font-bold text-xs hover:bg-[#B8962E] transition-all min-h-[36px]"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Criar primeiro look</span>
                  </button>
                </div>
              ) : (
                savedLooks.map((look) => {
                  const isCurrentActive =
                    journey.selectedAccessoriesList &&
                    journey.selectedAccessoriesList.length === look.accessoryIds.length &&
                    look.accessoryIds.every((id) => journey.selectedAccessoriesList?.includes(id))

                  return (
                    <div
                      key={look.id}
                      onClick={() => handleApplySavedLook(look.id, look.name)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          handleApplySavedLook(look.id, look.name)
                        }
                      }}
                      className={`w-full rounded-2xl border p-3 flex items-center justify-between gap-3 transition-all cursor-pointer ${
                        isCurrentActive
                          ? 'border-[#D4AF37] bg-gradient-to-r from-[#2B2314] to-[#1F1A12] ring-1 ring-[#D4AF37] shadow-md'
                          : 'border-white/10 bg-[#191919] hover:bg-[#222222] hover:border-white/20'
                      }`}
                    >
                      {/* Avatar preview do look salvo */}
                      <div className="w-12 h-12 rounded-full border border-[#D4AF37]/60 p-0.5 bg-[#141414] shrink-0">
                        <AvatarSvg
                          id={journey.avatarId}
                          skinTone={journey.skinTone}
                          hairTexture={journey.hairTexture}
                          unlockedAccessories={journey.unlockedAccessories}
                          selectedAccessoriesList={look.accessoryIds}
                          className="w-full h-full rounded-full"
                        />
                      </div>

                      <div className="space-y-0.5 min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <p
                            className={`font-serif text-sm font-bold truncate ${
                              isCurrentActive ? 'text-[#F1E5C8]' : 'text-white'
                            }`}
                          >
                            {look.name}
                          </p>
                          {isCurrentActive && (
                            <span className="text-[9px] font-mono px-1.5 py-0.2 rounded-full bg-[#D4AF37] text-black font-bold">
                              ATIVO
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-[#A0A0A0] truncate">
                          {look.accessoryIds.length === 0
                            ? 'Sem acessórios (clean)'
                            : `${look.accessoryIds.length} peça(s): ${look.accessoryIds
                                .map((id) => ACCESSORIES_LIST.find((a) => a.id === id)?.name)
                                .filter(Boolean)
                                .join(', ')}`}
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleApplySavedLook(look.id, look.name)
                          }}
                          className={`min-h-[36px] px-2.5 rounded-xl font-bold text-xs flex items-center gap-1 transition-all ${
                            isCurrentActive
                              ? 'bg-[#D4AF37] text-black'
                              : 'bg-white/10 hover:bg-white/20 text-white'
                          }`}
                          title="Aplicar no avatar"
                          aria-label={`Aplicar look ${look.name}`}
                        >
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                          <span>{isCurrentActive ? 'Aplicado' : 'Usar'}</span>
                        </button>

                        <button
                          type="button"
                          onClick={(e) => handleDeleteSavedLook(e, look.id, look.name)}
                          className="w-8 h-8 rounded-xl text-white/40 hover:text-[#E57373] hover:bg-white/10 flex items-center justify-center transition-colors"
                          title="Excluir look"
                          aria-label={`Excluir look ${look.name}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>
        )}

        {/* Rodapé */}
        <div className="pt-2 border-t border-white/10">
          <button
            type="button"
            onClick={onClose}
            className="w-full min-h-[44px] rounded-xl bg-[#D4AF37] hover:bg-[#B8962E] text-black font-bold text-xs transition-all shadow-md active:scale-95"
          >
            Pronto
          </button>
        </div>
      </div>
    </div>
  )
}
