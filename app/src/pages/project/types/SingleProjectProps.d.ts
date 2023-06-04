type SingleProjectProps = {
  urlProps: { projectID: string; session: string };
  testID?: string;
  updateProjectID: (accountID: number) => void;
  setActiveStatus: (activeStatus: boolean) => void;
  setWiningBidID: (winingBidID: number) => void;
};
export default SingleProjectProps;
