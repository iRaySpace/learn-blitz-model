import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getAnimals from "app/animals/queries/getAnimals"

const ITEMS_PER_PAGE = 100

export const AnimalsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ animals, hasMore }] = usePaginatedQuery(getAnimals, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {animals.map((animal) => (
          <li key={animal.id}>
            <Link href={Routes.ShowAnimalPage({ animalId: animal.id })}>
              <a>{animal.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const AnimalsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Animals</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewAnimalPage()}>
            <a>Create Animal</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <AnimalsList />
        </Suspense>
      </div>
    </>
  )
}

AnimalsPage.authenticate = true
AnimalsPage.getLayout = (page) => <Layout>{page}</Layout>

export default AnimalsPage
