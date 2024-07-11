import { z } from 'zod'

import { createToDoSchema, todoSchema } from './todos.schemas'

export type CreateToDo = z.infer<typeof createToDoSchema>
export type ToDo = z.infer<typeof todoSchema>
