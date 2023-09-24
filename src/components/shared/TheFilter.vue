<template>
  <select
      :value="value"
      @input="$emit('input', $event.target.value)"
      @change="$emit('change')"
  >
    >
    <option
        v-for="option of options"
        :key="option.id"
    >
      {{ option.label }}
    </option>
  </select>
</template>

<script>
export default {
  name: 'TheFilter',
  props: {
    options: {
      type: Array,
      required: true
    },
    value: {
      type: String,
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
