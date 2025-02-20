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
  let profile = user.profile;
  const [userData, setUserData] = useState({
    firstname: profile.firstname || "",
    lastname: profile.lastname || "",
    email: profile.email || "",
  });

  // const [userAddress, setUserAddress] = useState({
  //   number: profile.address?.number || "",
  //   street: profile.address?.street || "",
  //   city: profile.address?.city || "",
  //   zipcode: profile.address?.zipcode || "",
  //   country: profile.address?.country || "",
  // });
  const [isBaseEditable, setBaseIsEditable] = useState(false);
  const [isNewAddressForm, setIsNewAddressForm] = useState(false);

  //console.log(user);

  // // Get existing user profile on click modify
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
        console.log(data);
        //data.data.email is undefined
        if (!data.data.email) {
          //setIsEditable(true);
          setBaseIsEditable(true);
        }
        //console.log("firstData", data);
        dispatch(userStore(data.data));
        setUserData(data.data);
        //SET PROVISIONAL DATA IN USE STATE OR IN REDUCE ?
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

  // //ADD NEW ADDRESS
  // const addNewAddress = () => {
  //   fetch(`http://localhost:3000/users/newaddress/${user.token}`, {
  //     method: "PUT",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       number: userAddress.number,
  //       street: userAddress.street,
  //       city: userAddress.city,
  //       zipcode: userAddress.zipcode,
  //       country: userAddress.country,
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then(() => {
  //       //then fetch for full user here
  //       fetch(`http://localhost:3000/users/${user.token}`)
  //         .then((response) => response.json())
  //         .then((data) => {
  //           if (data.result === false) {
  //             setMissingAddressInfo(true);
  //           } else {
  //             setMissingAddressInfo(false);
  //             //console.log("true data", data.data);
  //             dispatch(userStore(data.data));
  //           }
  //         });
  //     });
  // };

  const handleSaveInfo = () => {
    addUserInfo();
    //router.push("/");
    setBaseIsEditable(false);
  };

  // //EDIT EXISTING ADDRESS   how to save edited fields and save the previous ones---------- to do, maybe get only one address to become editable
  // const saveEditAddress = () => {
  //   fetch(`http://localhost:3000/users/editaddress/${user.token}`, {
  //     method: "PUT",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       number: userAddress.number,
  //       street: userAddress.street,
  //       city: userAddress.city,
  //       zipcode: userAddress.zipcode,
  //       country: userAddress.country,
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then(() => {
  //       //then fetch for full user here
  //       fetch(`http://localhost:3000/users/${user.token}`)
  //         .then((response) => response.json())
  //         .then((data) => {
  //           if (data.result === false) {
  //             setMissingAddressInfo(true);
  //           } else {
  //             setMissingAddressInfo(false);
  //             console.log("secondData", data.data);
  //             dispatch(userStore(data.data));
  //             setBaseIsEditable(false);
  //           }
  //         });
  //     });
  // };

  // //DELETE one address
  // const handleDeleteAddress = (addressId) => {
  //   console.log(addressId)
  //   fetch(`http://localhost:3000/users/deleteaddress/${user.token}`, {
  //     method: "DELETE",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ _id: addressId }),
  //   })
  //     .then((response) => response.json())
  //     .then(() => {
  //       //console.log('checking delete')
  //       fetch(`http://localhost:3000/users/${user.token}`)
  //         .then((response) => response.json())
  //         .then((data) => {
  //           console.log(data);
  //           dispatch(userStore(data.data));
  //         });
  //     });
  // };

  //changes for name and email
  const handleChanges = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // //changes for address (sent to child via props)
  // const handleAddressChanges = (e) => {
  //   const newAddresses = { ...userAddress };
  //   newAddresses[e.target.name] = e.target.value;
  //   setUserAddress(newAddresses);
  // };

  const addProfileForm = () => {
    setIsNewAddressForm(true);
  };

  const onRequestCloseNewAddress = () => {
    setIsNewAddressForm(false)
  };

  //maps all user's addresses
  let allAddresses =
    user.profile.address?.map((data, index) => {
      //console.log(data);
      return <ProfileForm key={index} index={index} {...data} />;
    }) || [];

  return (
    <div className={styles.main}>
      <h1>Profil</h1>
      <div className={styles.container}>
        <h3 className={styles.subtitle}>Vos informations</h3>
        <div className={styles.formGroup}>
          <label>Prénom*</label>
          <input
            readOnly={isBaseEditable ? false : "readOnly"}
            type="text"
            placeholder={user.profile.firstname || "prénom"}
            name="firstname"
            onChange={(e) => handleChanges(e)}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Nom*</label>
          <input
            readOnly={isBaseEditable ? false : "readOnly"}
            type="text"
            placeholder={user.profile.lastname || "nom"}
            name="lastname"
            onChange={(e) => handleChanges(e)}
          />
        </div>
        <div className={styles.formGroup}>
          <label>E-mail*</label>
          <input
            readOnly={isBaseEditable ? false : "readOnly"}
            type="text"
            placeholder={user.profile.email || "e-mail"}
            name="email"
            onChange={(e) => handleChanges(e)}
          />
        </div>
        <button className={styles.button} onClick={() => handleSaveInfo()}>
          Sauvegarder mon profil
        </button>
        <h3 className={styles.subtitle}>Votre adresse livraison</h3>
        {allAddresses.length > 0 && allAddresses}

        {isNewAddressForm || allAddresses.length == 0 && (
          <ProfileForm onRequestCloseNewAddress={onRequestCloseNewAddress} />
        )}
        <div className={styles.buttonContainer}>
          <button onClick={() => addProfileForm()}>+</button>
        </div>
      </div>
    </div>
  );
}

export default Profil;
