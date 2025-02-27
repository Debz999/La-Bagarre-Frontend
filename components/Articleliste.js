import styles from "../styles/ArticleListe.module.css";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

function Articleliste({ model, photos9, price, _id }) {
    const router = useRouter();

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

  return (
    <div className={styles.articleContainer}>
      <Link href={`/detailarticle/${_id}`}>
        <div className={styles.cardContainer}>
          <div>{photos[0]}</div>
          <div className={styles.textContainer}>
            {/* <p >{model.split(" ").slice(0, 3).join(" ")}</p> */}
            <p className={styles.articleTitle}>
              {model.split(" ").slice(0, 3).join(" ")}
            </p>
            <p className={styles.articlePrice}>{price}€</p>
          </div>
        </div>
      </Link>
      <FontAwesomeIcon
        className={styles.iconStyle}
        icon={faHeart}
        onClick={() => {
          router.push("/favoris");
        }}
      />
    </div>
  );
}

export default Articleliste;
