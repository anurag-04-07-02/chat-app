import React,{useState}from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {

  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate("/")
    } catch (err) {
      console.log(err);
      setErr(true);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <div className="container">
          <div className="heading">
            <span className="logo">Chatly</span>
            <span className="logo1">The Ultimate communication platform</span>
            <span className="logo2">"Where words matter, and connections count"</span>
          </div>
          <div className="login">
          <form onSubmit={handleSubmit}>
            <span className="title" style={{marginLeft: "14vh"}}>Login</span>
            <input type="email" placeholder="Enter your E-mail" />
            <input type="password" placeholder="Enter your password" />
            <button type="submit">SignIn</button>
            {err && <span>Something went wrong!</span>}
          </form>
          <pre>You don't have an account ? <Link to="/register">Register</Link></pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
