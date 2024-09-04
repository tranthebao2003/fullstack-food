import axios from "axios";
import { createContext, useEffect, useState } from "react";
import axiosInstance from "../utility/axiosInstance";
import { baseURL } from "../utility/axiosInstance";

// sử dụng useContext để truyền dữ liệu từ
// cha sang con
export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const [token, setToken] = useState('')
    const [food_list, setFoodList] = useState([])

    const [loading, setLoading] = useState(false)
    const [loadingLogin, setLoadingLogin] = useState(false)

    const [signup, setSignup] = useState(false)
    const [loadingSignup, setLoadingSignup] = useState(false)

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
    const addToCart = async (itemId) => {
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
        if(token) {
            // bắt buộc phải có dấu {} bao token nha
            await axiosInstance.post(`/api/cart/add`, {itemId: itemId})
        }
    }

    const removeFromCart = async(itemId) => {
        // ở đây mình ko cần bắt if giống như trên
        // bởi vì để hiện giao diện nút xóa thì
        // bắt buộc trước đó phải thêm ít nhất 1 item rồi
        // mà như thế là đã có key rồi
        setCartItems((prev) => ({...prev, [itemId]: prev[itemId] - 1}))
        if(token){
            await axiosInstance.post(`/api/cart/remove`, {itemId: itemId})
        }
    }

    const loadCartData = async (token) => {
        // cái này bắt buộc phải xét headers riêng bởi vì nếu
        // dùng axiosInstance như những thằng trên thì lúc
        // này nó sẽ chưa có headers nên sẽ lỗi
        const response = await axios.get(`${baseURL}/api/cart/get`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            }
        })
        if(!response.data.cartData){
            setCartItems({})
        } else{
            setCartItems(response.data.cartData)
        }
        
    }

    // test carItems
    // useEffect(() => {
    //     console.log(cartItems)
    // }, [cartItems])

    const getTotalCartAmount = () => {
        let totalAmount = 0
        // Vòng lặp for...in được sử dụng để lặp 
        // qua các key của một đối 
        // tượng trong JavaScript. item
        // là những key trong object cartItems
        for(const item in cartItems){
            if (cartItems[item] > 0) {
              // trả về object thỏa đk
              let itemInfo = food_list.find((product) => product._id === item);
              totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount
    }

    const fetchFoodList = async () => {
        setLoading(true)
        const response = await axiosInstance.get(`/api/food/list`)
        setFoodList(response.data.data)
        setLoading(false)
    }

    useEffect(() => {
        async function loadData() {
            await fetchFoodList()
            if(localStorage.getItem('token')){
                setToken(localStorage.getItem("token"))
                await loadCartData(localStorage.getItem("token"))
            }
        }

        loadData()
    },[])

    // object thông thường chứa 
    // các cặp key-value. Tuy nhiên, trong 
    // JavaScript, có một cú pháp đặc biệt
    // gọi là "Shorthand Property Names" cho 
    // phép bạn viết gọn khi key và value có cùng tên.
    // nghĩa là nếu key, value cùng tên thì mình
    // cần viết 1 cái thôi là được
    const contextValue = {
      food_list,
      cartItems,
      setCartItems,
      loadCartData,
      addToCart,
      removeFromCart,
      getTotalCartAmount,
      token,
      setToken,
      loading,
      setLoading,
      loadingLogin,
      setLoadingLogin,
      signup,
      setSignup,
      loadingSignup,
      setLoadingSignup
    };

    // value dùng để chứa dữ liệu, khi muốn dùng 
    // dữ liệu này ở file khác (file con nha)
    // thì dùng useContext ở file con đó

    /* tóm tắt: thay vì thẻ con phải nằm trực tiếp
    trong thẻ cha rồi thẻ cha trả về, khi đó cha
    có thể truyền props cho con 1 cách dễ dàng (Home.jsx)
    thì ở đây thay vì làm thế thì mình dùng {props.children}
    đại diện cho all phần tử mà được thẻ <StoreContextProvider>
    </StoreContextProvider> bao bọc cụ thể trong file main.css
    mà file này là cấp cao nhất của toàn app điều đó có nghĩa
    những file còn lại đều có thể sử dụng data từ file cha cung
    cấp bằng cách dùng useContext. Thay vì bao thẻ còn bằng div
    giống như (Header.jsx) thì mình bao bằng <StoreContext.Provider>
    </StoreContext.Provider> để cung cấp data cho thẻ con*/
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider