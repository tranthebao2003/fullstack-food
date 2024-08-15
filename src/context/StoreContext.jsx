import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";

// sử dụng useContext để truyền dữ liệu từ
// cha sang con
export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

// Quản lý tập trung: Thay vì sử dụng 30 useState để quản lý số lượng của 30 sản phẩm, 
// bạn chỉ cần một useState duy nhất (cartItems). Điều này giúp mã nguồn gọn gàng và dễ 
// quản lý hơn, đặc biệt khi số lượng sản phẩm tăng lên.
// Sử dụng ID sản phẩm làm khóa: Sử dụng itemId làm khóa trong đối tượng cartItems 
// giúp dễ dàng truy cập và cập nhật số lượng của từng sản phẩm.
// Tránh cập nhật lại toàn bộ trạng thái: Bằng cách chỉ cập nhật phần 
// của đối tượng liên quan đến sản phẩm cụ thể, bạn tránh được việc phải 
// cập nhật toàn bộ trạng thái, cải thiện hiệu năng.
// Mở rộng dễ dàng: Nếu sau này bạn cần quản lý nhiều hơn về sản phẩm 
// (ví dụ như giá, tên sản phẩm), bạn chỉ cần thêm các thuộc tính mới 
// vào đối tượng cartItems.
// vì sao có dấu [] trong object hì đọc phần note liên quan đến dynamic key,
// dấu [] cực kì quan trọng, vì nếu ko có nó thì sẽ tạo ra static key nghĩa
// là object sẽ thêm 1 key cứng là itemId
    const [cartItems, setCartItems] = useState({})
    const addToCart = (itemId) => {
        // !cartItems[itemId]: check xem key (giá trị itemId truyền vào)
        // có tồn tại trong object không, cái value của itemId luôn
        // phải là string
        if(!cartItems[itemId]){
            // nếu nó chưa tồi tại thì thêm dynamic key vào
            setCartItems((prev) => ({...prev, [itemId] : 1}))
        }
        else{
            // nếu nó tồn tại rồi thì mình tạo lại object
            // rồi lôi key ra rồi lấy giá trị key đó Tăng thêm 1
            // sau đó ghi đè giá trị đó lên key
            // link vd simple: https://playcode.io/1961695
            setCartItems((prev) => ({...prev, [itemId]:prev[itemId]+1}))
        }
    }

    const removeFromCart = (itemId) => {
        // ở đây mình ko cần bắt if giống như trên
        // bởi vì để hiện giao diện nút xóa thì
        // bắt buộc trước đó phải thêm ít nhất 1 item rồi
        // mà như thế là đã có key rồi
        setCartItems((prev) => ({...prev, [itemId]: prev[itemId] - 1}))
    }

    // test carItems
    // useEffect(() => {
    //     console.log(cartItems)
    // }, [cartItems])

    const contextValue = {
      food_list,
      cartItems,
      setCartItems,
      addToCart,
      removeFromCart
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