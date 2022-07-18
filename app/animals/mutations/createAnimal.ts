import { NotFoundError, resolver } from "blitz"
import db from "db"
import { z } from "zod"

import { NameAlreadyTakenError } from "app/errors"

const CreateAnimal = z.object({
  name: z.string().min(2),
})

export default resolver.pipe(resolver.zod(CreateAnimal), resolver.authorize(), async (input) => {
  const existingAnimal = await db.animal.findFirst({ where: { name: input.name } })
  if (existingAnimal) throw new NameAlreadyTakenError()

  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const animal = await db.animal.create({ data: input })

  return animal
})
