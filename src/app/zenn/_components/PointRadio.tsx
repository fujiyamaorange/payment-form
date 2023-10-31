"use client";

import { useFormContext } from "react-hook-form";
import { SchemaType } from "./schema";

export const PointRadio = () => {
  const { register } = useFormContext<SchemaType>();

  return (
    <section className="flex items-center mb-4">
      <input
        id="country-option-1"
        type="radio"
        value="point"
        className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
        {...register("paymentMethod")}
      />
      <label
        htmlFor="country-option-1"
        className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer"
      >
        ポイント払い
      </label>
    </section>
  );
};
