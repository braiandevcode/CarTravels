import { useCallback } from 'react'
import { toCanvas } from 'html-to-image'
import jsPDF from 'jspdf'

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
    const color = getComputedStyle(el).color
    const bg = getComputedStyle(el).backgroundColor
    const borderColor = getComputedStyle(el).borderColor

    const isLightText =
      color.includes('248, 250, 252') ||
      color.includes('148, 163, 184') ||
      color.includes('100, 116, 139') ||
      color.includes('20, 184, 166')

    const hasDarkBg =
      bg.includes('10, 15, 26') ||
      bg.includes('17, 24, 39') ||
      bg.includes('13, 20, 33') ||
      bg.includes('15, 23, 42')

    const hasDarkBorder =
      borderColor.includes('31, 41, 55') ||
      borderColor.includes('55, 65, 81')

    if (isLightText || hasDarkBg || hasDarkBorder) {
      if (isLightText) el.style.color = '#0f172a'
      if (hasDarkBg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
        el.style.backgroundColor = '#ffffff'
      }
      el.style.boxShadow = 'none'
      if (hasDarkBorder) el.style.borderColor = '#e2e8f0'
    }
  })
}

async function renderOffscreen(elementId: string): Promise<HTMLCanvasElement> {
  const original = document.getElementById(elementId)
  if (!original) throw new Error(`Element #${elementId} not found`)

  const clone = original.cloneNode(true) as HTMLElement
  clone.style.position = 'fixed'
  clone.style.left = '-9999px'
  clone.style.top = '0'
  clone.style.zIndex = '-1'

  document.body.appendChild(clone)
  fixExportStyles(clone)

  try {
    return await toCanvas(clone, {
      pixelRatio: 2,
      backgroundColor: '#ffffff',
      cacheBust: true,
    })
  } finally {
    document.body.removeChild(clone)
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

    pdf.addImage(
      imgData,
      'PNG',
      xPos,
      yPos,
      imgWidth,
      imgHeight
    )

    pdf.save(filename)
  }, [])

  return { shareImage, downloadPDF }
}
