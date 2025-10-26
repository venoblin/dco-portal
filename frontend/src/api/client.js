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

  #getData = async (res) => {
    const data = await res.json()
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
    const data = this.#getData(res)
    return data
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

    const data = this.#getData(res)
    return data
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

    const data = this.#getData(res)
    return data
  }

  async upload(endpoint, payload, accessToken) {
    const res = await fetch(this.#constructUrl(endpoint), {
      method: 'POST',
      body: payload,
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    const data = this.#getData(res)
    return data
  }
}

export default Client
