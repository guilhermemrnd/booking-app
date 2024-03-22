import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";

import myHotelsService from "../services/my-hotels";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import { useAppContext } from "../contexts/AppContext";

export default function EditHotel() {
  const { showToast } = useAppContext();
  const { hotelId } = useParams();

  const { data: hotel } = useQuery(
    "fetchMyHotelById",
    () => myHotelsService.fetchMyHotelById(hotelId || ""),
    {
      enabled: !!hotelId,
    },
  );

  const { mutate, isLoading } = useMutation(myHotelsService.updateMyHotelById, {
    onSuccess: () => {
      showToast({ message: "Hotel updated!", type: "SUCCESS" });
    },
    onError: () => {
      showToast({ message: "Error updating hotel", type: "ERROR" });
    },
  });

  const handleSave = (formData: FormData) => {
    mutate(formData);
  };

  return <ManageHotelForm hotel={hotel} onSave={handleSave} isLoading={isLoading} />;
}
