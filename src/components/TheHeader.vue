<template>
  <header class="header">
    <div v-if="isAuth" class="header__desktop">
      <div class="header__user-info">
        <div class="header__list">
          <p>Name: {{userInfo?.name}}</p>
          <p>Username: {{userInfo?.username}}</p>
          <p>Email: {{userInfo?.email}}</p>
        </div>
        <div class="header__list">
          <p>Address: {{userInfo?.address.street}}, {{userInfo?.address.suite}}, {{userInfo?.address.city}}, {{userInfo?.address.zipcode}}</p>
        </div>
        <div class="header__list">
          <p>Phone: {{userInfo?.phone}}</p>
          <p>Website: {{userInfo?.website}}</p>
        </div>
        <div class="header__list">
          <p>Company: {{userInfo?.company.name}}, {{userInfo?.company.catchPhrase}}, {{userInfo?.company.bs}}</p>
        </div>
      </div>
      <base-button
          class="header__logout"
          label="logout"
          @click.native="handleLogout"
      />
    </div>
    <div v-if="isAuth" class="header__mob">
      <div v-if="open" class="header__mob-user-info">
        <div class="header__list">
          <p>Name: {{userInfo?.name}}</p>
          <p>Username: {{userInfo?.username}}</p>
          <p>Email: {{userInfo?.email}}</p>
        </div>
        <div class="header__list">
          <p>Address: {{userInfo?.address.street}}, {{userInfo?.address.suite}}, {{userInfo?.address.city}}, {{userInfo?.address.zipcode}}</p>
        </div>
        <div class="header__list">
          <p>Phone: {{userInfo?.phone}}</p>
          <p>Website: {{userInfo?.website}}</p>
        </div>
        <div class="header__list">
          <p>Company: {{userInfo?.company.name}}, {{userInfo?.company.catchPhrase}}, {{userInfo?.company.bs}}</p>
        </div>
      </div>
      <button class="header__menu-button" @click="toggleMenu">|||</button>
      <base-button
          class="header__logout"
          label="logout"
          @click.native="handleLogout"
      />
    </div>
  </header>
</template>

<script>
import {mapGetters} from "vuex";
import BaseButton from "@/components/ui/BaseButton.vue";

export default {
  name: 'TheHeader',
  components: {BaseButton},
  props: {},
  data() {
    return {
      open: false
    }
  },
  computed: {
    ...mapGetters(['isAuth', 'userInfo'])
  },
  methods: {
    handleLogout() {
      console.log('aa')
      this.$store.dispatch('logout')
    },
    toggleMenu() {
      this.open = !this.open
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/main.scss";
.header {
  padding: 20px;
  background: #474747;
  position: relative;


  &__desktop {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    @media (max-width: 768px) {
      display: none;
    }
  }

  &__mob {
    display: none;
    @media (max-width: 768px) {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }

  &__mob-user-info {
    position: absolute;
    top: 100%;
    right: 0;
    left: 0;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    gap: 20px;
    background: #474747;

    & p {
      text-align: center;
    }
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

  &__logout {
    background: $error;
    max-width: 150px;

    &:hover {
      background: #811912;
    }
  }
}
</style>
