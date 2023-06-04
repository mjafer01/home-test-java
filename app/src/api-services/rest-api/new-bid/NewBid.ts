import NewBidResponse from "./NewBidResponse";
import RestException from "../base-clients/RestException";
import { RestPost } from "../base-clients";
import APIURLs from "../APIURLs";

const NewBid = async (
  projectID: number,
  bidPriceTypeID: number,
  price: string,
  session: string
): Promise<NewBidResponse> => {
  const headers = {
    "Content-Type": "application/json",
    Accept: "*/*",
    Authorization: session,
  };
  const url =
    process.env.REACT_APP_REST_API_URL +
    APIURLs.base +
    APIURLs.bids.base +
    APIURLs.bids.bid;
  const body = { projectID, bidPriceTypeID, price };
  const response = await RestPost(url, body, headers);
  if (response.status === 201) {
    const responeOk = {
      isException: false,
      status: response.status,
    } as NewBidResponse;
    return responeOk;
  }

  return {
    isException: true,
    status: response.status,
    exception: {
      status: response.status,
      message: "",
    } as unknown as RestException,
  } as NewBidResponse;
};
export default NewBid;
