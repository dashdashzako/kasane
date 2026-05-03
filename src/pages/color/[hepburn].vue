<script setup lang="ts">
import { useRoute } from 'vue-router'
import { colors } from '../../data/colors'
import { computed, watchEffect } from 'vue'
import ColorsList from '@/components/colors-list.vue'
import VisuallyHidden from '@/components/visually-hidden.vue'
import { useBrowserCapabilities } from '@/composables/use-browser-capabilities'

const route = useRoute()

const fallbackColor: (typeof colors)[number] = {
  hepburn: 'shiro',
  hex: '#FFFFFF',
  kanji: '白',
  reading: 'しろ',
  section: 'さ行',
}

const { supportsAnimations } = useBrowserCapabilities()

const currentColor = computed(() => {
  const color = colors.find(({ hepburn }) => hepburn === route.params.hepburn)

  if (color) {
    return color
  }

  return fallbackColor
})

watchEffect(() => {
  const element = document.getElementById(route.params.hepburn)

  if (!element) {
    return
  }

  const scrollBehavior: ScrollOptions['behavior'] = supportsAnimations.value ? 'smooth' : 'auto'

  element.scrollIntoView({ behavior: scrollBehavior, block: 'center' })
})
</script>

<template>
  <section>
    <article>
      <Transition name="kanji" mode="out-in">
        <h1 class="kanji" :key="currentColor.hepburn">{{ currentColor.kanji }}</h1>
      </Transition>
      <dl>
        <VisuallyHidden tag="dt">Reading</VisuallyHidden>
        <Transition name="reading" mode="out-in">
          <dd class="reading" :key="currentColor.hepburn">{{ currentColor.reading }}</dd>
        </Transition>
        <VisuallyHidden tag="dt">Hex code</VisuallyHidden>
        <Transition name="hex-code" mode="out-in">
          <dd class="hex-code" :key="currentColor.hepburn">{{ currentColor.hex }}</dd>
        </Transition>
      </dl>
    </article>

    <nav>
      <ColorsList class="colors-list" :contrast-color="currentColor.hex" />
    </nav>
  </section>
</template>

<style scoped>
section {
  display: grid;
  grid-template-columns: 1fr auto;

  background-color: v-bind('currentColor.hex');

  @media (prefers-reduced-motion: no-preference) {
    transition: background-color 2s ease-in-out;
  }
}

article,
nav {
  grid-row: 1;
}

article {
  grid-column: 1;
}

nav {
  grid-column: 2;
  max-height: var(--container-height);
  overflow-y: auto;
}

.colors-list {
  --size: 1.5rem;
}

article {
  --color: v-bind('currentColor.hex');

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  color: oklch(from var(--color) calc((0.6 - l) * infinity) 0 0);

  @media (prefers-reduced-motion: no-preference) {
    transition: color 1s ease 0.2s;
  }
}

.kanji {
  margin: 0;
  font-weight: lighter;

  font-size: clamp(2rem, 20vw, 8rem);
}

dl,
dt,
dd {
  margin: 0;
  padding: 0;
  text-align: center;
}

.reading {
  margin: 0;
  font-size: clamp(1rem, 10vw, 3rem);
}

.hex-code {
  margin: 0;
  font-size: clamp(1rem, 5vw, 1.3rem);
  font-weight: 300;
  font-variant-numeric: slashed-zero tabular-nums;
  letter-spacing: 0.1em;
}

@media (prefers-reduced-motion: no-preference) {
  .kanji-enter-active {
    transition: all 1s ease;
  }

  .reading-enter-active {
    transition: all 1s ease 0.3s;
  }

  .hex-code-enter-active {
    transition: all 1s ease 0.6s;
  }

  .kanji-leave-active {
    transition: all 0.5s ease 0.3s;
  }

  .reading-leave-active {
    transition: all 0.5s ease 0.15s;
  }

  .hex-code-leave-active {
    transition: all 0.5s ease;
  }

  .kanji-leave-to,
  .hex-code-leave-to,
  .reading-leave-to {
    opacity: 0;
    transform: translateY(3px);
  }

  .kanji-enter-from,
  .hex-code-enter-from,
  .reading-enter-from {
    opacity: 0;
    transform: translateY(-4px);
  }
}
</style>
