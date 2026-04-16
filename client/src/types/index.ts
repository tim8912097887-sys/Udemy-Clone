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
