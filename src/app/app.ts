import { Component, signal } from '@angular/core'
import { Header } from './components/header/header'
import { NewTodo } from './components/new-todo/new-todo'
import { Filters } from './components/filters/filters'
import { Stats } from './components/stats/stats'
import { List } from './components/list/list'

@Component({
	selector: 'app-root',
	imports: [Header, NewTodo, Filters, Stats, List],
	templateUrl: './app.html',
	styleUrl: './app.scss',
})
export class App {
	protected readonly title = signal('todo-app-angular20')
}
