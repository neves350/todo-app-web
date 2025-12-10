import {
	withState,
	signalStore,
	withMethods,
	patchState,
	withComputed,
} from '@ngrx/signals'
import type { Filters } from '../models/filters.model'
import type { Todo } from '../models/todo.model'

export interface TodoState {
	todos: Todo[]
	filter: Filters
}

export const initialState: TodoState = {
	todos: [],
	filter: 'all',
}

export const todoStore = signalStore(
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
	withMethods((store) => ({
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

		toggleTodo: (id: string) => {
			patchState(store, {
				todos: store
					.todos()
					.map((todo) =>
						todo.id === id ? { ...todo, completed: !todo.completed } : todo,
					),
			})
		},
	})),
)
