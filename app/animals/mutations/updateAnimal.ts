import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateAnimal = z.object({
  id: z.number(),
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateAnimal),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const animal = await db.animal.update({ where: { id }, data })

    return animal
  }
)
