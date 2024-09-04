import React, { useContext } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { baseURL } from '../../utility/axiosInstance'
import { StoreContext } from '../../context/StoreContext'

const FoodItem = (props) => {
  const {_id, name, price, description,image} = props.item
  
  // ở đây ta dùng useState như thế này thì nó sẽ
  // tạo ra số useState tương ứng với số sp
  // như thế không tối ưu, thay vào đó 
  // ta chỉ tạo 1 useState làm global app
  // rồi dùng nó để sử dụng cho foodItem này
  // thông qua _id của các item
  const { cartItems, addToCart, removeFromCart} = useContext(StoreContext);

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img src={`${baseURL}/images/${image}`} alt="" className="food-item-image" />
        {!cartItems[_id] ? (
          <img
            className="add"
            onClick={() => addToCart(_id)}
            src={assets.add_icon_white}
          />
        ) : (
          <div className="food-item-counter">
            <img onClick={() => removeFromCart(_id)} src={assets.remove_icon_red} alt="" />
            <p>{cartItems[_id]}</p>
            <img onClick={() => addToCart(_id)} src={assets.add_icon_green} alt="" />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">{price} Đ</p>
      </div>
    </div>
  );
}

export default FoodItem
