// Gerenciador de Áudio Ambiente 100% sintetizado via Web Audio API
// Sem arquivos externos, sem downloads, desligado por padrão, sem autoplay.

export type SoundAmbientId = 'chuva-suave' | 'ondas-mar' | 'silencio-dourado'

export interface SoundOption {
  id: SoundAmbientId
  name: string
  description: string
  iconName: 'rain' | 'waves' | 'bell'
}

export const SOUND_OPTIONS: SoundOption[] = [
  {
    id: 'chuva-suave',
    name: 'Chuva suave',
    description: 'Ruído rosa filtrado contínuo com sensação acolhedora de gotas delicadas.',
    iconName: 'rain',
  },
  {
    id: 'ondas-mar',
    name: 'Ondas do mar',
    description: 'Fluxo e refluxo marítimo ritmado por filtro passa-baixa oscilante.',
    iconName: 'waves',
  },
  {
    id: 'silencio-dourado',
    name: 'Silêncio dourado',
    description: 'Zumbido harmônico calmante em 432 Hz e 216 Hz com tom puro relaxante.',
    iconName: 'bell',
  },
]

class AmbientSoundManager {
  private ctx: AudioContext | null = null
  private currentSound: SoundAmbientId = 'chuva-suave'
  private isPlaying = false
  private masterGain: GainNode | null = null
  private activeNodes: { stop?: () => void; disconnect?: () => void }[] = []
  private lfoInterval: number | null = null

  private getContext(): AudioContext {
    if (!this.ctx || this.ctx.state === 'closed') {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      this.ctx = new AudioCtx()
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
    return this.ctx
  }

  // Gera buffer de ruído branco para filtragem (chuva e ondas)
  private createNoiseBuffer(ctx: AudioContext, seconds = 5): AudioBuffer {
    const bufferSize = ctx.sampleRate * seconds
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    let b0 = 0,
      b1 = 0,
      b2 = 0,
      b3 = 0,
      b4 = 0,
      b5 = 0,
      b6 = 0
    // Algoritmo de Paul Kellet para gerar Ruído Rosa suave
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1
      b0 = 0.99886 * b0 + white * 0.0555179
      b1 = 0.99332 * b1 + white * 0.0750759
      b2 = 0.969 * b2 + white * 0.153852
      b3 = 0.8665 * b3 + white * 0.3104856
      b4 = 0.55 * b4 + white * 0.5329522
      b5 = -0.7616 * b5 - white * 0.016898
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.05
      b6 = white * 0.115926
    }
    return buffer
  }

  private stopCurrentNodes() {
    if (this.lfoInterval) {
      clearInterval(this.lfoInterval)
      this.lfoInterval = null
    }
    for (const node of this.activeNodes) {
      try {
        if (node.stop) node.stop()
        if (node.disconnect) node.disconnect()
      } catch {
        // nó já parado
      }
    }
    this.activeNodes = []
  }

  private startChuva(ctx: AudioContext, destination: AudioNode) {
    const noiseBuffer = this.createNoiseBuffer(ctx, 4)
    const noiseSource = ctx.createBufferSource()
    noiseSource.buffer = noiseBuffer
    noiseSource.loop = true

    // Filtro passa-faixa para simular gotas suaves de chuva
    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(800, ctx.currentTime)

    const filter2 = ctx.createBiquadFilter()
    filter2.type = 'highpass'
    filter2.frequency.setValueAtTime(250, ctx.currentTime)

    const rainGain = ctx.createGain()
    rainGain.gain.setValueAtTime(0.5, ctx.currentTime)

    noiseSource.connect(filter)
    filter.connect(filter2)
    filter2.connect(rainGain)
    rainGain.connect(destination)

    noiseSource.start()
    this.activeNodes.push(noiseSource, filter, filter2, rainGain)
  }

  private startOndas(ctx: AudioContext, destination: AudioNode) {
    const noiseBuffer = this.createNoiseBuffer(ctx, 6)
    const noiseSource = ctx.createBufferSource()
    noiseSource.buffer = noiseBuffer
    noiseSource.loop = true

    // Filtro modulado para simular o movimento de avanço e recuo das ondas
    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(320, ctx.currentTime)

    const waveGain = ctx.createGain()
    waveGain.gain.setValueAtTime(0.2, ctx.currentTime)

    noiseSource.connect(filter)
    filter.connect(waveGain)
    waveGain.connect(destination)

    noiseSource.start()
    this.activeNodes.push(noiseSource, filter, waveGain)

    // LFO suave para modular a frequência do filtro e volume a cada ~5 segundos
    let step = 0
    this.lfoInterval = window.setInterval(() => {
      if (!this.ctx || this.ctx.state === 'closed') return
      step++
      const cycle = (Math.sin(step * 0.18) + 1) / 2 // 0 a 1
      const targetFreq = 220 + cycle * 580 // varia entre 220Hz e 800Hz
      const targetGain = 0.18 + cycle * 0.42 // volume sobe e desce suave
      const t = this.ctx.currentTime
      filter.frequency.setTargetAtTime(targetFreq, t, 0.4)
      waveGain.gain.setTargetAtTime(targetGain, t, 0.4)
    }, 180)
  }

  private startSilencioDourado(ctx: AudioContext, destination: AudioNode) {
    // Tom binaural harmônico em 432 Hz e 216 Hz (oitava inferior pura e reconfortante)
    const osc1 = ctx.createOscillator()
    osc1.type = 'sine'
    osc1.frequency.setValueAtTime(432, ctx.currentTime)

    const osc2 = ctx.createOscillator()
    osc2.type = 'sine'
    osc2.frequency.setValueAtTime(216, ctx.currentTime)

    const gain1 = ctx.createGain()
    gain1.gain.setValueAtTime(0.045, ctx.currentTime)

    const gain2 = ctx.createGain()
    gain2.gain.setValueAtTime(0.035, ctx.currentTime)

    osc1.connect(gain1)
    osc2.connect(gain2)
    gain1.connect(destination)
    gain2.connect(destination)

    osc1.start()
    osc2.start()
    this.activeNodes.push(osc1, osc2, gain1, gain2)
  }

  public play(soundId: SoundAmbientId) {
    const ctx = this.getContext()
    this.stopCurrentNodes()
    this.currentSound = soundId

    if (!this.masterGain) {
      this.masterGain = ctx.createGain()
      this.masterGain.connect(ctx.destination)
    }

    // Fade-in suave de 0.3s para evitar cliques
    this.masterGain.gain.setValueAtTime(0.001, ctx.currentTime)
    this.masterGain.gain.exponentialRampToValueAtTime(0.4, ctx.currentTime + 0.3)

    if (soundId === 'chuva-suave') {
      this.startChuva(ctx, this.masterGain)
    } else if (soundId === 'ondas-mar') {
      this.startOndas(ctx, this.masterGain)
    } else if (soundId === 'silencio-dourado') {
      this.startSilencioDourado(ctx, this.masterGain)
    }

    this.isPlaying = true
  }

  public stop() {
    if (this.ctx && this.masterGain) {
      try {
        const t = this.ctx.currentTime
        this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, t)
        this.masterGain.gain.exponentialRampToValueAtTime(0.001, t + 0.2)
        setTimeout(() => {
          this.stopCurrentNodes()
        }, 220)
      } catch {
        this.stopCurrentNodes()
      }
    } else {
      this.stopCurrentNodes()
    }
    this.isPlaying = false
  }

  public toggle(soundId?: SoundAmbientId): boolean {
    if (this.isPlaying) {
      this.stop()
      return false
    } else {
      this.play(soundId || this.currentSound)
      return true
    }
  }

  public getCurrentSound(): SoundAmbientId {
    return this.currentSound
  }

  public getIsPlaying(): boolean {
    return this.isPlaying
  }
}

export const ambientSound = new AmbientSoundManager()
