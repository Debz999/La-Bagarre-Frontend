

function Articleliste({model, photos9, description} ){

const photos= photos9.map((photo, i)=>{
    return(<img key={i} src={photo} alt={model}/>)

})

    return(
        <li>
            <h3>{model}</h3>
            <div>{photos}</div>
            <p>{description}</p>



        </li>
    )
}

export default Articleliste;