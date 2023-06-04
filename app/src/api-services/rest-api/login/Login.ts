import LoginResponse from "./LoginResponse";
import RestException from "../base-clients/RestException";
import { RestPost } from "../base-clients";
import APIURLs from "../APIURLs";

const Login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const headers = {
    "Content-Type": "application/json",
    Accept: "*/*",
  };
  const url =
    process.env.REACT_APP_REST_API_URL + APIURLs.base + APIURLs.login.base;
  const body = { email, password };
  const response = await RestPost(url, body, headers);
  if (response.status === 201) {
    const responeOk = {
      isException: false,
      status: response.status,
      response: response.body,
    } as LoginResponse;
    return responeOk;
  }

  return {
    isException: true,
    status: response.status,
    exception: {
      status: response.status,
      message: "",
    } as unknown as RestException,
  } as LoginResponse;
};
export default Login;
