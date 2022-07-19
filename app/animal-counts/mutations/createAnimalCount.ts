import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateAnimalCount = z.object({
  animalId: z.number(),
  qty: z.number(),
})

export default resolver.pipe(
  resolver.zod(CreateAnimalCount),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const animalCount = await db.animalCount.create({ data: input })

    return animalCount
  }
)
