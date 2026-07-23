import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">

      <div className="text-center">

        <h1 className="text-8xl font-bold text-blue-500">
          404
        </h1>

        <h2 className="text-3xl font-bold mt-6">
          Page Not Found
        </h2>

        <p className="text-gray-400 mt-4">
          The page you are looking for doesn't exist.
        </p>

        <Link
          to="/dashboard"
          className="inline-block mt-8 bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-xl"
        >
          Back to Dashboard
        </Link>

      </div>

    </div>
  );
}

export default NotFound;