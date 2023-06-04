import RestException from "../base-clients/RestException";

type NewProjectResponse = {
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
    projectID: 3;
    projectName: "projectName";
    isActive: number;
    updatedByAccountID: number;
    winningBidID: number;
  };
  exception?: RestException;
};
export default NewProjectResponse;
