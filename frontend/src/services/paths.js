import { api } from '../api'

export const postPath = async (payload) => {
  const res = await api.post('/paths', payload)

  return res
}
