import styles from "../styles/ArticleListe.module.css"


import Link from 'next/link';
import { useRouter } from 'next/router';
// function Articleliste({model, photos9, description} ){

// const photos= photos9.map((photo, i)=>{
//     return(<img key={i} src={photo} alt={model}/>)

// })

//     return(
//         <li>
//             <h3>{model}</h3>
//             <div>{photos}</div>
//             <p>{description}</p>



//         </li>
//     )
// }

// export default Articleliste;




//Affiche que l'article qui a le meme ID sur la page Article2
//Mais marche tres bien sur les autres pages

function Articleliste({model, photos9, price, _id, categorie, type} ){
    
    const router = useRouter();

      useEffect(() => {
        
          fetch(`http://localhost:3000/articles/articlesCS?categorie=${categorie}&type=${type}`)
            .then((response) => response.json())
            .then((articlesTrouves) => {
              if (articlesTrouves.result) {
                console.log("Données d'articles récupérées :", articlesTrouves);
                setAllArticlesData(articlesTrouves.filteredArticles)
              }
            })
        
      }, [categorie, type]); 

    console.log(photos9)

    const photos= photos9.map((photo, index)=>{
        return(<img key={index} src={photo} alt={model} height="250px"/>)
    
    })
    
        return(
            // <div className={styles.articleListeContainer}>
            <div className={styles.test3}>
                <div className={styles.test}>
                    <Link href={`/detailarticle/${_id}`}>
                    <div className={styles.test2}>
                        <h3>{model}</h3>
                        <div>{photos[0]}</div>
                        <p>{price}€</p>
                    </div>
            
                    </Link>

            
                </div>
            </div>


        )
    }
    
    export default Articleliste;





// function Articleliste({props} ){
    
//     if(props) {
//         const { model, photos9, price, _id } = props;
//         const photos= photos9?.map((photo, index)=>{
//             return(<img key={index} src={photo} alt={model} height="250px"/>)
        
//         })
        
//             return(
//                 <div className={styles.articleListeContainer}>
//                     <Link href={`/article/${_id}`}>
//                         <h3>{model}</h3>
//                         <div>{photos[0]}</div>
//                         <p>{price}€</p>
//                     </Link>
    
            
//                 </div>
    
//             )
//     } else {
//         console.log("ca marche pas")
//     }
    // console.log(props.photos9)



    // }
    
    // export default Articleliste;