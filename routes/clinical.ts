import Express from 'express'
import PatientController from '../controllers/patient'
import PaymentController from '../controllers/clinical/payments'

const router = Express.Router({ mergeParams: true })

router.use('/patient', PatientController)
router.use('/payment', PaymentController)

export default router
