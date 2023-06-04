import RestException from "../base-clients/RestException";

type AllActiveProjectsResponse = {
  isException: boolean;
  status: number;
  response: {
    accountID: number;
    createdByAccountID: number;
    dateCreated: string;
    dateUpdated: string;
    projectDescription: string;
    projectEnd: string;
    projectHours: string;
    projectID: number;
    projectName: string;
    total: number;
    updatedByAccountID: number;
    winningBidID: number;
  }[];
  exception?: RestException;
};
export default AllActiveProjectsResponse;
