import RestException from "../base-clients/RestException";

type ProjectWinningBidResponse = {
  isException: boolean;
  status: number;
  exception?: RestException;
};
export default ProjectWinningBidResponse;
