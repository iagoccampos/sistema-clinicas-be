import { type Request, type Response, type NextFunction } from 'express'
import { Error as MongooseError } from 'mongoose'
import { HttpError } from './errors'
import Logger from './logger'

const handle = (err: any, req: Request, res: Response, next: NextFunction) => {
	Logger.error(err)
	if (err) {
		if (err.code === 11000) { // DuplicatedKey
			console.log(err)
			const value = Object.values(err.keyValue)[0] as string
			return res.status(400).json({ message: `Há campos com valores que devem ser únicos. Valor "${value}" já existe.` })
		}

		if (err instanceof MongooseError.ValidationError) {
			let message = 'Falha na validação.'

			if (err.errors) {
				const firstObject = Object.entries<{ message: string }>(err.errors)[0][1]
				message = firstObject.message
			}

			return res.status(400).json({ message })
		}

		if (err instanceof HttpError) {
			return res.status(err.statusCode).send({ message: err.message })
		}

		if (err.message) {
			return res.status(400).json({ message: err.message })
		}
	}

	res.status(500).json({ message: 'Erro interno do servidor.' })
}

export default { handle }
