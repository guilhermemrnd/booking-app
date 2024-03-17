export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export async function saveMyHotel(formData: FormData) {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to add the hotel");
  }

  return await response.json();
}

const myHotelsService = { saveMyHotel };
export default myHotelsService;
