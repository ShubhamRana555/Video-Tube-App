import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true    // make searching efficient in mongodb
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    fullName: {
        type: String,
        required: true,
        index: true,
        trim: true,
    },
    avatar: {
        type: String, // Cloudinary URL
        required: true,
    },
    coverImage: {
        type: String,
        required: false
    },
    watchHistory: [
        {
           type: Schema.Types.ObjectId,
           ref: "Video", 
        }
    ],
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    refreshToken: {
        type: String,
    },
},
{
    timestamps: true,
}
)

userSchema.pre(
    "save",
    async function (next) {
        if(!this.isModified("password")){
            return next();
        }

        this.password = await bcrypt.hash(this.password, 10);
        next();
    }
) // It is a middleware function that runs just before the save() method. For example, user wrote a controller to save data, then we run this function just before saving the data to encrypt the password password.


userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    )
}
userSchema.methods.generateRefreshToken = function() {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    )
}

userSchema.methods.generateAccessToken = function() {
    const payload = {
        _id: this._id,
        email: this.email,
        username: this.username,
        fullName: this.fullName,
    };
    const options = {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '1h',
    };
    console.log("Payload for Access Token:", payload);
    console.log("Options for Access Token:", options);

    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, options);
};

userSchema.methods.generateRefreshToken = function() {
    const payload = {
        _id: this._id,
    };
    const options = {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY || '7d',
    };
    console.log("Payload for Refresh Token:", payload);
    console.log("Options for Refresh Token:", options);

    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, options);
};


export const User = mongoose.model("User", userSchema)
