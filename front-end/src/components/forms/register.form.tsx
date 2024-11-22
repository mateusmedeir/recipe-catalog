"use client";

import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormInput,
  FormItem,
  FormLabel,
  FormPasswordInput,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { useAuth } from "@/context/authContext";
import Link from "next/link";

export default function RegisterForm() {
  const minPasswordLength = 6;
  const maxPasswordLength = 24;

  const { register } = useAuth();

  const RegisterSchema = z.object({
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
      })
      .refine((data: string): boolean => data === form.getValues().password, {
        message: "Senhas não conferem",
      }),
  });
  type RegisterData = z.infer<typeof RegisterSchema>;

  const form = useForm<RegisterData>({
    resolver: zodResolver(RegisterSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function handleRegisterSubmit(data: RegisterData) {
    if (!form.formState.isValid) return;

    try {
      register(data.name, data.email, data.password, data.confirmPassword);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form
        className="w-full grid gap-6"
        onSubmit={form.handleSubmit(handleRegisterSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <FormInput
                  {...field}
                  type="text"
                  autoCorrect="off"
                  autoComplete="name"
                  autoCapitalize="none"
                  placeholder="Seu nome"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <FormInput
                  {...field}
                  type="email"
                  autoCorrect="off"
                  autoComplete="email"
                  autoCapitalize="none"
                  placeholder="exemplo@email.com"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <FormPasswordInput {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmar senha</FormLabel>
              <FormControl>
                <FormPasswordInput {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full"
          disabled={!form.formState.isValid}
        >
          Cadastrar
        </Button>
        <p>
          Já possui uma conta?{" "}
          <Link className="underline font-medium" href="/login">
            Fazer login
          </Link>
        </p>
      </form>
    </Form>
  );
}
