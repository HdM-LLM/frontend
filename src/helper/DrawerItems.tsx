import * as React from 'react';
import { ListItemButton, ListItemIcon, ListItemText, Box } from '@mui/material';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import MoveToInboxRoundedIcon from '@mui/icons-material/MoveToInboxRounded';
import ViewListRoundedIcon from '@mui/icons-material/ViewListRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import Divider from '@mui/material/Divider';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

const linkStyle = {
  textDecoration: 'none',
  color: '#4d4d4d',
};

export default function DrawerItems() {
  const [open, setOpen] = useState(true);
  const [selectedLink, setSelectedLink] = useState<string>(''); // State to track selected link

  const handleClick = () => {
    setOpen(!open);
  };

  const handleLinkClick = (link: string) => {
    setSelectedLink(link); // Update selected link on click
  };

  return (
    <React.Fragment>
      <Box sx={{ marginTop: '5vh', marginLeft: '1vh', marginRight: '1vh' }}>
        <Box sx={{ marginBottom: '3vh', borderRadius: 5 }}>
          <NavLink to="/" style={linkStyle} onClick={() => handleLinkClick('/')}>
            <ListItemButton
              sx={{
                backgroundColor: selectedLink === '/' ? '#B4CD93' : '#f5f5f5',
                '&:hover': {
                  backgroundColor: '#edf5e1',
                  cursor: 'pointer',
                },
              }}
            >
              <ListItemIcon>
                <DashboardRoundedIcon sx={{ fontSize: 30 }} />
              </ListItemIcon>
              <ListItemText primary="Dashboard" primaryTypographyProps={{ sx: { fontSize: 25 } }} />
            </ListItemButton>
          </NavLink>
        </Box>
        <Box sx={{ marginBottom: '3vh' }}>
          <NavLink to="/vacancies" style={linkStyle} onClick={() => handleLinkClick('/vacancies')}>
            <ListItemButton
              sx={{
                backgroundColor: '#f5f5f5',
                '&:hover': {
                  backgroundColor: '#edf5e1',
                  cursor: 'pointer',
                },
              }}
            >
              <ListItemIcon>
                <ViewListRoundedIcon sx={{ fontSize: 30 }} />
              </ListItemIcon>
              <ListItemText primary="Vacancies" primaryTypographyProps={{ sx: { fontSize: 25 } }} />
            </ListItemButton>
          </NavLink>
        </Box>
        <Box sx={{ marginBottom: '3vh' }}>
          <NavLink to="/inquiries" style={linkStyle} onClick={() => handleLinkClick('/inquiries')}>
            <ListItemButton
              sx={{
                backgroundColor: '#f5f5f5',
                '&:hover': {
                  backgroundColor: '#edf5e1',
                  cursor: 'pointer',
                },
              }}
            >
              <ListItemIcon>
                <MoveToInboxRoundedIcon sx={{ fontSize: 30 }} />
              </ListItemIcon>
              <ListItemText primary="Inquiries" primaryTypographyProps={{ sx: { fontSize: 25 } }} />
            </ListItemButton>
          </NavLink>
        </Box>
        <Box sx={{ marginBottom: '3vh' }}>
          <NavLink
            to="/applicants"
            style={linkStyle}
            onClick={() => handleLinkClick('/applicants')}
          >
            <ListItemButton
              sx={{
                backgroundColor: '#f5f5f5',
                '&:hover': {
                  backgroundColor: '#edf5e1',
                  cursor: 'pointer',
                },
              }}
              onClick={handleClick}
            >
              <ListItemIcon>
                <PersonAddRoundedIcon sx={{ fontSize: 30 }} />
              </ListItemIcon>
              <ListItemText
                primary="Applicants"
                primaryTypographyProps={{ sx: { fontSize: 25 } }}
              />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </NavLink>
        </Box>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Box sx={{ marginBottom: '3vh' }}>
              <NavLink
                to="/applicants/overview"
                style={linkStyle}
                onClick={() => handleLinkClick('/applicants/overview')}
              >
                <ListItemButton
                  sx={{
                    pl: 4,
                    backgroundColor: '#f5f5f5',
                    '&:hover': {
                      backgroundColor: '#edf5e1',
                      cursor: 'pointer',
                    },
                  }}
                >
                  <ListItemIcon>
                    <GroupsRoundedIcon sx={{ fontSize: 30 }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Overview"
                    primaryTypographyProps={{ sx: { fontSize: 20 } }}
                  />
                </ListItemButton>
              </NavLink>
            </Box>
            <Box sx={{ marginBottom: '3vh' }}>
              <NavLink
                to="/applicants/upload"
                style={linkStyle}
                onClick={() => handleLinkClick('/applicants/upload')}
              >
                <ListItemButton
                  sx={{
                    pl: 4,
                    backgroundColor: '#f5f5f5',
                    '&:hover': {
                      backgroundColor: '#edf5e1',
                      cursor: 'pointer',
                    },
                  }}
                >
                  <ListItemIcon>
                    <FileUploadRoundedIcon sx={{ fontSize: 30 }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Upload"
                    primaryTypographyProps={{ sx: { fontSize: 20 } }}
                  />
                </ListItemButton>
              </NavLink>
            </Box>
          </List>
        </Collapse>
        <Divider sx={{ my: 1 }} />
        <Box sx={{ marginBottom: '3vh' }}>
          <NavLink to="/settings" style={linkStyle} onClick={() => handleLinkClick('/settings')}>
            <ListItemButton
              sx={{
                backgroundColor: '#f5f5f5',
                '&:hover': {
                  backgroundColor: '#edf5e1',
                  cursor: 'pointer',
                },
              }}
            >
              <ListItemIcon>
                <SettingsRoundedIcon sx={{ fontSize: 30 }} />
              </ListItemIcon>
              <ListItemText primary="Settings" primaryTypographyProps={{ sx: { fontSize: 25 } }} />
            </ListItemButton>
          </NavLink>
        </Box>
        <Box sx={{ marginBottom: '3vh' }}>
          <NavLink to="/logout" style={linkStyle} onClick={() => handleLinkClick('/logout')}>
            <ListItemButton
              sx={{
                backgroundColor: '#f5f5f5',
                '&:hover': {
                  backgroundColor: '#edf5e1',
                  cursor: 'pointer',
                },
              }}
            >
              <ListItemIcon>
                <LogoutRoundedIcon sx={{ fontSize: 30 }} />
              </ListItemIcon>
              <ListItemText primary="Logout" primaryTypographyProps={{ sx: { fontSize: 25 } }} />
            </ListItemButton>
          </NavLink>
        </Box>
        <Box sx={{ marginBottom: '3vh' }}>
          {/* TODO: Request the removal of this link in the drawer at the end of the review process */}
          <NavLink to="/applicantDetails" style={linkStyle}>
            <ListItemButton
              sx={{
                backgroundColor: '#f5f5f5',
                '&:hover': {
                  backgroundColor: '#edf5e1',
                  cursor: 'pointer',
                },
              }}
            >
              <ListItemIcon>
                <ViewListRoundedIcon sx={{ fontSize: 30 }} />
              </ListItemIcon>
              <ListItemText
                primary="Applicant Details Page"
                sx={{ color: 'red' }}
                primaryTypographyProps={{ sx: { fontSize: 25 } }}
              />
            </ListItemButton>
          </NavLink>
        </Box>
      </Box>
    </React.Fragment>
  );
}
