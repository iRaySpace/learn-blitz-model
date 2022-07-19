import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetAnimalCount = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetAnimalCount), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const animalCount = await db.animalCount.findFirst({ where: { id } })

  if (!animalCount) throw new NotFoundError()

  return animalCount
})
