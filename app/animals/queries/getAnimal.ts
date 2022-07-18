import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetAnimal = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetAnimal), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const animal = await db.animal.findFirst({ where: { id } })

  if (!animal) throw new NotFoundError()

  return animal
})
