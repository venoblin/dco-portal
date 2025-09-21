import { API } from '../repository/api'

export const postGuide = async (payload) => {
  try {
    const res = await API.post('/guides', payload)

    return res
  } catch (error) {
    throw new Error()
  }
}

export const getGuides = async () => {
  try {
    const res = await API.get('/guides')

    return res
  } catch (error) {
    throw new Error()
  }
}

export const getSingleGuide = async (id) => {
  try {
    const res = await API.get(`/guides/${id}`)

    return res
  } catch (error) {
    throw new Error()
  }
}
