import { api } from '../api'

export const postGuide = async (payload) => {
  try {
    const res = await api.post('/guides', payload)

    return res
  } catch (error) {
    throw new Error(error)
  }
}

export const getAllGuides = async (query) => {
  try {
    let res
    if (query) {
      res = await api.get(`/guides?${query}`)
    } else {
      res = await api.get('/guides')
    }

    return res
  } catch (error) {
    throw new Error(error)
  }
}

export const getSingleGuide = async (id) => {
  try {
    const res = await api.get(`/guides/${id}`)

    return res
  } catch (error) {
    throw new Error(error)
  }
}

export const getGuidesByTitle = async (title) => {
  try {
    const res = await api.get(`/guides/search?title=${title}`)

    return res
  } catch (error) {
    throw new Error(error)
  }
}
