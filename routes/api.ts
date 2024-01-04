import Express from 'express'
import AuthController from '../controllers/auth'
import ClinicRouter from './clinic'
import UserController from '../controllers/users'
import { isValidJWT } from '../middleware/auth'
import { isAdm } from '../middleware/isAdm'

const router = Express.Router()

router.use('/auth', AuthController)
router.use('/user', isValidJWT, isAdm, UserController)
router.use('/clinic', isValidJWT, ClinicRouter)

export default router
