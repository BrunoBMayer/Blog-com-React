import { z } from "zod";

export const postSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "O título precisa ter pelo menos 3 caracteres"),

  body: z
    .string()
    .trim()
    .min(10, "O conteúdo precisa ter pelo menos 10 caracteres"),

  imageUrl: z
    .string()
    .trim()
    .url("Digite uma URL válida")
    .or(z.literal("")),
});