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
        categorie,
        type,
        model,
        description,
        price,
        onSale,
        soldCount,
        colors9,
        photos9,
        sizes9,
        giSizes9,

      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Article ajouté :", data);
      });
  };


 return (
   <div className={styles.divTout}>

    <input onChange={(e) => setCategorie(e.target.value)} value={categorie} placeholder="Catégorie" className={styles.inputStyle}/>
     <input onChange={(e) => setType(e.target.value)} value={type} placeholder="Type" className={styles.inputStyle}/>
     <input onChange={(e) => setModel(e.target.value)} value={model} placeholder="Model" className={styles.inputStyle}/>
     <textarea onChange={(e) => setDescription(e.target.value)} value={description} placeholder="Description" className={styles.descriptionInputStyle}/>
     {/* <input onChange={(e) => setDescription(e.target.value)} value={description} placeholder="Description" className={styles.descriptionInputStyle}/> */}
     <input onChange={(e) => setPrice(e.target.value)} value={price} placeholder="Prix" className={styles.inputStyle}/>
     <input onChange={(e) => setColors9(e.target.value)} value={colors9} placeholder="Couleurs" className={styles.inputStyle}/>
     
     <input onChange={(e) => setPhotos9(e.target.value)} value={photos9} placeholder="Photos" className={styles.inputStyle}/>
     <input onChange={(e) => setSizes9(e.target.value)} value={sizes9} placeholder="Tailles" className={styles.inputStyle}/>
     <input onChange={(e) => setGiSizes9(e.target.value)} value={giSizes9} placeholder="Tailles Gi" className={styles.inputStyle}/>

     <div className={styles.divPromotion}>
      <p>Promotion: </p>
      <select onChange={(e) => setOnSale(e.target.value)} value={onSale} className={styles.selectPromotion}>
        <option value="true">Oui</option>
        <option value="false">Non</option>
      </select>
      <input onChange={(e) => setSoldCount(e.target.value)} value={soldCount} placeholder="soldCount"/>
     </div>
     
     <button onClick={() => ajoutArticle()}>AJOUTER EN BDD</button>


   </div>
 );
}

export default AjoutArticleBdd;