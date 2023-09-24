<template>
  <li
      :class="[{completed: item.completed}, 'todo-item']"
  >
    <div class="todo-item__head">
      <p>ID: {{item.id}}</p>
      <p>User ID: {{item.userId}}</p>
    </div>
    <p>{{item.title}}</p>
  </li>
</template>

<script>
export default {
  name: 'TodoItem',
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/nomralize.css';
.todo-item {
  border: 1px solid #fff;
  padding: 20px;
  border-radius: 25px;
  width: calc((100%  - 20px)/2);
  cursor: pointer;
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (max-width: 480px) {
    width: 100%;
  }

  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &.completed {
    background: #519945;
  }
}
</style>
