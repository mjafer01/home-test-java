import React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import { Spinner } from "~/components/spinner";
import BidGridPropsProps from "../types/BidGridProps";

const BidGrid: React.FC<BidGridPropsProps> = ({
  height,
  rowData,
  paginationModel,
  setPaginationModel,
  onRowClick,
}) => {
  return (
    <Box sx={{ height: height, width: "100%", maxWidth: 1000 }}>
      <DataGrid
        columns={[
          {
            field: "bidPriceTypeID",
            headerName: "Type",
            sortable: false,
            width: 200,
            renderCell: (params: GridRenderCellParams<any>) => (
              <>{params.value === 1 ? <>Fixed Price</> : <>Hourly</>} </>
            ),
          },
          {
            field: "price",
            headerName: "Price",
            sortable: false,
            width: 400,
          },
        ]}
        rows={rowData}
        onRowClick={onRowClick}
        getRowId={(row) => row.bidID}
        rowHeight={38}
        paginationMode="server"
        rowCount={rowData.length > 0 && rowData[0].total ? rowData[0].total : 0}
        pageSizeOptions={[10]}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        disableColumnSelector
        disableColumnFilter
        disableVirtualization
      />
    </Box>
  );
};
export default BidGrid;
