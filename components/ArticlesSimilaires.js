import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styles from "../styles/Article.module.css";

import Image from "next/image";


import Link from 'next/link';

import { useRouter } from 'next/router';



function ArticlesSimilaires(props) {
  const [allArticlesData, setAllArticlesData] = useState([]);
  const [sortOrder, setSortOrder] = useState('croissant');

  const router = useRouter();

  const categorie = props.categorie
  const type = props.type

  useEffect(() => {
    if (!categorie && !type) return;
    
      
      fetch(`http://localhost:3000/articles/articlesSimililaires?categorie=${categorie}&type=${type}`)
        .then((response) => response.json())
        .then((articlesTrouves) => {
          if (articlesTrouves.result) {
            console.log("Données d'articles récupérées :", articlesTrouves);
            // setAllArticlesData(articlesTrouves.filteredArticles)
            const sortedArticles = articlesTrouves.filteredArticles.sort((a, b) => {
              return sortOrder === 'croissant' ? a.price - b.price : b.price - a.price;
            });
            setAllArticlesData(sortedArticles);
          }
        })
    
  }, [categorie, type, sortOrder]); 




const articles = allArticlesData.map((data, i) => {

  
  const jeSaisPas5 = <Image src={data.photos9[0]} width={200} height={200} className={styles.cardPhoto}></Image>;
  
  
  return (

    <div key={i} className={styles.articleLinkContainer}>
      <Link href={`/detailarticle/${data._id}`}>

      <div className={styles.articleComplet}>
          <div className={styles.cardPhotoContainer}>
            {jeSaisPas5}
          </div>
          <div className={styles.modelPriceContainer}>
            <h4 className={styles.modelPlacement}>{data.model}</h4>
            <h3 className={styles.pricePlacement}>{data.price}€</h3>
          </div>
      </div>

      </Link>
    </div>

  )
});

const handleSortChange = (e) => {setSortOrder(e.target.value);};


    return (
      <div>
        <h3 className={styles.pageTitle}></h3>
        
        <h3>{props.title}</h3>

        <select onChange={handleSortChange} value={sortOrder}>
        <option value="croissant">Prix croissant</option>
        <option value="décroissant">Prix décroissant</option>
        </select>


        <div className={styles.containerDeTout}>    

          {articles}
        </div>
      </div>
    );
   }
   
   export default ArticlesSimilaires;