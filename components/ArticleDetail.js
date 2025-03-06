import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleCart, addToTemporaryCart } from "../reducers/cart";
import { toggleLike } from "../reducers/wishlist";
import styles from "../styles/ArticleDetail.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import ArticlesSimilaires from "./ArticlesSimilaires";
import Accordion from "./Accordion";
import Articleliste from "./Articleliste";

import ArticlesOnSale from "./ArticlesOnSale";

// import ModalAvis from "./ModalAvis"; 


function ArticleDetail({ inputId }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value); //for token ! missing still
  const wishlist = useSelector((state) => state.wishlist.value);
  const [articleCliqueData, setArticleCliqueData] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [categorieRecuperee, setCategorieRecuperee] = useState("");
  const [typeRecupere, setTypeRecupere] = useState("");
  const [similarArticles, setSimilarArticles] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [isLiked, setIsLiked] = useState(false);

  // const [reviews, setReviews] = useState([]);
  // const [isModalOpen, setIsModalOpen] = useState(false); 

  // const [goToSignup, seGoToSignup] = useState(false);
  const router = useRouter();
  const urlId = router.query.id;
  const id = inputId || urlId; // On prend articleId si dispo, sinon l'ID de l'URL





  useEffect(() => {
    if (id) {
      fetch(`https://la-bagarre-backend.vercel.app/articles/${id}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            console.log(data);
            setArticleCliqueData(data.articleRécupéré);
            setCategorieRecuperee(data.articleRécupéré.categorie);
            setTypeRecupere(data.articleRécupéré.type);
            // setReviews(data.articleRécupéré.reviews || []);
          }
        });
       
    }
  }, [id]);

  useEffect(() => {
    //console.log("le useState articleCliqueData=", articleCliqueData);
    if (articleCliqueData) {
      //sets default value for color and size in case the user doesn't change either one of them
      if (articleCliqueData.giSizes9.length > 0) {
        setSelectedSize(articleCliqueData.giSizes9[0]);
      }
      if (articleCliqueData.sizes9.length > 0) {
        setSelectedSize(articleCliqueData.sizes9[0]);
      }
      if (articleCliqueData.colors9.length > 0) {
        setSelectedColor(articleCliqueData.colors9[0]);
      }
    }
  }, [articleCliqueData]);


  // const openModal = () => {
  //     setIsModalOpen(true);
  //   };
    
  // const closeModal = () => {
  //     setIsModalOpen(false);
  //   };



  useEffect(() => {
if(wishlist && articleCliqueData) {
  setIsLiked(wishlist.some((article) => article.model === articleCliqueData.model));
}
    }, [wishlist, articleCliqueData]);

  //price: articleCliqueData.onSale ? articleCliqueData.onSalePrice : articleCliqueData.price
  //Post item to cart
  const addItemToCart = (articleId) => {
    if (user.token) {
      fetch(`https://la-bagarre-backend.vercel.app/carts/post/${user.token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _id: articleId,
          quantity: 1,
          size: selectedSize,
          color: selectedColor,
          price: articleCliqueData.onSale
            ? articleCliqueData.onSalePrice
            : articleCliqueData.price,
          price: articleCliqueData.onSale
            ? articleCliqueData.onSalePrice
            : articleCliqueData.price,
        }),
      })
        .then((response) => response.json())
        .then(() => {
          //add get fetch here
          fetch(`https://la-bagarre-backend.vercel.app/carts/${user.token}`)
            .then((response) => response.json())
            .then((data) => {
              dispatch(toggleCart(data.data.items));
            });
        });
    } else {
      // seGoToSignup(true);
      console.log("need to log in");
      dispatch(
        addToTemporaryCart({
          article: articleCliqueData,
          quantity: 1,
          size: selectedSize,
          color: selectedColor,
          price: articleCliqueData.onSale
            ? articleCliqueData.onSalePrice
            : articleCliqueData.price,
        })
      );
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
      const sizes =
        articleCliqueData.type === "Gi"
          ? articleCliqueData.giSizes9
          : articleCliqueData.sizes9;
      //console.log(sizes); //this function maps through giSizes9 or sizes9 depending on the type selected
      return (
        <select value={selectedSize} onChange={handleSizeChange}>
          {sizes.map((size, index) => (
            <option key={index} value={size}>
              {size}
            </option>
          ))}
        </select>
      );
    };
    const choosingColors = () => {
      return (
        <select value={selectedColor} onChange={handleColorChange}>
          {articleCliqueData.colors9.map((color, index) => (
            <option key={index} value={color}>
              {color}
            </option>
          ))}
        </select>
      );
    };
    const auClickSurPhoto = () => {
      setImageIndex((prevIndex) =>
        prevIndex < articleCliqueData.photos9.length - 1 ? prevIndex + 1 : 0
      );
    };
    //handle likes
    const handleLike = () => {
      dispatch(toggleLike(articleCliqueData));
    };
    
    // let SignupModule = (
    //   <div>
    //     <p>
    //       Voulez-vous vous connecter pour ajouter des articles dans le panier?
    //     </p>
    //     <button className={styles.button2} onClick={() => router.push("/user")}>
    //       Yes!
    //     </button>
    //     <button className={styles.button3} onClick={() => seGoToSignup(false)}>
    //       Continue browsing
    //     </button>
    //   </div>
    // );



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
        <div className={styles.textContainer}>
          <h2>{articleCliqueData.model}</h2>
          <h3>
            {articleCliqueData.onSale
              ? <s>{articleCliqueData.price}</s>
              : null}{" "}
            {articleCliqueData.onSale === true
              ? articleCliqueData.onSalePrice
              : articleCliqueData.price}
            €
          </h3>
          <p className={styles.categoryText}>{articleCliqueData.categorie}</p>
          <p>Type: {articleCliqueData.type}</p>
          {/* <p>Description: {articleDescription}</p> */}
          <p>Tailles disponibles: {sizeOrGiSize()}</p>
          <p>Couleurs disponibles: {choosingColors()}</p>


          {/* <div>
            <button onClick={openModal} className={styles.viewReviewsButton}>
              Voir les avis
            </button>
            <ModalAvis isOpen={isModalOpen} onClose={closeModal} reviews={reviews} articleId={articleCliqueData._id}/>
          </div> */}
          
          <div className={styles.buttonContainer}>
          <button
            onClick={() => addItemToCart(articleCliqueData._id)}
            className={styles.buttonAchete}
          >
            AJOUTER AU PANIER
          </button>
          <button onClick={() => handleLike()} className={styles.buttonFavoris}>
            {!isLiked && 'AJOUTER AUX' || isLiked && 'ENLEVER DES'} FAVORIS
          </button>
          
          </div>
          <Accordion description={articleCliqueData.description}/>

        </div>
   

      </div>
    );
  };


  //first div className={styles.articleContainer}
  return (
    <div>
      <div className={styles.containerDeTout}>{articles()}</div>
      <div>
        {categorieRecuperee && typeRecupere && (
          <ArticlesSimilaires
            categorie={categorieRecuperee}
            type={typeRecupere}
          />
        )}
      </div>
      <div>
          <ArticlesOnSale/>

      </div>
    </div>
  );
}
export default ArticleDetail;
