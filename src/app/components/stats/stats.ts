import { Component, inject } from '@angular/core'
import { TodoService } from '../../services/todo.service'

@Component({
	selector: 'app-stats',
	imports: [],
	templateUrl: './stats.html',
	styleUrl: './stats.scss',
})
export class Stats {
	protected readonly todoService = inject(TodoService)

	stats = this.todoService.stats
}
