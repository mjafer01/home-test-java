import ProjectResponse from "./BidResponse";
import RestException from "../base-clients/RestException";
import { RestGet, RestPost } from "../base-clients";
import APIURLs from "../APIURLs";

const Bid = async (
  bidID: number,
  session: string
): Promise<ProjectResponse> => {
  const headers = {
    "Content-Type": "application/json",
    Accept: "*/*",
    Authorization: session,
  };
  const url =
    process.env.REACT_APP_REST_API_URL +
    APIURLs.base +
    APIURLs.bids.base +
    APIURLs.bids.bid +
    "/" +
    bidID;
  const response = await RestGet(url, headers);
  if (response.status === 200) {
    const responeOk = {
      isException: false,
      response: response.body,
      status: response.status,
    } as ProjectResponse;
    return responeOk;
  }

  return {
    isException: true,
    status: response.status,
    exception: {
      status: response.status,
      message: "",
    } as unknown as RestException,
  } as ProjectResponse;
};
export default Bid;
