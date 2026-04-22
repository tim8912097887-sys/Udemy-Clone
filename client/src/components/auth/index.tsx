import { Link } from "react-router";
import { GraduationCap } from "lucide-react";
import Header from "../common/Header";
import Form from "../form/Form";
import InputGroup from "../form/InputGroup";
import Input from "../form/Input";
import { useState } from "react";
import { signInFormControls, signUpFormControls } from "../../configs";
import useFormData from "../../hooks/useFormData";
import Button from "../common/Button";
import { SignupSchema, type SignupFormData } from "../../schemas/signup";
import { SigninSchema, type SigninFormData } from "../../schemas/signin";
import ErrorMessage from "../common/ErrorMessage";
import Tab from "../common/Tab";

type Props = {
  onSignIn: (data: SigninFormData) => Promise<void>;
  onSignUp: (data: SignupFormData) => Promise<void>;
  signInStatus: {
    isSubmitting: boolean;
    isSuccess: boolean;
    error: string | null;
  };
  signUpStatus: {
    isSubmitting: boolean;
    isSuccess: boolean;
    error: string | null;
  };
};

const AuthPresenter = ({
  onSignIn,
  onSignUp,
  signInStatus,
  signUpStatus,
}: Props) => {
  const [activeTab, setActiveTab] = useState("Sign In");

  const {
    error: signUpError,
    formData: signUpFormData,
    handleChange: handleSignUpChange,
  } = useFormData<SignupFormData>({
    initialValue: {
      name: "",
      email: "",
      password: "",
    },
    schemaValidater: SignupSchema,
  });

  const {
    error: signInError,
    formData: signInFormData,
    handleChange: handleSignInChange,
  } = useFormData<SigninFormData>({
    initialValue: {
      email: "",
      password: "",
    },
    schemaValidater: SigninSchema,
  });

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (activeTab === "Sign In") {
      await onSignIn(signInFormData);
    } else {
      await onSignUp(signUpFormData);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header>
        <Link to="/" className="flex items-center justify-center">
          <GraduationCap className="h-8 w-8 mr-4" />
          <span className="font-extrabold text-xl">LMS LEARN</span>
        </Link>
      </Header>
      <div className="flex flex-col items-center justify-center min-h-screen bg-background gap-5">
        <Tab
          activeTab={activeTab}
          setActiveTab={handleTabChange}
          className="w-full max-w-md"
        >
          <Tab.List className="w-full grid grid-cols-2">
            <Tab.Trigger value="Sign In">Sign In</Tab.Trigger>
            <Tab.Trigger value="Sign Up">Sign Up</Tab.Trigger>
          </Tab.List>
          <Tab.Content value="Sign In">
            <Form onSubmit={handleSubmit}>
              <Form.Head>Sign In</Form.Head>
              <Form.Content>
                {signInFormControls.map((control) => (
                  <InputGroup
                    key={control.name}
                    label={control.label}
                    name={control.name}
                  >
                    <Input
                      placeholder={control.placeholder}
                      value={signInFormData[control.name]}
                      type={control.type}
                      name={control.name}
                      onChange={handleSignInChange}
                    />
                    {signInError[control.name] && (
                      <ErrorMessage>{signInError[control.name]}</ErrorMessage>
                    )}
                  </InputGroup>
                ))}
                <Button type="submit" disabled={signInStatus.isSubmitting}>
                  {signInStatus.isSubmitting ? "Signing In..." : "Sign In"}
                </Button>
              </Form.Content>
            </Form>
          </Tab.Content>
          <Tab.Content value="Sign Up">
            <Form onSubmit={handleSubmit}>
              <Form.Head>Sign Up</Form.Head>
              <Form.Content>
                {signUpFormControls.map((control) => (
                  <InputGroup
                    key={control.name}
                    label={control.label}
                    name={control.name}
                  >
                    <Input
                      placeholder={control.placeholder}
                      value={signUpFormData[control.name]}
                      type={control.type}
                      name={control.name}
                      onChange={handleSignUpChange}
                    />
                    {signUpError[control.name] && (
                      <ErrorMessage>{signUpError[control.name]}</ErrorMessage>
                    )}
                  </InputGroup>
                ))}
                <Button type="submit" disabled={signUpStatus.isSubmitting}>
                  {signUpStatus.isSubmitting ? "Signing Up..." : "Sign Up"}
                </Button>
              </Form.Content>
            </Form>
          </Tab.Content>
        </Tab>
      </div>
    </div>
  );
};

export default AuthPresenter;
