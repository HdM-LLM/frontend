import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Divider from '@mui/material/Divider';
import { NavLink } from 'react-router-dom';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import GridViewIcon from '@mui/icons-material/GridView';

const linkStyle = {
  textDecoration: 'none',
  color: 'black',
};

export default function DrawerItems() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
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
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Applicants" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </NavLink>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <NavLink to="/applicants/overview" style={linkStyle}>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <GridViewIcon />
              </ListItemIcon>
              <ListItemText primary="Overview" />
            </ListItemButton>
          </NavLink>
          <NavLink to="/applicants/upload" style={linkStyle}>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <FileUploadIcon />
              </ListItemIcon>
              <ListItemText primary="Upload" />
            </ListItemButton>
          </NavLink>
        </List>
      </Collapse>
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
}
