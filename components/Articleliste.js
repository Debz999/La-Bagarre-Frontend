

function Articleliste({model, photo9, description} ){



    return(
        <li>
            <h3>{model}</h3>
            <img src={photo9} alt={model}/>
            <p>{description}</p>



        </li>
    )
}

export default Articleliste;