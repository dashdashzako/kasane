import { describe, expect, test, vi } from 'vitest'

import { useBrowserCapabilities } from './use-browser-capabilities'

const mockMatchMedia = (matches: Record<string, boolean> = {}) => {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: matches[query] ?? false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }))
}

describe('useBrowserCapabilities', () => {
  test('reduced motion is supported', () => {
    mockMatchMedia({ '(prefers-reduced-motion: reduce)': true })

    const { supportsAnimations } = useBrowserCapabilities()

    expect(supportsAnimations.value).toBe(false)
  })

  test('reduced motion is not supported', () => {
    mockMatchMedia({ '(prefers-reduced-motion: reduce)': false })

    const { supportsAnimations } = useBrowserCapabilities()

    expect(supportsAnimations.value).toBe(true)
  })
})
