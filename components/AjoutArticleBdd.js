// import React from 'react';
import { useState } from 'react';

import styles from "../styles/Article2.module.css";


function AjoutArticleBdd() {
 const [categorie, setCategorie] = useState('');
 const [type, setType] = useState('');
 const [model, setModel] = useState('');
 const [description, setDescription] = useState('');
 const [price, setPrice] = useState('');
 const [onSale, setOnSale] = useState(false);
 const [soldCount, setSoldCount] = useState('');
 const [colors9, setColors9] = useState([]);
 const [photos9, setPhotos9] = useState([]);
 const [sizes9, setSizes9] = useState([]);
 const [giSizes9, setGiSizes9] = useState([]);

  const ajoutArticle = () => {
    fetch("http://localhost:3000/articles/postArticle1", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        categorie: categorie,
        type: type,
        model: model,
        description: description,
        price: price,
        onSale: onSale,
        soldCount: soldCount,
        colors9: colors9,
        photos9: photos9,
        sizes9: sizes9,
        giSizes9: giSizes9,

      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
      });
  };


 return (
   <div>
    <form>
    <input onChange={(e) => setCategorie(e.target.value)} value={categorie} placeholder="Catégorie"/>
     <input onChange={(e) => setType(e.target.value)} value={type} placeholder="Type"/>
     <input onChange={(e) => setModel(e.target.value)} value={model} placeholder="Model"/>
     <input onChange={(e) => setDescription(e.target.value)} value={description} placeholder="Description"/>
     <input onChange={(e) => setPrice(e.target.value)} value={price} placeholder="Prix"/>
     <input onChange={(e) => setColors9(e.target.value)} value={colors9} placeholder="Couleurs"/>
     <input onChange={(e) => setPhotos9(e.target.value)} value={photos9} placeholder="Photos"/>
     <input onChange={(e) => setSizes9(e.target.value)} value={sizes9} placeholder="Tailles"/>
     <input onChange={(e) => setGiSizes9(e.target.value)} value={giSizes9} placeholder="Tailles Gi"/>

     <div className={styles.divPromotion}>
      <p>Promotion: </p>
      <select onChange={(e) => setOnSale(e.target.value)} value={onSale} className={styles.selectPromotion}>
        <option value="true">Oui</option>
        <option value="false">Non</option>
      </select>
      <input onChange={(e) => setSoldCount(e.target.value)} value={soldCount} placeholder="soldCount"/>
     </div>
     
     <button onClick={() => ajoutArticle()}>AJOUTER EN BDD</button>
    </form>

   </div>
 );
}

export default AjoutArticleBdd;