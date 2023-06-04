import RestException from "./RestException";

type RestResponse = {
  status: number;
  body?: object;
  message?: string;
  exception?: RestException;
};
export default RestResponse;
