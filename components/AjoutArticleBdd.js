import { useState, useEffect } from "react";

import styles from "../styles/AjoutArticleBdd.module.css";
import Article2Page from "./ArticleDetail";

function AjoutArticleBdd() {
  const [categorie, setCategorie] = useState("");
  const [type, setType] = useState("");
  const [model, setModel] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [onSale, setOnSale] = useState("false");
  const [soldCount, setSoldCount] = useState("");
  const [colors9, setColors9] = useState("");
  const [photos9, setPhotos9] = useState("");
  const [sizes9, setSizes9] = useState("");
  const [giSizes9, setGiSizes9] = useState("");

  const [inputId, setInputId] = useState("");
  const [onSalePrice, setOnSalePrice] = useState("");

  //BOUTON AJOUT ARTICLE
  const ajoutArticle = () => {
    const formData = new FormData(); //formData pour l'envoie de fichier

    for (let i = 0; i < photos9.length; i++) {
      formData.append(photos9[i].name, photos9[i]);
    }

    console.log([...formData.entries()]);

    //Vu que le post ne peut pas etre en json ET en formData, on passe tout en formData
    formData.append("categorie", categorie);
    formData.append("type", type);
    formData.append("model", model);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("onSale", onSale);
    formData.append("soldCount", soldCount);
    formData.append("colors9", colors9);
    formData.append("photos9", photos9);
    formData.append("sizes9", sizes9);
    formData.append("giSizes9", giSizes9);
    formData.append("onSalePrice", onSalePrice);

    fetch("https://la-bagarre-backend.vercel.app/articles/postArticle1", {
      method: "POST",
      // headers: { "Content-Type": "application/json" }, //Pas de headers pour les formData
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          console.log("Article ajouté :", data);
          alert("Article ajouté avec succès");
        } else {
          alert("Une erreur est survenu lors de l'ajout");
        }
      });
  };

  //BUTTON SUPPRIMER
  const supprimerArticle = (inputId) => {
    if (!inputId) {
      alert("L'ID de l'article est requis pour la suppression.");
      return;
    }

    // Demande de confirmation avant de supprimer
    const confirmation = window.confirm(
      "Voulez-vous vraiment supprimer cet article ?"
    );

    if (confirmation) {
      fetch("https://la-bagarre-backend.vercel.app/articles/delete", {
        method: "DELETE", // Méthode DELETE
        headers: {
          "Content-Type": "application/json", // Spécifie que le corps est en JSON
        },
        body: JSON.stringify({ id: inputId }), // Envoie l'ID de l'article dans le corps
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            alert("Article supprimé avec succès");
          } else {
            alert("Une erreur est survenue lors de la suppression");
          }
        });
    }
  };

  //BOUTON UPDATE
  const auClickSurUpdate = () => {
    if (!inputId) {
      alert("L'ID de l'article est requis pour la modification.");
      return;
    }


    const formData = new FormData(); //formData pour l'envoie de fichiers

    for (let i = 0; i < photos9.length; i++) {
      // console.log(photos9[i])
      formData.append(photos9[i].name, photos9[i]);
    }

    console.log([...formData.entries()]);

    //Vu que le post ne peut pas etre en json ET en formData, on passe tout en formData
    formData.append("categorie", categorie);
    formData.append("type", type);
    formData.append("model", model);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("onSale", onSale);
    formData.append("soldCount", soldCount);
    formData.append("colors9", colors9);
    formData.append("photos9", photos9);
    formData.append("sizes9", sizes9);
    formData.append("giSizes9", giSizes9);
    formData.append("onSalePrice", onSalePrice);

    fetch(`https://la-bagarre-backend.vercel.app/articles/articleUpdate1/${inputId}`, {
      method: "PUT",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("ca ici: ", data); // Affiche l'article mis à jour
        if (data.result) {
          alert("Article modifié avec succès");
        } else {
          alert("Une erreur est survenue lors de la modification");
        }
      });
  };

  const verif = onSale ? (
    <input
      onChange={(e) => setOnSalePrice(e.target.value)}
      value={onSalePrice}
      placeholder="Prix en promotion"
      className={styles.inputStyle}
    />
  ) : null; // Si onSale est false, rien ne s'affiche

  return (
    <div className={styles.divEnsemble}>
      <div className={styles.p1}>
        <h2>Ajouter ou Modifier un article</h2>
        <p>ID de l'article requis pour modifier un article</p>

        <input
          onChange={(e) => setInputId(e.target.value)}
          value={inputId}
          placeholder="Id article"
          className={styles.inputStyle}
        />

        <input
          onChange={(e) => setCategorie(e.target.value)}
          value={categorie}
          placeholder="Catégorie"
          className={styles.inputStyle}
        />

        <input
          onChange={(e) => setType(e.target.value)}
          value={type}
          placeholder="Type"
          className={styles.inputStyle}
        />
        <input
          onChange={(e) => setModel(e.target.value)}
          value={model}
          placeholder="Model"
          className={styles.inputStyle}
        />
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          placeholder="Description"
          className={styles.descriptionInputStyle}
        />
        <input
          onChange={(e) => setPrice(e.target.value)}
          value={price}
          placeholder="Prix"
          className={styles.inputStyle}
        />
        <input
          onChange={(e) => setColors9(e.target.value)}
          value={colors9}
          placeholder="Couleurs"
          className={styles.inputStyle}
        />
        <input
          onChange={(e) => setPhotos9(e.target.files)}
          type="file"
          multiple={true}
          className={styles.filesInput}
        ></input>
        <input
          onChange={(e) => setSizes9(e.target.value)}
          value={sizes9}
          placeholder="Tailles"
          className={styles.inputStyle}
        />
        <input
          onChange={(e) => setGiSizes9(e.target.value)}
          value={giSizes9}
          placeholder="Tailles Gi"
          className={styles.inputStyle}
        />

        <div className={styles.divPromotion}>
          <p>Promotion: </p>
          <select
            onChange={(e) => setOnSale(e.target.value === "true")}
            value={onSale ? "true" : "false"}
            className={styles.selectPromotion}
          >
            <option value="true">Oui</option>
            <option value="false">Non</option>
          </select>
          {verif}
        </div>
        <input
          onChange={(e) => setSoldCount(e.target.value)}
          value={soldCount}
          placeholder="soldCount"
          className={styles.inputStyle}
        />

        <div className={styles.buttonsContainer}>
        <button className={styles.button} onClick={() => ajoutArticle()} >AJOUTER</button>
        <button className={styles.button} onClick={auClickSurUpdate}>MODIFIER</button>
        <button className={styles.button}onClick={() => supprimerArticle(inputId)}>SUPPRIMER</button>
        </div>


      </div>
      <div className={styles.p2}>
        {inputId && <Article2Page inputId={inputId} />}
      </div>
    </div>
  );
}

export default AjoutArticleBdd;
