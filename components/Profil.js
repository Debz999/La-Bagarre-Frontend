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
  // const [missingAddressInfo, setMissingAddressInfo] = useState(false);
  let profile = user;
  const [userData, setUserData] = useState({
    firstname: profile.firstname || "",
    lastname: profile.lastname || "",
    email: profile.email || "",
  });

  const [isBaseEditable, setBaseIsEditable] = useState(false);
  const [isNewAddressForm, setIsNewAddressForm] = useState(false);

  //console.log(user);

  //Get existing user profile
  useEffect(() => {
    fetch(`http://localhost:3000/users/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log('profil',data.data);
        
        if (!data.data.email) {
          //setIsEditable(true);
          setBaseIsEditable(true);
          setIsNewAddressForm(false)
        }
        dispatch(userStore(data.data));
        setUserData(data.data);
      });
  }, []);

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

  const handleSaveInfo = () => {
    addUserInfo();
    //router.push("/");
    setBaseIsEditable(false);
  };

  //changes for name and email
  const handleChanges = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const addProfileForm = () => {
    setIsNewAddressForm(true);
  };

  const onRequestCloseNewAddress = () => {
    setIsNewAddressForm(false);
  };

  //maps all user's addresses
  let allAddresses =
    user.address?.map((data, index) => {
      //console.log(data);
      return <ProfileForm key={index} index={index} {...data} isEditable={false}/>;
    }) || [];

  return (
    <div className={styles.main}>
      <h1>PROFIL</h1>
      <div className={styles.container}>
        <h3 className={styles.subtitle}>Vos informations</h3>

        <div className={styles.formGroup}>
          <label>Prénom*</label>
          <input
            className={
              isBaseEditable ? styles.inputEditable : styles.inputReadOnly
            }
            readOnly={isBaseEditable ? false : "readOnly"}
            type="text"
            placeholder={user.firstname || "prénom"}
            name="firstname"
            onChange={(e) => handleChanges(e)}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Nom*</label>
          <input
            className={
              isBaseEditable ? styles.inputEditable : styles.inputReadOnly
            }
            readOnly={isBaseEditable ? false : "readOnly"}
            type="text"
            placeholder={user.lastname || "nom"}
            name="lastname"
            onChange={(e) => handleChanges(e)}
          />
        </div>
        <div className={styles.formGroup}>
          <label>E-mail*</label>
          <input
            className={
              isBaseEditable ? styles.inputEditable : styles.inputReadOnly
            }
            readOnly={isBaseEditable ? false : "readOnly"}
            type="text"
            placeholder={user.email || "e-mail"}
            name="email"
            onChange={(e) => handleChanges(e)}
          />
        </div>
        <button className={styles.button} onClick={() => handleSaveInfo()}>
          SAUVEGARDER MON PROFIL
        </button>
      </div>
      {allAddresses.length > 0 && allAddresses}

      {isNewAddressForm && (
          <ProfileForm onRequestCloseNewAddress={onRequestCloseNewAddress} isEditable={true} />
        )}
      <div className={styles.buttonContainer}>
        <button className={styles.button2} onClick={() => addProfileForm()}>+ AJOUTER UNE ADDRESSE</button>
      </div>
    </div>
  );
}

export default Profil;
