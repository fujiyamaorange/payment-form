import { z } from "zod";

const cardSchema = z.object({
  id: z.string(),
  maskedCardNumber: z.string(),
  goodThru: z.string(),
  cardHolderName: z.string(),
  // to hold new card data
  cardNumber: z.string().optional(),
  cardHolder: z.string().optional(),
  expiryDate: z.string().optional(),
  securityCode: z.string().optional(),
  save: z.boolean().optional(),
});

const pointSchema = z.object({
  paymentMethod: z.literal("point"),
});

const creditCardSchema = z.object({
  paymentMethod: z.literal("card"),
  card: z.discriminatedUnion("order", [
    // existing card
    cardSchema.merge(
      z.object({
        order: z.literal("first"),
      })
    ),
    cardSchema.merge(
      z.object({
        order: z.literal("second"),
      })
    ),
    cardSchema.merge(
      z.object({
        order: z.literal("third"),
      })
    ),
    // new card
    z.object({
      order: z.literal("new"),
      cardNumber: z.string().min(1, { message: "カード番号は必須項目です" }),
      cardHolder: z.string().min(1, { message: "カード名義人は必須項目です" }),
      expiryDate: z.string().min(5, "有効期限は必須項目です"),
      securityCode: z.string().min(3, "セキュリティコードは必須項目です"),
      save: z.boolean(),
    }),
  ]),
});

export const schema = z.discriminatedUnion("paymentMethod", [
  pointSchema,
  creditCardSchema,
]);

export type CardSchemaType = z.infer<typeof cardSchema>;
export type PointSchemaType = z.infer<typeof pointSchema>;
export type CreditCardSchemaType = z.infer<typeof creditCardSchema>;
export type SchemaType = z.infer<typeof schema>;
