import mongoose from 'mongoose'
import * as bcrypt from 'bcryptjs'

export interface UserType {
  _id: string
  name: string
  email: string
  password: string
  IsAdmin: boolean
  pic: string
  // default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
  matchPassword: (pw: string) => Promise<boolean>
}

export type UserDoc = UserType & Document

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
  const isMatched = await bcrypt.compare(enteredPassword.toString(), this.password.toString() as string)
  return isMatched
}

export const hashPassword = (plainPassword: string): string => {
  const salt = bcrypt.genSaltSync(10) // more higher the value more secure the password
  return bcrypt.hashSync(plainPassword, salt)
}

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  this.password = hashPassword(this.password)
})

const User = mongoose.model<UserDoc>('User', userSchema)
export default User
