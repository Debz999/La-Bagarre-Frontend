import styles from "../styles/Home.module.css";
import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { faUser, faXmark, faEye } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect } from "react";
import user from '../reducers/user'
import Link from "next/link";
import {useRouter} from 'next/router';

function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const user = useSelector((state) => state.user.value);
  const router= useRouter()

  const handleUserClick = () => {
    if (!user.token) {
      router.push('/user')
    } else {
      
    }
  };

  return (
    <div>
      <Head>
        <title>LA BAGARRE</title>
      </Head>

      <div >
        <FontAwesomeIcon
          icon={faUser}
          onClick={() => {
            handleUserClick();
          }}
        />
      </div>
    </div>
  );
}

export default Home;
