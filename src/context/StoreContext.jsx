import { createContext } from "react";
import { food_list } from "../assets/assets";

// sử dụng useContext để truyền dữ liệu từ
// cha sang con
export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {
    const contextValue = {
      food_list
    };

    // value dùng để chứa dữ liệu, khi muốn dùng 
    // dữ liệu này ở file khác (file con nha)
    // thì dùng useContext ở file con đó
    return(
        <StoreContext.Provider value={contextValue}>
            {/* props.children sẽ chứa all phần tử nằm trong 
            thẻ mở <StoreContextProvider> và thẻ đóng
            </StoreContextProvider> khi ta sử dụng component này*/}
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider