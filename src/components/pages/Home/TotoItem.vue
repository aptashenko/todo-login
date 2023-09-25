<template>
  <li
      :class="[{completed: item.completed}, 'todo-item']"
  >
    <div class="todo-item__head">
      <p>ID: {{item.id}}</p>
      <p>User ID: {{item.userId}}</p>
    </div>
    <p>{{item.title}}</p>
    <div>
      <button
          v-if="!isFavorite"
          class="todo-item__add-fav"
          @click="addToFavorite"
      >
        +
      </button>
      <div v-else class="todo-item__favorite">
        <p>
          FAVORITE
        </p>
        <button @click="removeFromFavorites">-</button>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: 'TodoItem',
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    favorite: {
      type: [Array, String],
      default: JSON.parse(localStorage.getItem('todos')) || ''
    }
  },
  computed: {
    isFavorite() {
      return this.favorite.length ? JSON.parse(this.favorite).some(todo => todo.id === this.item.id) : false
    },
  },
  methods: {
    addToFavorite() {
      const todos = JSON.parse(this.favorite) || [];
      const isExciting = todos.find(todo => todo.id === this.item.id)
      if (isExciting) return
      todos.push(this.item)
      console.log(todos)
      this.$emit('add-to-favorite', JSON.stringify(todos))
    },
    removeFromFavorites() {
      const todos = JSON.parse(this.favorite) || [];
      const excitingItem = todos.findIndex(todo => todo.id === this.item.id)
      todos.splice(excitingItem, 1)
      this.$emit('add-to-favorite', JSON.stringify(todos))
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/main.scss';
.todo-item {
  border: 1px solid #fff;
  padding: 20px;
  border-radius: 25px;
  width: calc((100%  - 20px)/2);
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

  &__add-fav {
    width: fit-content;
    cursor: pointer;
  }

  &__favorite {
    background: darkgoldenrod;
    width: fit-content;
    padding: 5px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    gap: 5px;
  }
}
</style>
