import {
	withState,
	signalStore,
	withMethods,
	patchState,
	withComputed,
	withHooks,
} from '@ngrx/signals'
import type { Filter } from '../models/filters.model'
import type { Todo } from '../models/todo.model'
import { effect, inject } from '@angular/core'
import { TodoApiService } from '../services/data/todo-api.service'
import { firstValueFrom } from 'rxjs'

const STORAGE_KEY = 'todos'

function loadFromLocalStorage(): Todo[] {
	try {
		const raw = localStorage.getItem(STORAGE_KEY)
		if (!raw) return []

		const parsed = JSON.parse(raw) as Todo[]
		return parsed
	} catch {
		return []
	}
}

export interface TodoState {
	todos: Todo[]
	filter: Filter
	loading: boolean
	error: null
}

export const initialState: TodoState = {
	todos: loadFromLocalStorage(),
	filter: 'all',
}

export const TodoStore = signalStore(
	withState(initialState),
	withComputed((store) => ({
		filteredTodos: () => {
			const f = store.filter()
			const items = store.todos()

			if (f === 'active') return items.filter((item) => !item.completed)
			if (f === 'completed') return items.filter((item) => item.completed)

			return items
		},

		stats: () => {
			const items = store.todos()

			return {
				total: items.length,
				active: items.filter((item) => !item.completed).length,
				completed: items.filter((item) => item.completed).length,
			}
		},
	})),
	withMethods((store) => {
		const todoApi = inject(TodoApiService)

		return {
			fetchTodos: async () => {
				patchState(store, { loading: true, error: null })

				try {
					const filter = store.filter()
					const todos = await firstValueFrom(todoApi.listTodos(filter))
					patchState(store, { todos: todos.data, loading: false })
				} catch (error) {
					patchState(store, {
						error: error instanceof Error ? error.message : 'Unknown error',
						loading: false,
					})
				}
			},
			addTodo: (title: string) => {
				const todo: Todo = {
					id: crypto.randomUUID(),
					title,
					completed: false,
					createdAt: new Date(),
				}
				patchState(store, { todos: [...store.todos(), todo] }) // Save data
			},

			removeTodo: (id: string) => {
				patchState(store, {
					todos: store.todos().filter((todo) => todo.id !== id),
				})
			},

			renameTodo: (id: string, title: string) => {
				patchState(store, {
					todos: store
						.todos()
						.map((todo) => (todo.id === id ? { ...todo, title } : todo)),
				})
			},

			toggleTodos: (id: string) => {
				patchState(store, {
					todos: store
						.todos()
						.map((todo) =>
							todo.id === id ? { ...todo, completed: !todo.completed } : todo,
						),
				})
			},

			setFilter: (filter: Filter) => {
				patchState(store, { filter })
			},
		}
	}),
	withHooks((store) => ({
		onInit: () => {
			effect(() => {
				const todos = store.todos()
				localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
			})
		},
	})),
)
