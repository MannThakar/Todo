import Todo from "./Pages/Todo";
import SignUp from "./Pages/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./Pages/SignIn";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import Error from "./Pages/Error";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Error />} />
        <Route path="/" element={<SignUp />} />
        <Route path="signin" element={<SignIn />} />
        <Route
          index
          path="/todo"
          element={
            <PrivateRoute>
              <Todo />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
