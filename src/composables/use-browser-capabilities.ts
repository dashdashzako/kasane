import { computed } from 'vue'

export const useBrowserCapabilities = () => {
  const supportsAnimations = computed(() => {
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  return {
    supportsAnimations,
  }
}
