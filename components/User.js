import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../reducers/user";
import { useRouter } from "next/router";
import styles from "../styles/User.module.css";

function User() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const router = useRouter();

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
          router.push("/");
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
          router.push("/");
        }
      });
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className={styles.main}>
      <header className={styles.header}>
        <div>LA BAGARRE</div>
      </header>
      <div>
        <p>Me connecter à mon compte</p>
        <label>Nom d'utilisateur: </label>
        <input
          type="text"
          id="username"
          name="username"
          onChange={(e) => setSignInUsername(e.target.value)}
          value={signInUsername}
        />
        <label>Mot de passe: </label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={(e) => setSignInPassword(e.target.value)}
          value={signInPassword}
        />
        <button
          className={styles.button}
          onClick={() => {
            handleConnection();
          }}
        >
          Connexion
        </button>
        <p>Pas encore de compte ?</p>
        <label>Nom d'utilisateur: </label>
        <input
          type="text"
          id="username"
          name="username"
          onChange={(e) => setSignUpUsername(e.target.value)}
          value={signUpUsername}
        />
        <label>Mot de passe: </label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={(e) => setSignUpPassword(e.target.value)}
          value={signUpPassword}
        />
        <button className={styles.button} onClick={() => handleRegister()}>
          Me créer un compte
        </button>
      </div>
    </div>
  );
}

export default User;
