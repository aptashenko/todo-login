<template>
  <div class="home">
    <TodosList />
  </div>
</template>

<script>
import TodosList from "@/components/pages/Home/TodosList.vue";

export default {
  name: 'HomeView',
  components: {TodosList},
}
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  max-height: 620px;
}
</style>
