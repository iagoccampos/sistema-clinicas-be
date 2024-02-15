import express from 'express'
import ClinicalPaymentModel from '../../models/clinical/payments'
import { type IPaginationQuery } from '../../util/types'
import { type IClinicalPaymentQuery } from '../../schemas/clinical/payments'

const router = express.Router({ mergeParams: true })

router.get('/:id', async(req, res, next) => {
	try {
		const payment = await ClinicalPaymentModel.get(req.params.id)
		res.json(payment)
	} catch (err) {
		next(err)
	}
})

router.get<{ clinicId: string }, unknown, unknown, IClinicalPaymentQuery & IPaginationQuery>('', async(req, res, next) => {
	try {
		const payment = await ClinicalPaymentModel.getClinicPayments(req.params.clinicId, req.query)
		res.json(payment)
	} catch (err) {
		next(err)
	}
})

router.post<{ clinicId: string }>('/', async(req, res, next) => {
	try {
		const payment = await ClinicalPaymentModel.create(req.body, req.params.clinicId)
		res.json(payment)
	} catch (err) {
		next(err)
	}
})

router.put('/:id', async(req, res, next) => {
	try {
		const payment = await ClinicalPaymentModel.update(req.params.id, req.body)
		res.json(payment)
	} catch (err) {
		next(err)
	}
})

router.delete('/:id', async(req, res, next) => {
	try {
		const payment = await ClinicalPaymentModel.delete(req.params.id)
		res.json(payment)
	} catch (err) {
		next(err)
	}
})

export default router
