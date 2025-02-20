import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  return (
    <div className="flex">
      {/* Sidebar Component */}
      <Sidebar />

      {/* Main Content Area */}
      <main
        className="flex-1 min-h-screen p-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-white"
      >
        <h1 className="mb-4 text-4xl font-bold text-white drop-shadow-lg">
          Welcome to Your Dashboard!
        </h1>
        <p className="mb-4 text-lg text-gray-300">
          Manage your settings, view activities, and explore features.
        </p>

        {/* Add more dashboard content here */}
        <p className="text-sm text-gray-400">
          More features will be added soon. Stay tuned!
        </p>
      </main>
    </div>
  );
};

export default Dashboard;
