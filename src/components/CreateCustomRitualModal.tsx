import React, { useState } from 'react'
import { Plus, Trash2, Sparkles, X, Check, HelpCircle } from 'lucide-react'
import type { CustomStep } from '@/types/game'

interface CreateCustomRitualModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (title: string, description: string, steps: CustomStep[]) => void
}

export const CreateCustomRitualModal: React.FC<CreateCustomRitualModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [steps, setSteps] = useState<{ title: string; instruction: string; tip: string }[]>([
    {
      title: 'Etapa 1: Preparação',
      instruction: 'Desembarace os fios suavemente das pontas até a raiz.',
      tip: 'Use os dedos ou um pente de dentes largos com delicadeza.',
    },
    {
      title: 'Etapa 2: Cuidado Principal',
      instruction: 'Aplique o produto ou realize o movimento desejado mecha a mecha.',
      tip: 'Sinta a textura e desfrute do momento de autocuidado.',
    },
  ])
  const [error, setError] = useState<string | null>(null)

  if (!isOpen) return null

  const handleAddStep = () => {
    if (steps.length >= 6) {
      setError('Máximo de 6 etapas por ritual para manter a experiência leve.')
      return
    }
    setError(null)
    setSteps((prev) => [
      ...prev,
      {
        title: `Etapa ${prev.length + 1}: Finalização`,
        instruction: 'Descreva a ação desta etapa com suas palavras.',
        tip: 'Uma dica rápida de estilo ou sensação relaxante.',
      },
    ])
  }

  const handleRemoveStep = (index: number) => {
    if (steps.length <= 1) {
      setError('O ritual precisa ter pelo menos 1 etapa.')
      return
    }
    setError(null)
    setSteps((prev) => prev.filter((_, i) => i !== index))
  }

  const handleStepChange = (
    index: number,
    field: 'title' | 'instruction' | 'tip',
    value: string,
  ) => {
    setSteps((prev) => {
      const next = [...prev]
      next[index] = { ...next[index], [field]: value }
      return next
    })
    if (error) setError(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedTitle = title.trim()
    if (!trimmedTitle) {
      setError('Dê um nome ao seu ritual.')
      return
    }

    // Valida que ao menos uma etapa tem instrução
    const hasEmptySteps = steps.some((s) => !s.title.trim() || !s.instruction.trim())
    if (hasEmptySteps) {
      setError('Preencha o título e a instrução de todas as etapas.')
      return
    }

    const formattedSteps: CustomStep[] = steps.map((s, idx) => ({
      id: `step-${idx + 1}`,
      title: s.title.trim(),
      instruction: s.instruction.trim(),
      tip: s.tip.trim() || 'Respire fundo e cuide de você.',
    }))

    onSave(trimmedTitle, description.trim(), formattedSteps)
    onClose()
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="create-ritual-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md max-h-[90vh] rounded-3xl border border-[#D4AF37] bg-[#141414] p-5 text-left text-white shadow-[0_0_35px_rgba(212,175,55,0.3)] flex flex-col space-y-4 animate-scale-in relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Luz dourada de fundo */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Topo com botão fechar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 id="create-ritual-title" className="font-serif text-base font-bold text-white">
                Criar Ritual Personalizado
              </h2>
              <p className="text-[11px] text-[#A0A0A0]">
                Crie um ritual com seus próprios passos e pontuação
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors"
            aria-label="Fechar criador de ritual"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Conteúdo com scroll */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto space-y-4 pr-1 custom-scrollbar"
        >
          {error && (
            <div className="p-2.5 rounded-xl bg-[#E57373]/20 border border-[#E57373]/40 text-xs text-[#E57373]">
              {error}
            </div>
          )}

          {/* Nome do Ritual */}
          <div className="space-y-1.5">
            <label htmlFor="ritual-title" className="text-xs font-semibold text-[#F1E5C8] block">
              Nome do Ritual <span className="text-[#D4AF37]">*</span>
            </label>
            <input
              id="ritual-title"
              type="text"
              placeholder="Ex.: Fitagem dos Meus Cachos, Revitalização Noturna..."
              value={title}
              onChange={(e) => setTitle(e.target.value.slice(0, 40))}
              maxLength={40}
              className="w-full text-xs p-3 rounded-xl bg-[#1F1F1F] text-white border border-white/15 placeholder-white/30 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
            />
          </div>

          {/* Descrição Curta */}
          <div className="space-y-1.5">
            <label htmlFor="ritual-desc" className="text-xs font-semibold text-white/80 block">
              Descrição (opcional)
            </label>
            <input
              id="ritual-desc"
              type="text"
              placeholder="Ex.: Meu momento favorito para relaxar os fios depois do banho."
              value={description}
              onChange={(e) => setDescription(e.target.value.slice(0, 90))}
              maxLength={90}
              className="w-full text-xs p-2.5 rounded-xl bg-[#1F1F1F] text-white border border-white/10 placeholder-white/30 focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          {/* Lista de Etapas */}
          <div className="space-y-3 pt-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#F1E5C8] flex items-center gap-1.5">
                <span>Etapas do Ritual</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37]">
                  {steps.length} {steps.length === 1 ? 'etapa' : 'etapas'} (+{steps.length * 10}{' '}
                  pts)
                </span>
              </span>

              <button
                type="button"
                onClick={handleAddStep}
                disabled={steps.length >= 6}
                className="text-xs font-bold text-[#D4AF37] hover:underline flex items-center gap-1 disabled:opacity-40"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Adicionar etapa</span>
              </button>
            </div>

            <div className="space-y-3">
              {steps.map((st, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/10 bg-[#1A1A1A] p-3 space-y-2 relative"
                >
                  <div className="flex items-center justify-between">
                    <span className="w-6 h-6 rounded-full bg-[#D4AF37] text-black font-bold text-xs flex items-center justify-center">
                      {idx + 1}
                    </span>

                    {steps.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveStep(idx)}
                        className="text-white/40 hover:text-[#E57373] p-1 rounded-lg transition-colors"
                        title="Remover etapa"
                        aria-label={`Remover etapa ${idx + 1}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <input
                    type="text"
                    placeholder={`Título da etapa ${idx + 1}`}
                    value={st.title}
                    onChange={(e) => handleStepChange(idx, 'title', e.target.value.slice(0, 35))}
                    maxLength={35}
                    className="w-full text-xs p-2 rounded-lg bg-[#222222] text-white font-semibold border border-white/10 focus:outline-none focus:border-[#D4AF37]"
                  />

                  <textarea
                    rows={2}
                    placeholder="O que fazer nesta etapa? (instrução clara e curta)"
                    value={st.instruction}
                    onChange={(e) =>
                      handleStepChange(idx, 'instruction', e.target.value.slice(0, 140))
                    }
                    maxLength={140}
                    className="w-full text-xs p-2 rounded-lg bg-[#222222] text-white border border-white/10 placeholder-white/30 focus:outline-none focus:border-[#D4AF37] resize-none"
                  />

                  <input
                    type="text"
                    placeholder="Dica ou lembrete sutil (opcional)"
                    value={st.tip}
                    onChange={(e) => handleStepChange(idx, 'tip', e.target.value.slice(0, 80))}
                    maxLength={80}
                    className="w-full text-[11px] p-2 rounded-lg bg-[#181818] text-[#B3B3B3] border border-white/5 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              ))}
            </div>
          </div>

          <p className="text-[11px] text-[#A0A0A0] leading-relaxed pt-1">
            Cada etapa do seu ritual vale +10 pontos ao ser concluída, fica salva no seu aparelho e
            pode ser praticada sempre que quiser.
          </p>

          {/* Botões de Ação do formulário */}
          <div className="pt-2 flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 min-h-[44px] rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white font-semibold text-xs transition-colors"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="flex-[1.4] min-h-[44px] rounded-xl bg-[#D4AF37] hover:bg-[#B8962E] text-black font-bold text-xs transition-all shadow-md active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Check className="w-4 h-4 stroke-[2.5]" />
              <span>Salvar Ritual</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
