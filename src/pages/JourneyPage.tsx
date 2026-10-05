import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGame } from '@/context/GameContext'
import type { AvatarId, SkinToneId, HairTextureId, HairLengthId } from '@/types/game'
import {
  AvatarSvg,
  AVATAR_OPTIONS,
  SKIN_TONE_OPTIONS,
  HAIR_TEXTURE_OPTIONS,
  HAIR_LENGTH_OPTIONS,
} from '@/components/svg/AvatarSvg'
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  AlertCircle,
  Palette,
  Scissors,
  Ruler,
} from 'lucide-react'

export const JourneyPage: React.FC = () => {
  const navigate = useNavigate()
  const { startJourney, journey } = useGame()

  const [name, setName] = useState(journey.name && !journey.isDemo ? journey.name : '')
  const [avatarId, setAvatarId] = useState<AvatarId>(journey.avatarId || 'avatar-1')
  const defaultMeta =
    AVATAR_OPTIONS.find((a) => a.id === (journey.avatarId || 'avatar-1')) || AVATAR_OPTIONS[0]
  const [skinTone, setSkinTone] = useState<SkinToneId>(
    journey.skinTone || defaultMeta.defaultSkinTone,
  )
  const [hairTexture, setHairTexture] = useState<HairTextureId>(
    journey.hairTexture || defaultMeta.defaultTexture,
  )
  const [hairLength, setHairLength] = useState<HairLengthId>(journey.hairLength || 'longo')
  const [error, setError] = useState<string | null>(null)
  const [hasInteracted, setHasInteracted] = useState(false)

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
    if (error && e.target.value.trim().length > 0) {
      setError(null)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setHasInteracted(true)

    const trimmed = name.trim()
    if (!trimmed) {
      setError('Por favor, informe seu nome para personalizar sua jornada.')
      return
    }

    if (!avatarId) {
      setError('Por favor, selecione um avatar.')
      return
    }

    startJourney(trimmed, avatarId, skinTone, hairTexture, hairLength)
    navigate('/inicio')
  }

  const isValid = name.trim().length > 0 && Boolean(avatarId)

  return (
    <div className="flex-1 px-5 py-6 flex flex-col justify-between animate-fade-in">
      {/* Botão voltar simples para quem quiser voltar ao início */}
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-1.5 text-xs text-[#B3B3B3] hover:text-white py-1 px-2 rounded-lg bg-white/5 border border-white/10"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Voltar à entrada</span>
        </button>

        <span className="text-[11px] font-mono text-[#D4AF37] px-2 py-0.5 rounded bg-[#D4AF37]/10 border border-[#D4AF37]/30">
          Acesso Demonstrativo
        </span>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between space-y-6">
        <div className="space-y-6">
          {/* Cabeçalho */}
          <div className="text-left space-y-1">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Sua Jornada de <span className="text-[#D4AF37]">Autocuidado</span>
            </h1>
            <p className="text-sm text-[#B3B3B3]">
              Personalize seu perfil para acompanhar seus passos, rituais e conquistas salvas no seu
              aparelho.
            </p>
          </div>
          {/* Campo Nome */}
          <div className="space-y-2">
            <label htmlFor="user-name" className="block text-sm font-semibold text-white">
              Como você prefere ser chamada(o)? <span className="text-[#D4AF37]">*</span>
            </label>
            <div className="relative">
              <input
                id="user-name"
                type="text"
                value={name}
                onChange={handleNameChange}
                placeholder="Ex.: Marina, Alex, Camila, Lucca..."
                maxLength={32}
                className={`w-full min-h-[50px] px-4 rounded-xl bg-[#1A1A1A] text-white placeholder-white/30 border transition-all focus:outline-none focus:ring-2 ${
                  error
                    ? 'border-[#E57373] focus:ring-[#E57373]'
                    : 'border-white/15 focus:border-[#D4AF37] focus:ring-[#D4AF37]/40'
                }`}
              />
            </div>
            {error && (
              <p className="flex items-center gap-1.5 text-xs text-[#E57373] mt-1" role="alert">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{error}</span>
              </p>
            )}
          </div>
          {/* Prévia ao Vivo Destacada */}
          <div className="rounded-2xl border border-[#D4AF37]/40 bg-gradient-to-b from-[#1E1C18] to-[#121212] p-4 flex items-center gap-4 shadow-sm">
            <div className="relative shrink-0">
              <div className="w-20 h-20 rounded-full border-2 border-[#D4AF37] p-1 bg-[#141414] shadow-[0_0_18px_rgba(212,175,55,0.35)] flex items-center justify-center overflow-hidden aspect-square">
                <AvatarSvg
                  id={avatarId}
                  skinTone={skinTone}
                  hairTexture={hairTexture}
                  hairLength={hairLength}
                  className="w-full h-full rounded-full"
                />
              </div>
              <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#D4AF37] text-black flex items-center justify-center text-[10px] font-black">
                ★
              </span>
            </div>
            <div className="text-left space-y-0.5">
              <span className="text-[10px] font-mono tracking-wider uppercase text-[#D4AF37] font-bold">
                Sua Representação
              </span>
              <p className="font-serif text-base font-bold text-white">
                {name.trim() || 'Seu Avatar'}
              </p>
              <p className="text-xs text-[#B3B3B3]">
                {HAIR_LENGTH_OPTIONS.find((l) => l.id === hairLength)?.name} •{' '}
                {SKIN_TONE_OPTIONS.find((s) => s.id === skinTone)?.name}
                {hairLength !== 'careca' &&
                  ` • ${HAIR_TEXTURE_OPTIONS.find((t) => t.id === hairTexture)?.name}`}
              </p>
              {hairLength === 'careca' && (
                <p className="text-[10px] text-amber-300 italic">
                  ✨ Sem cabelo para cuidar — seu brilho vem de dentro e da pele protegida
                </p>
              )}
            </div>
          </div>
          {/* 0. Comprimento e Corte (Careca, Curto, etc) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-white flex items-center gap-1.5">
                <Ruler className="w-4 h-4 text-[#D4AF37]" />
                <span>Comprimento & Corte</span> <span className="text-[#D4AF37]">*</span>
              </label>
              <span className="text-xs text-[#A0A0A0]">Inclusivo para todas as identidades</span>
            </div>

            <div
              className="grid grid-cols-1 sm:grid-cols-2 gap-2"
              role="radiogroup"
              aria-label="Seleção do comprimento de cabelo"
            >
              {HAIR_LENGTH_OPTIONS.map((len) => {
                const isSelected = hairLength === len.id
                return (
                  <button
                    key={len.id}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => setHairLength(len.id)}
                    className={`min-h-[48px] p-2.5 rounded-xl border text-left flex items-center justify-between gap-2 transition-all ${
                      isSelected
                        ? 'border-[#D4AF37] bg-[#D4AF37]/15 ring-2 ring-[#D4AF37]'
                        : 'border-white/10 bg-[#1A1A1A] hover:bg-white/5'
                    }`}
                  >
                    <div>
                      <p
                        className={`text-xs font-bold ${isSelected ? 'text-[#F1E5C8]' : 'text-white'}`}
                      >
                        {len.name}
                      </p>
                      <p className="text-[10px] text-[#A0A0A0] line-clamp-1">{len.desc}</p>
                    </div>
                    {isSelected && (
                      <span className="w-4 h-4 rounded-full bg-[#D4AF37] text-black flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
          {/* 1. Escolha de Tom de Pele */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-white flex items-center gap-1.5">
                <Palette className="w-4 h-4 text-[#D4AF37]" />
                <span>Tom de Pele</span> <span className="text-[#D4AF37]">*</span>
              </label>
              <span className="text-xs text-[#A0A0A0]">
                {SKIN_TONE_OPTIONS.length} tons realistas
              </span>
            </div>

            <div
              className="grid grid-cols-3 gap-2"
              role="radiogroup"
              aria-label="Seleção do tom de pele"
            >
              {SKIN_TONE_OPTIONS.map((st) => {
                const isSelected = skinTone === st.id
                return (
                  <button
                    key={st.id}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => setSkinTone(st.id)}
                    className={`min-h-[46px] p-2 rounded-xl border flex items-center gap-2 transition-all ${
                      isSelected
                        ? 'border-[#D4AF37] bg-[#D4AF37]/15 ring-2 ring-[#D4AF37]'
                        : 'border-white/10 bg-[#1A1A1A] hover:bg-white/5'
                    }`}
                  >
                    <span
                      className="w-5 h-5 rounded-full shrink-0 border border-white/20 shadow-inner flex items-center justify-center"
                      style={{ backgroundColor: st.hex }}
                    >
                      {isSelected && <Check className="w-3 h-3 text-black stroke-[3]" />}
                    </span>
                    <span className="text-[11px] font-semibold text-white truncate">
                      {st.name.replace('Pele ', '')}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
          {/* 2. Textura do Cabelo */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-white flex items-center gap-1.5">
                <Scissors className="w-4 h-4 text-[#D4AF37]" />
                <span>Textura & Curvatura</span> <span className="text-[#D4AF37]">*</span>
              </label>
              <span className="text-xs text-[#A0A0A0]">4 tipos</span>
            </div>

            <div
              className="grid grid-cols-2 gap-2"
              role="radiogroup"
              aria-label="Seleção da textura do cabelo"
            >
              {HAIR_TEXTURE_OPTIONS.map((tex) => {
                const isSelected = hairTexture === tex.id
                return (
                  <button
                    key={tex.id}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => setHairTexture(tex.id)}
                    className={`min-h-[48px] p-2.5 rounded-xl border text-left flex items-center justify-between gap-2 transition-all ${
                      isSelected
                        ? 'border-[#D4AF37] bg-[#D4AF37]/15 ring-2 ring-[#D4AF37]'
                        : 'border-white/10 bg-[#1A1A1A] hover:bg-white/5'
                    }`}
                  >
                    <div>
                      <p
                        className={`text-xs font-bold ${isSelected ? 'text-[#F1E5C8]' : 'text-white'}`}
                      >
                        {tex.name}
                      </p>
                      <p className="text-[10px] text-[#A0A0A0] line-clamp-1">{tex.desc}</p>
                    </div>
                    {isSelected && (
                      <span className="w-4 h-4 rounded-full bg-[#D4AF37] text-black flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
          {/* 3. Seleção de Cor/Estilo de Avatar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-white">
                Cor & Base dos Fios <span className="text-[#D4AF37]">*</span>
              </label>
              <span className="text-xs text-[#B3B3B3]">6 opções de salão e nuances</span>
            </div>

            <div
              className="grid grid-cols-2 gap-2.5"
              role="radiogroup"
              aria-label="Seleção de estilo de cabelo e avatar"
            >
              {AVATAR_OPTIONS.map((opt) => {
                const isSelected = avatarId === opt.id
                return (
                  <button
                    key={opt.id}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => {
                      setAvatarId(opt.id)
                      if (error && name.trim()) setError(null)
                    }}
                    className={`relative p-2.5 rounded-xl border text-left flex flex-col items-center gap-1.5 transition-all min-h-[96px] ${
                      isSelected
                        ? 'border-[#D4AF37] bg-[#D4AF37]/15 ring-2 ring-[#D4AF37] shadow-[0_0_14px_rgba(212,175,55,0.25)]'
                        : 'border-white/10 bg-[#1A1A1A] hover:bg-white/5 hover:border-white/25'
                    }`}
                  >
                    <div className="relative">
                      <AvatarSvg
                        id={opt.id}
                        skinTone={skinTone}
                        hairTexture={hairTexture}
                        hairLength={hairLength}
                        className="w-12 h-12 rounded-full"
                      />
                      {isSelected && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#D4AF37] text-black flex items-center justify-center shadow-md">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </span>
                      )}
                    </div>
                    <div className="text-center w-full">
                      <p
                        className={`text-xs font-semibold ${isSelected ? 'text-[#F1E5C8]' : 'text-white'}`}
                      >
                        {opt.label}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>{' '}
        </div>

        {/* Botão de Ação */}
        <div className="pt-4 space-y-3">
          <button
            type="submit"
            disabled={!isValid}
            className={`w-full min-h-[52px] px-6 py-3.5 rounded-2xl font-bold text-base transition-all flex items-center justify-center gap-2 ${
              isValid
                ? 'bg-[#D4AF37] text-[#0D0D0D] hover:bg-[#B8962E] shadow-[0_4px_20px_rgba(212,175,55,0.35)] active:scale-[0.98] cursor-pointer'
                : 'bg-white/10 text-white/40 cursor-not-allowed border border-white/5'
            }`}
          >
            <span>Começar jornada</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <p className="text-[11px] text-center text-[#888888]">
            Seus dados são salvos com segurança apenas no seu navegador.
          </p>
        </div>
      </form>
    </div>
  )
}

export default JourneyPage
