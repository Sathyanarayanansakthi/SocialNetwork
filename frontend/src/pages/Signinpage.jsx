import { useState } from 'react';
import { Google as GoogleIcon, GitHub as GitHubIcon } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Container, Box, Stack, Alert } from '@mui/material';
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
      const response = await axios.post('http://localhost:5000/api/auth/signin', {
        email,
        password,
      });

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
    <Container maxWidth="xs" sx={{ mt: 8, p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: 3 }}>
      <Toaster position="top-right" />
      <Typography variant="h5" component="h1" textAlign="center" gutterBottom>
        Sign In
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
        <Stack spacing={2}>
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
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Sign In
          </Button>
        </Stack>
      </Box>

      <Stack spacing={2} sx={{ mt: 2 }}>
        <Button
          variant="contained"
          startIcon={<GoogleIcon />}
          fullWidth
          sx={{ bgcolor: 'red', color: 'white', '&:hover': { bgcolor: 'darkred' } }}
          onClick={handleGoogleLogin}
        >
          Sign in with Google
        </Button>
        <Button
          variant="contained"
          startIcon={<GitHubIcon />}
          fullWidth
          sx={{ bgcolor: 'black', color: 'white', '&:hover': { bgcolor: 'gray' } }}
          onClick={handleGitHubLogin}
        >
          Sign in with GitHub
        </Button>
      </Stack>

      <Typography variant="body2" textAlign="center" sx={{ mt: 2 }}>
        Don&lsquo;t have an account?{' '}
        <Button color="primary" onClick={() => navigate('/signup')}>
          Create an account
        </Button>
      </Typography>
    </Container>
  );
}

export default SigninPage;
