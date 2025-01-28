import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/Landingpage';
import SigninPage from './pages/Signinpage';
import SignupPage from './pages/Signuppage';
import Dashboard from './pages/Dashboard';
import Blog from './pages/Blog';
import BlogForm from './components/Blog/BlogForm'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/create" element={<BlogForm />} /> 
      </Routes>
    </Router>
  );
}

export default App;
