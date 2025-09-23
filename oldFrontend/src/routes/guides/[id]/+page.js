import { getSingleGuide } from '$lib/services/guides'

export const load = async ({ params, fetch }) => {
  const guide = await getSingleGuide(fetch, Number(params.id))

  return guide
}
