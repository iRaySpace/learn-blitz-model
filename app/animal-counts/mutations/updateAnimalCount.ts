import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateAnimalCount = z.object({
  id: z.number(),
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateAnimalCount),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const animalCount = await db.animalCount.update({ where: { id }, data })

    return animalCount
  }
)
