/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';

const ForumNavbar = () => {  
  return (
    <nav className="p-4 border-b bg-blue-700 rounded-md m-9">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-white">Forum</h2>
        <Link to="/forumcreation">
          <button className="px-6 py-3 font-bold rounded-md bg-slate-50 hover:bg-blue-700 hover:text-white">
            Create a Forum
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default ForumNavbar;
