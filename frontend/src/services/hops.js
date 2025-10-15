import { api } from '../api'

export const postHop = async (payload) => {
  const res = await api.post('/hops', payload)

  return res
}
