import { string } from "prop-types";
import AllActiveProjectsResponse from "./AllActiveProjectsResponse";
import RestException from "../base-clients/RestException";
import { RestGet, RestPost } from "../base-clients";
import APIURLs from "../APIURLs";

const AllActiveProjects = async (
  pageNumber: number,
  pageSize: number,
  session: string
): Promise<AllActiveProjectsResponse> => {
  const headers = {
    "Content-Type": "application/json",
    Accept: "*/*",
    Authorization: session,
  };
  const url =
    process.env.REACT_APP_REST_API_URL +
    APIURLs.base +
    APIURLs.projects.base +
    "/active/" +
    pageNumber * pageSize +
    "/" +
    pageSize;
  const response = await RestGet(url, headers);
  if (response.status === 200) {
    const responeOk = {
      isException: false,
      response: response.body,
      status: response.status,
    } as AllActiveProjectsResponse;
    return responeOk;
  }

  return {
    isException: true,
    status: response.status,
    exception: {
      status: response.status,
      message: "",
    } as unknown as RestException,
  } as AllActiveProjectsResponse;
};
export default AllActiveProjects;
