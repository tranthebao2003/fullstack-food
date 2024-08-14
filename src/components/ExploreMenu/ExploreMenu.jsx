import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'

const ExploreMenu = ({category, setCategory}) => {
  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore our menu</h1>
      <p className='explore-menu-text'>
        Choose from a diverse menu featuring a delectabel array of dishes of
        dishes crafted with the finest ingredients and culinary expertise. Our
        mission is to satisfy your cravings and elevate your dining experience,
        one delicious meal at a time
      </p>
      <div className="explore-menu-list">
        {/* index được tạo tự động 
        không được đảo ngược vị trí
        của item và index*/}
        {menu_list.map((item, index) => {
            return (
              <div
                onClick={() =>
                  setCategory((prev) =>
                    prev === item.menu_name ? "All" : item.menu_name
                  )
                }
                key={index}
                className="explore-menu-list-item"
              >
                <img
                  className={category === item.menu_name ? "active" : ""}
                  src={item.menu_image}
                  alt=""
                />

                <p>{item.menu_name}</p>
              </div>
            );
        })}
      </div>
      {/* 
        Thẻ <hr /> trong HTML là viết tắt của 
        "horizontal rule" và được sử dụng để 
        chèn một đường kẻ ngang trên trang web. 
        Đường kẻ này thường được sử dụng để phân 
        chia nội dung hoặc tạo sự ngắt đoạn trong
         văn bản. 
      */}
      <hr />
    </div>
  );
}

export default ExploreMenu
