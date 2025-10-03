import { auth } from '../api'

export const login = async (payload) => {
  const res = await auth.post('/login', payload)

  return res
}
