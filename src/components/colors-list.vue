<script setup lang="ts">
import { colors } from '../data/colors'

const { contrastColor = '#FFFFFF' } = defineProps<{
  contrastColor?: string
}>()
</script>

<template>
  <ol>
    <li v-for="color in colors" :key="color.kanji" :style="`--color: ${color.hex}`">
      <router-link
        :to="{ name: '/color/[hepburn]', params: { hepburn: color.hepburn } }"
        :aria-label="color.kanji"
        :id="color.hepburn"
        exact-active-class="active-color"
      />
    </li>
  </ol>
</template>

<style scoped>
ol,
li {
  list-style: none;
}

ol {
  --size: 1.25rem;
  --contrast-color: v-bind('contrastColor');

  display: flex;
  flex-direction: column;

  margin: 0;
  padding: 2px 0.5rem;
}

li {
  padding: 2px;
}

a {
  display: block;
  width: var(--size);
  height: var(--size);

  border-radius: 2px;

  background-color: var(--color);

  overflow: auto;

  outline-width: 1px;
  outline-style: solid;
  outline-color: oklch(from var(--contrast-color) calc((0.6 - l) * infinity) 0 0);

  @media (prefers-reduced-motion: no-preference) {
    transition: border-radius 0.13s ease-out;
  }

  &.active-color,
  &:not(.active-color):hover,
  &:not(.active-color):focus-visible {
    outline-width: 2px;
    border-radius: 50%;
  }
}
</style>
