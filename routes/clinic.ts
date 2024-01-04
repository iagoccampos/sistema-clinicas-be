import Express from 'express'
import ClinicController from '../controllers/clinic'
import PatientController from '../controllers/patient'
import ClinicalRouter from './clinical'

const router = Express.Router()

router.use('', ClinicController)
router.use('/:clinicId/patient', PatientController)
router.use('/:clinicId/clinical', ClinicalRouter)

export default router
