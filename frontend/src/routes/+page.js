import { getGuides } from '$lib/services/guides'

export const load = async ({ fetch }) => {
  const guides = await getGuides(fetch, 'limit=5')

  return guides
}
