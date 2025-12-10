import { Component, inject } from '@angular/core'
import { TodoStore } from '../../store/todo.store'
import type { Filter } from '../../models/filters.model'

@Component({
	selector: 'app-filters',
	imports: [],
	templateUrl: './filters.html',
	styleUrl: './filters.scss',
})
export class Filters {
	private readonly todoStore = inject(TodoStore)
	protected readonly filter = this.todoStore.filter

	setFilter(filter: Filter) {
		this.todoStore.setFilter(filter)
	}
}
