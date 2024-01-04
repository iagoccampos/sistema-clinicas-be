export class HttpError {
	statusCode = -1
	message?: string

	constructor(message?: string) {
		this.message = message
	}
}

export class ForbiddenError extends HttpError {
	statusCode = 403
}

export class NotFoundError extends HttpError {
	statusCode = 404
}
