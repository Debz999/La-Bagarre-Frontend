import styles from "../styles/ProfileForm.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userStore } from "../reducers/user";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTrash } from "@fortawesome/free-solid-svg-icons";

function ProfileForm(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const [isEditable, setIsEditable] = useState(true);

  const [missingAddressInfo, setMissingAddressInfo] = useState(false);

  let profile = user;
  const [userAddress, setUserAddress] = useState({
    id: profile.address?._id || "",
    number: profile.address?.number || "",
    street: profile.address?.street || "",
    city: profile.address?.city || "",
    zipcode: profile.address?.zipcode || "",
    country: profile.address?.country || "",
  });

  //ADD NEW ADDRESS (needs all fields to save)
  const addNewAddress = () => {
    setIsEditable(false);
    fetch(`http://localhost:3000/users/newaddress/${user.token}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        number: userAddress.number,
        street: userAddress.street,
        city: userAddress.city,
        zipcode: userAddress.zipcode,
        country: userAddress.country,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log("firsT DATA", data);
        if (data.result === false) {
          setMissingAddressInfo(true);
        } else {
          //then fetch for full user here
          fetch(`http://localhost:3000/users/${user.token}`)
            .then((response) => response.json())
            .then((data) => {
              setMissingAddressInfo(false);
              dispatch(userStore(data.data));
              setUserAddress({
                number: "",
                street: "",
                city: "",
                zipcode: "",
                country: "",
              });
              props.onRequestCloseNewAddress();
              
            });
        }
      });
  };

  useEffect(() => {
    console.log("Updated isEditable:", isEditable);
  }, [isEditable]);

  //EDIT EXISTING ADDRESS (doesn't need all fields)
  const saveEditAddress = () => {
    setIsEditable(false);
    //console.log(props._id)
    fetch(`http://localhost:3000/users/editaddress/${user.token}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        _id: props._id,
        number: userAddress.number,
        street: userAddress.street,
        city: userAddress.city,
        zipcode: userAddress.zipcode,
        country: userAddress.country,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        //then fetch for full user here
        fetch(`http://localhost:3000/users/${user.token}`)
          .then((response) => response.json())
          .then((data) => {
            //console.log("edit data", data)
            dispatch(userStore(data.data));
          });
      });
  };

  //DELETE one address
  const handleDeleteAddress = () => {
    fetch(`http://localhost:3000/users/deleteaddress/${user.token}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: props._id }),
    })
      .then((response) => response.json())
      .then(() => {
        fetch(`http://localhost:3000/users/${user.token}`)
          .then((response) => response.json())
          .then((data) => {
            //console.log(data);
            dispatch(userStore(data.data));
          });
      });
  };

  const handleEditability = () => {
    setIsEditable(!isEditable);
  };

  //Check props for button visibility ------- WHY IS IT ALWAYS SET TO TRUE ????
  // useEffect(() => {
  //   console.log(props);
  //   if (!props.index) {
  //     setIsEditable(true);
  //   }
  // }, []);

  //changes for address (sent to child via props)
  const handleAddressChanges = (e) => {
    const newAddresses = { ...userAddress };
    newAddresses[e.target.name] = e.target.value;
    setUserAddress(newAddresses);
  };
  //console.log(isEditable)

  //console.log('props:', props)
  return (
    <div className={styles.container}>
      <h3 className={styles.subtitle}>Votre adresse livraison</h3>
      <div className={styles.formGroup}>
        <label>Numéro</label>
        <input
          className={isEditable ? styles.inputEditable : styles.inputReadOnly}
          readOnly={isEditable ? false : "readOnly"}
          type="text"
          placeholder={props.number || "numéro"}
          name="number"
          onChange={(e) => handleAddressChanges(e)}
        />
      </div>
      <div className={styles.formGroup}>
        <label>Rue</label>
        <input
          className={isEditable ? styles.inputEditable : styles.inputReadOnly}
          readOnly={isEditable ? false : "readOnly"}
          type="text"
          placeholder={props.street || "rue"}
          name="street"
          onChange={(e) => handleAddressChanges(e)}
        />
      </div>
      <div className={styles.formGroup}>
        <label>Ville</label>
        <input
          className={isEditable ? styles.inputEditable : styles.inputReadOnly}
          readOnly={isEditable ? false : "readOnly"}
          type="text"
          placeholder={props.city || "ville"}
          name="city"
          onChange={(e) => handleAddressChanges(e)}
        />
      </div>
      <div className={styles.formGroup}>
        <label>Code postal</label>
        <input
          className={isEditable ? styles.inputEditable : styles.inputReadOnly}
          readOnly={isEditable ? false : "readOnly"}
          type="text"
          placeholder={props.zipcode || "code postal"}
          name="zipcode"
          onChange={(e) => handleAddressChanges(e)}
        />
      </div>
      <div className={styles.formGroup}>
        <label>Pays</label>
        <input
          className={isEditable ? styles.inputEditable : styles.inputReadOnly}
          readOnly={isEditable ? false : "readOnly"}
          type="text"
          placeholder={props.country || "pays"}
          name="country"
          onChange={(e) => handleAddressChanges(e)}
        />
      </div>
      <div className={styles.delModContainer}>
        {!isEditable && props.index !== undefined && (
          <button
            className={styles.buttonModif}
            onClick={() => handleEditability()}
          >
            MODIFIER
          </button>
        )}
        {isEditable && props.index !== undefined && (
          <button
            className={styles.buttonModif}
            onClick={() => saveEditAddress()}
          >
            ENREGISTRER MODIFICATIONS
          </button>
        )}
        {props.index === undefined && (
          <button
            className={styles.buttonModif}
            onClick={() => addNewAddress()}
          >
            ENREGISTRER NOUVELLE ADDRESSE
          </button>
        )}
        <button
          className={styles.buttonDel}
          onClick={() => handleDeleteAddress()}
        >
          SUPPRIMER
        </button>
      </div>
      {missingAddressInfo && <p>Missing information !</p>}
    </div>
  );
}

export default ProfileForm;
