import { Box, Container,Typography,useTheme } from "@mui/material"
import { tokens } from "../theme";

const Snapshot = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  return (
    <Container sx={{height:"25%", display:"flex" ,justifyContent:"center", gap:"10%"}}>
    <Box 
      width= "25%"
      height= "60%"
      backgroundColor={colors.accentRed[900]}
      >  
      <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
            box1 
      </Typography></Box>
    <Box  width= "25%" height= "60%" backgroundColor={colors.accentRed[900]}>
      <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
            box2 
        </Typography></Box>
    <Box  width= "25%" height= "60%" backgroundColor={colors.accentRed[900]}>
      <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
            box3
      </Typography></Box>
  </Container>
  )
}

export default Snapshot