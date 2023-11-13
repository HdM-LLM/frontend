import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Divider from "@mui/material/Divider";
import { NavLink } from "react-router-dom";

const linkStyle = {
  textDecoration: "none",
  color: "black",
};

export const DrawerItems = (
  <React.Fragment>
    <NavLink to="/" style={linkStyle}>
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
    </NavLink>
    <NavLink to="/positions" style={linkStyle}>
      <ListItemButton>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Positions" />
      </ListItemButton>
    </NavLink>
    <NavLink to="/inquiries" style={linkStyle}>
      <ListItemButton>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Inquiries" />
      </ListItemButton>
    </NavLink>
    <NavLink to="/applicants" style={linkStyle}>
      <ListItemButton>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Applicants" />
      </ListItemButton>
    </NavLink>
    <Divider sx={{ my: 1 }} />
    <NavLink to="/settings" style={linkStyle}>
      <ListItemButton>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Settings" />
      </ListItemButton>
    </NavLink>
  </React.Fragment>
);
