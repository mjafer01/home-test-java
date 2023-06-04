import RestException from "../base-clients/RestException";

type BidResponse = {
  isException: boolean;
  status: number;
  response: {
    bidID: number;
    projectID: number;
    accountID: number;
    bidPriceTypeID: number;
    price: string;
  };
  exception?: RestException;
};
export default BidResponse;
