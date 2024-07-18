import type { NextApiRequest, NextApiResponse } from 'next'

import { db } from '@/database/prisma'
import { logger } from '@/lib/logger'
import { standardizedError } from '@/lib/utils'
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
			res.status(405).send({ message: 'Method Not Allowed' })
			return
		}

		const { title, description, completed, priority } = req.body as CreateToDo

		if (!title || !description || !priority) {
			res.status(400).send({ message: 'Bad Request' })
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

		logger.error(`endpoint: /api/get-todos: ${error.message}`)

		res.status(500).send({ message: `Internal Server Error: ${error.message}` })
	}
}
