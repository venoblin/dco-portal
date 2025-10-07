import { api } from '../api'

export const postTriage = async (payload) => {
  const res = await api.post('/triages', payload)

  return res
}

export const getAllTriages = async (query) => {
  let res
  if (query) {
    res = await api.get(`/triages?${query}`)
  } else {
    res = await api.get('/triages')
  }

  return res
}

export const getSingleTriage = async (id) => {
  const res = await api.get(`/triages/${id}`)

  return res
}

export const getTriagesByTitle = async (name) => {
  const res = await api.get(`/triages/search?name=${name}`)

  return res
}
