import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'

import { Shell } from '@/components/layouts/shells/shell'
import { Button, buttonVariants } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { createToDoSchema } from '@/models/todos.schemas'
import { CreateToDo } from '@/models/todos.types'
import { useCreateTodoMutation } from '@/services/react-query/mutations/create-todo'

export default function AddTodo() {
	const [isPending, startTransition] = useTransition()
	const createTodoMutation = useCreateTodoMutation()

	const form = useForm<CreateToDo>({
		resolver: zodResolver(createToDoSchema),
		defaultValues: {
			title: '',
			description: '',
			priority: 'Low',
			completed: false,
		},
	})

	const onSubmit = (data: CreateToDo) => {
		startTransition(() => {
			createTodoMutation.mutate(data, {
				onError: (error) => {
					console.log(error)
				},
			})
		})
	}

	return (
		<Shell variant="default" className="max-w-6xl">
			<Link
				href="/"
				className={cn(
					buttonVariants({
						variant: 'link',
						size: 'sm',
						className: 'flex justify-end',
					}),
				)}
			>
				&larr; Back to Home
			</Link>
			<Card className="max-w-5xl">
				<CardHeader>
					<CardTitle>Create To Do</CardTitle>
					<CardDescription>Add a new to do item to your list</CardDescription>
				</CardHeader>
				<CardContent className="flex flex-col gap-2">
					<Form {...form}>
						<form className="flex gap-4" onSubmit={form.handleSubmit(onSubmit)}>
							<div className="flex w-full flex-col items-center gap-4">
								<FormField
									control={form.control}
									name="title"
									render={({ field }) => (
										<FormItem className="relative w-full max-w-4xl space-y-1">
											<FormLabel className="text-md">Title</FormLabel>
											<FormControl>
												<Input
													placeholder="What do you want to do?"
													className="pr-12"
													autoComplete="off"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="description"
									render={({ field }) => (
										<FormItem className="relative w-full max-w-4xl space-y-1">
											<FormLabel className="text-md">Description</FormLabel>
											<FormControl>
												<Textarea
													placeholder="Describe your to do item here..."
													className="resize-none pr-12"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="priority"
									render={({ field }) => (
										<FormItem className="relative w-full max-w-4xl space-y-1">
											<FormLabel className="text-md">Priority</FormLabel>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue>{}</SelectValue>
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectItem value="Low">Low</SelectItem>
													<SelectItem value="Medium">Medium</SelectItem>
													<SelectItem value="High">High</SelectItem>
												</SelectContent>
												<FormMessage />
											</Select>
										</FormItem>
									)}
								/>
								<Button
									type="submit"
									variant="default"
									size="lg"
									className="w-full max-w-4xl"
									disabled={isPending}
								>
									Submit
								</Button>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</Shell>
	)
}
