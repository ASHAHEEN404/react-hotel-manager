import { useForm } from "react-hook-form";

import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ toEditCabin = {}, onClose }) {
  const { id: editId, ...editValues } = toEditCabin;
  const isEditSession = Boolean(editId);
  const { handleSubmit, register, getValues, formState, reset } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  // Extracting the error from The Form
  const { errors } = formState;

  // Mutation 1
  const { isCreated, createCabin, isFormOpen } = useCreateCabin();
  // Mutation 2
  const { isEdited, editCabin } = useEditCabin();

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (isEditSession)
      editCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: (data) => {
            reset();
            onClose?.();
          },
        }
      );
    else
      createCabin(
        { ...data, image: image },
        {
          onSuccess: (data) => {
            reset();
            onClose?.();
          },
        }
      );
    // console.log(data);
  }

  function onError(error) {
    console.log(error);
  }

  const isWorking = isCreated || isEdited;

  return (
    <>
      {isFormOpen ? (
        <Form
          type={isEditSession ? "modal" : "regular"}
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          <FormRow label="Cabin name" error={errors?.name?.message}>
            <Input
              disabled={isWorking}
              type="text"
              id="name"
              {...register("name", {
                required: "This field is required",
              })}
            />
          </FormRow>

          <FormRow
            label="Maximum capacity"
            error={errors?.max_capacity?.message}
          >
            <Input
              disabled={isWorking}
              type="number"
              id="max_capacity"
              {...register("max_capacity", {
                required: "This field is required",
                min: {
                  value: 1,
                  message: "Capacity should be at least 1.",
                },
              })}
            />
          </FormRow>

          <FormRow label="Regular price" error={errors?.regular_price?.message}>
            <Input
              disabled={isWorking}
              type="number"
              id="regular_price"
              {...register("regular_price", {
                required: "This field is required",
                min: {
                  value: 1,
                  message: "Capacity should be at least 1$",
                },
              })}
            />
          </FormRow>

          <FormRow label="Discount" error={errors?.discount?.message}>
            <Input
              disabled={isWorking}
              type="number"
              id="discount"
              defaultValue={0}
              {...register("discount", {
                required: "This field is required",
                validate: (value) => {
                  const regularPrice = parseFloat(getValues().regular_price);
                  const discount = parseFloat(value);

                  return (
                    discount <= regularPrice ||
                    "Discount should be less than or equal to the regular price"
                  );
                },
              })}
            />
          </FormRow>

          <FormRow
            label="Description for website"
            error={errors?.description?.message}
          >
            <Textarea
              disabled={isWorking}
              type="number"
              id="description"
              defaultValue=""
              {...register("description", {
                required: "This field is required",
              })}
            />
          </FormRow>

          <FormRow label="Cabin photo" error={errors?.image?.message}>
            <FileInput
              disabled={isWorking}
              id="image"
              accept="image/*"
              {...register("image", {
                required: isEditSession ? false : "This field is required",
              })}
            />
          </FormRow>

          <FormRow>
            {/* type is an HTML attribute! */}
            <Button onClick={() => onClose?.()} variation="secondary">
              Cancel
            </Button>
            <Button disabled={isWorking}>
              {isEditSession ? "Edit Cabin" : "Add cabin"}
            </Button>
          </FormRow>
        </Form>
      ) : (
        ""
      )}
    </>
  );
}

export default CreateCabinForm;
