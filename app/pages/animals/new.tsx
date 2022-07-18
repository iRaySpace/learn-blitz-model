import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createAnimal from "app/animals/mutations/createAnimal"
import { AnimalForm, FORM_ERROR } from "app/animals/components/AnimalForm"

const NewAnimalPage: BlitzPage = () => {
  const router = useRouter()
  const [createAnimalMutation] = useMutation(createAnimal)

  return (
    <div>
      <h1>Create New Animal</h1>

      <AnimalForm
        submitText="Create Animal"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateAnimal}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const animal = await createAnimalMutation(values)
            router.push(Routes.ShowAnimalPage({ animalId: animal.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.AnimalsPage()}>
          <a>Animals</a>
        </Link>
      </p>
    </div>
  )
}

NewAnimalPage.authenticate = true
NewAnimalPage.getLayout = (page) => <Layout title={"Create New Animal"}>{page}</Layout>

export default NewAnimalPage
