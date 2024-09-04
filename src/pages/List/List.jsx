import React, { useEffect, useState } from 'react'
import './List.css'
import axiosInstanceAdmin from '../../../utilities/axiosInstanceAdmin'
import { toast } from 'react-toastify'
import ReactPaginate from 'react-paginate'
import { url } from '../../assets/assets'

const List = () => {
  const [list, setList] = useState([])
  
  const [itemOffset, setItemOffset] = useState(0)
  const itemsPerPage = 8
  const endOffset = itemOffset + itemsPerPage
  const currentItems = list.slice(itemOffset, endOffset)
  const pageCount = Math.ceil(list.length/itemsPerPage)

  const handlePageClick = (event) => {
    const newOffset = (event.selected *itemsPerPage) % list.length
    setItemOffset(newOffset)
  }

  const fetchList = async () => {
    const response = await axiosInstanceAdmin.get(`/api/food/list`)
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error(response.data.error)
    }
  }

  const removeFood = async (foodId) => {
    const respone = await axiosInstanceAdmin.post(`/api/food/remove`, {id: foodId})
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
        {currentItems.map((item, index) => {
          return(
            <div key={index} className='list-table-format'>
              <img src={`${url}/images/${item.image}`} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.price} Đ</p>
              <p onClick = {() => removeFood(item._id)} className='cursor'>X</p>
            </div>
          )
        })}
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={4}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        className='page'
      />
    </div>
      
  );
}

export default List
