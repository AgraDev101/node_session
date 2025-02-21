import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: "string",
        required: true
    },
    email: {
        type: "string",
        required: true
    },
    password: {
        type: "string",
        required: true
    }
})

const User = mongoose.model("User", userSchema)

export default User