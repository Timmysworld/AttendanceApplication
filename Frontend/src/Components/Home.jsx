import { useEffect, useState } from 'react'
import axios from 'axios';
const Home = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5180');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
  return (
    <div>
            <h1>{data ? data.message : 'Loading...'}</h1>
            {/* Add other components and logic as needed */}
        </div>
  )
}

export default Home