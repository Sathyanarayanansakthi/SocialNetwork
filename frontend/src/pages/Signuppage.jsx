import { useState } from 'react';
import { Google as GoogleIcon, GitHub as GitHubIcon } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Alert,
  Box,
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signuppage({ open, handleClose }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/signup', {
        username,
        email,
        password,
      });

      toast.success('Registration successful! Redirecting...');
      setTimeout(() => {
        handleClose();
        navigate('/dashboard');
      }, 2000);
    } catch (err) {
      setErrorMessage(err.response?.data?.error || 'Registration failed.');
      toast.error(err.response?.data?.error || 'Registration failed.');
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle textAlign="center">Create an Account</DialogTitle>
      <DialogContent>
        {errorMessage && <Alert severity="error" sx={{ mb: 2 }}>{errorMessage}</Alert>}
        <Box component="form" onSubmit={registerUser} noValidate>
          <Stack spacing={2}>
            <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} fullWidth required />
            <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth required />
            <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth required />
          </Stack>
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center' }}>
        <Stack spacing={2} width="100%">
          <Button type="submit" variant="contained" color="primary" fullWidth onClick={registerUser}>
            Sign Up
          </Button>
          <Button variant="contained" startIcon={<GoogleIcon />} fullWidth sx={{ bgcolor: 'red', color: 'white' }}>
            Sign Up with Google
          </Button>
          <Button variant="contained" startIcon={<GitHubIcon />} fullWidth sx={{ bgcolor: 'black', color: 'white' }}>
            Sign Up with GitHub
          </Button>
          <Typography variant="body2" textAlign="center">
            Already have an account?{' '}
            <Button color="primary" onClick={handleClose}>Sign In</Button>
          </Typography>
        </Stack>
      </DialogActions>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} />
    </Dialog>
  );
}

export default Signuppage;
