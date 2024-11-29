import { z } from "zod";

const minPasswordLength = 6;
const maxPasswordLength = 24;

const LoginSchema = z.object({
    email: z.string().email({
      message: "Email inválido",
    }),
    password: z
      .string()
      .min(minPasswordLength, {
        message: "Senha deve ter no mínimo 6 caracteres",
      })
      .max(maxPasswordLength, {
        message: "Senha deve ter no máximo 24 caracteres",
      }),
  });
  type LoginData = z.infer<typeof LoginSchema>;

export { LoginSchema, type LoginData };