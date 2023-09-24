<template>
  <div class="default-layout">
    <TheHeader />
    <div class="default-layout__main">
      <slot />
    </div>
    <footer class="default-layout__footer" />
  </div>
</template>

<script>
import TheHeader from "@/components/TheHeader.vue";
export default {
  name: 'DefaultLayout',
  components: {TheHeader},
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/main.scss';

.default-layout {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: $gray-bold;


  &__main {
    flex-grow: 1;
  }

  &__footer {
    background: #474747;
    height: 200px;
  }
}
</style>
