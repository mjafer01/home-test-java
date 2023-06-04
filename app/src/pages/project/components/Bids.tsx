import React from "react";
import { toast } from "react-toastify";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Sleep from "../../../utils/Sleep";
import ProjectProps from "../types/ProjectProps";
import {
  ProjectBids as ProjectBidsAPI,
  ProjectWinningBid as ProjectWinningBidAPI,
} from "../../../api-services/rest-api";
import { Spinner } from "../../../components/spinner";
import { BidGrid } from "../../../components/bid-grid";

const Bids: React.FC<ProjectProps> = ({
  urlProps,
  testID,
  isWinningBidSelect,
}) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const rowBidData = React.useRef<any>([]);

  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 10,
    page: 0,
  });

  React.useEffect(() => {
    if (!urlProps.session) {
      return;
    }
    console.log(urlProps);
    loadBidData();
  }, [paginationModel, urlProps.session, urlProps.projectID]);

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
    const response = await ProjectBidsAPI(
      parseInt(urlProps.projectID),
      paginationModel.page,
      paginationModel.pageSize,
      urlProps.session
    );
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
    rowBidData.current = response.response;
    toast.dismiss();
    setIsLoading(false);
  };

  const attachWinningBid = async (bidID: number) => {
    setIsLoading(true);
    toast.info("Updating. Please wait...", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "colored",
    });
    const response = await ProjectWinningBidAPI(
      parseInt(urlProps.projectID),
      bidID,
      urlProps.session
    );
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
    toast.dismiss();
    toast.success("Winning Bid Selected", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "colored",
    });
    await Sleep(5000);
    location.reload();
  };
  return (
    <>
      <Spinner doOpenSpinner={isLoading} />
      <BidGrid
        height={520}
        rowData={rowBidData.current}
        onRowClick={async (row: any) => {
          if (isWinningBidSelect) {
            await attachWinningBid(row.id);
          }
        }}
        paginationModel={paginationModel}
        setPaginationModel={setPaginationModel}
      />
    </>
  );
};
export default Bids;
