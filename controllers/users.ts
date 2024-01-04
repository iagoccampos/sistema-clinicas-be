import express from 'express'
import UserModel from '../models/user'

const router = express.Router()

router.get<unknown, unknown, unknown, { clinicId: string }>('', async(req, res, next) => {
	try {
		const users = await UserModel.getClinicUsers(req.query.clinicId)
		res.json(users)
	} catch (e) {
		next(e)
	}
})

router.post('', async(req, res, next) => {
	try {
		const clinic = await UserModel.create(req.body)
		res.json(clinic)
	} catch (e) {
		next(e)
	}
})

router.put('/:id', async(req, res, next) => {
	try {
		const clinic = await UserModel.update(req.params.id, req.body)
		res.json(clinic)
	} catch (e) {
		next(e)
	}
})

router.delete('/:id', async(req, res, next) => {
	try {
		const clinic = await UserModel.delete(req.params.id)
		res.json(clinic)
	} catch (e) {
		next(e)
	}
})

export default router
