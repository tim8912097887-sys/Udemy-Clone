import { signIn, signUp } from "../../api/auth";
import AuthPresenter from "../../components/auth";
import useAuth from "../../hooks/useAuth";
import useFormSubmit from "../../hooks/useFormSubmit";
import { SigninSchema, type SigninFormData } from "../../schemas/signin";
import { SignupSchema, type SignupFormData } from "../../schemas/signup";

const AuthPage = () => {
  const { handleLoginState } = useAuth();

  const { status: signUpStatus, handleSubmit: handleSignUp } =
    useFormSubmit<SignupFormData>({
      submitFunction: async (formData) => {
        await signUp(formData);
      },
      validateSchema: SignupSchema,
    });
  const { status: signInStatus, handleSubmit: handleSignIn } =
    useFormSubmit<SigninFormData>({
      submitFunction: async (formData) => {
        const response = await signIn(formData);
        handleLoginState(response.data.user);
      },
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
