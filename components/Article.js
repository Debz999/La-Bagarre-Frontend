import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styles from "../styles/Article.module.css";

import Image from "next/image";


import Link from 'next/link';

import { useRouter } from 'next/router';


//Il y'aura une page article mais cett page article vient d'une autre page qui contient les articles
//C'est quelle page qui contient les articles
//On navigue depuis le Home
//On peut soit cliquer direct sur la card d'un produit, soit naviguer vers une catégorie avant de cliquer sur le produit
//Pour l'instant ca affiche tout les articles sur la page article

//Il faudrait plutot afficher seulement photoUrl et le nom du produit pour en faire une card

//Je crois qu'il faut aussi une clé étrangere ou qqchose comme ca pour acceder aux avis du produit

//Au click sur la card, afficher la page associée (ptete utiliser this jme souvient plus cmt ca marche)


function ArticlePage() {
  const [allArticlesData, setAllArticlesData] = useState([]);

  const router = useRouter();


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

      <div className={styles.articleComplet}>
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



    return (
      <div>
        <h3 className={styles.pageTitle}>Tous les articles</h3>
        <div className={styles.containerDeTout}>    
          {articles}
        </div>
      </div>
    );
   }
   
   export default ArticlePage;