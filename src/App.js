import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Header from "../src/components/Header.jsx";
import Home from "./Screens/Home";
import LogIn from "./Screens/LogIn";
import SignUp from "./Screens/SignUp";
import Search from "./Screens/Search";
import FavoriteCourses from "./Screens/Favorite";
import {useContext} from "react";
import {AuthContext} from "./context/AuthContext";
import Dashboard from "./Screens/Dashboard";
import CourseDetail from "./Screens/CourseDetails";
import MyCourses from "./Screens/MyCourses";

function App() {
  const {currentUser} = useContext(AuthContext);
  const RequireAuth = ({children}) => {
    return currentUser ? children : <Navigate to='/login' />;
  };

  const AuthDone = ({children}) => {
    return currentUser ? <Navigate to='/dashboard' replace /> : children;
  };

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route
            path='/'
            element={
              <AuthDone>
                <Home />
              </AuthDone>
            }
          />
          <Route
            exact
            path='/login'
            element={
              <AuthDone>
                <LogIn />
              </AuthDone>
            }
          />
          <Route
            exact
            path='/signup'
            element={
              <AuthDone>
                <SignUp />
              </AuthDone>
            }
          />
          <Route
            exact
            path='/dashboard'
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route
            exact
            path='/courseDetail/:id'
            element={
              <RequireAuth>
                <CourseDetail />
              </RequireAuth>
            }
          />
          <Route
            exact
            path='/search'
            element={
              <RequireAuth>
                <Search />
              </RequireAuth>
            }
          />
          <Route
            exact
            path='/mycourses'
            element={
              <RequireAuth>
                <MyCourses />
              </RequireAuth>
            }
          />
          <Route
            exact
            path='/favorite'
            element={
              <RequireAuth>
                <FavoriteCourses />
              </RequireAuth>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
