import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getAnimal from "app/animals/queries/getAnimal"
import updateAnimal from "app/animals/mutations/updateAnimal"
import { AnimalForm, FORM_ERROR } from "app/animals/components/AnimalForm"

export const EditAnimal = () => {
  const router = useRouter()
  const animalId = useParam("animalId", "number")
  const [animal, { setQueryData }] = useQuery(
    getAnimal,
    { id: animalId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateAnimalMutation] = useMutation(updateAnimal)

  return (
    <>
      <Head>
        <title>Edit Animal {animal.id}</title>
      </Head>

      <div>
        <h1>Edit Animal {animal.id}</h1>
        <pre>{JSON.stringify(animal, null, 2)}</pre>

        <AnimalForm
          submitText="Update Animal"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateAnimal}
          initialValues={animal}
          onSubmit={async (values) => {
            try {
              const updated = await updateAnimalMutation({
                id: animal.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowAnimalPage({ animalId: updated.id }))
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

const EditAnimalPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditAnimal />
      </Suspense>

      <p>
        <Link href={Routes.AnimalsPage()}>
          <a>Animals</a>
        </Link>
      </p>
    </div>
  )
}

EditAnimalPage.authenticate = true
EditAnimalPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditAnimalPage
