import React, { useState, useContext} from 'react'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDownload from '../../components/AppDownload/AppDownload'
import { StoreContext } from '../../context/StoreContext'
import ReactPaginate from 'react-paginate'
import {ProgressBar} from 'react-loader-spinner'
import './Home.css'

const Home = () => {
  const [category, setCategory] = useState("All")
  const {food_list, loading} = useContext(StoreContext)

  const progressBar = 120

  const [itemOffset, setItemOffset] = useState(0)
  const itemsPerPage = 10
  const endOffset = itemOffset + itemsPerPage
  const currentItems = food_list?.slice(itemOffset, endOffset)
  const pageCount = Math.ceil(food_list?.length/itemsPerPage)

  const handlePageClick = (event) => {
    const newOffset = (event.selected *itemsPerPage) % food_list?.length
    setItemOffset(newOffset)
  }

  // vì ở đây số lượng món ăn thường không quá nhiều 
  // nên mình nên phân trang ở frontend để tăng 
  // user experience, vì user chỉ cần chờ 1 lần

  // còn như đơn hàng thường rất lớn thì mềm nên phân trang 
  // ở backend (trong phần order ở admin) để dễ dàng xử
  // lí số liệu

  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      {loading === true ? (
        <div className="loading">
          <ProgressBar
            barColor="#fd6348"
            width={`${progressBar}`}
            height={`${progressBar}`}
          />
        </div>
      ) : (
        <FoodDisplay category={category} currentItems={currentItems} />
      )}

      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={4}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        className="page"
      />
      <AppDownload />
    </div>
  );
}

export default Home
