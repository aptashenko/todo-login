<template>
  <div class="input">
    <label
        v-if="label"
        :for="$attrs.id"
        class="input__label text text-md"
    >
    {{label}}
    </label>
    <input
        :id="$attrs.id"
        :type="$attrs.type"
        :value="value"
        :placeholder="$attrs.placeholder"
        class="input__field"
        @change="$emit('input', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  name: 'BaseInput',
  props: {
    label: {
      type: String,
      default: ''
    },
    error: {
      type: String,
      default: ''
    },
    value: {
      type: String,
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/main.scss';

.input {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 5px;

  &__field {
    padding: 10px;
    border-radius: 5px;
    background: #fff;
    font-size: 17px;
    font-style: normal;
    font-weight: 400;
    line-height: 1.23;
    letter-spacing: -0.425px;
    border: none;

    &::placeholder {
      color: $gray-bold;
    }
  }

}
</style>
