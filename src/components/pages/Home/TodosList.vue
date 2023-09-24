<template>
  <div class="todo">
    <ul class="todo__list">
      <the-filter/>
      <the-filter/>
      <TodoItem
          v-for="todo of todosList"
          :key="todo.id"
          :item="todo"
      />
    </ul>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import TodoItem from "@/components/pages/Home/TotoItem.vue";
import TheFilter from "@/components/shared/TheFilter.vue";

export default {
  name: 'TodosList',
  data() {
    return {
      statusFilter: [
        {label: 'All', id: 1},
        {label: 'Completed', id: 2},
        {label: 'Uncompleted', id: 3},
        {label: 'Favorites', id: 4}
      ],
      filterStatus: 'All',
      filterId: 'All',
    }
  },
  components: {TheFilter, TodoItem},
  computed: {
    ...mapGetters(['todosList']),
  },
  methods: {
    getAllTodos() {
      this.$store.dispatch('getAllTodos')
    },
  },
  mounted() {
    this.getAllTodos()
  }
}
</script>

<style lang="scss" scoped>
.todo {
  height: 100%;
  padding: 40px;

  &__list {
    height: 100%;
    overflow-y: scroll;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    gap: 10px;
  }
}
</style>
