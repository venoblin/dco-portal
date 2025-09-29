import { API } from '../api'

export const uploadCsv = async (file) => {
  try {
    const res = await API.post('/tools/parse-csv', { file: file })

    return res
  } catch (error) {
    throw new Error(error)
  }
}
