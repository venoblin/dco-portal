import { api } from '../api'

export const uploadCsv = async (formData, credentials) => {
  const res = await api.upload(
    '/tools/parse-csv',
    formData,
    credentials.accessToken
  )

  return res
}

export const findAllDevices = async (hostnames) => {
  const res = await api.post('/tools/find-devices', { hostnames: hostnames })

  return res
}
