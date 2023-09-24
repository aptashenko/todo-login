<template>
  <div class="default-layout">
    <header class="default-layout__header">
      <div v-if="isAuth" class="default-layout__user-info">
        <div class="default-layout__list">
          <p>Name: {{userInfo.name}}</p>
          <p>Username: {{userInfo.username}}</p>
          <p>Email: {{userInfo.email}}</p>
        </div>
        <div class="default-layout__list">
          <p>Address: {{userInfo.address.street}}, {{userInfo.address.suite}}, {{userInfo.address.city}}, {{userInfo.address.zipcode}}</p>
        </div>
        <div class="default-layout__list">
          <p>Phone: {{userInfo.phone}}</p>
          <p>Website: {{userInfo.website}}</p>
        </div>
        <div class="default-layout__list">
          <p>Company: {{userInfo.company.name}}, {{userInfo.company.catchPhrase}}, {{userInfo.company.bs}}</p>
        </div>
      </div>
      <button v-if="isAuth" @click="logout">
        logout
      </button>
    </header>
    <div class="default-layout__main">
      <slot />
    </div>
    <footer class="default-layout__footer" />
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
  computed: {
    isAuth() {
      return localStorage.getItem('token')
    },
    userInfo() {
      return JSON.parse(localStorage.getItem('user'))
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      this.$router.push({name: 'login'})
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/main.scss';

.default-layout {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: $gray-bold;

  &__header {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 20px;
    background: #474747;
    min-height: 65px;
    box-sizing: border-box;
  }

  &__main {
    flex-grow: 1;
  }

  &__footer {
    background: #474747;
    height: 200px;
  }

  &__user-info {
    flex-grow: 1;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding-right: 20px;
    gap: 20px;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 5px;

    & p {
      color: #fff;
    }
  }
}
</style>
