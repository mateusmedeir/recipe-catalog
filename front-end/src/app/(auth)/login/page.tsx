import LoginForm from '@/components/forms/login.form'
import FormContainer from '@/components/form-container'
import Topbar from '@/components/topbar'

export default function Login() {
  return (
    <main className='w-full flex flex-col'>
      <Topbar type='simple' />
      <FormContainer title="Login">
        <LoginForm />
      </FormContainer>
    </main>
  )
}
