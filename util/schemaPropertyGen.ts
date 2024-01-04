interface IValidators {
	required?: [true, string]
	maxlength?: [number, string]
	minlength?: [number, string]
	enum?: string[]
}

export function generateStringValidators(name: string, obj: { required?: boolean, maxlength?: number, minlength?: number, enum?: string[] }) {
	const validators: IValidators = generateCommonValidators(name, { ...obj })

	if (obj.maxlength) {
		validators.maxlength = [obj.maxlength, `Campo "${name}" deve ter no máximo "${obj.maxlength}" caracteres.`]
	}

	if (obj.minlength) {
		validators.minlength = [obj.minlength, `Campo "${name}" deve ter no mínimo "${obj.minlength}" caracteres.`]
	}

	if (obj.enum) {
		validators.enum = obj.enum.map((el) => el.trim())
	}

	return validators
}

export function generateCommonValidators(name: string, obj: { required?: boolean }) {
	const validators: IValidators = { }

	if (obj.required) {
		validators.required = [true, `Campo "${name}" é obrigatório.`]
	}

	return validators
}
