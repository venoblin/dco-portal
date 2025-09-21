import { getGuides } from '$lib/service/guidesService'

export const load = async ({ fetch }) => {
  const guides = await getGuides(fetch)

  return {
    guides: guides
  }
}
