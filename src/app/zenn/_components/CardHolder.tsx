"use client";

import { useFormContext } from "react-hook-form";
import { SchemaType } from "./schema";

export const CardHolder = () => {
  const { register } = useFormContext<SchemaType>();

  return (
    <>
      <label
        htmlFor="card-holder"
        className="block mt-4 text-sm font-medium text-gray-900 dark:text-white"
      >
        カード名義人
      </label>
      <input
        type="text"
        id="card-holder"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="YAMADA TARO"
        {...register("card.cardHolder")}
      />
    </>
  );
};
