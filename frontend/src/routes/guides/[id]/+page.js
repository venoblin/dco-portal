import { getSingleGuide } from '$lib/service/guidesService'

export const load = async ({ params, fetch }) => {
  const guide = await getSingleGuide(Number(params.id), fetch)

  return {
    guide: guide
  }
}
