import { useEffect, useState } from "react";
import {Box, Button, TextField, MenuItem} from "@mui/material";
import {Formik} from "formik";
import * as yup from "yup";
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from "../../Components/Header";
import GroupService from "../../Services/GroupService";
import ChurchService from "../../Services/ChurchService";
import { getChurchId } from "../../Utils/AuthUtils";
import { decodeToken } from '../../Utils/AuthUtils';


const Create2 = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)")
    const [groups, setGroups] = useState([])
    const [churches, setChurches] = useState([]);
    const [churchId, setChurchId] = useState(getChurchId());
    const handleFormSubmit = (values) =>{
        console.log(values);
    }

    const options = [
        { id: 1, value: 'male', label: 'Male' },
        { id: 2, value: 'female', label: 'Female' },
    ];
    const getChurchNameById = (id) => {
        console.log('Churches:', churches);
        console.log('Target ChurchId:', id);
  
        if (id === null || id === undefined) {
          console.error('Invalid Church ID');
          return "";
        }
        
        const church = churches.find((church) => church.churchId === parseInt(churchId));
        console.log('Found Church:', church);
      
        return church ? church.churchName : ""; // Return an empty string if not found
      };
    const initialValues = {
        firstName: "",
        lastName:"",
        gender:"",
        group:"",
        church: getChurchNameById(churchId) || "",
        isActive:""
    }
    const memberSchema = yup.object().shape({
        firstName: yup.string().required("required"),
        lastName: yup.string().required("required"),
        gender: yup.string().required("required"),
        group: yup.string().required("required"),
        church: yup.string().required("required"),
        isActive: yup.string().required("required"),
    })

    useEffect(() => {
        console.log("useEffect is running");
      
        const fetchData = async () => {
          try {
            const groupResponse = await GroupService.allGroups();
            const churchResponse = await ChurchService.allChurches();
      
            console.log('Group Response Values:', groupResponse.$values);
            console.log('Church Response Values:', churchResponse.$values);
      
            if (groupResponse.$values && churchResponse.$values) {
                      // Map groups to the format expected by Select component
              const Groups = groupResponse.$values.map(group => ({
                label: group.groupName,
                value: group.groupId.toString(),
              }));
              // setGroups(groupResponse.$values, ...Groups);
              setGroups(Groups);
                // Log the groups data
        console.log("Groups Data:", Groups);
              setChurches(churchResponse.$values);
      
              // Assuming you have a function to get the churchId from JWT token
              const tokenChurchId = getChurchId(); // Replace with the actual function
              console.log("Token ChurchId:", tokenChurchId);
      
              // Log the updated state after the state has been updated
              console.log("Updated Groups:", groupResponse.$values, ...Groups);
              console.log("Updated Churches:", churchResponse.$values);
              console.log("Updated ChurchId:", tokenChurchId);
  
              // Add this log
            console.log("Decoded Token:", decodeToken()); 
  
            // Update the churchId state
          setChurchId(tokenChurchId);
  
            } else {
              console.error("Unexpected response format or API request failed");
            }
      
            // Rest of your code...
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
      
        fetchData();
      }, []);
    
    
  return (
    <>
    <Box>
        <Header title="Create New Member" />
        <Formik 
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={memberSchema}
            >
                {({values,errors, touched, handleBlur, handleChange, handleSubmit})=>(
                    <form onSubmit={handleSubmit} className="createMember-form">
                        <Box 
                            display="grid" 
                            gap="30px" 
                            gridTemplateColumns="repeat(4, minmax(0,1fr))"
                            sx={{
                                "& > div": {gridColumn: isNonMobile ? undefined : "span 4"}
                            }}
                        >
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="First Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.firstName}
                                name="firstName"
                                error={!!touched.firstName && !!errors.firstName}
                                helperText={touched.firstName && errors.firstName}
                                sx={{gridColumn: "span 2"}}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Last Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.lastName}
                                name="lastName"
                                error={!!touched.lastName && !!errors.lastName}
                                helperText={touched.lastName && errors.lastName}
                                sx={{gridColumn: "span 2"}}
                            />
                            <TextField fullWidth variant="filled" sx={{gridColumn: "span 2"}}
                                select
                                id="gender"
                                label="Gender"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.gender || ''}
                                name="gender"
                                error={!!touched.gender && !!errors.gender}
                                helperText={touched.gender && errors.gender}
                                
                            >
                                {options.map((options)=>(
                                    <MenuItem key={options.id} value={values.options}>
                                        {options.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            {groups.length > 0 && (
                            <TextField fullWidth variant="filled" sx={{ gridColumn: 'span 2' }}
                                select
                                id="group"
                                label="Group"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.group}
                                name="group"
                                error={!!touched.group && !!errors.group}
                                helperText={touched.group && errors.group}
                                
                            >
                            {groups.map((group) => (
                                <MenuItem key={group.groupId} value={group.groupId}>
                                    {group.groupName}
                                </MenuItem>
                            ))}
                            {/* Log the current value of 'group' */}
      {console.log("Current value of 'group':", values.group)}

                        </TextField>
                        )}
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Church"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={getChurchNameById(churchId)}
                            name="church"
                            disabled
                            sx={{ gridColumn: "span 4" }}
                            />
                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px" gap={2}>
                            <Button type="reset" color="secondary"> 
                                Reset
                            </Button>
                            <Button type="submit" color="secondary" variant="contained">
                                Create New Member
                            </Button>
                        </Box>
                    </form>
                )}
        </Formik>
    </Box>
    </>

  )
}

export default Create2