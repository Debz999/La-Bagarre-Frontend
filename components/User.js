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
  const [signUpError, setSignUpError] = useState("");
  const [signInError, setSignInError] = useState("");

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
        } else {
          setSignUpError(data.error);
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
        } else {
          setSignInError(data.error);
        }
      });
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className={styles.main}>
      <header className={styles.header}>
        <h2>LA BAGARRE</h2>
      </header>
      <div className={styles.formsContainer}>
        <div className={styles.formSeparator}>
          <p>Me connecter à mon compte</p>

          <div className={styles.formRow}>
            <label>Nom d'utilisateur: </label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={(e) => setSignInUsername(e.target.value)}
              value={signInUsername}
            />
          </div>

          <div className={styles.formRow}>
            <label>Mot de passe: </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) => setSignInPassword(e.target.value)}
              value={signInPassword}
            />
          </div>

          {signInError ? <p> {signInError} </p> : null}
          <button
            className={styles.button}
            onClick={() => {
              handleConnection();
            }}
          >
            Connexion
          </button>
        </div>

        <div className={styles.formSeparator}>
          <p>Pas encore de compte ?</p>

          <div className={styles.formRow}>
            <label>Nom d'utilisateur: </label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={(e) => setSignUpUsername(e.target.value)}
              value={signUpUsername}
            />
          </div>

          <div className={styles.formRow}>
            <label>Mot de passe: </label>
            <input
              type="password"
              id="password2"
              name="password"
              onChange={(e) => setSignUpPassword(e.target.value)}
              value={signUpPassword}
            />
          </div>

          {signUpError ? <p> {signUpError} </p> : null}
          <button className={styles.button} onClick={() => handleRegister()}>
            Me créer un compte
          </button>
        </div>
      </div>
    </div>
  );
}

export default User;
