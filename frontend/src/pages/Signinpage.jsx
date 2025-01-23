import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Box,Button,TextField,Typography,Container,Alert,Stack} from '@mui/material';
import { Google as GoogleIcon, GitHub as GitHubIcon } from '@mui/icons-material';
import axios from 'axios'

function SigninPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    //Axios

    axios.get('http://localhost:5000/')

    //Form valadation
    if (email === '' || password === '') {
      setError('Please fill in both fields');
    } else {
      // Simulate successful login
      console.log('Sign In Successful');
      navigate('/dashboard');
    }
  };

  const handleGoogleSignIn = () => {
    console.log('Google Sign-In clicked');
    navigate('/dashboard');
  };

  const handleGitHubSignIn = () => {
    console.log('GitHub Sign-In clicked');
    navigate('/dashboard');
  };


  return (
    <Container
      maxWidth="xs" sx={{mt: 8,p: 4,bgcolor: 'white',borderRadius: 2,boxShadow: 3,  }} >
      
      <Typography variant="h4" component="h1" textAlign="center" gutterBottom>
        Sign In
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
        <Stack spacing={2}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
          />

          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Sign In
          </Button>
        </Stack>
      </Box>

      <Typography variant="body2" textAlign="center" sx={{ mt: 2 }}>
        Dont have an account?{' '}
        <Button color="primary" onClick={() => navigate('/signup')}>
          Create an account
        </Button>
      </Typography>

      <Stack spacing={2} sx={{ mt: 3 }}>
        <Button
          variant="contained"
          color="error"
          onClick={handleGoogleSignIn}
          fullWidth
          sx={{
            mt: 1,
            bgcolor: '#db4437',
            color: 'white',
            '&:hover': {
              bgcolor: '#c1351d',
            },
          }}
          startIcon={<GoogleIcon />}
        >
          Sign In with Google
        </Button>

        <Button
          variant="contained"
          sx={{
            bgcolor: '#24292f',
            '&:hover': { bgcolor: '#333' },
          }}
          onClick={handleGitHubSignIn}
          fullWidth
          startIcon={<GitHubIcon />}
        >
          Sign In with GitHub
        </Button>
      </Stack>
    </Container>
  );
}

export default SigninPage;
