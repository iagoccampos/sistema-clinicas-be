import Express from 'express'
import UserModel from '../models/user'
import JWT from 'jsonwebtoken'

const router = Express.Router()

router.post('/login', async(req, res, next) => {
	try {
		const user = await UserModel.findUserForLogin(req.body.username, req.body.password)

		if (user) {
			const token = JWT.sign(user, process.env.JWT_SECRET, {
				expiresIn: '4h',
			})

			return res.json({ auth: true, token })
		}

		res.json({ auth: false, error: 'Verifique seu usuário e senha e tente novamente.' })
	} catch (err) {
		next(err)
	}
})

export default router
