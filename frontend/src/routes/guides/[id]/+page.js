import { getSingleGuide } from '$lib/services/guides'

export const load = async ({ params, fetch }) => {
  const guide = await getSingleGuide(Number(params.id), fetch)

  return guide
}
