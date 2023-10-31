"use client";

import { useFormContext } from "react-hook-form";
import { SchemaType } from "./schema";

export const Checkbox = () => {
  const { register } = useFormContext<SchemaType>();

  return (
    <div className="flex items-start mb-6 mt-4">
      <div className="flex items-center h-5">
        <input
          id="remember"
          type="checkbox"
          value=""
          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
          {...register("card.save")}
        />
      </div>
      <label
        htmlFor="remember"
        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        カード情報を保存する
      </label>
    </div>
  );
};
