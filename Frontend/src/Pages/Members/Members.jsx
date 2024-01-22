import {useState,useEffect} from "react";
import {Box, Typography, useTheme} from  "@mui/material";
import {DataGrid,GridActionsCellItem, GridToolbar} from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../Components/Header";
import ChurchService from "../../Services/ChurchService";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';

const Members = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [members, setMembers] = useState([]);

    const columns = [
        // { field: "Id", headerName: "ID" },
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
          field: "Group",
          headerName: "Group Name",
          flex: 1,
          valueGetter: (params) => params.row.group? params.row.group.groupName || 'N/A' : 'unassigned',
        },
        {
          field: "Church",
          headerName: "Church Name",
          flex: 1,
          valueGetter: (params) => params.row.church? params.row.church.churchName || 'N/A' : 'unassigned',
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

      useEffect(()=>{
        const fetchMembers = async () =>{
          try {
            const response = await ChurchService.allMembers();
            console.log('Api Response:', response)
            if(response && response.$values) {
              setMembers(response)
              // setMembers(response)
            }else {
              console.error('Invalid Api response format.')
            }
          } catch (error) {
            console.error('Error fetching members:', error)
          }
        }
        fetchMembers();
      }, [])

      const handleView = () =>{
        return;
      }
    
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
      "& .MuiButtonBase-root":{
        color: colors.grey[200],
      },
    }} >
        {Array.isArray(members.$values) && members.$values.length > 0 ? (
          <DataGrid
            rows={members.$values}
            columns={columns}
            checkboxSelection
            slots={{ toolbar: GridToolbar }}
            getRowId={(row) => row.$id}
          />
        ) : (
          <Typography>No Members Found!</Typography>
        )}
        </Box>
    </Box>
    
    </>


    
  )
}

export default Members