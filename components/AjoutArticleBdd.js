import { useState, useEffect } from 'react';

import styles from "../styles/ArticleDetail.module.css";
import Article2Page from './ArticleDetail';


function AjoutArticleBdd() {


const [categorie, setCategorie] = useState('');
const [type, setType] = useState('');
const [model, setModel] = useState('');
const [description, setDescription] = useState('');
const [price, setPrice] = useState('');
const [onSale, setOnSale] = useState("false");
const [soldCount, setSoldCount] = useState('');
const [colors9, setColors9] = useState('');  
const [photos9, setPhotos9] = useState('');
const [sizes9, setSizes9] = useState('');
const [giSizes9, setGiSizes9] = useState('');

const [inputId, setInputId] = useState('');





  //BOUTON AJOUT ARTICLE
  const ajoutArticle = () => {

    const formData = new FormData(); //formData pour l'envoie de fichier

    for(let i=0; i < photos9.length; i++) {
      formData.append(photos9[i].name, photos9[i])
    } 

    console.log([...formData.entries()])

    //Vu que le post ne peut pas etre en json ET en formData, on passe tout en formData
    formData.append("categorie", categorie)
    formData.append("type", type)
    formData.append("model", model)
    formData.append("description", description)
    formData.append("price", price)
    formData.append("onSale", onSale)
    formData.append("soldCount", soldCount)
    formData.append("colors9", colors9)
    formData.append("photos9", photos9)
    formData.append("sizes9", sizes9)
    formData.append("giSizes9", giSizes9)

    fetch("http://localhost:3000/articles/postArticle1", {
      method: "POST",
      // headers: { "Content-Type": "application/json" }, //Pas de headers pour les formData
      body: formData
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Article ajouté :", data);
      });
  };


 
  //TOUT LE RESTE EST GERE COMME DHABITUDE
  //BOUTON UPDATE
  const auClickSurUpdate = () => {

    if(!inputId) {
      return res.status(404).json({ message: "Article non trouvé" });
    } 

      const formData = new FormData(); //formData pour l'envoie de fichiers

      for(let i=0; i < photos9.length; i++) {
        // console.log(photos9[i])
        formData.append(photos9[i].name, photos9[i])
      } 

      console.log([...formData.entries()])

      //Vu que le post ne peut pas etre en json ET en formData, on passe tout en formData
      formData.append("categorie", categorie)
      formData.append("type", type)
      formData.append("model", model)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("onSale", onSale)
      formData.append("soldCount", soldCount)
      formData.append("colors9", colors9)
      formData.append("photos9", photos9)
      formData.append("sizes9", sizes9)
      formData.append("giSizes9", giSizes9)

        fetch(`http://localhost:3000/articles/articleUpdate1/${inputId}`, {
          method: 'PUT',
          body: formData
          // headers: {
          //   'Content-Type': 'application/json'
          // },
          // body: JSON.stringify({
          //   categorie,
          //   type,
          //   model,
          //   description,
          //   price,
          //   onSale,
          //   soldCount,
          //   colors9,  
          //   photos9,
          //   sizes9,
          //   giSizes9,
          // })
        })
        .then(response => response.json())
        .then(data => {
          console.log(data) // Affiche l'article mis à jour
        })

  }



 return (
   <div className={styles.divEnsemble}>
    <div className={styles.p1}>
      <input onChange={(e) => setCategorie(e.target.value)} value={categorie} placeholder="Catégorie" className={styles.inputStyle}/>
      <input onChange={(e) => setType(e.target.value)} value={type} placeholder="Type" className={styles.inputStyle}/>
      <input onChange={(e) => setModel(e.target.value)} value={model} placeholder="Model" className={styles.inputStyle}/>
      <textarea onChange={(e) => setDescription(e.target.value)} value={description} placeholder="Description" className={styles.descriptionInputStyle}/>
      <input onChange={(e) => setPrice(e.target.value)} value={price} placeholder="Prix" className={styles.inputStyle}/>
      <input onChange={(e) => setColors9(e.target.value)} value={colors9} placeholder="Couleurs" className={styles.inputStyle}/>
      <input onChange={(e) => setPhotos9(e.target.files)} type="file" multiple={true} ></input>
      <input onChange={(e) => setSizes9(e.target.value)} value={sizes9} placeholder="Tailles" className={styles.inputStyle}/>
      <input onChange={(e) => setGiSizes9(e.target.value)} value={giSizes9} placeholder="Tailles Gi" className={styles.inputStyle}/>

      <div className={styles.divPromotion}>
        <p>Promotion: </p>
        <select onChange={(e) => setOnSale(e.target.value === "true")} value={(onSale ? "true" : "false")} className={styles.selectPromotion}>
          <option value="true">Oui</option>
          <option value="false">Non</option>
        </select>
        <input onChange={(e) => setSoldCount(e.target.value)} value={soldCount} placeholder="soldCount"/>
      </div>
      <input onChange={(e) => setInputId(e.target.value)} value={inputId} placeholder="Id article" className={styles.inputStyle}/>
      <button onClick={auClickSurUpdate}>UPDATE</button>
      
      <button onClick={() => ajoutArticle()}>AJOUTER EN BDD</button>
    </div>
    <div className={styles.p2}>
      {/* <Article2Page articleId={inputId}/> */}
      {inputId && <Article2Page inputId={inputId} />}
    </div>


   </div>
   
 );
}

export default AjoutArticleBdd;








// // import React from 'react';
// import { useState, useEffect } from 'react';

// import styles from "../styles/Article2.module.css";
// import Article2Page from './Article2';


// function AjoutArticleBdd() {


//  const [categorie, setCategorie] = useState('');
//  const [type, setType] = useState('');
//  const [model, setModel] = useState('');
//  const [description, setDescription] = useState('');
//  const [price, setPrice] = useState('');
//  const [onSale, setOnSale] = useState(false);
//  const [soldCount, setSoldCount] = useState('');
// const [colors9, setColors9] = useState('');
// const [photos9, setPhotos9] = useState('');
// const [sizes9, setSizes9] = useState('');
// const [giSizes9, setGiSizes9] = useState('');

//  const [inputId, setInputId] = useState('');

//  const [oldCategorie, setOldCategorie] = useState('');
//  const [oldType, setOldType] = useState('');
//  const [oldModel, setOldModel] = useState('');
//  const [oldDescription, setOldDescription] = useState('');
//  const [oldPrice, setOldPrice] = useState('');
//  const [oldOnSale, setOldOnSale] = useState(false);
//  const [oldSoldCount, setOldSoldCount] = useState('');
// const [oldColors9, setOldColors9] = useState('');
// const [oldPhotos9, setOldPhotos9] = useState('');
// const [oldSizes9, setOldSizes9] = useState('');
// const [oldGiSizes9, setOldGiSizes9] = useState('');


//  useEffect(() => {
//   if (inputId) {
//     fetch(`http://localhost:3000/articles/${inputId}`)
//       .then((response) => response.json())
//       .then((data) => {
//         // Remplir les champs avec les anciennes valeurs
//         setCategorie(data.categorie || '');
//         setType(data.type || '');
//         setModel(data.model || '');
//         setDescription(data.description || '');
//         setPrice(data.price || '');
//         setOnSale(data.onSale || false);
//         setSoldCount(data.soldCount || '');
//         setColors9(data.colors9 || '');
//         setPhotos9(data.photos9 || '');
//         setSizes9(data.sizes9 || '');
//         setGiSizes9(data.giSizes9 || '');

//         // Stocker les anciennes valeurs dans les états
//         setOldCategorie(data.categorie || '');
//         setOldType(data.type || '');
//         setOldModel(data.model || '');
//         setOldDescription(data.description || '');
//         setOldPrice(data.price || '');
//         setOldOnSale(data.onSale || false);
//         setOldSoldCount(data.soldCount || '');
//         setOldColors9(data.colors9 || '');
//         setOldPhotos9(data.photos9 || '');
//         setOldSizes9(data.sizes9 || '');
//         setOldGiSizes9(data.giSizes9 || '');
//       });
//   }
// }, [inputId]);

  

//   const ajoutArticle = () => {
//     fetch("http://localhost:3000/articles/postArticle1", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         categorie,
//         type,
//         model,
//         description,
//         price,
//         onSale,
//         soldCount,
//         colors9,
//         photos9,
//         sizes9,
//         giSizes9,

//       }),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("Article ajouté :", data);
//       });
//   };


 

//   const auClickSurUpdate = () => {

//     if(!inputId) {
//       console.log("Article non trouvé");
//       return; // Ne rien faire si l'ID n'est pas fourni
//     } 
//         fetch(`http://localhost:3000/articles/articleUpdate1/${inputId}`, {
//           method: 'PUT',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({
//             // Conserver les anciennes valeurs si les nouveaux champs sont vides
//             categorie: categorie || oldCategorie,
//             type: type || oldType,
//             model: model || oldModel,
//             description: description || oldDescription,
//             price: price || oldPrice,  // Seulement mettre à jour le prix si c'est changé
//             onSale: onSale !== undefined ? onSale : oldOnSale,  // S'assurer que la valeur de `onSale` est bien envoyée
//             soldCount: soldCount || oldSoldCount,
//             colors9: colors9.length ? colors9 : oldColors9,  // Si colors9 est vide, garder la valeur précédente
//             photos9: photos9.length ? photos9 : oldPhotos9,
//             sizes9: sizes9.length ? sizes9 : oldSizes9,
//             giSizes9: giSizes9.length ? giSizes9 : oldGiSizes9,
//             // categorie,
//             // type,
//             // model,
//             // description,
//             // price,
//             // onSale,
//             // soldCount,
//             // colors9,  
//             // photos9,
//             // sizes9,
//             // giSizes9,
//           })
//         })
//         .then(response => response.json())
//         .then(data => {
//           console.log("Article modifié: ", data) // Affiche l'article mis à jour
//         })

//   }



//  return (
//    <div className={styles.divEnsemble}>
//     <div className={styles.p1}>
//       <input onChange={(e) => setCategorie(e.target.value)} value={categorie || oldCategorie} placeholder="Catégorie" className={styles.inputStyle}/>
//       <input onChange={(e) => setType(e.target.value)} value={type || oldType } placeholder="Type" className={styles.inputStyle}/>
//       <input onChange={(e) => setModel(e.target.value)} value={model || oldModel} placeholder="Model" className={styles.inputStyle}/>
//       <textarea onChange={(e) => setDescription(e.target.value)} value={description || oldDescription} placeholder="Description" className={styles.descriptionInputStyle}/>
//       {/* <input onChange={(e) => setDescription(e.target.value)} value={description} placeholder="Description" className={styles.descriptionInputStyle}/> */}
//       <input onChange={(e) => setPrice(e.target.value)} value={price || oldPrice} placeholder="Prix" className={styles.inputStyle}/>
//       <input onChange={(e) => setColors9(e.target.value)} value={colors9 || oldColors9} placeholder="Couleurs" className={styles.inputStyle}/>
      
//       <input onChange={(e) => setPhotos9(e.target.value)} value={photos9 || oldPhotos9} placeholder="Photos" className={styles.inputStyle}/>
//       <input onChange={(e) => setSizes9(e.target.value)} value={sizes9 || oldSizes9} placeholder="Tailles" className={styles.inputStyle}/>
//       <input onChange={(e) => setGiSizes9(e.target.value)} value={giSizes9 || oldGiSizes9} placeholder="Tailles Gi" className={styles.inputStyle}/>

//       <div className={styles.divPromotion}>
//         <p>Promotion: </p>
//         <select onChange={(e) => setOnSale(e.target.value)} value={onSale} className={styles.selectPromotion}>
//           <option value="true">Oui</option>
//           <option value="false">Non</option>
//         </select>
//         <input onChange={(e) => setSoldCount(e.target.value)} value={soldCount || oldSoldCount} placeholder="soldCount"/>
//       </div>
//       <input onChange={(e) => setInputId(e.target.value)} value={inputId} placeholder="Id article" className={styles.inputStyle}/>
//       <button onClick={auClickSurUpdate}>UPDATE</button>
      
//       <button onClick={() => ajoutArticle()}>AJOUTER EN BDD</button>
//     </div>
//     <div className={styles.p2}>
//       {/* <Article2Page articleId={inputId}/> */}
//       {inputId && <Article2Page inputId={inputId} />}
//     </div>


//    </div>
   
//  );
// }

// export default AjoutArticleBdd;