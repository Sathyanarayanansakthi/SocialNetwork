//import React from 'react'
import CollabForm from "../components/CollabForm"
import { useState } from "react"


const CollabPage = () => {

const [showForm,setShowForm] =useState(false)
const handleClick =() =>{
    setShowForm(true)
}
  return (
<div>
  <div className="flex justify-end mb-4">
        <button onClick={handleClick} className="px-4 py-2 font-semibold text-white transition-all duration-300 bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none">
          Ask Collab
        </button>
      </div>
      {showForm && <CollabForm/>}
</div>
  )
}

export default CollabPage
