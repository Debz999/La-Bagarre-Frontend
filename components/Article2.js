import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styles from "../styles/Article2.module.css";

import Image from "next/image";

import { useRouter } from 'next/router';


import Link from 'next/link';



//Pour l'instant cette page m'affiche tout les articles detaillés, 
//Il me faut seulement l'article cliqué 
//Peut etre au click sur l'article, recuperer son id et afficher l'article par son id d'ici


// function ArticlePage({ id }) {
function Article2Page() {
  
  const [articleCliqueData, setArticleCliqueData] = useState(null);

  const [imageIndex, setImageIndex] = useState(0);
  const [categorieRecuperee, setCategorieRecuperee] = useState('')
  const [typeRecupere, setTypeRecupere] = useState('')
  const [essai, setEssai] = useState([])
  


  const router = useRouter(); //ACCEDE AUX INFOS DE L'URL
  const { id } = router.query; // `id` correspond au paramètre dynamique de l'URL



    useEffect(() => {
      if(id) {
        fetch(`http://localhost:3000/articles/${id}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            console.log(data)
            setArticleCliqueData(data.articleRécupéré)
            setCategorieRecuperee(data.articleRécupéré.categorie);
            setTypeRecupere(data.articleRécupéré.type)


          }
        });
      }
  }, [id])


// Deuxième requête pour récupérer les articles similaires
  useEffect(() => {
    if (categorieRecuperee) {
      
      fetch(`http://localhost:3000/articles/articlesSimililaires?categorie=${categorieRecuperee}&type=${typeRecupere}`)
        .then((response) => response.json())
        .then((articlesSimililaires) => {
          if (articlesSimililaires.result) {
            console.log("Données d'articles similaires récupérées :", articlesSimililaires);
            setEssai(articlesSimililaires.relatedArticles);  // Mets les articles similaires dans l'état
          }
        })
    }
  }, [categorieRecuperee]); 



useEffect(() => {
console.log("setEssai :", essai)
}, [essai])


const essaiEssai = essai.map((data) => (
  <Link href={`/article/${data._id}`}>
    <Image src={data.photos9[0]} width={200} height={150}></Image>
  </Link>
   
))




useEffect(() => {
  console.log("le useState articleCliqueData=", articleCliqueData)
}, [articleCliqueData])


const articles = () => {

  //WHAH CA A REGLER LE SOUCIS CE TRUC
  if (!articleCliqueData) {
    return <p>Chargement...</p>; 
  }


  const jeTestCa = () => {
    if(articleCliqueData.type === "Gi") {
      
        const jeSaisPas1 = articleCliqueData.giSizes9.map((sizeGi, index) => (
          <option key={index} value={sizeGi}>{sizeGi}</option>
        ))
        return <select>{jeSaisPas1}</select>;
    
    } else {

      const jeSaisPas0 = articleCliqueData.sizes9.map((size, index) => (
        <option key={index} value={size}>{size}</option>
      ))
      return <select>{jeSaisPas0}</select>;

    }
  }


  //AFFICHE UNE LISTE DES colors DISPO, A METTRE DANS UN MENU DEROULANT
  const jeSaisPas2 = articleCliqueData.colors9.map((color, index) => (
    <option key={index} value={color}>{color}</option>
  ))
  


  const auClick = () => {
    setImageIndex((prevIndex) =>
      prevIndex < articleCliqueData.photos9.length - 1 ? prevIndex + 1 : 0
    );
  };

  const jeSaisPas4 = 
    <Image src={articleCliqueData.photos9[imageIndex]} width="1000%" height="100%" className={styles.photosArticle} onClick={()=> auClick()}></Image>
    

  // const jeSaisPas5 = <ul className={styles.description} style={{ whiteSpace: "pre-line" }} >{articleCliqueData.description.replace(/ ([A-Z])/g, "\n$1")}</ul>
  // const jeSaisPas5 = <ul className={styles.description}>{articleCliqueData.description}</ul>
  const jeSaisPas5 = <p className={styles.description} style={{ whiteSpace: "pre-line" }} >{articleCliqueData.description}</p>

 


  return (

    <div className={styles.articleComplet}>

      <div className={styles.photosContainer}>
        {jeSaisPas4}
        <p>{imageIndex + 1}/{articleCliqueData.photos9.length}</p>
      </div>

      <div className={styles.separateur}>
        <h3>{articleCliqueData.model}</h3>
        <div>
          <p>Catégorie: {articleCliqueData.categorie}</p>
          <p>Type: {articleCliqueData.type}</p>
        </div>
       
        <p>Description: {jeSaisPas5}</p>
        
        <div>
          <p>Tailles disponibles: {jeTestCa()}</p>
          <p>Couleurs disponibles: <select>{jeSaisPas2}</select></p>
        </div>
        <p>{articleCliqueData.price}€</p>
        <button className={styles.buttonAchete}>ACHETE C PAS CHER</button>
      </div>

    </div>

  )
};

const jeSaisPas5 = () => {

}


    return (
      <div className={styles.articleContainer}>

        <div className={styles.containerDeTout}>
          {articles()}
        </div>

        <p> Articles Similaires: </p>
        <div className={styles.containerDeTout3}>
          <p className={styles.articlesProposes}> {essaiEssai} </p>
        </div>

        <div className={styles.containerDeTout3}>
          <p className={styles.articlesProposes}>Faut ajouter les autres propositions, articles similaires et articles les plus vendus</p>
        </div>
        
      </div>

    );
   }

   
   export default Article2Page;