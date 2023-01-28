import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

export interface UserDoc extends Document {
  name: string
  email: string
  password: string
  IsAdmin: boolean
  pic: string
  // default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
  matchPassword: (pw: string) => Promise<boolean>
}

const userSchema = new mongoose.Schema<UserDoc>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    IsAdmin: {
      // just incase we need
      type: Boolean,
      required: true,
      default: false,
    },
    pic: {
      type: String,
      required: true,
      default:
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
    },
  },
  {
    timestamps: true,
  }
)

userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password as string)
}

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }
  const salt = await bcrypt.genSalt(10) // more higher the value more secure the password
  this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model<UserDoc>('User', userSchema)
export default User
