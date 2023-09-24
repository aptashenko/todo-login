<template>
  <div id="app">
    <default-layout>
      <router-view/>
    </default-layout>
  </div>
</template>

<style lang="scss">
@import '@/assets/styles/nomralize.css';
* {
  font-family: 'Inter', sans-serif;
}

html {
  height: 100%;
}

body {
  height: 100%;
}

h1, h2, h3, h4, h5, p, ul {
  margin: 0;
}

#app {
  height: 100%;
}
</style>
<script setup>
import DefaultLayout from "@/layouts/default.vue";
</script>
