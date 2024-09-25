import mongoose from "mongoose";

const connectDB = async ()=>{
    mongoose.connection.on('connected', ()=>{
        console.log('DB connected')
    })

    await mongoose.connect(`mongodb+srv://raohanzala70:uce6dmplSO7YbyjN@cluster0.eiwje.mongodb.net/todo-app`)
}

export default connectDB