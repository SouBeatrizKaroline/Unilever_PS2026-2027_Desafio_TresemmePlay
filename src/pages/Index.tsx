import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useGame } from '@/context/GameContext'
import { HeroHairIllustration } from '@/components/svg/Illustrations'
import { Play, Sparkles, LogIn, UserPlus } from 'lucide-react'
import { AuthModal } from '@/components/AuthModal'

const Index: React.FC = () => {
  const navigate = useNavigate()
  const { startDemo, currentUser } = useGame()
  const [authModalOpen, setAuthModalOpen] = React.useState(false)
  const [authMode, setAuthMode] = React.useState<'login' | 'register'>('login')

  const handleStartDemo = () => {
    startDemo()
    navigate('/inicio')
  }

  const handleOpenLogin = () => {
    setAuthMode('login')
    setAuthModalOpen(true)
  }

  const handleOpenRegister = () => {
    setAuthMode('register')
    setAuthModalOpen(true)
  }

  return (
    <div className="flex-1 flex flex-col justify-between px-6 py-8 text-center animate-fade-in">
      {/* Topo / Brand & Tagline */}
      <div className="space-y-4 pt-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-semibold text-[#F1E5C8] tracking-wider uppercase">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Experiência Interativa</span>
        </div>

        <div className="space-y-1">
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            TRESemmé <span className="text-[#D4AF37]">Play</span>
          </h1>
          <p className="text-base sm:text-lg text-[#F1E5C8] font-medium max-w-xs mx-auto leading-snug">
            Seu ritual de autocuidado em jogo
          </p>
        </div>
      </div>

      {/* Ilustração Central em SVG com brilhos */}
      <div className="py-6 flex items-center justify-center">
        <div className="relative w-full max-w-[280px]">
          <HeroHairIllustration className="w-full h-auto drop-shadow-[0_10px_25px_rgba(212,175,55,0.2)]" />
        </div>
      </div>

      {/* Bloco de CTAs de Entrada */}
      <div className="space-y-3.5 w-full max-w-sm mx-auto">
        {/* As 3 opções claras pedidas: "Experimentar demo", "Entrar" e "Criar conta" */}
        {/* 1. Experimentar demo (instantâneo, local) */}
        <button
          type="button"
          onClick={handleStartDemo}
          className="w-full min-h-[50px] px-5 py-3 rounded-2xl bg-[#D4AF37] hover:bg-[#B8962E] text-[#0D0D0D] font-bold text-sm sm:text-base transition-all shadow-[0_4px_20px_rgba(212,175,55,0.35)] flex items-center justify-center gap-2 active:scale-[0.98]"
        >
          <Play className="w-4 h-4 fill-current" />
          <span>Experimentar demo (instantâneo)</span>
        </button>

        <div className="grid grid-cols-2 gap-2.5">
          {/* 2. Entrar (login na conta) */}
          <button
            type="button"
            onClick={currentUser ? () => navigate('/inicio') : handleOpenLogin}
            className="w-full min-h-[48px] px-3 py-2.5 rounded-2xl bg-[#1C1A17] hover:bg-[#25221E] text-white font-semibold text-xs sm:text-sm border border-[#D4AF37]/60 hover:border-[#D4AF37] transition-all flex items-center justify-center gap-1.5 active:scale-[0.98]"
          >
            <LogIn className="w-4 h-4 text-[#D4AF37]" />
            <span>{currentUser ? 'Entrar (logada)' : 'Entrar'}</span>
          </button>

          {/* 3. Criar conta (cadastro no PocketBase) */}
          <button
            type="button"
            onClick={handleOpenRegister}
            className="w-full min-h-[48px] px-3 py-2.5 rounded-2xl bg-transparent hover:bg-white/5 text-[#F1E5C8] font-semibold text-xs sm:text-sm border border-white/20 hover:border-[#D4AF37]/50 transition-all flex items-center justify-center gap-1.5 active:scale-[0.98]"
          >
            <UserPlus className="w-4 h-4 text-[#D4AF37]" />
            <span>Criar conta</span>
          </button>
        </div>

        {/* Atalho para continuar jornada existente sem conta se houver */}
        <button
          type="button"
          onClick={() => navigate('/jornada')}
          className="w-full py-1.5 text-xs text-[#B3B3B3] hover:text-[#D4AF37] transition-colors"
        >
          Configurar perfil sem conta →
        </button>

        {/* Link discreto para Sobre o Conceito */}
        <button
          type="button"
          onClick={() => navigate('/sobre')}
          className="w-full py-2 text-xs text-[#D4AF37] hover:underline font-medium transition-colors"
        >
          Conheça a filosofia do TRESemmé Play →
        </button>
      </div>

      {/* Aviso legal obrigatório (texto exato) */}
      <div className="pt-6 pb-2">
        <p className="text-[11px] leading-relaxed text-[#888888] max-w-xs mx-auto">
          Conceito independente para desafio de inovação, sem vínculo oficial com a marca.
        </p>
      </div>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => {
          setAuthModalOpen(false)
          if (currentUser) {
            navigate('/inicio')
          }
        }}
        initialMode={authMode}
      />
    </div>
  )
}

export default Index
