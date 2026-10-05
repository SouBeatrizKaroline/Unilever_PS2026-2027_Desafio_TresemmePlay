// Utilitário para exportar o Diário de Autocuidado completo como imagem PNG
import type { DiaryNote } from '@/types/game'

interface ExportDiaryOptions {
  userName: string
  notes: DiaryNote[]
  totalPoints: number
  streakDays: number
  totalMinutes: number
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

// Quebra texto em linhas para caber dentro do card SVG
function wrapText(text: string, maxCharsPerLine = 48): string[] {
  const words = text.split(' ')
  const lines: string[] = []
  let currentLine = ''

  for (const word of words) {
    if ((currentLine + ' ' + word).trim().length <= maxCharsPerLine) {
      currentLine = (currentLine + ' ' + word).trim()
    } else {
      if (currentLine) lines.push(currentLine)
      currentLine = word
    }
  }
  if (currentLine) lines.push(currentLine)
  return lines.length > 0 ? lines : ['']
}

export function generateDiarySvgString(options: ExportDiaryOptions): {
  svgString: string
  height: number
} {
  const { userName, notes, totalPoints, streakDays, totalMinutes } = options
  const width = 600

  // Cálculo de altura dinâmica conforme a quantidade de notas
  let runningY = 220
  const noteBlocks: string[] = []

  notes.forEach((note, index) => {
    const wrapped = wrapText(note.noteText, 52)
    const textHeight = wrapped.length * 20
    const cardHeight = Math.max(85, textHeight + 58)
    const startY = runningY

    const linesSvg = wrapped
      .map(
        (line, i) =>
          `<text x="65" y="${startY + 48 + i * 19}" fill="#F1E5C8" font-family="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" font-size="13" font-style="italic">${escapeXml(line)}</text>`,
      )
      .join('')

    noteBlocks.push(`
      <g>
        <!-- Card Fundo da Nota -->
        <rect x="45" y="${startY}" width="510" height="${cardHeight}" rx="14" fill="#181614" stroke="#D4AF37" stroke-width="1" stroke-opacity="0.35" />
        
        <!-- Ponto Dourado e Título -->
        <circle cx="65" cy="${startY + 22}" r="3.5" fill="#D4AF37" />
        <text x="76" y="${startY + 26}" fill="#FFFFFF" font-family="'Cinzel', Georgia, serif" font-size="14" font-weight="bold">${escapeXml(note.missionTitle)}</text>
        <text x="535" y="${startY + 26}" fill="#A0A0A0" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" text-anchor="end">${escapeXml(note.completedAt || 'Hoje')}</text>
        
        <!-- Linha divisória fina -->
        <line x1="65" y1="${startY + 33}" x2="535" y2="${startY + 33}" stroke="#D4AF37" stroke-width="0.7" stroke-opacity="0.2" />

        <!-- Texto da Reflexão -->
        ${linesSvg}
      </g>
    `)

    runningY += cardHeight + 16
  })

  // Rodapé do card
  const footerY = runningY + 20
  const totalHeight = footerY + 80

  const svgString = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${totalHeight}" viewBox="0 0 ${width} ${totalHeight}">
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#121110"/>
          <stop offset="45%" stop-color="#191714"/>
          <stop offset="100%" stop-color="#0E0D0C"/>
        </linearGradient>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#D4AF37"/>
          <stop offset="100%" stop-color="#F1E5C8"/>
        </linearGradient>
      </defs>

      <!-- Fundo Principal -->
      <rect width="${width}" height="${totalHeight}" fill="url(#bgGrad)"/>
      <rect x="12" y="12" width="${width - 24}" height="${totalHeight - 24}" rx="20" fill="none" stroke="#D4AF37" stroke-width="1.5" stroke-opacity="0.6"/>
      <rect x="18" y="18" width="${width - 36}" height="${totalHeight - 36}" rx="16" fill="none" stroke="#D4AF37" stroke-width="0.75" stroke-opacity="0.25" stroke-dasharray="6 4"/>

      <!-- Cabeçalho TRESemmé Play -->
      <g transform="translate(45, 45)">
        <!-- Logo / Marca -->
        <text x="0" y="24" fill="url(#goldGrad)" font-family="'Cinzel', Georgia, serif" font-size="22" font-weight="bold" letter-spacing="3">TRESemmé</text>
        <rect x="145" y="6" width="52" height="20" rx="10" fill="#D4AF37" />
        <text x="171" y="20" fill="#0D0D0D" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="900" letter-spacing="1" text-anchor="middle">PLAY</text>

        <text x="0" y="52" fill="#FFFFFF" font-family="'Cinzel', Georgia, serif" font-size="20" font-weight="bold">Diário de Autocuidado</text>
        <text x="0" y="72" fill="#F1E5C8" font-family="'Plus Jakarta Sans', sans-serif" font-size="13">Jornada de bem-estar de <tspan font-weight="bold" fill="#D4AF37">${escapeXml(userName || 'Visitante')}</tspan></text>
      </g>

      <!-- Badges de Estatísticas no topo -->
      <g transform="translate(45, 140)">
        <!-- Badge 1: Reflexões -->
        <rect x="0" y="0" width="160" height="54" rx="12" fill="#1F1D1A" stroke="#D4AF37" stroke-width="1" stroke-opacity="0.3" />
        <text x="16" y="22" fill="#A0A0A0" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="600" text-transform="uppercase">REFLEXÕES</text>
        <text x="16" y="42" fill="#FFFFFF" font-family="'Cinzel', serif" font-size="18" font-weight="bold">${notes.length} notas</text>

        <!-- Badge 2: Sequência -->
        <rect x="175" y="0" width="160" height="54" rx="12" fill="#1F1D1A" stroke="#D4AF37" stroke-width="1" stroke-opacity="0.3" />
        <text x="191" y="22" fill="#A0A0A0" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="600" text-transform="uppercase">SEQUÊNCIA</text>
        <text x="191" y="42" fill="#F1E5C8" font-family="'Cinzel', serif" font-size="18" font-weight="bold">${streakDays} ${streakDays === 1 ? 'dia' : 'dias'}</text>

        <!-- Badge 3: Tempo / Pontos -->
        <rect x="350" y="0" width="160" height="54" rx="12" fill="#1F1D1A" stroke="#D4AF37" stroke-width="1" stroke-opacity="0.3" />
        <text x="366" y="22" fill="#A0A0A0" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="600" text-transform="uppercase">TEMPO DE CUIDADO</text>
        <text x="366" y="42" fill="#D4AF37" font-family="'Cinzel', serif" font-size="18" font-weight="bold">${totalMinutes} min</text>
      </g>

      <!-- Lista de Notas -->
      ${noteBlocks.join('')}

      <!-- Rodapé -->
      <g transform="translate(45, ${footerY})">
        <line x1="0" y1="0" x2="510" y2="0" stroke="#D4AF37" stroke-width="0.8" stroke-opacity="0.3"/>
        <text x="0" y="22" fill="#D4AF37" font-family="'Cinzel', serif" font-size="11" font-weight="bold">TRESemmé Play • Autocuidado Gamificado</text>
        <text x="510" y="22" fill="#888888" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" text-anchor="end">Salvo no dispositivo • 100% Livre de crueldade</text>
      </g>
    </svg>
  `

  return { svgString, height: totalHeight }
}

export async function exportDiaryAsPng(options: ExportDiaryOptions): Promise<void> {
  const { svgString, height } = generateDiarySvgString(options)
  const width = 600

  return new Promise((resolve, reject) => {
    try {
      const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' })
      const blobUrl = URL.createObjectURL(svgBlob)

      const image = new Image()
      image.onload = () => {
        try {
          const canvas = document.createElement('canvas')
          const scale = 2 // Alta resolução retina
          canvas.width = width * scale
          canvas.height = height * scale

          const ctx = canvas.getContext('2d')
          if (!ctx) {
            URL.revokeObjectURL(blobUrl)
            reject(new Error('Contexto 2D indisponível'))
            return
          }

          ctx.scale(scale, scale)
          ctx.drawImage(image, 0, 0)
          URL.revokeObjectURL(blobUrl)

          canvas.toBlob((blob) => {
            if (!blob) {
              reject(new Error('Falha ao gerar PNG'))
              return
            }

            const downloadUrl = URL.createObjectURL(blob)
            const a = document.createElement('a')
            const dateStr = new Date().toISOString().slice(0, 10)
            a.download = `diario-autocuidado-tresemme-${dateStr}.png`
            a.href = downloadUrl
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
            URL.revokeObjectURL(downloadUrl)
            resolve()
          }, 'image/png')
        } catch (err) {
          URL.revokeObjectURL(blobUrl)
          reject(err)
        }
      }

      image.onerror = (err) => {
        URL.revokeObjectURL(blobUrl)
        reject(err)
      }

      image.src = blobUrl
    } catch (e) {
      reject(e)
    }
  })
}
