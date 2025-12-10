import { computed, effect, Injectable, signal } from '@angular/core'
import type { Todo } from '../models/todo.model'
import type { Filter } from '../models/filters.model'

const TODO_KEY = 'todos'

/**
 * computed signal
 * - takes the previus signal and creates a new derived signal from it.
 * - it's readonly, cannot set it or update it
 */

@Injectable({
	providedIn: 'root',
})
export class TodoService {
	private readonly todos = signal<Todo[]>(this.load())
	readonly filter = signal<Filter>('all')

	readonly filteredTodos = computed(() => {
		const f = this.filter()
		const items = this.todos()

		if (f === 'active') {
			return items.filter((item) => !item.completed)
		}

		if (f === 'completed') {
			return items.filter((item) => item.completed)
		}

		return items
	})

	readonly stats = computed(() => {
		const items = this.todos()

		return {
			total: items.length,
			active: items.filter((item) => !item.completed).length,
			completed: items.filter((item) => item.completed).length,
		}
	})

	constructor() {
		effect(() => {
			localStorage.setItem(TODO_KEY, JSON.stringify(this.todos()))
		})
	}

	addTodo(title: string) {
		this.todos.update((items) => [
			...items,
			{
				id: crypto.randomUUID(),
				title,
				completed: false,
				createdAt: new Date(),
			},
		])

		console.log(this.todos())
	}

	renameTodo(id: string, title: string) {
		this.todos.update((items) =>
			items.map((item) => (item.id === id ? { ...item, title } : item)),
		)
	}

	removeTodo(id: string) {
		this.todos.update((items) => items.filter((item) => item.id !== id))
	}

	toggleTodos(id: string) {
		this.todos.update((items) =>
			items.map((item) =>
				item.id === id ? { ...item, completed: !item.completed } : item,
			),
		)
	}

	private load(): Todo[] {
		try {
			const raw = localStorage.getItem(TODO_KEY)

			return raw ? (JSON.parse(raw) as Todo[]) : []
		} catch {
			return []
		}
	}
}
