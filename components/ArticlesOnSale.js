import { useState, useEffect } from 'react';
import Image from 'next/image'; // Assure-toi d'importer Image depuis 'next/image'
import Articleliste from './Articleliste';

import styles from "../styles/ArticlesOnSale.module.css";
import Link from 'next/link';

function ArticlesOnSale() {
  const [articlesOnSale, setArticlesOnSale] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/articles/articlesOnSales")
      .then(response => response.json())
      .then(data => {
        if (data.result) {
          console.log("articlesOnSales: ", data)
          setArticlesOnSale(data.articlesOnSales); // Mettre à jour l'état avec les articles
        }
      })
      .catch(error => console.log("Erreur lors de la récupération des articles en promotion", error));
  }, []); // L'API est appelée une seule fois à l'initialisation




const mappedSales = articlesOnSale.map((data, i) => (
  // <div key={article._id} className={styles.articleLinkContainer}>
  <Articleliste  key={i} {...data} />


  // <div key={article._id} className={styles.card}>
  //   <Link href={`/detailarticle/${article._id}`}>
  //     <div className={styles.test2}>
  //       {/* <div className={styles.cardPhotoContainer}>
  //         <Image src={article.photos9[0]} alt={article.model} height="350px" width="290px" className={styles.photo}/>
  //       </div> */}
  //       <div className={styles.modelPriceContainer}>
  //         <h4 className={styles.modelContainer}>{article.model}</h4>
  //         <Image src={article.photos9[0]} alt={article.model} height="350px" width="290px" className={styles.photo}/>
  //         <h3 className={styles.priceContainer}>{article.price}€</h3>
  //       </div>
  //     </div>
    
  //   </Link>

  // </div>
))


  return (
    <div className={styles.containerDeTout}>
      <h2 className={styles.pageTitle}>Articles en Promotion</h2>
      <div className={styles.stuffStyle}>{mappedSales}</div>
    </div>
  );
}

export default ArticlesOnSale;
