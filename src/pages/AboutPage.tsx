import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Sparkles,
  HeartHandshake,
  Smile,
  VolumeX,
  ShieldCheck,
  Check,
} from 'lucide-react'

export const AboutPage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="flex-1 px-4 py-5 flex flex-col justify-between space-y-6 animate-fade-in text-left">
      {/* 1. Header com botão Voltar funcional */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate('/inicio')}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium text-xs transition-colors border border-white/10 active:scale-95 min-h-[44px]"
            aria-label="Voltar para a tela inicial"
          >
            <ArrowLeft className="w-4 h-4 text-[#D4AF37]" />
            <span>Voltar ao Início</span>
          </button>

          <span className="text-[11px] font-mono text-[#D4AF37] px-2.5 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 font-semibold">
            Manifesto & Filosofia
          </span>
        </div>

        {/* Título Principal */}
        <div className="space-y-1.5 pt-1">
          <div className="inline-flex items-center gap-1.5 text-xs text-[#D4AF37] font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>TRESemmé Play</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-white">
            Sobre o conceito
          </h1>
          <p className="text-xs sm:text-sm text-[#B3B3B3] leading-relaxed">
            Gamificação do autocuidado criada com foco no bem-estar, respeito ao seu tempo e
            inclusão plena — sem pressões, rankings ou comparações.
          </p>
        </div>
      </div>

      {/* 2. Seções explicativas com ilustrações/ícones SVG dourados */}
      <div className="space-y-4">
        {/* Card 1: Autocuidado sem pressão */}
        <section
          aria-labelledby="philosophy-no-pressure"
          className="rounded-2xl border border-[#D4AF37]/35 bg-gradient-to-br from-[#1C1A14] via-[#141414] to-[#111111] p-4.5 space-y-3 shadow-sm"
        >
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shrink-0 shadow-inner">
              <svg viewBox="0 0 48 48" className="w-7 h-7" fill="none" aria-hidden="true">
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  stroke="#D4AF37"
                  strokeWidth="2"
                  strokeDasharray="3 3"
                />
                <path
                  d="M24 14 C20 10 12 14 12 22 C12 30 24 36 24 36 C24 36 36 30 36 22 C36 14 28 10 24 14 Z"
                  fill="#D4AF37"
                  fillOpacity="0.25"
                  stroke="#D4AF37"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <circle cx="24" cy="23" r="3" fill="#FFFFFF" />
              </svg>
            </div>
            <div className="space-y-1">
              <h2 id="philosophy-no-pressure" className="font-serif text-base font-bold text-white">
                Autocuidado sem pressão
              </h2>
              <p className="text-xs text-[#E0E0E0] leading-relaxed">
                O ritual é seu momento de pausa e carinho com seus cabelos. Você escolhe quando e
                como praticar, sem metas punitivas, perda de pontos ou contadores regressivos
                estressantes.
              </p>
            </div>
          </div>
        </section>

        {/* Card 2: Inclusão de verdade */}
        <section
          aria-labelledby="philosophy-inclusion"
          className="rounded-2xl border border-[#D4AF37]/35 bg-gradient-to-br from-[#1C1A14] via-[#141414] to-[#111111] p-4.5 space-y-3 shadow-sm"
        >
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shrink-0 shadow-inner">
              <svg viewBox="0 0 48 48" className="w-7 h-7" fill="none" aria-hidden="true">
                <circle cx="17" cy="18" r="6" stroke="#D4AF37" strokeWidth="2" />
                <circle cx="31" cy="18" r="6" stroke="#F1E5C8" strokeWidth="2" />
                <path
                  d="M10 36 C10 30 14 27 19 27 C22 27 24 28.5 25.5 30"
                  stroke="#D4AF37"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M22.5 30 C24 28.5 26 27 29 27 C34 27 38 30 38 36"
                  stroke="#F1E5C8"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path d="M24 38 L24 42" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <div className="space-y-1">
              <h2 id="philosophy-inclusion" className="font-serif text-base font-bold text-white">
                Inclusão de verdade
              </h2>
              <p className="text-xs text-[#E0E0E0] leading-relaxed">
                Diversidade de texturas de cabelo representadas em avatares ilustrados à mão (lisos,
                ondulados, cacheados e crespos). Não pontuamos a sua aparência: celebramos sua
                jornada pessoal de aprendizado e cuidado.
              </p>
            </div>
          </div>
        </section>

        {/* Card 3: Sem ranking, sem punições */}
        <section
          aria-labelledby="philosophy-no-ranking"
          className="rounded-2xl border border-[#D4AF37]/35 bg-gradient-to-br from-[#1C1A14] via-[#141414] to-[#111111] p-4.5 space-y-3 shadow-sm"
        >
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shrink-0 shadow-inner">
              <svg viewBox="0 0 48 48" className="w-7 h-7" fill="none" aria-hidden="true">
                {/* Pódio riscado amigavelmente */}
                <rect
                  x="8"
                  y="26"
                  width="10"
                  height="14"
                  rx="2"
                  stroke="#D4AF37"
                  strokeWidth="1.5"
                />
                <rect
                  x="19"
                  y="18"
                  width="10"
                  height="22"
                  rx="2"
                  stroke="#D4AF37"
                  strokeWidth="1.5"
                />
                <rect
                  x="30"
                  y="22"
                  width="10"
                  height="18"
                  rx="2"
                  stroke="#D4AF37"
                  strokeWidth="1.5"
                />
                {/* Coração unificador central sobre o pódio */}
                <circle
                  cx="24"
                  cy="12"
                  r="5"
                  fill="#D4AF37"
                  fillOpacity="0.3"
                  stroke="#D4AF37"
                  strokeWidth="1.5"
                />
                <path d="M22 12 L26 12" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M24 10 L24 14" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <div className="space-y-1">
              <h2 id="philosophy-no-ranking" className="font-serif text-base font-bold text-white">
                Sem ranking, sem punições
              </h2>
              <p className="text-xs text-[#E0E0E0] leading-relaxed">
                Aqui você não compete contra ninguém. Se pausar sua rotina por dias ou semanas, seus
                pontos, acessórios e conquistas continuam intactos. O autocuidado acontece no seu
                ritmo.
              </p>
            </div>
          </div>
        </section>

        {/* Card 4: Conforto sensorial e acessibilidade */}
        <section
          aria-labelledby="philosophy-comfort"
          className="rounded-2xl border border-[#D4AF37]/35 bg-gradient-to-br from-[#1C1A14] via-[#141414] to-[#111111] p-4.5 space-y-3 shadow-sm"
        >
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shrink-0 shadow-inner">
              <svg viewBox="0 0 48 48" className="w-7 h-7" fill="none" aria-hidden="true">
                <path
                  d="M12 24 L16 24 L24 14 L24 34 L16 24 Z"
                  stroke="#D4AF37"
                  strokeWidth="2"
                  strokeLinejoin="round"
                  fill="#D4AF37"
                  fillOpacity="0.2"
                />
                <path d="M30 18 L38 26" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
                <path d="M38 18 L30 26" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <div className="space-y-1">
              <h2 id="philosophy-comfort" className="font-serif text-base font-bold text-white">
                Conforto sensorial & escolhas
              </h2>
              <p className="text-xs text-[#E0E0E0] leading-relaxed">
                Sem sons automáticos intrusivos, com suporte nativo a redução de movimento
                (reduced-motion), tamanhos de texto ampliáveis (Aa) e temas claro e escuro para
                conforto visual em qualquer iluminação.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* 3. Pilares em Lista Compacta */}
      <div className="rounded-2xl border border-white/10 bg-[#141414] p-4 space-y-2.5">
        <h3 className="font-serif text-sm font-bold text-[#F1E5C8] flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
          <span>Compromissos de Design Étnico & Ético</span>
        </h3>
        <ul className="space-y-2 text-xs text-[#B3B3B3]">
          <li className="flex items-start gap-2">
            <Check className="w-3.5 h-3.5 text-[#81C784] shrink-0 mt-0.5" />
            <span>
              Privacidade total: todos os dados ficam salvos localmente no seu dispositivo.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-3.5 h-3.5 text-[#81C784] shrink-0 mt-0.5" />
            <span>
              Sem feed social ou comentários: seu autocuidado é um diálogo íntimo com você.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-3.5 h-3.5 text-[#81C784] shrink-0 mt-0.5" />
            <span>
              Exportação e impressão do diário gratuitas e livres para seu registro pessoal.
            </span>
          </li>
        </ul>
      </div>

      {/* 4. Ação Voltar Inferior */}
      <div className="space-y-4 pt-2">
        <button
          type="button"
          onClick={() => navigate('/inicio')}
          className="w-full min-h-[50px] rounded-2xl bg-[#D4AF37] hover:bg-[#B8962E] text-[#0D0D0D] font-bold text-sm transition-all shadow-[0_4px_16px_rgba(212,175,55,0.3)] flex items-center justify-center gap-2 active:scale-[0.98]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para Meus Rituais</span>
        </button>

        {/* Aviso legal obrigatório e versão */}
        <footer className="text-center pt-2 space-y-1">
          <p className="text-[10px] text-[#888888] max-w-xs mx-auto leading-relaxed">
            Conceito independente para desafio de inovação, sem vínculo oficial com a marca.
          </p>
          <p className="text-[9px] font-mono text-[#D4AF37]/60">TRESemmé Play v0.0.34</p>
        </footer>
      </div>
    </div>
  )
}

export default AboutPage
