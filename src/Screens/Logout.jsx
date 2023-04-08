import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Logout() {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        dispatch({ type: "LOGOUT" });
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="mt-24">
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Logout;
