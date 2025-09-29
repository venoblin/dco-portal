import { API } from '../api'

export const uploadCsv = async (formData) => {
  try {
    const res = await API.upload('/tools/parse-csv', formData)

    return res
  } catch (error) {
    throw new Error(error)
  }
}
