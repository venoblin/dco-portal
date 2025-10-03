import { api } from '../api'

export const postGuide = async (payload) => {
  const res = await api.post('/guides', payload)

  return res
}

export const getAllGuides = async (query) => {
  let res
  if (query) {
    res = await api.get(`/guides?${query}`)
  } else {
    res = await api.get('/guides')
  }

  return res
}

export const getSingleGuide = async (id) => {
  const res = await api.get(`/guides/${id}`)

  return res
}

export const getGuidesByTitle = async (title) => {
  const res = await api.get(`/guides/search?title=${title}`)

  return res
}
