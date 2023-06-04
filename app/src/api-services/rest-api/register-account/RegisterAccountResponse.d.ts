import RestException from "../base-clients/RestException";

type RegisterAccountResponse = {
  isException: boolean;
  status: number;
  exception?: RestException;
};
export default RegisterAccountResponse;
