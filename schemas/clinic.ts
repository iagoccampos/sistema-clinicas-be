import { Schema, model, type Model } from 'mongoose'
import PatientModel from './patient'
import { generateStringValidators } from '../util/schemaPropertyGen'

export interface IClinic {
  name: string
	address: {
		street: string
		city: string
		uf: string
		cep: string
	}
	company: {
		name: string
		cnpj: string
	}
}

export type IClinicQuery = Partial<IClinic>

interface IClinicDoc extends IClinic { }

interface IClinicModel extends Model<IClinicDoc> { }

const schema = new Schema<IClinicDoc, IClinicModel>({
	name: {
		type: String,
		trim: true,
		unique: true,
		...generateStringValidators('nome', { required: true, maxlength: 50 }),
	},
	address: {
		street: {
			type: String,
			trim: true,
			...generateStringValidators('rua', { maxlength: 100 }),
		},
		city: {
			type: String,
			trim: true,
			...generateStringValidators('cidade', { maxlength: 50 }),
		},
		uf: {
			type: String,
			trim: true,
			uppercase: true,
			...generateStringValidators('UF', { maxlength: 2 }),
		},
		cep: {
			type: String,
			trim: true,
			...generateStringValidators('CEP', { maxlength: 8 }),
		},
	},
	company: {
		name: {
			type: String,
			trim: true,
			...generateStringValidators('razão social', { maxlength: 50 }),
		},
		cnpj: {
			type: String,
			trim: true,
			...generateStringValidators('razão social', { maxlength: 14 }),
		},
	},
}, { timestamps: true })

schema.post('findOneAndDelete', (res) => {
	PatientModel.deleteMany({ clinic: res._id }).exec()
})

const Clinic = model<IClinicDoc>('Clinic', schema)
export default Clinic
