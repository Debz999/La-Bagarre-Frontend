import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styles from "../styles/ArticlesOnSale.module.css";

import Image from "next/image";


import Link from 'next/link';

import { useRouter } from 'next/router';



function allArticles() {
  const [all, setAll] = useState([]);
  const [sortOrder, setSortOrder] = useState('croissant');

  const router = useRouter();

  // const categorie = props.categorie
  // const type = props.type


  useEffect(() => {
    
      fetch(`http://localhost:3000/articles/articles`)
        .then((response) => response.json())
        .then((articlesTrouves) => {
            if (articlesTrouves.result) {
                // Traiter les articles trouvés ici
                console.log("dans allArticles: ", articlesTrouves.allArticles);
                const sortedArticles = articlesTrouves.allArticles.sort((a, b) => {
                  return sortOrder === 'croissant' ? a.price - b.price : b.price - a.price;
                });
                setAll(sortedArticles);

                // setAll(articlesTrouves.allArticles)
              } else {
                // Gérer le cas où aucune donnée n'est trouvée
                console.log('Aucun article trouvé');

              }
            })
        
    
  }, [sortOrder]); 




const articles = all.map((data, i) => {

  
  const jeSaisPas5 = <Image src={data.photos9[0]} width={300} height={400} className={styles.cardPhoto}></Image>;
  
  
  return (

    <div key={i} className={styles.card}>
      <Link href={`/detailarticle/${data._id}`}>

      <div className={styles.test2}>
          <div className={styles.cardPhotoContainer}>
          </div>
          <div className={styles.modelPriceContainer}>
            <p>{data.model}</p>
            <Image src={data.photos9[0]} width={300} height={400} className={styles.cardPhoto}></Image>
            <p>{data.price}€</p>
          </div>
      </div>

      </Link>
    </div>

  )
});

const handleSortChange = (e) => {setSortOrder(e.target.value);};


    return (
      <div>
        <h3 className={styles.pageTitle}>Tous les articles</h3>

        <select onChange={handleSortChange} value={sortOrder}>
        <option value="croissant">Prix croissant</option>
        <option value="décroissant">Prix décroissant</option>
        </select>

        
        <div className={styles.cadre}>    
          {articles}
        </div>
      </div>
    );
   }
   
   export default allArticles;