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


  //AFFICHE UNE LISTE DES sizes DISPOS, A METTRE DANS UN MENU DEROULANT
  const jeSaisPas0 = data.sizes9.map((size, index) => (
    // <li key={index}>{size.size0}</li>
    <li key={index}>{size}</li>
  ))
  

  //AFFICHE UNE LISTE DES giSizes DISPOS, A METTRE DANS UN MENU DEROULANT
  const jeSaisPas1 = data.giSizes9.map((sizeGi, index) => (
    // <li key={index}>{sizeGi.giSize0}</li>
    <li key={index}>{sizeGi}</li>
  ));

  //AFFICHE UNE LISTE DES colors DISPO, A METTRE DANS UN MENU DEROULANT
  const jeSaisPas2 = data.colors9.map((color, index) => (
    // <li key={index}>{color.colorName0}</li>
    <li key={index}>{color}</li>
  ));
  

  //AFFICHE TOUTE LES photos DE L'ARTICLE
  const jeSaisPas3 = data.photos9.map((photo, index) => (
    // <Image key={index} src={photo.photoUrl0} width={100} height={200}></Image>
    <Image key={index} src={photo} width={100} height={200}></Image>
  ));

  
  const jeSaisPas5 = <Image src={data.photos9[0]} width={100} height={200} className={styles.cardPhoto}></Image>;
  
  // const auClick0 = () => {
  //   router.push(`/articles/${data._id}`);
  // }
  const auClick1 = () => {
    // fetch(`http://localhost:3000/articles/${data._id}`)
    // .then((response) => response.json())
    // .then((data1) => {
    //   if (data1.result) {
    //     console.log(data1)
    //   }
    // });
  }

  
  return (

    <div key={i} className={styles.articleLinkContainer}>
      <Link href={`/article/${data._id}`}>

      <div className={styles.articleComplet}>
          <div className={styles.cardPhotoContainer}>
            {jeSaisPas5}
          </div>
          <div className={styles.modelPriceContainer}>
            <p>{data.model}</p>
            <p>{data.price}</p>
          </div>
      </div>

      </Link>
    </div>

  )
});

//allArticlesContainer devient articleComplet
//article devient articleLinkContainer
//articlesContainer devient containerDeTout

    return (
      <div>
        {/* <button onClick={() => auClick0()}> je test </button> */}
        <div className={styles.containerDeTout}>{articles}</div>
      </div>
    );
   }
   
   export default ArticlePage;