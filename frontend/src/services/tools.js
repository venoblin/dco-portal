import { api } from '../api'

export const uploadCsv = async (formData, credentials) => {
  const res = await api.upload(
    '/tools/parse-csv',
    formData,
    credentials.accessToken
  )

  return res
}
