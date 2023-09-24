<template>
  <div id="app">
    <default-layout>
      <router-view/>
    </default-layout>
  </div>
</template>

<script>
import DefaultLayout from '@/layouts/default.vue'
import {mapGetters} from "vuex";
export default {
  name: 'App',
  components: {DefaultLayout},
  computed: {
    ...mapGetters(['isAuth'])
  },
  mounted() {
    if (this.isAuth) this.$store.dispatch('getUserData')
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/nomralize.css';
* {
  font-family: 'Roboto', sans-serif;
  box-sizing: border-box;
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
