import { ReactNode } from "react";
import { useMutation, useQueryClient } from "react-query";

import authService from "../services/auth";
import { useAppContext } from "../contexts/AppContext";

type SignOutButtonProps = {
  children: ReactNode;
  className: string;
};

export default function SignOutButton({ children, className }: SignOutButtonProps) {
  const { showToast } = useAppContext();
  const queryClient = useQueryClient();

  const mutation = useMutation(authService.signOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      showToast({ message: "Signed out", type: "SUCCESS" });
    },
    onError: (err: Error) => {
      showToast({ message: err.message, type: "ERROR" });
    },
  });

  const handleClick = () => {
    mutation.mutate();
  };

  return (
    <button className={className} onClick={handleClick}>
      {children}
    </button>
  );
}
