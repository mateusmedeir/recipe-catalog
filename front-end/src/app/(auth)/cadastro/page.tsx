import FormContainer from '@/components/form-container'
import RegisterForm from '@/components/forms/register.form'
import Topbar from '@/components/topbar'

export default function Register() {
  return (
    <main className='w-full flex flex-col'>
      <Topbar type='simple' />
      <FormContainer title="Cadastro" inputSkeletonAmount={4}>
        <RegisterForm />
      </FormContainer>
    </main>
  )
}
