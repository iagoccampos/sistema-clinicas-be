import { type Request, type Response, type NextFunction } from 'express'
import JWT from 'jsonwebtoken'
import UserModel from '../models/user'

const isValidJWT = (req: Request, res: Response, next: NextFunction) => {
	const token = req.headers.authorization as string

	if (!token) {
		return res.status(401).json({ auth: false, message: 'Nenhum token fornecido.' })
	}

	JWT.verify(token, process.env.JWT_SECRET, {}, async(err, decoded) => {
		if (err) {
			if (err.message === 'jwt expired') {
				return res.status(401).json({ auth: false, message: 'Token expirado.' })
			}

			return res.status(401).json({ auth: false, message: err.message })
		}

		const castDecoded = decoded as { _id: string }

		if (decoded && castDecoded._id) {
			const user = await UserModel.get(castDecoded._id)

			if (!user) {
				return res.status(401).json({ auth: false, message: 'Usuário não existe.' })
			}

			res.user = user

			next(); return
		}

		return res.status(500).json({ auth: false, message: 'Falha em autenticar o token.' })
	})
}

export { isValidJWT }
