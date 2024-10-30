import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useSettings } from "./useSettings";
import { useUpdateSettings } from "./useUpdateSettings";

function UpdateSettingsForm() {
  const {
    settings: {
      max_booking_length: maxBookingLength,
      max_guests_per_booking: maxGuestsPerBooking,
      min_booking_length: minBookingLength,
      breakfast_price: breakfastPrice,
    } = {},
    isLoading,
  } = useSettings();

  const { isUpdating, updateSetting } = useUpdateSettings();

  function handleUpdate(e, field) {
    const { value } = e.target;

    if (!value) return;
    updateSetting({ [field]: value });
  }

  if (isLoading) return <Spinner />;
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          onBlur={(e) => handleUpdate(e, "min_booking_length")}
          disabled={isUpdating}
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
        />
      </FormRow>

      <FormRow label="Maximum nights/booking">
        <Input
          onBlur={(e) => handleUpdate(e, "max_booking_length")}
          disabled={isUpdating}
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
        />
      </FormRow>

      <FormRow label="Maximum guests/booking">
        <Input
          onBlur={(e) => handleUpdate(e, "max_guests_per_booking")}
          disabled={isUpdating}
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
        />
      </FormRow>

      <FormRow label="Breakfast price">
        <Input
          onBlur={(e) => handleUpdate(e, "breakfast_price")}
          disabled={isUpdating}
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
