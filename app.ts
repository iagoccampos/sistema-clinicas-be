import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { UserLevel } from './schemas/user'
import api from './routes/api'
import errorHandler from './util/errorHandler'

dotenv.config()

const port = +process.env.PORT || 3000
const app = express()

mongoose.connect('mongodb://localhost:27017/sistema-clinicas', { ignoreUndefined: true })
mongoose.set('runValidators', true)
mongoose.set('returnOriginal', true)

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use((req, res, next) => {
	// Remove empty queries
	for (const key of Object.keys(req.query)) {
		if (req.query[key] === '') {
			delete req.query[key]
		}
	}

	// Intentional delay for testing
	setTimeout(() => {
		next()
	}, 1000)
})
app.use('/api', api)
app.use(errorHandler.handle)

app.listen(port, () => {
	console.log(`Server started. Port: ${port}`)
	createDefaultUser()
})

async function createDefaultUser() {
	try {
		const User = require('./schemas/user').default
		const user = await User.findOne({ username: 'admin' })
		if (!user) {
			User.create({
				name: 'admin',
				username: 'admin',
				password: 'master',
				level: UserLevel.Admin,
			})
		}
	} catch (e) { }
}
