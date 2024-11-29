import { z } from "zod";

const minPasswordLength = 6;
const maxPasswordLength = 24;

const RegisterSchema = z
  .object({
    name: z
      .string()
      .min(3, {
        message: "Nome deve ter no mínimo 3 caracteres",
      })
      .max(50, {
        message: "Nome deve ter no máximo 50 caracteres",
      }),
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
    confirmPassword: z
      .string()
      .min(minPasswordLength, {
        message: "Senha deve ter no mínimo 6 caracteres",
      })
      .max(maxPasswordLength, {
        message: "Senha deve ter no máximo 24 caracteres",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não conferem",
    path: ["confirmPassword"],
  });

type RegisterData = z.infer<typeof RegisterSchema>;

export { RegisterSchema, type RegisterData };
