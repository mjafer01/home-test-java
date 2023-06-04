import RestException from "../base-clients/RestException";

type NewBidResponse = {
  isException: boolean;
  status: number;
  exception?: RestException;
};
export default NewBidResponse;
