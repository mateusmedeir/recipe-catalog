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
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/authContext";
import Link from "next/link";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";

export default function LoginForm() {
  const minPasswordLength = 6;
  const maxPasswordLength = 24;

  const { toast } = useToast();
  const { login } = useAuth();

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

  const form = useForm<LoginData>({
    resolver: zodResolver(LoginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleLoginSubmit(data: LoginData) {
    if (!form.formState.isValid) return;

    try {
      await login(data.email, data.password);
    } catch (error: any) {
      toast({
        title: "Falha na autenticação",
        description: error.response.data.message,
        variant: "destructive",
        action: <ToastAction altText="Fechar">Fechar</ToastAction>,
        duration: 6000,
      });
    }
  }

  return (
    <Form {...form}>
      <form
        className="w-full grid gap-6"
        onSubmit={form.handleSubmit(handleLoginSubmit)}
      >
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
                  placeholder="Email"
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
        <Button
          type="submit"
          className="w-full"
          disabled={!form.formState.isValid}
        >
          Login
        </Button>
        <p>
          Não possui uma conta?{" "}
          <Link className="underline font-medium" href="/register">
            Cadastre-se
          </Link>
        </p>
      </form>
    </Form>
  );
}
