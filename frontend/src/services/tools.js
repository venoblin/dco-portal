import { api } from '../api'

export const uploadCsv = async (formData, credentials) => {
  try {
    const res = await api.upload(
      '/tools/parse-csv',
      formData,
      credentials.accessToken
    )

    return res
  } catch (error) {
    throw new Error(error)
  }
}
