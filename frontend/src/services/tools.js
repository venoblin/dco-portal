import { api } from '../api'

export const uploadCsv = async (payload, credentials) => {
  const res = await api.upload(
    '/tools/parse-csv',
    payload,
    credentials.accessToken
  )

  return res
}

export const findAllDevices = async (queries, credentials) => {
  const res = await api.post(
    '/tools/find-devices',
    { queries: queries },
    credentials.accessToken
  )

  return res
}
