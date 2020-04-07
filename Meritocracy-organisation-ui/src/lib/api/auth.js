import axios from 'axios'
const apiUrl = 'https://api.testorg.keycloak.dev.galaxias.io'
export const addbook = value =>
  axios.post(apiUrl + '/api/v1.0/book/addbook', {
    book: value,
  })

export const getbooks = () => axios.post(apiUrl + '/api/v1.0/book/getbooks', {})

export const deletebook = value =>
  axios.delete(apiUrl + '/api/v1.0/book/deletebook', {
    params: {
      id: value,
    },
  })

export const getbook = id => axios.get(apiUrl + '/api/v1.0/book/getbook', { params: { id: id } })
