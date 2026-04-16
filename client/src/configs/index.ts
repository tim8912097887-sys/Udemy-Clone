export const signUpFormControls = [
  {
    name: "name" as const,
    label: "User Name",
    placeholder: "Enter your user name",
    type: "text",
  },
  {
    name: "email" as const,
    label: "User Email",
    placeholder: "Enter your user email",
    type: "email",
  },
  {
    name: "password" as const,
    label: "Password",
    placeholder: "Enter your password",
    type: "password",
  },
];

export const signInFormControls = [
  {
    name: "email" as const,
    label: "User Email",
    placeholder: "Enter your user email",
    type: "email",
  },
  {
    name: "password" as const,
    label: "Password",
    placeholder: "Enter your password",
    type: "password",
  },
];
