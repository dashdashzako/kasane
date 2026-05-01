<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { colors } from '../data/colors'

const { contrastColor = '#FFF' } = defineProps<{
  contrastColor?: string
}>()
</script>

<template>
  <ol>
    <li v-for="color in colors" :key="color.kanji" :style="`--color: ${color.hex}`">
      <RouterLink
        :to="{ name: '/color/[hepburn]', params: { hepburn: color.hepburn } }"
        :aria-label="color.kanji"
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
  gap: 4px;
  padding: 2px 0.5rem;

  transition: width 0.12s ease-out;
}

li {
  border-radius: 50%;
  padding: 0.2rem;
}

a {
  display: block;
  width: var(--size);
  height: var(--size);
  border-radius: 50%;

  background-color: var(--color);

  overflow: auto;

  outline-width: 2px;
  outline-style: solid;
  outline-color: oklch(from var(--contrast-color) calc((0.6 - l) * infinity) 0 0);

  transition:
    outline-width 0.13s ease,
    outline-color 1.4s ease 0.5s;

  &.active-color,
  &:not(.active-color):hover,
  &:not(.active-color):focus-visible {
    outline-width: 4px;
  }
}
</style>
