import styles from "../styles/Header.module.css";
import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { faUser, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect } from "react";
import user from "../reducers/user";
import Link from "next/link";
import Sousmenu from "./Sousmenu";
import { useRouter } from "next/router";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); //état pour le menu User visible uniquement si logIn
  const [sousMenuOpen, setSousMenuOpen] = useState(null); //état pour sous menu des categories
  const user = useSelector((state) => state.user.value);
  const cart = useSelector((state) => state.cart.value);

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

  //Accès au Cart

  const handleClickCart = () => {
    router.push("/cart");
  };

  //Accès aux sous catégories

  const handleClicksous = (categorie, type) => {
    router.push(`/articles/articlesC?categorie=${categorie}&type=${type}`);
  };

  //On met un useEffect pour permettre au menu de bien s'ouvrir et se fermer à chaque click en dehors

  useEffect(() => {
    const handleClickOut = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }; //permet de verifier si le click est en dehors du menu
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOut);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOut);
    };
  }, [isMenuOpen]);

    /*Get cart total items */
  const totalItems = cart.cartItem.reduce(
    (sum, value) => sum + value.quantity,
    0
  );
  //console.log(totalItems); //works

  return (
    <div>
      <Head>
        <title>LA BAGARRE</title>
      </Head>

      <div className={styles.barreMenu}>
        <Link href="/">
          <p className={styles.linkHome}> LA BAGARRE</p>
        </Link>
        <FontAwesomeIcon
          className={styles.userIcon}
          icon={faUser}
          onClick={() => {
            handleUserClick();
          }}
        />
        <FontAwesomeIcon
          className={styles.userIcon}
          icon={faCartShopping}
          onClick={() => handleClickCart()}
        />
      </div>
      {isMenuOpen && (
        <ul ref={menuRef} className={styles.menu}>
          <li>
            <Link href="/profil"> Parametres du compte</Link>
          </li>

          <li>
            <Link href="/favoris">Mes favoris</Link>
          </li>
          <li>Mes commandes</li>
          <li>Me déconnecter</li>
        </ul>
      )}
      <div className={styles.containerCat}>
        
      <Sousmenu categorie="Homme" types={["Gi", "Rashguard", "Short"]} />
      <Sousmenu categorie="Femme" types={["Gi", "Rashguard", "Short"]} />
      <Sousmenu categorie="Enfant" types={["Gi", "Rashguard", "Short"]} />
      <Sousmenu categorie="Accessoires" types={["Ceintures", "Sac", "Casquettes"]} />  
      </div>
    </div>
  );
}

export default Header;
