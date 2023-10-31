"use client";

import { useFormContext } from "react-hook-form";
import { SchemaType } from "./schema";

export const SecurityCode = () => {
  const { register } = useFormContext<SchemaType>();

  return (
    <>
      <label
        htmlFor="security-code"
        className="block mt-4 text-sm font-medium text-gray-900 dark:text-white"
      >
        セキュリティコード
      </label>
      <input
        type="text"
        id="security-code"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="123"
        {...register("card.securityCode")}
      />
    </>
  );
};
