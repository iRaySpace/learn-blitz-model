import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getAnimal from "app/animals/queries/getAnimal"
import deleteAnimal from "app/animals/mutations/deleteAnimal"

export const Animal = () => {
  const router = useRouter()
  const animalId = useParam("animalId", "number")
  const [deleteAnimalMutation] = useMutation(deleteAnimal)
  const [animal] = useQuery(getAnimal, { id: animalId })

  return (
    <>
      <Head>
        <title>Animal {animal.id}</title>
      </Head>

      <div>
        <h1>Animal {animal.id}</h1>
        <pre>{JSON.stringify(animal, null, 2)}</pre>

        <Link href={Routes.EditAnimalPage({ animalId: animal.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteAnimalMutation({ id: animal.id })
              router.push(Routes.AnimalsPage())
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

const ShowAnimalPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.AnimalsPage()}>
          <a>Animals</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Animal />
      </Suspense>
    </div>
  )
}

ShowAnimalPage.authenticate = true
ShowAnimalPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowAnimalPage
