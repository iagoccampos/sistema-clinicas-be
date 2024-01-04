import { Schema, model } from 'mongoose'

const schema = new Schema({
	patient: {
		type: Schema.Types.ObjectId,
		ref: 'Patient',
		immutable: true,
	},
	value: Number,
	paymentForm: {
		type: String,
		enum: ['Orçamento', 'Dinheiro', 'Cartão'],
		required: [true, 'Forma de pagamento não preenchido.'],
	},
	dentist: {
		type: String,
		maxlength: [30, 'Número máximo de 30 caracteres para o nome do dentista.'],
	},
	date: {
		type: Date,
		required: [true, 'Horário de chegada não preenchido.'],
	},
	note: {
		type: String,
		trim: true,
		maxlength: [200, 'Número maximo de 200 caracteres no campo de observação.'],
	},
})

const Agenda = model('Call', schema)
export default Agenda
