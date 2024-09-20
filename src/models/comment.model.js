import mongoose, { Schema } from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

const commentSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
        },
        video: {
            type: schema.types.objectid,
            ref: "Video",
        },
        owner: {
            type: schema.types.objectid,
            ref: "User",
        }
    },
    {
        timestamps: true,
    }
)

commentSchema.plugin(mongooseAggregatePaginate)

export const Comment = mongoose.model("Comment", commentSchema);