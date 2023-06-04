import React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Spinner } from "~/components/spinner";
import ProjectGridProps from "../types/ProjectGridProps";

const ProjectGrid: React.FC<ProjectGridProps> = ({
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
            field: "projectName",
            headerName: "Name",
            sortable: false,
            width: 200,
          },
          {
            field: "projectDescription",
            headerName: "Description",
            sortable: false,
            width: 400,
          },
          {
            field: "projectHours",
            headerName: "Hours to finish",
            sortable: false,
            width: 200,
          },
          {
            field: "projectEnd",
            headerName: "End date",
            sortable: false,
            width: 200,
          },
        ]}
        rows={rowData}
        onRowClick={onRowClick}
        getRowId={(row) => row.projectID}
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
export default ProjectGrid;
