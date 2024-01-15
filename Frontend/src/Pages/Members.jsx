// import {useState,useEffect} from "react";
import {Box, Typography, useTheme} from  "@mui/material";
import {DataGrid, GridToolbar} from "@mui/x-data-grid";
import { tokens } from "../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined"
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined"
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined"
import Header from "../Components/Header";
// import MemberService from "../Services/MemberService";
import { mockDataTeam } from "../mockdata";
// import DashboardLayout from "../Layouts/DashboardLayout";

const Members = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    // const [getMembers, setMembers] = useState([]);

    // const columns = [
    //     {field: "MemberId", headerName: "ID"},
    //     {field: "firstName", headerName: "First Name", flex: 1, cellClassName: "name-column--cell"},
    //     {field: "lastName", headerName: "Last Name", flex: 1,cellClassName: "name-column--cell"},
    //     {field: "Gender", headerName: "Gender", flex: 1},
    //     {field: "group", headerName: "Group", flex: 1,cellClassName: "name-column--cell"},
    //     {field: "ChurchId", headerName: "Church", flex: 1},
    //     {field: "isActive", headerName: "Active/Deactive", flex: 1},
    // ]
    const columns = [
        { field: "id", headerName: "ID" },
        {
          field: "name",
          headerName: "Name",
          flex: 1,
          cellClassName: "name-column--cell",
        },
        {
          field: "age",
          headerName: "Age",
          type: "number",
          headerAlign: "left",
          align: "left",
        },
        {
          field: "phone",
          headerName: "Phone Number",
          flex: 1,
        },
        {
          field: "email",
          headerName: "Email",
          flex: 1,
        },
        {
          field: "accessLevel",
          headerName: "Access Level",
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
                    : access === "manager"
                    ? colors.accentGreen[700]
                    : colors.accentGreen[700]
                }
                borderRadius="4px"
              >
                {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
                {access === "manager" && <SecurityOutlinedIcon />}
                {access === "user" && <LockOpenOutlinedIcon />}
                <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                  {access}
                </Typography>
              </Box>
            );
          },
        },
      ];

      // Fetching church names from an API endpoint
//   useEffect(() => {
//     const fetchMembers = async () => {
//         try {
//             const response = await MemberService.allMembers();
//             console.log('API Response:', response);
        
//             // Check if response.data is defined and has a $values property
//             if (response && response.data && response.data.$values) {
//               // Extract the array from the $values property
//               const membersArray = response.data.$values;
        
//               // Ensure that the extracted array is not empty
//               if (Array.isArray(membersArray) && membersArray.length > 0) {
//                 setMembers(membersArray);
//               } else {
//                 console.error('No valid members found in the API response.');
//                 // Handle the case when the array is empty or not present
//               }
//             } else {
//               console.warn('API returned an invalid array of members. $values property is missing.');
//               console.log('Response:', response);
//               // Handle the case when $values property is missing
//             }
//           }catch (error) {
//             console.error('Error fetching members:', error);
//           }
//       }
//     fetchMembers();
//     }, []);
    
  return (
    <>

    <Box mr={2}>
        <Header title="All Members" subtitle="A List of all Members"/>
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
        <DataGrid checkboxSelection rows={mockDataTeam} columns={columns} components={{ Toolbar: GridToolbar }}/>
            {/* <DataGrid 
            
                checkboxSelection 
                getRowId={(row) => row.MemberId}
                rows={getMembers}
                columns={columns}
                /> */}
        </Box>
    </Box>
    
    </>


    
  )
}

export default Members