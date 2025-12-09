import { Component, inject } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { TodoService } from '../../services/todo.service'

@Component({
	selector: 'app-list',
	imports: [FormsModule],
	templateUrl: './list.html',
	styleUrl: './list.scss',
})
export class List {
	protected readonly todoService = inject(TodoService)

	todos = this.todoService.filteredTodos

	toggleTodo(id: string) {
		this.todoService.addTodo(id)
	}
}
