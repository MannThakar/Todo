import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase/Firebase";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User signed in", user);
        if (user.accessToken) {
          localStorage.setItem("accessToken", user.accessToken);
          navigate("/todo");
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setToast(true);
        console.log("Error", errorCode, errorMessage);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup submitted", { email, password });
    handleSignUp();
  };

  return (
    <div className="md:min-h-screen md:m-auto md:w-screen bg-gray-900 flex items-center justify-center w-11/12 m-auto mt-28">
      <div className="max-w-md w-full space-y-8 p-8 bg-gray-800 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Sign In
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {" "}
            {/* Added space-y-4 here */}
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-gray-700"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-gray-700"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign In
            </button>
          </div>
        </form>
        <div className="text-center">
          <p className="mt-2 text-sm text-gray-400">
            For New User?{" "}
            <Link
              to="/"
              className="font-medium text-indigo-400 hover:text-indigo-300"
            >
              Sign Up
            </Link>
          </p>
        </div>
        {toast && (
          <div className="toast toast-top toast-center">
            <div className="alert alert-error">
              <span>Not An user</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignIn;
