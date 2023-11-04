"use client";

import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SchemaType, schema } from "./schema";
import { PointRadio } from "./PointRadio";
import { CardRadio } from "./CardRadio";
import { CardNumber } from "./CardNumber";
import { CardHolder } from "./CardHolder";
import { ExpiryDate } from "./ExpiryDate";
import { SecurityCode } from "./SecurityCode";
import { useEffect, useState } from "react";
import { CardOrderRadio } from "./CardOrderRadio";
import { Checkbox } from "./Checkbox";

export const Form = () => {
  const [existingCards, setCards] = useState<
    {
      id: string;
      maskedCardNumber: string;
      goodThru: string;
      cardHolderName: string;
    }[]
  >([]);

  useEffect(() => {
    // 本来はAPIから取得する
    setCards([
      {
        id: "card-id1",
        maskedCardNumber: "**** **** **** 1111",
        goodThru: "12/27",
        cardHolderName: "SUZUKI JIRO",
      },
      {
        id: "card-id2",
        maskedCardNumber: "**** **** **** 2222",
        goodThru: "11/27",
        cardHolderName: "TAKEUCHI SABURO",
      },
    ]);

    // Apollo Clientの場合、onCompletedで実行する
    methods.reset({
      paymentMethod: undefined,
      card: {
        order: "first",
        id: "card-id1",
        maskedCardNumber: "**** **** **** 1111",
        cardHolderName: "SUZUKI JIRO",
        goodThru: "12/27",
        // カードが3枚以上あればfalseにする
        save: true,
      },
    });
  }, []);

  const methods = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      paymentMethod: undefined,
      card: {
        order: "new",
        save: true,
      },
    },
  });

  const label = ["first", "second", "third"] as const;
  const cards = existingCards.slice(0, label.length).map((card, index) => {
    return {
      ...card,
      order: label[index],
    };
  });

  const paymentMethod = methods.watch("paymentMethod");
  const order = methods.watch("card.order");

  const onSubmit: SubmitHandler<SchemaType> = (data) => {
    console.log(data);
    if (data.paymentMethod === "point") {
      alert(`支払い方法: ${data.paymentMethod}`);
    } else if (data.card.order === "new") {
      alert(
        `支払い方法: ${data.paymentMethod}\n カード番号: ${data.card.cardNumber}`
      );
    } else {
      alert(`支払い方法: ${data.paymentMethod}\n カードID: ${data.card.id}`);
    }
  };

  const onError: SubmitErrorHandler<SchemaType> = (errors) => {
    console.log(errors);
    alert("フォームエラー");
  };

  return (
    <FormProvider {...methods}>
      <form
        className="w-80 mx-auto mt-40"
        onSubmit={methods.handleSubmit(onSubmit, onError)}
      >
        <PointRadio />
        <CardRadio />

        <div className="ml-8">
          {paymentMethod === "card" && (
            <>
              {cards.map((card) => (
                <CardOrderRadio
                  key={card.id}
                  title={card.order}
                  label={card.maskedCardNumber}
                  cards={cards}
                />
              ))}
              <CardOrderRadio
                title="new"
                label="新しいカードを登録する"
                cards={cards}
              />

              <>
                {order === "new" && (
                  <>
                    <CardNumber />
                    <CardHolder />
                    <ExpiryDate />
                    <SecurityCode />
                    <Checkbox />
                  </>
                )}
              </>
            </>
          )}
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="text-white mt-8 w-full disabled:bg-slate-500 disabled:hover:bg-slate-500 disabled:cursor-not-allowed bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            disabled={!paymentMethod}
          >
            支払う
          </button>
        </div>
      </form>
    </FormProvider>
  );
};
