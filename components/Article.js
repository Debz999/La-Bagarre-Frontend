import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styles from "../styles/Article.module.css";

// import Card from 'react-bootstrap/Card';



//Il y'aura une page article mais cett page article vient d'une autre page qui contient les articles
//C'est quelle page qui contient les articles
//On navigue depuis le Home
//On peut soit cliquer direct sur la card d'un produit, soit naviguer vers une catégorie avant de cliquer sur le produit
//Pour l'instant ca affiche tout les articles sur la page article

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

  const jeSaisPas0 = data.sizes.map((size, index) => (
    <li key={index}>{size.size0}</li>
  ))

  const jeSaisPas1 = data.giSizes.map((sizeGi, index) => (
    <li key={index}>{sizeGi.giSize0}</li>
  ))

  const jeSaisPas2 = data.colors.map((color, index) => (
    <li key={index}>{color.colorName0}</li>
  ))
  
  const jeSaisPas3 = data.photos.map((photo, index) => (
    <li key={index}>{photo.photoUrl0}</li>
  ))

  
  return (

    <div key={i} className={styles.article}>

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