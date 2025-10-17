import { api } from '../api'

export const postPath = async (payload) => {
  const res = await api.post('/paths', payload)

  return res
}

export const deletePath = async (id) => {
  const res = await api.delete(`/paths/${id}`)

  return res
}

export const patchPath = async (id, payload) => {
  const res = await api.patch(`/paths/${id}`, payload)

  return res
}
