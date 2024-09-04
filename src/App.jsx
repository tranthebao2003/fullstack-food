import React, { useContext } from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginPopup from './components/LoginPopup/LoginPopup'
import { StoreContext } from './Context/StoreContext'


const App = () => {
  const {token} = useContext(StoreContext)

  return (
    <>
      <ToastContainer />
      {!token? (
        <LoginPopup />
      ) : (
        <>
          <Navbar />
          <hr />

          <div className="app-content">
            <Sidebar />
            <Routes>
              <Route path="/" element={<Add />} />
              <Route path="/add" element={<Add />} />
              <Route path="/list" element={<List />} />
              <Route path="/orders" element={<Orders />} />
            </Routes>
          </div>
        </>
      )}
    </>
  );
}

export default App
