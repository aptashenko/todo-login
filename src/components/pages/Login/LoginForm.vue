<template>
  <div class="login-form">
    <div class="login-form__header">
      <h2 class="login-form__title">
        description
      </h2>
    </div>
    <div class="login-form__content">
      <h2 class="login-form__subtitle">
        description
      </h2>
      <div class="login-form__inputs">
        <base-input
            v-for="input in form"
            v-model="input.value"
            :id="input.id"
            :placeholder="input.label"
            :type="input.type"
            :key="input.id"
            :error="input.error"
        />
        <p v-if="error" class="login-form__error text text-sm">{{error}}</p>
      </div>
      <base-button
          label="Register"
          :disabled="!isFormValid"
          :loading="loading"
          class="login-form__button"
          @click.native="auth"
      />
    </div>
  </div>
</template>

<script>
import BaseInput from "@/components/ui/BaseInput.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import { getUsers } from "@/api";
export default {
  name: 'LoginForm',
  components: {
    BaseButton,
    BaseInput
  },
  data() {
    return {
      loading: false,
      form: {
        email: {
          id: 1,
          value: '',
          label: 'Username',
          type: 'email',
        },
        phone: {
          id: 2,
          value: '',
          label: 'Phone Number',
          type: 'tel',
        }
      },
      error: ''
    }
  },
  computed: {
    isFormValid() {
      const emailValid = this.form.email.value.includes('@');
      const phoneValid = this.form.phone.value;

      return !!emailValid && !!phoneValid
    }
  },
  methods: {
    async auth() {
      this.loading = true
      try {
        const { data, status } = await getUsers()
        if (status === 200) {
          const email = this.form.email.value;
          const phone = this.form.phone.value;
          data.forEach(user => {
            if (user.email === email && user.phone === phone) {
              localStorage.setItem('token', 'token')
              localStorage.setItem('user', JSON.stringify(user))
              this.$router.push({name: 'home'})
            } else {
              this.error = 'User not found'
            }
          })
        }
      } catch(error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/main.scss';

.login-form {
  background: $gray-light;
  width: 447px;
  border-radius: 5px;

  &__header{
    padding: 15px 0;
    background: $gray-dark;
    border-radius: 5px 5px 0 0;
  }

  &__content {
    padding: 15px 25px 30px;
  }

  &__title {
    text-align: center;
    font-size: 17px;
    font-style: normal;
    font-weight: 400;
    line-height: 1.23;
    letter-spacing: -0.425px;
  }

  &__subtitle {
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 1.4;
    letter-spacing: -0.375px;
    margin-bottom: 15px;
  }

  &__inputs {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &__button {
    margin-top: 25px;
  }

  &__error {
    color: $error;
    margin: 0;
  }
}
</style>
