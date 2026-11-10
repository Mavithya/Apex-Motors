'use client'

import { useEffect, useRef, useState } from 'react'
import { RotateCcw, RotateCw, X } from 'lucide-react'
import type { ModelViewerElement } from '@google/model-viewer'
import type { Vehicle } from '@/types/vehicle'

const INITIAL_ORBIT = '0deg 75deg auto'
const INITIAL_FOV = '30deg'

export function Vehicle3DModal({ name, model3DUrl, attribution, onClose }: { name: string; model3DUrl?: string; attribution?: Vehicle['model3DAttribution']; onClose: () => void }) {
  const hostRef = useRef<HTMLDivElement>(null)
  const modelRef = useRef<ModelViewerElement | null>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'error' | 'unavailable'>(model3DUrl ? 'loading' : 'unavailable')
  const [autoRotate, setAutoRotate] = useState(false)

  useEffect(() => {
    const oldOverflow = document.body.style.overflow
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = oldOverflow
      document.removeEventListener('keydown', onKeyDown)
      previousFocus?.focus()
    }
  }, [onClose])

  useEffect(() => {
    if (!model3DUrl) return
    let cancelled = false
    let model: ModelViewerElement | null = null

    async function mountModel() {
      try {
        const { ModelViewerElement } = await import('@google/model-viewer')
        if (cancelled || !hostRef.current) return
        // Meshopt is required by the locally hosted, compressed Corolla Cross GLB.
        ModelViewerElement.meshoptDecoderLocation = '/models/meshopt_decoder.js'
        model = document.createElement('model-viewer')
        modelRef.current = model
        model.setAttribute('src', model3DUrl!)
        model.setAttribute('alt', `Interactive 3D model representing ${name}`)
        model.setAttribute('camera-controls', '')
        model.setAttribute('touch-action', 'none')
        model.setAttribute('camera-orbit', INITIAL_ORBIT)
        model.setAttribute('min-camera-orbit', 'auto 35deg auto')
        model.setAttribute('max-camera-orbit', 'auto 120deg auto')
        model.setAttribute('field-of-view', INITIAL_FOV)
        model.setAttribute('min-field-of-view', '18deg')
        model.setAttribute('max-field-of-view', '45deg')
        model.setAttribute('shadow-intensity', '0.55')
        model.setAttribute('exposure', '1.1')
        model.setAttribute('interaction-prompt', 'none')
        model.setAttribute('loading', 'eager')
        model.style.width = '100%'
        model.style.height = '100%'
        model.style.backgroundColor = '#f6f5f1'
        model.addEventListener('load', () => setStatus('ready'))
        model.addEventListener('error', () => setStatus('error'))
        hostRef.current.appendChild(model)
      } catch {
        if (!cancelled) setStatus('error')
      }
    }

    void mountModel()
    return () => {
      cancelled = true
      model?.remove()
      modelRef.current = null
    }
  }, [model3DUrl, name])

  function resetCamera() {
    const model = modelRef.current
    if (!model) return
    model.setAttribute('camera-orbit', INITIAL_ORBIT)
    model.setAttribute('field-of-view', INITIAL_FOV)
    model.resetTurntableRotation()
  }

  function toggleAutoRotate() {
    const next = !autoRotate
    setAutoRotate(next)
    if (next) modelRef.current?.setAttribute('auto-rotate', '')
    else modelRef.current?.removeAttribute('auto-rotate')
  }

  return (
    <div
      role="presentation"
      onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/85 p-2 backdrop-blur-[3px] sm:p-5"
    >
      <section role="dialog" aria-modal="true" aria-label={`${name} 3D vehicle viewer`} className="flex h-[min(92dvh,900px)] w-full max-w-[1440px] flex-col overflow-hidden bg-white shadow-2xl sm:h-[min(90dvh,940px)]">
        <header className="flex shrink-0 items-center justify-between gap-4 border-b border-line px-4 py-3 sm:px-7 sm:py-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-accent">Apex Motors · 3D showroom</p>
            <h2 className="mt-0.5 text-base font-extrabold tracking-tight text-ink sm:text-xl">{name}</h2>
          </div>
          <button ref={closeRef} type="button" onClick={onClose} aria-label="Close 3D viewer" className="flex h-10 w-10 shrink-0 items-center justify-center border border-line text-ink transition-colors hover:border-ink hover:bg-paper">
            <X className="h-5 w-5" aria-hidden />
          </button>
        </header>

        <div className="relative min-h-0 flex-1 bg-paper">
          <div ref={hostRef} className="absolute inset-0" aria-label={`${name} interactive 3D model`} />
          {status !== 'ready' && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-paper/90 px-6 text-center">
              {status === 'loading' ? (
                <div role="status" className="flex flex-col items-center gap-4 text-sm font-semibold text-graphite">
                  <span className="h-8 w-8 animate-spin rounded-full border-2 border-line border-t-accent" /> Loading 3D vehicle…
                </div>
              ) : (
                <div role="status" className="max-w-sm text-sm leading-relaxed text-graphite">
                  <p className="text-lg font-extrabold text-ink">{status === 'unavailable' ? '3D model unavailable' : 'Unable to load the 3D model'}</p>
                  <p className="mt-2">{status === 'unavailable' ? 'A 3D model has not been added for this vehicle yet.' : 'Please try again later. The vehicle photographs remain available in the gallery.'}</p>
                </div>
              )}
            </div>
          )}
          {status === 'ready' && <p className="pointer-events-none absolute bottom-3 left-1/2 w-max max-w-[90%] -translate-x-1/2 bg-white/90 px-3 py-2 text-center text-[11px] font-medium text-muted shadow-sm sm:bottom-5 sm:text-xs">Drag to rotate · Scroll or pinch to zoom</p>}
        </div>

        <footer className="flex shrink-0 flex-col gap-3 border-t border-line px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-7 sm:py-4">
          <p className="max-w-2xl text-[11px] leading-relaxed text-muted sm:text-xs">
            {model3DUrl ? 'Representative 3D model; vehicle year and trim may differ.' : 'No 3D model has been configured for this vehicle.'}
            {attribution && <> Model by <a href={attribution.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-ink">{attribution.creator}</a>, {attribution.license}.</>}
          </p>
          <div className="flex shrink-0 gap-2">
            <button type="button" onClick={resetCamera} disabled={status !== 'ready'} className="flex h-10 flex-1 items-center justify-center gap-2 border border-line px-3 text-xs font-bold text-ink transition-colors hover:border-ink disabled:cursor-not-allowed disabled:opacity-40 sm:flex-none">
              <RotateCcw className="h-4 w-4" aria-hidden /> Reset view
            </button>
            <button type="button" onClick={toggleAutoRotate} disabled={status !== 'ready'} aria-pressed={autoRotate} className="flex h-10 flex-1 items-center justify-center gap-2 border border-ink bg-ink px-3 text-xs font-bold text-white transition-colors hover:bg-graphite disabled:cursor-not-allowed disabled:opacity-40 sm:flex-none">
              <RotateCw className="h-4 w-4" aria-hidden /> Auto rotate {autoRotate ? 'on' : 'off'}
            </button>
          </div>
        </footer>
      </section>
    </div>
  )
}
