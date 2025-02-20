import { useState } from 'react';
import { Google as GoogleIcon, GitHub as GitHubIcon } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Container, Box, Stack, Alert, Grid, Paper } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';

function SigninPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

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

  return (
    <Grid container sx={{ height: '100vh' }}>
      {/* Sidebar Section */}
      <Grid item xs={12} sm={5} md={4} sx={{ bgcolor: '#1E1E2D', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Welcome Back!</Typography>
        <Typography variant="body1" sx={{ mt: 2, textAlign: 'center', maxWidth: 300 }}>
          Sign in to continue your journey with us. Explore, collaborate, and achieve your goals effortlessly.
        </Typography>
      </Grid>

      {/* Sign-in Form Section */}
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
              Don’t have an account?{' '}
              <Button color="primary" onClick={() => navigate('/signup')}>
                Create an account
              </Button>
            </Typography>
          </Paper>
        </Container>
      </Grid>
    </Grid>
  );
}

export default SigninPage;
