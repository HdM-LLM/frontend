import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";

export default function AppBar() {
  const AppBarMod = styled(MuiAppBar)(({ theme }) => ({
    background: theme.palette.background.default,
    boxShadow: "none",
    zIndex: theme.zIndex.drawer + 1,
    position: "absolute",
  }));

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.grey[100],
    "&:hover": {
      backgroundColor: theme.palette.grey[100],
    },
    width: "50%",
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    color: "black",
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      color: "black",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));

  return (
    <AppBarMod>
      <Toolbar
        sx={{
          ml: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            flexGrow: 0,
            display: "flex",
            alignItems: "flex-start",
            ml: -2,
          }}
        >
          <AccountTreeOutlinedIcon
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 2,
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
        </Box>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
        <Box
          sx={{
            flexGrow: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "right",
          }}
        >
          <Avatar alt="user" src={"a"} sx={{ p: 0, mr: 2, ml: 2 }} />
          <Typography sx={{ mr: 2, color: "black" }}>Manuel Neuer</Typography>
          <Badge badgeContent={4} color="secondary" sx={{ ml: 2 }}>
            <NotificationsIcon color="primary" />
          </Badge>
        </Box>
      </Toolbar>
    </AppBarMod>
  );
}
