import { Component, inject } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { TodoService } from '../../services/todo.service'
import { TodoStore } from '../../store/todo.store'

@Component({
	selector: 'app-list',
	imports: [FormsModule],
	templateUrl: './list.html',
	styleUrl: './list.scss',
})
export class List {
	private readonly todoStore = inject(TodoStore)

	todos = this.todoStore.filteredTodos

	toggleTodo(id: string) {
		this.todoStore.toggleTodos(id)
	}

	renameTodo(id: string, title: string) {
		this.todoStore.renameTodo(id, title)
	}

	removeTodo(id: string) {
		this.todoStore.removeTodo(id)
	}
}
