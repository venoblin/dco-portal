import { api } from '../api'

export const postDevice = async (payload) => {
  const res = await api.post('/devices', payload)

  return res
}

export const deleteDevice = async (id) => {
  const res = await api.delete(`/devices/${id}`)

  return res
}

export const patchDevice = async (id, payload) => {
  const res = await api.patch(`/devices/${id}`, payload)

  return res
}
