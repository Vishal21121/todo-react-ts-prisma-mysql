import Signup from "./components/Signup";
import Login from "./components/Login";
import { Route, Routes } from "react-router-dom";
import Todo from "./components/Todo";
import { Toaster } from "react-hot-toast";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Todo />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
