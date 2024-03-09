import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function Register() {
  const { showToast } = useAppContext();
  const navigate = useNavigate();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const mutation = useMutation(apiClient.register, {
    onSuccess: () => {
      showToast({ message: "Registration successful!", type: "SUCCESS" });
      navigate("/");
    },
    onError: (err: Error) => {
      showToast({ message: err.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">Create an Account</h2>
      <div className="flex flex-col gap-5 sm:flex-row">
        <label className="flex-1 text-sm font-bold text-gray-700">
          First Name
          <input
            className="w-full rounded border px-2 py-1 font-normal"
            {...register("firstName", { required: "This field is required" })}
          />
          {errors.firstName && (
            <span className="mt-1 text-xs font-medium text-red-500">
              {errors.firstName.message}
            </span>
          )}
        </label>
        <label className="flex-1 text-sm font-bold text-gray-700">
          Last Name
          <input
            className="w-full rounded border px-2 py-1 font-normal"
            {...register("lastName", { required: "This field is required" })}
          />
          {errors.lastName && (
            <span className="mt-1 text-xs font-medium text-red-500">{errors.lastName.message}</span>
          )}
        </label>
      </div>
      <label className="flex-1 text-sm font-bold text-gray-700">
        Email
        <input
          type="email"
          className="w-full rounded border px-2 py-1 font-normal"
          {...register("email", { required: "This field is required" })}
        />
        {errors.email && (
          <span className="mt-1 text-xs font-medium text-red-500">{errors.email.message}</span>
        )}
      </label>
      <label className="flex-1 text-sm font-bold text-gray-700">
        Password
        <input
          type="password"
          className="w-full rounded border px-2 py-1 font-normal"
          {...register("password", {
            required: "This field is required",
            minLength: { value: 6, message: "Password must have at least 6 characters" },
          })}
        />
        {errors.password && (
          <span className="mt-1 text-xs font-medium text-red-500">{errors.password.message}</span>
        )}
      </label>
      <label className="flex-1 text-sm font-bold text-gray-700">
        Confirm Password
        <input
          type="password"
          className="w-full rounded border px-2 py-1 font-normal"
          {...register("confirmPassword", {
            validate: (val) => {
              if (!val) {
                return "This field is required";
              } else if (val !== watch("password")) {
                return "Your password do not match";
              }
            },
          })}
        />
        {errors.confirmPassword && (
          <span className="mt-1 text-xs font-medium text-red-500">
            {errors.confirmPassword.message}
          </span>
        )}
      </label>
      <span>
        <button
          type="submit"
          className="rounded bg-blue-600 px-3 py-2 font-medium text-white hover:bg-blue-500"
        >
          Create Account
        </button>
      </span>
    </form>
  );
}
