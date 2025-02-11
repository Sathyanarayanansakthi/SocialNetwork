import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/Landingpage';
import SigninPage from './pages/Signinpage';
import SignupPage from './pages/Signuppage';
import Dashboard from './pages/Dashboard';
import Blog from './pages/Blog';
import BlogForm from './components/Blog/BlogForm';
import Forum from './pages/Forum';
import ForumCreation from './components/Forum/ForumCreation';
import Collab from './pages/Collab';
import Collabform from './components/Collab/Collabform';
import Event from './pages/Event'
import Profile from './pages/Profile';
import Paper from './pages/Paper';
import Pattern from './pages/Pattern';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/create" element={<BlogForm />} />
          <Route path="/forumcreation" element={<ForumCreation />} />
         <Route path='collab' element={<Collab />} />
         <Route path="collabForm" element={<Collabform />} />
         <Route path='/event' element={<Event />}/>
         <Route path='/profile' element={<Profile />} />
         <Route path='/paper' element={<Paper />} />
         <Route path="/pattern" element={<Pattern />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
