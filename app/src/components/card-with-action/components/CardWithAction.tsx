import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import CardWithActionProps from "../types/CardWithActionProps";

const CardWithAction: React.FC<CardWithActionProps> = ({
  title,
  Body,
  Actions,
  Footer,
}) => {
  return (
    <Card sx={{ maxWidth: 375 }}>
      <CardContent>
        {title && (
          <Typography variant="h5" component="div">
            {title}
          </Typography>
        )}

        <Divider />
        <Typography variant="body2" component={"div"}>
          <Body />
        </Typography>
      </CardContent>

      <Divider />
      <CardActions
        disableSpacing
        sx={{
          alignSelf: "stretch",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-start",
          p: 1,
        }}
      >
        <Actions />
      </CardActions>
      {Footer && <Footer />}
    </Card>
  );
};
export default CardWithAction;
