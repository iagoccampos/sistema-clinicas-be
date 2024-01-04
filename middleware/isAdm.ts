import { type Request, type Response, type NextFunction } from 'express'
import { UserLevel } from '../schemas/user'
import { ForbiddenError } from '../util/errors'

const isAdm = (req: Request, res: Response, next: NextFunction) => {
	if (res.user?.level !== UserLevel.Admin) {
		next(new ForbiddenError('Rota restrita apenas para administradores.'))
		return
	}

	next()
}

export { isAdm }
