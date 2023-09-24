<template>
  <div class="login-page">
    <LoginForm />
  </div>
</template>

<script>
import LoginForm from "@/components/pages/Login/LoginForm.vue";

export default {
  name: 'LoginPage',
  components: {LoginForm},
}
</script>

<style lang="scss" scoped>
.login-page {
  display: grid;
  place-items: center;
  height: 100%;
}
</style>
