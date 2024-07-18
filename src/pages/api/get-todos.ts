import type { NextApiRequest, NextApiResponse } from 'next'

import { db } from '@/database/prisma'
import { logger } from '@/lib/logger'
import { standardizedError } from '@/lib/utils'
import { todosSchema } from '@/models/todos.schemas'
import { type ToDo } from '@/models/todos.types'

interface ErrorMessage {
	message: string
}

const allowedMethods = ['GET']

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ToDo[] | ErrorMessage>,
) {
	if (!allowedMethods.includes(req.method ?? '')) {
		res.status(405).send({ message: 'Method Not Allowed' })
		return
	}

	const todos = await db.todo.findMany()

	const formatTodos: ToDo[] = todos.map((todo) => ({
		id: todo.id,
		title: todo.title,
		description: todo.description,
		completed: todo.completed,
		priority: todo.priority,
		createdAt: todo.createdAt.toString(),
		updatedAt: todo.updatedAt.toString(),
	}))

	const schemaValidation = todosSchema.safeParse(formatTodos)

	if (!schemaValidation.success) {
		const err = standardizedError(schemaValidation.error)

		logger.error(`endpoint: /api/get-todos: ${err.message}`)
	}

	res.status(200).json(formatTodos)
}
