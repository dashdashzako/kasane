<script setup lang="ts">
import { useRoute } from 'vue-router'
import colors from '../../data/colors.json'
import { computed } from 'vue'
import ColorsList from '@/components/colors-list.vue'

const route = useRoute()

const fallbackColor: (typeof colors.data)[number] = {
  hex: '#FFFFFF',
  kanji: '白',
  reading: 'しろ',
  section: 'さ行',
}

const currentColor = computed(() => {
  const color = colors.data.find(({ hex }) => hex === route.params.hexCode)

  if (color) {
    return color
  }

  return fallbackColor
})
</script>

<template>
  <section>
    <article>
      <Transition name="kanji" mode="out-in">
        <h1 class="kanji" :key="currentColor?.kanji">{{ currentColor?.kanji }}</h1>
      </Transition>
      <Transition name="reading" mode="out-in">
        <p class="reading" :key="currentColor?.kanji">{{ currentColor?.reading }}</p>
      </Transition>
    </article>

    <nav>
      <ColorsList class="colors-list" :contrast-color="route.params.hexCode" />
    </nav>

    <div class="wallpaper" />
  </section>
</template>

<style scoped>
section {
  display: grid;
  grid-template-columns: 1fr auto;
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
  overflow: auto;
}

.colors-list {
  --size: 1.5rem;
}

.wallpaper {
  grid-row: 1;
  grid-column: 1 / -1;
  z-index: -1;

  background-color: v-bind('route.params.hexCode');
  transition: background-color 2s ease-in-out;
}

article {
  --color: v-bind('route.params.hexCode');

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  color: oklch(from var(--color) calc((0.6 - l) * infinity) 0 0);
  transition: color 1s ease 0.2s;
}

.kanji {
  margin: 0;
  font-weight: lighter;

  font-size: clamp(2rem, 20vw, 8rem);
}

.reading {
  margin: 0;
  font-size: clamp(1rem, 10vw, 2rem);
}

.kanji-enter-active {
  transition: all 1s ease;
}

.reading-enter-active {
  transition: all 1s ease 0.4s;
}

.kanji-leave-active {
  transition: all 0.5s ease 0.15s;
}

.reading-leave-active {
  transition: all 0.5s ease;
}

.kanji-leave-to,
.reading-leave-to {
  opacity: 0;
  transform: translateY(3px);
}

.kanji-enter-from,
.reading-enter-from {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
