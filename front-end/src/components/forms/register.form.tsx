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
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { RegisterData, RegisterSchema } from "@/libs/schemas/register.schema";

export default function RegisterForm() {
  const { toast } = useToast();
  const { register } = useAuth();

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
      await register(data);
    } catch (error: any) {
      console.log("Test");
      toast({
        title: "Falha no cadastro",
        description: "Email já cadastrado",
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
          variant="primary"
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
