import { useCallback } from 'react'
import { toCanvas } from 'html-to-image'
import jsPDF from 'jspdf'

const prepareElementForExport = (element: HTMLElement): (() => void) => {
  const savedStyles: Map<HTMLElement, string> = new Map()
  const savedDescendantStyles: Map<HTMLElement, string> = new Map()

  const saveAndModifyParent = (el: HTMLElement) => {
    savedStyles.set(el, el.getAttribute('style') || '')

    el.style.overflow = 'visible'
    el.style.maxHeight = 'none'
    el.style.height = 'auto'
  }

  const elementsToHide: HTMLElement[] = []

  let current: HTMLElement | null = element
  while (current) {
    if (current.classList && current.classList.contains('no-print')) {
      elementsToHide.push(current)
      savedStyles.set(current, current.getAttribute('style') || '')
    } else if (current !== document.body && current !== document.documentElement) {
      const computed = window.getComputedStyle(current)
      if (
        computed.maxHeight !== 'none' ||
        computed.overflow !== 'visible' ||
        computed.height !== 'auto'
      ) {
        saveAndModifyParent(current)
      } else {
        savedStyles.set(current, current.getAttribute('style') || '')
      }
    }

    if (current !== element && current !== document.body && current !== document.documentElement) {
      const computed = window.getComputedStyle(current)
      const currentBg = computed.backgroundColor
      const hasBg = currentBg !== 'rgba(0, 0, 0, 0)' && currentBg !== 'transparent'

      if (hasBg && (
        currentBg.includes('10, 15, 26') ||
        currentBg.includes('17, 24, 39') ||
        currentBg.includes('13, 20, 33') ||
        currentBg.includes('15, 23, 42')
      )) {
        if (!savedStyles.has(current)) {
          savedStyles.set(current, current.getAttribute('style') || '')
        }
        current.style.backgroundColor = '#ffffff'
        current.style.boxShadow = 'none'
      }
    }

    current = current.parentElement
  }

  elementsToHide.forEach((el) => {
    el.style.display = 'none'
  })

  if (!savedStyles.has(element)) {
    savedStyles.set(element, element.getAttribute('style') || '')
  }
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
  element.style.padding = element.style.padding || '24px'

  const collectElements = (el: HTMLElement): HTMLElement[] => {
    const elements: HTMLElement[] = [el]
    Array.from(el.children).forEach((child) => {
      if (child instanceof HTMLElement) {
        elements.push(...collectElements(child))
      }
    })
    return elements
  }

  const allDescendants = collectElements(element)

  allDescendants.forEach((el) => {
    const computed = window.getComputedStyle(el)
    const currentColor = computed.color
    const isLightText =
      currentColor.includes('248, 250, 252') ||
      currentColor.includes('148, 163, 184') ||
      currentColor.includes('100, 116, 139') ||
      currentColor.includes('20, 184, 166')

    const currentBg = computed.backgroundColor
    const hasDarkBg =
      currentBg.includes('10, 15, 26') ||
      currentBg.includes('17, 24, 39') ||
      currentBg.includes('13, 20, 33') ||
      currentBg.includes('15, 23, 42')

    const currentBorder = computed.borderColor
    const hasDarkBorder =
      currentBorder.includes('31, 41, 55') ||
      currentBorder.includes('55, 65, 81')

    const needsModification = isLightText || hasDarkBg || hasDarkBorder

    if (needsModification) {
      savedDescendantStyles.set(el, el.getAttribute('style') || '')

      if (isLightText) {
        el.style.color = '#0f172a'
      }
      if (hasDarkBg && currentBg !== 'rgba(0, 0, 0, 0)' && currentBg !== 'transparent') {
        el.style.backgroundColor = '#ffffff'
      }
      el.style.boxShadow = 'none'
      if (hasDarkBorder) {
        el.style.borderColor = '#e2e8f0'
      }
    }
  })

  void element.offsetHeight

  return () => {
    savedDescendantStyles.forEach((style, el) => {
      el.setAttribute('style', style)
    })

    savedStyles.forEach((style, el) => {
      el.setAttribute('style', style)
    })

    void element.offsetHeight
  }
}

export function useReceiptExport() {
  const shareImage = useCallback(async (elementId: string) => {
    const element = document.getElementById(elementId)
    if (!element) return

    const cleanup = prepareElementForExport(element)

    try {
       const canvas = await toCanvas(element, {
         pixelRatio: 2,
         backgroundColor: '#ffffff',
         cacheBust: true,
       })

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
    } finally {
      cleanup()
    }
  }, [])

  const downloadPDF = useCallback(async (elementId: string, filename = 'resumen-cartravels.pdf') => {
    const element = document.getElementById(elementId)
    if (!element) return

    const cleanup = prepareElementForExport(element)

    try {
       const canvas = await toCanvas(element, {
         pixelRatio: 2,
         backgroundColor: '#ffffff',
         cacheBust: true,
       })

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
    } finally {
      cleanup()
    }
  }, [])

  return { shareImage, downloadPDF }
}
