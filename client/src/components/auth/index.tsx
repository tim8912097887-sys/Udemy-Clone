import { Link } from "react-router";
import { GraduationCap } from "lucide-react";
import Header from "../common/Header";
import Form from "../form/Form";
import InputGroup from "../form/InputGroup";
import Input from "../form/Input";
import TabList from "../common/Tab";
import { useState } from "react";
import { signInFormControls, signUpFormControls } from "../../configs";
import useFormData from "../../hooks/useFormData";
import Button from "../common/Button";
import { SignupSchema, type SignupFormData } from "../../schemas/signup";
import { SigninSchema, type SigninFormData } from "../../schemas/signin";
import ErrorMessage from "../common/ErrorMessage";

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
        <TabList>
          <TabList.Tab
            name="Sign In"
            currentActive={activeTab}
            onClick={handleTabChange}
          />
          <TabList.Tab
            name="Sign Up"
            currentActive={activeTab}
            onClick={handleTabChange}
          />
        </TabList>
        <Form onSubmit={handleSubmit}>
          <Form.Head>
            <h1>{activeTab === "Sign In" ? "Sign In" : "Sign Up"}</h1>
          </Form.Head>
          <Form.Content>
            {activeTab === "Sign In" ? (
              <>
                {signInFormControls.map((control) => (
                  <InputGroup key={control.name} name={control.label}>
                    <Input
                      placeholder={control.placeholder}
                      type={control.type}
                      name={control.name}
                      onChange={handleSignInChange}
                      value={
                        signInFormData[
                          control.name as keyof typeof signInFormData
                        ]
                      }
                    />
                    {signInError?.[control.name] && (
                      <ErrorMessage>{signInError[control.name]}</ErrorMessage>
                    )}
                  </InputGroup>
                ))}
              </>
            ) : (
              <>
                {signUpFormControls.map((control) => (
                  <InputGroup key={control.name} name={control.label}>
                    <Input
                      placeholder={control.placeholder}
                      type={control.type}
                      name={control.name}
                      onChange={handleSignUpChange}
                      value={
                        signUpFormData[
                          control.name as keyof typeof signUpFormData
                        ]
                      }
                    />
                    {signUpError?.[control.name] && (
                      <ErrorMessage>{signUpError[control.name]}</ErrorMessage>
                    )}
                  </InputGroup>
                ))}
              </>
            )}
            <Button
              customClassName="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 w-full"
              type="submit"
            >
              {activeTab === "Sign In"
                ? signInStatus.isSubmitting
                  ? "Signing In..."
                  : "Sign In"
                : signUpStatus.isSubmitting
                  ? "Signing Up..."
                  : "Sign Up"}
            </Button>
          </Form.Content>
        </Form>
      </div>
    </div>
  );
};

export default AuthPresenter;
