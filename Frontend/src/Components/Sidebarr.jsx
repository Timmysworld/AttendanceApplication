import { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
// import 'react-pro-sidebar/dist/styles/styles.css';
import{Box, IconButton,Typography, useTheme} from "@mui/material";
import { Link } from "react-router-dom";
import {tokens } from "../theme";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
// import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';

const Item = ({title, to, icon, selected, setSelected}) =>{
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return(
    //TODO: NEED TO FIX ERROR IN CONSOLE react-dom.development.js:86 Warning: validateDOMNesting(...): <a> cannot appear as a descendant of <a>.
      <Link to={to} style={{ textDecoration: 'none' }}>
        <MenuItem active={selected ===title} style={{color: colors.grey[100]}} onClick={()=> setSelected(title)} icon={icon}>
            <Typography variant="body1">{title}</Typography>
        </MenuItem>
      </Link>
  );
};

const Sidebarr = () => {
  const theme =useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected]  = useState("Dashboard");
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
                  ADMIN
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
                  Overseer
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/api/admin/dashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="User Management"
              to="team"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Profile"
              to="profile"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
              <Item
              title="Members"
              to="/api/member/allMembers"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
              <Item
              title="Attendance"
              to="attendance"
              icon={<InventoryOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            
          </Box>
        </Menu>
      </Sidebar>

    </Box>
  )
}

export default Sidebarr;