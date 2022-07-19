import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getAnimalCount from "app/animal-counts/queries/getAnimalCount"
import deleteAnimalCount from "app/animal-counts/mutations/deleteAnimalCount"

export const AnimalCount = () => {
  const router = useRouter()
  const animalCountId = useParam("animalCountId", "number")
  const [deleteAnimalCountMutation] = useMutation(deleteAnimalCount)
  const [animalCount] = useQuery(getAnimalCount, { id: animalCountId })

  return (
    <>
      <Head>
        <title>AnimalCount {animalCount.id}</title>
      </Head>

      <div>
        <h1>AnimalCount {animalCount.id}</h1>
        <pre>{JSON.stringify(animalCount, null, 2)}</pre>

        <Link href={Routes.EditAnimalCountPage({ animalCountId: animalCount.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteAnimalCountMutation({ id: animalCount.id })
              router.push(Routes.AnimalCountsPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowAnimalCountPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.AnimalCountsPage()}>
          <a>AnimalCounts</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <AnimalCount />
      </Suspense>
    </div>
  )
}

ShowAnimalCountPage.authenticate = true
ShowAnimalCountPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowAnimalCountPage
