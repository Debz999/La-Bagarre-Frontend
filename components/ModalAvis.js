import styles from "../styles/Reviews.module.css";
import { useEffect, useState } from "react";


const ModalAvis = ({ isOpen, onClose, reviews }) => {
  if (!isOpen) return null;

   const [avisClient, setAvisClient] = useState("");

    const sendReview = () => {
        fetch()
    }

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
            reviews.map((review) => (
              <div key={review.id} className={styles.reviewItem}>
                <div className={styles.unContainer}>
                  
                <div>
                    <p>
                      <strong>Utilisateur: </strong> {review.userId.username}
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
