import { SignedIn, SignedOut} from '@clerk/clerk-react';
import Landingpage from "./pages/Landingpage";
import ProtectedPage from './pages/ProtectedPage';


const App = () => {
  return (
    <>
      <SignedOut>
        <Landingpage />

      </SignedOut>
      
      <SignedIn>
        <ProtectedPage />
      </SignedIn>
    </>
  );
};

export default App;
