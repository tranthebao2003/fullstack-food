import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import { url } from '../../assets/assets'
import { toast } from 'react-toastify'

const List = () => {
  const [list, setList] = useState([])
  

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`)
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error(response.data.error)
    }
  }

  const removeFood = async (foodId) => {
    const respone = await axios.post(`${url}/api/food/remove`, {id: foodId})
    if(respone.data.success){
      toast(respone.data.message)
    } else{
      toast(respone.data.error)
    }
  }

  useEffect(() => {
    fetchList()
  }, [list])

  return (
    <div className="list add flex-cold">
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <h3>Image</h3>
          <h3>Name</h3>
          <h3>Category</h3>
          <h3>Price</h3>
          <h3>Action</h3>
        </div>
        {list.map((item, index) => {
          return(
            <div key={index} className='list-table-format'>
              <img src={`${url}/images/${item.image}`} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p onClick = {() => removeFood(item._id)} className='cursor'>X</p>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default List
