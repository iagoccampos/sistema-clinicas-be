const log = (...values: any) => {
	if (process.env.NODE_ENV !== 'production') {
		console.log(new Date().toLocaleString(), ...values)
	}
}

const error = (...values: any) => {
	if (process.env.NODE_ENV !== 'production') {
		console.error(new Date().toLocaleString(), ...values)
	}
}

export default { log, error }
