import { getGuides } from '$lib/services/guides'

export const load = async ({ fetch }) => {
  const guides = await getGuides(fetch)

  return guides
}
