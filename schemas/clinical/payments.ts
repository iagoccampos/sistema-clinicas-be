import { Schema, type Types, model } from 'mongoose'
import { generateStringValidators } from '../../util/schemaPropertyGen'

export enum PaymentMethods {
	Dinheiro = 'DINHEIRO',
	Debito = 'DEBITO',
	Credito = 'CREDITO',
}

export interface INewClinicalPayment {
	card: string
	date?: Date
	value: number
	method: PaymentMethods
}

export interface IClinicalPayment {
	_id: Types.ObjectId
	date: Date | string
	value: number
	method: PaymentMethods
	patient: Types.ObjectId | string
	clinic: Types.ObjectId | string
}

const schema = new Schema<IClinicalPayment>({
	date: {
		type: Date,
		default: Date.now,
		index: true,
	},
	value: {
		type: Number,
		...generateStringValidators('Valor', { required: true }),
	},
	method: {
		type: String,
		...generateStringValidators('Método', { required: true, enum: [PaymentMethods.Dinheiro, PaymentMethods.Debito, PaymentMethods.Credito] }),
	},
	patient: {
		type: Schema.Types.ObjectId,
		ref: 'Patient',
		required: true,
		immutable: true,
	},
	clinic: {
		type: Schema.Types.ObjectId,
		ref: 'Clinic',
		required: true,
		immutable: true,
	},
}, {
	timestamps: true,
	optimisticConcurrency: true,
})

const ClinicalPayment = model('ClinicalPayment', schema)
export default ClinicalPayment
