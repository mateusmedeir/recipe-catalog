import { Suspense } from 'react'

interface FormContainerProps {
  title: string
  children?: React.ReactNode
}

const FormContainer: React.FC<FormContainerProps> = ({ title, children }) => {
  return (
    <div className="w-full h-full flex justify-center items-center py-20">
      <div className=" bg-gray-50 w-full h-fit max-w-lg flex flex-col items-center gap-8 p-12 border border-black/25 rounded-lg">
        <h2 className="w-full text-left text-3xl font-bold">{title}</h2>
        <Suspense>{children}</Suspense>
      </div>
    </div>
  )
}

export default FormContainer
