import { useEffect, useState } from "react"
import Item  from './Item.jsx';

export default function Products(){
const[orderList,setOrderList] = useState([]);

 
useEffect(() => {

  async function load() {
    try {
        const response = await fetch('http://localhost:3000/meals');
        const data = await response.json();
        setOrderList(data);
    } catch(error){
        console.log(error);
    }
}   

    load() 
},[])



return (
  <>
      {orderList && orderList.length > 0 ? (
        <ul id="meals">
          {orderList.map((meal) => (
                <Item 
                key={meal.id}
                meal={meal}
                />
          ))}
        </ul>
      ) : (
        <p>Keine Gerichte gefunden</p>
      )}
  </>
  );
}