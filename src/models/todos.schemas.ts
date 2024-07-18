import { z } from 'zod'

const titleNotEmpty = z
	.string()
	.trim()
	.min(3, {
		message: 'Please enter a valid title.',
	})
	.max(50, { message: 'Title is too long.' })

export const todoSchema = z.object({
	id: z.string(),
	title: z.string().pipe(titleNotEmpty),
	description: z.string().max(250, {
		message: 'Description is too long.',
	}),
	completed: z.boolean(),
	priority: z.string(),
	createdAt: z.string().date(),
	updatedAt: z.string(),
})

export const todosSchema = z.array(todoSchema)

export const createToDoSchema = todoSchema.omit({
	id: true,
	createdAt: true,
	updatedAt: true,
})
