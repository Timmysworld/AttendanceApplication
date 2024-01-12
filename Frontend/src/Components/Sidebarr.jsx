import { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
// import 'react-pro-sidebar/dist/styles/styles.css';
import{Box, IconButton,Typography, useTheme} from "@mui/material";
import { NavLink } from "react-router-dom";
import {tokens } from "../theme";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
// import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import { useAuth } from "../Utils/AuthProvider";


const Sidebarr = () => {
  const theme =useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected]  = useState("Dashboard");
  const { userRoles } = useAuth();


  // Handle click event for menu items
  const handleMenuItemClick = (title) => {
    setSelected(title);
    // Add any other logic you need here
  };
  return (
    <Box 
      sx={{
        "& .ps-sidebar-root":{height: '100%'},
        "& .ps-sidebar-container":{ backgroundColor: `${colors.primary[400]} !important`,
      },
      "& .ps-icon-wrapper": {
        backgroundColor: "transparent !important"
      },
      "& .ps-inner-item":{
        padding:"5px 35px 5px 20px !important"
      }, 
      "& .ps-inner-item:hover":{
        color:"868dfb !important"
      },
      "& .ps-menu-item.active":{
        color:"6870fa !important"
      }
    
    }}>
      <Sidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
                
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  {userRoles ==="Overseer" ? "Admin" : "User"}
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`../../assets/user.png`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h3"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  First & Last Name
                </Typography>
                <Typography variant="h5" color={colors.accentGreen[500]}>
                {userRoles ==="Overseer" ? "Overseer" : "Group Leader"}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <MenuItem 
              component={<NavLink to="dashboard"/>}
              icon={<HomeOutlinedIcon />}
              selected={selected}
              onClick={() => handleMenuItemClick("Dashboard")}
              >
                Dashboard
              </MenuItem>
            <MenuItem
              component={<NavLink to="user-management"/>}
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              onClick={() => handleMenuItemClick("User Management")}
              >
              User Management
            </MenuItem>
            <MenuItem
              component={<NavLink to="profile"/>}
              icon={<PersonOutlinedIcon />}
              selected={selected}
              onClick={() => handleMenuItemClick("Profile")}
              >
                Profile
              </MenuItem>
              <MenuItem
              component={<NavLink to="members"/>}
              icon={<PersonOutlinedIcon />}
              selected={selected}
              onClick={() => handleMenuItemClick("Members")}
              >
                Members
              </MenuItem>
              <MenuItem
              component={<NavLink to="attendance"/>}
              icon={<InventoryOutlinedIcon />}
              selected={selected}
              onClick={() => handleMenuItemClick("Attendance")}
              >
                Attendance
              </MenuItem>
            
          </Box>
        </Menu>
      </Sidebar>

    </Box>
  )
}

export default Sidebarr;