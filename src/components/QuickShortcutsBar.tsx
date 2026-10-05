import React, { useState } from 'react'
import type { QuickShortcutId } from '@/types/game'
import {
  Sparkles,
  Wind,
  BookOpen,
  Mail,
  Gift,
  Target,
  Image,
  Award,
  User,
  SlidersHorizontal,
  Check,
  X,
  Plus,
} from 'lucide-react'

export interface ShortcutDefinition {
  id: QuickShortcutId
  label: string
  shortLabel: string
  icon: React.ReactNode
  description: string
}

export const ALL_SHORTCUTS: ShortcutDefinition[] = [
  {
    id: 'spa',
    label: 'Spa da Semana',
    shortLabel: 'Spa',
    icon: <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />,
    description: 'Ritual profundo dominical de renovação e tratamento capilar.',
  },
  {
    id: 'respirar',
    label: 'Respiração',
    shortLabel: 'Respirar',
    icon: <Wind className="w-3.5 h-3.5 text-[#81D4FA]" />,
    description: 'Exercício guiado 4-4-4 para foco e desacelerar.',
  },
  {
    id: 'diario',
    label: 'Diário',
    shortLabel: 'Diário',
    icon: <BookOpen className="w-3.5 h-3.5 text-[#CE93D8]" />,
    description: 'Reflexões e notas de autocuidado com registro de intenção.',
  },
  {
    id: 'estante',
    label: 'Estante de Cartas',
    shortLabel: 'Estante',
    icon: <Mail className="w-3.5 h-3.5 text-[#FFD54F]" />,
    description: 'Cartas afetivas e coleção de cards desbloqueados.',
  },
  {
    id: 'presente',
    label: 'Modo Presente',
    shortLabel: 'Presente',
    icon: <Gift className="w-3.5 h-3.5 text-[#FF8A80]" />,
    description: 'Envie um card de carinho e incentivo para alguém especial.',
  },
  {
    id: 'missoes',
    label: 'Missões',
    shortLabel: 'Missões',
    icon: <Target className="w-3.5 h-3.5 text-[#A5D6A7]" />,
    description: 'Passo a passo com cronômetro, áudio e modo foco.',
  },
  {
    id: 'mural',
    label: 'Mural de Intenções',
    shortLabel: 'Mural',
    icon: <Sparkles className="w-3.5 h-3.5 text-[#FFE082]" />,
    description: 'Foco da semana com reflexão guiada de salão.',
  },
  {
    id: 'album',
    label: 'Álbum',
    shortLabel: 'Álbum',
    icon: <Image className="w-3.5 h-3.5 text-[#80CBC4]" />,
    description: 'Seus cards gerados e lembranças de celebração.',
  },
  {
    id: 'acessorios',
    label: 'Acessórios & Looks',
    shortLabel: 'Looks',
    icon: <Award className="w-3.5 h-3.5 text-[#D4AF37]" />,
    description: 'Cofrinho de looks, jóias e presilhas douradas.',
  },
  {
    id: 'avatar',
    label: 'Editor de Avatar',
    shortLabel: 'Avatar',
    icon: <User className="w-3.5 h-3.5 text-[#D4AF37]" />,
    description: 'Comprimento, textura, tom de pele e nuances.',
  },
]

export const DEFAULT_SHORTCUTS: QuickShortcutId[] = ['spa', 'respirar', 'diario', 'presente']

interface QuickShortcutsBarProps {
  currentShortcuts?: QuickShortcutId[]
  onSelectShortcut: (id: QuickShortcutId) => void
  onSaveShortcuts: (shortcuts: QuickShortcutId[]) => void
}

export const QuickShortcutsBar: React.FC<QuickShortcutsBarProps> = ({
  currentShortcuts,
  onSelectShortcut,
  onSaveShortcuts,
}) => {
  const activeIds: QuickShortcutId[] =
    currentShortcuts && currentShortcuts.length > 0 ? currentShortcuts : DEFAULT_SHORTCUTS

  const [isEditing, setIsEditing] = useState(false)
  const [draftIds, setDraftIds] = useState<QuickShortcutId[]>(activeIds)

  const handleOpenEdit = () => {
    setDraftIds(activeIds)
    setIsEditing(true)
  }

  const handleToggleShortcut = (id: QuickShortcutId) => {
    if (draftIds.includes(id)) {
      if (draftIds.length <= 2) {
        // Mantém pelo menos 2 atalhos
        return
      }
      setDraftIds(draftIds.filter((item) => item !== id))
    } else {
      if (draftIds.length >= 4) {
        // Máximo 4 atalhos na barra superior
        return
      }
      setDraftIds([...draftIds, id])
    }
  }

  const handleSave = () => {
    onSaveShortcuts(draftIds)
    setIsEditing(false)
  }

  const activeDefinitions = activeIds
    .map((id) => ALL_SHORTCUTS.find((s) => s.id === id))
    .filter(Boolean) as ShortcutDefinition[]

  return (
    <div className="space-y-2">
      {/* Barra de atalhos rápidos */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto py-1 px-0.5 custom-scrollbar">
        <div className="flex items-center gap-1.5 flex-wrap">
          {activeDefinitions.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectShortcut(item.id)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/10 bg-[#161616] hover:bg-[#202020] hover:border-[#D4AF37]/40 text-xs font-semibold text-white transition-all shadow-sm active:scale-95 shrink-0"
              title={item.description}
            >
              {item.icon}
              <span>{item.shortLabel}</span>
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={handleOpenEdit}
          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-dashed border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37]/10 text-[11px] font-semibold transition-all shrink-0"
          title="Personalizar atalhos do topo"
        >
          <SlidersHorizontal className="w-3 h-3" />
          <span className="hidden sm:inline">Editar atalhos</span>
        </button>
      </div>

      {/* Modal / Sheet simples de configuração dos atalhos */}
      {isEditing && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="shortcuts-config-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in"
          onClick={() => setIsEditing(false)}
        >
          <div
            className="w-full max-w-sm rounded-3xl border border-[#D4AF37] bg-[#141414] p-5 text-white shadow-[0_0_35px_rgba(212,175,55,0.3)] space-y-4 animate-scale-in relative text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              aria-label="Fechar edição de atalhos"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-1">
              <span className="text-[10px] font-mono text-[#D4AF37] uppercase font-bold tracking-wider">
                Personalização da Home
              </span>
              <h3 id="shortcuts-config-title" className="font-serif text-lg font-bold text-white">
                Escolha seus Atalhos Rápidos
              </h3>
              <p className="text-xs text-[#B3B3B3]">
                Selecione de 2 a 4 recursos que você mais usa para ficarem no topo da sua tela
                inicial.
              </p>
            </div>

            <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-[11px] text-[#F1E5C8] flex items-center justify-between">
              <span>Selecionados:</span>
              <strong className="font-mono text-[#D4AF37]">
                {draftIds.length} de 4 (mínimo 2)
              </strong>
            </div>

            <div className="max-h-64 overflow-y-auto space-y-1.5 custom-scrollbar pr-1">
              {ALL_SHORTCUTS.map((item) => {
                const isSelected = draftIds.includes(item.id)
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleToggleShortcut(item.id)}
                    className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between gap-2.5 transition-all ${
                      isSelected
                        ? 'border-[#D4AF37] bg-[#D4AF37]/15'
                        : 'border-white/10 bg-[#1A1A1A] hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-7 h-7 rounded-lg bg-black/40 flex items-center justify-center shrink-0 border border-white/10">
                        {item.icon}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-white truncate">{item.label}</p>
                        <p className="text-[10px] text-[#A0A0A0] truncate">{item.description}</p>
                      </div>
                    </div>

                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 border transition-all ${
                        isSelected
                          ? 'bg-[#D4AF37] border-[#D4AF37] text-black'
                          : 'border-white/30 bg-transparent text-transparent'
                      }`}
                    >
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  </button>
                )
              })}
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="flex-1 py-2.5 rounded-xl border border-white/20 text-xs font-semibold text-white/80 hover:text-white hover:bg-white/5 transition-all"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="flex-1 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#B8962E] text-black text-xs font-bold transition-all shadow-md active:scale-95"
              >
                Salvar Atalhos
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
