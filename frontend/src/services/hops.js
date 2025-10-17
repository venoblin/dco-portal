import { api } from '../api'

export const postHop = async (payload) => {
  const res = await api.post('/hops', payload)

  return res
}

export const deleteHop = async (id) => {
  const res = await api.delete(`/hops/${id}`)

  return res
}

export const patchHop = async (id, payload) => {
  const res = await api.delete(`/hops/${id}`, payload)

  return res
}
