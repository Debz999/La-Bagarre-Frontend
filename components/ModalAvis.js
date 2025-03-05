import styles from "../styles/Reviews.module.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ModalAvis = ({ isOpen, onClose, reviews, articleId, setReviews }) => {
  if (!isOpen) return null;

  const [avisClient, setAvisClient] = useState("");
  const [note, setNote] = useState(5); // Note par défaut à 5 étoiles
  
  const token = useSelector((state) => state.user.value.token);
  const username = useSelector((state) => state.user.value.username);

  const sendReview = () => {
    
    console.log("Token récupéré depuis redux :", token); // Ajoute ce log pour vérifier
    if (!token) {
      alert("Vous devez être connecté pour poster un avis !");
      return;
    }

    fetch(`http://localhost:3000/reviews/articles/${articleId}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
        rating: note,
        comment: avisClient,
      }),
    })
      // .then((response) => {
      //   if (!response.ok) {
      //     throw new Error("Erreur lors de l'envoi de l'avis");
      //   }
      //   return response.json();
      // })
      .then((response) => {
        // Vérifie d'abord si la réponse est correcte (code 200)
        console.log("Réponse API : ", response); // Affiche la réponse brute pour inspection
        if (!response.ok) {
          throw new Error("Erreur lors de l'envoi de l'avis");
        }
        return response.json(); // Convertir la réponse en JSON
      })
      .then((data) => {
        console.log("Données reçues après envoi de l'avis :", data);
        if (data && data.article && data.article.reviews) {
        setReviews(data.article.reviews); // Mettre à jour les avis affichés
        alert("Avis ajouté avec succès !");
        setAvisClient(""); // Réinitialiser l'input
        setNote(5);
      } else {
        alert("Aucun avis trouvé dans la réponse.");
      }
      })
      // .catch((error) => {
      //   console.error(error);
      //   alert("Erreur lors de l'ajout de l'avis");
      // });
  };

  return (
    // <div className="modalOverlay" onClick={onClose}>
    //   <div className="modalContent" onClick={(e) => e.stopPropagation()}>

    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeModal} onClick={onClose}>
          ✖
        </button>
        <h3>Avis des clients</h3>
        <div className="reviewsContainer">
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div key={review.id || index} className={styles.reviewItem}>
                <div className={styles.unContainer}>
                  <div>
                    <p>
                      <strong>Utilisateur: </strong> {token ?  username : "Utilisateur inconnu"}
                    </p>
                    <p>
                      <strong>Note: </strong> {review.rating} ⭐
                    </p>
                  </div>

                  <p>
                    <strong>Date: </strong>
                    {new Date(review.date).toLocaleDateString()}
                  </p>
                </div>

                <p>
                  <strong>Commentaire: </strong> {review.comment}
                </p>
              </div>
            ))
          ) : (
            <p>Aucun avis pour cet article.</p>
          )}

          
          <select
            value={note}
            onChange={(e) => setNote(Number(e.target.value))}
            className={styles.inputStyle}
          >
            <option value="1">1 ⭐</option>
            <option value="2">2 ⭐⭐</option>
            <option value="3">3 ⭐⭐⭐</option>
            <option value="4">4 ⭐⭐⭐⭐</option>
            <option value="5">5 ⭐⭐⭐⭐⭐</option>
          </select>


          <input
            onChange={(e) => setAvisClient(e.target.value)}
            value={avisClient}
            placeholder="Ajouter un commentaire"
            className={styles.inputStyle}
          />
          <button onClick={sendReview}>Envoyer</button>

        </div>
      </div>
    </div>
  );
};

export default ModalAvis;
