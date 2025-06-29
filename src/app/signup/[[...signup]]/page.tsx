import { SignUp } from "@clerk/nextjs";
//import { notFound } from "next/navigation";

export default function SignUpPage() {
  return (
    <>
      <h1>Please create your new account</h1> <SignUp />
      <p>You will then be taken to complete your profile and bio.</p>
    </>
  );
}
