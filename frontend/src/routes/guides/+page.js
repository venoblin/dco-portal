import { getGuides } from '$lib/service/guidesService'

export const load = async () => {
  const guides = await getGuides()

  return {
    guides: guides
  }
}
