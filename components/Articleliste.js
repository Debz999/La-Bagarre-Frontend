import styles from "../styles/ArticleListe.module.css";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faSolidHeart } from "@fortawesome/free-solid-svg-icons"; // Filled heart
import { faHeart as faRegHeart } from "@fortawesome/free-regular-svg-icons"; // Outlined heart

import { toggleLike } from "../reducers/wishlist";

function Articleliste(props) {
  const { model, photos9, price, _id, onSale, onSalePrice } = props;
  const dispatch  = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.value);
  const [isLiked, setIsLiked] = useState(false);


  const photos = photos9.map((photo, index) => {
    return (
      <img
        key={index}
        src={photo}
        alt={model}
        className={styles.photo}
        layout="responsive"
      />
    );
  });

  // Like article
  
   const handleLikeArticle = () => {
    dispatch(toggleLike(props))
   }

 useEffect(() => {
setIsLiked(wishlist.some((article) => article.model === model));
}, [wishlist, model]);


//className={`${styles.icon} ${isLiked ? styles.iconLiked : ""}`}

//  const handleLikeArticle = () => {
//   dispatch(toggleLike(articleCliqueData));
// };
// let heartIconStyle = { 'cursor': 'pointer' };
// if (props.isLiked) {
//   heartIconStyle = { 'color': '#e74c3c', 'cursor': 'pointer' };
// }

  return (
    <div className={styles.articleContainer}>
      <Link href={`/detailarticle/${_id}`}>
        <div className={styles.cardContainer}>
          <div>{photos[0]}</div>
          <div className ={styles.bottomContainer}> add text and heart here</div>
          <div className={styles.textContainer}>
            {/* <p >{model.split(" ").slice(0, 3).join(" ")}</p> */}
            <p className={styles.articleTitle}>
              {model.split(" ").slice(0, 3).join(" ")}
            </p>
            {/* <p className={styles.articlePrice}>{price}€</p> */}
            <p className={styles.articlePrice}>{onSale ? `Prix intial: ${price}` : null} {onSale === true ? onSalePrice : price}€</p>
          </div>
        </div>
      </Link>
      <FontAwesomeIcon
      className={`${styles.iconStyle} ${isLiked ? styles.iconLiked : ""}`}
      icon={isLiked ? faSolidHeart : faRegHeart}
        onClick={() => handleLikeArticle()}
      />
    </div>
  );
}

export default Articleliste;
