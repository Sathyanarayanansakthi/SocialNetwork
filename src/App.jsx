//import React from 'react'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'

import Landingpage from "./pages/Landingpage"

const App = () => {
  return (
    <>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
        <Landingpage/>
      </SignedIn>
    </>
  )
}

export default App
