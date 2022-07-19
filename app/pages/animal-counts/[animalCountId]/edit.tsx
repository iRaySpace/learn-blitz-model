import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getAnimalCount from "app/animal-counts/queries/getAnimalCount"
import updateAnimalCount from "app/animal-counts/mutations/updateAnimalCount"
import { AnimalCountForm, FORM_ERROR } from "app/animal-counts/components/AnimalCountForm"

export const EditAnimalCount = () => {
  const router = useRouter()
  const animalCountId = useParam("animalCountId", "number")
  const [animalCount, { setQueryData }] = useQuery(
    getAnimalCount,
    { id: animalCountId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateAnimalCountMutation] = useMutation(updateAnimalCount)

  return (
    <>
      <Head>
        <title>Edit AnimalCount {animalCount.id}</title>
      </Head>

      <div>
        <h1>Edit AnimalCount {animalCount.id}</h1>
        <pre>{JSON.stringify(animalCount, null, 2)}</pre>

        <AnimalCountForm
          submitText="Update AnimalCount"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateAnimalCount}
          initialValues={animalCount}
          onSubmit={async (values) => {
            try {
              const updated = await updateAnimalCountMutation({
                id: animalCount.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowAnimalCountPage({ animalCountId: updated.id }))
            } catch (error: any) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditAnimalCountPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditAnimalCount />
      </Suspense>

      <p>
        <Link href={Routes.AnimalCountsPage()}>
          <a>AnimalCounts</a>
        </Link>
      </p>
    </div>
  )
}

EditAnimalCountPage.authenticate = true
EditAnimalCountPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditAnimalCountPage
