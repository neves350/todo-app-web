import { Component, inject, signal } from '@angular/core'
import { Header } from './components/header/header'
import { NewTodo } from './components/new-todo/new-todo'
import { Filters } from './components/filters/filters'
import { Stats } from './components/stats/stats'
import { List } from './components/list/list'
import { TodoService } from './services/todo.service'
import { TodoStore } from './store/todo.store'

@Component({
	selector: 'app-root',
	imports: [Header, NewTodo, Filters, Stats, List],
	templateUrl: './app.html',
	styleUrl: './app.scss',
	providers: [TodoStore],
})
export class App {
	protected readonly title = signal('todo-app-angular20')
	protected readonly todoService = inject(TodoService)

	stats = this.todoService.stats
}
