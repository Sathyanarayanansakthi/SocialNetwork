// import React from 'react';
import { Link } from 'react-router-dom';

const CollabNav = () => {
  return (
    <div className='bg-blue-700 p-4  flex justify-between items-center shadow-md rounded-md  px-10'>
      <h3 className='text-white text-2xl font-bold '>Event</h3>
      <Link to='/eventform'>
        <button className='px-6 py-3  rounded-lg bg-white text-blue-700 font-bold shadow-md hover:bg-blue-500 hover:text-white transition duration-300'>
          Create a Event 
        </button>
      </Link>
    </div>
  );
};

export default CollabNav;
