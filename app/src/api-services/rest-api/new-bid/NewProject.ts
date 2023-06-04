import NewProjectResponse from "./NewProjectResponse";
import RestException from "../base-clients/RestException";
import { RestPost } from "../base-clients";
import APIURLs from "../APIURLs";

const NewProject = async (
  projectName: string,
  projectDescription: string,
  projectHours: string,
  projectEnd: string,
  session: string
): Promise<NewProjectResponse> => {
  const headers = {
    "Content-Type": "application/json",
    Accept: "*/*",
    Authorization: session,
  };
  const url =
    process.env.REACT_APP_REST_API_URL +
    APIURLs.base +
    APIURLs.projects.base +
    APIURLs.projects.project;
  const body = { projectName, projectDescription, projectHours, projectEnd };
  const response = await RestPost(url, body, headers);
  if (response.status === 201) {
    const responeOk = {
      isException: false,
      status: response.status,
    } as NewProjectResponse;
    return responeOk;
  }

  return {
    isException: true,
    status: response.status,
    exception: {
      status: response.status,
      message: "",
    } as unknown as RestException,
  } as NewProjectResponse;
};
export default NewProject;
