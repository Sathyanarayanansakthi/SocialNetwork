import Sidebar from '../components/Sidebar';
//import { Box } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="flex">
      {/* Sidebar Component */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 min-h-screen p-6 bg-gray-100" >
        <h1 className="mb-4 text-4xl font-semibold text-gray-800">
          Welcome to Your Dashboard!
        </h1>
        <p className="mb-4 text-lg text-gray-700">
          This is where you can manage your settings, view your activities, and access various features.
        </p>

        {/* Add more dashboard content here */}
        <p className="text-sm text-gray-500">
          More features will be added here.
        </p>
      </main>
    </div>
  );
};

export default Dashboard;
