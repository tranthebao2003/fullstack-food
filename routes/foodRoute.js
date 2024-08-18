import express from 'express'
import { addFood, listFood, removeFood} from '../controllers/foodController.js'
import multer from 'multer'

const foodRouter = express.Router()

// Image Storage config
// filename: (req, file, callback) => { ... }: Chức năng này xác định tên 
// của tệp sau khi nó được tải lên. Nó sử dụng một callback để tạo ra tên tệp mới.
// Date.now() tạo ra một dấu thời gian (timestamp) để đảm bảo tên tệp là duy nhất.
// file.originalname là tên gốc của tệp khi nó được tải lên.
// Tên tệp cuối cùng sẽ là một chuỗi kết hợp giữa dấu thời gian
//  và tên gốc của tệp, ví dụ: 1623748393837myimage.jpg
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, callback) => {
        // null có nghĩa là "không có lỗi", và nó được sử dụng để đảm 
        // bảo rằng quy trình tiếp tục một cách suôn 
        // sẻ sau khi tên tệp đã được xác định.
        return callback(null, `${Date.now()}${file.originalname}`)
    }
})

// upload: Đây là một instance của Multer, được cấu hình để 
// sử dụng storage mà bạn đã thiết lập ở bước trước.
// Từ đây, upload sẽ có các phương thức để xử lý 
// việc tải lên tệp, với cấu hình cụ thể về nơi và
// cách thức lưu trữ tệp.
const upload = multer({storage: storage})

// upload.single("image"): Đây là middleware của Multer, 
// được sử dụng để xử lý một tệp duy nhất từ form HTML.
// "image" là tên của trường input file trong form HTML. 
// Multer sẽ tìm trường này trong request và xử lý tệp tải lên liên quan.
// Sau khi xử lý, tệp sẽ được lưu trữ theo cấu hình đã thiết lập (storage), 
// và thông tin về tệp sẽ được thêm vào request object dưới dạng req.file
foodRouter.post("/add", upload.single("image"), addFood)
foodRouter.get("/list", listFood)
foodRouter.post("/remove", removeFood)

export default foodRouter