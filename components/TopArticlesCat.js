import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styles from "../styles/ArticlesOnSale.module.css";

import Image from "next/image";


import Link from 'next/link';

import { useRouter } from 'next/router';



function TopArticlesCat({categorie}) {
  const [topArticles, setTopArticles] = useState([]);

  const router = useRouter();

  // const categorie = props.categorie
  // const type = props.type


  useEffect(() => {
    
      // fetch(`http://localhost:3000/articles/topArticles`)
      fetch(`http://localhost:3000/articles/topArticles1?categorie=${categorie}`)
        .then((response) => response.json())
        .then((articlesTrouves) => {
            if (articlesTrouves.result) {
                // Traiter les articles trouvés ici
                console.log("dans top articles: ", articlesTrouves.articleRécupéré);
                setTopArticles(articlesTrouves.articleRécupéré)
              } else {
                // Gérer le cas où aucune donnée n'est trouvée
                console.log('Aucun article trouvé');

              }
            })
        
    
  }, [categorie]); 




const articles = topArticles.map((data, i) => {

  
  const jeSaisPas5 = <Image src={data.photos9[0]} width={290} height={350} className={styles.cardPhoto}></Image>;
  
  
  return (

    // <div key={i} className={styles.articleLinkContainer}>
    //   <Link href={`/detailarticle/${data._id}`}>

    //   <div className={styles.articleComplet}>
    //       <div className={styles.cardPhotoContainer}>
    //         {jeSaisPas5}
    //       </div>
    //       <div className={styles.modelPriceContainer}>
    //         <p>{data.model}</p>
    //         <p>{data.price}€</p>
    //       </div>
    //   </div>

    //   </Link>
    // </div>
    <div key={i} className={styles.card}>
    <Link href={`/detailarticle/${data._id}`}>

    <div className={styles.test2}>

        <div className={styles.modelPriceContainer}>
          <h4 className={styles.modelContainer}>{data.model}</h4>
          <Image src={data.photos9[0]} width="290px" height="350px" className={styles.photo}></Image>
          <h3 className={styles.priceContainer}>{data.price}€</h3>
        </div>
    </div>

    </Link>
  </div>

  )
});



    return (
      <div>
        <h3 className={styles.pageTitle}>Articles pour {categorie ?? "null"} les plus vendus</h3>
        {/* <h3>type: {type ?? "null"}</h3> */}


        <div className={styles.cadre}>    
          {articles}
        </div>
      </div>
    );
   }
   
   export default TopArticlesCat;