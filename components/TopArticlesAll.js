import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styles from "../styles/Article.module.css";

import Image from "next/image";


import Link from 'next/link';

import { useRouter } from 'next/router';



function TopArticlesAll() {
  const [topArticles, setTopArticles] = useState([]);

  const router = useRouter();

  // const categorie = props.categorie
  // const type = props.type


  useEffect(() => {
    
      fetch(`http://localhost:3000/articles/topArticles`)
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

  
  const jeSaisPas5 = <Image src={data.photos9[0]} width={300} height={400} className={styles.cardPhoto}></Image>;
  
  
  return (

    <div key={i} className={styles.articleLinkContainer}>
      <Link href={`/detailarticle/${data._id}`}>

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
        <h3 className={styles.pageTitle}>Articles les plus vendus</h3>
        <div className={styles.containerDeTout}>    
          {articles}
        </div>
      </div>
    );
   }
   
   export default TopArticlesAll;