import { Factory } from 'fishery'
import { hashPassword, type UserType } from '../../models/userModel'

interface UserTransientParams {
  plainPassword: string
  IsAdmin: boolean
}

export const userFactory = Factory.define<
  Partial<UserType>,
  UserTransientParams
>(({ sequence, transientParams, afterBuild }) => {
  afterBuild((user) => {
    user.password = hashPassword(
      transientParams.plainPassword ?? 'secret-password'
    )
    user.IsAdmin = transientParams.IsAdmin ?? false
  })

  const Sequence = String(sequence)

  return {
    name: `Name ${Sequence}`,
    email: `user${Sequence}@sample.com`,
    pic: 'https://sample.com/factory.png',
  }
})
