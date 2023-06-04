import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import shortid from "shortid";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { RoutePrivateProps } from "../types";
import { UserContext } from "../../../contexts/userContext";

const RoutePrivate: React.FC<RoutePrivateProps> = ({
  componentProps,
  Component,
  testID,
  urlProps,
}) => {
  const { getUserSession } = React.useContext(UserContext);
  const [privateURLProps, setPrivateURLProps] = React.useState<any>({});
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const props =
    componentProps && componentProps.component ? componentProps.component : {};
  const navigate = useNavigate();
  const loadedUser = getUserSession();
  React.useEffect(() => {
    if (!loadedUser.isLogin) {
      navigate("/login");
    }
    let localURLProps = urlProps;
    localURLProps["session"] = loadedUser.session;
    localURLProps["accountID"] = loadedUser.account.accountID;
    setPrivateURLProps(localURLProps);
  }, []);
  React.useEffect(() => {
    if (!loadedUser.isLogin) {
      navigate("/login");
    }
    let localURLProps = urlProps;
    localURLProps["session"] = loadedUser.session;
    localURLProps["accountID"] = loadedUser.account.accountID;
    setPrivateURLProps(localURLProps);
  }, [urlProps]);
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>

              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <MenuItem
                  onClick={() => {
                    handleCloseNavMenu();
                    navigate("/");
                  }}
                >
                  <Typography textAlign="center">Dashboard</Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleCloseNavMenu();
                    navigate("/projects");
                  }}
                >
                  <Typography textAlign="center">Projects</Typography>
                </MenuItem>
              </Menu>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Button
                sx={{ my: 2, color: "white", display: "block" }}
                onClick={() => {
                  navigate("/");
                }}
              >
                Dashboard
              </Button>
              <Button
                sx={{ my: 2, color: "white", display: "block" }}
                onClick={() => {
                  navigate("/projects");
                }}
              >
                Projects
              </Button>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <Button
                  sx={{ my: 2, color: "white", display: "block" }}
                  variant={"contained"}
                  onClick={() => {
                    navigate("/new-project");
                  }}
                >
                  New Project
                </Button>
              </Tooltip>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Component {...props} testID={testID} urlProps={privateURLProps} />
    </>
  );
};
export default RoutePrivate;
