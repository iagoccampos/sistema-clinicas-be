import { Schema, model, type Types } from 'mongoose'
import crypto from 'crypto'
import { generateStringValidators } from '../util/schemaPropertyGen'

export enum UserLevel {
  Admin = 'Admin',
	Manager = 'Manager',
  Regular = 'Regular'
}

export interface INewUser {
	name: string
  username: string
  password: string
	level: UserLevel
	clinic: string
}

export interface IUpdateUser {
  username?: string
  password?: string
}

export interface IUser {
	_id: string
	name: string
  username: string
  password?: string
	clinic: Types.ObjectId
  level: UserLevel
	createdAt: Date
	updatedAt: Date
}

const schema = new Schema<IUser>({
	name: {
		type: String,
		...generateStringValidators('usuário', { required: true, maxlength: 30, minlength: 5 }),
	},
	username: {
		type: String,
		...generateStringValidators('usuário', { required: true, maxlength: 30, minlength: 5 }),
	},
	password: {
		type: String,
		...generateStringValidators('senha', { required: true, maxlength: 200, minlength: 6 }),
		set: (val: string) => {
			if (val.length < 6) {
				return val
			}

			const hash = crypto.createHash('sha512')
			hash.update(val)
			return hash.digest('hex')
		},
	},
	clinic: {
		type: Schema.Types.ObjectId,
		ref: 'Clinic',
		required: function(this: IUser) {
			return this.level !== UserLevel.Admin
		},
		immutable: true,
	},
	level: {
		type: String,
		enum: [UserLevel.Admin, UserLevel.Regular],
		required: true,
		default: UserLevel.Regular,
		immutable: true,
	},
}, { timestamps: true })

schema.index({ username: 1, clinic: 1 }, { unique: true })

const User = model<IUser>('User', schema)
export default User
