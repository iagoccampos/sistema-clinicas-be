import User, { type IUser, type INewUser, type IUpdateUser } from '../schemas/user'
import { ForbiddenError } from '../util/errors'
import { type BasicCRUD } from '../util/types'

class UserModel implements BasicCRUD<INewUser, IUser> {
	async create(newUser: INewUser) {
		const newUserModel = await User.create({ ...newUser })
		delete newUserModel.password

		return newUserModel
	}

	async get(userId: string) {
		return await User.findById(userId, { password: 0 }).lean().exec()
	}

	async update(userId: string, updatedValues: IUpdateUser) {
		const user = await User.findById(userId).lean().exec()

		if (user?.username === 'admin' && updatedValues.username) {
			throw new ForbiddenError('Não é possivel editar o nome de usuário do usuário principal.')
		}

		if (updatedValues.password === '') {
			delete updatedValues.password
		}

		const updatedUser = await User.findByIdAndUpdate(userId, updatedValues, { runValidators: true, new: true, projection: { password: 0 } }).lean().exec()

		return updatedUser
	}

	async delete(userId: string) {
		const user = await User.findById(userId).lean().exec()

		if (user?.username === 'admin') {
			throw new ForbiddenError('Não é possivel excluir o usuário principal.')
		}

		return await User.findByIdAndDelete(userId).lean().exec()
	}

	async findUserForLogin(username: string, password: string) {
		return await User.findOne({ username, password }, { password: 0 }).lean().exec()
	}

	async getClinicUsers(clinicId: string) {
		return await User.find({ clinic: clinicId }, { password: 0 }).lean().exec()
	}
}

export default new UserModel()
