import {Box, Button, TextField, FormControl, MenuItem} from "@mui/material";
import {Formik} from "formik";
import * as yup from "yup";
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from "../../Components/Header";
import Select from "@mui/material/Select";


const Create = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)")
    const handleFormSubmit = (values) =>{
        console.log(values);
    }
    const initialValues = {
        firstName: "",
        lastName:"",
        gender:"",
        group:"",
        church:"",
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
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Gender"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.gender}
                                name="gender"
                                error={!!touched.gender && !!errors.gender}
                                helperText={touched.gender && errors.gender}
                                sx={{gridColumn: "span 2"}}
                            />
                            <FormControl fullWidth variant="filled" sx={{ gridColumn: 'span 2' }}>
                            {/* <InputLabel htmlFor="group">Group</InputLabel> */}
                            <Select
                            id="group"
                            label="Group"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.group}
                            name="group"
                            error={!!touched.group && !!errors.group}
                            helperText={touched.group && errors.group}
                            displayEmpty
                            >
                            {/* Add your options as MenuItem components */}
                            <MenuItem value="">Select Group</MenuItem>
                            <MenuItem value="option1">Option 1</MenuItem>
                            <MenuItem value="option2">Option 2</MenuItem>
                            {/* Add more options as needed */}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth variant="filled" sx={{ gridColumn: 'span 4' }}>
                            {/* <InputLabel htmlFor="church">Church</InputLabel> */}
                            <Select
                            id="church"
                            label="Church"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.church}
                            name="church"
                            error={!!touched.church && !!errors.church}
                            displayEmpty
                            >
                            {/* Add your options as MenuItem components */}
                            <MenuItem value="">Select Church</MenuItem>
                            <MenuItem value="church1">Church 1</MenuItem>
                            <MenuItem value="church2">Church 2</MenuItem>
                            {/* Add more options as needed */}
                            </Select>
                        </FormControl>
                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
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

export default Create