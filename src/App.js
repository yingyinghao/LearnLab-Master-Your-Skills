import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import "./App.css";

import Header from "../src/components/Header.jsx";
import Home from "./Screens/Home";
import LogIn from "./Screens/LogIn";
import SignUp from "./Screens/SignUp";
import Search from "./Screens/Search";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route exact path='/login' element={<LogIn />} />
          <Route exact path='/signup' element={<SignUp />} />
           <Route exact path='/search' element={<Search />} />

          {/* <Route exact path='/courses' component={CourseHome} />
          <Route exact path='/team' component={Team} />
          <Route exact path='/pricing' component={Pricing} />
          <Route exact path='/journal' component={Blog} />
          <Route exact path='/contact' component={Contact} /> */}
        </Routes>
        {/* <Footer /> */}
      </Router>

    </>
  );
}

export default App;
