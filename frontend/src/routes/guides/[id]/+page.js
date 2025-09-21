import { getSingleGuide } from '$lib/service/guidesService'

export const load = async ({ params }) => {
  const guide = await getSingleGuide(Number(params.id))

  return {
    guide: guide
  }
}
