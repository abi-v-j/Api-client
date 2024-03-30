import React, { useEffect, useLayoutEffect, useState } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from './Auth/Auth'
import { Box, Button } from '@mui/material'
import axios from 'axios'
import Loader from './Loader';


const GoogleLogin = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state


  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const { user } = result;
      const { email, displayName } = user
      setUser(displayName);

      setTimeout(() => {
        setLoading(false);
      }, 3000); // 3000 milliseconds = 3 seconds

      axios.post("http://localhost:5000/api/user", { email, displayName }).then((response) => {
        sessionStorage.setItem("token", response.data.token)
      }).catch((error) => {
        console.log();
        console.log(error.response.data.msg)

      })
      // Handle successful login (e.g., store user data)
    } catch (error) {
      console.error('Login error:', error);
      // Handle login errors
    }
  };


  const fetchProtectedData = async () => {
    try {

      const token = sessionStorage.getItem("token");
      if (!token) {
        setLoading(false); // Set loading state to false if there's an error
        return;

      }

      // Make request to protected endpoint with JWT token
      const response = await axios.get("http://localhost:5000/api/protected-route", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const user = response.data.user.displayName
      setUser(user);
      setTimeout(() => {
        setLoading(false);
      }, 3000); // 3000 milliseconds = 3 seconds


      // Handle response data
      console.log(response.data);
    } catch (error) {
      console.error('Fetch error:', error);
      // Handle fetch errors
    }
  };

  useEffect(() => {
    fetchProtectedData();
  }, []); // Call fetchProtectedData whenever user state changes


  useLayoutEffect(() => {
    setLoading(true); // Set loading state to true before the async operation

  }, [])


  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '95vh' }}>
      {loading ? ( // Render Loader component if loading state is true
        <Loader />
      ) : (
        user ? (
          <p>Welcome, {user}</p>
        ) : (
          <Button variant='outlined' onClick={handleGoogleLogin}>Sign in with Google</Button>
        )
      )}
    </Box>
  );
};

export default GoogleLogin;