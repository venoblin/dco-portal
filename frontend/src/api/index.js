import Client from './client'

export const api = new Client('http://localhost:3000/api')
export const auth = new Client('http://localhost:3000/auth')
