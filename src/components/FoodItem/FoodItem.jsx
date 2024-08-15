import React, { useState } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'

const FoodItem = (props) => {
  const {id, name, price, description,image} = props.item
  
  // ở đây ta dùng useState như thế này thì nó sẽ
  // tạo ra số useState tương ứng với số sp
  // như thế không tối ưu, thay vào đó 
  // ta chỉ tạo 1 useState làm global app
  // rồi dùng nó để sử dụng cho foodItem này
  // thông qua id của các item
  const [itemCount, setItemCount] = useState(0)

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img src={image} alt="" className="food-item-image" />
        {!itemCount ? (
          <img
            className="add"
            onClick={() => setItemCount((prev) => prev + 1)}
            src={assets.add_icon_white}
          />
        ) : (
          <div className="food-item-counter">
            <img onClick={() => setItemCount(pre => pre - 1)} src={assets.remove_icon_red} alt="" />
            <p>{itemCount}</p>
            <img onClick={() => setItemCount(pre => pre + 1)} src={assets.add_icon_green} alt="" />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
}

export default FoodItem
