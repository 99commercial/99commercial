import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
const { Schema, model } = mongoose;
const userSchema = new Schema(
  {
    role: {
      type: String,
      enum: ['user', 'agent', 'admin'],
      required: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, 'Email format is invalid'],
    },
    phone: {
      type: String,
      required: true,
      match: [/^\+?\d{10,15}$/, 'Phone number must be valid'],
    },
    age: {
      type: Number,
      required: false,
      min: 0,
      max: 100,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profile_picture: {
      type: String,
      trim: true,
    },
    personal_address: {
      type: String,
      trim: true,
    },
    about: {
      type: String,
      trim: true,
    },
    business_details: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'business_details',
      required: false,
    },
    deleted_at: {
      type: Date,
      default: null,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    
    // Email verification fields
    emailVerificationToken: {
      type: String,
      select: false,
    },
    emailVerificationExpires: {
      type: Date,
      select: false,
    },
    
    // Password reset fields
    passwordResetToken: {
      type: String,
      select: false,
    },
    passwordResetExpires: {
      type: Date,
      select: false,
    },
    
    // Email change fields
    emailChangeToken: {
      type: String,
      select: false,
    },
    emailChangeExpires: {
      type: Date,
      select: false,
    },
    pendingEmail: {
      type: String,
      trim: true,
      lowercase: true,
    },
    my_favourites: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'property',
      default: [],
    },
  },
  {
    timestamps: true,
  }
);
userSchema.plugin(mongoosePaginate);

export default model('user', userSchema);
