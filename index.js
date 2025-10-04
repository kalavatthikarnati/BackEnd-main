
import express from 'express';

import cors from 'cors';
import { connectDB } from './Config/db.js';
import foodRouter from './Routes/foodRoute.js';
import userRouter from './Routes/userRoute.js';
import 'dotenv/config'
import cartRouter from './Routes/cartRoute.js';
import orderRouter from './Routes/orderRoute.js';

// app config
const app = express();
app.use(express.json());
const port = 4000;
// middleware
const allowedOrigins = ["http://localhost:5173", "http://localhost:5174","https://front-end-project2-neon.vercel.app","https://admin-gamma-sandy.vercel.app"];
//const allowedOrigins = ["https://frontend-project-8qsv.onrender.com"];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));




//database connection
connectDB();

//api end point


app.use('/api/food',foodRouter);
// CORS for image routes
//app.options('/images/*', cors());  // Handles preflight for images
//app.use('/images', cors(), express.static('uploads'));


app.use("/images",express.static("uploads"));
app.use('/api/user',userRouter);
app.use("/api/cart", cartRouter);
app.use('/api/order',orderRouter);



app.get("/",(req,res)=>{
    res.send("API working");
})




app.listen(port, ()=>{
    console.log(`server started on http://localhost:${port}`);
})

