import { useEffect } from "react";
import mergeClass from "../utils/merge-class";

type ToastProps = {
  message: string;
  type: "SUCCESS" | "ERROR";
  onClose: () => void;
};

export default function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={mergeClass(
        "fixed right-4 top-4 z-50 max-w-md rounded-md p-4 text-white",
        type === "SUCCESS" ? "bg-green-600" : "bg-red-600",
      )}
    >
      <div className="flex items-center justify-center">
        <span className="text-lg font-semibold">{message}</span>
      </div>
    </div>
  );
}
