import { signIn, signUp } from "../../api/auth";
import AuthPresenter from "../../components/auth";
import useFormSubmit from "../../hooks/useFormSubmit";
import { SigninSchema, type SigninFormData } from "../../schemas/signin";
import { SignupSchema, type SignupFormData } from "../../schemas/signup";

const AuthPage = () => {
  const { status: signUpStatus, handleSubmit: handleSignUp } =
    useFormSubmit<SignupFormData>({
      submitFunction: signUp,
      validateSchema: SignupSchema,
    });
  const { status: signInStatus, handleSubmit: handleSignIn } =
    useFormSubmit<SigninFormData>({
      submitFunction: signIn,
      validateSchema: SigninSchema,
    });

  return (
    <AuthPresenter
      onSignIn={handleSignIn}
      onSignUp={handleSignUp}
      signInStatus={signInStatus}
      signUpStatus={signUpStatus}
    />
  );
};

export default AuthPage;
