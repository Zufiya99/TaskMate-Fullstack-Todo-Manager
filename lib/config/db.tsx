// import mongoose from "mongoose"

// export const connectDB = async () =>{
//     await mongoose.connect("mongodb+srv://idrisizufiya:zufiyatodoList@todo-list.u3dzu.mongodb.net/todo-app")
//     console.log("DB connected!");
    
// }

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("DB connected!");
    } catch (error) {
        console.error("DB connection error:", error);
    }
};
