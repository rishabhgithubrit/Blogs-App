import  express  from "express";
import mongoose from "mongoose";
import router from "./routes/user-routes.js";
import blogRouter from "./routes/blog-routes.js";
import cors from "cors"
const app  = express();
app.use(cors())
app.use(express.json())
app.use("/api/user",router)
app.use("/api/blog",blogRouter)
mongoose.connect("mongodb+srv://rishabhnigam491:Rishabh123@cluster0.hsmmrtg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
// mongoose.connect("mongodb://localhost:27017/mydatabase",{useUnifiedTopology: true})
.then(()=>app.listen(5000))
.then(()=>console.log("Connected TO Database and Listening TO Localhost 5000"))
.catch((err)=>console.log(err))
app.use("/api",(req,res,next)=>{
     res.send("Hello world")
})
