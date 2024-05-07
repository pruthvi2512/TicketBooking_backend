import express from"express";

import mongoose from"mongoose";
import userrouter from "./routes/user-routes.js"
import 'dotenv/config'
import adminrouter from "./routes/admin-routes.js";
import movierouter from "./routes/movie-router.js";
import bookingrouter from "./routes/booking-routes.js";
import Stripe from "stripe"; 
import cors from "cors";
const stripe=Stripe("sk_test_51OqVUtSIYEMswIFxNGak9plEwf3upS3EOxHeOHvVtl4l9Zyj1e9vGDKJCkK5Aq4UDqZgKhn3FRUap8BqAYEh3m7i00aVlKwbfy");

const port=process.env.PORT||3000;
const app=express();
app.use(express.json());

app.use(cors());

app.use("/user",userrouter);
app.use("/admin",adminrouter);
app.use("/movie",movierouter);
app.use("/booking",bookingrouter);

//payment
app.post("/create-checkout-session",async(req,res)=>{
    const {price} = req.body;


   

    const session = await stripe.checkout.sessions.create({
        payment_method_types:["card"],
        line_items: [
            {
              price_data: {
                currency: 'inr',
                product_data: {
                  name: 'Movie',
                },
                unit_amount: price * 100, // Price in cents
              },
              quantity: 1, // Quantity of the product
            },],
        mode:"payment",
        success_url:"http://localhost:5173/sucess",
        cancel_url:"http://localhost:5173/cancel",
    });

    res.json({id:session.id})
 
})
app.listen(port,()=>{
  console.log(process.env.MONGODB_PASSWORD);
  console.log("listning on port");
});



mongoose.connect(process.env.MONGO_URL).then(()=>{ console.log("db connected")
   
}).catch((e)=>console.log(e));






