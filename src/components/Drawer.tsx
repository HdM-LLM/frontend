import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import { DrawerItems } from "../helper/DrawerItems";
import Typography from "@mui/material/Typography";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";

export default function Drawer() {
  const DrawerMod = styled(MuiDrawer)(({ theme }) => ({
    "& .MuiDrawer-paper": {
      position: "relative",
      background: theme.palette.background.default,
      width: theme.spacing(28),
      marginTop: theme.spacing(8),
    },
  }));

  return (
    <DrawerMod variant="permanent">
      <List component="nav">{DrawerItems}</List>
    </DrawerMod>
  );
}
