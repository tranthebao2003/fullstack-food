import { createContext, useEffect, useState } from "react";

// sử dụng useContext để truyền dữ liệu từ
// cha sang con
export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {
    // const url = 'https://fullstack-food-backend.onrender.com'
    const url = 'http://localhost:4000'
    const [token, setToken] = useState('')

    const [loadingLogin, setLoadingLogin] = useState(false)


    useEffect(() => {
        async function loadData() {
            if(localStorage.getItem('token')){
                setToken(localStorage.getItem("token"))
            }
        }

        loadData()
    },[])

    const contextValue = {
        url,
        token,
        setToken,
        loadingLogin,
        setLoadingLogin
      };
  
      return(
          <StoreContext.Provider value={contextValue}>
              {props.children}
          </StoreContext.Provider>
      )
}

export default StoreContextProvider