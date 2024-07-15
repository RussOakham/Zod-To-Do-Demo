import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

import { type CreateToDo, type ToDo } from '@/models/todos.types'

export const useCreateTodoMutation = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (data: CreateToDo) => {
			try {
				const response = await axios.post<ToDo>(`/api/create-todo`, data)

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
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['todos'] })
		},
	})
}
