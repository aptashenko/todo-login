<template>
  <div class="button-wrapper">
    <component
        :is="element"
        :disabled="$attrs.disabled || loading"
        class="text text-md"
        :class="mainClass"
    >
      <the-loader
          v-if="loading"
          :class="`${mainClass}-loader`"
      />
      <span v-else>{{label}}</span>
    </component>
  </div>
</template>

<script>
import {RouterLink} from "vue-router";
import TheLoader from "@/components/shared/TheLoader.vue";
export default {
  name: 'BaseButton',
  components: {
    TheLoader,
    RouterLink
  },
  props: {
    label: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    },
    to: {
      type: [Object, String],
      default: ''
    },
    variant: {
      type: String,
      default: 'default'
    }
  },
  computed: {
    element() {
      return this.to ? RouterLink : 'button'
    },
    mainClass() {
      const classes = {
        default: 'button',
      }

      return classes[this.variant]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/main.scss';

.button-wrapper {
  width: 100%;
}

.button {
  background: $green-primary;
  color: #fff;
  padding: 10px 24px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  transition: all .25s ease;
  width: 100%;

  font-size: 17px;
  font-style: normal;
  font-weight: 600;
  line-height: 21px; /* 123.529% */
  letter-spacing: -0.425px;

  &:hover {
    background: $green-hover;
  }

  &:disabled {
    background: $green-disabled;
    cursor: default;
  }

  &-loader {
    width: 30px;
    height: 30px;
  }
}
</style>
