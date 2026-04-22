import type { SigninFormData } from "../../schemas/signin";
import type { SignupFormData } from "../../schemas/signup";
import type { SuccessResponse } from "../../types";
// import { authApi } from "../axious";

export const signUp = async (data: SignupFormData) => {
  try {
    // const response = await authApi.post<SuccessResponse>("/signup", data);
    // return response.data;
    // Mocking API response for demonstration purposes
    const response: SuccessResponse = await new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          status: "success",
          data: {
            user: {
              id: "123",
              name: data.name,
              role: "user",
            },
          },
          error: null,
          meta: {
            timestamp: new Date().toISOString(),
          },
        } as SuccessResponse);
      }, 2000);
    });
    return response;
  } catch (error: any) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
    // Error for ui to display
    throw new Error("Failed to sign up");
  }
};

export const signIn = async (data: SigninFormData) => {
  try {
    // const response = await authApi.post<SuccessResponse>("/signin", data);
    // return response.data;
    // Mocking API response for demonstration purposes
    const response: SuccessResponse = await new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          status: "success",
          data: {
            user: {
              id: "123",
              email: data.email,
              role: "user",
            },
          },
          error: null,
          meta: {
            timestamp: new Date().toISOString(),
          },
        } as SuccessResponse);
      }, 2000);
    });
    return response;
  } catch (error: any) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
    // Error for ui to display
    throw new Error("Failed to sign in");
  }
};
