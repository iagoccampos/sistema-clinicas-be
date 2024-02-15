import express from 'express'
import PatientModel from '../models/patient'

const router = express.Router({ mergeParams: true })

router.get<{ clinicId: string }>('', async(req, res, next) => {
	try {
		const patients = await PatientModel.find(req.params.clinicId, req.query)
		res.json(patients)
	} catch (err) {
		next(err)
	}
})

router.post<{ clinicId: string }>('', async(req, res, next) => {
	try {
		const patient = await PatientModel.create(req.body, req.params.clinicId)
		res.json(patient)
	} catch (err) {
		next(err)
	}
})

router.put('/:id', async(req, res, next) => {
	try {
		const patient = await PatientModel.update(req.params.id, req.body)
		res.json(patient)
	} catch (err) {
		next(err)
	}
})

router.delete('/:id', async(req, res, next) => {
	try {
		const patient = await PatientModel.delete(req.params.id)
		res.json(patient)
	} catch (err) {
		next(err)
	}
})

export default router
