import * as React from 'react';
import { ListItemButton, ListItemIcon, ListItemText, Box } from '@mui/material';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import MoveToInboxRoundedIcon from '@mui/icons-material/MoveToInboxRounded';
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

const linkStyle = {
  textDecoration: 'none',
  color: '#808080',
};

export default function DrawerItems() {
  const [open, setOpen] = useState(true);
  const [selectedLink, setSelectedLink] = useState<string>('/');

  const handleClick = () => {
    setOpen(!open);
  };

  const handleLinkClick = (link: string) => {
    setSelectedLink(link);
  };

  return (
    <React.Fragment>
      <Box sx={{ marginTop: '6vh', marginLeft: '2vh', marginRight: '1vh' }}>
        <Box sx={{ marginBottom: '3vh', justifyContent: 'center', alignItems: 'center' }}>
          <NavLink to="/" style={linkStyle} onClick={() => handleLinkClick('/')}>
            <ListItemButton
              sx={{
                backgroundColor: selectedLink === '/' ? '#B4CD93' : '#f5f5f5',
                '&:hover': {
                  backgroundColor: '#edf5e1',
                  cursor: 'pointer',
                },
                borderRadius: 2,
              }}
            >
              <ListItemIcon>
                <DashboardRoundedIcon
                  sx={{ fontSize: 30, color: selectedLink === '/' ? '#4C4C4C' : '#808080' }}
                />
              </ListItemIcon>
              <ListItemText
                primary="Dashboard"
                primaryTypographyProps={{
                  sx: {
                    fontSize: 22,
                    fontWeight: selectedLink === '/' ? 'bold' : 'normal',
                    color: selectedLink === '/' ? '#4C4C4C' : '#808080',
                  },
                }}
              />
            </ListItemButton>
          </NavLink>
        </Box>
        <Box sx={{ marginBottom: '3vh' }}>
          <NavLink to="/vacancies" style={linkStyle} onClick={() => handleLinkClick('/vacancies')}>
            <ListItemButton
              sx={{
                backgroundColor: selectedLink === '/vacancies' ? '#B4CD93' : '#f5f5f5',
                '&:hover': {
                  backgroundColor: '#edf5e1',
                  cursor: 'pointer',
                },
                borderRadius: 2,
              }}
            >
              <ListItemIcon>
                <BadgeRoundedIcon
                  sx={{
                    fontSize: 30,
                    color: selectedLink === '/vacancies' ? '#4C4C4C' : '#808080',
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary="Vacancies"
                primaryTypographyProps={{
                  sx: {
                    fontSize: 22,
                    fontWeight: selectedLink === '/vacancies' ? 'bold' : 'normal',
                    color: selectedLink === '/vacancies' ? '#4C4C4C' : '#808080',
                  },
                }}
              />
            </ListItemButton>
          </NavLink>
        </Box>
        <Box sx={{ marginBottom: '3vh' }}>
          <NavLink to="/inquiries" style={linkStyle} onClick={() => handleLinkClick('/inquiries')}>
            <ListItemButton
              sx={{
                backgroundColor: selectedLink === '/inquiries' ? '#B4CD93' : '#f5f5f5',
                '&:hover': {
                  backgroundColor: '#edf5e1',
                  cursor: 'pointer',
                },
                borderRadius: 2,
              }}
            >
              <ListItemIcon>
                <MoveToInboxRoundedIcon
                  sx={{
                    fontSize: 30,
                    color: selectedLink === '/inquiries' ? '#4C4C4C' : '#808080',
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary="Inquiries"
                primaryTypographyProps={{
                  sx: {
                    fontSize: 22,
                    fontWeight: selectedLink === '/inquiries' ? 'bold' : 'normal',
                    color: selectedLink === '/inquiries' ? '#4C4C4C' : '#808080',
                  },
                }}
              />
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
                backgroundColor: selectedLink === '/applicants' ? '#B4CD93' : '#f5f5f5',
                '&:hover': {
                  backgroundColor: '#edf5e1',
                  cursor: 'pointer',
                },
                borderRadius: 2,
              }}
              onClick={handleClick}
            >
              <ListItemIcon>
                <AccountBoxRoundedIcon
                  sx={{
                    fontSize: 30,
                    color: selectedLink === '/applicants' ? '#4C4C4C' : '#808080',
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary="Applicants"
                primaryTypographyProps={{
                  sx: {
                    fontSize: 22,
                    fontWeight: selectedLink === '/applicants' ? 'bold' : 'normal',
                    color: selectedLink === '/applicants' ? '#4C4C4C' : '#808080',
                  },
                }}
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
                    backgroundColor:
                      selectedLink === '/applicants/overview' ? '#B4CD93' : '#f5f5f5',
                    '&:hover': {
                      backgroundColor: '#edf5e1',
                      cursor: 'pointer',
                    },
                    borderRadius: 2,
                  }}
                >
                  <ListItemIcon>
                    <GroupsRoundedIcon
                      sx={{
                        fontSize: 30,
                        color: selectedLink === '/applicants/overview' ? '#4C4C4C' : '#808080',
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary="Overview"
                    primaryTypographyProps={{
                      sx: {
                        fontSize: 20,
                        fontWeight: selectedLink === '/applicants/overview' ? 'bold' : 'normal',
                        color: selectedLink === '/applicants/overview' ? '#4C4C4C' : '#808080',
                      },
                    }}
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
                    backgroundColor: selectedLink === '/applicants/upload' ? '#B4CD93' : '#f5f5f5',
                    '&:hover': {
                      backgroundColor: '#edf5e1',
                      cursor: 'pointer',
                    },
                    borderRadius: 2,
                  }}
                >
                  <ListItemIcon>
                    <PersonAddRoundedIcon
                      sx={{
                        fontSize: 30,
                        color: selectedLink === '/applicants/upload' ? '#4C4C4C' : '#808080',
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary="Upload"
                    primaryTypographyProps={{
                      sx: {
                        fontSize: 20,
                        fontWeight: selectedLink === '/applicants/upload' ? 'bold' : 'normal',
                        color: selectedLink === '/applicants/upload' ? '#4C4C4C' : '#808080',
                      },
                    }}
                  />
                </ListItemButton>
              </NavLink>
            </Box>
          </List>
        </Collapse>
        <Box sx={{ marginBottom: '3vh', marginTop: '20vh' }}>
          <NavLink to="/settings" style={linkStyle} onClick={() => handleLinkClick('/settings')}>
            <ListItemButton
              sx={{
                backgroundColor: selectedLink === '/settings' ? '#B4CD93' : '#f5f5f5',
                '&:hover': {
                  backgroundColor: '#edf5e1',
                  cursor: 'pointer',
                },
                borderRadius: 2,
              }}
            >
              <ListItemIcon>
                <SettingsRoundedIcon
                  sx={{ fontSize: 30, color: selectedLink === '/settings' ? '#4C4C4C' : '#808080' }}
                />
              </ListItemIcon>
              <ListItemText
                primary="Settings"
                primaryTypographyProps={{
                  sx: {
                    fontSize: 22,
                    fontWeight: selectedLink === '/settings' ? 'bold' : 'normal',
                    color: selectedLink === '/settings' ? '#4C4C4C' : '#808080',
                  },
                }}
              />
            </ListItemButton>
          </NavLink>
        </Box>
        <Box sx={{ marginBottom: '3vh' }}>
          <NavLink to="/logout" style={linkStyle} onClick={() => handleLinkClick('/logout')}>
            <ListItemButton
              sx={{
                backgroundColor: selectedLink === '/logout' ? '#B4CD93' : '#f5f5f5',
                '&:hover': {
                  backgroundColor: '#edf5e1',
                  cursor: 'pointer',
                },
                borderRadius: 2,
              }}
            >
              <ListItemIcon>
                <LogoutRoundedIcon
                  sx={{ fontSize: 30, color: selectedLink === '/logout' ? '#A12C2C' : '#8C2727' }}
                />
              </ListItemIcon>
              <ListItemText
                primary="Logout"
                primaryTypographyProps={{
                  sx: {
                    fontSize: 22,
                    fontWeight: selectedLink === '/logout' ? 'bold' : 'normal',
                    color: selectedLink === '/logout' ? '#A12C2C' : '#8C2727',
                  },
                }}
              />
            </ListItemButton>
          </NavLink>
        </Box>
      </Box>
    </React.Fragment>
  );
}
