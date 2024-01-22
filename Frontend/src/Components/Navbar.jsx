import {Box, IconButton, useTheme, Menu, MenuItem,} from "@mui/material";
import { useContext,useState } from "react";
import { ColorModeContext, tokens } from "../theme";
import { InputBase } from '@mui/material';
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SearchIcon from "@mui/icons-material/Search"
import AccountService from "../Services/AccountService";
import { useNavigate } from "react-router-dom";
import { clearToken } from "../Utils/AuthUtils";
import UserService from "../Services/UserService";

const Navbar = () => {
  const theme =useTheme();
  const colors =tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const Navigate = useNavigate();
  
  const handleClick = (event)=>{
    setAnchorEl(event.currentTarget);
  };

  const handleClose = async () =>{
    await UserService.user();
    //Navigate("profile/{userId}")
    // setAnchorEl(null);
  }
  const handleLogout = async() =>{
    await AccountService.logout();
    clearToken();
    Navigate("/");
  }
  return (
    <Box display="flex" justifyContent="space-between" p={2} >
      {/* SEARCH BAR  */}
      <Box display="flex" backgroundColor={colors.primary[400]} borderRadius="3px">
        <InputBase sx={{ml:2, flex:1}} placeholder="Search"/>
        <IconButton type="button" sx= {{p:1}}>
          <SearchIcon/>
        </IconButton>
      </Box>
      {/* ICONS */}
      <Box display="flex">
      <IconButton onClick={colorMode.toggleColorMode}>
        {theme.palette.mode === "dark"? (
          <DarkModeOutlinedIcon/>
        ):(
          <LightModeOutlinedIcon/>
        )}
        </IconButton>
        <IconButton>
        <NotificationsOutlinedIcon/>
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon/>
        </IconButton>
        <IconButton onClick={handleClick}>
          <PersonOutlinedIcon/>
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          {/* Add more menu items as needed */}
        </Menu>
      </Box>
    </Box>
  )
}

export default Navbar