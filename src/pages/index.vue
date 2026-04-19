<script setup lang="ts">
import ColorsList from '@/components/colors-list.vue'
</script>

<template>
  <article>
    <h1>
      <ruby>襲 <rp>(</rp><rt>かさね</rt><rp>)</rp></ruby>
    </h1>
    <p>Traditional Colors of Japan</p>
    <nav>
      <ColorsList class="colors-list" />
    </nav>
  </article>
</template>

<style lang="css" scoped>
article {
  height: var(--container-height);
  padding: 2.5rem 0 0;
  display: flex;
  flex-direction: column;
}

h1 {
  margin: 0 auto;

  font-size: clamp(2rem, 20vw, 8rem);
  font-weight: lighter;
  text-align: center;
}

rt {
  font-size: clamp(1rem, 5vw, 1.5rem);
}

p {
  margin: 1rem auto 3rem;

  padding: 0 1rem;

  font-size: clamp(1rem, 5vw, 2rem);
  line-height: 1;
  text-align: center;
}

nav {
  overflow: auto;
}

.colors-list {
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
