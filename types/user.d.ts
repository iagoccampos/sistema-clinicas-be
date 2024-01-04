import { type Types } from 'mongoose'
import { type UserLevel } from '../schemas/user'

declare global {
  namespace Express {
    interface Response {
      user?: {
        _id: Types.ObjectId | string
        username: string
				level: UserLevel
      }
    }
  }
}

export { }
