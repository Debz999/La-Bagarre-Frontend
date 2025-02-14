import styles from "../styles/Profil.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userStore } from "../reducers/user";

function Profil() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    number: "",
    street: "",
    city: "",
    zipcode: "",
    country: "",
  });
  //set all user elements to edit
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [country, setCountry] = useState("");

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
        //console.log(data) works
        //insert get here, not sure if i should just do one fetch get at the end
        // fetch(`http://localhost:3000/users/${user.token}`)
        //   .then((response) => response.json())
        //   .then((data) => {
        //     dispatch(userStore(data));
        //     console.log(data);
        //   });
      });
  };

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
        console.log(data);
        //insert get here
        // fetch(`http://localhost:3000/users/${user.token}`)
        //   .then((response) => response.json())
        //   .then((data) => {
        //     dispatch(userStore(data));
        //     console.log(data);
        //   });
      });
  };

  const handleSaveInfo = () => {
    //ADD SOMETHING FOR MISSING INFORMATION!!
    addUserInfo();
    addNewAddress();
  };

  //create adress component (in case of multiple addresses),
  //maybe component for everything if its supposed to look the same
  //then start logic to edit user adress

  //to modify address, first get then post
  // Get existing user profile on click modify
  const getExistingUser = () => {
    if (user.token) {
      fetch(`http://localhost:3000/users/${user.token}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        });
    } else {
      console.log("need to log in");
    }
  };

  //Get existing user profile
  //   useEffect(() => {
  //     fetch(`http://localhost:3000/users/${user.token}`)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         console.log(data);
  //         //dispatch to reducer to store complete data
  //       });
  //   }, []);

  //TO DO LIST - teacher's help
  //GET USER pour remplir les champs editables - useEffect, get
  //in front on change... setName(text),
  //users do usestate for each one
  //useEffect get l'addresse setName, on change setName (if changes)
  //so first i have divs, then if get i change them all for inoputs

  const handleChanges = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  //console.log(userData); //works, now handle submit

  return (
    <div className={styles.main}>
      <h1>Mon compte</h1>
      <div>
        <div>
          <h3>Vos informations</h3>
          <label>Prénom</label>
          <input
            type="text"
            placeholder="prénom"
            name="firstname"
            onChange={(e) => handleChanges(e)}
          />
          <label>Nom</label>
          <input
            type="text"
            placeholder="nom"
            name="lastname"
            onChange={(e) => handleChanges(e)}
          />
          <label>E-mail</label>
          <input
            type="text"
            placeholder="e-mail"
            name="email"
            onChange={(e) => handleChanges(e)}
          />
        </div>
        <button className={styles.button} onClick={() => handleSaveInfo()}>
          Sauvegarder mes informations
        </button>
        <div>
          <h3>Votre adresse livraison</h3>
          <label>Numéro</label>
          <input
            type="text"
            placeholder="numéro"
            name="number"
            onChange={(e) => handleChanges(e)}
          />
          <label>Rue</label>
          <input
            type="text"
            placeholder="rue"
            name="street"
            onChange={(e) => handleChanges(e)}
          />
          <label>Ville</label>
          <input
            type="text"
            placeholder="ville"
            name="city"
            onChange={(e) => handleChanges(e)}
          />
          <label>Code postale</label>
          <input
            type="text"
            placeholder="code postale"
            name="zipcode"
            onChange={(e) => handleChanges(e)}
          />
          <label>Pays</label>
          <input
            type="text"
            placeholder="pays"
            name="country"
            onChange={(e) => handleChanges(e)}
          />
        </div>
        <button className={styles.button} onClick={() => handleSaveInfo()}>
          Sauvegarder
        </button>
      </div>
    </div>
  );
}

export default Profil;
