import { z } from 'zod'

import { prioritySchema } from './utility.schemas'

export type Priority = z.infer<typeof prioritySchema>
