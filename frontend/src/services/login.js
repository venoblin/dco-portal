import { auth } from '../api'

export const login = async (payload) => {
  try {
    const res = await auth.post('/login', payload)

    return res
  } catch (error) {
    throw new Error(error)
  }
}
