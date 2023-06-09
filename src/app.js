const express = require("express");
const path = require("path");
const methodOverride = require('method-override');
const home = require('./routes/home.js');
const product = require('./routes/product.js');
const user = require('./routes/user.js');
const session = require("express-session");
const cookie = require("cookie-parser");
const cookieUsuario = require("./middlewares/cookieMiddleware.js");






const port = 3006


const app = express();

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(methodOverride('_method'))

app.set("view engine", "ejs")
app.set('views', path.resolve(__dirname,'../views'))
app.use(express.static(path.resolve(__dirname, "./../public")));

app.use(session({
  secret: "nuestro secreto",
  resave: false,
  saveUninitialized: false
}))

app.use(cookie());
app.use(cookieUsuario);

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});

app.use(home)
app.use('/product', product)
app.use('/user', user)


app.use((req,res, next)=>{
  res.status(404).sendFile(path.resolve(__dirname,'../public/images/cumbia-404.jpg'))
})

