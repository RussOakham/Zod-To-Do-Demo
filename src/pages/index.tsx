import { LuPlusCircle } from 'react-icons/lu'
import { Inter } from 'next/font/google'
import Link from 'next/link'

import { Shell } from '@/components/layouts/shells/shell'
import { Button } from '@/components/ui/button'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
	return (
		<main
			className={`flex min-h-screen flex-col items-center p-24 ${inter.className}`}
		>
			<h1 className="text-center text-lg font-bold">Much To Do about Zod</h1>
			<span className="text-md space-y-4 text-center text-muted-foreground">
				Simple To Do List App to show power of runtime type checking with Zod
			</span>
			<Shell variant="default" className="max-w-6xl">
				<h2 className="text-md font-bold">Add To Do</h2>

				<Button variant="secondary" asChild>
					<Link href="/add-todo">
						<LuPlusCircle size={20} />
						<span className="sr-only">Add To Do</span>
					</Link>
				</Button>
			</Shell>
		</main>
	)
}
