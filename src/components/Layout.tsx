import React from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useGame } from '@/context/GameContext'
import { AvatarSvg } from '@/components/svg/AvatarSvg'
import { GoldCoinIcon } from '@/components/svg/AccessorySvg'
import { AccessibilitySheet } from '@/components/AccessibilitySheet'
import { ArrowLeft, Home, Sparkles, Gift, Volume2, VolumeX, User, ShieldCheck } from 'lucide-react'
import { AuthModal } from '@/components/AuthModal'
import { GuidedTourModal } from '@/components/GuidedTourModal'
import { AchievementCelebrationModal } from '@/components/AchievementCelebrationModal'
import { ShareCardModal, type ShareCardProps } from '@/components/ShareCardModal'

export interface LayoutContextType {
  activeTab: 'inicio' | 'missoes' | 'acessorios'
  setActiveTab: (tab: 'inicio' | 'missoes' | 'acessorios') => void
}

export default function Layout() {
  const {
    journey,
    hasSession,
    setAccessibilityOpen,
    isAmbientPlaying,
    stopAmbientSound,
    currentUser,
    isTourOpen,
    startTour,
    closeTour,
    completeTour,
    dismissTour,
    celebrateTourSuccess,
    dismissTourCelebration,
  } = useGame()
  const [tourShareCard, setTourShareCard] = React.useState<ShareCardProps | null>(null)
  const location = useLocation()
  const navigate = useNavigate()
  const [authModalOpen, setAuthModalOpen] = React.useState(false)

  // Aba selecionada na tela inicial
  const [activeTab, setActiveTab] = React.useState<'inicio' | 'missoes' | 'acessorios'>('inicio')

  // Se rota mudou trazendo state.tab (ex: ao clicar em "Ver meu acessório")
  React.useEffect(() => {
    if (location.state && (location.state as { tab?: 'inicio' | 'missoes' | 'acessorios' }).tab) {
      setActiveTab((location.state as { tab: 'inicio' | 'missoes' | 'acessorios' }).tab)
    }
  }, [location.state])

  const isAboutRoute = location.pathname === '/sobre'
  const isMissionRoute = location.pathname.startsWith('/missao')
  const isHomeRoute = location.pathname === '/inicio'
  const isEntryRoute = location.pathname === '/'

  // Auto-inicia o tour acolhedor na primeira visita quando a pessoa entra no app (/inicio) e ainda não viu
  React.useEffect(() => {
    if (isHomeRoute && !journey.hasSeenTour && !isTourOpen) {
      const timer = setTimeout(() => {
        startTour()
      }, 700)
      return () => clearTimeout(timer)
    }
  }, [isHomeRoute, journey.hasSeenTour, isTourOpen, startTour])

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex justify-center antialiased relative overflow-x-hidden light-root-bg bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1B1710]/40 via-[#0A0A0A] to-[#050505]">
      {/* Luz ambiente dourada de fundo no desktop */}
      <div className="fixed inset-0 pointer-events-none hidden md:block opacity-40">
        <div className="absolute top-1/4 left-[calc(50%-560px)] w-96 h-96 rounded-full bg-[#D4AF37]/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-[calc(50%-560px)] w-96 h-96 rounded-full bg-[#D4AF37]/10 blur-3xl" />
      </div>

      {/* Container Central: mobile 480px centrado; em telas grandes (>=1024px) expande para max-w-7xl com grid profissional */}
      <div className="w-full max-w-[480px] lg:max-w-7xl min-h-screen flex flex-col bg-[#0D0D0D] border-x border-[#D4AF37]/20 relative shadow-[0_0_60px_rgba(0,0,0,0.9),0_0_40px_rgba(212,175,55,0.08)] pb-24 light-container transition-layout">
        {/* Top App Bar Fixa */}
        <header className="sticky top-0 z-40 w-full bg-[#0D0D0D]/95 backdrop-blur-md border-b border-[#D4AF37]/20 px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between transition-colors shadow-sm">
          {/* Lado Esquerdo: Wordmark ou Botão "Voltar" na missão / sobre */}
          <div className="flex items-center gap-4">
            {isMissionRoute ? (
              <button
                type="button"
                onClick={() => navigate('/inicio')}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white font-medium text-sm transition-colors border border-white/10 active:scale-95 min-h-[44px]"
                aria-label="Sair da missão e voltar ao início"
              >
                <ArrowLeft className="w-4 h-4 text-[#D4AF37]" />
                <span>Sair</span>
              </button>
            ) : isAboutRoute ? (
              <button
                type="button"
                onClick={() => navigate('/inicio')}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white font-medium text-sm transition-colors border border-white/10 active:scale-95 min-h-[44px]"
                aria-label="Voltar para tela inicial"
              >
                <ArrowLeft className="w-4 h-4 text-[#D4AF37]" />
                <span>Início</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => navigate(hasSession ? '/inicio' : '/')}
                className="flex items-center gap-2 text-left group focus:outline-none"
                aria-label="TRESemmé Play - Página inicial"
              >
                <span className="font-serif tracking-wider text-xl lg:text-2xl font-extrabold text-white group-hover:text-[#F1E5C8] transition-colors">
                  TRESemmé
                </span>
                <span className="font-sans font-bold text-xs uppercase px-2 py-0.5 rounded bg-[#D4AF37] text-[#0D0D0D] tracking-widest shadow-[0_0_10px_rgba(212,175,55,0.45)]">
                  Play
                </span>
              </button>
            )}

            {/* Menu Desktop das Abas Principais integrado no topo para telas grandes */}
            {isHomeRoute && (
              <nav
                aria-label="Navegação desktop"
                className="hidden lg:flex items-center gap-1 pl-4 border-l border-white/10"
              >
                <button
                  type="button"
                  onClick={() => setActiveTab('inicio')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    activeTab === 'inicio'
                      ? 'bg-[#D4AF37] text-black shadow-sm font-bold'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Home className="w-3.5 h-3.5" />
                  <span>Início</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('missoes')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    activeTab === 'missoes'
                      ? 'bg-[#D4AF37] text-black shadow-sm font-bold'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Missões</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('acessorios')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    activeTab === 'acessorios'
                      ? 'bg-[#D4AF37] text-black shadow-sm font-bold'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Gift className="w-3.5 h-3.5" />
                  <span>Acessórios</span>
                </button>
              </nav>
            )}
          </div>

          {/* Lado Direito: Atalho Passeio + Avatar miniatura + Moeda de Pontos */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Atalho Passeio Guiado Visível em Telas Médias e Desktop */}
            <button
              type="button"
              onClick={() => startTour()}
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-white/15 bg-white/5 hover:bg-[#D4AF37]/15 hover:border-[#D4AF37]/40 text-[#F1E5C8] text-[11px] font-semibold transition-colors cursor-pointer"
              title="Iniciar passeio guiado pelo aplicativo"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Passeio</span>
            </button>

            {/* Indicador Flutuante de Conta / Demo */}
            <button
              type="button"
              onClick={() => setAuthModalOpen(true)}
              className="flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase transition-all border cursor-pointer active:scale-95 bg-[#1C1A17]"
              style={{
                borderColor: currentUser ? '#D4AF37' : '#555555',
                color: currentUser ? '#F1E5C8' : '#A0A0A0',
              }}
              title={
                currentUser
                  ? `Conectada(o) como ${currentUser.name}`
                  : 'Modo Demo (clique para entrar ou criar conta)'
              }
            >
              {currentUser ? (
                <>
                  <ShieldCheck className="w-3 h-3 text-[#D4AF37]" />
                  <span className="max-w-[70px] truncate">{currentUser.name.split(' ')[0]}</span>
                </>
              ) : (
                <>
                  <User className="w-3 h-3 text-[#B3B3B3]" />
                  <span>Demo</span>
                </>
              )}
            </button>

            {/* Indicador Flutuante / Top Bar de Som Ambiente Ativo */}
            {isAmbientPlaying && (
              <button
                type="button"
                onClick={stopAmbientSound}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all active:scale-95 cursor-pointer shadow-[0_0_12px_rgba(212,175,55,0.3)]"
                title="Som ambiente tocando. Clique para pausar."
                aria-label="Pausar som ambiente tocando"
              >
                <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-wider hidden xs:inline">
                  Som
                </span>
                <span className="text-[11px] leading-none font-bold">✕</span>
              </button>
            )}

            {/* Pontos */}
            <div
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-[#1A1A1A] border border-[#D4AF37]/40 shadow-sm"
              title="Seus pontos acumulados"
            >
              <GoldCoinIcon className="w-4 h-4" />
              <span className="font-mono text-xs font-bold text-[#F1E5C8]">{journey.points}</span>
            </div>

            {/* Avatar Miniatura */}
            <button
              type="button"
              onClick={() => {
                if (hasSession) {
                  navigate('/inicio')
                  setActiveTab('inicio')
                } else {
                  navigate('/jornada')
                }
              }}
              className="relative rounded-full ring-2 ring-[#D4AF37]/60 hover:ring-[#D4AF37] transition-all p-0.5 w-9 h-9 shrink-0 flex items-center justify-center overflow-hidden aspect-square focus:outline-none focus:ring-2 focus:ring-white cursor-pointer"
              aria-label={`Perfil de ${journey.name || 'Visitante'}`}
            >
              <AvatarSvg
                id={journey.avatarId}
                skinTone={journey.skinTone}
                hairTexture={journey.hairTexture}
                hairLength={journey.hairLength}
                unlockedAccessories={journey.unlockedAccessories}
                selectedAccessoryId={journey.selectedAccessoryId}
                selectedAccessoriesList={journey.selectedAccessoriesList}
                className="w-full h-full rounded-full object-contain"
              />
            </button>
          </div>
        </header>

        {/* Conteúdo Principal */}
        <main className="flex-1 flex flex-col w-full">
          <Outlet context={{ activeTab, setActiveTab }} />
        </main>

        {/* Navegação Inferior (visível no mobile/tablet, oculta no desktop lg onde já temos a barra superior) */}
        {isHomeRoute && (
          <nav
            aria-label="Navegação da tela inicial"
            className="lg:hidden fixed bottom-0 z-40 w-full max-w-[480px] left-1/2 -translate-x-1/2 bg-[#141414]/95 backdrop-blur-md border-t border-white/10 px-3 py-1.5 flex items-center justify-around shadow-2xl"
          >
            <button
              type="button"
              data-tour="perfil"
              onClick={() => setActiveTab('inicio')}
              className={`flex-1 min-h-[48px] flex flex-col items-center justify-center gap-1 py-1 rounded-xl transition-all ${
                activeTab === 'inicio'
                  ? 'text-[#D4AF37] font-semibold bg-[#D4AF37]/10'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <Home className="w-5 h-5" />
              <span className="text-[11px]">Início</span>
            </button>

            <button
              type="button"
              data-tour="missoes"
              onClick={() => setActiveTab('missoes')}
              className={`flex-1 min-h-[48px] flex flex-col items-center justify-center gap-1 py-1 rounded-xl transition-all ${
                activeTab === 'missoes'
                  ? 'text-[#D4AF37] font-semibold bg-[#D4AF37]/10'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <Sparkles className="w-5 h-5" />
              <span className="text-[11px]">Missões</span>
            </button>

            <button
              type="button"
              data-tour="acessorios"
              onClick={() => setActiveTab('acessorios')}
              className={`flex-1 min-h-[48px] flex flex-col items-center justify-center gap-1 py-1 rounded-xl transition-all ${
                activeTab === 'acessorios'
                  ? 'text-[#D4AF37] font-semibold bg-[#D4AF37]/10'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <Gift className="w-5 h-5" />
              <span className="text-[11px]">Acessórios</span>
            </button>
          </nav>
        )}

        {/* Botão Flutuante de Acessibilidade ("Aa") em TODAS as telas posicionado para desktop e mobile */}
        <div
          className={`fixed z-50 ${
            isHomeRoute
              ? 'bottom-20 right-4 lg:right-6 xl:right-10'
              : 'bottom-6 right-4 lg:right-6 xl:right-10'
          }`}
        >
          <button
            type="button"
            data-tour="acessibilidade"
            onClick={() => setAccessibilityOpen(true)}
            className="w-11 h-11 rounded-full bg-[#1A1A1A] border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0D0D0D] transition-all flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.6)] focus:outline-none focus:ring-2 focus:ring-white active:scale-95 cursor-pointer"
            aria-label="Abrir painel de acessibilidade (tamanho do texto e redução de animações)"
            title="Acessibilidade (Tamanho do texto e Animações)"
          >
            <span className="font-serif font-black text-xs tracking-tight">Aa</span>
          </button>
        </div>

        {/* Modal Bottom Sheet de Acessibilidade */}
        <AccessibilitySheet />

        {/* Passeio Guiado de Primeira Visita (4 a 6 passos acolhedores) */}
        <GuidedTourModal
          isOpen={isTourOpen}
          onClose={dismissTour}
          onComplete={completeTour}
          onSwitchTab={(tab) => {
            if (isHomeRoute) {
              setActiveTab(tab)
            } else {
              navigate('/inicio', { state: { tab } })
            }
          }}
        />

        {/* Modal de Celebração Imediata da Conquista Boas-Vindas ao Palco ao finalizar o tour */}
        {celebrateTourSuccess && (
          <AchievementCelebrationModal
            type="boas-vindas-palco"
            unlockedAt={journey.tourCompletedAt || 'Hoje'}
            onClose={dismissTourCelebration}
            onShare={() => {
              dismissTourCelebration()
              setTourShareCard({
                missionTitle: 'Conquista: Boas-Vindas ao Palco',
                points: 100,
                stars: 3,
                completedAt: 'Hoje',
                rewardName: 'Medalha de Estreia & Acolhimento',
                userName: journey.name || 'Visitante',
                avatarId: journey.avatarId,
                skinTone: journey.skinTone,
                hairTexture: journey.hairTexture,
                hairLength: journey.hairLength,
                unlockedAccessories: journey.unlockedAccessories,
                selectedAccessoryId: journey.selectedAccessoryId,
                selectedAccessoriesList: journey.selectedAccessoriesList,
                isRitualCompleto: true,
                achievementType: 'boas-vindas-palco',
              })
            }}
          />
        )}

        {/* Modal de Compartilhamento do Card de Boas-Vindas ao Palco */}
        {tourShareCard && (
          <ShareCardModal
            isOpen={Boolean(tourShareCard)}
            onClose={() => setTourShareCard(null)}
            {...tourShareCard}
          />
        )}

        {/* Modal de Autenticação / Perfil de Conta */}
        <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
      </div>
    </div>
  )
}
