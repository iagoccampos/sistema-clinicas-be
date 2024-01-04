import Clinic, { type IClinic, type IClinicQuery } from '../schemas/clinic'

class ClinicModel {
	async create(newClinic: IClinic) {
		const clinic = new Clinic(newClinic)
		await clinic.save({ validateBeforeSave: true })

		return clinic
	}

	async find(query: IClinicQuery) {
		return await Clinic.find(query).lean().exec()
	}

	async get(id: string) {
		return await Clinic.findById(id).lean().exec()
	}

	async update(id: string, clinic: IClinic) {
		return await Clinic.findByIdAndUpdate(id, clinic, { new: true }).lean().exec()
	}

	async delete(id: string) {
		return await Clinic.findOneAndDelete({ _id: id }).exec()
	}
}

export default new ClinicModel()
