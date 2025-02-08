import styles from "../styles/Header.module.css";
import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { faUser, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect } from "react";
import user from "../reducers/user";
import Link from "next/link";

import { useRouter } from "next/router";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useSelector((state) => state.user.value);
  const router = useRouter();
  const menuRef = useRef(null);

  //Si user non connecté go to page user pour connection sinon affichage du sous menu
  const handleUserClick = () => {
    if (!user.token) {
      router.push("/user");
    } else {
      setIsMenuOpen((prev) => !prev);
    }
  };

  //On met un useEffect pour permettre au menu de bien s'ouvrir et se fermer à chaque click en dehors

  useEffect(() => {
    const handleClickOut= (event) =>{
      if (menuRef.current && !menuRef.current.contains(event.target)){
        setIsMenuOpen(false)
      }
    };//permet de verifier si le click est en dehors du menu
    if (isMenuOpen){
      document.addEventListener("mousedown", handleClickOut);
    }
    return () =>{
      document.removeEventListener("mousedown", handleClickOut)
    }
  }, [isMenuOpen]);

  return (
    <div>
      <Head>
        <title>LA BAGARRE</title>
      </Head>

      <div className={styles.barreMenu} >
        <Link href='/' ><p className={styles.linkHome}> LA BAGARRE</p></Link>
        <FontAwesomeIcon
        className={styles.userIcon}
          icon={faUser}
          onClick={() => {
            handleUserClick();
          }}
        />
        <FontAwesomeIcon
        className={styles.userIcon}
        icon={faCartShopping}/>

      </div>
      {isMenuOpen && (
        <ul ref={menuRef} className={styles.menu} >
          <li >  <Link href="/profil"> Parametres du compte</Link>
          </li>
         
          <li>Mes favoris</li>
          <li>Mes commandes</li>
          <li>Me déconnecter</li>

        </ul>
      )}
    </div>
  );
}

export default Header;
