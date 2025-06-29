import { SignIn } from "@clerk/nextjs";
//import { notFound } from "next/navigation";

export default function SignInPage() {
  // TODO: What was this for?
  //const data = true ? ["Data"] : null;
  //if (!data) notFound();
  return (
    <>
      <h1>Please sign in to your account</h1> <SignIn />
    </>
  );
}
