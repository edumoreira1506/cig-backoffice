import React, { useEffect } from 'react'

export interface MicroFrontendProps {
  name: string;
  host: string;
  containerId: string;
  breederId?: string;
  poultryId?: string;
  callbacks?: Record<string, () => void>;
}

export default function MicroFrontend({
  name,
  host,
  containerId,
  breederId,
  poultryId,
  callbacks
}: MicroFrontendProps) {
  useEffect(() => {
    const renderMicroFrontend = () => {
      const windowRender = (window as any)?.[`render${name}`]

      if (windowRender) {
        if (breederId && !poultryId) {
          windowRender(containerId, breederId)
        }
        
        if (breederId && poultryId) {
          windowRender(containerId, breederId, poultryId, callbacks)
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
  }, [name, host, containerId, poultryId, callbacks])

  return <main id={`${name}-container`} />
}
