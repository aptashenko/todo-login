<template>
  <div class="todo">
    <div class="todo__head">
      <div class="todo__filters">
        <the-filter
            v-model="filterStatus"
            :init-value="{label: 'All', id: 'all'}"
            :options="statusFilter"
            class="todo__filter"
        />
        <the-filter
            v-model="otherFilters"
            :init-value="{label: 'All Users', id: 'all'}"
            :options="idsFilter"
            class="todo__filter"
        />
        <input
            v-model="search"
            type="text"
            class="todo__search"
        />
      </div>
      <div class="todo__create">
        <label class="todo__label">
          <span>User Id:</span>
          <input
              v-maska
              v-model="newUserId"
              id="1"
              data-maska="####"
              type="text"
              class="todo__input"
          />
        </label>
        <label class="todo__label">
          <span>Title:</span>
          <input
              v-model="newTitle"
              id="2"
              type="text"
              class="todo__input"
          />
        </label>

        <base-button
            label="add"
            :disabled="disabledAdd"
            class="todo__create-btn"
            @click.native="addNewTodo"
        />
      </div>
    </div>
    <ul class="todo__list">
      <TodoItem
          v-for="todo of filteredTodos"
          :key="todo.id"
          :favorite="favoriteData"
          :item="todo"
          @add-to-favorite="addToFavorite($event)"
      />
    </ul>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import TodoItem from "@/components/pages/Home/TotoItem.vue";
import TheFilter from "@/components/shared/TheFilter.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import { vMaska } from "maska"
export default {
  name: 'TodosList',
  data() {
    return {
      statusFilter: [
        {label: 'Completed', id: 1},
        {label: 'Uncompleted', id: 2},
        {label: 'Favorites', id: 3}
      ],
      filterStatus: 'All',
      otherFilters: 'All',
      search: '',
      newUserId: null,
      newTitle: '',
      favoriteData: ''
    }
  },
  components: {BaseButton, TheFilter, TodoItem},
  directives: { maska: vMaska },
  computed: {
    ...mapGetters(['todosList']),
    idsFilter() {
      const uniqValues = new Set(this.todosList?.map(item => item.userId))
      const array = Array.from(uniqValues).map((item, idx) => ({label: item, id: idx+1}))
      return array
    },
    filteredTodos() {
      if (this.filterStatus === 'Completed') {
        const compeltedTodos = this.todosList?.filter(item => item.completed)
        const userIdFilter = this.otherFilters === 'All' ? compeltedTodos : compeltedTodos.filter(item =>  Number(this.otherFilters) === item.userId)
        return userIdFilter.filter(item => item.title.includes(this.search))
      } else if (this.filterStatus === 'Uncompleted') {
        const uncompeltedTodos = this.todosList?.filter(item => !item.completed)
        const userIdFilter =  this.otherFilters === 'All' ? uncompeltedTodos : uncompeltedTodos.filter(item => Number(this.otherFilters) === item.userId)
        return userIdFilter.filter(item => item.title.includes(this.search))
      } else if (this.filterStatus === 'Favorites') {
        const favoriteTodos = JSON.parse(this.favoriteData) || [];
        const userIdFilter = this.otherFilters === 'All' ? favoriteTodos : favoriteTodos.filter(item => Number(this.otherFilters) === item.userId)
        return userIdFilter.filter(item => item.title.includes(this.search))
      } else {
        if (this.otherFilters !== 'All') {
          const userIdFilter = this.todosList?.filter(item => Number(this.otherFilters) === item.userId)
          return userIdFilter.filter(item => item.title.includes(this.search))
        } else {
          return this.todosList?.filter(item => item.title.includes(this.search))
        }
      }
    },
    disabledAdd() {
      return !this.newUserId || !this.newTitle
    }
  },
  methods: {
    getAllTodos() {
      this.$store.dispatch('getAllTodos')
    },
    addNewTodo() {
      const payload = {
        title: this.newTitle,
        userId: this.newUserId,
        completed: false
      }
      this.$store.dispatch('addNewTodo', payload)
    },

    addToFavorite(todos) {
      this.favoriteData = todos
    }
  },
  watch: {
    favoriteData(newValue) {
      localStorage.setItem('todos', newValue);
    }
  },
  mounted() {
    this.getAllTodos();
    if (localStorage.getItem('todos')) {
      this.favoriteData = localStorage.getItem('todos')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/main.scss';

.todo {
  max-height: 100%;
  height: fit-content;
  padding: 40px;

  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid $gray-light;
    border-radius: 25px;

    @media (max-width: 480px) {
      flex-direction: column;
      width: 100%;
    }
  }

  &__filters {
    display: flex;
    align-items: center;
    gap: 10px;

    @media (max-width: 480px) {
      flex-direction: column;
      width: 100%;
    }
  }

  &__filter, &__search {
    @media (max-width: 480px) {
      width: 100%;
    }
  }

  &__create {
    display: flex;
    justify-content: space-between;
    gap: 20px;

    &-btn {
      max-width: 100px;
      @media (max-width: 480px) {
        max-width: unset;
      }
    }

    @media (max-width: 480px) {
      flex-direction: column;
      width: 100%;
    }
  }

  &__list {
    height: 100%;
    overflow-y: scroll;
    max-height: 450px;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    gap: 10px;
  }

  &__label {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    color: #fff;

    @media (max-width: 480px) {
      flex-direction: column;
      justify-content: space-between;
      margin-top: 20px;
    }
  }

  &__input {
    width: 70%;
    height: 40px;

    @media (max-width: 480px) {
      width: 100%;
    }
  }
}
</style>
