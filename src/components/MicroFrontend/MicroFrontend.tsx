import React, { useEffect } from 'react'
import { IBreeder } from '@cig-platform/types'

export interface MicroFrontendProps {
  name: string;
  host: string;
  containerId: string;
  breeder?: Partial<IBreeder>;
}

export default function MicroFrontend({ name, host, containerId, breeder }: MicroFrontendProps) {
  useEffect(() => {
    const renderMicroFrontend = () => {
      const windowRender = (window as any)?.[`render${name}`]

      if (windowRender) {
        if (breeder) {
          windowRender(containerId, breeder)
        }
      }
    }

    fetch(`${host}/asset-manifest.json`)
      .then((res) => res.json())
      .then((manifest) => {
        const script = document.createElement('script')

        script.id = `script-${containerId}`
        script.crossOrigin = ''
        script.src = `${host}${manifest.files['main.js']}`
        script.onload = () => {
          renderMicroFrontend()
        }
        document.head.appendChild(script)
      })

    return () => {
      (window as any)[`unmount${name}`] && (window as any)[`unmount${name}`](`${name}-container`)
    }
  })

  return <main id={`${name}-container`} />
}
