import React from 'react'
import type { DiaryNote } from '@/types/game'

interface DiaryPrintLayoutProps {
  userName: string
  notes: DiaryNote[]
  streakDays: number
  totalMinutes: number
  points: number
}

export const DiaryPrintLayout: React.FC<DiaryPrintLayoutProps> = ({
  userName,
  notes,
  streakDays,
  totalMinutes,
  points,
}) => {
  const currentDate = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date())

  return (
    <div className="print-only font-sans bg-white text-black p-4 max-w-full">
      {/* Moldura A5 Clássica Preto e Ouro */}
      <div className="border-2 border-[#1A1A1A] p-5 rounded-2xl relative min-h-[92vh] flex flex-col justify-between">
        {/* Borda dourada interna estilizada */}
        <div className="border border-[#D4AF37] p-5 rounded-xl flex-1 flex flex-col justify-between">
          <div>
            {/* Cabeçalho */}
            <div className="border-b-2 border-[#1A1A1A] pb-4 mb-4 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-serif text-2xl font-black tracking-wider text-[#0D0D0D]">
                    TRESemmé
                  </span>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-[#D4AF37] text-black tracking-widest border border-black">
                    PLAY
                  </span>
                </div>
                <h1 className="font-serif text-xl font-bold text-[#0D0D0D] mt-1">
                  Diário de Autocuidado
                </h1>
                <p className="text-xs text-[#555555]">
                  Jornada de bem-estar capilar de{' '}
                  <strong className="text-black">{userName || 'Participante'}</strong>
                </p>
              </div>

              <div className="text-right text-[11px] text-[#666666]">
                <p className="font-semibold text-black">Formato Papel A5</p>
                <p>{currentDate}</p>
              </div>
            </div>

            {/* Badges de Resumo em preto e dourado */}
            <div className="grid grid-cols-3 gap-3 mb-5">
              <div className="border border-[#1A1A1A] bg-[#FAFAFA] rounded-lg p-2.5 text-center">
                <span className="text-[9px] uppercase font-bold text-[#666666] tracking-wider block">
                  Reflexões
                </span>
                <span className="font-serif text-lg font-black text-black">
                  {notes.length} notas
                </span>
              </div>

              <div className="border border-[#1A1A1A] bg-[#FAFAFA] rounded-lg p-2.5 text-center">
                <span className="text-[9px] uppercase font-bold text-[#666666] tracking-wider block">
                  Sequência
                </span>
                <span className="font-serif text-lg font-black text-[#8A6E1E]">
                  {streakDays} {streakDays === 1 ? 'dia' : 'dias'}
                </span>
              </div>

              <div className="border border-[#1A1A1A] bg-[#FAFAFA] rounded-lg p-2.5 text-center">
                <span className="text-[9px] uppercase font-bold text-[#666666] tracking-wider block">
                  Tempo Dedicado
                </span>
                <span className="font-serif text-lg font-black text-black">{totalMinutes} min</span>
              </div>
            </div>

            {/* Lista de Notas de Reflexão */}
            <div className="space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#333333] border-b border-[#CCCCCC] pb-1">
                Reflexões Registradas
              </h2>

              {notes.length === 0 ? (
                <p className="text-xs italic text-[#777777] py-4 text-center">
                  Nenhuma reflexão registrada ainda.
                </p>
              ) : (
                notes.map((note, index) => (
                  <div
                    key={note.id || index}
                    className="border border-[#CCCCCC] rounded-lg p-3 bg-white print-page-a5"
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-[#0D0D0D] border-b border-[#EEEEEE] pb-1 mb-1.5">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#D4AF37] inline-block" />
                        <span className="font-serif font-bold text-sm text-black">
                          {note.missionTitle}
                        </span>
                      </div>
                      <span className="text-[10px] font-normal text-[#666666]">
                        {note.completedAt || 'Hoje'}
                      </span>
                    </div>
                    <p className="text-xs text-[#222222] italic leading-relaxed">
                      "{note.noteText}"
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Rodapé impresso */}
          <div className="border-t border-[#D4AF37] pt-3 mt-6 flex items-center justify-between text-[9px] text-[#666666]">
            <div>
              <strong className="text-black">TRESemmé Play</strong> • Autocuidado Gamificado para o
              Dia a Dia
            </div>
            <div>Impresso a partir do dispositivo móvel • Registro pessoal</div>
          </div>
        </div>
      </div>
    </div>
  )
}
