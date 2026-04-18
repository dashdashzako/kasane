<script setup lang="ts">
import ColorsList from '@/components/colors-list.vue'
</script>

<template>
  <article>
    <h1>襲</h1>
    <p>Traditional Colors of Japan</p>
    <nav>
      <ColorsList class="colors-list" />
    </nav>
  </article>
</template>

<style lang="css" scoped>
h1 {
  margin: 0 auto;

  font-size: clamp(2rem, 20vw, 8rem);
  font-weight: lighter;
  text-align: center;
}

p {
  margin: 1rem auto 3rem;

  padding: 0 1rem;

  font-size: clamp(1rem, 6vw, 2rem);
  line-height: 1;
  text-align: center;
}

.colors-list {
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
