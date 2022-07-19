import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { z } from "zod"
export { FORM_ERROR } from "app/core/components/Form"

export function AnimalCountForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <LabeledTextField
        type="number"
        name="animalId"
        label="Animal Id"
        placeholder="Animal Id"
      />
      <LabeledTextField
        type="number"
        name="qty"
        label="Qty"
        placeholder="Qty"
      />
    </Form>
  )
}
