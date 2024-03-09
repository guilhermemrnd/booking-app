import React, { useContext, useState } from "react";
import { useQuery } from "react-query";

import * as apiClient from "../api-client";
import Toast from "../components/Toast";

type ToastMessage = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

type AppContextValue = {
  showToast: (toastMessage: ToastMessage) => void;
  isLoggedIn: boolean;
};

const AppContext = React.createContext<AppContextValue | undefined>(undefined);

export const AppContextProvider = ({ children }) => {
  const [toast, setToast] = useState<ToastMessage>();

  const { isError } = useQuery("validateToken", apiClient.validateToken, { retry: false });

  return (
    <AppContext.Provider
      value={{
        showToast: (toast) => setToast(toast),
        isLoggedIn: !isError,
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
