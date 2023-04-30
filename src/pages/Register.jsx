import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { useNavigate, Link } from "react-router-dom";

const Register = () => {

  const [err, setErr] = useState(false);
  const navigate = useNavigate();   // hook in react router dom
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);  // create user
      // const storageRef = ref(storage, displayName);
      // const date = new Date().getTime();
      // const storageRef = ref(storage, `${displayName + date}`);
      const storageRef = ref(storage,`${displayName}`);   // store display name as anurag.png in storage

      const uploadTask = uploadBytesResumable(storageRef, file);   // store profile picture
      uploadTask.on(
        (error) => {
          setErr(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {  // firebase fn
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            // send users from authentication database to firestore, so that users can search for other users and chat with them
            await setDoc(doc(db, "users", res.user.uid),{    // firebase syntax 
              uid: res.user.uid,   // store uid, displayName, email and dp
              displayName,
              email,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "userChats", res.user.uid), {});  // initially empty. //create userchats in firestore to store the list of users
            navigate("/");   // and if everything is ok, go to the home page.
          });
        }
      );
    } catch (err) {
      console.log(err);
      alert("Password should be at least 6 characters");
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
            <span className="logo2">
              "Where words matter, and connections count"
            </span>
          </div>
          <div className="login">
            <form onSubmit={handleSubmit}>
              <span className="title">Register</span>
              <input type="text" placeholder="Enter your name" />
              <input type="email" placeholder="Enter your email" />
              <input type="password" placeholder="Enter your password" />
              <input type="file" id="file" style={{ display: "none" }} />
              <div className="center">
                <label htmlFor="file">
                  <img src="./img/addAvatar.png" alt="" />
                  <span>Add your avatar.</span>
                </label>
                <button type="submit">SignUp</button>
              </div>
              <pre>
                Already have an account ? <Link to="/login">Login</Link>
              </pre>
              {err && <span>Something went wrong!</span>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
