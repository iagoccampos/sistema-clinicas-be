import { Schema, model } from 'mongoose'

export interface INewPatient {
  name: string
  birthday?: Date
  rg?: string
  cpf?: string
  phones?: string[]
}

export interface IPatient {
  card: number
  name: string
  birthday?: Date
  rg?: string
  cpf?: string
  phones?: string[]
  clinic: Schema.Types.ObjectId
}

const schema = new Schema<IPatient>({
	card: {
		type: Number,
	},
	name: {
		type: String,
		trim: true,
		required: [true, 'Nome do paciente é requerido.'],
		maxLength: [50, 'Nome do paciente deve conter no máximo 50 caracteres.'],
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
