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

  #getData = (res) => {
    const data = res.json()

    if (!res.ok) {
      throw new Error(data.message || `HTTP ${res.status}`)
    }

    return data
  }

  async post(endpoint, payload, accessToken) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }

    if (accessToken) {
      options.headers.Authorization = `Bearer ${accessToken}`
    }

    const res = await fetch(`${this.#constructUrl(endpoint)}`, options)
    return this.#getData(res)
  }

  async patch(endpoint, payload) {
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }

    const res = await fetch(`${this.#constructUrl(endpoint)}`, options)

    return this.#getData(res)
  }

  async get(endpoint) {
    const res = await fetch(`${this.#constructUrl(endpoint)}`)

    if (res.ok) {
      return res.json()
    }
  }

  async delete(endpoint) {
    const options = {
      method: 'DELETE'
    }

    const res = await fetch(`${this.#constructUrl(endpoint)}`, options)

    return this.#getData(res)
  }

  async upload(endpoint, payload, accessToken) {
    const res = await fetch(this.#constructUrl(endpoint), {
      method: 'POST',
      body: payload,
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    return this.#getData(res)
  }
}

export default Client
