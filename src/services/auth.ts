import pb from '@/lib/pocketbase/client'
import type { UserJourney } from '@/types/game'

export interface UserAccount {
  id: string
  email: string
  name: string
  avatar?: string
}

export const authService = {
  getCurrentUser(): UserAccount | null {
    if (pb.authStore.isValid && pb.authStore.record) {
      return {
        id: pb.authStore.record.id,
        email: pb.authStore.record.email || '',
        name:
          pb.authStore.record.name ||
          (pb.authStore.record.email ? pb.authStore.record.email.split('@')[0] : 'Você'),
        avatar: pb.authStore.record.avatar,
      }
    }
    return null
  },

  async login(email: string, password: string): Promise<UserAccount> {
    const authData = await pb.collection('users').authWithPassword(email.trim(), password)
    return {
      id: authData.record.id,
      email: authData.record.email || '',
      name: authData.record.name || authData.record.email?.split('@')[0] || 'Você',
      avatar: authData.record.avatar,
    }
  },

  async register(name: string, email: string, password: string): Promise<UserAccount> {
    const trimmedName = name.trim()
    const trimmedEmail = email.trim()

    // 1. Criar conta no PocketBase
    await pb.collection('users').create({
      email: trimmedEmail,
      password,
      passwordConfirm: password,
      name: trimmedName,
    })

    // 2. Autenticar automaticamente
    const authData = await pb.collection('users').authWithPassword(trimmedEmail, password)
    return {
      id: authData.record.id,
      email: authData.record.email || '',
      name: authData.record.name || trimmedName,
      avatar: authData.record.avatar,
    }
  },

  logout(): void {
    pb.authStore.clear()
  },

  async requestPasswordReset(email: string): Promise<void> {
    const trimmedEmail = email.trim()
    if (!trimmedEmail) {
      throw new Error('Informe seu endereço de e-mail.')
    }
    // PocketBase SDK requestPasswordReset
    await pb.collection('users').requestPasswordReset(trimmedEmail)
  },

  async fetchRemoteJourney(userId: string): Promise<UserJourney | null> {
    try {
      const record = await pb.collection('user_journeys').getFirstListItem(`user="${userId}"`)
      if (record && record.data) {
        return record.data as UserJourney
      }
    } catch (err: unknown) {
      // 404 is expected when user has no journey yet
      return null
    }
    return null
  },

  async saveRemoteJourney(userId: string, journey: UserJourney): Promise<void> {
    try {
      const existing = await pb
        .collection('user_journeys')
        .getFirstListItem(`user="${userId}"`)
        .catch(() => null)
      if (existing) {
        await pb.collection('user_journeys').update(existing.id, {
          data: journey,
        })
      } else {
        await pb.collection('user_journeys').create({
          user: userId,
          data: journey,
        })
      }
    } catch (err) {
      console.warn('Falha gentil ao sincronizar jornada com PocketBase (modo offline ativo):', err)
    }
  },

  /**
   * Envia uma carta de presente para uma conta pelo e-mail
   */
  async sendFriendLetter(payload: {
    senderId?: string
    senderName: string
    recipientEmail: string
    recipientName?: string
    message: string
    theme?: string
    avatarChoice?: string
  }): Promise<boolean> {
    try {
      await pb.collection('sent_letters').create({
        user: payload.senderId || pb.authStore.record?.id || '',
        senderName: payload.senderName,
        recipientEmail: payload.recipientEmail.trim().toLowerCase(),
        recipientName: payload.recipientName || '',
        message: payload.message,
        theme: payload.theme || 'preto-ouro',
        avatarChoice: payload.avatarChoice || 'avatar-1',
        delivered: false,
      })
      return true
    } catch (err) {
      console.warn('Falha ao enviar carta para a conta PocketBase:', err)
      return false
    }
  },

  /**
   * Busca cartas pendentes enviadas para o e-mail do usuário autenticado
   */
  async fetchIncomingLetters(userEmail: string): Promise<any[]> {
    try {
      if (!userEmail) return []
      const safeEmail = userEmail.trim().toLowerCase()
      const records = await pb.collection('sent_letters').getFullList({
        filter: `recipientEmail = "${safeEmail}"`,
        sort: '-created',
      })
      return records
    } catch (err) {
      console.warn('Falha gentil ao buscar cartas recebidas:', err)
      return []
    }
  },
}
