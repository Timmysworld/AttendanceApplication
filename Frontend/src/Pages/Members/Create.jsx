import { useRef } from 'react';
import { useEffect, useState } from "react";
import {useForm, useController} from 'react-hook-form'
import {Box, Button, FormControl} from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import classes from '../Members/Create.module.css';
import Header from "../../Components/Header";
import ChurchService from "../../Services/ChurchService";
import GroupService from "../../Services/GroupService";
import Input from "../../UI/Input";
import Select from "../../UI/Select";
import { getChurchId } from '../../Utils/AuthUtils';
import { decodeToken } from '../../Utils/AuthUtils';

const Create = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)")
    const { register, handleSubmit, control, watch, reset, formState: { errors } } = useForm();
    const formRef = useRef();

    // Using useController for managing the 'church' and 'gender' fields
    const { field } = useController({ name: 'group', control });
    const { field: gender } = useController({ name: 'gender', control });
    
      // State for storing church data
    // const [churchData] = useState('');
    const [groups, setGroups] = useState([])
    const [churches, setChurches] = useState([]);
    const [churchId, setChurchId] = useState(null); 


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
    

      // Handling change for the selects
    // const handleSelectChange = (option) => {
    //     field.onChange(option.value)
    // };
    const handleSelectChange = (option, fieldName) => {
        if (fieldName === 'gender') {
            gender.onChange(option.value);
        } else if (fieldName === 'group') {
            field.onChange(option.value);
        }
    };

    const onSubmit = async (data) => {
        console.log("form submitted", data);
    }
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
            <form onSubmit={handleSubmit(onSubmit)} className={classes['createMember-form']}noValidate>
            <Box 
                display="grid" 
                gap="30px" 
                gridTemplateColumns="repeat(4, minmax(0,1fr))"
                sx={{
                  "& > div": {gridColumn: isNonMobile ? undefined : "span 4"}
                }}
                >
     
              <Input 
                label='First Name' 
                type='text' 
                id='firstname' 
              
                register={{...register("firstname",{
                  required: 'First name is required',
                  // Add more validation rules as needed
                })}} 
                error={errors.firstname?.message}/>
              <Input 
                label='Last Name' 
                type='text' 
                id='lastname' 
              
                register={{...register("lastname",{
                  required: 'Last name is required',
                  // Add more validation rules as needed
                })}} 
                error={errors.lastname?.message}/>


       


              
              <Select
                label="Gender"
                value={gender.value}
                options={options}
                onChange={handleSelectChange}
                register={{...register("gender",{
                  required: 'Please choose a gender'
                })}}
                error={errors.gender?.message}
              />
              <Select
                key={groups.groupId}
                label="Group"
                value={field.value}
                options={groups}
                onChange={handleSelectChange}
                register={{...register("group",{
                  required: 'Please choose a group'
                })}}
                error={errors.group?.message}
              />

              <Input
                label='Church'
                disabled
                defaultValue={getChurchNameById(churchId)}
                register={{...register('church')}}
              />

                <Box display="flex" justifyContent="end" mt="20px">
                  <Button type="reset" color="primary" onClick={() => reset(formRef.current)}> 
                    Reset
                  </Button>
                  <Button type="submit" color="secondary" variant="contained">
                      Create New Member
                  </Button>
                </Box>
              </Box>
            </form>
        </Box>
    </>
    )
}

export default Create