import styles from "../styles/SousMenu.module.css";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

const SousMenu = ({ categorie, types }) => {
useEffect(()=>{
  console.log(categorie)
},[]);

  return (
    <div>
      <ul className={styles.subMenu}>
        {types.map((type) => (
          <li key={type}>
            <Link
              href={`articles/articleC?categorie=${categorie}&type=${type}`}
            >
              {type+"test"} 
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SousMenu;
