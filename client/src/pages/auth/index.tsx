import { Link } from "react-router";
import { GraduationCap } from "lucide-react";
import Header from "../../components/common/Header";
import Form from "../../components/form/Form";
import InputGroup from "../../components/form/InputGroup";
import Input from "../../components/form/Input";

const AuthPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header>
        <Link to="/" className="flex items-center justify-center">
          <GraduationCap className="h-8 w-8 mr-4" />
          <span className="font-extrabold text-xl">LMS LEARN</span>
        </Link>
      </Header>
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Form>
          <Form.Head>
            <h1>Sign In</h1>
          </Form.Head>
          <Form.Content>
            <InputGroup name="Email">
              <Input placeholder="Enter your email" type="email" name="email" />
            </InputGroup>
            <InputGroup name="Password">
              <Input
                placeholder="Enter your password"
                type="password"
                name="password"
              />
            </InputGroup>
          </Form.Content>
        </Form>
      </div>
    </div>
  );
};

export default AuthPage;
