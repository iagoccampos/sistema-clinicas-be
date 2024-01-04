export async function waitForSeconds(sec: number) {
	return await new Promise(resolve => setTimeout(resolve, sec * 1000))
}
