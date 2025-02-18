import styles from "../styles/Profil.module.css";

function ProfileForm(props) {

console.log('props:', props)
  return (
      <div className={styles.container}>
      <div className={styles.formGroup}>
        <label>Numéro</label>
        <input
          readOnly={props.isEditable ? false : "readOnly"}
          type="text"
          placeholder={props.number || "numéro"}
          name="number"
          onChange={(e) => props.handleAddressChanges(e, props.index)}
        />
      </div>
      <div className={styles.formGroup}>
        <label>Rue</label>
        <input
          readOnly={props.isEditable ? false : "readOnly"}
          type="text"
          placeholder={props.street || "rue"}
          name="street"
          onChange={(e) => props.handleAddressChanges(e, props.index)}
        />
      </div>
      <div className={styles.formGroup}>
        <label>Ville</label>
        <input
          readOnly={props.isEditable ? false : "readOnly"}
          type="text"
          placeholder={props.city || "ville"}
          name="city"
          onChange={(e) => props.handleAddressChanges(e, props.index)}
        />
      </div>
      <div className={styles.formGroup}>
        <label>Code postal</label>
        <input
          readOnly={props.isEditable ? false : "readOnly"}
          type="text"
          placeholder={props.zipcode || "code postal"}
          name="zipcode"
          onChange={(e) => props.handleAddressChanges(e, props.index)}
        />
      </div>
      <div className={styles.formGroup}>
        <label>Pays</label>
        <input
          readOnly={props.isEditable ? false : "readOnly"}
          type="text"
          placeholder={props.country || "pays"}
          name="country"
          onChange={(e) => props.handleAddressChanges(e, props.index)}
        />
      </div>
      <button onClick={() => props.handleDeleteAddress(props._id)} >Delete Address</button>
      </div>
  );
}

export default ProfileForm;
