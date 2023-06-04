import React from "react";
import { toast } from "react-toastify";
import SingleProject from "./SingleProject";
import Bids from "./Bids";
import WinningBid from "./WinningBid";
import { CardForm } from "../../../components/card-form";
import { Spinner } from "../../../components/spinner";
import ProjectProps from "../types/ProjectProps";
import Fields from "../utils/Fields";
import FieldsProps from "../../../types/FieldsProps";
import { NewBid as NewBidAPI } from "../../../api-services/rest-api";
const Project: React.FC<ProjectProps> = ({ urlProps, testID }) => {
  const [ajaxLoading, setAjaxLoading] = React.useState(false);
  const [accountID, setAccountID] = React.useState(0);
  const [activeStatus, seActiveStatus] = React.useState(true);
  const [winingBidID, setWiningBidID] = React.useState(-1);

  React.useEffect(() => {
    setAccountID(0);
  }, []);

  const onSubmit = async (data: { bidPriceTypeID: number; price: string }) => {
    setAjaxLoading(true);
    toast.dismiss();
    toast.info("Create new bid. Please wait...", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "colored",
    });
    const response = await NewBidAPI(
      parseInt(urlProps.projectID),
      data.bidPriceTypeID,
      data.price,
      urlProps.session
    );
    toast.dismiss();
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
      setAjaxLoading(false);
      return;
    }
    toast.success("Bid Successfully create", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "colored",
    });

    location.reload();
  };
  if (!urlProps.projectID) {
    return <></>;
  }
  console.log(winingBidID);
  return (
    <>
      <Spinner doOpenSpinner={ajaxLoading} />
      <SingleProject
        urlProps={urlProps}
        updateProjectID={setAccountID}
        setActiveStatus={seActiveStatus}
        setWiningBidID={setWiningBidID}
      />
      <br />
      {activeStatus && urlProps.accountID !== accountID && (
        <CardForm
          initialValues={{ bidPriceTypeID: "", price: "" }}
          onSubmit={onSubmit}
          buttonTiles={"Bid"}
          fields={Fields as FieldsProps}
          title={"Bid on this project"}
        />
      )}
      <br />
      {!activeStatus || winingBidID > 0 ? (
        <>
          <h3>Project is closed</h3>
          {winingBidID > 0 && (
            <WinningBid bidID={winingBidID} session={urlProps.session} />
          )}
        </>
      ) : (
        <Bids
          urlProps={urlProps}
          isWinningBidSelect={urlProps.accountID === accountID}
        />
      )}
    </>
  );
};
export default Project;
