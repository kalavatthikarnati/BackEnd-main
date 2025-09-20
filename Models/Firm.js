import mongoose from "mongoose";
const firmSchema = new mongoose.Schema({
    firmName:{
        type:String, 
        required :true,
        unique:true
    },

    area:{
        type:String,
         required: true
    },
    category:{
        type:[
            {
                type:String,
                enum:['veg','non-veg']
            }
        ]
    },
    region:{
        type:[
            {
                type:String,
                enum:['south-india','north-india','chinese','Bakery']
            }
        ]
    },
    offer:{
        type:String,
    },
    image:{
        type:String,
    },
})