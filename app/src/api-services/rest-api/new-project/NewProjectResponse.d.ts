import RestException from "../base-clients/RestException";

type NewProjectResponse = {
  isException: boolean;
  status: number;
  exception?: RestException;
};
export default NewProjectResponse;
