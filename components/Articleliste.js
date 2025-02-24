import styles from "../styles/ArticleListe.module.css"


import Link from 'next/link';
import { useRouter } from 'next/router';


function Articleliste({model, photos9, price, _id} ){


    const photos= photos9.map((photo, index)=>{
        return(<img key={index} src={photo} alt={model} height="350px" width="290px" className={styles.photo}/>)
    
    })
    
        return(
           <div>
                <div className={styles.card}>

                    <Link href={`/detailarticle/${_id}`}>
                        <div className={styles.test2}>

                            <h4 className={styles.modelContainer}>{model}</h4>
                            <div className={styles.photos0Container}>{photos[0]}</div>
                            <h3 className={styles.priceContainer}>{price}€</h3>

                        </div>
                    </Link>

                </div>

           </div>


        )
    }
    
    export default Articleliste;

