import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteAnimal = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(DeleteAnimal), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const animal = await db.animal.deleteMany({ where: { id } })

  return animal
})
