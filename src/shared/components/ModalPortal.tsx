import { type ReactNode } from 'react'
import { createPortal } from 'react-dom'

interface ModalPortalProps {
  children: ReactNode
}

const ModalPortal = ({ children }: ModalPortalProps) => {
  return createPortal(children, document.body)
}

export default ModalPortal;
