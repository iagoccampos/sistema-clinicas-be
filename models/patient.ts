import Patient, { type IPatient, type INewPatient } from '../schemas/patient'
import { PaginationResponse, type BasicCRUD, Pagination } from '../util/types'

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
  birthday?: Date | string
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
		const mappedQuery: MappedQuery = { rg: query.rg, cpf: query.cpf, birthday: query.birthday }

		if (query.name) {
			mappedQuery.name = new RegExp(query.name, 'gi')
		}

		if (query.card) {
			mappedQuery.card = +query.card
		}

		const total = await Patient.find({ clinic: clinicId, ...mappedQuery }).countDocuments().exec()

		const pagination = new Pagination(query)
		const patientsQuery = Patient.find({ clinic: clinicId, ...mappedQuery }).skip(pagination.skip).limit(pagination.limit)

		return new PaginationResponse(total, await patientsQuery.lean().exec())
	}

	async findByCard(card: string) {
		return await Patient.findOne({ card }).lean().exec()
	}
}

export default new PatientModel()
