

export default function Item({ image , name, price, description }){

    return(
<div className="meal-item">
  <img src={image} alt={name} />
  <h3>{name}</h3>
  <p>{description}</p>
  <p>Preis: {price}€</p>
</div>
    )
}