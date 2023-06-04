import { string } from "prop-types";
import ProjectWinningBidResponse from "./ProjectWinningBidResponse";
import RestException from "../base-clients/RestException";
import { RestGet, RestPost } from "../base-clients";
import APIURLs from "../APIURLs";

const ProjectWinningBid = async (
  projectID: number,
  bidID: number,
  session: string
): Promise<ProjectWinningBidResponse> => {
  const headers = {
    "Content-Type": "application/json",
    Accept: "*/*",
    Authorization: session,
  };
  const url =
    process.env.REACT_APP_REST_API_URL +
    APIURLs.base +
    APIURLs.projects.base +
    APIURLs.projects.bid;
  const body = { projectID, bidID };
  const response = await RestPost(url, body, headers);
  if (response.status === 204) {
    const responeOk = {
      isException: false,
      status: response.status,
    } as ProjectWinningBidResponse;
    return responeOk;
  }

  return {
    isException: true,
    status: response.status,
    exception: {
      status: response.status,
      message: "",
    } as unknown as RestException,
  } as ProjectWinningBidResponse;
};
export default ProjectWinningBid;
