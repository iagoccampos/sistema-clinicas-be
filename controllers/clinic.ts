import express from 'express'
import ClinicModel from '../models/clinic'

const router = express.Router()

router.get('', async(req, res, next) => {
	try {
		const clinics = await ClinicModel.find(req.query)
		res.json(clinics)
	} catch (e) {
		next(e)
	}
})

router.get('/:id', async(req, res, next) => {
	try {
		const clinic = await ClinicModel.get(req.params.id)
		res.json(clinic)
	} catch (e) {
		next(e)
	}
})

router.post('', async(req, res, next) => {
	try {
		const clinic = await ClinicModel.create(req.body)
		res.json(clinic)
	} catch (e) {
		next(e)
	}
})

router.put('/:id', async(req, res, next) => {
	try {
		const clinic = await ClinicModel.update(req.params.id, req.body)
		res.json(clinic)
	} catch (e) {
		next(e)
	}
})

router.delete('/:id', async(req, res, next) => {
	try {
		const clinic = await ClinicModel.delete(req.params.id)
		res.json(clinic)
	} catch (e) {
		next(e)
	}
})

export default router
