import { useCallback } from 'react'
import { toCanvas } from 'html-to-image'
import jsPDF from 'jspdf'

function parseRgb(color: string): { r: number; g: number; b: number } | null {
  const m = color.match(/rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/)
  if (!m) return null
  return { r: Number(m[1]), g: Number(m[2]), b: Number(m[3]) }
}

function luminance(color: string): number | null {
  const p = parseRgb(color)
  if (!p) return null
  return 0.299 * p.r + 0.587 * p.g + 0.114 * p.b
}

function fixExportStyles(element: HTMLElement): void {
  element.style.overflow = 'visible'
  element.style.maxHeight = 'none'
  element.style.height = 'auto'
  element.style.background = '#ffffff'
  element.style.color = '#0f172a'
  element.style.position = 'relative'
  element.style.zIndex = '1'
  element.style.border = 'none'
  element.style.borderRadius = '0'
  element.style.margin = '0'
  element.style.boxShadow = 'none'

  const all = element.querySelectorAll<HTMLElement>('*')
  all.forEach((el) => {
    const computed = getComputedStyle(el)
    const bgLum = luminance(computed.backgroundColor)
    const textLum = luminance(computed.color)
    const borderLum = luminance(computed.borderColor)

    if (bgLum !== null && bgLum < 128) {
      el.style.backgroundColor = '#ffffff'
    }
    el.style.boxShadow = 'none'

    if (textLum !== null && textLum > 180) {
      el.style.color = '#0f172a'
    }

    if (borderLum !== null && borderLum < 100) {
      el.style.borderColor = '#e2e8f0'
    }
  })
}

async function renderOffscreen(elementId: string): Promise<HTMLCanvasElement> {
  const original = document.getElementById(elementId)
  if (!original) throw new Error(`Element #${elementId} not found`)

  const originalWidth = original.offsetWidth
  const originalHeight = original.offsetHeight
  const clone = original.cloneNode(true) as HTMLElement
  clone.style.width = originalWidth + 'px'
  clone.style.height = originalHeight + 'px'

  const wrapper = document.createElement('div')
  wrapper.style.position = 'fixed'
  wrapper.style.top = '0'
  wrapper.style.left = '0'
  wrapper.style.width = '0'
  wrapper.style.height = '0'
  wrapper.style.overflow = 'visible'
  wrapper.style.zIndex = '-1000'
  wrapper.style.pointerEvents = 'none'

  clone.style.position = 'absolute'
  clone.style.top = '0'
  clone.style.left = '0'

  wrapper.appendChild(clone)
  document.body.appendChild(wrapper)
  fixExportStyles(clone)

  try {
    return await toCanvas(clone, {
      pixelRatio: 2,
      backgroundColor: '#ffffff',
      cacheBust: true,
    })
  } finally {
    document.body.removeChild(wrapper)
  }
}

export function useReceiptExport() {
  const shareImage = useCallback(async (elementId: string) => {
    const canvas = await renderOffscreen(elementId)

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, 'image/png'),
    )
    if (!blob) return

    const file = new File([blob], `resumen-${Date.now()}.png`, { type: 'image/png' })

    if (navigator.share && navigator.canShare?.({ files: [file] })) {
      await navigator.share({ files: [file] })
    } else {
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `resumen-${Date.now()}.png`
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [])

  const downloadPDF = useCallback(async (elementId: string, filename = 'resumen-cartravels.pdf') => {
    const canvas = await renderOffscreen(elementId)

    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'a4',
      compress: true,
    })

    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    const margin = 12

    const maxImgWidth = pageWidth - margin * 2
    const maxImgHeight = pageHeight - margin * 2

    let imgWidth = maxImgWidth
    let imgHeight = (canvas.height * imgWidth) / canvas.width

    if (imgHeight > maxImgHeight) {
      const scale = maxImgHeight / imgHeight
      imgHeight = maxImgHeight
      imgWidth = imgWidth * scale
    }

    const xPos = margin + (maxImgWidth - imgWidth) / 2
    const yPos = margin

    pdf.addImage(imgData, 'PNG', xPos, yPos, imgWidth, imgHeight)

    pdf.save(filename)
  }, [])

  return { shareImage, downloadPDF }
}
