import Vue from 'vue'
import Vuex from 'vuex'
import {getTodos, getUsers} from "@/api";
import router from '../router/index'

Vue.use(Vuex)

const defaultStore = {
  token: null,
  user: null,
  todos: null
}

export default new Vuex.Store({
  state: {
    token: defaultStore.token,
    user: defaultStore.user,
    todos: defaultStore.todos
  },
  getters: {
    isAuth: state => state.token || localStorage.getItem('token'),
    userInfo: state => state.user,
    todosList: state => state.todos
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
      localStorage.setItem('token', state.token)
    },
    SET_USER_DATA(state, user) {
      state.user = user
      localStorage.setItem('user', JSON.stringify(state.user))
    },
    SET_TODOS(state, payload) {
      state.todos = payload
    }
  },
  actions: {
    async signIn({commit}, {email, phone}) {
      try {
        const { data, status } = await getUsers()
        if (status === 200) {
          data.forEach(user => {
            if (user.email === email && user.phone === phone) {
              commit('SET_TOKEN', 'token_id')
              commit('SET_USER_DATA', user)
              router.push({name: 'home'})
            } else {
              throw new Error('User not found')
            }
          })
        }
      } catch(error) {
        return error.message
      }
    },
    getUserData({commit}) {
      const payload = JSON.parse(localStorage.getItem('user'))
      commit('SET_USER_DATA', payload)
    },
    logout({commit}) {
      commit('SET_TOKEN', defaultStore.token);
      commit('SET_USER_DATA', defaultStore.user);
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      router.push({name: 'login'})
    },
    async getAllTodos({commit}) {
      try {
        const { data, status } = await getTodos()
        if (status === 200) {
          commit('SET_TODOS', data)
        }
      } catch(error) {
        return error.message
      }
    }
  },
})
