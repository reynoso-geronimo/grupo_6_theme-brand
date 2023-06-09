const express = require('express');
const router = express.Router()
const userController = require('../controllers/userController.js');
const path = require('path');
const multer = require('multer')
validateAvatar = require('../middlewares/avatarMiddleware.js')


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname, '../../public/images/avatar'))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + Math.round(Math.random() * 1E9)

    cb(null, uniqueSuffix + path.extname(file.originalname))
  }
});
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {

      req.fileValidationError = "Solo formato png, jpg o jpeg estan permitidos";
      return cb(null, false, req.fileValidationError);

    }
  }
})


// login
router.get("/login", userController.loginForm);
router.get("/logout", userController.logout);
router.post("/login", userController.loginProcess);

// register
router.get("/register", userController.registerForm);
router.post("/register", upload.single('avatar'),validateAvatar,userController.processRegister);


router.get("/profile", userController.perfil);
router.get("/admin", userController.adminPanel);
router.get("/cart", userController.cart);

module.exports = router