const express = require("express")
const {auth, admin} = require("../middleware/auth")
const productController = require("../controllers/productController")

const multer = require("multer")

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "uploads/")
    },

    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({storage: storage})

const router = express.Router()

router.post("/", auth, upload.single("img"), productController.createProduct)
router.put("/:id", upload.single("img"), productController.updateProduct)
// router.get("/:id", productController.getSingleProduct).
router.get("/", productController.getAllProduct)
router.get("/featured", productController.getFeaturedProducts)
router.get("/topSelling", productController.getTopSellingProducts)
router.delete("/:id", upload.single("img"), productController.deleteProduct)

module.exports = router