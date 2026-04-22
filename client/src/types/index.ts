type State = "success" | "error" | "redirect";

type ErrorObject = {
  status: string;
  code: number;
  detail: string;
};

interface ResponseStructure {
  status: State;
  data: any | null;
  error: ErrorObject | null;
  meta: {
    timestamp: string;
  };
}

export interface SuccessResponse extends ResponseStructure {
  status: "success";
  data: any;
  error: null;
}

export type AuthenticatedUser = {
  id: string;
  name: string;
  role: "user" | "admin" | "instructor";
};

export type AuthProviderValue = {
  user: null | AuthenticatedUser;
  isAuthenticated: boolean;
  handleLoginState: (user: AuthenticatedUser) => void;
  handleLogoutState: () => void;
};

export type TabProviderValue = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};
