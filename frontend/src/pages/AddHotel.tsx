import { useMutation } from "react-query";

import myHotelsService from "../services/my-hotels";
import { useAppContext } from "../contexts/AppContext";

import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";

export default function AddHotel() {
  const { showToast } = useAppContext();

  const { mutate, isLoading } = useMutation(myHotelsService.saveMyHotel, {
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
