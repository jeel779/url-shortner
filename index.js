const express=require('express');
const path=require('path')
const app=express();
const urlRouter=require("./routes/url.js")
const staticRouter=require('./routes/staticRouter.js')
const userRouter=require("./routes/user.js")
const cookieParser=require("cookie-parser")
const PORT=8000;
const { restrictToLoggedinUserOnly,checkAuth }=require("./middlewares/auth")
const { connectMongoDb }=require('./connect.js')

connectMongoDb("mongodb://localhost:27017/urlshortnerdb")
.then(()=>{
    console.log("Connected to MongoDB");
})
.catch((err)=>{
    console.log("Error connecting to MongoDB",err);
})

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.set("view engine","ejs")
app.set("views",path.resolve("./views"))

app.use("/url",restrictToLoggedinUserOnly,urlRouter)
app.use("/user",userRouter) 
app.use("/",checkAuth,staticRouter)

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})