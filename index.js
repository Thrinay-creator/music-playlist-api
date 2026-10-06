const express=require("express");
const dotenv=require("dotenv");
const connectDB=require("./config/db");
const errorHandler=require("./middleware/errorHandler");
const  songsRoute=require("./routes/songs");

const router=express();

dotenv.config();
router.use(express.json())
const port=process.env.PORT || 4000;

router.get("/",(req,res)=>{
    res.status(200).json("It is working Succesfully");
});

router.use("/songs",songsRoute);




router.use((req, res) => {
    res.status(404).json({
        message: "Page not found"
    })
});

router.use(errorHandler);


router.listen(port,()=>{
    connectDB();
        console.log("server listening on port : "+port);
});