import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styles from "../styles/Article.module.css";

import Image from "next/image";




//Il y'aura une page article mais cett page article vient d'une autre page qui contient les articles
//C'est quelle page qui contient les articles
//On navigue depuis le Home
//On peut soit cliquer direct sur la card d'un produit, soit naviguer vers une catégorie avant de cliquer sur le produit
//Pour l'instant ca affiche tout les articles sur la page article

//Il faudrait plutot afficher seulement photoUrl et le nom du produit pour en faire une card

//Je crois qu'il faut aussi une clé étrangere ou qqchose comme ca pour acceder aux avis du produit

function ArticlePage() {
  const [allArticlesData, setAllArticlesData] = useState([]);

// const auClick0 = () => {
//   fetch(`http://localhost:3000/articles/articles`)
//   .then((response) => response.json())
//   .then((data) => {
//     if (data.result) {
//       console.log(data)
//       setAllArticlesData(data)
//     }
//   });
// };


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

console.log("le useState =", allArticlesData)



const articles = allArticlesData.map((data, i) => {


  //AFFICHE UNE LISTE DES sizes DISPOS, A METTRE DANS UN MENU DEROULANT
  const jeSaisPas0 = data.sizes.map((size, index) => (
    <li key={index}>{size.size0}</li>
  ))

  //AFFICHE UNE LISTE DES giSizes DISPOS, A METTRE DANS UN MENU DEROULANT
  const jeSaisPas1 = data.giSizes.map((sizeGi, index) => (
    <li key={index}>{sizeGi.giSize0}</li>
  ))

  //AFFICHE UNE LISTE DES colors DISPO, A METTRE DANS UN MENU DEROULANT
  const jeSaisPas2 = data.colors.map((color, index) => (
    <li key={index}>{color.colorName0}</li>
  ))
  

  //AFFICHE TOUTE LES photos DE L'ARTICLE
  const jeSaisPas3 = data.photos.map((photo, index) => (
    <Image key={index} src={photo.photoUrl0} width={100} height={200}></Image>
  ))


  //AFFICHE SEULEMENT LA PHOTO POUR LA CARD 
  //LE TRUC SUR QUOI IL FAUDRA CLIQUER POUR ACCEDER A L'ARTICLE
  const jeSaisPas4 = <Image src={data.cardPhoto} width={100} height={200} className={styles.cardPhoto}></Image>
  

  const auClick0 = () => {
    
  }

  return (

    <div key={i} className={styles.article} onClick={() => auClick0()}>
      <p>{data.categorie}</p>
      <p>{data.type}</p>
      <p>{data.model}</p>
      <p>{data.description}</p>
      <p>{jeSaisPas0}</p>
      <p>{jeSaisPas1}</p>
      <p>{jeSaisPas2}</p>
      <p>{jeSaisPas3}</p>
      <p>{data.price}</p>
    </div>

  )
});



    return (
      <div>
        {/* <button onClick={() => auClick0()}> je test </button> */}
        <div className={styles.articlesContainer}>{articles}</div>
      </div>
    );
   }
   
   export default ArticlePage;