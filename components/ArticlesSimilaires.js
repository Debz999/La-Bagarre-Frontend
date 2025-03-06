import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "../styles/ArticlesOnSale.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Articleliste from "./Articleliste";

function ArticlesSimilaires(props) {
  const [allArticlesData, setAllArticlesData] = useState([]);
  const [sortOrder, setSortOrder] = useState("croissant");

  const router = useRouter();

  const categorie = props.categorie;
  const type = props.type;

  useEffect(() => {
    if (!categorie && !type) return;

    fetch(
      `https://la-bagarre-backend.vercel.app/articles/articlesSimililaires?categorie=${categorie}&type=${type}`
    )
      .then((response) => response.json())
      .then((articlesTrouves) => {
        if (articlesTrouves.result) {
          //console.log("Données d'articles récupérées :", articlesTrouves);
          // setAllArticlesData(articlesTrouves.filteredArticles)
          const sortedArticles = articlesTrouves.filteredArticles.sort(
            (a, b) => {
              return sortOrder === "croissant"
                ? a.price - b.price
                : b.price - a.price;
            }
          );
          setAllArticlesData(sortedArticles);
        }
      });
  }, [categorie, type, sortOrder]);

  const articles = allArticlesData.map((data, i) => {
    return <Articleliste key={i} {...data} />;
  });

  return (
    <div className={styles.containerDeTout}>
      <h2 className={styles.pageTitle}>{props.title}ARTICLES SIMILAIRES</h2>

      <div className={styles.stuffStyle}>{articles}</div>
    </div>
  );
}

export default ArticlesSimilaires;
