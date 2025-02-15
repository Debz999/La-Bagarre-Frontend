import styles from "../styles/Profil.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userStore } from "../reducers/user";
import { useRouter } from "next/router";

function ProfileForm(props) {
  //make dynamic form with number of inputs equal the number of elements in my DB

  return (
    <div className={styles.main}>
      {" "}
      <div className={styles.formGroup}>
        <label>Numéro</label>
        <input
          readonly={props.isEditable ? false : "readonly"}
          type="text"
          placeholder={props.number}
          name="number"
          onChange={(e) => handleChanges(e)}
        />
      </div>
      <div className={styles.formGroup}>
        <label>Rue</label>
        <input
          readonly={props.isEditable ? true : "readonly"}
          type="text"
          placeholder={props.street}
          name="street"
          onChange={(e) => handleChanges(e)}
        />
      </div>
      <div className={styles.formGroup}>
        <label>Ville</label>
        <input
          readonly={props.isEditable ? true : "readonly"}
          type="text"
          placeholder={props.city}
          name="city"
          onChange={(e) => handleChanges(e)}
        />
      </div>
      <div className={styles.formGroup}>
        <label>Code postal</label>
        <input
          readonly={props.isEditable ? true : "readonly"}
          type="text"
          placeholder={props.zipcode}
          name="zipcode"
          onChange={(e) => handleChanges(e)}
        />
      </div>
      <div className={styles.formGroup}>
        <label>Pays</label>
        <input
          readonly={props.isEditable ? true : "readonly"}
          type="text"
          placeholder={props.country}
          name="country"
          onChange={(e) => handleChanges(e)}
        />
      </div>
    </div>
  );
}

export default ProfileForm;
