import styles from "../styles/Footer.module.css";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faSolidHeart } from "@fortawesome/free-solid-svg-icons"; // Filled heart
import { faHeart as faRegHeart } from "@fortawesome/free-regular-svg-icons"; // Outlined heart

function Footer() {
  const router = useRouter();

  return (
    <div className={styles.main}>
      <div className={styles.footerColumn}>
        <Link  href={`/article?categorie=Femme`}>
          <p className={styles.footerLink}>FEMME</p>
        </Link>
        <Link  href={`/article?categorie=Homme`}>
        <p className={styles.footerLink}>HOMME</p>
        </Link>
        <Link href={`/article?categorie=Enfant`}>
        <p className={styles.footerLink}>ENFANT</p>
        </Link>
        <Link  href={`/article?categorie=Accessoires`}>
        <p className={styles.footerLink}>ACCESSOIRES</p>
        </Link>
    
      </div>
      <div className={styles.footerColumn} >
        <h3>NOUS CONTACTER</h3>
        <p className={styles.footerText} >Mail : service-client@labagarre.com</p>
        <p className={styles.footerText} >FAQ : Questions/réponses</p>
        <p className={styles.footerText}>Demander un retour ou un échange</p>
      </div>
      <div className={styles.footerColumn} >
        <h3>INFORMATIONS PRATIQUES</h3>
        <p className={styles.footerText} >A propos</p>
        <p className={styles.footerText} >Livraisons & Retours</p>
        <p className={styles.footerText} >Mentions légales</p>
      </div>
    </div>
  );
}

export default Footer;
