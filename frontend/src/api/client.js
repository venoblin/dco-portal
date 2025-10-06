class Client {
  #baseUrl

  constructor(baseUrl) {
    this.#baseUrl = baseUrl
  }

  #constructUrl = (endpoint = '') => {
    let cleanedEndpoint = endpoint

    if (cleanedEndpoint[0] === '/') {
      cleanedEndpoint = cleanedEndpoint.slice(1)
    }

    return `${this.#baseUrl}/${cleanedEndpoint}`
  }

  async post(endpoint, payload) {
    try {
      const res = await fetch(`${this.#constructUrl(endpoint)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      if (res.ok) {
        return res.json()
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  async get(endpoint) {
    try {
      const res = await fetch(`${this.#constructUrl(endpoint)}`)

      if (res.ok) {
        return res.json()
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  async upload(endpoint, payload, accessToken) {
    try {
      const res = await fetch(this.#constructUrl(endpoint), {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })

      if (res.ok) {
        return res.json()
      } else {
        const errorBody = await res
          .json()
          .catch(() => ({ message: res.statusText }))
        throw new Error(`API Error ${res.status}: ${errorBody.message}`)
      }
    } catch (error) {
      throw new Error(error)
    }
  }
}

export default Client
