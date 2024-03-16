import { useMutation } from "react-query";

import { useAppContext } from "../contexts/AppContext";
import * as apiClient from "../api-client";

import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";

export default function AddHotel() {
  const { showToast } = useAppContext();

  const { mutate, isLoading } = useMutation(apiClient.saveMyHotel, {
    onSuccess: () => {
      showToast({ message: "Hotel saved!", type: "SUCCESS" });
    },
    onError: () => {
      showToast({ message: "Error saving hotel", type: "ERROR" });
    },
  });

  const handleSave = (hotelData: FormData) => {
    mutate(hotelData);
  };

  return <ManageHotelForm onSave={handleSave} isLoading={isLoading} />;
}
