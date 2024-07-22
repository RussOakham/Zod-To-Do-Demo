import { LuBadgeCheck, LuBadgeX } from 'react-icons/lu'

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
		<Card key={todo.id} className="max-w-6xl">
			<CardHeader>
				<CardTitle>{todo.title}</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-col gap-2">
				<pre className="text-base text-muted-foreground">
					{todo.description}
				</pre>
				<CardDescription className="flex justify-end">
					Priority: {todo.priority}
				</CardDescription>
				<CardDescription className="flex justify-between text-sm">
					{todo.completed ? (
						<span className="flex gap-2">
							Completed: <LuBadgeCheck size={20} color="green" />
						</span>
					) : (
						<span className="flex gap-2">
							Completed: <LuBadgeX size={20} color="red" />
						</span>
					)}

					<span>
						Created At: {new Date(todo.createdAt).toLocaleDateString()}
					</span>
				</CardDescription>
			</CardContent>
		</Card>
	)
}

export default ToDoCard
