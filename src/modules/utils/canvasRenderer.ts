import { toCanvas } from "html-to-image";

interface IRgb{
  r: number; 
  g: number; 
  b: number
}

const parseRgb = (color: string): IRgb | null => {
  const m: RegExpMatchArray | null = color.match(/rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\)/)
  if (!m) return null

  const r: number = Number(m[1])
  const g: number = Number(m[2])
  const b: number = Number(m[3])

  // RECHAZAR SI ALGUN VALOR ES MAYOR A 255
  if (r > 255 || g > 255 || b > 255) return null

  return { r, g, b }
}

const luminance = (color: string): number | null => {
  const p: IRgb | null = parseRgb(color)
  if (!p) return null
  return 0.299 * p.r + 0.587 * p.g + 0.114 * p.b
}

const fixExportStyles = (element: HTMLElement): void => {
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

  const all: NodeListOf<HTMLElement> = element.querySelectorAll<HTMLElement>('*')
  all.forEach((el) => {
    const computed: CSSStyleDeclaration = getComputedStyle(el)
    const bgLum: number | null = luminance(computed.backgroundColor)
    const textLum: number | null = luminance(computed.color)
    const borderLum: number | null = luminance(computed.borderColor)

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

export const renderOffscreen = async (elementId: string): Promise<HTMLCanvasElement> => {
  const original: HTMLElement | null = document.getElementById(elementId)
  if (!original) throw new Error(`Element #${elementId} not found`)

  const originalWidth: number = original.offsetWidth
  const originalHeight: number = original.offsetHeight
  const clone: HTMLElement = original.cloneNode(true) as HTMLElement
  clone.style.width = originalWidth + 'px'
  clone.style.height = originalHeight + 'px'

  const wrapper: HTMLDivElement = document.createElement('div')
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