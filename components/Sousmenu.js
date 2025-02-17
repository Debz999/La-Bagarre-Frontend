import styles from "../styles/SousMenu.module.css";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const SousMenu = ({ categorie, types }) => {
  const [sousMenuOpen, setSousMenuOpen] = useState(null); //état pour sous menu des categories
  const router = useRouter();

  //click sur la categorie seule
  const handleClickCate = () => {
    router.push(`/article?categorie=${categorie}`);
  };

  return (
    <div
      className={styles.containerCat}
      onMouseEnter={() => setSousMenuOpen("Homme")}
      onMouseLeave={() => setSousMenuOpen(null)}
    >
      <p className={styles.category} onClick={handleClickCate}>{categorie}</p>
      {sousMenuOpen === "Homme" && (
        <ul>
          {types.map((type) => (
            <li key={type}>
              <Link href={`/article?categorie=${categorie}&type=${type}`}>
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
