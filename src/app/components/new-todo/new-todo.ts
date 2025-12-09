import { Component, inject } from '@angular/core'
import { TodoService } from '../../services/todo.service'
import { FormsModule } from '@angular/forms'

@Component({
	selector: 'app-new-todo',
	imports: [FormsModule],
	templateUrl: './new-todo.html',
	styleUrl: './new-todo.scss',
})
export class NewTodo {
	protected readonly todoService = inject(TodoService)

	newTitle = ''

	newTodo(title: string) {
		this.todoService.addTodo(title)
	}
}
