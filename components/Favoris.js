import styles from "../styles/Favoris.module.css";
import { useSelector, useDispatch } from "react-redux";
import { toggleLike } from "../reducers//wishlist";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';
import Articleliste from './Articleliste'

function Favoris (){
    const dispatch = useDispatch();
    const wishlist = useSelector((state) => state.wishlist.value);
  
    //console.log('wishlist', wishlist)


    const likedArticles = wishlist.map((data, i) => {
        return <Articleliste  key={i} {...data} />
    })

    return(
<div className={styles.main}>
{likedArticles}
</div>
    )
};

export default Favoris;