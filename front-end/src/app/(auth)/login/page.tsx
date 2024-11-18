import LoginForm from '@/components/forms/login.form'
import FormContainer from '@/components/form-container'

export default function Login() {
  return (
    <main className='w-full h-full'>
      <FormContainer title="Login">
        <LoginForm />
      </FormContainer>
    </main>
  )
}
