import type { NextApiRequest, NextApiResponse } from 'next'

import { db } from '@/database/prisma'
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

		const todo = await db.todo.create({
			data: {
				title,
				description,
				completed,
				priority,
			},
		})

		if (!title || !description || !completed) {
			res.status(400).send({ message: 'Bad Request' })
			return
		}

		res.status(201).json(todo)
	} catch (err: unknown) {
		console.log((err as Error).message)
		res.status(500).send({ message: 'Internal Server Error' })
	}
}
