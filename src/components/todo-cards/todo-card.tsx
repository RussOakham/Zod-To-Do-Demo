import { type ToDo } from '@/models/todos.types'

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '../ui/card'

interface ToDoCardProps {
	todo: ToDo
}

const ToDoCard = ({ todo }: ToDoCardProps) => {
	return (
		<Card key={todo.id} className="max-w-5xl">
			<CardHeader>
				<CardTitle>{todo.title}</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-col gap-2">
				<CardDescription className="text-base text-black">
					{todo.description}
				</CardDescription>
				<CardDescription className="flex justify-end">
					Priority: {todo.priority}
				</CardDescription>
				<CardDescription className="flex justify-end text-sm">
					Created At: {new Date(todo.createdAt).toLocaleDateString()}
				</CardDescription>
			</CardContent>
		</Card>
	)
}

export default ToDoCard
