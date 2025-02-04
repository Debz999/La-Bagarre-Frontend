import styles from '../styles/Home.module.css';
import Head from 'next/head';
import { FontAwesomeicon } from "@fortawesome/react-fontawesome";
import { faUser, faXmark, faEye } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect } from "react";

function Home() {

 const [isMenuOpen, setIsMenuOpen] = useState(false);
 const menuRef = useRef(null);

  const handleUserClick = () => {
    if (!isLoggedIn) {
      <Link href="/user"></Link>
    } else {
      setIsMenuOpen(!isMenuOpen);
    }
  };


  return (
    <div>
      <Head  className={styles.title}>
        <title>LA BAGARRE</title>
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          <FontAwesomeicon icon={faUser} onClick={()=> {handleUserClick}} />
        </h1>
      </main>
    </div>
  );
}

export default Home;
