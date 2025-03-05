import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Articleliste from './Articleliste';

import styles from "../styles/ArticlesOnSale.module.css";

import Image from "next/image";


import Link from 'next/link';

import { useRouter } from 'next/router';



function TopArticlesAll() {
  const [topArticles, setTopArticles] = useState([]);

  const router = useRouter();

  // const categorie = props.categorie
  // const type = props.type


  useEffect(() => {
    
      fetch(`https://la-bagarre-backend.vercel.app/articles/topArticles`)
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
        
    
  }, []); 




const articles = topArticles.map((data, i) => {

  
  
  return (
    <Articleliste  key={i} {...data} />

  //   <div key={i} className={styles.card}>
  //   <Link href={`/detailarticle/${data._id}`}>

  //   <div className={styles.test2}>

  //       <div className={styles.modelPriceContainer}>
  //         <h4 className={styles.modelContainer}>{data.model}</h4>
  //         <Image src={data.photos9[0]} width="290px" height="350px" className={styles.photo}></Image>
  //         <h3 className={styles.priceContainer}>{data.price}€</h3>
  //       </div>
  //   </div>

  //   </Link>
  // </div>

  )
});



    return (
      <div className={styles.containerDeTout}>
      <h2 className={styles.pageTitle}>Articles les plus vendus</h2>
      <div className={styles.stuffStyle}>{articles}</div>
    </div>

    );
   }
   
   export default TopArticlesAll;