import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

import { type ToDo } from '@/models/todos.types'

export const useGetTodosQuery = () => {
	const query = useQuery({
		queryKey: ['todos'],
		queryFn: async () => {
			try {
				const response = await axios.get<ToDo[]>('/api/get-todos')

				return response.data
			} catch (err: unknown) {
				if (axios.isAxiosError(err)) {
					throw new Error(err.message)
				}
				if (err instanceof Error) {
					throw new Error(err.message)
				}

				throw new Error('An unknown error occurred')
			}
		},
	})

	return query
}
