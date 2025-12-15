import { Component, inject } from '@angular/core'
import { TodoStore } from '../../store/todo.store'

@Component({
	selector: 'app-stats',
	imports: [],
	templateUrl: './stats.html',
	styleUrl: './stats.scss',
})
export class Stats {
	private readonly todoStore = inject(TodoStore)
	readonly stats = this.todoStore.stats
}
