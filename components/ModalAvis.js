import styles from "../styles/Reviews.module.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ModalAvis = ({ isOpen, onClose, reviews, articleId, setReviews }) => {
  if (!isOpen) return null;

  const [avisClient, setAvisClient] = useState("");
  const [note, setNote] = useState(5); // Note par défaut à 5 étoiles
  
  const token = useSelector((state) => state.user.value.token);
  const username = useSelector((state) => state.user.value.username);


  console.log(reviews)

  const sendReview = () => {
    console.log("Token récupéré depuis redux :", token);
  
    if (!token) {
      alert("Vous devez être connecté pour poster un avis !");
      return;
    }
   
    fetch(`https://la-bagarre-backend.vercel.app/reviews/articles/${articleId}/reviews`, {
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
      .then((response) => response.json()) // Convertir la réponse en JSON
      .then((data) => {
        console.log("Données reçues après envoi de l'avis :", data);
        if (!data.article || !data.article.reviews) {
          console.error("Format inattendu :", data);
          alert("Erreur : format de réponse inattendu.");
          return;
        }
        setReviews(data.article.reviews); // Mettre à jour les avis affichés
        alert("Avis ajouté avec succès !");
        setAvisClient(""); // Réinitialiser l'input
        setNote(5);
      })
  };


  // mappedReviews = reviews.map((data, i) => {
  //   data.userId
  // })

  const userIds = reviews.map((data) => data.userId);

  const removeReview = (reviewId, reviewUserId) => {
    if (!token) {
      alert("Vous devez être connecté pour supprimer un avis !");
      return;
    }
    
    fetch(`https://la-bagarre-backend.vercel.app/reviews/articles/${articleId}/reviews/${reviewId}`, {
    // fetch(`http://localhost:3000/reviews/articles/${articleId}/reviews/${reviewId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",  // Type de contenu
      },
      body: JSON.stringify({
        token: token,  // Envoie du token dans le body
        // reviewUserId: userIds
        reviewUserId: reviewUserId
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Réponse du serveur après suppression :", data); // Ajoute un log pour mieux comprendre la réponse
  
        if (data.message === "Avis supprimé avec succès") {
          alert("Avis supprimé !");
          // Supprime l'avis du frontend directement
          setReviews((prevReviews) => prevReviews.filter((review) => review._id !== reviewId));
        } else {
          alert(data.message || "Erreur lors de la suppression de l'avis");
        }
      })
  };
  return (


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
                      <p><strong>Utilisateur: </strong> {review.userId?.username || "Utilisateur inconnu"}</p>
                    </p>
                    <p>
                      <strong>Note: </strong> {review.rating} ⭐
                    </p>
                    {/* <button  onClick={() => removeReview(review._id)}> */}
                    <button onClick={() => removeReview(review._id, review.userId._id)}>
                      🗑️
                    </button>
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
