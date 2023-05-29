// ReservationForm.tsx
import { useRef } from "react";

export default function ReservationForm({ service, onCancel }) {
  const descriptionRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    // implement the booking logic here
  };

  return (
    <form onSubmit={handleSubmit} className=" flex flex-col">
      <h2>Booking {service.service_name}</h2>
      <label>
        Description:
        <input type="text" ref={descriptionRef} />
      </label>
      <button type="submit">Confirm Booking</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
}
