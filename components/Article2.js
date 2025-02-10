import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {toggleCart} from '../reducers/cart'
import styles from "../styles/Article2.module.css";

import Image from "next/image";

import { useRouter } from "next/router";

//Pour l'instant cette page m'affiche tout les articles detaillés,
//Il me faut seulement l'article cliqué
//Peut etre au click sur l'article, recuperer son id et afficher l'article par son id d'ici

// function ArticlePage({ id }) {
  function Article2Page() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value); //for token ! missing still
  const [articleCliqueData, setArticleCliqueData] = useState(null);
  const [imageShown, setImageShown] = useState([]);
  const [imageIndex, setImageIndex] = useState(0); // L'index de l'image affichée actuellement
  const [selectedSize, setSelectedSize] = "";
  const [selectedColor, setSelectedColor] = "";

  const router = useRouter();
  const { id } = router.query; // `id` correspond au paramètre dynamique de l'URL

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3000/articles/${id}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            console.log(data);
            setArticleCliqueData(data.articleRécupéré);
            setImageShown(data.articleRécupéré.photos9[0]);
          }
        });
    }
  }, [id]);

  useEffect(() => {
    console.log("le useState =", articleCliqueData);
    // console.log('Image montrée:', imageShown);
  }, [articleCliqueData]);

  // console.log(articleCliqueData.sizes9)

  //Post item to cart
  console.log('check user inA2', user.token);
  const addItemToCart = (articleId) => {
    if(user.token) {
      fetch(`http://localhost:3000/carts/post/${user.token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: articleId, quantity: 1 }),
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
      console.log('need to log in')
      //dispatch(toggleCart([{_id: articleId, quantity: 1}]))
    }
  };

  const articles = () => {
    //WHAH CA A REGLER LE SOUCIS CE TRUC
    if (!articleCliqueData) {
      return <p>Chargement...</p>;
    }

    const jeTestCa = () => {
      if (articleCliqueData.type === "Gi") {
        const jeSaisPas1 = articleCliqueData.giSizes9.map((sizeGi, index) => (
          <option key={index} value={sizeGi}>
            {sizeGi}
          </option>
        ));
        return <select>{jeSaisPas1}</select>;
      } else {
        const jeSaisPas0 = articleCliqueData.sizes9.map((size, index) => (
          <option key={index} value={size}>
            {size}
          </option>
        ));
        return <select>{jeSaisPas0}</select>;
      }
    };

    // //AFFICHE UNE LISTE DES sizes DISPOS, A METTRE DANS UN MENU DEROULANT
    // const jeSaisPas0 = articleCliqueData.sizes9.map((size, index) => (
    //   // <li key={index}>{size}</li>
    //   <option key={index} value={size}>{size}</option>
    // ))

    // //AFFICHE UNE LISTE DES giSizes DISPOS, A METTRE DANS UN MENU DEROULANT
    // const jeSaisPas1 = articleCliqueData.giSizes9.map((sizeGi, index) => (
    //   // <li key={index}>{sizeGi}</li>
    //   <option key={index} value={sizeGi}>{sizeGi}</option>
    // ))

    //AFFICHE UNE LISTE DES colors DISPO, A METTRE DANS UN MENU DEROULANT
    const jeSaisPas2 = articleCliqueData.colors9.map((color, index) => (
      // <li key={index}>{color}</li>
      <option key={index} value={color}>
        {color}
      </option>
    ));

    //AFFICHE TOUTE LES photos DE L'ARTICLE
    const jeSaisPas3 = articleCliqueData.photos9.map((photo, index) => (
      <Image
        key={index}
        src={photo}
        width={400}
        height={300}
        className={styles.photosArticle}
        onClick={() => handleNextImage()}
      ></Image>
    ));

    const auClick0 = () => {};

    return (
      <div className={styles.articleComplet}>
        <div className={styles.photosContainer}>{jeSaisPas3}</div>

        <div className={styles.separateur}>
          <h3>{articleCliqueData.model}</h3>
          <div>
            <p>Catégorie: {articleCliqueData.categorie}</p>
            <p>Type: {articleCliqueData.type}</p>
          </div>
          <p>Description: {articleCliqueData.description}</p>
          <div>
            <p>Tailles disponibles: {jeTestCa()}</p>
            <p>
              Couleurs disponibles: <select>{jeSaisPas2}</select>
            </p>
          </div>
          <p>{articleCliqueData.price}€</p>
          <button onClick={() => addItemToCart(articleCliqueData._id)} className={styles.buttonAchete}>ACHETE C PAS CHER</button>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.articleContainer}>
      <div className={styles.article}>
        <div className={styles.containerDeTout}>{articles()}</div>
      </div>
      <div className={styles.containerDeTout2}>
        <p className={styles.articlesProposes}>
          Faut ajouter les autres propositions, articles similaires et articles
          les plus vendus
        </p>
      </div>
      <div className={styles.containerDeTout2}>
        <p className={styles.articlesProposes}>
          Faut ajouter les autres propositions, articles similaires et articles
          les plus vendus
        </p>
      </div>
    </div>
  );
}

//Me faut un router.get les articles les plus vendus
//Et aussi un get articles similaires, ptete meme type d'article
//Ptete afficher 5 articles et "afficher plus" qui redirige vers la page dédiée au type du produit

export default Article2Page;
