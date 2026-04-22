import { createBrowserRouter } from "react-router";
import App from "./App";
import AuthPage from "./pages/auth";
import RouteGuard from "./components/route-guards/RouteGuard";
import InstructorDashboard from "./pages/instructor";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "auth",
        element: (
          <RouteGuard>
            <AuthPage />
          </RouteGuard>
        ),
      },
      {
        path: "instructor",
        element: <InstructorDashboard />,
      },
    ],
  },
]);
