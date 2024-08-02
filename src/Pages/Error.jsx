/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
const Error = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 text-center">
          <div>
            <h2 className="mt-6 text-center text-6xl font-extrabold text-red-500">
              404
            </h2>
            <h1 className="mt-2 text-center text-3xl font-bold text-white">
              Oops! Page not found
            </h1>
            <p className="mt-2 text-center text-sm text-gray-400">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>
          <div className="mt-8">
            <Link
              to="/"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Go back home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Error;
