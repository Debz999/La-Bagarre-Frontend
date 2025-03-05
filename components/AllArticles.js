import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Articleliste from './Articleliste';


import styles from "../styles/AllArticles.module.css";

import Image from "next/image";


import Link from 'next/link';

import { useRouter } from 'next/router';



function allArticles() {
  const [all, setAll] = useState([]);
  const [sortOrder, setSortOrder] = useState('croissant');

  const router = useRouter();



  useEffect(() => {
    
      fetch(`https://la-bagarre-backend.vercel.app/articles/articles`)
        .then((response) => response.json())
        .then((articlesTrouves) => {
            if (articlesTrouves.result) {
                // Traiter les articles trouvés ici
                //console.log("dans allArticles: ", articlesTrouves.allArticles);
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

  
  // const jeSaisPas5 = <Image src={data.photos9[0]} width={300} height={400} className={styles.cardPhoto}></Image>;
  
  
  return (
    <Articleliste  key={i} {...data} />
    // <div key={i} className={styles.card}>
    //   <Link href={`/detailarticle/${data._id}`}>

    //   <div className={styles.test2}>
    //   <div className={styles.test2}>

    //       <div className={styles.modelPriceContainer}>
    //         <h4 className={styles.modelContainer}>{data.model}</h4>
    //         <Image src={data.photos9[0]} width="290px" height="350px" className={styles.photo}></Image>
    //         <h3 className={styles.priceContainer}>{data.price}€</h3>
    //       </div>
    //   </div>
    //       <div className={styles.modelPriceContainer}>
    //         <h4 className={styles.modelContainer}>{data.model}</h4>
    //         <Image src={data.photos9[0]} width="290px" height="350px" className={styles.photo}></Image>
    //         <h3 className={styles.priceContainer}>{data.price}€</h3>
    //       </div>
    //   </div>

    //   </Link>
    // </div>
    //   </Link>
    // </div>

  )
});

const handleSortChange = (e) => {setSortOrder(e.target.value);};


    return (
      <div className={styles.titleAndSelect}>
        <h3 className={styles.pageTitle}>Tous les articles</h3>

        <select onChange={handleSortChange} value={sortOrder} className={styles.select}>
        <option value="croissant">Prix croissant</option>
        <option value="décroissant">Prix décroissant</option>
        </select>

        
        <div className={styles.stuffStyle}>    
          {articles}
        </div>

      </div>
    );
   }
   
   export default allArticles;