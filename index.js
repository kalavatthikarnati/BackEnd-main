
import express from 'express';

import cors from 'cors';
import { connectDB } from './Config/db.js';
import foodRouter from './Routes/foodRoute.js';
import userRouter from './Routes/userRoute.js';
import 'dotenv/config'
import cartRouter from './Routes/cartRoute.js';

// app config
const app = express();

const port = 4000;
// middleware
app.use(express.json());
app.use(cors())

//database connection
connectDB();

//api end point

app.use('/api/food',foodRouter);
app.use("/images",express.static("uploads"));
app.use('/api/user',userRouter);
app.use("/api/cart", cartRouter);



app.get("/",(req,res)=>{
    res.send("API working");
})




app.listen(port, ()=>{
    console.log(`server started on http://localhost:${port}`);
})

