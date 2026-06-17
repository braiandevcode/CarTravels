import { type ReactNode } from 'react'
import { createPortal } from 'react-dom'

interface IModalPortalProps {
  children: ReactNode
}

const ModalPortal = ({ children }: IModalPortalProps): ReactNode => {
  return createPortal(children, document.body)
}

export default ModalPortal;
