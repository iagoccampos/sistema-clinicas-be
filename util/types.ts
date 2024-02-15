/* eslint-disable @typescript-eslint/prefer-readonly */
export interface BasicCRUD<N, M> {
	create: (((object: N) => Promise<M>) | ((object: N, ...id: string[]) => Promise<M>))
	get: (id: string) => Promise<M | null>
	update: (id: string, object: N) => Promise<M | null>
	delete: (id: string) => Promise<M | null>
}

export class PaginationResponse<T> {
	constructor(private readonly total: number, private readonly items: T[]) {}
}

export interface IPaginationQuery {
	page?: string
	size?: string
}

export class Pagination {
	private pageNumber = 0
	private sizeNumber = Number.MAX_SAFE_INTEGER

	get isValid() {
		return this.pageNumber !== undefined && this.sizeNumber !== undefined &&
			!isNaN(this.pageNumber) && !isNaN(this.sizeNumber)
	}

	get skip() {
		return this.pageNumber * this.sizeNumber
	}

	get limit() {
		return this.sizeNumber
	}

	constructor(pagination: { page?: number | string, size?: number | string }) {
		if (pagination.page) {
			this.pageNumber = +pagination.page
		}

		if (pagination.size) {
			this.sizeNumber = +pagination.size
		}
	}
}
