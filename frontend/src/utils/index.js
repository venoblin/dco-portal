export const cleanTime = (time) => {
  return `${time.slice(5, 7)}/${time.slice(8, 10)}/${time.slice(0, 4)}`
}

export const getBasePathname = (pathname) => {
  if (!pathname) {
    return ''
  }

  const path = pathname.slice(1)
  let endIdx = 0

  if (path.indexOf('/') === -1) {
    endIdx = path.length
  } else {
    endIdx = path.indexOf('/')
  }

  const cleanedPath = `/${path.slice(0, endIdx)}`

  return cleanedPath
}

export const sleep = async (time) => {
  return new Promise((res) => setTimeout(res, time))
}

export const constructQueries = (textData, searchType) => {
  const lowerCase = textData.toLowerCase()
  const dataArr = lowerCase.split(/[\n ]/)

  const cleanedArr = dataArr.filter((data) => data !== '')

  const queries = cleanedArr.map((data) => {
    if (data !== '') {
      const newQuery = {}
      newQuery[searchType] = data

      return newQuery
    }
  })

  return queries
}
