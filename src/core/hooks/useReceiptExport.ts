import { useCallback } from 'react'
import jsPDF from 'jspdf'
import { renderOffscreen } from '../../modules/utils/canvasRenderer'
import { ENameReceip } from '../enum/ENameReceip'
import { EExtentionFile } from '../enum/EExtentionFile'

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

  const downloadPDF = useCallback(async (elementId: string, filename = `${ENameReceip.NAME_SUMMARY}.${EExtentionFile.PDF}`) => {
    const canvas: HTMLCanvasElement = await renderOffscreen(elementId)

    const imgData: string = canvas.toDataURL('image/png');

    const pdf: jsPDF = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'a4',
      compress: true,
    })

    const pageWidth: number = pdf.internal.pageSize.getWidth()
    const pageHeight: number = pdf.internal.pageSize.getHeight()
    const margin: number = 12

    const maxImgWidth: number = pageWidth - margin * 2
    const maxImgHeight: number = pageHeight - margin * 2

    let imgWidth: number = maxImgWidth
    let imgHeight: number = (canvas.height * imgWidth) / canvas.width

    if (imgHeight > maxImgHeight) {
      const scale = maxImgHeight / imgHeight
      imgHeight = maxImgHeight
      imgWidth = imgWidth * scale
    }

    const xPos: number = margin + (maxImgWidth - imgWidth) / 2
    const yPos: number = margin

    pdf.addImage(imgData, 'PNG', xPos, yPos, imgWidth, imgHeight)

    pdf.save(filename)
  }, [])

  return { shareImage, downloadPDF }
}
