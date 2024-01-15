import {Box, Typography, useTheme} from  "@mui/material";
import {DataGrid, GridToolbar} from "@mui/x-data-grid";
import { tokens } from "../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined"
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined"
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined"
import Header from "../Components/Header";
import { useEffect, useState } from "react";
import UserService from "../Services/UserService";

const UserManagement = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [users, setUsers] = useState();

    const columns = [
        { field: "id", headerName: "ID" },
        {
          field: "FirstName",
          headerName: "First Name",
          flex: 1,
          cellClassName: "name-column--cell",
        },
        {
          field: "LastName",
          headerName: "Last Name",
          flex: 1,
          cellClassName: "name-column--cell",
        },
        {
          field: "Gender",
          headerName: "Gender",
          flex: 1,
          cellClassName: "name-column--cell",
        },
        {
          field: "isActive",
          headerName: "Active",
          flex: 1,
        },
        {
          field: "LastLoggedOn",
          headerName: "Last Logged In",
          flex: 1,
        },
        {
          field: "GroupId",
          headerName: "Group Name",
          flex: 1,
        },
        {
          field: "Role",
          headerName: "Role",
          flex: 1,
          renderCell: ({ row: { access } }) => {
            return (
              <Box
                width="60%"
                m="0 auto"
                p="5px"
                display="flex"
                justifyContent="center"
                backgroundColor={
                  access === "admin"
                    ? colors.accentGreen[600]
                    : access === "Group Leader"
                    ? colors.accentGreen[700]
                    : colors.accentGreen[700]
                }
                borderRadius="4px"
              >
                {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
                {access === "Group Leader" && <SecurityOutlinedIcon />}
                {access === "Unit Leader" && <LockOpenOutlinedIcon />}
                <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                  {access}
                </Typography>
              </Box>
            );
          },
        },
      ];

      useEffect (()=>{
        const fetchUsers = async () =>{
          try {
            const response = UserService.allUsers();
            console.log('API Response:', response);
            setUsers();
          } catch (error) {
            console.error('Error fetching users:', error);
          }
        }
        fetchUsers();
      },[])
  return (
    <>

    <Box mr={2}>
        <Header title="All Users" subtitle="A List of all Users"/>
        <Box m="40px 0 0 0" height="75dvh" sx={{
      "& .MuiDataGrid-root": {
        border: "none",
      },
      "& .MuiDataGrid-cell": {
        borderBottom: "none",
      },
      "& .name-column--cell": {
        color: colors.accentGreen[300],
      },
      "& .MuiDataGrid-columnHeaders": {
        backgroundColor: colors.accentBlue[700],
        borderBottom: "none",
      },
      "& .MuiDataGrid-virtualScroller": {
        backgroundColor: colors.primary[400],
      },
      "& .MuiDataGrid-footerContainer": {
        borderTop: "none",
        backgroundColor: colors.accentBlue[700],
      },
      "& .MuiCheckbox-root": {
        color: `${colors.accentGreen[200]} !important`,
      },
      "&.MuiDataGrid-toolbarContainer":{
        backgroundColor: colors.primary[400],
      },
    }} >
      {users && 
        users.map((user)=>(
        <DataGrid key={user} checkboxSelection rows={user} columns={columns} components={{ Toolbar: GridToolbar }}/>
        ))}
        </Box>
    </Box>
    
    </>
  )
}

export default UserManagement;