export interface BasicCRUD<N, M> {
	create: (((object: N) => Promise<M>) | ((id: string, object: N) => Promise<M>))
	get: (id: string) => Promise<M | null>
	update: (id: string, object: N) => Promise<M | null>
	delete: (id: string) => Promise<M | null>
}
