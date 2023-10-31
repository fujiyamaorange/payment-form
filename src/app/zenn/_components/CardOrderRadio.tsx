"use client";

import { useFormContext } from "react-hook-form";
import { SchemaType } from "./schema";

type Props = {
  title: "first" | "second" | "third" | "new";
  label: string;
  cards: {
    id: string;
    maskedCardNumber: string;
    goodThru: string;
    cardHolderName: string;
    order: "first" | "second" | "third";
  }[];
};
export const CardOrderRadio = ({ title, label, cards }: Props) => {
  const { register, setValue, getValues } = useFormContext<SchemaType>();

  return (
    <section className="flex items-center mb-4">
      <input
        id={`${title}-card`}
        type="radio"
        value={title}
        className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
        {...register("card.order")}
        onChange={(e) => {
          setValue(
            "card.order",
            e.target.value as "first" | "second" | "third" | "new"
          );
          const selected = cards.find((card) => card.order === e.target.value);

          if (selected) {
            console.log({ selected });
            const cardValues = getValues("card");
            setValue("card", {
              ...cardValues,
              ...selected,
            });
          }
        }}
      />
      <label
        htmlFor={`${title}-card`}
        className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer"
      >
        {label}
      </label>
    </section>
  );
};
