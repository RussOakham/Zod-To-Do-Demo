import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

import { todosSchema } from '@/models/todos.schemas'
import { type ToDo } from '@/models/todos.types'

export const useGetTodosQuery = () => {
	const query = useQuery({
		queryKey: ['todos'],
		queryFn: async () => {
			const response = await axios.get<ToDo[]>('/api/get-todos')

			const schemaValidation = todosSchema.parse(response.data)

			return schemaValidation
		},
	})

	return query
}
