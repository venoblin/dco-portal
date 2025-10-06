import { api } from '../api'

export const uploadCsv = async (payload, credentials) => {
  const res = await api.upload(
    '/tools/parse-csv',
    payload,
    credentials.accessToken
  )

  return res
}

export const findAllDevices = async (payload, credentials) => {
  const res = await api.post(
    '/tools/find-devices',
    { hostnames: payload },
    credentials.accessToken
  )

  return res
}
