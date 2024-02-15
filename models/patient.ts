import Patient, { type IPatient, type INewPatient } from '../schemas/patient'
import { type BasicCRUD } from '../util/types'

interface Query {
  name?: string
  birthday?: string
  rg?: string
  cpf?: string
  card?: string
  page?: string
  limit?: string
}

interface MappedQuery {
  name?: string | RegExp
  birthday?: Date
  rg?: string
  cpf?: string
  card?: number
}

class PatientModel implements BasicCRUD<INewPatient, IPatient> {
	async create(newPatient: INewPatient, clinicId: string) {
		const patient = await Patient.create({ clinic: clinicId, ...newPatient })
		return patient.toObject()
	}

	async get(id: string) {
		return await Patient.findById(id).lean().exec()
	}

	async update(id: string, editedPatient: INewPatient) {
		const patient = await Patient.findByIdAndUpdate(id, { $set: editedPatient }, { new: true, runValidators: true }).lean().exec()
		return patient
	}

	async delete(id: string) {
		const patient = await Patient.findByIdAndDelete(id).lean().exec()
		return patient
	}

	async find(clinicId: string, query: Query) {
		const page = +(query.page ?? NaN)
		const limit = +(query.limit ?? NaN)

		const mappedQuery: MappedQuery = {}

		if (query.birthday) {
			mappedQuery.birthday = new Date(query.birthday)
		}

		if (query.name) {
			mappedQuery.name = new RegExp(query.name, 'gi')
		}

		if (query.rg) {
			mappedQuery.rg = query.rg
		}

		if (query.cpf) {
			mappedQuery.cpf = query.cpf
		}

		if (query.card) {
			mappedQuery.card = +query.card
		}

		const total = await Patient.find({ clinic: clinicId, ...mappedQuery }).countDocuments().exec()
		const patientsQuery = Patient.find({ clinic: clinicId, ...mappedQuery })

		if (!isNaN(page) && !isNaN(limit)) {
			patientsQuery.skip(+page * +limit).limit(+limit)
		}

		return { total, items: await patientsQuery.lean().exec() }
	}

	async findByCard(card: string) {
		return await Patient.findOne({ card }).lean().exec()
	}
}

export default new PatientModel()
