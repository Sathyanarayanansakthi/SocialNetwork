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
      const { data } = await axios.post('http://localhost:5000/api/auth/signup', {
        username,
        email,
        password,
      });

      toast.success('Registration successful! Redirecting...');
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err) {
      setErrorMessage(err.response?.data?.error || 'Registration failed.');
      toast.error(err.response?.data?.error || 'Registration failed.');
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8, p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h5" component="h1" textAlign="center" gutterBottom>
        Create an Account
      </Typography>

      {errorMessage && <Alert severity="error" sx={{ mb: 2 }}>{errorMessage}</Alert>}

      <Box component="form" onSubmit={registerUser} noValidate sx={{ mt: 2 }}>
        <Stack spacing={2}>
          <TextField label="Username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} fullWidth required />
          <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth required />
          <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth required />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Sign Up
          </Button>
        </Stack>
      </Box>

      <Button variant="contained" startIcon={<GoogleIcon />} fullWidth sx={{ mt: 2, bgcolor: 'red', color: 'white' }}>
        Sign Up with Google
      </Button>

      <Button variant="contained" startIcon={<GitHubIcon />} fullWidth sx={{ mt: 2, bgcolor: 'black', color: 'white' }}>
        Sign Up with GitHub
      </Button>

      <Typography variant="body2" textAlign="center" sx={{ mt: 2 }}>
        Already have an account?{' '}
        <Button color="primary" onClick={() => navigate('/signin')}>
          Sign In
        </Button>
      </Typography>

      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} />
    </Container>
  );
}

export default SignupPage;
