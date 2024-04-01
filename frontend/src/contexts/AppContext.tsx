import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import { loadStripe, Stripe } from "@stripe/stripe-js";

import authService from "../services/auth";
import Toast from "../components/Toast";

const STRIPE_PUB_KEY = import.meta.env.VITE_STRIPE_PUB_KEY || "";

type ToastMessage = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

type AppContextValue = {
  showToast: (toastMessage: ToastMessage) => void;
  isLoggedIn: boolean;
  stripePromise: Promise<Stripe | null>;
};

const AppContext = React.createContext<AppContextValue | undefined>(undefined);

const stripePromise = loadStripe(STRIPE_PUB_KEY);

export const AppContextProvider = ({ children }) => {
  const [toast, setToast] = useState<ToastMessage>();

  const { isError } = useQuery("validateToken", authService.validateToken, { retry: false });

  return (
    <AppContext.Provider
      value={{
        showToast: (toast) => setToast(toast),
        isLoggedIn: !isError,
        stripePromise,
      }}
    >
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(undefined)} />
      )}
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context as AppContextValue;
};
