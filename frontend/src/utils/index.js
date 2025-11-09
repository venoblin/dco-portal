import e from 'cors'

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

export const splitTextData = (textData, options = {}) => {
  const cleanedOptions = {
    isRemoveWhiteSpace: false,
    isLowerCase: true,
    ...options
  }

  let data = textData

  if (options.isLowerCase) {
    data = data.toLowerCase()
  }

  const dataArr = data.split(/[\n ]/)

  if (cleanedOptions.isRemoveWhiteSpace) {
    return dataArr.filter((data) => data !== '')
  }

  return dataArr
}

export const constructQueries = (textData, searchType) => {
  const dataArr = splitTextData(textData)

  const queries = dataArr.map((data) => {
    const newQuery = {}

    if (data !== '') {
      newQuery[searchType] = data
    } else {
      newQuery[searchType] = ''
    }

    return newQuery
  })

  return queries
}

export const removeWhiteSpace = (text) => {
  return text.replaceAll(' ', '')
}
