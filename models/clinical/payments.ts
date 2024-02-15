import ClinicalPayment, { type IClinicalPaymentQuery, type IClinicalPayment, type INewClinicalPayment } from '../../schemas/clinical/payments'
import { type IPatient } from '../../schemas/patient'
import { NotFoundError } from '../../util/errors'
import { Pagination, type BasicCRUD, type IPaginationQuery, PaginationResponse } from '../../util/types'
import PatientModel from '../patient'

class ClinicalPaymentModel implements BasicCRUD<INewClinicalPayment, IClinicalPayment> {
	async create(newPayment: INewClinicalPayment, clinicId: string) {
		const patient = await PatientModel.findByCard(newPayment.card)

		if (!patient) {
			throw new NotFoundError('Paciente não encontrado.')
		}

		const payment = new ClinicalPayment({ ...newPayment, clinic: clinicId, patient: patient._id })
		payment.save()
		return payment
	}

	async get(id: string) {
		return await ClinicalPayment.findById(id).exec()
	}

	async getClinicPayments(clinicId: string, query: IClinicalPaymentQuery & IPaginationQuery) {
		let patient: IPatient | null = null
		if (query.card) {
			patient = await PatientModel.findByCard(query.card)
		}

		const mappedQuery: Partial<IClinicalPayment> = { clinic: clinicId, method: query.method, date: query.date, patient: patient?._id }

		const total = await ClinicalPayment.find(mappedQuery).countDocuments().exec()
		const paymentsQuery = ClinicalPayment.find(mappedQuery).populate('patient')
		const pagination = new Pagination(query)

		paymentsQuery.skip(pagination.skip).limit(pagination.limit)

		return new PaginationResponse(total, await paymentsQuery.exec())
	}

	async update(id: string, object: INewClinicalPayment) {
		return await ClinicalPayment.findByIdAndUpdate(id, object).lean().exec()
	}

	async delete(id: string) {
		return await ClinicalPayment.findByIdAndDelete(id).exec()
	}
}

export default new ClinicalPaymentModel()