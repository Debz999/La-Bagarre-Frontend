import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../reducers/user";
import { toggleCart, emptyTemporaryCart } from "../reducers/cart";
import { useRouter } from "next/router";
import styles from "../styles/User.module.css";

function User() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const cart = useSelector((state) => state.cart.value);
  const router = useRouter();

  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signInUsername, setSignInUsername] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signUpError, setSignUpError] = useState("");
  const [signInError, setSignInError] = useState("");

  const handleRegister = () => {
    fetch("https://la-bagarre-backend.vercel.app/users/signup", {
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
          if(cart.temporaryCart.length > 0) {
            console.log('test cart55', cart.temporaryCart)
            fetch(`https://la-bagarre-backend.vercel.app/carts/postFromTemporary/${data.token}`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({temporaryCart: cart.temporaryCart}),
            })
              .then((response) => response.json())
              .then(() => {
                //add get fetch here
                fetch(`https://la-bagarre-backend.vercel.app/carts/${data.token}`)
                  .then((response) => response.json())
                  .then((data) => {
                    dispatch(toggleCart(data.data.items));
                    dispatch(emptyTemporaryCart());
                  });
              });
          }
          setSignUpUsername("");
          setSignUpPassword("");
          router.push("/");
        } else {
          setSignUpError(data.error);
        }
      });
  };

  const handleConnection = () => {
    fetch("https://la-bagarre-backend.vercel.app/users/signin", {
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
          dispatch(emptyTemporaryCart());
          router.push("/");
        } else {
          setSignInError(data.error);
        }
      });
  };

  return (
    <div className={styles.main}>
      <header className={styles.header}>
        {/* <h2>LA BAGARRE</h2> */}
      </header>
      <div className={styles.formsContainer}>
        <div className={styles.formSeparator}>
          <h2 className={styles.subTitle}>CONNEXION</h2>

          <div className={styles.formRow}>
            {/* <label>Nom d'utilisateur: </label> */}
            <input
              type="text"
              id="username"
              placeholder="Nom d'utilisateur"
              name="username"
              onChange={(e) => setSignInUsername(e.target.value)}
              value={signInUsername}
            />
          </div>

          <div className={styles.formRow}>
            {/* <label>Mot de passe: </label> */}
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Mot de passe"
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
          <p className={styles.commentaryText}>Pas encore de compte ?</p>
          <h2 className={styles.subTitle}>INSCRIPTION</h2>

          <div className={styles.formRow}>
            {/* <label>Nom d'utilisateur: </label> */}
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Nom d'utilisateur"
              onChange={(e) => setSignUpUsername(e.target.value)}
              value={signUpUsername}
            />
          </div>

          <div className={styles.formRow}>
            {/* <label>Mot de passe: </label> */}
            <input
              type="password"
              id="password2"
              name="password"
              placeholder="Mot de passe"
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
