import { createBrowserRouter } from "react-router";
import App from "./App";
import AuthPage from "./pages/auth";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "auth",
        element: <AuthPage />,
      },
    ],
  },
]);
