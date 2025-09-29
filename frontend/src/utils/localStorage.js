export const storageGet = (key) => {
  const item = localStorage.getItem(key)
  return JSON.parse(item)
}

export const storageSet = (key, item) => {
  localStorage.setItem(key, JSON.stringify(item))
}
