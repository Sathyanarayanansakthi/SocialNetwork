import { useState } from 'react';
import { Google as GoogleIcon, GitHub as GitHubIcon } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignupPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:3000/api/auth/signUp', {
        username,
        email,
        password,
      });
      console.log('User registered successfully:', data);
      navigate('/dashboard'); 
    } catch (err) {
      setErrorMessage(err.response?.data?.error || 'Registration failed.');
      console.error('Registration failed:', err);
    }
  };

  const handleGoogleSignup = () => {
    console.log('Google signup clicked');
  };

  const handleGithubSignup = () => {
    console.log('GitHub signup clicked');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full p-6 bg-white rounded-lg shadow-lg sm:w-96 md:w-80 lg:w-96">
        <h2 className="mb-4 text-3xl font-semibold text-center">Create an Account</h2>

        {errorMessage && <p className="mb-4 text-center text-red-500">{errorMessage}</p>}

        <form onSubmit={registerUser}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Sign Up
          </button>
        </form>

        <button
          onClick={handleGoogleSignup}
          className="w-full p-3 mt-4 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none" >
          <div className="flex items-center justify-center space-x-2">
            <GoogleIcon />
            <span>Sign Up with Google</span>
          </div>
        </button>

        <button
          onClick={handleGithubSignup}
          className="w-full p-3 mt-4 text-white bg-gray-800 rounded-md hover:bg-gray-900 focus:outline-none"
        >
          <div className="flex items-center justify-center space-x-2">
            <GitHubIcon />
            <span>Sign Up with GitHub</span>
          </div>
        </button>

        <p className="mt-4 text-sm text-center">
          Already have an account?{' '}
          <a href="/signin" className="text-blue-500 hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
