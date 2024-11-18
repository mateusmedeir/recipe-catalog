'use client'

import { z } from 'zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from '@/components/ui/form'
import { Input } from '../ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { PasswordInput } from '../ui/password-input'
import { useAuth } from '@/context/authContext'

export default function LoginForm() {
  const minPasswordLength = 6
  const maxPasswordLength = 24

  const { login } = useAuth()

  const LoginSchema = z.object({
    email: z.string().email({
      message: 'Email inválido'
    }),
    password: z
      .string()
      .min(minPasswordLength, {
        message: 'Senha deve ter no mínimo 6 caracteres'
      })
      .max(maxPasswordLength, {
        message: 'Senha deve ter no máximo 24 caracteres'
      })
  })
  type LoginData = z.infer<typeof LoginSchema>

  const form = useForm<LoginData>({
    resolver: zodResolver(LoginSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: ''
    }
  })

  async function handleLoginSubmit(data: LoginData) {
    if (!form.formState.isValid) return

    try {
      login(data.email, data.password)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Form {...form}>
      <form className="w-full grid gap-6"
      onSubmit={form.handleSubmit(handleLoginSubmit)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
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
                <PasswordInput {...field} />
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
        <p>Don't have an account? Sign up</p>
      </form>
    </Form>
  )
}
