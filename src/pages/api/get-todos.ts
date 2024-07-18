import type { NextApiRequest, NextApiResponse } from 'next'

import { db } from '@/database/prisma'
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
		const { errors } = schemaValidation.error

		const errorString = errors.map((error) => error.message).join(', ')

		res.status(400).json({ message: `Bad Request: ${errorString}` })
	}

	res.status(200).json(formatTodos)
}
