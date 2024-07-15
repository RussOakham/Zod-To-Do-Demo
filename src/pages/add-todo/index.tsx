import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Shell } from '@/components/layouts/shells/shell'
import { Button } from '@/components/ui/button'
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
import { createToDoSchema } from '@/models/todos.schemas'
import { CreateToDo } from '@/models/todos.types'

export default function AddTodo() {
	const form = useForm<CreateToDo>({
		resolver: zodResolver(createToDoSchema),
		defaultValues: {
			title: '',
			description: '',
			priority: 1,
			completed: false,
		},
	})

	const onSubmit = (data: CreateToDo) => {
		console.log(data)
	}

	return (
		<Shell variant="default" className="max-w-6xl">
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
												defaultValue={field.value.toString()}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue>{field.value}</SelectValue>
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectItem value="1">Low</SelectItem>
													<SelectItem value="2">Medium</SelectItem>
													<SelectItem value="3">High</SelectItem>
												</SelectContent>
											</Select>
										</FormItem>
									)}
								/>
								<Button
									type="submit"
									variant="default"
									size="lg"
									className="w-full max-w-4xl"
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
