import { useState } from 'react';
import { Google as GoogleIcon, GitHub as GitHubIcon } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Container, Box, Stack, Alert } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignupPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/signUp', { //endpoint of the signup added
        username,
        email,
        password,
      });

      console.log('User registered successfully:', data);
      toast.success('Registration successful! Redirecting...');//toster message
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Registration failed.';
      setErrorMessage(errorMessage);
      toast.error(errorMessage);
      console.error('Registration failed:', err);
    }
  };


  // Google Auth
  const handleGoogleSignup = () => {
    console.log('Google signup clicked');
  };

  // Github Auth
  const handleGithubSignup = () => {
    console.log('GitHub signup clicked');
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8, p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h5" component="h1" textAlign="center" gutterBottom>
        Create an Account
      </Typography>

      {errorMessage && <Alert severity="error" sx={{ mb: 2 }}>{errorMessage}</Alert>}

      <Box component="form" onSubmit={registerUser} noValidate sx={{ mt: 2 }}>
        <Stack spacing={2}>
          <TextField
            label="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth required
          />
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth required
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Sign Up
          </Button>
        </Stack>
      </Box>

      <Button
        variant="contained"
        startIcon={<GoogleIcon />}
        fullWidth
        sx={{ mt: 2, bgcolor: 'red', color: 'white', '&:hover': { bgcolor: 'darkred' } }}
        onClick={handleGoogleSignup}
      >
        Sign Up with Google
      </Button>

      <Button
        variant="contained"
        startIcon={<GitHubIcon />}
        fullWidth
        sx={{ mt: 2, bgcolor: 'black', color: 'white', '&:hover': { bgcolor: 'gray' } }}
        onClick={handleGithubSignup}
      >
        Sign Up with GitHub
      </Button>

      <Typography variant="body2" textAlign="center" sx={{ mt: 2 }}>
        Already have an account?{' '}
        <Button color="primary" onClick={() => navigate('/signin')}>
          Sign In
        </Button>
      </Typography>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Container>
  );
}

export default SignupPage;
