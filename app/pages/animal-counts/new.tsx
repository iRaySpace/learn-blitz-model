import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createAnimalCount from "app/animal-counts/mutations/createAnimalCount"
import { AnimalCountForm, FORM_ERROR } from "app/animal-counts/components/AnimalCountForm"

const NewAnimalCountPage: BlitzPage = () => {
  const router = useRouter()
  const [createAnimalCountMutation] = useMutation(createAnimalCount)

  return (
    <div>
      <h1>Create New AnimalCount</h1>

      <AnimalCountForm
        submitText="Create AnimalCount"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateAnimalCount}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const animalCount = await createAnimalCountMutation(values)
            router.push(Routes.ShowAnimalCountPage({ animalCountId: animalCount.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.AnimalCountsPage()}>
          <a>AnimalCounts</a>
        </Link>
      </p>
    </div>
  )
}

NewAnimalCountPage.authenticate = true
NewAnimalCountPage.getLayout = (page) => <Layout title={"Create New AnimalCount"}>{page}</Layout>

export default NewAnimalCountPage
