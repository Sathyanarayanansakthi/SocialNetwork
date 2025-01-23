import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Paper, Grid } from '@mui/material';
import { Google as GoogleIcon, GitHub as GitHubIcon } from '@mui/icons-material';

function SignupPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === '' || email === '' || password === '') {
      setError('Please fill in all fields');
    } else {
      console.log('Account Created');
      navigate('/dashboard'); // Redirect to dashboard after successful signup
    }
  };

  const handleGoogleSignup = () => {
    console.log('Google Sign Up clicked');
    navigate('/dashboard'); // Redirect after successful Google signup
  };

  const handleGithubSignup = () => {
    console.log('GitHub Sign Up clicked');
    navigate('/dashboard'); // Redirect after successful GitHub signup
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: '100vh' }}
    >
      <Grid item xs={10} sm={8} md={6} lg={4}>
        <Paper elevation={6} style={{ padding: '2rem', borderRadius: '10px' }}>
          <Typography variant="h4" align="center" gutterBottom>
            Create an Account
          </Typography>

          {error && (
            <Typography color="error" align="center" gutterBottom>
              {error}
            </Typography>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              margin="normal"
            />

            <TextField
              fullWidth
              label="Email"
              type="email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>

          {/* Social Sign-Up Buttons */}
          <Button
            fullWidth
            variant="outlined"
            color="error"
            onClick={handleGoogleSignup}
            sx={{
              mt: 1,
              bgcolor: '#db4437',
              color: 'white',
              '&:hover': {
                bgcolor: '#c1351d',
              },
            }}
            startIcon={<GoogleIcon />}
            aria-label="Sign Up with Google"
          >
            Sign Up with Google
          </Button>

          <Button
            fullWidth
            variant="outlined"
            color="primary"
            onClick={handleGithubSignup}
            sx={{
              mt: 1,
              bgcolor: '#24292f',
              color: 'white',
              '&:hover': {
                bgcolor: '#333',
              },
            }}
            startIcon={<GitHubIcon />}
            aria-label="Sign Up with GitHub"
          >
            Sign Up with GitHub
          </Button>

          <Typography align="center" variant="body2" sx={{ mt: 2 }}>
            Already have an account?{' '}
            <a href="/signin" style={{ color: '#1976d2', textDecoration: 'none' }}>
              Sign In
            </a>
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default SignupPage;
