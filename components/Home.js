import styles from "../styles/Home.module.css";
import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { faUser, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect } from "react";
import user from "../reducers/user";
import Link from "next/link";
import { useRouter } from "next/router";

function Home() {
  

  return (
    <div>
      <Head>
        <title>LA BAGARRE</title>
      </Head>

   
    </div>
  );
}

export default Home;
