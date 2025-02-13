import React from 'react';
import { useEffect, useState } from 'react';

import styles from "../styles/Article.module.css";

import Image from "next/image";

import Link from 'next/link';

import { useRouter } from 'next/router';

import ArticleFlexible from "./ArticleFlexible"


//J'AI PLUS BESOIN DE CETTE PAGE JE CROIS



function ArticlePage(props) {

  const [allArticlesData, setAllArticlesData] = useState([]);


useEffect(() => {
  fetch(`http://localhost:3000/articles/articles`)
  .then((response) => response.json())
  .then((data) => {
    if (data.result) {
      console.log(data)
      setAllArticlesData(data.allArticles)
    }
  });
}, [])

useEffect(() => {
  console.log("le useState =", allArticlesData)
}, [allArticlesData])

 



const articles = allArticlesData.map((data, i) => {

  
  const jeSaisPas5 = <Image src={data.photos9[0]} width={100} height={200} className={styles.cardPhoto}></Image>;
  
  
  return (

    <div key={i} className={styles.articleLinkContainer}>
      <Link href={`/article/${data._id}`}>

      <div className={styles.photoModelPriceContainer}>
          <div className={styles.cardPhotoContainer}>
            {jeSaisPas5}
          </div>
          <div className={styles.modelPriceContainer}>
            <p>{data.model}</p>
            <p>{data.price}€</p>
          </div>
      </div>

      </Link>
    </div>

  )
});

const categorie1 = "Homme"
const type1 = "Gi"

const categorie2 = "Femme"
const type2 = "Gi"

const categorie3 = ""
const type3 = "Gi"

    return (
      <div>
        <h3 className={styles.pageTitle}>Tous les articles</h3>
        <div className={styles.containerDeTout}>    
          {articles}
        </div>

        <div>
          <ArticleFlexible categorie={categorie1} type={type1}/>
        </div>

        <div>
          <ArticleFlexible categorie={categorie2} type={type2}/>
        </div>

        <div>
          <ArticleFlexible categorie={categorie3} type={type3}/>
        </div>
      </div>
    );
   }
   
   export default ArticlePage;