import React, { useState } from 'react';
import { Google as GoogleIcon, GitHub as GitHubIcon } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  TextField,
  Typography,
  Container,
  Box,
  Stack,
  Alert,
  Grid,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';

function SigninPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [openSignup, setOpenSignup] = useState(false);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupErrorMessage, setSignupErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in both fields');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/auth/signin', { email, password });
      toast.success('Signed in successfully!');
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
      toast.error(err.response?.data?.error || 'Something went wrong');
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/api/auth/google';
  };

  const handleGitHubLogin = () => {
    window.location.href = 'http://localhost:5000/api/auth/github';
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/signup', {
        username,
        email: signupEmail,
        password: signupPassword,
      });

      toast.success('Registration successful! Redirecting...');
      setOpenSignup(false);
      navigate('/dashboard');
    } catch (err) {
      setSignupErrorMessage(err.response?.data?.error || 'Registration failed.');
      toast.error(err.response?.data?.error || 'Registration failed.');
    }
  };

  const handleGoogleSignup = () => {
    window.location.href = 'http://localhost:5000/api/auth/google';
  };

  const handleGitHubSignup = () => {
    window.location.href = 'http://localhost:5000/api/auth/github';
  };

  return (
    <Grid container sx={{ height: '100vh' }}>
      <Grid
        item
        xs={12}
        sm={5}
        md={4}
        sx={{
          bgcolor: '#1E1E2D',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          p: 4,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Welcome Back!
        </Typography>
        <Typography variant="body1" sx={{ mt: 2, textAlign: 'center', maxWidth: 300 }}>
          Sign in to continue your journey with us. Explore, collaborate, and achieve your goals effortlessly.
        </Typography>
      </Grid>

      <Grid item xs={12} sm={7} md={8} display="flex" justifyContent="center" alignItems="center">
        <Container maxWidth="xs">
          <Toaster position="top-right" />
          <Paper elevation={6} sx={{ p: 4, borderRadius: 3, width: '100%', bgcolor: 'white' }}>
            <Typography variant="h5" component="h1" textAlign="center" gutterBottom>
              Sign In
            </Typography>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
              <Stack spacing={2}>
                <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth required />
                <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth required />
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2, bgcolor: '#4F46E5', '&:hover': { bgcolor: '#4338CA' } }}>
                  Sign In
                </Button>
              </Stack>
            </Box>

            <Stack spacing={2} sx={{ mt: 2 }}>
              <Button variant="contained" startIcon={<GoogleIcon />} fullWidth sx={{ bgcolor: '#DB4437', color: 'white', '&:hover': { bgcolor: '#C1351D' } }} onClick={handleGoogleLogin}>
                Sign in with Google
              </Button>
              <Button variant="contained" startIcon={<GitHubIcon />} fullWidth sx={{ bgcolor: 'black', color: 'white', '&:hover': { bgcolor: '#333' } }} onClick={handleGitHubLogin}>
                Sign in with GitHub
              </Button>
            </Stack>

            <Typography variant="body2" textAlign="center" sx={{ mt: 2 }}>
              Don’t have an account? <Button color="primary" onClick={() => setOpenSignup(true)}>Create an account</Button>
            </Typography>
          </Paper>
        </Container>
      </Grid>

      <Dialog open={openSignup} onClose={() => setOpenSignup(false)} maxWidth="xs" fullWidth>
        <DialogTitle textAlign="center">Create an Account</DialogTitle>
        <DialogContent>
          {signupErrorMessage && <Alert severity="error" sx={{ mb: 2 }}>{signupErrorMessage}</Alert>}
          <Box component="form" onSubmit={handleSignup} noValidate>
            <Stack spacing={2}>
              <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} fullWidth required />
              <TextField label="Email" type="email" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} fullWidth required />
              <TextField label="Password" type="password" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} fullWidth required />
            </Stack>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Stack spacing={2} width="100%">
            <Button type="submit" variant="contained" color="primary" fullWidth onClick={handleSignup}>
              Sign Up
            </Button>
            <Button variant="contained" startIcon={<GoogleIcon />} fullWidth sx={{ bgcolor: 'red', color: 'white' }} onClick={handleGoogleSignup}>
              Sign Up with Google
            </Button>
            <Button variant="contained" startIcon={<GitHubIcon />} fullWidth sx={{ bgcolor: 'black', color: 'white' }} onClick={handleGitHubSignup}>
              Sign Up with GitHub
            </Button>
            <Typography variant="body2" textAlign="center">
              Already have an account? <Button color="primary" onClick={() => setOpenSignup(false)}>Sign In</Button>
            </Typography>
          </Stack>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

export default SigninPage;