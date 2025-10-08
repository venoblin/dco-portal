import { api } from '../api'

export const uploadCsv = async (payload, credentials) => {
  const res = await api.upload(
    '/tools/parse-csv',
    payload,
    credentials.accessToken
  )

  return res
}

export const findAllDevices = async (queriesArr, credentials) => {
  const res = await api.post(
    '/tools/find-devices',
    queriesArr,
    credentials.accessToken
  )

  return res
}
