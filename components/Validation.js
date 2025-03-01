import { useDispatch, useSelector } from "react-redux";


function Validation() {

    const user = useSelector((state) => state.user.value);

  return (
    <div>
      <h2>Merci pour votre commande {user.username} </h2>
      <p>Veuillez vérifier les informations ci-dessous : </p>

    </div>
  );
}

export default Validation;
