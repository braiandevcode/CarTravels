import { useCallback } from 'react'
import jsPDF from 'jspdf'
import { renderOffscreen } from '../../modules/utils/canvasRenderer'

export const useReceiptExport = () => {
  const shareImage = useCallback(async (elementId: string) => {
    const canvas: HTMLCanvasElement = await renderOffscreen(elementId)

    const blob: Blob | null = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, 'image/png'),
    )
    if (!blob) return

    const file: File = new File([blob], `resumen-${Date.now()}.png`, { type: 'image/png' })

    if (navigator.share && navigator.canShare?.({ files: [file] })) {
      await navigator.share({ files: [file] })
    } else {
      const url: string = URL.createObjectURL(blob)
      const a: HTMLAnchorElement = document.createElement('a')
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
