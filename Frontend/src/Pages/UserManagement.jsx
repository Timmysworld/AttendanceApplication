import {Box, Typography, useTheme} from  "@mui/material";
import {DataGrid, GridActionsCellItem, GridToolbar} from "@mui/x-data-grid";
import { tokens } from "../theme";
import { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined"
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined"
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined"
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Header from "../Components/Header";
import UserService from "../Services/UserService";

const UserManagement = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const columns = [
        { field: "id", headerName: "ID" },
        {
          field: "firstName",
          headerName: "First Name",
          flex: 1,
          cellClassName: "name-column--cell",
        },
        {
          field: "lastName",
          headerName: "Last Name",
          flex: 1,
          cellClassName: "name-column--cell",
        },
        {
          field: "gender",
          headerName: "Gender",
          flex: 1,
          cellClassName: "name-column--cell",
        },
        {
          field: "isActive",
          headerName: "Active",
          width: 80
        },
        {
          field: "lastLoggedOn",
          headerName: "Last Logged On",
          flex: 1,
          type: 'dateTime',
          valueGetter: ({ value }) => value && new Date(value),
        },
        {
          field: "Group",
          headerName: "Group Name",
          flex: 1,
          valueGetter: (params) => params.row.group? params.row.group.groupName || 'N/A' : 'unassigned',
        },
        {
          field: "Role",
          headerName: "Role",
          flex: 1,
          valueGetter: (params) => {
            const roles = params.row.roles ? params.row.roles.$values : [];
            return roles.length > 0 ? roles.join(", ") : 'unassigned';
          },
          renderCell: ({ row: { roles } }) => {
            const roleValues = roles ? roles.$values : [];
            return (
              <Box
                width="100%"
                m="0 auto"
                p="5px"
                display="flex"
                justifyContent="center"
                backgroundColor={
                  roleValues.includes("Overseer")
                    ? colors.accentGreen[600]
                    : roleValues.includes("GroupLeader")
                    ? colors.accentGreen[700]
                    : colors.accentGreen[700]
                }
                borderRadius="4px"
              >
                {roleValues.includes("Overseer") && <AdminPanelSettingsOutlinedIcon />}
                {roleValues.includes("GroupLeader") && <SecurityOutlinedIcon />}
                {roleValues.includes("UnitLeader") && <LockOpenOutlinedIcon />}
                <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                  {roleValues.length > 0 ? roleValues.join(", ") : 'unassigned'}
                </Typography>

              </Box>
            );
          },
        },
        {
          field: 'actions',
          headerName: "Actions",
          type: 'actions',
          getActions: (params) => [
            <GridActionsCellItem key={`delete-${params.row.id}`}  icon={<DeleteOutlineIcon/>} label='Delete'  />,
            <GridActionsCellItem key={`view-${params.row.id}`}  icon={<VisibilityIcon/>} onClick={() => handleView(params.row.id)} label="view"  showInMenu />,
          ],
        },
      ];

      useEffect (()=>{
        const fetchUsers = async () =>{
          try {
            const response = await UserService.allUsers();
            console.log('API Response:', response);
          // Check if the response has "$values" property
          if (response.$values) {
            setUsers(response);
          } else {
            console.error('Invalid API response format.');
          }
          } catch (error) {
            console.error('Error fetching users:', error);
          }
        }
        fetchUsers();
      },[])

      const handleView = (userId) => {
        // Assuming you have the route defined in your React Router setup
        navigate(`/api/admin/user-management/profile/${userId}`);
      }



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
          "& .MuiButtonBase-root":{
            color: colors.grey[200],
          },
    }} >
        {Array.isArray(users.$values) && users.$values.length > 0 ? (
          <DataGrid
            rows={users.$values}
            columns={columns}
            checkboxSelection
            slots={{ toolbar: GridToolbar }}
          />
        ) : (
          <Typography>No users found</Typography>
        )}
        </Box>
    </Box>
    <Outlet />
    </>
  )
}

export default UserManagement;