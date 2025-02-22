import styles from "../styles/SousMenu.module.css";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const SousMenu = ({ categorie, types }) => {
  const [sousMenuOpen, setSousMenuOpen] = useState(null); //état pour sous menu des categories
  const router = useRouter();

  const handleClickCate = () => {
    //click sur la categorie seule
    router.push(`/article?categorie=${categorie}`);
  };

  return (
    <div
      className={styles.sousmenu}
      onMouseEnter={() => setSousMenuOpen("Homme")}
      onMouseLeave={() => setSousMenuOpen(null)}
    >
      <p onClick={handleClickCate}>{categorie}</p>
      {sousMenuOpen === "Homme" && (
        <ul className={styles.dropDownMenu}>
          {types.map((type) => (
            <li key={type}>
              <Link className={styles.sousmenuLink} href={`/article?categorie=${categorie}&type=${type}`}>
                {type}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SousMenu;
