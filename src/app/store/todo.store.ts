import { withState, signalStore, withMethods, patchState } from '@ngrx/signals'
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
