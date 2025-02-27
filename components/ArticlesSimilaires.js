import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from "../styles/ArticlesOnSale.module.css";
import Image from "next/image";
import Link from 'next/link';
import { useRouter } from 'next/router';
import Articleliste from './Articleliste';



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

  // const jeSaisPas5 = <Image src={data.photos9[0]} width={200} height={200} className={styles.cardPhoto}></Image>;
    
  return ( 
  <Articleliste  key={i} {...data} />
  
    // <div key={i} className={styles.card}>
    //   <Link href={`/detailarticle/${data._id}`}>
    //     <div className={styles.test2}>
    //       <div className={styles.modelPriceContainer}>
    //         <h4 className={styles.modelContainer}>{data.model}</h4>
    //         <Image
    //           src={data.photos9[0]}
    //           width="290px"
    //           height="350px"
    //           className={styles.photo}
    //         ></Image>
    //         <h3 className={styles.priceContainer}>{data.price}€</h3>
    //       </div>
    //     </div>
    //   </Link>
    // </div>
  );
});

//const handleSortChange = (e) => {setSortOrder(e.target.value);};


    return (
      <div className={styles.containerDeTout}>
       
        <h2 className={styles.pageTitle}>{props.title}ARTICLES SIMILAIRES</h2>

        {/* <select onChange={handleSortChange} value={sortOrder} className={styles.select}>
        <option value="croissant">Prix croissant</option>
        <option value="décroissant">Prix décroissant</option>
        </select> */}


        <div className={styles.stuffStyle}>    
          {articles}

        </div>
      </div>
    );
   }
   
   export default ArticlesSimilaires;