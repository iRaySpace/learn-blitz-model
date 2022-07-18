import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetAnimalsInput
  extends Pick<Prisma.AnimalFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetAnimalsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: animals,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.animal.count({ where }),
      query: (paginateArgs) => db.animal.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      animals,
      nextPage,
      hasMore,
      count,
    }
  }
)
