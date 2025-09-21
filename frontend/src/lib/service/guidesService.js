import { API } from '../repository/api'

export const postGuide = async (payload) => {
  try {
    const res = await API.post('/guides', payload)

    return res
  } catch (error) {
    throw new Error()
  }
}

export const getGuides = async (fetch) => {
  try {
    const res = await API.get('/guides', fetch)

    return res
  } catch (error) {
    throw new Error()
  }
}

export const getSingleGuide = async (id, fetch) => {
  try {
    const res = await API.get(`/guides/${id}`, fetch)

    return res
  } catch (error) {
    throw new Error()
  }
}
