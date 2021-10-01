import mongoose from 'mongoose'

const MONGO_URI = "mongodb+srv://shinhee:melatonin@shinhee.fglsw.mongodb.net/hasheduser2?retryWrites=true&w=majority"

mongoose.connect(MONGO_URI)
.then(() => console.log("Connection to database established!"))
.catch((err) => console.log("[ERROR] Connection failed!", err.message))