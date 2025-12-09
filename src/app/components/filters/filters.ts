import { Component, inject } from '@angular/core'
import { TodoService } from '../../services/todo.service'

@Component({
	selector: 'app-filters',
	imports: [],
	templateUrl: './filters.html',
	styleUrl: './filters.scss',
})
export class Filters {
	protected readonly todoService = inject(TodoService)

	filter = this.todoService.filter
}
