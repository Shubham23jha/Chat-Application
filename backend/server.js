const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const { chats } = require("./data/data");
const app = express();


dotenv.config();
app.use(cors());
app.use(express.json());



connectDB()
.then(()=>{
    app.on("error",(err)=>{
      console.log("Error connecting",err);
      throw err;
    })
    app.listen(process.env.PORT||8080,()=>{
      console.log(`Connecting to ${process.env.Port}`);
    });
})
.catch((err)=>{
    console.log("Error connecting to database",err);
})





app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);


app.use(notFound);
app.use(errorHandler);




