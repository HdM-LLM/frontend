import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import { DrawerItems } from "../helper/DrawerItems";
import Typography from "@mui/material/Typography";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";

export const drawerWidth: number = 230;

export default function Drawer() {
  const [open, setOpen] = React.useState(true);

  const DrawerMod = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    "& .MuiDrawer-paper": {
      position: "relative",
      whiteSpace: "nowrap",
      background: theme.palette.grey[100],
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: "border-box",
      ...(!open && {
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up("sm")]: {
          width: theme.spacing(9),
        },
      }),
    },
  }));
  return (
    <DrawerMod variant="permanent" open={open}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          px: [1],
        }}
      >
        <AccountTreeOutlinedIcon
          sx={{
            display: { xs: "none", md: "flex" },
            mr: 1,
          }}
          color="secondary"
        />
        <Typography
          component="h1"
          variant="h4"
          color="secondary"
          noWrap
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },
            fontFamily: "",
            fontWeight: 400,
          }}
        >
          SkillSync
        </Typography>
      </Toolbar>
      <List component="nav">{DrawerItems}</List>
    </DrawerMod>
  );
}
