import FormContainer from '@/components/form-container'
import RegisterForm from '@/components/forms/register.form'

export default function Register() {
  return (
    <main className='w-full h-full flex flex-col'>
      <FormContainer title="Cadastro" inputSkeletonAmount={4}>
        <RegisterForm />
      </FormContainer>
    </main>
  )
}
