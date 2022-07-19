import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getAnimalCounts from "app/animal-counts/queries/getAnimalCounts"

const ITEMS_PER_PAGE = 100

export const AnimalCountsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ animalCounts, hasMore }] = usePaginatedQuery(getAnimalCounts, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {animalCounts.map((animalCount) => (
          <li key={animalCount.id}>
            <Link href={Routes.ShowAnimalCountPage({ animalCountId: animalCount.id })}>
              <a>{animalCount.id}</a>
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

const AnimalCountsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>AnimalCounts</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewAnimalCountPage()}>
            <a>Create AnimalCount</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <AnimalCountsList />
        </Suspense>
      </div>
    </>
  )
}

AnimalCountsPage.authenticate = true
AnimalCountsPage.getLayout = (page) => <Layout>{page}</Layout>

export default AnimalCountsPage
