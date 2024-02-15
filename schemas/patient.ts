import { Schema, type Types, model } from 'mongoose'
import { generateStringValidators } from '../util/schemaPropertyGen'

export interface INewPatient {
  name: string
  birthday?: Date
  rg?: string
  cpf?: string
  phones?: string[]
}

export interface IPatient {
	_id: Types.ObjectId
  card: number
  name: string
  birthday?: Date
  rg?: string
  cpf?: string
  phones?: string[]
  clinic: Types.ObjectId
}

const schema = new Schema<IPatient>({
	card: {
		type: Number,
	},
	name: {
		type: String,
		trim: true,
		...generateStringValidators('Nome', { required: true, maxlength: 50 }),
	},
	birthday: {
		type: Date,
	},
	rg: {
		type: String,
	},
	cpf: {
		type: String,
	},
	phones: {
		type: [{
			type: String,
			trim: true,
		}],
		set: (val: string[]) => {
			return val.filter(el => !!el).slice(0, 5)
		},
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

schema.pre('save', async function(next) {
	const biggestCard = (await patientModel.findOne({ clinic: this.clinic }, { card: 1 }, { sort: { card: -1 } }))?.card
	this.card = biggestCard ? biggestCard + 1 : 1
	next()
})

const patientModel = model<IPatient>('Patient', schema)
export default patientModel
