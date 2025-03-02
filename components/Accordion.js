import styles from "../styles/Accordion.module.css";
import { useState } from "react";

function Accordion({description}) {
  const [isOpen, setIsOpen] = useState(false);
  //console.log(description)

  return (
    <div className={styles.container}>
    <button
      className={styles.accordionButton}
      onClick={() => setIsOpen(!isOpen)}
    >
      DESCRIPTION
      <span>{isOpen ? "-" : "+"}</span>
    </button>
    {isOpen && <p className={styles.accordionContent} style={{ whiteSpace: "pre-line" }} >{description}</p>}
  </div>
  )
}

export default Accordion;
