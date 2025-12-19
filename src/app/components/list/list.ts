import { Component, inject } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { TodoStore } from '../../store/todo.store'
import { LucideAngularModule, Trash, SquarePen } from 'lucide-angular'

@Component({
	selector: 'app-list',
	imports: [FormsModule, LucideAngularModule],
	templateUrl: './list.html',
	styleUrl: './list.scss',
})
export class List {
	private readonly todoStore = inject(TodoStore)

	readonly TrashIcon = Trash
	readonly SquarePenIcon = SquarePen

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
