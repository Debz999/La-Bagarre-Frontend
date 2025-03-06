import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Articleliste from './Articleliste'

import styles from "../styles/Article.module.css";

import Image from "next/image";

import { useRouter } from "next/router";
import ArticlesSimilaires from "./ArticlesSimilaires";





function Article() {
  const [allArticlesData, setAllArticlesData] = useState([]);
  const [sortOrder, setSortOrder] = useState('croissant'); // État pour choisir le type de tri

  const wishlist = useSelector((state) => state.wishlist.value);
  const router = useRouter();
  const { categorie, type } = router.query; //pour récuperer les parametres envoyer au click


  useEffect(() => {
    if (!categorie) return; //pas de categorie il ne se passe rien

    let url = `https://la-bagarre-backend.vercel.app/articles/articlesCS?categorie=${categorie}`; //on met l'url sous forme de variable pour pouvoir jouer avec et qu'il s'adapte si ya "type"
    // let url = `http://localhost:3000/articles/articlesCS?categorie=${categorie}`;
    if (type) {
      url +=`&type=${type}`;
    }
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        //console.log("setAllArticlesData: " , data)
        if (data.result) {
          // setAllArticlesData(data.articles);
          const sortedArticles = data.articles.sort((a, b) => {
            return sortOrder === 'croissant' ? a.price - b.price : b.price - a.price;
          });
          setAllArticlesData(sortedArticles);
        }
      });
  }, [categorie, type, sortOrder]); // pour que la page se mette à jour à chaque changement de caté et/ou type

  const stuff= allArticlesData.map((data, i) =>{
    return <Articleliste  key={i} {...data} />
  });

  const handleSortChange = (e) => {setSortOrder(e.target.value);};
  
  return (
    <div>
      <h2 className={styles.pageTitle}>
        {categorie} {type && `- ${type}`}
      </h2>
{categorie && (
  <select onChange={handleSortChange} value={sortOrder}>
  <option value="croissant">Prix croissant</option>
  <option value="décroissant">Prix décroissant</option>
</select>
)}
      

      <ul>
        <div className={styles.stuffStyle}>
          {stuff}
        </div>
      </ul>


    </div>
  );

}

export default Article;
