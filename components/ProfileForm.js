import styles from "../styles/Profil.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userStore } from "../reducers/user";

function ProfileForm(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const [isEditable, setIsEditable] = useState(true);
  const [missingAddressInfo, setMissingAddressInfo] = useState(false);

  let profile = user.profile;
  const [userAddress, setUserAddress] = useState({
    id: profile.address?._id ||"",
    number: profile.address?.number || "",
    street: profile.address?.street || "",
    city: profile.address?.city || "",
    zipcode: profile.address?.zipcode || "",
    country: profile.address?.country || "",
  });

  //ADD NEW ADDRESS (needs all fields to save)
  const addNewAddress = () => {
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
      .then(() => {
        //then fetch for full user here
        fetch(`http://localhost:3000/users/${user.token}`)
          .then((response) => response.json())
          .then((data) => {
            if (data.result === false) {
              setMissingAddressInfo(true);
            } else {
              setMissingAddressInfo(false);
              //console.log("true data", data.data);
              dispatch(userStore(data.data));
              setIsEditable(false);
              setUserAddress({
                number: "",
                street: "",
                city: "",
                zipcode: "",
                country: "",
              });
              props.onRequestCloseNewAddress();
            }
          });
      });
  };

  //EDIT EXISTING ADDRESS (doesn't need all fields)
  const saveEditAddress = () => {
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

  //changes for address (sent to child via props)
  const handleAddressChanges = (e) => {
    const newAddresses = { ...userAddress };
    newAddresses[e.target.name] = e.target.value;
    setUserAddress(newAddresses);
  };

  //console.log('props:', props)
  return (
    <div className={styles.container}>
      <div className={styles.formGroup}>
        <label>Numéro</label>
        <input
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
          readOnly={isEditable ? false : "readOnly"}
          type="text"
          placeholder={props.country || "pays"}
          name="country"
          onChange={(e) => handleAddressChanges(e)}
        />
      </div>
      <button onClick={() => handleDeleteAddress()}>
        Delete Address
      </button>
      <button onClick={() => handleEditability()}>Edit</button>
      <button onClick={() => saveEditAddress()}>
        Enregistrer addresse modifié
      </button>
      <button onClick={() => addNewAddress()}>
        Enregistrer nouvel addresse
      </button>
      {missingAddressInfo && missingInfo && <p>Missing information !</p>}
    </div>
  );
}

export default ProfileForm;
