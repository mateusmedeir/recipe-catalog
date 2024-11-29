"use client";

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
import { useAuth } from "@/contexts/auth.context";
import Link from "next/link";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { LoginData, LoginSchema } from "@/libs/schemas/login.schema";

export default function LoginForm() {
  const { login } = useAuth();
  const { toast } = useToast();

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
      await login(data);
    } catch (error: any) {
      toast({
        title: "Falha na autenticação",
        description: "Email ou senha incorretos",
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
          variant="primary"
          type="submit"
          className="w-full"
          disabled={!form.formState.isValid}
        >
          Login
        </Button>
        <p>
          Não possui uma conta?{" "}
          <Link className="underline font-medium" href="/cadastro">
            Cadastre-se
          </Link>
        </p>
      </form>
    </Form>
  );
}
