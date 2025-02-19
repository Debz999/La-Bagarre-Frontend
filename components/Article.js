import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Articleliste from './Articleliste'

import styles from "../styles/Article.module.css";

import Image from "next/image";

import Link from "next/link";

import { useRouter } from "next/router";





function Article() {
  const [allArticlesData, setAllArticlesData] = useState([]);

  const router = useRouter();
  const { categorie, type } = router.query; //pour récuperer les parametres envoyer au click

  useEffect(() => {
    if (!categorie) return; //pas de categorie il ne se passe rien

    let url = `http://localhost:3000/articles/articlesCS?categorie=${categorie}`; //on met l'url sous forme de variable pour pouvoir jouer avec et qu'il s'adapte si ya "type"
    if (type) {
      url +=`&type=${type}`;
    }
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log("setAllArticlesData: " , data)
        if (data.result) {
          setAllArticlesData(data.articles);
        }
      });
  }, [categorie, type]); // pour que la page se mette à jour à chaque changement de caté et/ou type

  const stuff= allArticlesData.map((data, i) =>{
    return <Articleliste  key={i} {...data} />
    
  
  });
    

  return (
    <div>
      <h1>
        {categorie} {type && `- ${type}`}
      </h1>
      <ul>
        <div className={styles.stuffStyle}>
          {stuff}
        </div>
      </ul>
    </div>
  );

  // useEffect(() => {
  //   console.log("le useState =", allArticlesData)
  // }, [allArticlesData])

  // const articles = allArticlesData.map((data, i) => {

  //   const jeSaisPas5 = <Image src={data.photos9[0]} width={100} height={200} className={styles.cardPhoto}></Image>;

  //   return (

  //     <div key={i} className={styles.articleLinkContainer}>
  //       <Link href={`/article/${data._id}`}>

  //       <div className={styles.articleComplet}>
  //           <div className={styles.cardPhotoContainer}>
  //             {jeSaisPas5}
  //           </div>
  //           <div className={styles.modelPriceContainer}>
  //             <p>{data.model}</p>
  //             <p>{data.price}€</p>
  //           </div>
  //       </div>

  //       </Link>
  //     </div>

  //   )
  // });

  //     return (
  //       <div>
  //         <h3 className={styles.pageTitle}>Tous les articles</h3>
  //         <div className={styles.containerDeTout}>
  //           {articles}
  //         </div>
  //       </div>
  //     );
}

export default Article;
