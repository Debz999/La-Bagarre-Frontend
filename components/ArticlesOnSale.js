import { useState, useEffect } from "react";
import Image from "next/image"; // Assure-toi d'importer Image depuis 'next/image'
import Articleliste from "./Articleliste";

import styles from "../styles/ArticlesOnSale.module.css";
import Link from "next/link";

function ArticlesOnSale({limit}) {
  const [articlesOnSale, setArticlesOnSale] = useState([]);

  useEffect(() => {
    fetch("https://la-bagarre-backend.vercel.app/articles/articlesOnSales")
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          //console.log("articlesOnSales: ", data)
          setArticlesOnSale(data.articlesOnSales); // Mettre à jour l'état avec les articles
        }
      })
      .catch((error) =>
        console.log(
          "Erreur lors de la récupération des articles en promotion",
          error
        )
      );
  }, []); // L'API est appelée une seule fois à l'initialisation

  const limitedArticle= articlesOnSale.slice(0, limit); //pour limiter l'affichage à un certains nbr d'articles

  const mappedSales = limitedArticle.map((data, i) => (
    <Articleliste key={i} {...data} />
  ));

  return (
    <div className={styles.pageTitle}>
      <h2 className={styles.containerDeTout}>Articles en Promotion</h2>
      <div className={styles.stuffStyle}>{mappedSales}</div>
    </div>
  );
}

export default ArticlesOnSale;
