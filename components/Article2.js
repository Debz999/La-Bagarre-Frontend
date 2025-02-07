import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styles from "../styles/Article2.module.css";

import Image from "next/image";

import { useRouter } from 'next/router';


//Pour l'instant cette page m'affiche tout les articles detaillés, 
//Il me faut seulement l'article cliqué 
//Peut etre au click sur l'article, recuperer son id et afficher l'article par son id d'ici


// function ArticlePage({ id }) {
function Article2Page() {
  const [articleCliqueData, setArticleCliqueData] = useState(null);

  const router = useRouter();
  const { id } = router.query; // `id` correspond au paramètre dynamique de l'URL


  if(id) {
    useEffect(() => {

      fetch(`http://localhost:3000/articles/${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          console.log(data)
          setArticleCliqueData(data.articleRécupéré)
        }
      });
    
  }, [])
  }


useEffect(() => {
  console.log("le useState =", articleCliqueData)
}, [articleCliqueData])

// console.log(articleCliqueData.sizes9)

const articles = () => {

  //WHAH CA A REGLER LE SOUCIS CE TRUC
  if (!articleCliqueData) {
    return <p>Chargement...</p>; // Tu peux afficher un message de chargement si les données ne sont pas encore disponibles
  }

  //AFFICHE UNE LISTE DES sizes DISPOS, A METTRE DANS UN MENU DEROULANT
  const jeSaisPas0 = articleCliqueData.sizes9.map((size, index) => (
    <li key={index}>{size}</li>
    // <option key={index} value={size}>{size}</option>
  ))
  

  //AFFICHE UNE LISTE DES giSizes DISPOS, A METTRE DANS UN MENU DEROULANT
  const jeSaisPas1 = articleCliqueData.giSizes9.map((sizeGi, index) => (
    <li key={index}>{sizeGi}</li>
  ))

  //AFFICHE UNE LISTE DES colors DISPO, A METTRE DANS UN MENU DEROULANT
  const jeSaisPas2 = articleCliqueData.colors9.map((color, index) => (
    
    <li key={index}>{color}</li>
  ))
  

  //AFFICHE TOUTE LES photos DE L'ARTICLE
  const jeSaisPas3 = articleCliqueData.photos9.map((photo, index) => (
    <Image key={index} src={photo} width={100} height={200}></Image>
  ))


  //AFFICHE SEULEMENT LA PHOTO POUR LA CARD 
  //LE TRUC SUR QUOI IL FAUDRA CLIQUER POUR ACCEDER A L'ARTICLE
  const jeSaisPas4 = <Image src={articleCliqueData.cardPhoto} width={100} height={200} className={styles.cardPhoto}></Image>
  

  const auClick0 = () => {
    
  }

  return (

    <div className={styles.articleComplet} onClick={() => auClick0()}>
      <p>{jeSaisPas3}</p>
      <p>{articleCliqueData.categorie}</p>
      <p>{articleCliqueData.type}</p>
      <p>{articleCliqueData.model}</p>
      <p>{articleCliqueData.description}</p>
      <p>{jeSaisPas0}</p>
      <p>{jeSaisPas1}</p>
      <p>{jeSaisPas2}</p>
      <p>{articleCliqueData.price}</p>
    </div>

  )
};



    return (
      <div className={styles.article}>
        <div className={styles.containerDeTout}>{articles()}</div>
      </div>
    );
   }
   
   export default Article2Page;