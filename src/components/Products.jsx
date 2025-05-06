import { useEffect, useState } from "react"
import Item  from './Item.jsx';

export default function Products(){
const[orderList,setOrderList] = useState([]);

async function load() {
    try {
        const response = await fetch('./backend/data/available-meals.json');
        const data = await response.json();
        setOrderList(data);
    } catch(error){
        console.log(error);
    }
}    

useEffect(() => {
    load() 
},[])



return (
    <div id="meals">
      {orderList && orderList.length > 0 ? (
        <ul>
          {orderList.map((meal, index) => (
            <li key={index}>
                <Item 
                    image={meal.image} 
                    name={meal.name} 
                    price={meal.price} 
                    description={meal.description}/>
            </li> 
          ))}
        </ul>
      ) : (
        <p>Keine Gerichte gefunden</p>
      )}
    </div>
  );
}