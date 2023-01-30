require("dotenv").config();
const express = require("express");
const dbConnection = require("./config/db");
const cors=require("cors")
const app = express();
const userRouter=require("./Routes/user")
// {================================================MIDDLE_WARE==============================}
app.use(cors())
app.use(express.json());
app.use("/",userRouter)




app.listen(process.env.PORT, async () => {
    try {
      await dbConnection();
      console.log("Connected to database successfully");
    } catch (error) {
      console.log("Not connected to database", error);
      console.log("Something went wrong while connecting to database");
    }
    console.log(`server is running at http://localhost:${process.env.PORT}`);
  });
  