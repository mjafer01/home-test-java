import RestException from "../base-clients/RestException";

type LoginResponse = {
  isException: boolean;
  status: number;
  response?: {
    session: string;
    expiredDate: string;
    account: {
      accountID: number;
      firstName: string;
      lastName: string;
    };
    accountLogin: {
      accountID: number;
      email: string;
      password: string;
      lastLogin: string;
    };
    accountTypes: { accountTypeID: number }[];
  }[];
  exception?: RestException;
};
export default LoginResponse;
