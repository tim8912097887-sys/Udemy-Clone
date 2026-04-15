import { Link } from "react-router";
import { GraduationCap } from "lucide-react";
import Header from "../../components/common/Header";
import Form from "../../components/form/Form";
import InputGroup from "../../components/form/InputGroup";
import Input from "../../components/form/Input";
import TabList from "../../components/common/Tab";
import { useState } from "react";
import { signInFormControls, signUpFormControls } from "../../configs";

const AuthPresenter = () => {
  const [activeTab, setActiveTab] = useState("Sign In");

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
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
        <Form>
          <Form.Head>
            <h1>{activeTab === "Sign In" ? "Sign Up" : "Sign In"}</h1>
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
                    />
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
                    />
                  </InputGroup>
                ))}
              </>
            )}
          </Form.Content>
        </Form>
      </div>
    </div>
  );
};

export default AuthPresenter;
