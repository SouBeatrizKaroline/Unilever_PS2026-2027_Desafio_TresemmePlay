import React, { useEffect, useRef } from 'react'
import { useGame } from '@/context/GameContext'
import type { TextSize, ThemeMode, SoundAmbientType } from '@/types/game'
import { SOUND_OPTIONS } from '@/lib/ambientSound'
import {
  X,
  Type,
  Eye,
  Check,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  CloudRain,
  Waves,
  Bell,
  Play,
  Pause,
  Sparkles,
} from 'lucide-react'

export const AccessibilitySheet: React.FC = () => {
  const {
    journey,
    theme,
    setTextSize,
    setReducedMotion,
    setTheme,
    isAccessibilityOpen,
    setAccessibilityOpen,
    isAmbientPlaying,
    toggleAmbientSound,
    setAmbientSoundType,
    stopAmbientSound,
    startTour,
  } = useGame()

  const sheetRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  // Escape to close & focus trap basics
  useEffect(() => {
    if (!isAccessibilityOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        setAccessibilityOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    closeButtonRef.current?.focus()

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isAccessibilityOpen, setAccessibilityOpen])

  if (!isAccessibilityOpen) return null

  const fontOptions: { id: TextSize; label: string; desc: string; sizeClass: string }[] = [
    { id: 'sm', label: 'A', desc: '14px (Compacto)', sizeClass: 'text-sm' },
    { id: 'md', label: 'A+', desc: '16px (Padrão)', sizeClass: 'text-base font-medium' },
    { id: 'lg', label: 'A++', desc: '18px (Grande)', sizeClass: 'text-lg font-bold' },
  ]

  const themeOptions: { id: ThemeMode; label: string; desc: string; icon: React.ReactNode }[] = [
    {
      id: 'dark',
      label: 'Modo escuro',
      desc: 'Clássico preto & dourado',
      icon: <Moon className="w-4 h-4" />,
    },
    {
      id: 'light',
      label: 'Modo claro',
      desc: 'Fundo claro & alto contraste',
      icon: <Sun className="w-4 h-4" />,
    },
  ]

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="a11y-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={() => setAccessibilityOpen(false)}
    >
      <div
        ref={sheetRef}
        role="document"
        className="w-full max-w-[480px] sm:max-w-[540px] rounded-t-3xl sm:rounded-3xl border border-[#D4AF37]/30 bg-[#141414] p-6 text-white shadow-2xl animate-slide-up max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header da Gaveta */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37]">
              <span className="font-serif font-bold text-base">Aa</span>
            </div>
            <div>
              <h2 id="a11y-title" className="font-serif text-lg font-bold text-white">
                Acessibilidade
              </h2>
              <p className="text-xs text-[#B3B3B3]">Ajuste a visualização ao seu conforto</p>
            </div>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={() => setAccessibilityOpen(false)}
            className="w-11 h-11 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-colors"
            aria-label="Fechar painel de acessibilidade"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Conteúdo */}
        <div className="py-5 space-y-6">
          {/* Tema Visual (Modo Escuro / Modo Claro) */}
          <section aria-labelledby="theme-mode-heading">
            <div className="flex items-center gap-2 mb-2">
              <Sun className="w-4 h-4 text-[#D4AF37]" />
              <h3 id="theme-mode-heading" className="text-sm font-semibold text-white">
                Tema de visualização
              </h3>
            </div>
            <p className="text-xs text-[#B3B3B3] mb-3">
              Alterne entre o visual noturno de salão e o modo claro com alto contraste.
            </p>

            <div
              className="grid grid-cols-2 gap-2.5"
              role="group"
              aria-label="Seletor de tema claro ou escuro"
            >
              {themeOptions.map((opt) => {
                const isActive = theme === opt.id
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setTheme(opt.id)}
                    aria-pressed={isActive}
                    className={`min-h-[54px] px-3.5 py-2.5 rounded-xl border flex items-center gap-2.5 transition-all text-left ${
                      isActive
                        ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.25)] ring-1 ring-[#D4AF37]'
                        : 'border-white/10 bg-[#1C1C1C] text-white/80 hover:bg-white/5 hover:border-white/20'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                        isActive ? 'bg-[#D4AF37] text-[#0D0D0D]' : 'bg-white/10 text-white/70'
                      }`}
                    >
                      {opt.icon}
                    </div>
                    <div className="leading-tight">
                      <span className="text-xs font-semibold block">{opt.label}</span>
                      <span className="text-[10px] opacity-75">{opt.desc}</span>
                    </div>
                  </button>
                )
              })}
            </div>
          </section>

          {/* Tamanho do Texto */}
          <section aria-labelledby="text-size-heading" className="pt-2 border-t border-white/5">
            <div className="flex items-center gap-2 mb-2">
              <Type className="w-4 h-4 text-[#D4AF37]" />
              <h3 id="text-size-heading" className="text-sm font-semibold text-white">
                Tamanho do texto
              </h3>
            </div>
            <p className="text-xs text-[#B3B3B3] mb-3">
              Altere a escala tipográfica para facilitar a leitura.
            </p>

            <div
              className="grid grid-cols-3 gap-2.5"
              role="group"
              aria-label="Seletor de tamanho de texto"
            >
              {fontOptions.map((opt) => {
                const isActive = journey.textSize === opt.id
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setTextSize(opt.id)}
                    aria-pressed={isActive}
                    className={`min-h-[52px] px-3 py-2.5 rounded-xl border flex flex-col items-center justify-center transition-all ${
                      isActive
                        ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.25)]'
                        : 'border-white/10 bg-[#1C1C1C] text-white/80 hover:bg-white/5 hover:border-white/20'
                    }`}
                  >
                    <span className={`${opt.sizeClass} leading-tight`}>{opt.label}</span>
                    <span className="text-[10px] opacity-75 mt-0.5">{opt.desc}</span>
                  </button>
                )
              })}
            </div>
          </section>

          {/* Passeio Guiado / Tour do App */}
          <section aria-labelledby="tour-heading" className="pt-2 border-t border-white/5">
            <div className="flex items-center justify-between">
              <div className="pr-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  <h3 id="tour-heading" className="text-sm font-semibold text-white">
                    Passeio guiado pelo app
                  </h3>
                </div>
                <p className="text-xs text-[#B3B3B3] mt-1">
                  Reveja o guia passo a passo com os destaques de rituais, cofrinho e bem-estar.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setAccessibilityOpen(false)
                  startTour()
                }}
                className="min-h-[40px] px-3.5 py-1.5 rounded-xl border border-[#D4AF37]/50 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 text-[#F1E5C8] font-bold text-xs transition-colors shrink-0 flex items-center gap-1.5 active:scale-95 cursor-pointer"
              >
                <span>Rever Tour</span>
              </button>
            </div>
          </section>

          {/* Reduzir Animações */}
          <section aria-labelledby="motion-heading" className="pt-2 border-t border-white/5">
            {' '}
            <div className="flex items-center justify-between">
              <div className="pr-3">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-[#D4AF37]" />
                  <h3 id="motion-heading" className="text-sm font-semibold text-white">
                    Reduzir animações
                  </h3>
                </div>
                <p className="text-xs text-[#B3B3B3] mt-1">
                  Desativa transições dinâmicas para evitar sensibilidade ao movimento.
                </p>
              </div>

              <button
                type="button"
                role="switch"
                aria-checked={journey.reducedMotion}
                onClick={() => setReducedMotion(!journey.reducedMotion)}
                className={`relative inline-flex h-8 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2 focus:ring-offset-[#141414] ${
                  journey.reducedMotion ? 'bg-[#D4AF37]' : 'bg-white/20'
                }`}
                aria-label="Ativar redução de animações"
              >
                <span
                  className={`pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                    journey.reducedMotion ? 'translate-x-6 bg-[#0D0D0D]' : 'translate-x-0'
                  } flex items-center justify-center`}
                >
                  {journey.reducedMotion && <Check className="w-3.5 h-3.5 text-[#D4AF37]" />}
                </span>
              </button>
            </div>
          </section>

          {/* Sons Ambiente Opcionais (100% sintetizados via Web Audio API, desligados por padrão) */}
          <section aria-labelledby="sound-heading" className="pt-2 border-t border-white/5">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {isAmbientPlaying ? (
                  <Volume2 className="w-4 h-4 text-[#D4AF37]" />
                ) : (
                  <VolumeX className="w-4 h-4 text-[#B3B3B3]" />
                )}
                <div>
                  <h3 id="sound-heading" className="text-sm font-semibold text-white">
                    Sons ambiente relaxantes
                  </h3>
                  <span className="text-[10px] text-[#D4AF37] font-mono">
                    Desligados por padrão • Sem download
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => toggleAmbientSound()}
                className={`min-h-[44px] px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm ${
                  isAmbientPlaying
                    ? 'bg-[#D4AF37] text-black shadow-[0_0_12px_rgba(212,175,55,0.4)]'
                    : 'bg-white/10 hover:bg-white/15 text-white/90 border border-white/15'
                }`}
                aria-pressed={isAmbientPlaying}
                title={isAmbientPlaying ? 'Pausar som ambiente' : 'Ouvir som ambiente'}
              >
                {isAmbientPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5 fill-current" />
                    <span>Pausar</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Ouvir</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-xs text-[#B3B3B3] mb-3">
              Áudio gerado em tempo real no seu navegador para manter a mente serena durante o
              autocuidado.
            </p>

            {/* Opções de ambiente sonoro */}
            <div className="space-y-2" role="group" aria-label="Opções de sons ambiente relaxantes">
              {SOUND_OPTIONS.map((opt) => {
                const isSelected = (journey.selectedAmbientSound || 'chuva-suave') === opt.id
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      setAmbientSoundType(opt.id as SoundAmbientType)
                      if (!isAmbientPlaying) {
                        toggleAmbientSound(opt.id as SoundAmbientType)
                      }
                    }}
                    className={`w-full rounded-xl border p-2.5 text-left flex items-center justify-between gap-2.5 transition-all min-h-[50px] ${
                      isSelected && isAmbientPlaying
                        ? 'border-[#D4AF37] bg-[#D4AF37]/15 ring-1 ring-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.2)]'
                        : isSelected
                          ? 'border-[#D4AF37]/60 bg-[#1C1C1C] text-white'
                          : 'border-white/10 bg-[#1C1C1C] text-white/70 hover:bg-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                          isSelected && isAmbientPlaying
                            ? 'bg-[#D4AF37] text-black'
                            : 'bg-white/10 text-[#D4AF37]'
                        }`}
                      >
                        {opt.iconName === 'rain' && <CloudRain className="w-4 h-4" />}
                        {opt.iconName === 'waves' && <Waves className="w-4 h-4" />}
                        {opt.iconName === 'bell' && <Bell className="w-4 h-4" />}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`text-xs font-bold block ${
                              isSelected && isAmbientPlaying ? 'text-[#D4AF37]' : 'text-white'
                            }`}
                          >
                            {opt.name}
                          </span>
                          {isSelected && isAmbientPlaying && (
                            <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#D4AF37] text-black font-extrabold animate-pulse">
                              TOCANDO
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-[#A0A0A0] block truncate">
                          {opt.description}
                        </span>
                      </div>
                    </div>

                    <div className="shrink-0">
                      {isSelected && isAmbientPlaying ? (
                        <div className="flex items-center gap-0.5">
                          <span
                            className={`w-1 h-3 bg-[#D4AF37] rounded-full ${journey.reducedMotion ? '' : 'animate-bounce'}`}
                          />
                          <span
                            className={`w-1 h-4 bg-[#D4AF37] rounded-full ${journey.reducedMotion ? '' : 'animate-bounce delay-100'}`}
                          />
                          <span
                            className={`w-1 h-2 bg-[#D4AF37] rounded-full ${journey.reducedMotion ? '' : 'animate-bounce delay-200'}`}
                          />
                        </div>
                      ) : (
                        <span className="text-[11px] font-semibold text-[#D4AF37]">
                          {isSelected ? 'Selecionado' : 'Escolher'}
                        </span>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </section>
        </div>

        {/* Botão Fechar Inferior */}
        <div className="pt-3">
          <button
            type="button"
            onClick={() => setAccessibilityOpen(false)}
            className="w-full min-h-[48px] rounded-xl bg-[#D4AF37] text-[#0D0D0D] font-semibold text-sm hover:bg-[#B8962E] transition-all flex items-center justify-center active:scale-[0.99]"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  )
}
