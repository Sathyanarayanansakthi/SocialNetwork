import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar Component */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 p-6 bg-white text-gray-900">
        <h1 className="mb-4 text-4xl font-bold drop-shadow-lg">
          Welcome to Your Dashboard!
        </h1>
        <p className="mb-4 text-lg text-gray-700">
          Manage your settings, view activities, and explore features.
        </p>

        {/* Additional Content */}
        <p className="text-sm text-gray-500">
          More features will be added soon. Stay tuned!
        </p>
      </main>
    </div>
  );
};

export default Dashboard;
