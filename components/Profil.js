import styles from "../styles/Profil.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userStore } from "../reducers/user";
import { useRouter } from "next/router";
import ProfileForm from "./ProfileForm";


function Profil() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const router = useRouter();

  const [missingInfo, setMissingInfo] = useState(false);
  const [missingAddressInfo, setMissingAddressInfo] = useState(false);
  let profile = user.profile;
  const [userData, setUserData] = useState({
    firstname: profile.firstname || "",
    lastname: profile.lastname || "",
    email: profile.email || "",
  });
  // const [userData, setUserData] = useState({
  //   firstname: "",
  //   lastname: "",
  //   email: "",
  //   number: "",
  //   street: "",
  //   city: "",
  //   zipcode: "",
  //   country: "",
  // });
  const [userAddress, setUserAddress] = useState(user.profile.address || []);
  const [isEditable, setIsEditable] = useState(false);


    //console.log(user); //stil nog console logging the profile, why ? --------------

  //ADD USER NAME AND EMAIL
  const addUserInfo = () => {
    fetch(`http://localhost:3000/users/addinfo/${user.token}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: userData.email,
        firstname: userData.firstname,
        lastname: userData.lastname,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log(data)
        if (data.result === false) {
          setMissingInfo(true);
        } else {
          setMissingInfo(false);
        }
      });
  };
  //ADD NEW ADDRESS
  const addNewAddress = () => {
    fetch(`http://localhost:3000/users/newaddress/${user.token}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        number: userData.number,
        street: userData.street,
        city: userData.city,
        zipcode: userData.zipcode,
        country: userData.country,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        //then fetch for full user here
        fetch(`http://localhost:3000/users/${user.token}`)
          .then((response) => response.json())
          .then((data) => {
            if (data.result === false) {
              setMissingAddressInfo(true);
            } else {
              setMissingAddressInfo(false);
              console.log("true data", data.data); //stores correct data i think // NOT SURE IF IT SHOULD BE JUST DATA OR DATA.DATA --------
              dispatch(userStore(data.data));
            }
          });
      });
  };

  const handleSaveInfo = () => {
    addUserInfo();
    addNewAddress();
    router.push("/");
  };

  const handleChanges = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.main}>
      <h1>Profil</h1>
      <div className={styles.container}>
        <h3 className={styles.subtitle}>Vos informations</h3>
        <div className={styles.formGroup}>
          <label>Prénom*</label>
          <input
            type="text"
            placeholder="prénom"
            name="firstname"
            onChange={(e) => handleChanges(e)}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Nom*</label>
          <input
            type="text"
            placeholder="nom"
            name="lastname"
            onChange={(e) => handleChanges(e)}
          />
        </div>
        <div className={styles.formGroup}>
          <label>E-mail*</label>
          <input
            type="text"
            placeholder="e-mail"
            name="email"
            onChange={(e) => handleChanges(e)}
          />
        </div>

        <h3 className={styles.subtitle}>Votre adresse livraison</h3>
        <ProfileForm isEditable={isEditable}/>
        {/* <div className={styles.formGroup}>
          <label>Numéro*</label>
          <input
            type="text"
            placeholder="numéro"
            name="number"
            onChange={(e) => handleChanges(e)}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Rue*</label>
          <input
            type="text"
            placeholder="rue"
            name="street"
            onChange={(e) => handleChanges(e)}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Ville*</label>
          <input
            type="text"
            placeholder="ville"
            name="city"
            onChange={(e) => handleChanges(e)}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Code postal*</label>
          <input
            type="text"
            placeholder="code postal"
            name="zipcode"
            onChange={(e) => handleChanges(e)}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Pays*</label>
          <input
            type="text"
            placeholder="pays"
            name="country"
            onChange={(e) => handleChanges(e)}
          />
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={() => handleSaveInfo()}>
            Enregistrer et commencer le shopping !
          </button>
        </div> */}
      </div>
      {missingAddressInfo && missingInfo && <p>Missing information !</p>}
    </div>
  );
}

export default Profil;
