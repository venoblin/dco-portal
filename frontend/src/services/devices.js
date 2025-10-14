import { api } from '../api'

export const postDevice = async (payload) => {
  const res = await api.post('/devices', payload)

  return res
}
