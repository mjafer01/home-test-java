import React from "react";
import { toast } from "react-toastify";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Sleep from "../../../utils/Sleep";
import ProjectProps from "../types/ProjectProps";
import { Bid as BidAPI } from "../../../api-services/rest-api";
import { Spinner } from "../../../components/spinner";
import { BidGrid } from "../../../components/bid-grid";
import WinningBidProps from "../types/WinningBidProps";

const WinningBid: React.FC<WinningBidProps> = ({ bidID, session, testID }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const rowBidData = React.useRef<any>([]);

  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 10,
    page: 0,
  });

  React.useEffect(() => {
    if (!bidID) {
      return;
    }
    loadBidData();
  }, []);

  const loadBidData = async () => {
    setIsLoading(true);
    toast.info("Loading bid data. Please wait...", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "colored",
    });
    const response = await BidAPI(bidID, session);
    if (response.isException) {
      toast.warning(
        "Some thing has gone horribly wrong. Please contact us if it persists",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "colored",
        }
      );

      setIsLoading(false);
    }
    rowBidData.current = [response.response];
    toast.dismiss();
    setIsLoading(false);
  };

  return (
    <>
      <Spinner doOpenSpinner={isLoading} />
      <h5>Winning Bid</h5>
      <BidGrid
        rowData={rowBidData.current}
        onRowClick={(row: any) => {}}
        height={200}
        paginationModel={{
          pageSize: 10,
          page: 0,
        }}
        setPaginationModel={() => {}}
      />
    </>
  );
};
export default WinningBid;
