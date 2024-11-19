import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          'Please enter a valid email address',
        ],
      },
    password:{
        type: String,
        required: true,
        minLength: 6
    },
    role:{
        type: String,
        required: true,
        enum:[
            "admin", "user"
        ],
        default: 'user'
    },
    country:{
        type: String,
        default: ""
    },
},
    {
        timestamps: true
    }
);

const User = mongoose.model('User', userSchema);

export default User;