import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../reducers/user";
import { FontAwesomeicon } from "@fortawesome/react-fontawesome";
import styles from '../styles/User.module.css'


function User() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signInUsername, setSignInUsername] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  

  const handleRegister = () => {
    fetch("http://localhost:3000/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: signUpUsername,
        password: signUpPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(login({ username: signUpUsername, token: data.token }));
          setSignUpUsername("");
          setSignUpPassword("");
        }
      });
  };

  const handleConnection = () => {
    fetch("http://localhost:3000/users/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: signInUsername,
        password: signInPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(login({ username: signInUsername, token: data.token }));
          setSignInUsername("");
          setSignInPassword("");
        }
      });
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return(
    <div className={styles.main}>
    <header className={styles.header} >
        <div>
            LA BAGARRE
        </div>
    </header>
<div>
    <title>Me connecter à mon compte</title>
    <label >Nom d'utilisateur: </label>
    <input  type="text" id="username" name="username" onChange={(e) => setSignInUsername(e.target.value)}
            value={signInUsername} /> 
    <label >Mot de passe: </label>
    <input type="password" id="password" name="password" onChange={(e) => setSignInPassword(e.target.value)}
            value={signInPassword}/>
<button  className={styles.button} onClick={()=>{handleConnection}} > Connexion </button>
</div>


</div>
  ) 
}

export default User;
