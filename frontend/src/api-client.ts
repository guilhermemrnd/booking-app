import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export async function register(formData: RegisterFormData) {
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const body = await response.json();

  if (!response.ok) {
    throw new Error(body.message);
  }
}

export async function singIn(formData: SignInFormData) {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message);
  }

  return body;
}

export async function validateToken() {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Invalid token");
  }

  return response.json();
}

export async function signOut() {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to sign out");
  }
}

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
