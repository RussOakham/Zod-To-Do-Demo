import type { NextApiRequest, NextApiResponse } from 'next'

import { db } from '@/database/prisma'
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

	res.status(200).json(todos)
}
