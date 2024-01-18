import { Box } from "@mui/material"
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Header from "../Components/Header"

const Profile = () => {
    const params = useParams();
    console.log(params);

    const { userId } = useParams();

    useEffect(() => {
        console.log('Profile component is rendering.');
        console.log('userId:', userId);
        // Add more logs or debugging statements as needed
      }, [userId]);

  return (
    <>
    <Box>
        <Header
            title={`Profile - ${userId}`}
            // subtitle="Welcome to y dashboard"
        />
    </Box>
    </>
  )
}

export default Profile