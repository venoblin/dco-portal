import { api } from '../api'

export const uploadCsv = async (formData, credentials) => {
  const res = await api.upload(
    '/tools/parse-csv',
    formData,
    credentials.accessToken
  )

  return res
}

export const findAllDevices = async (hostnames, credentials) => {
  const res = await api.upload(
    '/tools/find-devices',
    { hostnames: hostnames },
    credentials.accessToken
  )

  return res
}
