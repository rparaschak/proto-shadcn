import { useState, useRef, useCallback, type WheelEvent, type PointerEvent } from 'react'

export interface Transform {
  x: number
  y: number
  scale: number
}

const MIN_SCALE = 0.4
const MAX_SCALE = 2.5

/**
 * Fluid zoom + pan for the Risk Picture canvas. Wheel zooms toward the cursor;
 * dragging empty canvas pans. Zoom is never changed programmatically by edit or
 * other functions (epic: "avoid a change of zoom on edit") — only the user's
 * wheel/controls move it.
 */
export function useZoomPan(initial: Transform = { x: 0, y: 0, scale: 1 }) {
  const [transform, setTransform] = useState<Transform>(initial)
  const panning = useRef(false)
  const last = useRef({ x: 0, y: 0 })

  const onWheel = useCallback((e: WheelEvent) => {
    e.preventDefault()
    setTransform((t) => {
      const delta = -e.deltaY * 0.0015
      const nextScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, t.scale * (1 + delta)))
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
      const cx = e.clientX - rect.left
      const cy = e.clientY - rect.top
      // Keep the point under the cursor fixed while scaling.
      const ratio = nextScale / t.scale
      return {
        scale: nextScale,
        x: cx - (cx - t.x) * ratio,
        y: cy - (cy - t.y) * ratio,
      }
    })
  }, [])

  const onPointerDown = useCallback((e: PointerEvent) => {
    // Only start panning from the canvas background, not from a card.
    if (e.target !== e.currentTarget) return
    panning.current = true
    last.current = { x: e.clientX, y: e.clientY }
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }, [])

  const onPointerMove = useCallback((e: PointerEvent) => {
    if (!panning.current) return
    const dx = e.clientX - last.current.x
    const dy = e.clientY - last.current.y
    last.current = { x: e.clientX, y: e.clientY }
    setTransform((t) => ({ ...t, x: t.x + dx, y: t.y + dy }))
  }, [])

  const onPointerUp = useCallback((e: PointerEvent) => {
    panning.current = false
    try {
      ;(e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId)
    } catch {
      // pointer may already be released
    }
  }, [])

  const zoomBy = useCallback((factor: number) => {
    setTransform((t) => ({
      ...t,
      scale: Math.min(MAX_SCALE, Math.max(MIN_SCALE, t.scale * factor)),
    }))
  }, [])

  const reset = useCallback(() => setTransform(initial), [initial])

  return {
    transform,
    isPanning: panning,
    handlers: { onWheel, onPointerDown, onPointerMove, onPointerUp },
    zoomBy,
    reset,
  }
}
