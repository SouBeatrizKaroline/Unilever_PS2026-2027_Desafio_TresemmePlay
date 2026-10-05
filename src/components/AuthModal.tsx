import React, { useState } from 'react'
import { useGame } from '@/context/GameContext'
import {
  X,
  User,
  LogIn,
  UserPlus,
  LogOut,
  Sparkles,
  CloudCheck,
  CloudOff,
  AlertCircle,
  Check,
  ShieldCheck,
  KeyRound,
  ArrowLeft,
  Mail,
} from 'lucide-react'

export interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  initialMode?: 'login' | 'register' | 'forgot-password'
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode = 'login' }) => {
  const {
    currentUser,
    loginUser,
    registerUser,
    requestPasswordReset,
    logoutUser,
    syncStatus,
    isOfflineMode,
  } = useGame()

  const [mode, setMode] = useState<'login' | 'register' | 'forgot-password'>(initialMode)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)
  const [resetSentEmail, setResetSentEmail] = useState<string | null>(null)

  React.useEffect(() => {
    if (isOpen) {
      setMode(initialMode)
      setErrorMsg(null)
      setSuccessMsg(null)
      setIsLoading(false)
      setResetSentEmail(null)
    }
  }, [isOpen, initialMode])

  if (!isOpen) return null

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg(null)
    setSuccessMsg(null)

    if (!email.trim() || !password) {
      setErrorMsg('Informe e-mail e senha para entrar.')
      return
    }

    setIsLoading(true)
    const res = await loginUser(email, password)
    setIsLoading(false)

    if (res.success) {
      setSuccessMsg('Login realizado com sucesso! Seus dados foram sincronizados.')
      setTimeout(() => {
        onClose()
      }, 1000)
    } else {
      setErrorMsg(res.error || 'Não foi possível entrar. Verifique seu e-mail e senha.')
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg(null)
    setSuccessMsg(null)

    if (!name.trim()) {
      setErrorMsg('Informe seu nome.')
      return
    }
    if (!email.trim()) {
      setErrorMsg('Informe seu e-mail.')
      return
    }
    if (password.length < 8) {
      setErrorMsg('A senha precisa ter no mínimo 8 caracteres.')
      return
    }

    setIsLoading(true)
    const res = await registerUser(name, email, password)
    setIsLoading(false)

    if (res.success) {
      setSuccessMsg('Conta criada com sucesso! Sua jornada agora está salva nas nuvens.')
      setTimeout(() => {
        onClose()
      }, 1200)
    } else {
      setErrorMsg(res.error || 'Erro ao criar conta. Verifique se o e-mail já não está em uso.')
    }
  }

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg(null)
    setSuccessMsg(null)

    const trimmedEmail = email.trim()
    if (!trimmedEmail) {
      setErrorMsg('Informe seu endereço de e-mail para receber as instruções.')
      return
    }
    // Validação básica de formato de e-mail
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setErrorMsg('Por favor, informe um endereço de e-mail válido (ex.: seu.nome@email.com).')
      return
    }

    setIsLoading(true)
    const res = await requestPasswordReset(trimmedEmail)
    setIsLoading(false)

    if (res.success) {
      setResetSentEmail(trimmedEmail)
      setSuccessMsg(
        'E-mail de recuperação enviado com sucesso! Se esta conta estiver cadastrada, você receberá um link dourado para redefinir sua senha com tranquilidade.',
      )
    } else {
      setErrorMsg(
        res.error ||
          'Não foi possível solicitar a redefinição de senha. Verifique o e-mail digitado ou tente novamente mais tarde.',
      )
    }
  }

  const handleLogout = () => {
    logoutUser()
    setSuccessMsg('Você desconectou da sua conta. Seus dados continuam salvos na nuvem.')
    setTimeout(() => {
      onClose()
    }, 1000)
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-3xl border border-[#D4AF37]/50 bg-[#141414] p-5 text-white shadow-[0_0_40px_rgba(212,175,55,0.25)] space-y-4 animate-scale-in relative overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Luz de fundo dourada */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-32 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Botão fechar */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors z-10"
          aria-label="Fechar"
        >
          <X className="w-4 h-4" />
        </button>

        {/* SE O USUÁRIO JÁ ESTIVER LOGADO: PERFIL DA CONTA */}
        {currentUser ? (
          <div className="space-y-4 pt-1">
            <div className="text-center space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] text-[#D4AF37] text-[10px] font-bold tracking-wider uppercase">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Conta Conectada</span>
              </div>
              <h2 id="auth-modal-title" className="font-serif text-xl font-bold text-white">
                Sua Conta TRESemmé
              </h2>
            </div>

            <div className="p-4 rounded-2xl bg-[#1C1A17] border border-[#D4AF37]/30 space-y-2 text-left">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37]">
                  <User className="w-6 h-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-white text-sm truncate">{currentUser.name}</p>
                  <p className="text-xs text-[#B3B3B3] truncate">{currentUser.email}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-[#A0A0A0]">Status da Nuvem:</span>
                <span className="inline-flex items-center gap-1 text-[#D4AF37] font-medium">
                  {syncStatus === 'syncing' ? (
                    'Sincronizando...'
                  ) : syncStatus === 'error' || isOfflineMode ? (
                    <>
                      <CloudOff className="w-3.5 h-3.5 text-[#E57373]" />
                      <span className="text-[#E57373]">Offline (salvo local)</span>
                    </>
                  ) : (
                    <>
                      <CloudCheck className="w-3.5 h-3.5 text-[#81C784]" />
                      <span className="text-[#81C784]">Sincronizado</span>
                    </>
                  )}
                </span>
              </div>
            </div>

            {successMsg && (
              <p className="p-2.5 rounded-xl bg-[#81C784]/20 border border-[#81C784]/40 text-[#A5D6A7] text-xs flex items-center gap-2">
                <Check className="w-4 h-4 shrink-0" />
                <span>{successMsg}</span>
              </p>
            )}

            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={handleLogout}
                className="w-full min-h-[46px] rounded-xl border border-[#E57373]/40 bg-[#E57373]/10 hover:bg-[#E57373]/20 text-[#EF9A9A] font-semibold text-xs transition-colors flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Sair da conta</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-full min-h-[42px] rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold"
              >
                Voltar à Jornada
              </button>
            </div>
          </div>
        ) : (
          /* CASO NÃO ESTEJA LOGADO: FORMULÁRIO DE LOGIN OU CADASTRO */
          <div className="space-y-4 pt-1">
            <div className="text-center space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] font-bold tracking-wider uppercase">
                {mode === 'forgot-password' ? (
                  <KeyRound className="w-3 h-3" />
                ) : (
                  <Sparkles className="w-3 h-3" />
                )}
                <span>
                  {mode === 'forgot-password' ? 'Recuperação de Acesso' : 'Sincronização em Nuvem'}
                </span>
              </div>
              <h2 id="auth-modal-title" className="font-serif text-xl font-bold text-white">
                {mode === 'login'
                  ? 'Acessar Minha Conta'
                  : mode === 'register'
                    ? 'Criar Conta Real'
                    : 'Esqueci Minha Senha'}
              </h2>
              <p className="text-xs text-[#B3B3B3]">
                {mode === 'login'
                  ? 'Entre para recuperar seus pontos, looks e rituais salvos.'
                  : mode === 'register'
                    ? 'Guarde seus rituais, looks do cofrinho e cartas para sempre.'
                    : 'Digite o e-mail da sua conta para enviarmos um link acolhedor de redefinição.'}
              </p>
            </div>

            {/* Alternador de Modo (Abas Login / Cadastro / Esqueci minha senha) */}
            <div className="grid grid-cols-2 gap-1 bg-[#1A1A1A] p-1 rounded-xl border border-white/10 text-xs font-semibold">
              <button
                type="button"
                onClick={() => {
                  setMode('login')
                  setErrorMsg(null)
                  setSuccessMsg(null)
                  setResetSentEmail(null)
                }}
                className={`min-h-[38px] rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  mode === 'login'
                    ? 'bg-[#D4AF37] text-black shadow font-bold'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Entrar</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('register')
                  setErrorMsg(null)
                  setSuccessMsg(null)
                  setResetSentEmail(null)
                }}
                className={`min-h-[38px] rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  mode === 'register'
                    ? 'bg-[#D4AF37] text-black shadow font-bold'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Criar conta</span>
              </button>
            </div>

            {errorMsg && (
              <div
                role="alert"
                className="p-2.5 rounded-xl bg-[#E57373]/15 border border-[#E57373]/40 text-[#EF9A9A] text-xs flex items-center gap-2 text-left"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div
                role="status"
                className="p-2.5 rounded-xl bg-[#81C784]/20 border border-[#81C784]/40 text-[#A5D6A7] text-xs flex items-center gap-2 text-left"
              >
                <Check className="w-4 h-4 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            {mode === 'forgot-password' ? (
              /* FLUXO ESQUECI MINHA SENHA */
              <div className="space-y-3 text-left">
                {resetSentEmail ? (
                  <div className="space-y-3 pt-1">
                    <div className="p-4 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/40 text-center space-y-2">
                      <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] mx-auto flex items-center justify-center text-[#D4AF37]">
                        <Mail className="w-5 h-5" />
                      </div>
                      <h3 className="font-serif text-sm font-bold text-white">
                        Verifique sua Caixa de Entrada
                      </h3>
                      <p className="text-xs text-[#E6DCB8] leading-relaxed">
                        Enviamos as orientações de redefinição para{' '}
                        <strong className="text-white font-mono">{resetSentEmail}</strong>.
                      </p>
                      <p className="text-[11px] text-[#A0A0A0] leading-relaxed pt-1">
                        Abra seu leitor de e-mails, clique no link de segurança da TRESemmé e
                        escolha sua nova senha.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setMode('login')
                        setErrorMsg(null)
                        setSuccessMsg(null)
                        setResetSentEmail(null)
                      }}
                      className="w-full min-h-[46px] rounded-xl bg-[#D4AF37] hover:bg-[#B8962E] text-black font-bold text-xs transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Voltar para o Login</span>
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleForgotPassword} className="space-y-3 text-left">
                    <div className="space-y-1">
                      <label
                        htmlFor="auth-reset-email"
                        className="text-xs font-semibold text-white block"
                      >
                        Seu E-mail Cadastrado
                      </label>
                      <input
                        id="auth-reset-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="exemplo@email.com"
                        className="w-full min-h-[46px] px-3.5 rounded-xl bg-[#1A1A1A] text-white placeholder-white/30 border border-white/15 focus:border-[#D4AF37] focus:outline-none text-xs"
                      />
                      <p className="text-[11px] text-[#A0A0A0] pt-0.5">
                        Enviaremos um link seguro para você redefinir sua senha diretamente pelo
                        e-mail.
                      </p>
                    </div>

                    <div className="pt-2 space-y-2">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full min-h-[48px] rounded-xl bg-[#D4AF37] hover:bg-[#B8962E] text-black font-bold text-xs transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
                      >
                        {isLoading ? (
                          <span>Enviando e-mail...</span>
                        ) : (
                          <>
                            <Mail className="w-4 h-4" />
                            <span>Enviar Link de Recuperação</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setMode('login')
                          setErrorMsg(null)
                          setSuccessMsg(null)
                        }}
                        className="w-full min-h-[42px] rounded-xl border border-white/15 hover:bg-white/5 text-white/80 hover:text-white font-medium text-xs transition-colors flex items-center justify-center gap-1.5"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Voltar ao login</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            ) : (
              /* FORMULÁRIO DE LOGIN OU CADASTRO */
              <form
                onSubmit={mode === 'login' ? handleLogin : handleRegister}
                className="space-y-3 text-left"
              >
                {mode === 'register' && (
                  <div className="space-y-1">
                    <label htmlFor="auth-name" className="text-xs font-semibold text-white block">
                      Seu Nome
                    </label>
                    <input
                      id="auth-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Como prefere ser chamada(o)"
                      className="w-full min-h-[46px] px-3.5 rounded-xl bg-[#1A1A1A] text-white placeholder-white/30 border border-white/15 focus:border-[#D4AF37] focus:outline-none text-xs"
                    />
                  </div>
                )}

                <div className="space-y-1">
                  <label htmlFor="auth-email" className="text-xs font-semibold text-white block">
                    E-mail
                  </label>
                  <input
                    id="auth-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="exemplo@email.com"
                    className="w-full min-h-[46px] px-3.5 rounded-xl bg-[#1A1A1A] text-white placeholder-white/30 border border-white/15 focus:border-[#D4AF37] focus:outline-none text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="auth-password"
                      className="text-xs font-semibold text-white block"
                    >
                      Senha{' '}
                      {mode === 'register' && (
                        <span className="text-[#A0A0A0] font-normal">(mínimo 8 dígitos)</span>
                      )}
                    </label>
                    {mode === 'login' && (
                      <button
                        type="button"
                        onClick={() => {
                          setMode('forgot-password')
                          setErrorMsg(null)
                          setSuccessMsg(null)
                          setResetSentEmail(null)
                        }}
                        className="text-[11px] text-[#D4AF37] hover:underline cursor-pointer inline-flex items-center gap-1 font-medium"
                      >
                        <KeyRound className="w-3 h-3" />
                        <span>Esqueci minha senha</span>
                      </button>
                    )}
                  </div>
                  <input
                    id="auth-password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full min-h-[46px] px-3.5 rounded-xl bg-[#1A1A1A] text-white placeholder-white/30 border border-white/15 focus:border-[#D4AF37] focus:outline-none text-xs"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full min-h-[48px] rounded-xl bg-[#D4AF37] hover:bg-[#B8962E] text-black font-bold text-xs transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {isLoading ? (
                      <span>Processando...</span>
                    ) : mode === 'login' ? (
                      <>
                        <LogIn className="w-4 h-4" />
                        <span>Entrar na Minha Conta</span>
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4" />
                        <span>Cadastrar e Sincronizar</span>
                      </>
                    )}
                  </button>
                </div>

                {mode === 'login' && (
                  <p className="text-[11px] text-center text-[#A0A0A0] pt-1">
                    Conta demo de teste predefinida:{' '}
                    <code className="text-[#D4AF37]">sua-conta-de-teste</code> /{' '}
                    <code className="text-[#D4AF37]">Defina no seu PocketBase</code>
                  </p>
                )}
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
