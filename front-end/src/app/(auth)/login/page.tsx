import LoginForm from "@/components/forms/login.form";
import FormContainer from "@/components/common/form-container";
import Topbar from "@/components/common/topbar";
import { Suspense } from "react";

export default function Login() {
  return (
    <main className="w-full flex flex-col">
      <Topbar type="simple" />
      <FormContainer title="Login">
        <LoginForm />
      </FormContainer>
    </main>
  );
}
