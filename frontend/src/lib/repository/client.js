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

  async post(endpoint, payload, passedFetch = fetch) {
    try {
      const res = await passedFetch(`${this.#constructUrl(endpoint)}`, {
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

  async get(endpoint, passedFetch = fetch) {
    try {
      const res = await passedFetch(`${this.#constructUrl(endpoint)}`)

      if (res.ok) {
        return res.json()
      }
    } catch (error) {
      throw new Error(error)
    }
  }
}

export default Client
