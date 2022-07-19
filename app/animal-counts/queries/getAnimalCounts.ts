import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetAnimalCountsInput
  extends Pick<Prisma.AnimalCountFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetAnimalCountsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: animalCounts,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.animalCount.count({ where }),
      query: (paginateArgs) => db.animalCount.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      animalCounts,
      nextPage,
      hasMore,
      count,
    }
  }
)
