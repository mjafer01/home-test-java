import RegisterAccountResponse from "./RegisterAccountResponse";
import RestException from "../base-clients/RestException";
import { RestPost } from "../base-clients";
import APIURLs from "../APIURLs";

const RegisterAccount = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
): Promise<RegisterAccountResponse> => {
  const headers = {
    "Content-Type": "application/json",
    Accept: "*/*",
  };
  const url =
    process.env.REACT_APP_REST_API_URL + APIURLs.base + APIURLs.register.base;
  const body = { email, password, firstName, lastName };
  const response = await RestPost(url, body, headers);
  if (response.status === 201) {
    const responeOk = {
      isException: false,
      status: response.status,
    } as RegisterAccountResponse;
    return responeOk;
  }
  if (response.status === 400) {
    return {
      isException: true,
      status: 400,
      exception: {
        status: 400,
        message: response.message,
      } as unknown as RestException,
    } as RegisterAccountResponse;
  }

  return {
    isException: true,
    status: response.status,
    exception: {
      status: response.status,
      message: "",
    } as unknown as RestException,
  } as RegisterAccountResponse;
};
export default RegisterAccount;
