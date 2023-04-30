import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import "./style.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const {currentUser} = useContext(AuthContext);
  // console.log(currentUser);  // AuthContext store information about the currently authenticated user, such as their name, email address
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={currentUser? <Home /> : <Login />} />   
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
