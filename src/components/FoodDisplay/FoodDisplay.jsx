import React, { useContext } from 'react'
import './FoodDisplay.css'
import {StoreContext} from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'

// ở đây FoodDisplay là file con của 
// StoreContextProvider hãy xem file main
// để biết thêm. Ta thấy component StoreContextProvider
// bao toàn app rùi.

const FoodDisplay = ({category}) => {
const {food_list} = useContext(StoreContext)

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {food_list.map((item, index) => {
          return (
            <FoodItem
              key={index}
              item = {item}
            />
          );
        })}
      </div>
    </div>
  );
}

export default FoodDisplay
