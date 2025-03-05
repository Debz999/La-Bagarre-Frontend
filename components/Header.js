import styles from "../styles/Header.module.css";
import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCartShopping,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faSolidHeart } from "@fortawesome/free-solid-svg-icons"; // Filled heart
import { faHeart as faRegHeart } from "@fortawesome/free-regular-svg-icons"; // Outlined heart
import { useDispatch, useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
import user from "../reducers/user";
import { logout } from "../reducers/user";
import { emptyCartItem, toggleCart } from "../reducers/cart";
import Link from "next/link";
import Sousmenu from "./Sousmenu";
import { useRouter } from "next/router";

function Header() {
  const dispatch = useDispatch();
  const [isReloaded, setIsReloaded] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); //état pour le menu User visible uniquement si logIn
  const [sousMenuOpen, setSousMenuOpen] = useState(null); //état pour sous menu des categories
  const [isLiked, setIsLiked] = useState(false);
  const user = useSelector((state) => state.user.value);
  const cart = useSelector((state) => state.cart.value);
  const wishlist = useSelector((state) => state.wishlist.value);

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

  //On met un useEffect pour permettre au menu de bien s'ouvrir et se fermer à chaque click en dehors d

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

  //Get cart from DB
  useEffect(() => {
    if (user.token) {
      fetch(`https://la-bagarre-backend.vercel.app/carts/${user.token}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.data) {
            dispatch(toggleCart(data.data.items));
          }
        });
    }
  }, [user.token]);

  //update heart if there are liked elements
  useEffect(() => {
    if (wishlist.length > 0) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [wishlist]);

  //logout
  const handleLogout = () => {
    setIsMenuOpen(false);
    dispatch(logout());
    dispatch(emptyCartItem());
    router.push("/");
  };

  //Get cart total items
  // let totalItems = cart.cartItem.reduce(
  //   (sum, value) => sum + value.quantity,
  //   0
  // ); //console.log(totalItems); //works
  const totalItems = (
      cart.cartItem.length > 0 ? cart.cartItem : cart.temporaryCart
    ).reduce((sum, value) => sum + value.quantity, 0);


  return (
    <div>
      <Head>
        <title>LA BAGARRE</title>
      </Head>

      <div className={styles.barreMenu}>
        <Link href="/">
          <h1 className={styles.linkHome}> LA BAGARRE</h1>
        </Link>
        <div className={styles.headerIcons}>
          <span className={styles.welcomeSign}>Bienvenue {user.username}</span>
          <FontAwesomeIcon
            className={styles.iconStyle}
            icon={isLiked ? faSolidHeart : faRegHeart}
            onClick={() => {
              router.push("/favoris");
            }}
          />
          <FontAwesomeIcon
            className={styles.iconStyle}
            icon={faUser}
            onClick={() => {
              handleUserClick();
            }}
          />

          <div className={styles.cartContainer}>
            <FontAwesomeIcon
              className={styles.iconStyle}
              icon={faCartShopping}
              onClick={() => handleClickCart()}
            />
            {totalItems > 0 && (
              <span className={styles.numberContainer}>{totalItems}</span>
            )}
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <ul ref={menuRef} className={styles.menu}>
          <li>
            <Link href="/profil"> Parametres du compte</Link>
          </li>

          <li>
            <Link href="/favoris">Mes favoris</Link>
          </li>
          <li>
            <Link href="/orders">Mes commandes</Link>
          </li>
          <li onClick={() => handleLogout()}>Me déconnecter</li>
        </ul>
      )}
      <div className={styles.containerCat}>
        <Sousmenu categorie="Homme" types={["Gi", "Rashguard", "Short"]} />
        <Sousmenu categorie="Femme" types={["Gi", "Rashguard", "Short"]} />
        <Sousmenu categorie="Enfant" types={["Gi", "Rashguard", "Short"]} />
        <Sousmenu
          categorie="Accessoires"
          types={["Ceintures", "Sac", "Casquettes"]}
        />
      </div>
    </div>
  );
}

export default Header;
