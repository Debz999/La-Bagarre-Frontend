import styles from "../styles/SousMenu.module.css";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

const SousMenu = ({ categorie, types }) => {

  const [sousMenuOpen, setSousMenuOpen] = useState(null); //état pour sous menu des categories
  return (
    <div
      className={styles.containerCat}
      onMouseEnter={() => setSousMenuOpen("Homme")}
      onMouseLeave={() => setSousMenuOpen(null)}
    >
      <p>{categorie}</p>
      {sousMenuOpen === "Homme" && (
        <ul>
          {types.map((type) => (
            <li key={type}>
              <Link
                href={`/article?categorie=${categorie}&type=${type}`}
              >
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
