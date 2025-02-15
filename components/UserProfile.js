import styles from "../styles/Profil.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userStore } from "../reducers/user";
import ProfileForm from "./ProfileForm";

//PARAMETRES DE COMPTE
//BEFORE I BEGIN WITH THIS DELETE ALL EXTRA INFORMATION!!! ---------------------
function AccountSettings() {
  /*
  HERE LOGIC TO EDIT INFORMATION AND ADD NEW ADDRESS, PARAMETRES DE COMPTE
  */
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  let profile = user.profile;
  //console.log(profile); //address is an array, do a map
  const [userData, setUserData] = useState({
    firstname: profile.firstname,
    lastname: profile.lastname,
    email: profile.email,
  });

  //in my child component, firsname: props.firstname || ''

  const [userAddress, setUserAddress] = useState(user.profile.address);
  const [missingAddressInfo, setMissingAddressInfo] = useState(false);
  const [isEditable, setIsEditable] = useState(false);

  // //set all user elements to edit
  // const [firstname, setFirstname] = useState("");
  // const [lastname, setLastname] = useState("");
  // const [email, setEmail] = useState("");
  // const [number, setNumber] = useState("");
  // const [street, setStreet] = useState("");
  // const [city, setCity] = useState("");
  // const [zipcode, setZipcode] = useState("");
  // const [country, setCountry] = useState("");

  // Get existing user profile on click modify
  // const getExistingUser = () => {
  //   if (user.token) {
  //     fetch(`http://localhost:3000/users/${user.token}`)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         console.log(data);
  //       });
  //   } else {
  //     console.log("need to log in");
  //   }
  // };

  //Get existing user profile
  useEffect(() => {
    fetch(`http://localhost:3000/users/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("firstData", data);
        dispatch(userStore(data.data));
        setUserData(data.data);
        //SET PROVISIONAL DATA IN USE STATE OR IN REDUCE ?
      });
  }, []);

  //EDIT EXISTING ADDRESS
  const editAddress = () => {
    fetch(`http://localhost:3000/users/editaddress/${user.token}`, {
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
              console.log("secondData", data.data);
              dispatch(userStore(data.data));
              setIsEditable(true);
            }
          });
      });
  };

  const handleChanges = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  let addressContent = <p>You haven't saved an address yet</p>;
  //console.log("length", cart.cartItem);
  if (userAddress?.length > 0) {
    addressContent = userAddress.map((data, i) => {
      console.log("check map", data);
      return (
        <div>
          {" "}
          <div className={styles.formGroup}>
            <label>Numéro</label>
            <input
              readonly={isEditable ? false : "readonly"}
              type="text"
              placeholder={data.number}
              name="number"
              onChange={(e) => handleChanges(e)}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Rue</label>
            <input
              readonly={isEditable ? true : "readonly"}
              type="text"
              placeholder={data.street}
              name="street"
              onChange={(e) => handleChanges(e)}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Ville</label>
            <input
              readonly={isEditable ? true : "readonly"}
              type="text"
              placeholder={data.city}
              name="city"
              onChange={(e) => handleChanges(e)}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Code postal</label>
            <input
              readonly={isEditable ? true : "readonly"}
              type="text"
              placeholder={data.zipcode}
              name="zipcode"
              onChange={(e) => handleChanges(e)}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Pays</label>
            <input
              readonly={isEditable ? true : "readonly"}
              type="text"
              placeholder={data.country}
              name="country"
              onChange={(e) => handleChanges(e)}
            />
          </div>
          <button>delete (not done yet) </button>
        </div>
      );
    });
  }

  return (
    <div className={styles.main}>
      <h1>Mon compte</h1>
      <div>
        <p>Prénom: {user.profile.firstname}</p>
        <p>Nom: {user.profile.lastname}</p>
        <p>E-mail: {user.profile.email}</p>
      </div>
      <div>
        <h3>Mon addresse de livraison</h3>
        {addressContent}
      </div>
      {/* <button onClick={getAddressInput()}>Ajouter un nouvel addresse</button> */}
      <button onClick={() => editAddress()}>
        Modifier mes informations
      </button>
      <button onClick={() => addNewAddress()}>Enregistrer les modificqtions (not done yet)</button>
      <button>
        click here to add an address (not done yet, but should be similar to
        profile page)
      </button>
    </div>
  );
}
export default AccountSettings;
