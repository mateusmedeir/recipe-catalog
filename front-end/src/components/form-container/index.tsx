import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface FormContainerProps {
  title: string;
  inputSkeletonAmount?: number;
  children?: React.ReactNode;
}

const FormContainer: React.FC<FormContainerProps> = ({
  title,
  inputSkeletonAmount = 2,
  children,
}) => {
  return (
    <div className="container flex justify-center items-center py-12">
      <div className="w-full max-w-lg flex flex-col items-center gap-8">
        <h2 className="w-full text-left text-3xl font-bold">{title}</h2>
        <Suspense
          fallback={
            <div className="w-full grid gap-6">
              {Array.from({ length: inputSkeletonAmount }).map((_, index) => (
                <div key={index} className="grid gap-2">
                  <Skeleton className="h-4 w-full max-w-16" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
              <Skeleton className="h-10 w-full" />
            </div>
          }
        >
          {children}
        </Suspense>
      </div>
    </div>
  );
};

export default FormContainer;
