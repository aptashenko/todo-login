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
            v-maska
            v-for="input in form"
            v-model="input.value"
            :mask="input.mask"
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
import { vMaska } from "maska"

export default {
  name: 'LoginForm',
  directives: { maska: vMaska },
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
      const payload = {
        email: this.form.email.value,
        phone: this.form.phone.value
      }
      const errorMessage = await this.$store.dispatch('signIn', payload)
      if (errorMessage) this.error = errorMessage
      this.loading = false
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
