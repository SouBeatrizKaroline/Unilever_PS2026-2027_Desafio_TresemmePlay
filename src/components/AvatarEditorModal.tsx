import React, { useState } from 'react'
import {
  AvatarSvg,
  AVATAR_OPTIONS,
  SKIN_TONE_OPTIONS,
  HAIR_TEXTURE_OPTIONS,
  HAIR_LENGTH_OPTIONS,
} from '@/components/svg/AvatarSvg'
import type { AvatarId, SkinToneId, HairTextureId, HairLengthId } from '@/types/game'
import { Check, Sparkles, User, Palette, Scissors, Ruler, X } from 'lucide-react'

export interface AvatarEditorModalProps {
  isOpen: boolean
  onClose: () => void
  currentAvatarId: AvatarId
  currentSkinTone?: SkinToneId
  currentHairTexture?: HairTextureId
  currentHairLength?: HairLengthId
  unlockedAccessories?: string[]
  selectedAccessoryId?: string | null
  selectedAccessoriesList?: string[]
  onSave: (
    avatarId: AvatarId,
    skinTone: SkinToneId,
    hairTexture: HairTextureId,
    hairLength?: HairLengthId,
  ) => void
}

export const AvatarEditorModal: React.FC<AvatarEditorModalProps> = ({
  isOpen,
  onClose,
  currentAvatarId,
  currentSkinTone,
  currentHairTexture,
  currentHairLength,
  unlockedAccessories = [],
  selectedAccessoryId,
  selectedAccessoriesList,
  onSave,
}) => {
  const [activeTab, setActiveTab] = useState<'comprimento' | 'pele' | 'textura' | 'cor'>(
    'comprimento',
  )

  // Estado local de rascunho com fallback para defaults
  const meta = AVATAR_OPTIONS.find((a) => a.id === currentAvatarId) || AVATAR_OPTIONS[0]
  const [draftAvatarId, setDraftAvatarId] = useState<AvatarId>(currentAvatarId)
  const [draftSkinTone, setDraftSkinTone] = useState<SkinToneId>(
    currentSkinTone || meta.defaultSkinTone,
  )
  const [draftHairTexture, setDraftHairTexture] = useState<HairTextureId>(
    currentHairTexture || meta.defaultTexture,
  )
  const [draftHairLength, setDraftHairLength] = useState<HairLengthId>(currentHairLength || 'longo')
  const [savedBadge, setSavedBadge] = useState<boolean>(false)

  // Sincronizar ao abrir
  React.useEffect(() => {
    if (isOpen) {
      setDraftAvatarId(currentAvatarId)
      const currentMeta = AVATAR_OPTIONS.find((a) => a.id === currentAvatarId) || AVATAR_OPTIONS[0]
      setDraftSkinTone(currentSkinTone || currentMeta.defaultSkinTone)
      setDraftHairTexture(currentHairTexture || currentMeta.defaultTexture)
      setDraftHairLength(currentHairLength || 'longo')
    }
  }, [isOpen, currentAvatarId, currentSkinTone, currentHairTexture, currentHairLength])

  if (!isOpen) return null

  const flashAutoSaved = () => {
    setSavedBadge(true)
    setTimeout(() => setSavedBadge(false), 1800)
  }

  const handleSelectLength = (lengthId: HairLengthId) => {
    setDraftHairLength(lengthId)
    onSave(draftAvatarId, draftSkinTone, draftHairTexture, lengthId)
    flashAutoSaved()
  }

  const handleSelectSkinTone = (skinId: SkinToneId) => {
    setDraftSkinTone(skinId)
    onSave(draftAvatarId, skinId, draftHairTexture, draftHairLength)
    flashAutoSaved()
  }

  const handleSelectTexture = (textureId: HairTextureId) => {
    setDraftHairTexture(textureId)
    onSave(draftAvatarId, draftSkinTone, textureId, draftHairLength)
    flashAutoSaved()
  }

  const handleSelectAvatarId = (avatarId: AvatarId) => {
    setDraftAvatarId(avatarId)
    onSave(avatarId, draftSkinTone, draftHairTexture, draftHairLength)
    flashAutoSaved()
  }

  const handleSave = () => {
    onSave(draftAvatarId, draftSkinTone, draftHairTexture, draftHairLength)
    onClose()
  }

  const selectedAvatarMeta = AVATAR_OPTIONS.find((a) => a.id === draftAvatarId) || AVATAR_OPTIONS[0]
  const selectedSkinMeta =
    SKIN_TONE_OPTIONS.find((s) => s.id === draftSkinTone) || SKIN_TONE_OPTIONS[1]
  const selectedTextureMeta =
    HAIR_TEXTURE_OPTIONS.find((t) => t.id === draftHairTexture) || HAIR_TEXTURE_OPTIONS[0]
  const selectedLengthMeta =
    HAIR_LENGTH_OPTIONS.find((l) => l.id === draftHairLength) || HAIR_LENGTH_OPTIONS[4]

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="avatar-editor-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-3xl border border-[#D4AF37] bg-[#141414] p-5 text-white shadow-[0_0_35px_rgba(212,175,55,0.3)] space-y-4 animate-scale-in relative overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Luz ambiente dourada de fundo */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-32 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Botão fechar */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors z-10"
          aria-label="Fechar editor de avatar"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Cabeçalho */}
        <div className="space-y-1 text-center pt-1 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] font-bold tracking-wider uppercase">
            <Sparkles className="w-3 h-3" />
            <span>Editor Inclusivo • Para Todas as Pessoas</span>
          </div>
          <h2 id="avatar-editor-title" className="font-serif text-lg font-bold text-white">
            Personalize seu Avatar
          </h2>
          <p className="text-xs text-[#B3B3B3]">
            Corte, curvatura, tom de pele e nuances adaptados a você.
          </p>
        </div>

        {/* Área de Prévia ao Vivo Grande */}
        <div className="relative rounded-2xl border border-[#D4AF37]/40 bg-gradient-to-b from-[#1F1D1A] to-[#121212] p-4 flex items-center justify-center gap-4 shadow-inner">
          <div className="relative">
            <div className="w-24 h-24 rounded-full border-2 border-[#D4AF37] p-1 bg-[#141414] shadow-[0_0_20px_rgba(212,175,55,0.4)] flex items-center justify-center overflow-hidden aspect-square">
              <AvatarSvg
                id={draftAvatarId}
                skinTone={draftSkinTone}
                hairTexture={draftHairTexture}
                hairLength={draftHairLength}
                unlockedAccessories={unlockedAccessories}
                selectedAccessoryId={selectedAccessoryId}
                selectedAccessoriesList={selectedAccessoriesList}
                className="w-full h-full rounded-full object-contain"
              />
            </div>
            <span
              className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#D4AF37] text-black flex items-center justify-center text-xs font-bold ring-2 ring-[#141414] shadow"
              title="Prévia ao vivo"
            >
              ★
            </span>
          </div>

          <div className="space-y-1 text-left min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-wider block">
                Prévia ao Vivo
              </span>
              {savedBadge && (
                <span className="text-[10px] font-bold text-[#81C784] bg-[#4CAF50]/15 border border-[#4CAF50]/30 px-2 py-0.5 rounded-full animate-fade-in flex items-center gap-1">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                  <span>Salvo!</span>
                </span>
              )}
            </div>
            <p className="font-serif text-sm font-bold text-white truncate">
              {selectedAvatarMeta.label}
            </p>
            <p className="text-[11px] text-[#F1E5C8] font-medium flex items-center gap-1">
              <span
                className="w-2.5 h-2.5 rounded-full inline-block"
                style={{ backgroundColor: selectedSkinMeta.hex }}
              />
              <span>{selectedSkinMeta.name}</span>
            </p>
            <p className="text-[10px] text-[#D4AF37] font-semibold">
              Corte: <strong>{selectedLengthMeta.name}</strong>
            </p>
            {draftHairLength !== 'careca' && (
              <p className="text-[10px] text-[#A0A0A0]">
                Textura: <strong className="text-white">{selectedTextureMeta.name}</strong>
              </p>
            )}
            {draftHairLength === 'careca' && (
              <p className="text-[9px] text-amber-300/80 italic">
                Sem fios para cuidar: brilho de dentro e pele protegida
              </p>
            )}
          </div>
        </div>

        {/* Abas do Editor: Comprimento / Pele / Textura / Cor */}
        <div className="grid grid-cols-4 gap-1 bg-[#1A1A1A] p-1 rounded-xl border border-white/10 text-[11px] font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('comprimento')}
            className={`min-h-[38px] rounded-lg transition-all flex flex-col items-center justify-center py-1 ${
              activeTab === 'comprimento'
                ? 'bg-[#D4AF37] text-black shadow-sm font-bold'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <Ruler className="w-3.5 h-3.5" />
            <span className="leading-tight text-[10px]">Corte</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('pele')}
            className={`min-h-[38px] rounded-lg transition-all flex flex-col items-center justify-center py-1 ${
              activeTab === 'pele'
                ? 'bg-[#D4AF37] text-black shadow-sm font-bold'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span className="leading-tight text-[10px]">Pele</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('textura')}
            className={`min-h-[38px] rounded-lg transition-all flex flex-col items-center justify-center py-1 ${
              activeTab === 'textura'
                ? 'bg-[#D4AF37] text-black shadow-sm font-bold'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <Scissors className="w-3.5 h-3.5" />
            <span className="leading-tight text-[10px]">Textura</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('cor')}
            className={`min-h-[38px] rounded-lg transition-all flex flex-col items-center justify-center py-1 ${
              activeTab === 'cor'
                ? 'bg-[#D4AF37] text-black shadow-sm font-bold'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span className="leading-tight text-[10px]">Cor</span>
          </button>
        </div>

        {/* Conteúdo das Abas (Scrollável) */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-3 custom-scrollbar min-h-[170px] max-h-[230px]">
          {/* ABA COMPRIMENTO / CORTE */}
          {activeTab === 'comprimento' && (
            <div className="space-y-2.5 text-left">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white">Comprimento & Estilo</span>
                <span className="text-[11px] text-[#D4AF37]">
                  Careca, curto rente, volume, médio e longo
                </span>
              </div>

              <div className="space-y-2" role="radiogroup" aria-label="Comprimento de cabelo">
                {HAIR_LENGTH_OPTIONS.map((len) => {
                  const isSelected = draftHairLength === len.id
                  return (
                    <button
                      key={len.id}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => handleSelectLength(len.id)}
                      className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between gap-3 transition-all ${
                        isSelected
                          ? 'border-[#D4AF37] bg-[#D4AF37]/15 ring-1 ring-[#D4AF37] shadow-sm'
                          : 'border-white/10 bg-[#1A1A1A] hover:bg-white/5 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-9 h-9 rounded-full border border-white/20 overflow-hidden shrink-0 bg-black/40 flex items-center justify-center">
                          <AvatarSvg
                            id={draftAvatarId}
                            skinTone={draftSkinTone}
                            hairTexture={draftHairTexture}
                            hairLength={len.id}
                            className="w-full h-full"
                          />
                        </div>
                        <div className="min-w-0">
                          <p
                            className={`text-xs font-bold truncate ${isSelected ? 'text-[#F1E5C8]' : 'text-white'}`}
                          >
                            {len.name}
                          </p>
                          <p className="text-[10px] text-[#A0A0A0] line-clamp-1">{len.desc}</p>
                        </div>
                      </div>

                      {isSelected && (
                        <span className="w-5 h-5 rounded-full bg-[#D4AF37] text-black flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* ABA TONS DE PELE */}
          {activeTab === 'pele' && (
            <div className="space-y-2.5 text-left">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white">Escolha o tom de pele</span>
                <span className="text-[11px] text-[#D4AF37] font-mono">
                  {SKIN_TONE_OPTIONS.length} tons realistas
                </span>
              </div>

              <div
                className="grid grid-cols-2 gap-2"
                role="radiogroup"
                aria-label="Tons de pele inclusivos"
              >
                {SKIN_TONE_OPTIONS.map((tone) => {
                  const isSelected = draftSkinTone === tone.id
                  return (
                    <button
                      key={tone.id}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => handleSelectSkinTone(tone.id)}
                      className={`min-h-[46px] p-2 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                        isSelected
                          ? 'border-[#D4AF37] bg-[#D4AF37]/15 ring-1 ring-[#D4AF37] shadow-sm'
                          : 'border-white/10 bg-[#1A1A1A] hover:bg-white/5 hover:border-white/20'
                      }`}
                    >
                      <div
                        className="w-7 h-7 rounded-full shrink-0 border border-white/30 shadow-inner flex items-center justify-center"
                        style={{ backgroundColor: tone.hex }}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 text-black stroke-[3]" />}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p
                          className={`text-xs font-semibold truncate ${isSelected ? 'text-[#F1E5C8]' : 'text-white'}`}
                        >
                          {tone.name}
                        </p>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* ABA TEXTURA / TIPO DE CABELO */}
          {activeTab === 'textura' && (
            <div className="space-y-2.5 text-left">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white">Curvatura & Textura</span>
                <span className="text-[11px] text-[#B3B3B3]">
                  Liso, ondulado, cacheado ou crespo
                </span>
              </div>

              {draftHairLength === 'careca' && (
                <div className="p-2 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[11px] text-[#F1E5C8]">
                  💡 No estilo <strong>Careca</strong> a textura fica em repouso — seu brilho vem da
                  pele hidratada e protegida.
                </div>
              )}

              <div
                className="grid grid-cols-2 gap-2"
                role="radiogroup"
                aria-label="Textura de cabelo"
              >
                {HAIR_TEXTURE_OPTIONS.map((tex) => {
                  const isSelected = draftHairTexture === tex.id
                  return (
                    <button
                      key={tex.id}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => handleSelectTexture(tex.id)}
                      className={`min-h-[60px] p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all ${
                        isSelected
                          ? 'border-[#D4AF37] bg-[#D4AF37]/15 ring-1 ring-[#D4AF37] shadow-sm'
                          : 'border-white/10 bg-[#1A1A1A] hover:bg-white/5 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span
                          className={`text-xs font-bold ${isSelected ? 'text-[#F1E5C8]' : 'text-white'}`}
                        >
                          {tex.name}
                        </span>
                        {isSelected && (
                          <span className="w-4 h-4 rounded-full bg-[#D4AF37] text-black flex items-center justify-center">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-[#A0A0A0] line-clamp-1 mt-0.5">{tex.desc}</p>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* ABA COR / BASE DO CABELO */}
          {activeTab === 'cor' && (
            <div className="space-y-2.5 text-left">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white">Cor do Cabelo & Nuance</span>
                <span className="text-[11px] text-[#B3B3B3]">Tons profissionais TRESemmé</span>
              </div>

              <div className="space-y-2" role="radiogroup" aria-label="Cor e base do cabelo">
                {AVATAR_OPTIONS.map((opt) => {
                  const isSelected = draftAvatarId === opt.id
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => handleSelectAvatarId(opt.id)}
                      className={`w-full min-h-[50px] p-2.5 rounded-xl border text-left flex items-center justify-between gap-3 transition-all ${
                        isSelected
                          ? 'border-[#D4AF37] bg-[#D4AF37]/15 ring-1 ring-[#D4AF37] shadow-sm'
                          : 'border-white/10 bg-[#1A1A1A] hover:bg-white/5 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-8 h-8 rounded-full border border-white/20 overflow-hidden shrink-0">
                          <AvatarSvg
                            id={opt.id}
                            skinTone={draftSkinTone}
                            hairTexture={draftHairTexture}
                            hairLength={draftHairLength}
                            className="w-full h-full"
                          />
                        </div>
                        <div className="min-w-0">
                          <p
                            className={`text-xs font-bold truncate ${isSelected ? 'text-[#F1E5C8]' : 'text-white'}`}
                          >
                            {opt.label}
                          </p>
                          <p className="text-[10px] text-[#A0A0A0] truncate">{opt.desc}</p>
                        </div>
                      </div>

                      {isSelected && (
                        <span className="w-5 h-5 rounded-full bg-[#D4AF37] text-black flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* Botões de Ação */}
        <div className="pt-2 border-t border-white/10 space-y-2">
          <button
            type="button"
            onClick={handleSave}
            className="w-full min-h-[44px] rounded-xl bg-[#D4AF37] hover:bg-[#B8962E] text-black font-bold text-xs transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-2"
          >
            <Check className="w-4 h-4 stroke-[2.5]" />
            <span>Concluir Personalização</span>
          </button>
        </div>
      </div>
    </div>
  )
}
