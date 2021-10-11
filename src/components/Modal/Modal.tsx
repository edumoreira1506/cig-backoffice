import React, { ReactNode } from 'react'
import ReactModal from 'react-modal'
import { Colors } from '@cig-platform/ui'

export interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export default function Modal({ children, isOpen, onClose, className }: ModalProps) {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{ overlay: { background: Colors.BlackTransparent, zIndex: 1000 } }}
      className={className}
    >
      {children}
    </ReactModal>
  )
}
