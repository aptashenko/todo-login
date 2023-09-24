<template>
  <div class="login-page">
    <LoginForm
        @set-user-info="$emit('set-user-info', $event)"
        @set-user-token="$emit('set-user-token', $event)"
    />
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
