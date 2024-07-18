import axios from 'axios'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { z } from 'zod'
import { fromError, isValidationError } from 'zod-validation-error'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export interface StandardizedError extends Error {
	type: string
	status: number
	details?: unknown
}

export function standardizedError(err: unknown): StandardizedError {
	if (axios.isAxiosError(err)) {
		return {
			type: 'AxiosError',
			status: err.response?.status ?? 500,
			name: err.name,
			message: err.message,
			stack: err.stack,
			cause: err.cause,
		}
	}
	if (err instanceof z.ZodError) {
		const validationError = fromError(err)

		return {
			type: 'ZodError',
			status: 400,
			name: validationError.name,
			message: validationError.message,
			stack: validationError.stack,
			cause: validationError.cause,
			details: validationError.details,
		}
	}
	if (isValidationError(err)) {
		return {
			type: 'ZodValidationError',
			status: 400,
			name: err.name,
			message: err.message,
			stack: err.stack,
			cause: err.cause,
			details: err.details,
		}
	}
	if (err instanceof Error) {
		return {
			type: 'Error',
			status: 500,
			name: err.name,
			message: err.message,
			stack: err.stack,
			cause: err.cause,
		}
	}

	const unknownError: StandardizedError = {
		type: 'UnknownError',
		status: 500,
		name: 'UnknownError',
		message: 'An unknown error occurred',
	}

	return unknownError
}
