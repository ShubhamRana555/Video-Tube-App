import mongoose, {Schema} from "mongoose"

const subscriptionSchema = new Schema({
    subscriber: {
        type: Schema.Types.ObjectId,  // user who will subscribe
        ref: "User",
    },
    channel: {
        type: Schema.Types.ObjectId,  // one to whom 'subscriber' will subscribe to 
        ref: "User",
    }
}, {
    timestamps: true
})


export const Subscription = mongoose.model("Subscription", subscriptionSchema)