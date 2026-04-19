<script setup lang="ts">
const { tag = 'span' } = defineProps<{ tag?: string }>()
</script>

<template>
  <component :is="tag" class="visually-hidden"><slot /></component>
</template>

<style lang="css" scoped>
.visually-hidden {
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}
</style>
