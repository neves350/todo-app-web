import { Component, inject, signal } from '@angular/core'
import { Header } from './components/header/header'
import { NewTodo } from './components/new-todo/new-todo'
import { Filters } from './components/filters/filters'
import { Stats } from './components/stats/stats'
import { List } from './components/list/list'
import { TodoService } from './services/todo.service'

@Component({
	selector: 'app-root',
	imports: [Header, NewTodo, Filters, Stats, List],
	templateUrl: './app.html',
	styleUrl: './app.scss',
})
export class App {
	protected readonly title = signal('todo-app-angular20')
	protected readonly todoService = inject(TodoService)

	todos = this.todoService.filteredTodos
	stats = this.todoService.stats
	filter = this.todoService.filter

	deleteTodo(id: string) {
		this.todoService.addTodo(id)
	}
}
