import { Component, inject } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { TodoStore } from '../../store/todo.store'

@Component({
	selector: 'app-new-todo',
	imports: [FormsModule],
	templateUrl: './new-todo.html',
	styleUrl: './new-todo.scss',
})
export class NewTodo {
	protected readonly todoStore = inject(TodoStore)

	newTitle = ''

	newTodo(title: string) {
		this.todoStore.addTodo(title)
	}
}
