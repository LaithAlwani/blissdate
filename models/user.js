import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      reqired: true,
    },
    email: {
      type: String,
      reqired: true,
    },
    clerk_id: {
      type: String,
      reqired: true,
    },
    first_name: String,
    last_name: String,
    images: Array,
    avatar: String,
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    verified: Boolean,
  },
  { timestamps: true }
);

const User = models.User || model("User", userSchema);

export default User;
