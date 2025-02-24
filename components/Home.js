import styles from "../styles/Home.module.css";
import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { faUser, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect } from "react";
import user from "../reducers/user";
import Link from "next/link";
import { useRouter } from "next/router";
import Article from "./Article";
import ArticlesOnSale from "./ArticlesOnSale";
import ArticlesSimilaires from "./ArticlesSimilaires";



function Home() {
  
  const categorie = ""
  const type = "Tous les articles"
  // const title = "Tous les articles"
  return (
    <div className={styles.main}>
      <Head>
        <title>LA BAGARRE</title>
      </Head>
      <h1>Home</h1>
      {/* <Article /> */}
      <ArticlesSimilaires categorie={categorie} type={type}/>
      {/* <div className={styles.sales}> */}
        <ArticlesOnSale/>
      {/* </div> */}
      

   
    </div>
  );
}

export default Home;
