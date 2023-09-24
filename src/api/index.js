import axios from 'axios'

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';

export const getUsers = () => {
    return axios.get('/users')
}

export const getTodos = () => {
    return axios.get('/todos')
}
