import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleCart } from "../reducers/cart";
import styles from "../styles/ArticleDetail.module.css";

import Image from "next/image";

import { useRouter } from "next/router";


import Link from 'next/link';
import ArticlesSimilaires from './ArticlesSimilaires';
import TopArticles from "./TopArticles";
import Articleliste from "./Articleliste";
import ArticlesOnSale from "./ArticlesOnSale";
//Pour l'instant cette page m'affiche tout les articles detaillés,
//Il me faut seulement l'article cliqué
//Peut etre au click sur l'article, recuperer son id et afficher l'article par son id d'ici

// function ArticlePage({ id }) {
  function ArticleDetail({inputId}) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value); //for token ! missing still
  const [articleCliqueData, setArticleCliqueData] = useState(null);

  const [imageIndex, setImageIndex] = useState(0);
  const [categorieRecuperee, setCategorieRecuperee] = useState("");
  const [typeRecupere, setTypeRecupere] = useState("");
  
  const [similarArticles, setSimilarArticles] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const router = useRouter();

  const urlId = router.query.id;
  const id = inputId || urlId; // On prend articleId si dispo, sinon l'ID de l'URL

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3000/articles/${id}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            //console.log(data);
            setArticleCliqueData(data.articleRécupéré);
            setCategorieRecuperee(data.articleRécupéré.categorie);
            setTypeRecupere(data.articleRécupéré.type);
          }
        });
    }
  }, [id]);

  //categorieRecuperee c'est data.articleRécupéré.catégorie
  //IL FAUT QUE JE PASSE L'ID D'ICI EN PROPS A ARTICLEFLEXIBLE

// Deuxième requête pour récupérer les articles similaires
//   useEffect(() => {
//     if (categorieRecuperee) {
      
//       fetch(`http://localhost:3000/articles/articlesSimililaires?categorie=${categorieRecuperee}&type=${typeRecupere}`)
//         .then((response) => response.json())
//         .then((articlesSimililaires) => {
//           if (articlesSimililaires.result) {
//             console.log("Données d'articles similaires récupérées :", articlesSimililaires);
//             setSimilarArticles(articlesSimililaires.filteredArticles);  // Mets les articles similaires dans l'état
//           }
//         })
//     }
//   }, [categorieRecuperee, typeRecupere]); 





// useEffect(() => {
// console.log("setSimilarArticles :", similarArticles)
// }, [similarArticles])


// const similarArticle = similarArticles.map((data) => (
//   <Link href={`/article/${data._id}`}>
//     <Image src={data.photos9[0]} width={200} height={150}></Image>
//   </Link>
   
// ))




  useEffect(() => {
    console.log("le useState articleCliqueData=", articleCliqueData);
        
    if(articleCliqueData) {
      //sets default value for color and size in case the user doesn't change either one of them
    if(articleCliqueData.giSizes9.length > 0) {
      setSelectedSize(articleCliqueData.giSizes9[0])
    };
    if(articleCliqueData.sizes9.length > 0) {
      setSelectedSize(articleCliqueData.sizes9[0])
    };
    if(articleCliqueData.colors9.length > 0) {
      setSelectedColor(articleCliqueData.colors9[0])
    };
}
  }, [articleCliqueData]);

  //Post item to cart
  //console.log("check user inA2", user.token);
  const addItemToCart = (articleId) => {
    if (user.token) {
      fetch(`http://localhost:3000/carts/post/${user.token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _id: articleId,
          quantity: 1,
          size: selectedSize,
          color: selectedColor,
        }),
      })
        .then((response) => response.json())
        .then(() => {
          //add get fetch here
          fetch(`http://localhost:3000/carts/${user.token}`)
            .then((response) => response.json())
            .then((data) => {
              dispatch(toggleCart(data.data.items));
            });
        });
    } else {
      console.log("need to log in");
      //TO DO ------- ADD VISIBLE MESSAGE THAT SAYS YOU NEED TO LOG IN -----
    }
  };

  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
  };

  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
  };


  const articles = () => {
    if (!articleCliqueData) {
      return <p>Chargement...</p>;
    }

    
    const sizeOrGiSize = () => {
      const sizes = articleCliqueData.type === "Gi" ? articleCliqueData.giSizes9 : articleCliqueData.sizes9;
      //console.log(sizes); //this function maps through giSizes9 or sizes9 depending on the type selected
      return ( 
        <select value={selectedSize} onChange={handleSizeChange}>
        {sizes.map((size, index) => (
          <option key={index} value={size}>{size}</option>
        ))}
      </select>        
      )

    };

const choosingColors = () => {
  return ( 
    <select value={selectedColor} onChange={handleColorChange}>
    {articleCliqueData.colors9.map((color, index) => (
      <option key={index} value={color}>{color}</option>
    ))}
  </select>        
  )
}

    const auClickSurPhoto = () => {
      setImageIndex((prevIndex) =>
        prevIndex < articleCliqueData.photos9.length - 1 ? prevIndex + 1 : 0
      );
    };

    const articleDescription = (
      <p className={styles.description} style={{ whiteSpace: "pre-line" }}>
        {articleCliqueData.description}
      </p>
    );

    return (
      <div className={styles.articleComplet}>
        <div className={styles.photosContainer}>
          <Image
            src={articleCliqueData.photos9[imageIndex]}
            width="800px"
            height="900px"
            className={styles.photosArticle}
            onClick={() => auClickSurPhoto()}
          ></Image>
          <p className={styles.photoLength}>
            {imageIndex + 1}/{articleCliqueData.photos9.length}
          </p>
        </div>

        <div className={styles.separateur}>
          <h3>{articleCliqueData.model}</h3>

          <div>
            <p>Catégorie: {articleCliqueData.categorie}</p>
            <p>Type: {articleCliqueData.type}</p>
          </div>
          <p>Description: {articleDescription}</p>

          <div>
            <p>Tailles disponibles: {sizeOrGiSize()}</p>
            <p>
              Couleurs disponibles: {choosingColors()}
             
            </p>
          </div>

          <p>{articleCliqueData.price}€</p>
          <button
            onClick={() => addItemToCart(articleCliqueData._id)}
            className={styles.buttonAchete}
          >
            ACHETE C PAS CHER
          </button>
        </div>
      </div>
    );
  };




    return (
      <div className={styles.articleContainer}>

        <div className={styles.containerDeTout}>
          {articles()}
        </div>
{/* 
         <div>
          {similarArticle}

        </div>  */}

        <div>
          {categorieRecuperee && typeRecupere ? (
            <ArticlesSimilaires categorie={categorieRecuperee} type={typeRecupere}/>
            ) : (
              <p>Y'a walou</p>
            )}
        </div>


        {/* <div>
        {articleCliqueData ? (
          <Articleliste _id={articleCliqueData._id} categorie={categorieRecuperee} type={typeRecupere} model={articleCliqueData.model} photos9={articleCliqueData.photos9} price={articleCliqueData.price}/>
        ) : (
          <p> Y'a rien </p>
        )}
        </div> */}
        <div>
          <ArticlesOnSale/>
        </div>

        
        
      </div>

    );
   }

export default ArticleDetail;
