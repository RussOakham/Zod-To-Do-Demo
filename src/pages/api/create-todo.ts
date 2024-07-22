import type { NextApiRequest, NextApiResponse } from 'next'

import { db } from '@/database/prisma'
import { logger } from '@/lib/logger'
import { standardizedError } from '@/lib/utils'
import { createToDoSchema, todoSchema } from '@/models/todos.schemas'
import { type CreateToDo, type ToDo } from '@/models/todos.types'

interface ErrorMessage {
	message: string
}

const allowedMethods = ['POST']

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ToDo | ErrorMessage>,
) {
	try {
		if (!allowedMethods.includes(req.method ?? '')) {
			res
				.status(405)
				.send({ message: 'endpoint: /api/create-todo - Method Not Allowed' })
			return
		}

		const { title, description, completed, priority } = req.body as CreateToDo

		if (!title || !description || !priority) {
			res
				.status(400)
				.send({
					message:
						'endpoint: /api/create-todo - Bad Request: Required elements not present',
				})
			return
		}

		const schemaValidation = createToDoSchema.safeParse({
			title,
			description,
			completed,
			priority,
		})

		if (!schemaValidation.success) {
			const error = standardizedError(schemaValidation.error)
			logger.error(`endpoint: /api/create-todo: ${error.message}`)
			res.status(400).send({
				message: `endpoint: /api/create-todo - Bad Request: ${error.message}`,
			})
			return
		}

		const todo = await db.todo.create({
			data: {
				title,
				description,
				completed,
				priority,
			},
		})

		const responseSchemaValidation = todoSchema.safeParse(todo)

		if (!responseSchemaValidation.success) {
			const error = standardizedError(responseSchemaValidation.error)
			logger.error(`endpoint: /api/create-todo: ${error.message}`)
		}

		const returnTodo: ToDo = {
			id: todo.id,
			title: todo.title,
			description: todo.description,
			completed: todo.completed,
			priority: todo.priority,
			createdAt: todo.createdAt.toString(),
			updatedAt: todo.updatedAt.toString(),
		}

		res.status(201).json(returnTodo)
	} catch (err: unknown) {
		const error = standardizedError(err)

		logger.error(`endpoint: /api/create-todo: ${error.message}`)

		res
			.status(500)
			.send({
				message: `endpoint: /api/create-todo - Internal Server Error: ${error.message}`,
			})
	}
}
